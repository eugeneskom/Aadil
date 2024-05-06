import { Box, Slider } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, selectCategories, selectMaxPriceRange, selectMinPriceRange, setMaxPrice, setMinPrice, toggleCategory } from "../../state/products/productsSlice";
import { AppDispatch } from "../../state/store";
import FilterTab from "./FilterTab"; // Import the new FilterTab component
import { useParams } from "react-router-dom";

const capitalizeWords = (str: string) => {
  return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
};



function Filters() {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState<number[]>([0, 0]);
  const [activeTab, setActiveTab] = useState<string>("");
  const filterTabRef = useRef<HTMLDivElement>(null);
  const minPrice = useSelector(selectMinPriceRange);
  const maxPrice = useSelector(selectMaxPriceRange);
  const selectedCategories = useSelector(selectCategories);
  const [priceFilterCount, setPriceFilterCount] = useState<number>(0);

  const { categoryName } = useParams();

useEffect(() => {
  // if we are on the category product page, we need to fetch the products based on the category name
  const normalizedCategoryName = categoryName ? capitalizeWords(categoryName.replace(/-/g, " ")) : "";
  // setCurrentCategory(normalizedCategoryName);
  if(normalizedCategoryName){
    console.log('categoryName',categoryName)
    // dispatch(toggleCategory(normalizedCategoryName));
    dispatch(fetchProductsAsync({}));
    console.log('fetchProductsAsync useEffect')
  }

  return () => {
    
  }
}, [selectedCategories])


  const handleChange = (event: Event, newValue: number | number[]) => {
    const [minPrice, maxPrice] = newValue as [number, number];
    setValue([Number(minPrice), Number(maxPrice)] as number[]);
  };

  const handleChangeCommitted = (newValue: number | number[]) => {
    if (!Array.isArray(newValue)) return;
    const [minPrice, maxPrice] = newValue as [number, number];
    dispatch(setMinPrice(minPrice));
    dispatch(setMaxPrice(maxPrice));
    fetchProductsByPriceRange(minPrice, maxPrice);
    console.log('fetchProductsAsync useEffect')

  };

  const fetchProductsByPriceRange = (min: number, max: number) => {
    console.log('fetchProductsAsync fetchProductsByPriceRange')
    dispatch(fetchProductsAsync({ page: 1, limit: 20 }));
  };

  useEffect(() => {

    const selectedValues = value.filter((val) => {
      return val !== minPrice && val !== maxPrice && val !== 0;
    });
    setPriceFilterCount(selectedValues.length);
  
    return () => {
      
    }
  }, [value])
  

  useEffect(() => {
    setValue([Number(minPrice), Number(maxPrice)]);
  }, [minPrice, maxPrice]);

  const handleActiveTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    const tabName = event.currentTarget.name;
    setActiveTab(activeTab === tabName ? "" : tabName);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (filterTabRef.current && !filterTabRef.current.contains(event.target as Node)) {
      setActiveTab("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // console.log("ACTIVE_TAB", activeTab);
  return (
    <section className="filters relative z-10 " ref={filterTabRef}>
      {/* Filters */}
      <div className="mb-6 ml-6">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        <ul className="flex flex-wrap mx-2">
          <li className={`px-2 `}>
            <button onClick={handleActiveTab} name="price" className={`filters__tab-btn  ${priceFilterCount > 0 ? 'selected' : ''} flex items-center gap-1 border border-solid border-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-100 transition duration-300`}>
              Price {priceFilterCount > 0 ? (
                <div className="filters__category-count">
                  <span>{priceFilterCount}</span>
                </div>
              ) : (
                <MdArrowDropDown className={`filter-arrow ${activeTab === "price" ? "active" : ""}`} />
              )}
            </button>
          </li>
          <li className={`px-2`}>
            <button onClick={handleActiveTab} name="category" className={`filters__tab-btn ${selectedCategories.length > 0 ? 'selected' : ''} flex items-center gap-1 border border-solid border-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-100 transition duration-300`}>
              Categories
              {selectedCategories.length > 0 ? (
                <div className="filters__category-count">
                  <span>{selectedCategories.length}</span>
                </div>
              ) : (
                <MdArrowDropDown className={`filter-arrow ${activeTab === "category" ? "active" : ""}`} />
              )}
            </button>
          </li>
        </ul>
      </div>
      {/* Render the FilterTab component based on the activeTab state */}
      {activeTab && (
        <div className="absolute bg-white  pt-12  w-full">
          <FilterTab activeTab={activeTab} minPrice={minPrice} maxPrice={maxPrice} value={value} handleChange={handleChange} handleChangeCommitted={handleChangeCommitted} />
        </div>
      )}
    </section>
  );
}

export default Filters;
