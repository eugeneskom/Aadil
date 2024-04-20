import React from "react";
import { Product } from "../../types/Product";
import { NavLink } from "react-router-dom";
import ProductCard from "../ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay  } from "swiper/modules";

interface ProductsByCategoryProps {
  products: Product[];
  title: string;
  actionLinkText: string;
  navigateTo: string;
}

function ProductsByCategory({ products, title, actionLinkText, navigateTo }: ProductsByCategoryProps) {
  return (
    <section className="container pb-11 mx-auto py-5 overflow-hidden">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <NavLink to={`${navigateTo}`}>{actionLinkText}</NavLink>
      </div>
      <div className="swiper-container">
        <Swiper
          spaceBetween={30}
          slidesPerView={4}
          onSlideChange={() => console.log("slide change")}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay]}
        >
          {products && products.length > 0 &&
            products.map((product) => (
              <SwiperSlide key={product.Id} className="swiper-slide">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
}

export default ProductsByCategory;