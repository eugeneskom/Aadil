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
import { setUser, selectUser } from "./state/user/userSlice";
import { RootState, AppDispatch } from "./state/store";
import { setToken } from "./state/token/tokenSlice";
import { selectToken } from "./state/token/tokenSlice";
import { setWishlist } from "./state/wishlist/wishlistSlice";
import { fetchProductsAsync } from "./state/products/productsSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  // const wishlist = useSelector(selectWishlist);
  // console.log("wishlist", wishlist);
  const page = useSelector((state: RootState) => state.products.page);

  useEffect(() => {
    const getUser = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
        const { data } = await axios.get(url, { withCredentials: true });
        if (data.success) {
          dispatch(setUser(data.user));
          dispatch(setToken(data.user.token));
          localStorage.setItem("jwt", JSON.stringify(data.user.token));
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

  useEffect(() => {
    dispatch(fetchProductsAsync({ page: page, limit: 100 }) as any);
  }, [dispatch, page]);


  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const tokenLocal = localStorage.getItem("jwt") ?? "";
        if (!tokenLocal) return; // Return if no token is found in localStorage
  
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/wishlist`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(tokenLocal)}`,
            },
          }
        );
        console.log("fetch wishlist", response.data);
        dispatch(setWishlist(response.data.wishlist));
      } catch (error) {
        throw new Error("Failed to fetch wishlist");
      }
    };
  
    fetchWishlist();
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchWishlist = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_API_URL}/api/wishlist`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       console.log("toggleWishlist", response.data);
  //       dispatch(setWishlist(response.data.wishlist))
  //       return response.data;
  //     } catch (error) {
  //       throw new Error("Failed to fetch wishlist");
  //     }
  //   };
  //   if (!token) return;
  //   fetchWishlist();
  // }, [token, dispatch]);

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
                <ProductSection />
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
