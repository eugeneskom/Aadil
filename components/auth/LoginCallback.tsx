import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { UserType } from "../../types/UserType";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { setUser } from "../../state/user/userSlice";
import { setToken } from "../../state/token/tokenSlice";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../../state/token/isValidToken";
import { fetchWishlistProducts } from "../../state/wishlist/wishlistSlice";

const LoginCallback = () => {
  const [userData, setUserData] = useState<UserType | {}>({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
 

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
          console.log("parseToken", data.user.token, data.user);
          // let parsedToken = null;
          // parsedToken = JSON.parse(data.user.token);
          // console.log("parseToken", parsedToken);
          dispatch(validateToken(data.user.token));
          dispatch(fetchWishlistProducts(data.user.token));

          navigate("/");
        }
      } catch (error) {
        console.log("getUser: ", error);
      }
    };

    getUser();

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
