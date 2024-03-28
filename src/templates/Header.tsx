import React, { useState } from "react";
import { BiSearch, BiHeart, BiBell, BiUser } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../state/store";

const Header = () => {
  const isValidToken = useSelector((state: RootState) => state.isValidToken.isValidToken);
  const isMobile = useSelector((state: RootState) => state.screenWidth.isMobile);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev);
  };
  console.log("isMobile", isMobile);

  return (
    <header className="">
      <div className="container">
        <div className="header__inner py-4 px-6 flex items-center justify-between ">
          {/* Logo */}
          {isMobile ? (
            <button type="button" onClick={handleSearchToggle} className=" px-4 h-10 rounded-r-md  transition-colors duration-300">
              <BiSearch size={24} />
            </button>
          ) : (
            ""
          )}
          <div className="text-2xl font-bold">
            <NavLink to={"/"}>Your Logo</NavLink>
          </div>
          {/* Search Desktop*/}
          {!isMobile ? (
            <div className="flex items-center border border-solid border-gray-200 rounded-lg overflow-hidden header__search search">
              <button className=" px-4 h-10 rounded-r-md  transition-colors duration-300">
                <BiSearch size={24} />
              </button>
              <input type="text" placeholder="Search..." className=" text-white px-4 py-2 h-10 rounded-l-md focus:outline-none search__input" />
            </div>
          ) : (
            ""
          )}

          {isSearchOpen && isMobile ? (
            <div className="header__search--mobile">
              <button className="header__search-close" type="button" onClick={handleSearchToggle}>
                <IoMdClose size={24} />
              </button>
              <div className="flex items-center border border-solid border-gray-200 rounded-lg overflow-hidden header__search search">
                <button className=" px-4 h-10 rounded-r-md  transition-colors duration-300">
                  <BiSearch size={24} />
                </button>
                <input type="text" placeholder="Search..." className=" text-white px-4 py-2 h-10 rounded-l-md focus:outline-none search__input" />
              </div>
              <div className=" inset-0 bg-gray-500 bg-opacity-50 z-50"></div>
            </div>
          ) : (
            ""
          )}

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
            <NavLink to="/user-account" className="hover:text-gray-300 transition-colors duration-300">
              <BiUser size={24} />
            </NavLink>

            {/* <WishlistPopup /> */}

            {/* Sign Up Button */}
            {!isValidToken ? <button className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition-colors duration-300">Sign Up</button> : ""}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
