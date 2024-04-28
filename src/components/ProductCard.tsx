import React, { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { RootState } from "../state/store";
// import { setWishlist, toggleWishlist } from "../state/wishlist/wishlistSlice";
import { selectToken } from "../state/token/tokenSlice";
import { toggleWishlistAsync } from "../state/wishlist/wishlistSlice";
import { IoEyeOutline } from "react-icons/io5";
import ProductPreviewPopup from "./ProductPreviewPopup ";
import { toggleAuthPopup } from "../state/AuthPopupStateSlice";
import { calculateSalePercentage } from "../helpers";
interface ProductProps {
  product: Product;
  isWishlist?: boolean;
}

function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function ProductCard({ product, isWishlist }: ProductProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const [showProductPreview, setShowProductPreview] = useState(false);
  const token = useSelector(selectToken);
  const dispatch: AppDispatch = useDispatch(); // Cast the dispatch to AppDispatch
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.includes(product.Id);
  console.log(location.pathname, "location.pathname");
  // Calculate the sale percentage
  const salePercentage = calculateSalePercentage(product);

  useEffect(() => {
    // Checking if the image url is valid, if not the product card won't be rendered
    const img = new Image();
    img.src = product.ImageUrl;
    img.onload = () => setImageIsLoaded(true);
    img.onerror = () => setImageIsLoaded(false);
  }, [product.ImageUrl]);

  // if (!imageIsLoaded) {
  //   return null; // Don't render the product if the image is broken
  // }

  const handleWislistIconClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>,productId: string) => {
    e.stopPropagation();
    console.log("handleWislistIconClick", token);
    if (token) {
      // toggleWishlistHandler(productId);
      dispatch(toggleWishlistAsync({ productId, token }));
    } else {
      //save product id before registration to add it to the user account once created
      localStorage.setItem("productIdWishlist", productId);
      dispatch(toggleAuthPopup());
    }
  };

  const toggleProductPreview = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowProductPreview(!showProductPreview);
  };

  const handleViewProduct = (product: Product) => {
    console.log('Product_card handleViewProduct')
    navigate(`/product/${product.Id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBuyNow = (product: Product) => {
    window.open(product.Url, "_blank");
  };

  const navigateToLocation = () => {
    navigate(`product/${product.Id}`);
  };

  const navigateToBrand = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const brandPage = isBrandPage(location.pathname);
    if(brandPage) return;
    navigate(`/brand/${product.Manufacturer.toLowerCase().replace(/\s+/g, '-')}`);
  }

  const isBrandPage = (url: string): boolean => {
  const pattern = /^\/brand\/[^/]+$/;
  return pattern.test(url);
};


  return (
    <div onClick={navigateToLocation} key={product.Id} className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden flex flex-col product-card">
      <div className="product-card__header">
        {salePercentage !== null && <div className="sale-percentage "> - {salePercentage}%</div>}
        <ul className="product-card__list">
          <li className="product-card__item">
            <button onClick={(e) => toggleProductPreview(e)} type="button" className="m-2 text-white">
              <IoEyeOutline size={25} />
            </button>
          </li>
          <li className="product-card__item">
            <button onClick={(e) => handleWislistIconClick(e,product.Id)} type="button" className="a right-0 m-2 ">
              {isInWishlist ? <FaHeart size={20} className="text-white" /> : <FaRegHeart size={20} className="text-white" />}
            </button>
          </li>
        </ul>
        <div style={{ height: "300px" }}>
          <LazyLoadImage src={product.ImageUrl} height={300} alt={product.Name} className="w-full max-h-[300px] object-cover" />
        </div>
      </div>

      <div className="p-4 flex-grow relative">
        <h3 className="text-lg font-semibold">{product.Name}</h3>
        <p className="text-gray-600 mb-2 font-bold">
          Price: {product.CurrentPrice && <span className={product.OriginalPrice === product.CurrentPrice ? "text-gray-500" : "price-color-standard mr-2"}>${product.CurrentPrice}</span>}
          {product.OriginalPrice && product.OriginalPrice !== product.CurrentPrice && <span className="text-gray-500 line-through">${product.OriginalPrice}</span>}
        </p>
        <p className="text-gray-500 mb-2">
          {/* From: <span className="text-black font-bold">{product.CampaignName}</span>{" "} */}
          From:{" "}
          {/* <NavLink to={`brand/${capitalizeWords(product.Manufacturer)}`} className="text-black font-bold"> */}
          <button onClick={navigateToBrand} className="text-black font-bold">
            {product.Manufacturer}
          </button>{" "}
        </p>
      </div>

      <div className={`p-4 ${isWishlist ? "flex gap-2" : ""}`}>
        {isWishlist ? (
          <button onClick={(e) => handleBuyNow(product)} className="product-card__open w-full flex justify-cente text-white font-bold py-2 px-4 rounded transition-colors duration-300">
            Buy now
          </button>
        ) : (
          <button onClick={(e) => handleViewProduct(product)} className="product-card__open w-full flex justify-cente text-white font-bold py-2 px-4 rounded transition-colors duration-300">
            View Product
          </button>
        )}
      </div>
      {showProductPreview ? <ProductPreviewPopup product={product} onClick={(e) => toggleProductPreview(e)} /> : ""}
    </div>
  );
}

export default ProductCard;
