import React from "react";
import { Product } from "../types/Product";
import { IoCloseOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
interface ProductPreviewPopupProps {
  product: Product;
  onClick: () => void;
}

function ProductPreviewPopup({ product, onClick }: ProductPreviewPopupProps) {
  console.log("ProductPreviewPopup", product, product.Colors, product.Colors.length);

  function extractTextFromHTML(htmlString: string) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    return tempElement.textContent || tempElement.innerText || "";
  }

  const productDescription = extractTextFromHTML(product.Description);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl pl-5 pb-5 ">
        <div className="flex items-center justify-end ">
          <button onClick={onClick} className="text-white hover:bg-orange-500 product-popup-close">
            <IoCloseOutline size={24} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="border border-gray-300 rounded">
            <img src={product.ImageUrl} alt={product.Name} className="w-full h-auto rounded-lg" />
          </div>
          <div className="flex flex-col pr-5">
            <h2 className="text-2xl font-semibold mb-2">{product.Name}</h2>

            <p className="text-gray-600 mb-2 font-bold">
              {/* Price:{" "} */}
              {product.CurrentPrice && (
                <span className={product.OriginalPrice === product.CurrentPrice ? "text-gray-500" : "price-sale-color text-lg"}>
                  {product.CurrentPrice} {product.Currency}
                </span>
              )}
              {" "}
              {product.OriginalPrice !== product.CurrentPrice && (
                <span className="text-gray-500 line-through ml-2 text-sm">
                  {product.OriginalPrice} {product.Currency}
                </span>
              )}{" "}
            </p>

            <p className="text-gray-500 mb-2 border-t border-solid border-gray-200 mt-3 pt-3">
              <span className="text-black text-preview">{productDescription}</span>
            </p>

            {product.Colors.length > 0 ? (
              <p className="mb-2">
                Colors:{" "}
                {product.Colors.map((color) => (
                  <span>{color}</span>
                ))}
              </p>
            ) : (
              ""
            )}
            <p className="mb-2">Manufacturer: {product.Manufacturer}</p>
            <NavLink to={`${product.Url}`} target="_blank" rel="noopener noreferrer" className="  text-white font-bold uppercase px-4 py-2 rounded-md  mt-auto product-popup__action">Buy It Now</NavLink>
            {/* Add more product details here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPreviewPopup;
