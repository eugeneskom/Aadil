import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../state/products/productsSlice";
import ProductCard from "../ProductCard";
import { Product } from "../../types/Product";
import { AppDispatch, RootState } from "../../state/store";
import { fetchGroupedProducts } from "../../state/products/groupedProductsSlice";
import { NavLink } from "react-router-dom";
import ProductCardPreloader from "../ProductCardPreloader";

function Featured({featuredProducts}: {featuredProducts: Product[]}) {
  //const products: Product[] = useSelector(selectProducts);

  //const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([]);
  // const { featuredProducts } = useSelector((state: RootState) => state.groupedProducts);

  return (
    <section className=" pb-11 mx-auto py-11 overflow-x-hidden ">
      <div className="container">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Featured products</h2>
          <NavLink to="category/featured">View deals</NavLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{featuredProducts && featuredProducts.length > 0 ? featuredProducts.slice(0, 8).map((product: Product) => <ProductCard key={product.Id} product={product} />) : Array(8)
                  .fill(null)
                  .map((_, index) => (
                      <ProductCardPreloader />
                  ))}</div>
      </div>
    </section>
  );
}

export default Featured;
