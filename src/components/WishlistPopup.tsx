import React, { useState } from "react";
import { Product } from "../types/Product";
interface WhishlistProps {
  wishlistItems: Product[];
}
// { wishlistItems }: WhishlistProps
const WishlistPopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button className="text-gray-600 hover:text-gray-900 focus:outline-none" onClick={togglePopup}>
        <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </button>

      {/* {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10">
          <div className="py-2">
            {wishlistItems.length > 0 ? (
              wishlistItems.map((item) => (
                <div key={item.Id} className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <img src={item.ImageUrl} alt={item.Name} className="w-12 h-12 object-cover rounded-md mr-4" />
                  <div>
                    <p className="text-sm font-medium">{item.Name}</p>
                    <p className="text-sm text-gray-500">${item.CurrentPrice}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">Your wishlist is empty</div>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default WishlistPopup;
