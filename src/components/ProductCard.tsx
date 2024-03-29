import React, { useCallback, useEffect, useState } from "react";
import { Product } from "../types/Product";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../state/user/userSlice";
import { AppDispatch } from "../state/store";
import { RootState } from "../state/store";
import axios from "axios";
// import { setWishlist, toggleWishlist } from "../state/wishlist/wishlistSlice";
import { selectToken } from "../state/token/tokenSlice";
import { toggleWishlist } from "../state/wishlist/wishlistSlice";
import { IoEyeOutline } from "react-icons/io5";
import ProductPreviewPopup from "./ProductPreviewPopup ";
import { toggleAuthPopup } from "../state/AuthPopupStateSlice";
interface ProductProps {
  product: Product;
}
function ProductCard({ product }: ProductProps) {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const [showProductPreview, setShowProductPreview] = useState(false);
  // const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch: AppDispatch = useDispatch(); // Cast the dispatch to AppDispatch
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.includes(product.Id);

  useEffect(() => {
    // Checking if the image url is valid, if not the product card won't be rendered
    const img = new Image();
    img.src = product.ImageUrl;
    img.onload = () => setImageIsLoaded(true);
    img.onerror = () => setImageIsLoaded(false);
  }, [product.ImageUrl]);

  if (!imageIsLoaded) {
    return null; // Don't render the product if the image is broken
  }

  const handleWislistIconClick = (productId: string) => {
    if (token) {
      toggleWishlistHandler(productId)
    } else {
      dispatch(toggleAuthPopup());
    }
  };

  const toggleWishlistHandler = async (productId: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/wishlist/toggle`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.success) {
        dispatch(toggleWishlist(productId));
      }
      console.log("toggleWishlist", response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to toggle product in wishlist");
    }
  };

  const toggleProductPreview = () => {
    setShowProductPreview(!showProductPreview);
  };

  return (
    <div key={product.Id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col product-card">
      <div className="product-card__header">
        <ul className="product-card__list">
          <li className="product-card__item">
            <button onClick={toggleProductPreview} type="button" className="m-2 text-white">
              <IoEyeOutline size={25} />
            </button>
          </li>
          <li className="product-card__item">
            <button onClick={() => handleWislistIconClick(product.Id)} type="button" className="a right-0 m-2 ">
              {isInWishlist ? <FaHeart size={20} className="text-white" /> : <FaRegHeart size={20} className="text-white" />}
            </button>
          </li>
        </ul>
        <LazyLoadImage src={product.ImageUrl} height={300} alt={product.Name} className="w-full max-h-[300px] object-cover" />
      </div>

      <div className="p-4 flex-grow relative">
        <h3 className="text-lg font-semibold">{product.Name}</h3>
        <p className="text-gray-600 mb-2 font-bold">
          Price:{" "}
          {product.CurrentPrice && (
            <span className={product.OriginalPrice === product.CurrentPrice ? "text-gray-500" : "price-color-standard mr-2"}>
              {product.CurrentPrice} {product.Currency}
            </span>
          )}
          {product.OriginalPrice !== product.CurrentPrice && (
            <span className="text-gray-500 line-through">
              {product.OriginalPrice} {product.Currency}
            </span>
          )}
        </p>
        <p className="text-gray-500 mb-2">
          {/* From: <span className="text-black font-bold">{product.CampaignName}</span>{" "} */}
          From: <span className="text-black font-bold">{product.Manufacturer}</span>{" "}
        </p>
      </div>

      <div className="p-4 ">
        <NavLink to={`/product-page/${product.Id}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="product-card__open w-full flex justify-cente text-white font-bold py-2 px-4 rounded transition-colors duration-300">
          Read more
        </NavLink>
      </div>
      {showProductPreview ? <ProductPreviewPopup product={product} onClick={toggleProductPreview} /> : ""}
    </div>
  );
}

export default ProductCard;
