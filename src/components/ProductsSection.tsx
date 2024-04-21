import { Product } from "../types/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, selectPage, selectProducts, selectProductsStatus, selectTotalPages } from "../state/products/productsSlice";
import ProductCard from "./ProductCard";
import { AppDispatch, RootState } from "../state/store";
import Filters from "./filters/Filters";
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
  const displayedProducts = products ? products.slice(0, 20) : [];
  const totalProducts = products ? products.length : 0;
  const displayedProductsCount = displayedProducts.length;
  const loadingPercentage = totalProducts === 0 ? 0 : (displayedProductsCount / totalProducts) * 100;

  function groupProductsByManufacturer(products: Product[]): Map<string, Product[]> {
    return products.reduce((map, product) => {
      const manufacturer = product.Manufacturer.toLowerCase();
      if (!map.has(manufacturer)) {
        map.set(manufacturer, []);
      }
      map.get(manufacturer)?.push(product);
      return map;
    }, new Map<string, Product[]>());
  }

  function sortProductsByManufacturer(products: Product[]): Product[] {
    const productsByManufacturer = groupProductsByManufacturer(products);
    const manufacturers = Array.from(productsByManufacturer.keys());
    const sortedProducts: Product[] = [];
    let currentIndex = 0;

    while (productsByManufacturer.size > 0) {
      const manufacturer = manufacturers[currentIndex];
      const productsFromManufacturer = productsByManufacturer.get(manufacturer) || [];

      // Add a product from the current manufacturer
      if (productsFromManufacturer.length > 0) {
        sortedProducts.push(productsFromManufacturer.shift()!);
      }

      // Remove the current manufacturer if it has no more products
      if (productsFromManufacturer.length === 0) {
        productsByManufacturer.delete(manufacturer);
        manufacturers.splice(currentIndex, 1);
      }

      // Move to the next manufacturer index
      currentIndex = (currentIndex + 1) % manufacturers.length;
    }

    return sortedProducts;
  }

  const sortedProducts = sortProductsByManufacturer(products);

  function getUniqueManufacturers(products: Product[]): string[] {
    const uniqueManufacturersSet = new Set<string>();

    products.forEach((product) => {
      uniqueManufacturersSet.add(product.Manufacturer.toLowerCase());
    });

    return Array.from(uniqueManufacturersSet);
  }

  const uniqueManufacturers = getUniqueManufacturers(products);

  return (
    <section className="container pb-11 mx-auto py-8 overflow-hidden">
      {/* Filters */}
      <Filters />
      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{sortedProducts && sortedProducts.length > 0 && sortedProducts.map((product) => <ProductCard product={product} />)}</div>

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
