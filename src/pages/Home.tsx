import React, { useEffect, useState } from "react";
import Hero from "../components/home/Hero";
import ProductSection from "../components/ProductsSection";
import Featured from "../components/home/Featured";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { fetchGroupedProducts } from "../state/products/groupedProductsSlice";
import ProductsByCategory from "../components/home/ProductsByCategory";
import { Product } from "../types/Product";

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { featuredProducts, categorizedProducts, isLoading, error } = useSelector(
    (state: RootState) => state.groupedProducts
  );
  const [livingRoomProducts, setLivingRoomProducts] = useState<Product[]>([]);
  const [kitchetProducts, setKitchenProducts] = useState<Product[]>([]);
  const [bedroomProducts, setBedroomProducts] = useState<Product[]>([]);
  const [featured, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchGroupedProducts());
      } catch (error) {
        console.error('Failed to fetch grouped products:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    
    setLivingRoomProducts(categorizedProducts['Living Room'] || [])
    setKitchenProducts(categorizedProducts['Kitchen'] || [])
    setBedroomProducts(categorizedProducts['Bedroom'] || [])
    setFeaturedProducts(categorizedProducts['featured'] || [])
    return () => {
      
    }
  }, [categorizedProducts])
  


  return (
    <>
      <Hero />
      <Featured featuredProducts={featured}/>
      <ProductsByCategory products={livingRoomProducts} title={"Living Room category"} actionLinkText="View Deals" navigateTo={"/products-category/living-room"} />
      <ProductsByCategory products={kitchetProducts} title={"Kitchen category"} actionLinkText="View Deals" navigateTo={"/products-category/kitchen"} />
      <ProductsByCategory products={bedroomProducts} title={"Bedroom category"} actionLinkText="View Deals" navigateTo={"/products-category/bedroom"} />
      {/* <ProductSection /> */}
    </>
  );
}

export default Home;
