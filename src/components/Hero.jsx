import React from "react";
import Slider from "react-slick";
import { assets } from "../assets/frontend_assets/assets";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const heroImages = [
  assets.hero_img,
  assets.hero2,
  assets.hero3,
  assets.hero4,
];

const Hero = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="flex flex-col sm:flex-row border border-gray-200">
      {/* Left: Text Section */}
      <div className="w-full sm:w-1/2 flex items-center justify-center px-4 py-6 sm:px-12 sm:py-0 bg-white">
        <div className="text-[#414141] w-full max-w-md text-center sm:text-left">
        
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 overflow-x-auto">
            <div className="h-[2px] w-6 sm:w-10 bg-[#414141]" />
            <p className="font-medium text-xs sm:text-sm whitespace-nowrap">
              OUR BESTSELLERS
            </p>
          </div>

      
          <h1 className="text-lg sm:text-3xl lg:text-5xl font-semibold leading-tight sm:leading-snug whitespace-nowrap">
            Latest Arrivals
          </h1>

         
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-4">
            <p className="font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap">
              SHOP NOW
            </p>
            <div className="w-6 sm:w-10 h-[1px] bg-[#414141]" />
          </div>
        </div>
      </div>

      {/* Right: Carousel Section */}
   <div className="w-full sm:w-1/2">
  <div className="h-[400px] sm:h-[500px]">
    <Slider {...settings}>
      {heroImages.map((img, index) => (
        <div key={index}>
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-[400px] sm:h-[500px] object-cover"
          />
        </div>
      ))}
    </Slider>
  </div>
</div>
    </div>
  );
};

export default Hero;
