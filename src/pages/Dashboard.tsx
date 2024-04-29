import React, { useEffect, useState } from "react";
import { Product } from "../types/Product";
import axios from "axios";

interface User {
  _id: string;
  email: string;
  wishlist: Product[];
  firstName: string;
  lastName: string;
}

function Dashboard() {
  const [users, setUsers] = useState<User[] | []>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>("wishlist");
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const tokenLocal = localStorage.getItem("jwt") ?? "";
        if (!tokenLocal) return; // Return if no token is found in localStorage

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users-with-wishlist`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(tokenLocal)}`,
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserDropdown = (user: User) => {
    if (selectedUser === user) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  const handleSyncData = async () => {
    try {
      setLoading(true);
      const tokenLocal = localStorage.getItem("jwt") ?? "";
      if (!tokenLocal) return; // Return if no token is found in localStorage

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/sync-sheets`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(tokenLocal)}`,
          },
        }
      );

      if (response.data.success) {
        setLastUpdatedTime(response.data.lastUpdatedTime);
        alert("Data synced successfully!");
      } else {
        alert("Failed to sync data. Please try again.");
      }
    } catch (error) {
      console.error("Error syncing data:", error);
      alert("An error occurred while syncing data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="dashboard">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 mt-4">Dashboard</h1>
        <div className="mb-4">
          <button
            className={`px-4 py-2 mr-4 ${
              activeTab === "wishlist" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            } rounded`}
            onClick={() => setActiveTab("wishlist")}
          >
            User Wishlists
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "sync" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            } rounded`}
            onClick={() => setActiveTab("sync")}
          >
            Sync Data
          </button>
        </div>
        {activeTab === "wishlist" && (
          <div className="bg-white shadow-md rounded-lg">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">First Name</th>
                  <th className="py-3 px-6 text-left">Last Name</th>
                  <th className="py-3 px-6 text-left">User Email</th>
                  <th className="py-3 px-6 text-center">Number of Products</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {users.map((user) => (
                  <React.Fragment key={user._id}>
                    <tr className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer" onClick={() => toggleUserDropdown(user)}>
                      <td className="py-3 px-6 text-left whitespace-nowrap">{user.firstName}</td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">{user.lastName}</td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">{user.email}</td>
                      <td className="py-3 px-6 text-center">{user.wishlist.length}</td>
                      <td className="py-3 px-6 text-center">
                        <button className="text-blue-500 hover:underline">View Products</button>
                      </td>
                    </tr>
                    {selectedUser === user && (
                      <tr>
                        <td colSpan={3} className="py-4 px-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {user.wishlist.map((item) => (
                              <div key={item.Id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center mb-2">
                                  <img src={item.ImageUrl} alt={item.Name} className="w-16 h-16 object-cover rounded mr-4" />
                                  <div>
                                    <h3 className="text-lg font-semibold">{item.Name}</h3>
                                    <p className="text-gray-500">{item.Manufacturer}</p>
                                  </div>
                                </div>
                                <div className="mt-4 flex justify-between items-center">
                                  <div className="text-lg font-semibold">
                                    <span className="text-green-500">${item.CurrentPrice}</span>
                                    {item.OriginalPrice && item.OriginalPrice !== item.CurrentPrice && <span className="text-gray-500 line-through ml-2">${item.OriginalPrice}</span>}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
 {activeTab === "sync" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Sync Google Sheet Data</h2>
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={handleSyncData}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Syncing...
                </div>
              ) : (
                "Sync Data"
              )}
            </button>
            {lastUpdatedTime && (
              <p className="mt-4">
                Last Updated: {new Date(lastUpdatedTime).toLocaleString()}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Dashboard;