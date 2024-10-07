import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db, storage } from '../../firebaseConfig'; // Import Firebase storage
import { useAuth } from '../../authContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import storage methods
import Loading from '../../components/Loading/Loading';
import NavBar from '../../components/NavBar/NavBar';

const Profile = () => {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profilePic: '',
    roles: [],
  });
  const [initialProfileData, setInitialProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newProfilePic, setNewProfilePic] = useState(null); // To store the new profile picture file
  const [isSaving, setIsSaving] = useState(false); // For full-screen loading during save

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!currentUser) return;

      try {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const clientData = docSnap.data();
          setProfileData({ ...clientData });
          setInitialProfileData({ ...clientData });  // Set initial data for comparison
        }
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
      setLoading(false);
    };

    fetchProfileData();
  }, [currentUser]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(file); // Store the new file
      setProfileData((prevData) => ({
        ...prevData,
        profilePic: URL.createObjectURL(file), // Preview of the selected picture
      }));
    }
  };

  const handleSave = async () => {
    if (!currentUser) return;

    setIsSaving(true);
    let profilePicUrl = profileData.profilePic;

    // If a new profile picture is selected, upload it to Firebase Storage
    if (newProfilePic) {
      const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
      try {
        // Upload the file to Firebase Storage
        await uploadBytes(storageRef, newProfilePic);
        // Get the download URL
        profilePicUrl = await getDownloadURL(storageRef);
        console.log('Profile picture uploaded successfully:', profilePicUrl);
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        setIsSaving(false);  // Hide loading if there's an error
        return; // Stop execution if upload fails
      }
    }

    try {
      const docRef = doc(db, 'users', currentUser.uid);
      // Update Firestore with the new profile picture URL and other profile data
      await updateDoc(docRef, {
        ...profileData,
        profilePic: profilePicUrl,
      });
      console.log('Profile updated successfully');
      setInitialProfileData({ ...profileData, profilePic: profilePicUrl });  // Update initial data after saving
      setNewProfilePic(null); // Clear the new profile picture after save

      // Reload the page after saving is complete
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);  // Hide the loading screen after the process completes
    }
  };

  // Check for unsaved changes
  const hasUnsavedChanges = () => {
    if (!initialProfileData) return false;

    return (
      profileData.firstName !== initialProfileData.firstName ||
      profileData.lastName !== initialProfileData.lastName ||
      profileData.profilePic !== initialProfileData.profilePic
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar tab={'profile'} />
      {loading ? (
        <Loading />
      ) : (
        <>
          {isSaving && <Loading />} {/* Show full screen loading while saving */}

          <div className={`max-w-2xl mx-auto p-6 bg-white shadow rounded-md mt-6 ${isSaving ? 'hidden' : ''}`}>
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
                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
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
                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
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

            {hasUnsavedChanges() && (
              <p className="mt-4 text-red-500">
                There are unsaved changes. Click the button above to save your new changes.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;