import React from "react";
import { Product } from "../types/Product";
import { selectProductById } from "../state/products/productsSlice";
import { useParams } from "react-router-dom";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";
interface ProductPageProps {
  product: Product;
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const productSelector = selectProductById(id || ''); 
  const product = useSelector((state: RootState) => productSelector(state)); // Call the function with the RootState
  if (id === undefined || product === undefined) return <h1>Product id is undefined</h1>;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:flex lg:-mx-4">
        <div className="lg:px-4 lg:w-1/2">
          <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
            <img src={product.ImageUrl} alt={product.Name} className="object-center object-cover" />
          </div>
        </div>
        <div className="lg:px-4 lg:w-1/2 mt-8 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{product.Name}</h1>
          <p className="mt-3 text-xl text-gray-900">${product.CurrentPrice}</p>
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700 space-y-6">{product.Description}</div>
          </div>
          <div className="mt-8">
            <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
