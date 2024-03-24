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
import { selectWishlist } from "./state/wishlist/wishlistSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const [data, setData] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.impact.com/Mediapartners/${accountSID}/CompanyInformation`;
  const promotionsLink = `https://cors-anywhere.herokuapp.com/https://api.impact.com/Mediapartners/${accountSID}/Promotions`;
  const storesAiURL = `https://api.impact.com/Mediapartners/${accountSID}/Stores/[4639,5939]`;
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);
  console.log("wishlist", wishlist);

  console.log('env', process.env.REACT_APP_ACCOUNT_SID)

  useEffect(() => {
    // fetching catalogs
    const catalogURL = `https://api.impact.com/Mediapartners/${accountSID}/Catalogs`;

    const fetchCatalogs = async () => {
      try {
        const response = await axios.get(catalogURL, {
          headers: {
            Accept: "application/json", // Add the Accept header
            Authorization: `Bearer ${authToken}`,
          },
          auth: {
            username: accountSID,
            password: authToken,
          },
        });
        console.log("response fetchCatalogs", response);
        if (response.status === 200) {
          setCatalogs(response.data.Catalogs);
        }
      } catch (error) {
        console.error("fetchCatalogs: ", error);
      }
    };

    // fetchCatalogs();
    const catalogId = "5939";
    const catalogItemsURL = `https://cors-anywhere.herokuapp.com/https://api.impact.com/Mediapartners/${accountSID}/Catalogs/${catalogId}/Items`;

    const fetchCatalogItems = async () => {
      const response = await axios.get(catalogItemsURL, {
        headers: {
          Accept: "application/json", // Add the Accept header
          Authorization: `Bearer ${authToken}`,
        },
        auth: {
          username: accountSID,
          password: authToken,
        },
      });
    };
    // fetchCatalogItems();
  }, [apiUrl, accountSID, authToken]);

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
          <Route path="/product-page/:id" element={<ProductPage />} />
          <Route path="/wishlist" element={
            <WishlistPage />
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
