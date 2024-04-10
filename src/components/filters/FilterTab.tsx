import { Box, Slider } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectMaxPriceRange, selectMinPriceRange, selectProductsLength } from "../../state/products/productsSlice";
import { selectCategories } from "../../state/categories/categoriesSlice";
import { singleCategoryType } from "../../types/singleCategoryType";
import Categories from "../categories/Categories";
interface FilterTabProps {
  activeTab: string;
  minPrice: number | null;
  maxPrice: number | null;
  value: number[];
  handleChange: (event: Event, newValue: number | number[]) => void;
  handleChangeCommitted: (newValue: number | number[]) => void;
}

const FilterTab: React.FC<FilterTabProps> = ({ activeTab, minPrice, maxPrice, value, handleChange, handleChangeCommitted }) => {
  const filteredResultLength = useSelector(selectProductsLength);
  const categories = useSelector(selectCategories);
  const minPriceRange = useSelector(selectMinPriceRange);
  const maxPriceRange = useSelector(selectMaxPriceRange);
  console.log("categories", categories);

  return (
    <div className="filters">
      {activeTab === "price" && (
        <>
          <h1 className="text-lg font-bold mb-11 ml-4">Price:</h1>
          <Box sx={{ width: 300, marginLeft: 4 }}>
            <Slider value={value} min={Number(minPrice)} max={Number(maxPrice)} onChange={handleChange} valueLabelDisplay="on" onChangeCommitted={(event, newValue) => handleChangeCommitted(newValue)} />
          </Box>

          <div className="filters-rice__content flex justify-between bg-gray-200 p-4">
            <h2>Applied filters:</h2>
            <p className="flex justify-between gap-5">
              {value[0] !== minPrice && <span>Min price: ${value[0]}</span>}
              {value[1] !== maxPrice && <span>Max Price: ${value[1]}</span>}
              {value[0] === minPrice && value[1] === maxPrice && "No filters applied"}
            </p>

            <p>Result : {filteredResultLength} items</p>
          </div>
        </>
      )}
      {activeTab === "category" && (
        <div className="border border-gray-300 rounded-lg p-4">
          {/* Render the category filter content here */}
          <Categories categories={categories} />
        </div>
      )}
    </div>
  );
};

export default FilterTab;
