import React, { useEffect, useState } from "react";
import { Catalog } from "../types/Catalog";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Catalogs() {
  const [catalogs, setCatalogs] = useState<Catalog[] | []>([]);

  useEffect(() => {
    // fetching catalogs
    const catalogURL = `http://localhost:3001/api/catalogs`;

    const fetchCatalogs = async () => {
      try {
        const response = await axios.get(catalogURL);
        console.log("response fetchCatalogs", response);
        if (response.status === 200) {
          setCatalogs(response.data.catalogs);
        }
      } catch (error) {
        console.error("fetchCatalogs: ", error);
      }
    };

    fetchCatalogs();

    return () => {};
  }, []);

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
        <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Catalogs</h2>

        {catalogs.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {catalogs.map((catalog) => (
              <NavLink to={`/catalog/${catalog.Id}`} key={catalog.Id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 truncate">{catalog.Name}</h3>
                  <p className="text-gray-600 mb-1">Advertiser: {catalog.AdvertiserName}</p>
                  <p className="text-gray-600">Number of Items: {catalog.NumberOfItems}</p>
                </div>
              </NavLink>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No catalogs found.</p>
        )}
      </div>
    </div>
  );
}

export default Catalogs;
