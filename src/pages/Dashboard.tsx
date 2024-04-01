import React, { useEffect, useState } from "react";
import { Product } from "../types/Product";
import axios from "axios";

interface User {
  _id: string;
  email: string;
  wishlist: Product[];
}

function Dashboard() {
  const [users, setUsers] = useState<User[] | []>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users-with-wishlist`);
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

  return (
    <section className="dashboard">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 mt-4">User Wishlists</h1>
        <div className="bg-white shadow-md rounded-lg">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">User Email</th>
                <th className="py-3 px-6 text-center">Number of Products</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {users.map((user) => (
                <React.Fragment key={user._id}>
                  <tr className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer" onClick={() => toggleUserDropdown(user)}>
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
      </div>
    </section>
  );
}

export default Dashboard;
