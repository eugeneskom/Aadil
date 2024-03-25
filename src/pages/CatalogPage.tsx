import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";
import { fetchProductsByCatalogId } from "../api/fetchProductsByCatalogId";
import { useParams } from "react-router-dom";

 
function CatalogPage() {
  const [products, setProducts] = useState<Product[] | []>([]);
  const {id} = useParams()
  useEffect(() => {
    const handleGetProducts = async () => {
      if(id === undefined) return;
      const products = await fetchProductsByCatalogId(id);
      setProducts(products)
    }
    handleGetProducts()
    return () => {};
  }, [id]);
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
        <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Catalog products</h2>

        {products.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No catalogs found.</p>
        )}
      </div>
    </div>
  )
}

export default CatalogPage