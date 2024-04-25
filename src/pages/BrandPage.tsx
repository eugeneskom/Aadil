import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Brand } from "../types/types";
import { getBrands } from "../state/BrandsSlice";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/Product";
import ProductCardPreloader from "../components/ProductCardPreloader";
function BrandPage() {
  const { brandName } = useParams();
  const brands: Brand[] = useSelector(getBrands);
  const currentBrand = brands.find((brand) => brand.Name === brandName);
  const [productsNoSale, setProductsNoSale] = useState<Product[] | []>([]);
  const [productsSale, setProductsSale] = useState<Product[] | []>([]);
  const [displayedProductsNoSale, setDisplayedProductsNoSale] = useState<Product[] | []>([]);
  const [displayedProductsSale, setDisplayedProductsSale] = useState<Product[] | []>([]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (currentBrand === undefined) return;

    const { Name } = currentBrand;

    const getBrandProducts = async (brandName: string) => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/brands/${brandName}/products`);

        console.log("getBrandProducts", response.data);
        if (response.data) {
          setProductsNoSale(response.data.productsWithoutSale);
          setProductsSale(response.data.productsWithSale);
          setDisplayedProductsNoSale(response.data.productsWithoutSale.slice(0, 8));
          setDisplayedProductsSale(response.data.productsWithSale.slice(0, 8));
        }
      } catch (error) {
        console.log("getBrandProducts", error);
      } finally {
        setIsLoading(false);
      }
    };

    getBrandProducts(Name);

    return () => {};
  }, [currentBrand]);

  const loadMoreProductsNoSale = () => {
    const remainingSlots = 4 - (displayedProductsNoSale.length % 4);
    const nextProducts = productsNoSale.slice(displayedProductsNoSale.length, displayedProductsNoSale.length + Math.max(remainingSlots, 20));
    setDisplayedProductsNoSale([...displayedProductsNoSale, ...nextProducts]);
  };

  const loadMoreProductsSale = () => {
    const remainingSlots = 4 - (displayedProductsSale.length % 4);
    const nextProducts = productsSale.slice(displayedProductsSale.length, displayedProductsSale.length + Math.max(remainingSlots, 20));
    setDisplayedProductsSale([...displayedProductsSale, ...nextProducts]);
  };

  if (currentBrand === undefined) {
    return null;
  }

  console.log("displayedProductsSale", displayedProductsSale);

  return (
    <section className="brand-page">
      <div className="container">
        <div className="brand-page__top  py-11 shadow-bottom mb-11">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-5 text-center">{currentBrand.Name}</h1>
          <div className="overflow-hidden brand-page__logo">
            <img src={currentBrand.Logo} alt={currentBrand.Name} className="rounded-full bg-blue-500 h-40 w-40" />
          </div>
        </div>

        <div className="brand-page__content">
          <div className="brand-page__side">
            <h2 className=" text-5xl font-semibold text-gray-800 mb-4">About {currentBrand.Name}</h2>
            <p className="text-gray-600">{currentBrand.Description}</p>
          </div>
          <div className="brand-page__right">
            <div className="brand-page__best mb-14 flex flex-col">
              <h2 className="brand-page__subtitle mb-5 text-2xl font-semibold text-gray-800">Best deals of {currentBrand.Name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-4 mb-11">
                {isLoading
                  ? Array(8)
                      .fill(null)
                      .map((_, index) => <ProductCardPreloader key={index} />)
                  : displayedProductsSale.map((product) => <ProductCard key={product.Id} product={product} />)}
              </div>
              {displayedProductsSale.length < productsSale.length && (
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mx-auto" onClick={loadMoreProductsSale}>
                  View more
                </button>
              )}
            </div>

            <div className="brand-page__other flex flex-col">
              <h2 className="brand-page__subtitle mb-5 text-2xl font-semibold text-gray-800">Other products of {currentBrand.Name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-4 mb-11">
                {isLoading
                  ? Array(8)
                      .fill(null)
                      .map((_, index) => <ProductCardPreloader key={index} />)
                  : displayedProductsNoSale.map((product) => <ProductCard key={product.Id} product={product} />)}
              </div>
              {displayedProductsNoSale.length < productsNoSale.length && (
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mx-auto" onClick={loadMoreProductsNoSale}>
                  View more
                </button>
              )}
          
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandPage;
