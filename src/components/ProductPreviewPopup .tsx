import React from "react";
import { Product } from "../types/Product";
import { IoCloseOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { calculateSalePercentage } from "../helpers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { closeProductPreview } from "../state/productPreviewSlice";
interface ProductPreviewPopupProps {
  product: Product;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function ProductPreviewPopup() {
  const dispatch = useDispatch();
  const { product, isOpen } = useSelector((state: RootState) => state.productPreview);

  if (!product || !isOpen) {
    return null;
  }

  console.log("ProductPreviewPopup", product.Category, product.SubCategory);
  const salePercentage = calculateSalePercentage(product);
  console.log("salePercentage", salePercentage);
  function extractTextFromHTML(htmlString: string) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    return tempElement.textContent || tempElement.innerText || "";
  }

  const productDescription = extractTextFromHTML(product.Description);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-5">
        <div className="flex items-center justify-end">
          <button onClick={() => dispatch(closeProductPreview())} className="text-gray-500 hover:bg-orange-500 product-popup-close">
            <IoCloseOutline size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-gray-300 rounded">
            <img src={product.ImageUrl} alt={product.Name} className="w-full h-auto rounded-lg" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold mb-2">{product.Name}</h2>
            <p className="text-gray-600 mb-2 font-bold">
              {product.CurrentPrice && (
                <span className={product.OriginalPrice === product.CurrentPrice ? "text-gray-500" : "price-sale-color text-lg"}>
                  {product.CurrentPrice} {product.Currency}
                </span>
              )}{" "}
              {product.OriginalPrice !== product.CurrentPrice && (
                <span className="text-gray-500 line-through ml-2 text-sm">
                  {product.OriginalPrice} {product.Currency}
                </span>
              )}
            </p>
            <p className="text-gray-500 mb-2 border-t border-solid border-gray-200 mt-3 pt-3">
              <span className="text-black text-preview">{productDescription}</span>
            </p>
            {product.Colors.length > 0 ? (
              <p className="mb-2">
                Colors:{" "}
                {product.Colors.map((color) => (
                  <span key={color}>{color}</span>
                ))}
              </p>
            ) : (
              ""
            )}
            {product.Category && product.Category.filter((category) => category.trim() !== "").length > 0 && (
              <p className="text-gray-500 mb-2">
                Category: <span className="text-black font-bold">{product.Category.filter((category) => category.trim() !== "").join(", ")}</span>
              </p>
            )}
            {product.SubCategory && product.SubCategory.filter((subcategory) => subcategory.trim() !== "").length > 0 && (
              <p className="text-gray-500 mb-2">
                Subcategory: <span className="text-black font-bold">{product.SubCategory.filter((subcategory) => subcategory.trim() !== "").join(", ")}</span>
              </p>
            )}
            <p className="mb-2">Manufacturer: {product.Manufacturer}</p>
            <NavLink to={`${product.Url}`} target="_blank" rel="noopener noreferrer" className="text-center text-white font-bold uppercase px-4 py-2 rounded-md mt-auto product-popup__action">
              Buy It Now
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPreviewPopup;
