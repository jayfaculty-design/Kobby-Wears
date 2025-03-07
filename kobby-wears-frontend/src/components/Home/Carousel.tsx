import React from "react";
import Slider from "react-slick";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="carousel-container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <Slider {...settings}>
        <div>
          <div className="carousel-slide flex flex-col md:flex-row items-center justify-between py-8 md:py-16">
            <div className="flex flex-col gap-4 md:gap-6 mb-8 md:mb-0 md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Men New Collection
              </h1>
              <h3 className="text-lg md:text-xl">
                Up to 60% off selected Product
              </h3>
              <div className="flex justify-center md:justify-start">
                <InteractiveHoverButton className="w-fit px-6 py-2">
                  Shop Now
                </InteractiveHoverButton>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img
                className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                src="/hero-1.webp"
                alt="hero"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="carousel-slide flex flex-col md:flex-row items-center justify-between py-8 md:py-16">
            <div className="flex flex-col gap-4 md:gap-6 mb-8 md:mb-0 md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Women Collection
              </h1>
              <h3 className="text-lg md:text-xl">
                New arrivals with great discounts
              </h3>
              <div className="flex justify-center md:justify-start">
                <InteractiveHoverButton className="w-fit px-6 py-2">
                  Shop Now
                </InteractiveHoverButton>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img
                className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                src="/avator.webp"
                alt="hero"
              />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
