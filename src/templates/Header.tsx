import React from "react";
import { BiSearch, BiHeart, BiBell } from "react-icons/bi";
import WishlistPopup from "../components/WishlistPopup";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <NavLink to={'/'}>Your Logo</NavLink>
      </div>

      {/* Search */}
      <div className="flex items-center">
        <input type="text" placeholder="Search..." className="bg-gray-700 text-white px-4 py-2 h-10 rounded-l-md focus:outline-none" />
        <button className="bg-gray-700 px-4 h-10 rounded-r-md hover:bg-gray-600 transition-colors duration-300">
          <BiSearch size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button className="hover:text-gray-300 transition-colors duration-300">
          <BiBell size={24} />
        </button>

        {/* Wishlist Heart */}
        <NavLink to="/wishlist" className="hover:text-gray-300 transition-colors duration-300">
          <BiHeart size={24} />
        </NavLink>

        {/* <WishlistPopup /> */}

        {/* Sign Up Button */}
        <button className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition-colors duration-300">Sign Up</button>
      </nav>
    </header>
  );
};

export default Header;
