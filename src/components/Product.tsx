import React from "react";
import { Product } from "../types/Product";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
interface ProductProps {
  product: Product;
}
function ProductCard({ product }: ProductProps) {
  return (
    <div key={product.Id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <LazyLoadImage src={product.ImageUrl} height={300} alt={product.Name} className="w-full max-h-[300px] object-contain" />
      <div className="p-4 flex-grow relative">
        <h3 className="text-lg font-semibold">{product.Name}</h3>
        <p className="text-gray-600 mb-2 font-bold">
          <span className="text-gray-500 line-through">
            {product.OriginalPrice} {product.Currency}
          </span>
          {product.CurrentPrice && (
            <span className="text-red-500 ml-2">
              {product.CurrentPrice} {product.Currency}
            </span>
          )}
        </p>
        <p className="text-gray-500 mb-2">
          From: <span className="text-black font-bold">{product.CampaignName}</span>{" "}
        </p>

        <button className="absolute top-0 right-0 m-2 text-gray-500 hover:text-red-500 transition-colors duration-300">
          <FaHeart size={20} />
        </button>
      </div>

      <div className="p-4 bg-gray-50">
        <NavLink to={`/product-page/${product.Id}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-full flex justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
          Read more
        </NavLink>
      </div>
    </div>
  );
}

export default ProductCard;
