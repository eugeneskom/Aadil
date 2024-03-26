import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { UserType } from "../../types/UserType";

const LoginCallback = () => {
  const [userData, setUserData] = useState<UserType | {}>({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make a GET request to your server's /auth/login/success endpoint
        const response = await axios.get("/api/auth/login/success", { withCredentials: true });
        setUserData(response.data.user);
      } catch (error: any) {
        setError(error.response.data.message);
      }
    };

    fetchUserData();
  }, []);

  console.log('userData',userData)

  return (
    <div>
      {userData ? (
        <div>
          {/* <h2>Welcome, {userData.displayName}</h2> */}
          <p>Email: {}</p>
          {/* Render other user data as needed */}
        </div>
      ) : (
        <div>
          <p>Loading user data...</p>
        </div>
      )}

      {error && (
        <div>
          <p>Error: {error}</p>
          {/* Handle error appropriately */}
        </div>
      )}
    </div>
  );
};

export default LoginCallback;
