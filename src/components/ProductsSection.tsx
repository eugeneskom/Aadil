import { Product } from "../types/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, selectPage, selectProducts, selectProductsStatus, selectTotalPages, setCategories, setSubCategories } from "../state/products/productsSlice";
import ProductCard from "./ProductCard";
import { AppDispatch, RootState } from "../state/store";
import Filters from "./filters/Filters";
import { useEffect } from "react";
const ProductSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products: Product[] = useSelector(selectProducts);
  console.log("products__update", products);
  // const page = useSelector((state: RootState) => state.products.page);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);

  const status = useSelector(selectProductsStatus);

  const handleLoadMore = () => {
    if (page < totalPages) {
      dispatch(fetchProductsAsync({ page: page + 1, limit: 100 }));
    }
  };
  

  useEffect(() => {

    dispatch(setCategories([]));
    dispatch(setSubCategories([]));

    dispatch(fetchProductsAsync({ page: page + 1, limit: 100 }));
  
    return () => {
      
    }
  }, [])
  
  const displayedProducts = products ? products.slice(0, 20) : [];
  const totalProducts = products ? products.length : 0;
  const displayedProductsCount = displayedProducts.length;

 

 

  return (
    <section className="container pb-11 mx-auto py-8 overflow-hidden">
      {/* Filters */}
      <Filters />
      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{products && products.length > 0 && products.map((product) => <ProductCard product={product} />)}</div>

      {/* <div className="flex flex-col items-center mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${loadingPercentage}%` }}></div>
        </div>
        <p className="text-gray-600 mb-2">
          Showing {displayedProductsCount} of {totalProducts} products
        </p>
        <button onClick={handleLoadMore} className="bg-white text-black border border-black px-8 py-3 rounded-md hover:bg-gray-100 transition-colors duration-300">
          Show More
        </button>
      </div> */}
    </section>
  );
};

export default ProductSection;
