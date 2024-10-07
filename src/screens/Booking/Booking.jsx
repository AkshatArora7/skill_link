import React, { useEffect, useState } from 'react';
import Navbar from '../../components/NavBar/NavBar';
import { db, auth } from '../../firebaseConfig';
import { FaCalendarAlt, FaMoneyBillWave, FaUserTie, FaFileInvoiceDollar } from 'react-icons/fa';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("User not authenticated");
          return;
        }

        const bookingsRef = db.collection('bookings').where('userId', '==', user.uid);
        const snapshot = await bookingsRef.get();
        const bookingsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(bookingsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div>
      <Navbar tab={'bookings'} />
      <div className="container mx-auto mt-8 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Your Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <FaUserTie className="text-blue-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">{booking.selectedProfession}</h3>
                </div>
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className="text-blue-500 mr-2" />
                  <span className="text-gray-700">{booking.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  <FaMoneyBillWave className="text-blue-500 mr-2" />
                  <span className="text-gray-700">Rate: ${booking.rate}</span>
                </div>
                <div className="flex items-center mb-2">
                  <FaFileInvoiceDollar className="text-blue-500 mr-2" />
                  <span className="text-gray-700">Total Cost: ${booking.total}</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-gray-700">Service Fee: ${booking.serviceFee}</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-gray-700">Tax: ${booking.tax}</span>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  <strong>Created At:</strong> {booking.createdAt}
                </div>
                <div className="flex-grow">
                  <p className="text-gray-600">
                    Thank you for your booking! If you have any questions or need to make changes, please don't hesitate to contact us.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;