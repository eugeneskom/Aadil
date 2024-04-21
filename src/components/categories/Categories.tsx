import React, { useEffect, useState } from "react";
import { singleCategoryType } from "../../types/singleCategoryType";
import CategoryItem from "./CategoryItem";
import SubcategoryItem from "./SubcategoryItem";
import { fetchProductsAsync, selectCategories, toggleCategory, selectSubcategories, toggleSubcategory } from "../../state/products/productsSlice";
import { AppDispatch } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Categories({ categories }: { categories: singleCategoryType[] }) {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCategories = useSelector(selectCategories);
  const selectedSubcategories = useSelector(selectSubcategories);
  const [showAllCategories, setShowAllCategories] = useState(true);
  const {categoryName} = useParams()

  console.log("categoryName", categoryName,'selectedCategories',selectedCategories);


  useEffect(() => {
    if(categoryName){
      setShowAllCategories(false)
    }
  
    return () => {
      
    }
  }, [categoryName])
  
 
  useEffect(() => {
    
    const fetchData = async () => {
      await dispatch(fetchProductsAsync({}));
      console.log('fetchProductsAsync Categories useEffect')

    };

    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 300); // Adjust the debounce delay as needed (e.g., 300ms)

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [dispatch, selectedCategories, selectedSubcategories]);

  

  const handleSelectedCategories = (category: string) => {
    if (selectedCategories.includes(category)) {
      dispatch(toggleCategory(category));
      setShowAllCategories(true);
    } else {
      dispatch(toggleCategory(category));
      setShowAllCategories(false);
    }
  };

  const handleSelectedSubcategories = (subcategory: string) => {
    dispatch(toggleSubcategory(subcategory));
  };

  const handleShowAllCatClick = () => {
    dispatch(toggleCategory(""));
    dispatch(toggleSubcategory(""));

    setShowAllCategories(true);
  };

  const visibleSubcategories = [...categories].filter((category) => selectedCategories.includes(category.category)).flatMap((category) => category.subcategories);

  const visibleCategories = showAllCategories ? categories : [...categories].filter((category) => selectedCategories.includes(category.category));
  console.log("visibleCategories", visibleCategories, " - ", 'categories',categories);
  return (
    <div className="categories-block flex">
      <div className="categories-block__wrapper mr-4">
        <h3 className="text-xl font-semibold mb-4">Category Filter</h3>
        <div className="space-y-3">
          {/* Do not display show all categories on the category product page */}
          {!categoryName  && <CategoryItem key="view-all" category={{ category: "View All Categories", count: categories.length, subcategories: [] }} onClick={handleShowAllCatClick} selected={showAllCategories ? ["View All Categories"] : []} />}
          {showAllCategories && categories.map((category: singleCategoryType) => <CategoryItem key={category.category} category={category} onClick={handleSelectedCategories} selected={selectedCategories} />)}
          {!showAllCategories && visibleCategories.map((category: singleCategoryType) => <CategoryItem key={category.category} category={category} onClick={handleSelectedCategories} selected={selectedCategories} />)}
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
