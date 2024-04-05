import { Box, Slider } from "@mui/material";
import React from "react";

interface FilterTabProps {
  activeTab: string;
  minPrice: number | null;
  maxPrice: number | null;
  value: number[];
  handleChange: (event: Event, newValue: number | number[]) => void;
  handleChangeCommitted: (newValue: number | number[]) => void;
}

const FilterTab: React.FC<FilterTabProps> = ({ activeTab, minPrice, maxPrice, value, handleChange, handleChangeCommitted }) => {
  return (
    <>
      {activeTab === "price" && (
        <>
          <h1 className="text-lg font-bold mb-11">Price:</h1>
          <Box sx={{ width: 300, marginLeft: 4 }}>
            <Slider value={value} min={Number(minPrice)} max={Number(maxPrice)} onChange={handleChange} valueLabelDisplay="on" onChangeCommitted={(event, newValue) => handleChangeCommitted(newValue)} />
            <h2>Applied filters:</h2>
            <p className="flex justify-between">
              {value[0] !== minPrice && <span>Min price: {value[0]}</span>}
              {value[1] !== maxPrice && <span>Max Price: {value[1]}</span>}
              {value[0] === minPrice && value[1] === maxPrice && "No filters applied"}
            </p>
          </Box>
        </>
      )}
      {activeTab === "category" && (
        <div>
          {/* Render the category filter content here */}
          Category Filter
        </div>
      )}
    </>
  );
};

export default FilterTab;
