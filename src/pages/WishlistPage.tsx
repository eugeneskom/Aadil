import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectWishlist, removeFromWishlist } from "../state/wishlist/wishlistSlice";

const WishlistPage = () => {
  // Dummy data for wishlist items
  const wishlist = useSelector(selectWishlist);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-2">
          {wishlist.map((product) => (
            <div key={product.Id} className="bg-white rounded-lg shadow-md overflow-hidden grid grid-rows-auto gap-4">
              <img src={product.ImageUrl} alt={product.Name} className="w-full h-48 object-contain" />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.Name}</h2>
                <p className="text-gray-600 mb-2 font-bold">
                  {product.OriginalPrice !== product.CurrentPrice && (
                    <span className="text-gray-500 line-through">
                      {product.OriginalPrice} {product.Currency}
                    </span>
                  )}
                  {product.CurrentPrice && (
                    <span className={product.OriginalPrice === product.CurrentPrice ? "text-black" : "text-red-500 ml-2"}>
                      {product.CurrentPrice} {product.Currency}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex justify-around mb-5">
                <button className="mt-auto bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md">Add to Cart</button>
                <button className="mt-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md">Remove from wishlist</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
