import React, { useCallback, useEffect } from "react";
import { Product } from "../types/Product";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../state/user/userSlice";
import { AppDispatch } from "../state/store";
import { RootState } from "../state/store";
import { toggleProjectId } from "../state/wishlist/wishlistSlice";
import axios from "axios";
interface ProductProps {
  product: Product;
  wishlist: string[];
}
function ProductCard({ product, wishlist }: ProductProps) {
  const user = useSelector(selectUser);

  const dispatch: AppDispatch = useDispatch(); // Cast the dispatch to AppDispatch
  // const wishlist = useSelector(selectWishlist);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  console.log('wishlistItems',wishlistItems)
  const isInWishlist = wishlistItems.includes(product.Id);

  const userEmail = user ? user.email : "";

  const handleToggleWishlist = () => {
    if (userEmail) {
      dispatch(toggleProjectId({ email: userEmail, productId: product.Id }));
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div key={product.Id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <LazyLoadImage src={product.ImageUrl} height={300} alt={product.Name} className="w-full max-h-[300px] object-contain" />
      <div className="p-4 flex-grow relative">
        <h3 className="text-lg font-semibold">{product.Name}</h3>
        <p className="text-gray-600 mb-2 font-bold">
          Price:{" "}
          {product.OriginalPrice !== product.CurrentPrice && (
            <span className="text-gray-500 line-through">
              {product.OriginalPrice} {product.Currency}
            </span>
          )}
          {product.CurrentPrice && (
            <span className={product.OriginalPrice === product.CurrentPrice ? "text-gray-500" : "text-red-500 ml-2"}>
              {product.CurrentPrice} {product.Currency}
            </span>
          )}
        </p>
        <p className="text-gray-500 mb-2">
          From: <span className="text-black font-bold">{product.CampaignName}</span>{" "}
        </p>

        <button onClick={handleToggleWishlist} type="button" className="absolute top-0 right-0 m-2 text-gray-500 hover:text-red-500 transition-colors duration-300">
          <FaHeart size={20} className={isInWishlist ? "text-red-500" : ""} />
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
