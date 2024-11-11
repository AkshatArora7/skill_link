import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import logo from '../../assets/logo.png'

const Navbar = ({tab}) => {
  const [selectedTab, setSelectedTab] = useState(tab);

  const menuItems = [
    { name: 'Home', route: '/' },
    { name: 'History', route: '/history' },
    { name: 'Profile', route: '/profile' },
    { name: 'Bookings', route: '/bookings' },
  ];


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
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        {/* <div className="text-white text-2xl font-bold">Your Logo</div> */}
        <img src={logo} alt="logo" className='h-15 w-40' />
        
        <div className="flex space-x-5">
          {menuItems.map((item) => (
            <Link 
              key={item.name}
              to={item.route}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                selectedTab === item.name.toLowerCase()
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setSelectedTab(item.name.toLowerCase())}
            >
              {item.name}
            </Link>
          ))}
          <div className='px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:cursor-pointer' onClick={handleLogout}>Logout</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;