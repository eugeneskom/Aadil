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
import { setTokenValidity } from "./state/token/isValidToken";
import { setScreenWidth } from "./state/screenWidthSlice";
import SignUpPopup from "./components/auth/SignUpPopup";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const isValidToken = useSelector((state: RootState) => state.isValidToken.isValidToken);
  const page = useSelector((state: RootState) => state.products.page);
  const isAuthPopupOpen = useSelector((state: RootState) => state.authPopupState.isAuthPopupOpen);
  // const wishlist = useSelector(selectWishlist);
  console.log("isValidToken", isValidToken);
  
  // const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);

  const handleToggleAuthPopup = () => {
    // setIsAuthPopupOpen(!isAuthPopupOpen);
  }


  useEffect(() => {
    dispatch(fetchProductsAsync({ page: page, limit: 100 }) as any);
  }, [dispatch]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const tokenLocal = localStorage.getItem("jwt") ?? "";
        if (!tokenLocal) return; // Return if no token is found in localStorage

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/wishlist`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(tokenLocal)}`,
          },
        });
        console.log("fetch wishlist", response.data);
        dispatch(setWishlist(response.data.wishlist));
      } catch (error) {
        throw new Error("Failed to fetch wishlist");
      }
    };

    fetchWishlist();
  }, [dispatch]);

  useEffect(() => {
    // validate user token on load of the page
    const handleTokenValidate = async () => {
      try {
        const token = localStorage.getItem("jwt") || "";
        let parsedToken = null;
        if (token) {
          try {
            parsedToken = JSON.parse(token);
          } catch (error) {
            console.error("Error parsing token:", error);
          }
        }
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/validate-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${parsedToken}`,
            },
          }
        );
        if (response.data && response.data.success) {
          dispatch(setTokenValidity({ isValid: true, error: null }));
          console.log("Token is valid");
        } else {
          dispatch(setTokenValidity({ isValid: false, error: null }));
          console.log("Token validation failed:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to validate token:", error);
        dispatch(setTokenValidity({ isValid: false, error: null }));
      }
    };

    handleTokenValidate();

    return () => {};
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      dispatch(setScreenWidth(isMobile));
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Router>
        <Header />
        {isAuthPopupOpen ? <SignUpPopup /> : ""}
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* {!isValidToken && <Login />} */}
                  <Hero />
                  <ProductSection />
                </>
              }
            />
            <Route path="/login/success" element={<LoginCallback />} />
            <Route path="/product-page/:id" element={<ProductPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
