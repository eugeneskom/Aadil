import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { UserType } from "../../types/UserType";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { setUser } from "../../state/user/userSlice";
import { setToken } from "../../state/token/tokenSlice";
import { useNavigate } from "react-router-dom";
const LoginCallback = () => {
  const [userData, setUserData] = useState<UserType | {}>({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       // Make a GET request to your server's /auth/login/success endpoint
  //       const response = await axios.get("/api/auth/login/success", { withCredentials: true });
  //       setUserData(response.data.user);
  //     } catch (error: any) {
  //       setError(error.response.data.message);
  //     }
  //   };

  //   fetchUserData();


  // }, []);

  // console.log('userData',userData)

  
  useEffect(() => {
    const getUser = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
        const { data } = await axios.get(url, { withCredentials: true });
        if (data.success) {
          dispatch(setUser(data.user));
          dispatch(setToken(data.user.token));
          localStorage.setItem("jwt", JSON.stringify(data.user.token));
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate('/')
        }
      } catch (error) {
        console.log("getUser: ", error);
      }
    };

    getUser();
    const tokenLocal = localStorage.getItem("jwt") ?? "";
    dispatch(setToken(JSON.parse(tokenLocal)));

    return () => {};
  }, []);

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
