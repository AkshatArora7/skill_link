import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';
import { useAuth } from '../../authContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Loading from '../../Components/Loading/Loading';
import NavBar from '../../Components/NavBar/NavBar';


const Profile = () => {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profilePic: '',
    roles: [],
  });
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newRate, setNewRate] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false); // Track unsaved changes

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!currentUser) return;

      try {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const clientData = docSnap.data();
          setProfileData({ ...clientData });
        }
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
      setLoading(false);
    };

    fetchProfileData();
  }, [currentUser]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = ''; // Standard for most browsers
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);



  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData((prevData) => ({
        ...prevData,
        profilePic: URL.createObjectURL(file),
      }));
      setHasUnsavedChanges(true); // Mark unsaved changes
    }
  };

  const handleRemoveRole = (index) => {
    const updatedRoles = profileData.roles.filter((_, i) => i !== index);
    setProfileData({ ...profileData, roles: updatedRoles });
    setHasUnsavedChanges(true); // Mark unsaved changes
  };

  const handleSave = async () => {
    if (!currentUser) return;

    try {
      const docRef = doc(db, 'clients', currentUser.uid);
      await updateDoc(docRef, profileData);
      console.log('Profile updated successfully');
      setHasUnsavedChanges(false); // Reset unsaved changes flag
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar tab={'profile'} />
      {loading? <Loading/> :
      <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>

        <div className="mb-6 flex justify-center">
          <div className="relative">
            <input type="file" onChange={handleProfilePicChange} className="hidden" id="profilePic" />
            <label htmlFor="profilePic" className="cursor-pointer">
              <img
                src={profileData.profilePic || 'default-profile.png'}
                alt="Profile Pic"
                className="h-32 w-32 object-cover rounded-full border-2 border-gray-300"
              />
            </label>
            <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1">
              Edit
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={profileData.firstName}
            onChange={(e) => {
              setProfileData({ ...profileData, firstName: e.target.value });
              setHasUnsavedChanges(true); // Mark unsaved changes
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={profileData.lastName}
            onChange={(e) => {
              setProfileData({ ...profileData, lastName: e.target.value });
              setHasUnsavedChanges(true); // Mark unsaved changes
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>

        

        <button
          onClick={handleSave}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
        >
          Save Changes
        </button>
      </div>}
    </div>
  );
};

export default Profile;