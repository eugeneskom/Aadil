import React from "react";
import leftImg from "../assets/img/grocery-banner4.webp";
import centerImg from "../assets/img/grocery-slider1.webp";
import rightImg from "../assets/img/grocery-banner5.webp";
import { LuShoppingBag } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';

const HeroSection = () => {
  const heroImageUrl = "https://cdna.lystit.com/cms/DESKTOP_1_0c9ccdced9.jpg";

  return (
    <section className="w-full hero">
      <div className="container">
        <div className="hero__inner flex justify-between">
          <div className="col left w-1/4">
            <img src={leftImg} height={100} alt="" className="w-full" />
          </div>
          <div className="col center w-1/2">
            <Swiper
              // spaceBetween={50}
              slidesPerView={1}
              //  onSlideChange={() => console.log("slide change")}
       
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              onSwiper={(swiper: any) => console.log(swiper)}
              modules={[Pagination]}
            >

              
              <SwiperSlide>
                <img src={centerImg} height={100} alt="" className="w-full" />
                <div className="hero__content">
                  <p className="hero__text">All your needs</p>
                  <h2 className="hero__title">Products on sale</h2>
                  <NavLink to={`/`} className="btn-style hero-shop-now">
                    Shop now
                    <LuShoppingBag />
                  </NavLink>
                </div>
              </SwiperSlide>
            

              <SwiperSlide>
                <img src={centerImg} height={100} alt="" className="w-full" />
                <div className="hero__content">
                  <p className="hero__text">All your needs</p>
                  <h2 className="hero__title">Products on sale</h2>
                  <NavLink to={`/`} className="btn-style hero-shop-now">
                    Shop now
                    <LuShoppingBag />
                  </NavLink>
                </div>
              </SwiperSlide>
            

              <SwiperSlide>
                <img src={centerImg} height={100} alt="" className="w-full" />
                <div className="hero__content">
                  <p className="hero__text">All your needs</p>
                  <h2 className="hero__title">Products on sale</h2>
                  <NavLink to={`/`} className="btn-style hero-shop-now">
                    Shop now
                    <LuShoppingBag />
                  </NavLink>
                </div>
              </SwiperSlide>
            
            </Swiper>
          </div>
          <div className="col right w-1/4">
            <img src={rightImg} height={100} alt="" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
