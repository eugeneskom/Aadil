import React, { useState } from "react";
import { BiSearch, BiHeart, BiBell, BiUser } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../state/store";
import { selectWishlist } from "../state/wishlist/wishlistSlice";
import { FaRegBookmark } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoTag } from "react-icons/go";
const Header = () => {
  const isValidToken = useSelector((state: RootState) => state.isValidToken.isValidToken);
  const isMobile = useSelector((state: RootState) => state.screenWidth.isMobile);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const wishlist: string[] = useSelector(selectWishlist);

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev);
  };
  console.log("isMobile", isMobile);

  const googleAuth = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`, "_self");
  };

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
            <button className="header__action hover:text-gray-300 transition-colors duration-300">
              <BiBell size={24} />
            </button>

            {/* Wishlist Heart */}
            <NavLink to="/wishlist" className="header__action hover:text-gray-300 transition-colors duration-300">
              <BiHeart size={24} />
              {wishlist && wishlist.length > 0 ? <span className="wishlist-counter"> {wishlist.length}</span> : ""}
            </NavLink>
            <NavLink to="/user-account" className="header__action hover:text-gray-300 transition-colors duration-300">
              <BiUser size={24} />
            </NavLink>

            {/* <WishlistPopup /> */}

            {/* Sign Up Button */}
            {!isValidToken ? (
              <button type="button" onClick={googleAuth} className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition-colors duration-300">
                Sign Up
              </button>
            ) : (
              ""
            )}
          </nav>
        </div>
        <nav className="header__bottom px-6 nav-bottom">
          <ul className="flex items-center justify-between">
            <li className="nav-bottom__item">
              <NavLink to="/" className="nav__link">
                <span className="link-title sp-link-title">Home</span>
              </NavLink>
            </li>
            <li className="nav-bottom__item">
              <NavLink to="/products" className="nav__link">
                <span className="link-title sp-link-title">Products</span>
              </NavLink>
            </li>
            <li className="nav-bottom__item">
              <NavLink to="/about" className="nav__link">
                <span className="link-title sp-link-title">About</span>
              </NavLink>
            </li>
            <li className="nav-bottom__item">
              <NavLink to="/pages" className="nav__link">
                <span className="link-title sp-link-title">Pages</span>
                <IoIosArrowDown className="text-white arrow-down" />
              </NavLink>
              <ul className="menu-dropdown sub-menu collapse" id="sub-collapse-pages">
                <li className="submenu-li">
                  <a href="/pages/about-us-02" className="sublink-title">
                    <span className="sp-link-title">About us</span>
                    <span className="menu-arrow">
                      <MdKeyboardArrowRight />
                    </span>
                  </a>

                  <ul className="supmenu-dropdown collapse" id="sup-collapse-about-us">
                    <li className="supmenu-li">
                      <a href="/pages/about-us" className="suplink-title">
                        <span className="sp-link-title">About us 01</span>
                      </a>
                    </li>

                    <li className="supmenu-li">
                      <a href="/pages/about-us-02" className="suplink-title">
                        <span className="sp-link-title">About us 02</span>
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="submenu-li">
                  <a href="/pages/contact" className="sublink-title">
                    <span className="sp-link-title">Contact us</span>
                    <span className="menu-arrow">
                      <MdKeyboardArrowRight />
                    </span>
                  </a>
                  <ul className="supmenu-dropdown collapse" id="sup-collapse-contact-us">
                    <li className="supmenu-li">
                      <a href="/pages/contact" className="suplink-title">
                        <span className="sp-link-title">Contact us 01</span>
                      </a>
                    </li>

                    <li className="supmenu-li">
                      <a href="/pages/contact-us-02" className="suplink-title">
                        <span className="sp-link-title">Contact us 02</span>
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="submenu-li">
                  <a href="/pages/faqs" className="sublink-title">
                    <span className="sp-link-title">Faq's</span>
                  </a>
                </li>

                <li className="submenu-li">
                  <a href="/pages/return-policy" className="sublink-title">
                    <span className="sp-link-title">Refund policy</span>
                  </a>
                </li>

                <li className="submenu-li">
                  <a href="/pages/delivery-return" className="sublink-title">
                    <span className="sp-link-title">Shipping &amp; return</span>
                  </a>
                </li>

                <li className="submenu-li">
                  <a href="/pages/store-location" className="sublink-title">
                    <span className="sp-link-title">Store locations</span>
                  </a>
                </li>

                <li className="submenu-li">
                  <a href="/pages/privacy-policy" className="sublink-title">
                    <span className="sp-link-title">Privacy policy</span>
                  </a>
                </li>

                <li className="submenu-li">
                  <a href="/pages/terms-condition" className="sublink-title">
                    <span className="sp-link-title">Terms &amp; condition</span>
                  </a>
                </li>

                <li className="submenu-li">
                  <a href="/404" className="sublink-title">
                    <span className="sp-link-title">Page not found</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div className="header__action-btns">
            <button className="header__deals-today">
              <FaRegBookmark />
              <span>Deals today</span>
            </button>
            <button className="header__special-prices">
            <GoTag />
              <span>Special offers</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
