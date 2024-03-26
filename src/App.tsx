import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { accountSID, authToken } from "./config";
import axios from "axios";
import Header from "./templates/Header";
import ProductSection from "./components/ProductsSection";
import { apiUrlDomain } from "./config";
import ProductPage from "./pages/ProductPage";
import Hero from "./components/Hero";
import WishlistPage from "./pages/WishlistPage";
import Login from "./components/auth/Login";
import { useSelector, useDispatch } from "react-redux";
import LoginCallback from "./components/auth/LoginCallback";
import { setUser,selectUser } from "./state/user/userSlice";
import { fetchWishlist } from "./state/wishlist/wishlistSlice";
import { RootState, AppDispatch } from "./state/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [wishlist, setWishlist] = useState([])
  const user = useSelector(selectUser);
  // const wishlist = useSelector(selectWishlist);
  // console.log("wishlist", wishlist); 
  console.log("wishlist", wishlist);


  useEffect(() => {
    const getUser = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
        const { data } = await axios.get(url, { withCredentials: true });
        if(data.success){
          dispatch(setUser(data.user));
          setWishlist(data.user.wishlist)
        }
      } catch (error) {
        console.log("getUser: ", error);
      }
    };

    getUser()

    return () => {};
  }, []);

  useEffect(() => {
    if (user && user.email) {
      dispatch(fetchWishlist(user.email));
    }
  }, [dispatch, user]);
  

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Login />
                <Hero />
                <ProductSection wishlist={wishlist}/>
              </>
            }
          />
          <Route path="/login/success" element={<LoginCallback />} />
          <Route path="/product-page/:id" element={<ProductPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
