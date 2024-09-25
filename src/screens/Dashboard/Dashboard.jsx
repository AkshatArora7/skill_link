import React from 'react';
import { auth } from '../../firebaseConfig'; 
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate(); 
  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.clear();
      navigate('/login');
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button 
        onClick={handleLogout} 
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;