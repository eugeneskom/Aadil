import React from "react";
import leftImg from '../assets/img/grocery-banner4.webp'
import centerImg from '../assets/img/grocery-slider1.webp'
import rightImg from '../assets/img/grocery-banner5.webp'

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
            <img src={centerImg} height={100} alt="" className="w-full" />
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
