import React, { useCallback, useState } from "react";
import { BiSearch, BiHeart, BiBell, BiUser } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppDispatch, RootState } from "../state/store";
import { selectWishlistItems } from "../state/wishlist/wishlistSlice";
import { FaRegBookmark } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { GoTag } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import { Product } from "../types/Product";
import axios from "axios";
import SearchResults from "../components/search-results/SearchResults";
// import debounce from 'lodash/debounce';
import { debounce } from "lodash";
import { setSearchResults } from "../state/products/searchResultSlice";
import { selectSearchQuery, setSearchQuery } from "../state/products/productsSlice";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isValidToken = useSelector((state: RootState) => state.isValidToken.isValidToken);
  const user = useSelector((state: RootState) => state.user.user);
  const isMobile = useSelector((state: RootState) => state.screenWidth.isMobile);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wishlist: string[] = useSelector(selectWishlistItems);
  const [openSubmenu, setOpenSubmenu] = useState("");
  const searchResults = useSelector((state: RootState) => state.search.searchResults);
  // const [searchQuery, setSearchQuery] = useState("");
  const searchQuery = useSelector(selectSearchQuery);

  console.log("user", user);

  // search products by query string using debounce to prevent multiple requests in a short time frame
  const handleSearchProducts = useCallback(
    debounce(async (searchQuery) => {
      if (searchQuery.length < 2) {
        dispatch(setSearchResults([]));
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/search?search=${searchQuery}`);
        const data = response.data;
        dispatch(setSearchResults(data.products));
      } catch (error) {
        console.error("Error searching products:", error);
      }
    }, 500),
    []
  );

  // handles the input change in the search bar
  const handleInputChange = (query: string) => {
    dispatch(setSearchQuery(query));
    // setSearchQuery(query);
    handleSearchProducts(query);
  };

  // empties the search results and search query
  const emptySearchResults = () => {
    dispatch(setSearchResults([]));
    dispatch(setSearchQuery(""));
  };

  // toggles the search bar on mobile
  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev);
  };

  // toggles the menu on mobile
  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setOpenSubmenu("");
  };

  // opens the submenu
  const handleOpenSubmenu = (menu: string) => {
    if (menu === openSubmenu) {
      setOpenSubmenu("");
      return;
    }
    setOpenSubmenu(menu);
  };

  // Google Auth
  const googleAuth = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google`, "_self");
  };

  return (
    <header className="">
      <div className="container">
        <div className="header__inner py-4 flex items-center justify-between ">
          {isMobile ? (
            <button onClick={handleToggleMenu}>
              <RxHamburgerMenu size={30} className="cursor-pointer" />
            </button>
          ) : (
            ""
          )}
          <div className="text-2xl font-bold">
            <NavLink to={"/"}>Your Logo</NavLink>
          </div>

          {!isMobile ? (
            <div className="flex items-center border border-solid border-gray-200 rounded-lg header__search search">
              <button className=" px-4 h-10 rounded-r-md transition-colors duration-300">
                <BiSearch size={24} />
              </button>
              <input type="search" value={searchQuery} onChange={(e) => handleInputChange(e.target.value)} placeholder="Search..." className=" text-white px-4 py-2 h-10 rounded-l-md focus:outline-none search__input" />
              {searchResults.length > 0 && <SearchResults onClick={emptySearchResults} />}
            </div>
          ) : (
            ""
          )}

          {isSearchOpen && isMobile ? (
            <div className="header__search--mobile">
              <button className="header__search-close" type="button" onClick={handleSearchToggle}>
                <IoMdClose size={24} />
              </button>
              <div className="flex items-center border border-solid border-gray-200 rounded-lg  header__search search">
                <button className=" px-4 h-10 rounded-r-md transition-colors duration-300">
                  <BiSearch size={24} />
                </button>
                <input type="search" value={searchQuery} onChange={(e) => handleSearchProducts(e.target.value)} placeholder="Search..." className=" text-white px-4 py-2 h-10 rounded-l-md focus:outline-none search__input" />
                {searchResults.length > 0 && <SearchResults onClick={emptySearchResults} />}
              </div>
              <div className=" inset-0 bg-gray-500 bg-opacity-50 z-50"></div>
            </div>
          ) : (
            ""
          )}

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {/* Search Mobile */}
            {isMobile ? (
              <button type="button" onClick={handleSearchToggle} className=" px-4 h-10 rounded-r-md  transition-colors duration-300">
                <BiSearch size={24} />
              </button>
            ) : (
              ""
            )}
            {/* Notification Bell */}
            {!isMobile && isValidToken && (
              <button className="header__action hover:text-gray-300 transition-colors duration-300">
                <BiBell size={24} />
              </button>
            )}

            {/* Wishlist Heart */}
            <NavLink to="/wishlist" className="header__action hover:text-gray-300 transition-colors duration-300">
              <BiHeart size={24} />
              {wishlist && wishlist.length > 0 ? <span className="wishlist-counter"> {wishlist.length}</span> : ""}
            </NavLink>
            {!isMobile && isValidToken && (
              <NavLink to="/user-account" className="header__action hover:text-gray-300 transition-colors duration-300">
                <BiUser size={24} />
              </NavLink>
            )}

            {/* <WishlistPopup /> */}

            {/* Sign Up Button */}
            {!isValidToken ? (
              <button type="button" onClick={googleAuth} className="bg-black text-white px-4 py-2 rounded hover:opacity-80 transition-opacity duration-300">
                Sign Up
              </button>
            ) : (
              ""
            )}
          </nav>
        </div>
        {isMenuOpen || !isMobile ? (
          <nav className="header__bottom px-6 nav-bottom">
            {isMobile ? (
              <button type="button" onClick={handleToggleMenu}>
                <IoMdClose className="cursor-pointer" size={30} />
              </button>
            ) : (
              ""
            )}
            <ul className="header-botton-list flex items-center justify-between">
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
              <li onClick={() => handleOpenSubmenu("pages")} className={`nav-bottom__item ${openSubmenu === "pages" ? "active" : ""}`}>
                <button className="nav__link">
                  <span className="link-title sp-link-title">Pages</span>
                  <IoIosArrowDown className="text-white arrow-down" />
                </button>
                <ul className="menu-dropdown sub-menu collapse" id="sub-collapse-pages">
                  <li className="submenu-li">
                    <NavLink to="/pages/about-us-02" className="sublink-title">
                      <span className="sp-link-title">About us</span>
                      {/* <span className="menu-arrow">
                        <MdKeyboardArrowRight />
                      </span> */}
                    </NavLink>
                  </li>

                  <li className="submenu-li">
                    <button type="button" className="sublink-title">
                      <span className="sp-link-title">Contact us</span>
                      {/* <span className="menu-arrow">
                        <MdKeyboardArrowRight />
                      </span> */}
                    </button>
                  </li>

                  <li className="submenu-li">
                    <NavLink to="/pages/faqs" className="sublink-title">
                      <span className="sp-link-title">Faq's</span>
                    </NavLink>
                  </li>

                  <li className="submenu-li">
                    <NavLink to="/pages/return-policy" className="sublink-title">
                      <span className="sp-link-title">Refund policy</span>
                    </NavLink>
                  </li>

                  <li className="submenu-li">
                    <NavLink to="/pages/delivery-return" className="sublink-title">
                      <span className="sp-link-title">Shipping &amp; return</span>
                    </NavLink>
                  </li>

                  <li className="submenu-li">
                    <NavLink to="/pages/store-location" className="sublink-title">
                      <span className="sp-link-title">Store locations</span>
                    </NavLink>
                  </li>

                  <li className="submenu-li">
                    <NavLink to="/pages/privacy-policy" className="sublink-title">
                      <span className="sp-link-title">Privacy policy</span>
                    </NavLink>
                  </li>

                  <li className="submenu-li">
                    <NavLink to="/pages/terms-condition" className="sublink-title">
                      <span className="sp-link-title">Terms &amp; condition</span>
                    </NavLink>
                  </li>

                  <li className="submenu-li">
                    <NavLink to="/404" className="sublink-title">
                      <span className="sp-link-title">Page not found</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
              {user?.isAdmin && (
                <li className="nav-bottom__item">
                  <NavLink to="/dashboard" className="nav__link">
                    <span className="link-title sp-link-title">Dashboard</span>
                  </NavLink>
                </li>
              )}
            </ul>
            <div className="header__action-btns">
              <button className="header__deals-today">
                <FaRegBookmark />
                <span>Deals today</span>
              </button>
              <button className="header__special-prices cursor-pointer">
                <GoTag />
                <span>Special offers</span>
              </button>
            </div>
          </nav>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Header;
