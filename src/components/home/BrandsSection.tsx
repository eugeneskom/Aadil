import React from "react";
import { getBrands } from "../../state/BrandsSlice";
import { AppDispatch } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { Brand } from "../../types/types";

import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
function BrandsSection() {
  const dispatch = useDispatch<AppDispatch>();

  const brands: Brand[] = useSelector(getBrands);
  console.log("brands", brands);
  return (
    <section className=" pb-11 mx-auto py-11  overflow-x-hidden categories-section">
      <div className="container">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">{"Title"}</h2>
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
            {brands.map((brand) => (
              <SwiperSlide key={brand.Name} className="swiper-slide">
                <NavLink to={`brand/${brand._id}`}  className="flex items-center justify-center overflow-hidden">
                  <img src={brand.Logo} alt={brand.Name} className="rounded-full bg-blue-500 h-24 w-24" />
                  {/* <h2>{brand.Name}</h2> */}
                </NavLink>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default BrandsSection;
