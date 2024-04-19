import React from "react";
import { SubcategoryType } from "../../types/singleCategoryType";
import { IoMdCheckmark } from "react-icons/io";

interface SubcategoryItemProps {
  subcategory: SubcategoryType;
  onClick: (subcategory: string) => void;
  selected: string[];
}

const SubcategoryItem: React.FC<SubcategoryItemProps> = ({ subcategory, onClick, selected }) => {
  const isSelected = selected.includes(`${subcategory.category}`);

  return (
    <div className="mb-2">
      <label className="inline-flex items-center">
        <input type="checkbox" id={subcategory.category} name={subcategory.category} checked={isSelected} onChange={() => onClick(subcategory.category)} className="form-checkbox h-4 w-4 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500" />
        <span className="ml-2 font-medium">
          {subcategory.category} ({subcategory.count})
        </span>
        <span className="category-block__mark">
          <IoMdCheckmark />
        </span>
      </label>
    </div>
  );
};

export default SubcategoryItem;
