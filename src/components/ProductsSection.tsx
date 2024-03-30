import { Product } from "../types/Product";
import { useDispatch, useSelector } from "react-redux";
import { incrementPage, selectProducts } from "../state/products/productsSlice";
import ProductCard from "./ProductCard";

interface ProductSectionProps {
  wishlist: string[];
}
const ProductSection = () => {
  const dispatch = useDispatch();
  const products: Product[] = useSelector(selectProducts);


  const handleLoadMore = () => {
    dispatch(incrementPage());
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
  
  // function sortProductsWithLimit(products: Product[], limit: number): Product[] {
  //   const productsByManufacturer = groupProductsByManufacturer(products);
  //   const manufacturers = Array.from(productsByManufacturer.keys());
  //   const sortedProducts: Product[] = [];
  
  //   while (manufacturers.length > 0) {
  //     const currentManufacturers = [...manufacturers];
  
  //     for (const manufacturer of currentManufacturers) {
  //       const productsFromManufacturer = productsByManufacturer.get(manufacturer) || [];
  //       const productsToAdd = productsFromManufacturer.splice(0, limit);
  //       sortedProducts.push(...productsToAdd);
  
  //       if (productsFromManufacturer.length === 0) {
  //         productsByManufacturer.delete(manufacturer);
  //         manufacturers.splice(manufacturers.indexOf(manufacturer), 1);
  //       }
  //     }
  //   }
  
  //   // Add remaining products from manufacturers with more than 4 products
  //   for (const products of Array.from(productsByManufacturer.values())) {
  //     sortedProducts.push(...products);
  //   }
  
  //   return sortedProducts;
  // }
   
  // const limit = 4;
  // const sortedProducts = sortProductsWithLimit(products, limit);

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

  const sortedProducts = sortProductsByManufacturer(products)

  function getUniqueManufacturers(products: Product[]): string[] {
    const uniqueManufacturersSet = new Set<string>();

    products.forEach(product => {
        uniqueManufacturersSet.add(product.Manufacturer.toLowerCase());
    });

    return Array.from(uniqueManufacturersSet);
}

const uniqueManufacturers = getUniqueManufacturers(products);
  
  console.log('uniqueManufacturers: ',uniqueManufacturers);

console.log('sortedProducts',sortedProducts);

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
        {sortedProducts &&
          sortedProducts.length > 0 &&
          sortedProducts.map((product) => (
            <ProductCard product={product}/>
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
