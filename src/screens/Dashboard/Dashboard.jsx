import React from 'react';
import { auth } from '../../firebaseConfig'; 
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/NavBar/NavBar';

const Dashboard = () => {
  

  return (
    <div>
      <Navbar tab={'home'}/>
      <h1>Dashboard</h1>
      
    </div>
  );
};

export default Dashboard;