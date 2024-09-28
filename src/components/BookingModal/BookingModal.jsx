import React, { useState } from "react";
import "./BookingModal.css"; // Import your CSS styles

const BookingModal = ({ isOpen, onRequestClose, client }) => {
  const [selectedProfession, setSelectedProfession] = useState(
    client.activeRoles[0]?.roleName || ""
  );
  const [selectedDate, setSelectedDate] = useState("");
  const serviceFeePercentage = 0.05; // 5%
  const taxPercentage = 0.13; // 13%

  // Calculate the total cost including service fee and tax
  const calculateTotalCost = (rate) => {
    if (isNaN(rate)) {
      console.error("Invalid rate provided:", rate); // Log the invalid rate
      return { total: 0, serviceFee: 0, tax: 0 }; // Return default values if rate is invalid
    }

    console.log(typeof rate);
    const serviceFee = parseInt(rate) * serviceFeePercentage;
    const subtotal = parseInt(rate) + serviceFee; // Add service fee to the original rate
    const tax = subtotal * taxPercentage; // Calculate tax on the subtotal
    const total = subtotal + tax; // Add tax to the subtotal to get the total
    return { total, serviceFee, tax };
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle booking submission (e.g., save to Firestore)
    onRequestClose(); // Close modal after submitting
  };

  if (!isOpen) return null; // Don't render anything if not open

  // Find the selected role's rate
  const selectedRole = client.activeRoles.find(
    (role) => role.roleName === selectedProfession
  );
  const selectedRate = selectedRole?.rate || 0; // Use a default rate of 0 if undefined
  const { total, serviceFee, tax } = calculateTotalCost(selectedRate); // Calculate total based on selected profession

  // Log total, service fee, and tax for debugging
  console.log("Total:", total);
  console.log("Service Fee:", serviceFee);
  console.log("Tax:", tax);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="text-xl font-semibold mb-4">Create a Booking</h2>

        {/* Client Profile Picture */}
        <img
          src={client.profilePic}
          alt={`${client.firstName} ${client.lastName}`}
          className="h-24 w-24 rounded-full mx-auto mb-4"
        />

        <form onSubmit={handleBookingSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Profession
            </label>
            <select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              {client.activeRoles.map((role) => (
                <option key={role.role} value={role.roleName}>
                  {role.roleName} - ${role.rate}/hr
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Date and Time
            </label>
            <input
              type="datetime-local"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          {/* Receipt Section */}
          <div className="mt-4 border-t pt-4">
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Receipt
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">{selectedProfession}:</span>
              <span className="text-gray-500">${selectedRate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Service Fee (5%):</span>
              <span className="text-gray-500">${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Tax (13%):</span>
              <span className="text-gray-500">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center font-semibold">
              <span>Total Cost:</span>
              <span className="text-gray-700">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none mt-4"
          >
            Confirm Booking
          </button>
        </form>
        <button
          onClick={onRequestClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
