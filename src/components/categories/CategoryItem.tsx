import React, { useState } from "react";
import { singleCategoryType, SubcategoryType } from "../../types/singleCategoryType";
import { IoMdCheckmark, IoMdArrowDropdown } from "react-icons/io";
import SubcategoryItem from "./SubcategoryItem";

interface CategoryItemProps {
  category: singleCategoryType;
  onClick: (category: string) => void;
  selected: string[];
}

function CategoryItem({
  category,
  onClick,
  selected,
}: CategoryItemProps) {

  return (
    <div key={category.category}>
      <div
        className={`categories-block__item ${
          selected.includes(category.category) ? "active" : ""
        }`}
      >
        <label
          className="inline-flex items-center categories-block__label"
          onClick={() => onClick(category.category)}
        >
          <input
            type="checkbox"
            id={category.category}
            name={category.category}
            checked={selected.includes(category.category)}
            onChange={() => onClick(category.category)}
            className="categories-block__input form-checkbox h-5 w-5 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500"
          />
          <span className="ml-2 font-medium">
            {category.category} ({category.count})
          </span>
          <span className="category-block__mark">
            <IoMdCheckmark />
          </span>


        </label>
      </div>

    </div>
  );
}

export default CategoryItem;