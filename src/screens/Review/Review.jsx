import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const Review = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const navigate = useNavigate();
  const { bookingId } = useParams();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const bookingDoc = await db.collection('bookings').doc(bookingId).get();
        if (bookingDoc.exists) {
          setBookingDetails(bookingDoc.data());
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not authenticated");
        setLoading(false);
        return;
      }


      await db.collection('reviews').add({
        bookingId,
        userId: user.uid,
        rating,
        comment,
        createdAt: new Date().toISOString(),
      });


      await db.collection('bookings').doc(bookingId).update({ reviewStatus: 'submitted' });

      alert("Review submitted successfully!");
      navigate('/bookings'); 
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Add a Review</h2>
      {bookingDetails && (
        <div className="max-w-lg mx-auto bg-white p-4 rounded-lg shadow-md mb-6 text-gray-800">
          <h3 className="text-xl font-semibold">{bookingDetails.selectedProfession}</h3>
          <p className="text-sm text-gray-600">
            Booking Date: {new Date(bookingDetails.date).toLocaleDateString()} at {new Date(bookingDetails.date).toLocaleTimeString()}
          </p>
          <p className="text-sm">Rate: ${bookingDetails.rate}</p>
          <p className="text-sm">Total Cost: ${bookingDetails.total}</p>
          <p className="text-sm">Service Fee: ${bookingDetails.serviceFee}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={30}
                className={`cursor-pointer ${star <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(rating)}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block text-gray-700 font-semibold mb-2">Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            rows="4"
            placeholder="Write your review here"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-2 rounded ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default Review;