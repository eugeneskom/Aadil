import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Header from "./templates/Header";
import ProductSection from "./components/ProductsSection";
import ProductPage from "./pages/ProductPage";
import Hero from "./components/home/Hero";
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
import Home from "./pages/Home";
import { fetchGroupedProducts } from "./state/products/groupedProductsSlice";
import Footer from "./templates/Footer";
import CategoryPage from "./pages/CategoryPage";
import ProductCardPreloader from "./components/ProductCardPreloader";
import { fetchBrands } from "./state/BrandsSlice";
import BrandPage from "./pages/BrandPage";
import ProductPageCategory from "./pages/ProductPageCategory";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

export function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// BREADCRUMBS MAP
export const breadcrumbItems = [
  { label: "Home", path: "/" },
  { label: "Category", path: "/category" },
  { label: "Subcategory", path: "/category/subcategory" },
  { label: "Product", path: "/category/subcategory/product" },
];

function App() {
  // const token = useSelector(selectToken);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthPopupOpen = useSelector((state: RootState) => state.authPopupState.isAuthPopupOpen);
  const isValidToken = useSelector((state: RootState) => state.isValidToken.isValidToken);
  const user = useSelector((state: RootState) => state.isValidToken.user);
  const page = useSelector((state: RootState) => state.products.page);
  const categories = useSelector(selectCategories);
  const status = useSelector(selectProductsStatus);
  // console.log("categories", categories);

  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(fetchProductsAsync({ page, limit: 100 }));
  //   }
  // }, [dispatch, page, status]);

  useEffect(() => {
    // Fetch wishlist on load of the current user
    const tokenLocal = localStorage.getItem("jwt") ?? "";
    if (!tokenLocal) return; // Return if no token is found in localStorage
    const token = JSON.parse(tokenLocal);
    dispatch(fetchWishlistProducts(token));
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("jwt") || "";

    let parsedToken = null;
    if (token) {
      parsedToken = JSON.parse(token);
      dispatch(setToken(parsedToken));
    }

    // when user clicks on add to wishlist but not registered, save the productId and then toggle it here and remove on first page loads
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

  const breadcrumbsProdPageHome = [
    { label: "Home", path: "/" },
    { label: "Product", path: "/product-page" },
  ];

  const breadcrumbsProdCategoryHome = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Category",
      path: "/category",
    },
    {
      label: "Subcategory",
      path: "/category/subcategory",
    },
  ];

  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        {isAuthPopupOpen ? <SignUpPopup /> : ""}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login/success" element={<LoginCallback />} />
            <Route path="/product-page/:id" element={<ProductPage />} />
            <Route path="/products-category/:categoryName" element={<CategoryPage />} />
            <Route path="/products-category/:categoryName/product-page/:id" element={<ProductPageCategory />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/user-account" element={<UserAccount />} />
            <Route path="/brand/:brandName" element={<BrandPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
