import React, { useEffect, useState } from "react";
import { singleCategoryType } from "../../types/singleCategoryType";
import CategoryItem from "./CategoryItem";
import { fetchProductsAsync, selectCategories, toggleCategory } from "../../state/products/productsSlice";
import { AppDispatch } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";

function Categories({ categories }: { categories: singleCategoryType[] }) {
  const dispatch = useDispatch<AppDispatch>();

  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const selectedCategories = useSelector(selectCategories);
  console.log("selectedCategories", selectedCategories);
  
  useEffect(() => {
    dispatch(fetchProductsAsync({}));
  }, [dispatch, selectedCategories]);

  const handleSelectedCategories = (category: string) => {
    dispatch(toggleCategory(category));
  };
  // const handleSelectedCategories = (category: string) => {
  //   console.log("category", category);
  //   setSelectedCategories((prevSelectedCategories) => {
  //     const categoryIndex = prevSelectedCategories.indexOf(category);
  //     if (categoryIndex !== -1) {
  //       return prevSelectedCategories.filter((item) => item !== category);
  //     } else {
  //       return [...prevSelectedCategories, category];
  //     }
  //   });
  // };

  return (
    <div className="categories-block">
      <h3 className="text-xl font-semibold mb-4">Category Filter</h3>
      <div className="space-y-3 categories-block__wrapper">
        {categories.map((category: singleCategoryType) => (
          <CategoryItem category={category} onClick={handleSelectedCategories} selected={selectedCategories} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
