import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { accountSID, authToken } from "./config";
import axios from "axios";
import Header from "./templates/Header";
import ProductSection from "./components/ProductsSection";
function App() {
  const [data, setData] = useState([]);
  const [catalogs, setCatalogs] = useState([])
  const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.impact.com/Mediapartners/${accountSID}/CompanyInformation`;
  const promotionsLink = `https://cors-anywhere.herokuapp.com/https://api.impact.com/Mediapartners/${accountSID}/Promotions`;
  const storesAiURL = `https://api.impact.com/Mediapartners/${accountSID}/Stores/[4639,5939]`;

  console.log('catalogs',catalogs)

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
        console.log('response fetchCatalogs', response)
        if(response.status === 200){
          setCatalogs(response.data.Catalogs)
        }
      } catch (error) {
        console.error('fetchCatalogs: ',error)
      }

    };

    // fetchCatalogs()
    const catalogId = "1630";
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

    // fetchStores();
  }, [apiUrl, accountSID, authToken]);

  return (
    <>
      <Header />
      <ProductSection />
    </>
  );
}

export default App;
