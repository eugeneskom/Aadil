import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Header from "./templates/Header";
import ProductSection from "./components/ProductsSection";
import ProductPage from "./pages/ProductPage";
import Hero from "./components/Hero";
import WishlistPage from "./pages/WishlistPage";
import { useSelector, useDispatch } from "react-redux";
import LoginCallback from "./components/auth/LoginCallback";
import { setUser } from "./state/user/userSlice";
import { RootState, AppDispatch } from "./state/store";
import { setToken } from "./state/token/tokenSlice";
import { fetchWishlistProducts, toggleWishlistAsync } from "./state/wishlist/wishlistSlice";
import { fetchProductsAsync, selectProductsStatus } from "./state/products/productsSlice";
import { setScreenWidth } from "./state/screenWidthSlice";
import SignUpPopup from "./components/auth/SignUpPopup";
import UserAccount from "./pages/UserAccount";
import { validateToken } from "./state/token/isValidToken";
import Dashboard from "./pages/Dashboard";
import { fetchCategories, selectCategories } from "./state/categories/categoriesSlice";

function App() {
  // const token = useSelector(selectToken);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthPopupOpen = useSelector((state: RootState) => state.authPopupState.isAuthPopupOpen);
  const isValidToken = useSelector((state: RootState) => state.isValidToken.isValidToken);
  const user = useSelector((state: RootState) => state.isValidToken.user);
  const page = useSelector((state: RootState) => state.products.page);
  const categories = useSelector(selectCategories);
  const status = useSelector(selectProductsStatus);
  console.log("categories", categories);

  // useEffect(() => {
  //   dispatch(fetchProductsAsync({ page: page, limit: 40 }) as any);
  // }, [dispatch, page]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsAsync({ page, limit: 100 }));
    }
  }, [dispatch, page, status]);

  useEffect(() => {
    // Fetch wishlist on load of the current user
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
        // dispatch(setWishlist(response.data.products));
      } catch (error) {
        throw new Error("Failed to fetch wishlist");
      }
    };

    fetchWishlist();

    // dispatch(fetchWishlistProducts(token));
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("jwt") || "";

    let parsedToken = null;
    if (token) {
      parsedToken = JSON.parse(token);
      dispatch(setToken(parsedToken));
    }

    // when user clicks on add to wishlist but not registered, save the productId and then toggle it here and remove on first page load
    const savedProdId = localStorage.getItem("productIdWishlist") || "";
    if (savedProdId) {
      // dispatch(toggleWishlist(savedProdId));
      dispatch(toggleWishlistAsync({ productId: savedProdId, token }));

      localStorage.removeItem("productIdWishlist");
    }

    return () => {};
  }, []);

  useEffect(() => {
    const tokenLocal = localStorage.getItem("jwt") ?? "";
    let parsedToken = null;
    if (tokenLocal) {
      parsedToken = JSON.parse(tokenLocal);
      dispatch(validateToken(parsedToken));
      dispatch(fetchWishlistProducts(parsedToken));
    }

    return () => {};
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user]);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    // setting if mobile or desktop on load for handling different ui templates
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

  // test query by category

  useEffect(() => {
    //   axios.post(`${process.env.REACT_APP_API_URL}/api/products/filter-categories`, { categories: ['Sofa', 'Loveseats','Sectional Sofa','curtain', 'mops'] })
    // .then(response => {
    //   const filteredProducts = response.data;
    //   // Handle the filtered products on the front-end
    // })
    // .catch(error => {
    //   console.error('Error filtering products:', error);
    //   // Handle the error on the front-end
    // });

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`, {
        params: {
          page: 1,
          limit: 100,
          min: 10,
          max: 1550,
          // categories: ['Sofa', 'Loveseats','Sectional Sofa','curtain', 'mops'],
        },
      })
      .then((response) => {
        const filteredProducts = response.data;
        console.log("filteredProducts", filteredProducts);
        // Handle the filtered products on the front-end
      })
      .catch((error) => {
        console.log("error filtering products", error);
      });
    return () => {};
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
                  <Hero />
                  <ProductSection />
                </>
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login/success" element={<LoginCallback />} />
            <Route path="/product-page/:id" element={<ProductPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/user-account" element={<UserAccount />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
