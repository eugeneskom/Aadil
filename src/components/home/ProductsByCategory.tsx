import React from "react";
import { Product } from "../../types/Product";
import { NavLink } from "react-router-dom";
import ProductCard from "../ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";


interface ProductsByCategoryProps {
  products: Product[];
  title: string;
  actionLinkText: string;
  navigateTo: string;
}

function ProductsByCategory({ products, title, actionLinkText, navigateTo }: ProductsByCategoryProps) {
  return (
    <section className=" pb-11 mx-auto py-11  overflow-x-hidden categories-section">
      <div className="container">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <NavLink to={`${navigateTo}`}>{actionLinkText}</NavLink>
        </div>
        <div className="swiper-container">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            // onSlideChange={() => console.log("slide change")}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay]}
            // autoHeight={true}
            breakpoints={{
              // when window width is <= 1024px
              1024: {
                slidesPerView: 4,
              },
              // when window width is <= 768px
              768: {
                slidesPerView: 3,
              },
              // when window width is <= 480px
              480: {
                slidesPerView: 2,
              },
            }}
          >
            {products &&
              products.length > 0 &&
              products.map((product) => (
                <SwiperSlide key={product.Id} className="swiper-slide">
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default ProductsByCategory;
