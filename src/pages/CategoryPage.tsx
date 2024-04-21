import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import Filters from "../components/filters/Filters";
import { selectCategories, selectProducts, toggleCategory } from "../state/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../state/store";
import { Product } from "../types/Product";
const capitalizeWords = (str: string) => {
  return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
};
function CategoryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { categoryName } = useParams();
  const [title, setTitle] = useState<string>("Category");
  const products: Product[] = useSelector(selectProducts);
  const selectedCategories = useSelector(selectCategories);

  useEffect(() => {
    const title = categoryName?.replace("-", " ") || "Category";
    if (title) {
      setTitle(title);
      dispatch(toggleCategory(capitalizeWords(title)));

    }

    return () => {};
  }, []);

  return (
    <section className="category-page ">
      <div className="container">
        <div className="category-page__inner py-11">
          <h1 className="category-page__title capitalize font-bold text-center mb-5 text-3xl">{title}</h1>
          <Filters />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{products && products.length > 0 && products.map((product) => <ProductCard product={product} />)}</div>
        </div>
      </div>
    </section>
  );
}

export default CategoryPage;
