import React from "react";
import { getBrands } from "../../state/BrandsSlice";
import { AppDispatch } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { Brand } from "../../types/types";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import { NavLink } from "react-router-dom";

function BrandsSection() {
  const dispatch = useDispatch<AppDispatch>();

  const brands: Brand[] = useSelector(getBrands);
  console.log('brands',brands)
  return (
    <section className=" pb-11 mx-auto py-11  overflow-x-hidden categories-section">
      <div className="container">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">{"Title"}</h2>
        </div>
        <div className="swiper-container">
          {
            brands.map((brand) => (
              <NavLink to={`brand/${brand._id}`} key={brand.Id} className="flex items-center justify-center">
                <img src={brand.Logo} alt={brand.Name} className="h-20" />
                {/* <h2>{brand.Name}</h2> */}
              </NavLink>
            ))
          }
 
        </div>
      </div>
    </section>
  );
}

export default BrandsSection;
