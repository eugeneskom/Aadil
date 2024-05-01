import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./templates/Header";
import { useSelector, useDispatch } from "react-redux";
import LoginCallback from "./components/auth/LoginCallback";
import { setUser } from "./state/user/userSlice";
import { RootState, AppDispatch } from "./state/store";
import { selectToken, setToken } from "./state/token/tokenSlice";
import { fetchWishlistProducts, toggleWishlistAsync } from "./state/wishlist/wishlistSlice";
import { selectProductsStatus } from "./state/products/productsSlice";
import { setScreenWidth } from "./state/screenWidthSlice";
import SignUpPopup from "./components/auth/SignUpPopup";
import { UserAccount, Dashboard, CategoryPage, BrandPage, 
   ProductPage, WishlistPage, Home, AuthenticationPage } from "./pages/index";
import { validateToken } from "./state/token/isValidToken";
import { fetchCategories, selectCategories } from "./state/categories/categoriesSlice";
import Footer from "./templates/Footer";
import { fetchBrands } from "./state/BrandsSlice";
import ResetPasswordConfirmation from "./components/auth/ResetConfirmationPage";
import Products from "./pages/Products";
import About from "./pages/About";
import { HelmetProvider } from "react-helmet-async";

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

function App() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthPopupOpen = useSelector((state: RootState) => state.authPopupState.isAuthPopupOpen);
  const user = useSelector((state: RootState) => state.isValidToken.user);
  // console.log("categories", categories);

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
  }, [token]);

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

  return (
    <>
      <HelmetProvider>

      <Router>
        <ScrollToTop />
        <Header />
        {isAuthPopupOpen ? <SignUpPopup /> : ""}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthenticationPage />}>
              <Route path="login" element={<AuthenticationPage />} />
              <Route path="register" element={<AuthenticationPage />} />
              <Route path="password" element={<AuthenticationPage />} />
            </Route>
            <Route path="/auth/reset-confirm/:token" element={<ResetPasswordConfirmation />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login/success" element={<LoginCallback />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/product/:id" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/brand/:brandName/product/:id" element={<ProductPage />} />
            <Route path="/brand/:brandName" element={<BrandPage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/category/:categoryName/product/:id" element={<ProductPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/wishlist/product/:id" element={<ProductPage />} />
            <Route path="/user-account" element={<UserAccount />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      </HelmetProvider>

    </>
  );
}

export default App;
