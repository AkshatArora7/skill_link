import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/NavBar";
import { useAuth } from "../../authContext";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import Loading from "../../components/Loading/Loading";
import { FaCalendarAlt, FaClock, FaTag, FaUserTie } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import moment from "moment";

const History = () => {
  const { currentUser } = useAuth();
  const [completedBookings, setCompletedBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedBookings = async () => {
      if (!currentUser) return;

      try {
        const q = query(
          collection(db, "bookings"),
          where("userId", "==", currentUser.uid),
          where("status", "in", ["completed", "active"])
        );

        const querySnapshot = await getDocs(q);
        const now = new Date();
        const oneDayAgo = new Date(now);
        oneDayAgo.setDate(now.getDate() - 1);

        const filteredBookingsData = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
            expired: new Date(doc.data().date) < oneDayAgo,
          }))
          .filter((booking) => booking.status === "completed" || booking.expired);

        setCompletedBookings(filteredBookingsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching completed or expired bookings:", error);
        setLoading(false);
      }
    };

    fetchCompletedBookings();
  }, [currentUser]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar tab={"history"} />
      <div className="relative max-w-4xl mx-auto p-6 bg-white shadow rounded-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Booking History</h2>

        {completedBookings.length > 0 ? (
          <div className="space-y-4">
            {completedBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 bg-gray-200 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <FaTag className="mr-2" /> Booking ID: {booking.id}
                </h3>
                <p className="text-sm flex items-center">
                  <FaUserTie className="mr-1" /> Service: {booking.selectedProfession}
                </p>
                <p className="text-sm flex items-center">
                  <FaCalendarAlt className="mr-1" /> Date: {moment(booking.date).format("MMMM Do YYYY")}
                </p>
                <p className="text-sm flex items-center">
                  <FaClock className="mr-1" /> Time: {booking.time}
                </p>
                <p className="text-sm font-bold flex items-center">
                  <FaMoneyCheckDollar className="mr-1" /> Price: <span className="text-green-500">${booking.rate}</span>
                </p>
                <p className={`text-sm mt-2 font-semibold ${booking.expired ? "text-red-500" : "text-blue-500"}`}>
                  Status: {booking.expired ? "Expired" : "Completed"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">No completed or expired bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default History;