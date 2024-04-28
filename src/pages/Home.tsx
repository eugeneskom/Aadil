import React, { useEffect, useState } from "react";
import Hero from "../components/home/Hero";
import ProductSection from "../components/ProductsSection";
import Featured from "../components/home/Featured";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { fetchGroupedProducts } from "../state/products/groupedProductsSlice";
import ProductsByCategory from "../components/home/ProductsByCategory";
import { Product } from "../types/Product";
import { Helmet } from "react-helmet-async";
import BrandsSection from "../components/home/BrandsSection";
function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { featuredProducts, categorizedProducts, isLoading, error } = useSelector((state: RootState) => state.groupedProducts);
  const [livingRoomProducts, setLivingRoomProducts] = useState<Product[]>([]);
  const [kitchetProducts, setKitchenProducts] = useState<Product[]>([]);
  const [bedroomProducts, setBedroomProducts] = useState<Product[]>([]);
  const [featured, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchGroupedProducts());
      } catch (error) {
        console.error("Failed to fetch grouped products:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setLivingRoomProducts(categorizedProducts["Living Room"] || []);
    setKitchenProducts(categorizedProducts["Kitchen"] || []);
    setBedroomProducts(categorizedProducts["Bedroom"] || []);
    setFeaturedProducts(categorizedProducts["featured"] || []);
    return () => {};
  }, [categorizedProducts]);

  return (
    <>
      <Helmet>
        <title>{"Engroovers main page"}</title>
        {/* <meta property="og:title" content={productToRender.Name} />
        <meta property="og:description" content={productToRender.Description} />
        <meta property="og:image" content={productToRender?.ImageUrl} />
        <meta property="og:url" content={`https://example.com/product/${productToRender.Id}`} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={productToRender.CurrentPrice} />
        <meta property="product:price:currency" content="USD" />
        <meta property="product:availability" content="instock" /> */}
      </Helmet>
      <Hero />
      {/* <Featured featuredProducts={featured} /> */}
      <ProductsByCategory products={featured} title={"Featured products"} actionLinkText="View Deals" navigateTo={"/category/featured"} />
      <ProductsByCategory products={livingRoomProducts} title={"Living Room category"} actionLinkText="View Deals" navigateTo={"/category/living-room"} />
      <ProductsByCategory products={kitchetProducts} title={"Kitchen category"} actionLinkText="View Deals" navigateTo={"/category/kitchen"} />
      <ProductsByCategory products={bedroomProducts} title={"Bedroom category"} actionLinkText="View Deals" navigateTo={"/category/bedroom"} />

      <BrandsSection />
      {/* <ProductSection /> */}
    </>
  );
}

export default Home;
