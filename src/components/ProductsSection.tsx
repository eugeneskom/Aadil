import React from "react";
import { FaHeart } from "react-icons/fa";
const ProductSection = () => {
  // Dummy data for products
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      description: "This is a description for Product 1.",
      imageUrl: "https://www.sentrypc.com/assets/img/sentrypc/boxes/2021/spc-google-merchant.png",
      brand: "Brand A",
    },
    {
      id: 2,
      name: "Product 2",
      price: 24.99,
      description: "This is a description for Product 2.",
      imageUrl: "https://www.sentrypc.com/assets/img/sentrypc/boxes/2021/spc-google-merchant.png",
      brand: "Brand B",
    },
    {
      id: 3,
      name: "Product 2",
      price: 24.99,
      description: "This is a description for Product 2.",
      imageUrl: "https://www.sentrypc.com/assets/img/sentrypc/boxes/2021/spc-google-merchant.png",
      brand: "Brand C",
    },
    {
      id: 4,
      name: "Product 2",
      price: 24.99,
      description: "This is a description for Product 2.",
      imageUrl: "https://www.sentrypc.com/assets/img/sentrypc/boxes/2021/spc-google-merchant.png",
      brand: "Brand A",
    },
    {
      id: 5,
      name: "Product 2",
      price: 24.99,
      description: "This is a description for Product 2.",
      imageUrl: "https://www.sentrypc.com/assets/img/sentrypc/boxes/2021/spc-google-merchant.png",
      brand: "Brand A",
    },
    // Add more products as needed
  ];


  const displayedProducts = products.slice(0,3);
  const totalProducts = products.length;
  const displayedProductsCount = displayedProducts.length;
  const loadingPercentage = (displayedProductsCount / totalProducts) * 100;


  return (
    <div className="container mx-auto py-8">
      {/* Filters */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        <div className="flex flex-wrap -mx-2">
          <div className="px-2">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Filter 1</button>
          </div>
          <div className="px-2">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Filter 2</button>
          </div>
          {/* Add more filter buttons as needed */}
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.imageUrl} alt={product.name} className="w-full max-h-[300px] object-contain" />
            <div className="p-4 relative">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 mb-2">${product.price}</p>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-gray-500  mb-2">
                From: <span className="text-black font-bold">{product.brand}</span>{" "}
              </p>
              <button className="absolute top-0 right-0 m-2 text-gray-500 hover:text-red-500 transition-colors duration-300">
                <FaHeart size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
   

      <div className="flex flex-col items-center mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${loadingPercentage}%` }}></div>
        </div>
        <p className="text-gray-600 mb-2">
          Showing {displayedProductsCount} of {totalProducts} products
        </p>
        <button className="bg-white text-black border border-black px-8 py-3 rounded-md hover:bg-gray-100 transition-colors duration-300">
          Show More
        </button>
      </div>
    </div>
  );
};

export default ProductSection;
