import {
  CupSodaIcon,
  History,
  LucideBadgeDollarSign,
  TruckIcon,
} from "lucide-react";
import React from "react";

const IntroProducts = () => {
  const introProducts = [
    {
      title: "Fast Shipping",
      description: "Fast Shipping on all orders",
      iconName: "fiTruck",
      icon: <TruckIcon />,
    },
    {
      title: "Support 24/7",
      description: "We support you 24/7",
      iconName: "History",
      icon: <History />,
    },
    {
      title: "Order Discount",
      description: "With an order over  ₵200",
      iconName: "CupSodaIcon",
      icon: <CupSodaIcon />,
    },
    {
      title: "Money Return",
      description: "Back garauntee after 5 days",
      iconName: "LucideBadgeDollarSign",
      icon: <LucideBadgeDollarSign />,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Why Shop With Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {introProducts.map((product, index) => (
            <div
              key={index}
              className="flex flex-col items-center  sm:items-start p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="mb-4 p-3 bg-amber-100 rounded-full text-primary-color">
                {product.icon &&
                  React.cloneElement(product.icon, {
                    size: 24,
                    strokeWidth: 2,
                    className: "text-primary-color",
                  })}
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroProducts;
