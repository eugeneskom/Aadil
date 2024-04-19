import React, { useEffect, useState } from "react";
import { singleCategoryType } from "../../types/singleCategoryType";
import CategoryItem from "./CategoryItem";
import SubcategoryItem from "./SubcategoryItem";
import { fetchProductsAsync, selectCategories, toggleCategory } from "../../state/products/productsSlice";
import { AppDispatch } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";

function Categories({ categories }: { categories: singleCategoryType[] }) {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCategories = useSelector(selectCategories);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [showAllCategories, setShowAllCategories] = useState(true);
  const [showViewAll, setShowViewAll] = useState(false);
  useEffect(() => {
    dispatch(fetchProductsAsync({}));
  }, [dispatch, selectedCategories, selectedSubcategories]);

  const handleSelectedCategories = (category: string) => {
    dispatch(toggleCategory(category));
    setShowViewAll(true);
  };

  const handleSelectedSubcategories = (subcategory: string) => {
    setSelectedSubcategories((prevSelectedSubcategories) => {
      if (prevSelectedSubcategories.includes(subcategory)) {
        return prevSelectedSubcategories.filter((item) => item !== subcategory);
      } else {
        return [...prevSelectedSubcategories, subcategory];
      }
    });
  };

  const handleShowAllCatClick = () => {
    setShowViewAll(false);
    setShowAllCategories(true);
  }

  const visibleSubcategories = [...categories]
    .filter((category) => {
      console.log("selectedCategories", selectedCategories, selectedCategories.includes(category.category) || showAllCategories);
      return selectedCategories.includes(category.category) || showAllCategories;
    })
    .flatMap((category) => category.subcategories);

  const visibleCategories = showAllCategories ? categories : [...categories].filter((category) => selectedCategories.includes(category.category));
  console.log("showAllCategories", showAllCategories, "visibleSubcategories", visibleSubcategories, "visibleCategories", visibleCategories, "categories", categories);

  return (
    <div className="categories-block flex">
      <div className="categories-block__wrapper mr-4">
        <h3 className="text-xl font-semibold mb-4">Category Filter</h3>
        <div className="space-y-3">
          {showViewAll && <CategoryItem key="view-all" category={{ category: "View All Categories", count: categories.length, subcategories: [] }} onClick={handleShowAllCatClick} selected={showAllCategories ? ["View All Categories"] : []} />}
          {visibleCategories.map((category: singleCategoryType) => (
            <>
              {console.log("visibleCategories category", selectedCategories)}
              <CategoryItem key={category.category} category={category} onClick={handleSelectedCategories} selected={selectedCategories} />
            </>
          ))}
        </div>
      </div>
      <div className="subcategories-block__wrapper">
        <h3 className="text-xl font-semibold mb-4">Subcategories</h3>
        <div className="space-y-3">
          {visibleSubcategories.map((subcategory) => (
            <SubcategoryItem key={subcategory.category} subcategory={subcategory} onClick={handleSelectedSubcategories} selected={selectedSubcategories} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
