import React, { useEffect, useState } from 'react';
import Navbar from '../../components/NavBar/NavBar';
import { db, auth } from '../../firebaseConfig'; // Import Firebase Firestore and Auth

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = auth.currentUser; // Get the currently logged-in user
        if (!user) {
          console.error("User not authenticated");
          return;
        }

        const bookingsRef = db.collection('bookings').where('userId', '==', user.uid); // Query bookings by userId
        const snapshot = await bookingsRef.get();
        const bookingsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(bookingsData); // Store fetched bookings in state
        setLoading(false); // Stop the loading spinner
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings(); // Fetch bookings on component mount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading spinner while fetching data
  }

  return (
    <div>
      <Navbar tab={'bookings'} />
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <ul>
            {bookings.map((booking) => (
              <li key={booking.id} className="border p-4 mb-4 rounded shadow">
                <div><strong>Profession:</strong> {booking.selectedProfession}</div>
                <div><strong>Date:</strong> {booking.date}</div>
                <div><strong>Rate:</strong> ${booking.rate}</div>
                <div><strong>Total Cost:</strong> ${booking.total}</div>
                <div><strong>Service Fee:</strong> ${booking.serviceFee}</div>
                <div><strong>Tax:</strong> ${booking.tax}</div>
                <div><strong>Created At:</strong> {booking.createdAt}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Booking;