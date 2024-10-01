import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig"; 
import Navbar from "../../Components/NavBar/NavBar";
import BookingModal from "../../Components/BookingModal/BookingModal";
import Loading from "../../Components/Loading/Loading";

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [activeTab, setActiveTab] = useState("professional");
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch client data from Firestore
useEffect(() => {
  const fetchClients = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const clientSnapshot = await db.collection("clients").get();
      const clientData = [];
      clientSnapshot.forEach((doc) => {
        const data = doc.data();
        const activeRoles = data.roles.filter(
          (role) => role.isActive === true
        );

        // Push client data only if there are active roles
        if (activeRoles.length > 0) {
          clientData.push({
            id: doc.id,
            firstName: data.firstName,
            lastName: data.lastName,
            profilePic: data.profilePic,
            email: data.email,
            avgRating: data.avgRating,
            activeRoles: activeRoles, // Store only the active roles
          });
        }
      });
      setClients(clientData); // Store client data in state
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  fetchClients();
}, []);

useEffect(() => {
  const fetchProfessions = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const professionSnapshot = await db.collection("professions").get();
      const professionData = professionSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name, // Assuming the profession document has a name field
      }));
      setProfessions(professionData); // Store profession data in state
      if (professionData.length > 0) {
        setSelectedProfession(professionData[0].name); // Set the first profession as the default selected
      }
    } catch (error) {
      console.error("Error fetching professions:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  fetchProfessions();
}, []);

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedProfession(professions.length > 0 ? professions[0].name : null); // Reset selected profession when changing tabs
  };

  // Filter clients based on the active tab and selected profession
  const filteredClients =
    activeTab === "professional"
      ? clients
      : clients.filter((client) =>
          client.activeRoles.some(
            (role) => role.roleName === selectedProfession
          )
        );

  return (
    <div>
      <Navbar tab={"home"} />
      <h1 className="text-3xl font-bold text-center my-6">Dashboard</h1>

      {loading?<Loading/>:<div className="flex justify-end px-4">
        <div className="flex items-center space-x-4">
          <span className="font-medium">Browse by:</span>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "professional"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("professional")}
          >
            Professionals
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "profession"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("profession")}
          >
            Professions
          </button>
        </div>
      </div>
}

      {activeTab === "profession" && professions.length > 0 && (
        <div className="flex justify-center space-x-4 mt-4">
          {professions.map((profession) => (
            <button
              key={profession.id}
              className={`px-4 py-2 rounded-md ${
                selectedProfession === profession.name
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setSelectedProfession(profession.name)}
            >
              {profession.name}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mt-6">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <div key={client.id} className="bg-white p-4 shadow-md rounded-lg">
              <img
                src={client.profilePic}
                alt={`${client.firstName} ${client.lastName}`}
                className="h-24 w-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-lg font-semibold text-center">
                {client.firstName} {client.lastName}
              </h2>
              <p className="text-sm text-center text-gray-500">
                {client.email}
              </p>
              <p className="text-sm text-center text-yellow-500">
                Avg Rating: {client.avgRating}
              </p>

              <div className="mt-4">
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  Active Services:
                </h3>
                {/* Show all roles if 'professional' tab is selected, otherwise show only selected profession */}
                {activeTab === "professional"
                  ? client.activeRoles.map((role, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center mb-2"
                      >
                        <span className="text-gray-700">{role.roleName}</span>
                        <span className="text-gray-500">${role.rate}/hr</span>
                      </div>
                    ))
                  : client.activeRoles
                      .filter((role) => role.roleName === selectedProfession)
                      .map((role, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center mb-2"
                        >
                          <span className="text-gray-700">{role.roleName}</span>
                          <span className="text-gray-500">${role.rate}/hr</span>
                        </div>
                      ))}
              </div>

              <button
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                onClick={() => {
                  setSelectedClient(client);
                  setIsModalOpen(true);
                }}
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No active clients available at the moment.
          </p>
        )}
      </div>

      {selectedClient && (
        <BookingModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          client={selectedClient}
        />
      )}
    </div>
  );
};

export default Dashboard;
