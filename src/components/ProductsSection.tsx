import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Product } from "../types/Product";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { selectPage, incrementPage, fetchProductsAsync, selectProducts, selectProductsStatus, selectProductsError } from "../state/products/productsSlice";
import { NavLink } from "react-router-dom";
import Image from "../images/bird.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProductCard from "./Product";

const ProductSection = () => {
  const dispatch = useDispatch();
  const products: Product[] = useSelector(selectProducts);

  const page = useSelector((state: RootState) => state.products.page);
  console.log("products", products);

  const extractCategories = (products: Product[]) => {
    const categories = new Set(); // Use Set to store unique categories

    products.forEach((product: Product) => {
      const categoryPath = product.OriginalFormatCategory.split(" > ");
      categoryPath.forEach((category) => categories.add(category.trim()));
    });

    return Array.from(categories); // Convert Set to array
  };

  // Usage
  const uniqueCategories = extractCategories(products);
  console.log("Unique Categories:", uniqueCategories);
  useEffect(() => {
    dispatch(fetchProductsAsync({ page: page, limit: 100 }) as any);
  }, [dispatch, page]);

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  useEffect(() => {
    dispatch(incrementPage());
    return () => {};
  }, []);

  const displayedProducts = products ? products.slice(0, 20) : [];
  const totalProducts = products ? products.length : 0;
  const displayedProductsCount = displayedProducts.length;
  const loadingPercentage = totalProducts === 0 ? 0 : (displayedProductsCount / totalProducts) * 100;

  return (
    <div className="container mx-auto py-8 overflow-hidden">
      {/* Filters */}
      <div className="mb-6 ml-6">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        <div className="flex flex-wrap -mx-2">
          <div className="px-2">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Filter 1</button>
          </div>
          <div className="px-2">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Filter 2</button>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <ProductCard product={product} />
          ))}
      </div>

      <div className="flex flex-col items-center mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${loadingPercentage}%` }}></div>
        </div>
        <p className="text-gray-600 mb-2">
          Showing {displayedProductsCount} of {totalProducts} products
        </p>
        <button onClick={handleLoadMore} className="bg-white text-black border border-black px-8 py-3 rounded-md hover:bg-gray-100 transition-colors duration-300">
          Show More
        </button>
      </div>
    </div>
  );
};

export default ProductSection;
