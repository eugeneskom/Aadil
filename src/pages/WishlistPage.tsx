import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectWishlistProducts } from "../state/wishlist/wishlistSlice";
import { AppDispatch, RootState } from "../state/store";
import { selectUser } from "../state/user/userSlice";
import { Product } from "../types/Product";
import { selectProducts } from "../state/products/productsSlice";
import axios from "axios";
import { selectToken } from "../state/token/tokenSlice";
import ProductCard from "../components/ProductCard";

const WishlistPage = () => {
  const token = useSelector(selectToken);
  const wishlist: Product[] = useSelector(selectWishlistProducts);
  console.log("token::::::", token, "wishlist::::", wishlist);

  return (
    <section className="wishlist-page  py-8 mt-3">
      <div className="container mx-auto">
        <div className="wishlist-page__inner">
          <h1 className="text-3xl font-bold mb-6">Wishlist</h1>
          {wishlist.length === 0 ? (
            <p className="text-gray-600">Your wishlist is empty.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-2">
              {wishlist.map((product) => (
                <ProductCard product={product} isWishlist={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WishlistPage;
