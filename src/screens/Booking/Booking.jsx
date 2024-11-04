import React, { useEffect, useState } from 'react';
import Navbar from '../../components/NavBar/NavBar';
import { db, auth } from '../../firebaseConfig';
import { FaCalendarAlt, FaReceipt, FaMoneyBillWave, FaUserTie, FaFileInvoiceDollar, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaPlayCircle, FaCalendarCheck } from 'react-icons/fa';

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
        const now = new Date();
        const bookingsData = snapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(booking => {
            const bookingDate = new Date(booking.date);
            const oneDayAgo = new Date(now);
            oneDayAgo.setDate(now.getDate() - 1);
            return bookingDate >= oneDayAgo;
          });
  
        setBookings(bookingsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };
  
    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    return `${date.toLocaleDateString(undefined, options)} at ${date.toLocaleTimeString(undefined, timeOptions)}`;
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-[#FEFAE0]';
      case 'completed':
        return 'bg-[#CDF5FD]';
      case 'rejected':
        return 'bg-[#FFC5C5]';
      case 'active':
        return 'bg-[#E0FBE2]';
      default:
        return 'bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaHourglassHalf className="text-yellow-500" />;
      case 'completed':
        return <FaCheckCircle className="text-blue-500" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-500" />;
      case 'active':
        return <FaPlayCircle className="text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusTooltip = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'completed':
        return 'Completed';
      case 'rejected':
        return 'Rejected';
      case 'active':
        return 'Upcoming';
      default:
        return 'Unknown Status';
    }
  };

  const getIconColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500';
      case 'completed':
        return 'text-blue-500';
      case 'rejected':
        return 'text-red-500';
      case 'active':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const isOneDayBefore = (dateString) => {
    const bookingDate = new Date(dateString);
    const now = new Date();
    const oneDayBefore = new Date(now);
    oneDayBefore.setDate(now.getDate() - 1);
    return bookingDate.toDateString() === oneDayBefore.toDateString();
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await db.collection('bookings').doc(bookingId).update({ status: newStatus });
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

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
              <div
                key={booking.id}
                className={`${getStatusStyles(booking.status)} rounded-lg p-6 transition-transform transform hover:scale-105 h-full flex flex-col relative`}
              >
                <div className="absolute top-2 right-2 flex items-center">
                  <div className="group relative">
                    {getStatusIcon(booking.status)}
                    <span className="hidden group-hover:block absolute bg-gray-700 text-white text-xs rounded py-1 px-2 right-full mr-2">
                      {getStatusTooltip(booking.status)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <FaUserTie className={`${getIconColor(booking.status)} mr-2`} />
                  <h3 className="text-lg font-semibold text-gray-800">{booking.selectedProfession}</h3>
                </div>
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className={`${getIconColor(booking.status)} mr-2`} />
                  <span className="text-gray-700">{formatDate(booking.date)}</span>
                </div>
                <div className="flex items-center mb-2">
                  <FaMoneyBillWave className={`${getIconColor(booking.status)} mr-2`} />
                  <span className="text-gray-700">Rate: ${booking.rate}</span>
                </div>
                <div className="flex items-center mb-2">
                  <FaFileInvoiceDollar className={`${getIconColor(booking.status)} mr-2`} />
                  <span className="text-gray-700">Total Cost: ${booking.total}</span>
                </div>
                <div className="flex items-center mb-2">
                  <FaReceipt className={`${getIconColor(booking.status)} mr-2`} />
                  <span className="text-gray-700">Service Fee: ${booking.serviceFee}</span>
                </div>
                <div className="flex items-center text-gray-500 mb-4">
                  <FaCalendarCheck className={`${getIconColor(booking.status)} mr-2`} />
                  <span className="text-gray-700"><strong>Created At:</strong> {formatDate(booking.createdAt)}</span>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-600">
                    Thank you for your booking! If you have any questions or need to make changes, please don't hesitate to contact us.
                  </p>
                </div>
                {isOneDayBefore(booking.date) && (
                  <div className="flex gap-4 mt-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => updateBookingStatus(booking.id, 'completed')}
                    >
                      Mark as Complete
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => updateBookingStatus(booking.id, 'expired')}
                    >
                      Mark as Expired
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;