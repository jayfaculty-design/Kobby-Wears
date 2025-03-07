import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { useEffect, useState } from "react";

const TrendBanner = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div
          className={`absolute top-0 left-0 w-64 h-64 rounded-full bg-purple-500 blur-3xl -translate-x-1/2 -translate-y-1/2 ${
            isMounted ? "animate-pulse-slow" : ""
          }`}
        ></div>
        <div
          className={`absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-500 blur-3xl translate-x-1/3 translate-y-1/3 ${
            isMounted ? "animate-pulse-slow animation-delay-2000" : ""
          }`}
        ></div>
        <div
          className={`absolute top-1/2 right-1/4 w-56 h-56 rounded-full bg-indigo-500 blur-3xl ${
            isMounted ? "animate-pulse-slow animation-delay-1000" : ""
          }`}
        ></div>
      </div>

      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:40px_40px]"></div>

      {/* Content container */}
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text content */}
          <div className="max-w-lg mx-auto md:mx-0 text-center md:text-left mb-12 md:mb-0">
            {/* New trend label with animation */}
            <div
              className={`transform ${
                isMounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              } transition-all duration-700 ease-out`}
            >
              <h4 className="inline-block bg-white/10 backdrop-blur-sm text-xs md:text-sm font-bold tracking-widest py-2 px-4 rounded-full mb-4 md:mb-6 border border-white/20">
                NEW TREND {new Date().getFullYear()}
              </h4>
            </div>

            {/* Main heading with animation */}
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-blue-100 transform ${
                isMounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              } transition-all duration-700 delay-100 ease-out`}
            >
              Unisex Collection
            </h1>

            {/* Sale subheading with animation */}
            <h5
              className={`text-lg md:text-xl font-medium text-gray-300 mb-8 md:mb-10 transform ${
                isMounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              } transition-all duration-700 delay-200 ease-out`}
            >
              Big Sale this Week{" "}
              <span className="text-yellow-400 font-bold">Up to 50% Off</span>
            </h5>

            {/* CTA button with animation */}
            <div
              className={`transform ${
                isMounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              } transition-all duration-700 delay-300 ease-out`}
            >
              <InteractiveHoverButton className="text-base md:text-lg font-medium px-8 py-3 md:px-10 md:py-4 shadow-lg shadow-purple-500/20">
                Shop Now
              </InteractiveHoverButton>
            </div>
          </div>

          {/* Product image */}
          <div
            className={`relative w-full md:w-1/2 lg:w-2/5 transform ${
              isMounted
                ? "translate-y-0 opacity-100 rotate-0"
                : "translate-y-8 opacity-0 rotate-2"
            } transition-all duration-1000 delay-300 ease-out`}
          >
            <div className="relative">
              {/* Circle background for product */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-blue-500/30 rounded-full blur-xl transform scale-90"></div>

              {/* Product image */}
              <img
                src="/unisex-collection.jpg"
                alt="Unisex Collection"
                className="relative z-10 mx-auto max-h-[500px] object-contain drop-shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/600x800/3730a3/ffffff?text=Unisex+Collection";
                }}
              />

              {/* Price tag */}
              <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-yellow-400 text-gray-900 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center font-bold text-lg md:text-xl transform rotate-12 shadow-lg">
                -50%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 border-2 border-white/20 rounded-full animate-float"></div>
      <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-purple-500/50 rounded-full animate-float animation-delay-1000"></div>
      <div className="absolute top-2/3 left-1/5 w-6 h-6 border border-blue-300/30 rounded-full animate-float animation-delay-2000"></div>
    </section>
  );
};

export default TrendBanner;
