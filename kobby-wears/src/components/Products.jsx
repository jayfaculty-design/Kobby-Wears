import React from "react";
import useFetch from "../customHooks/useFetch";
import {
  IconArrowsRight,
  IconHeart,
  IconShoppingBag,
} from "@tabler/icons-react";
import { NavLink } from "react-router";

const Products = () => {
  const [products, errorMessage, loading] = useFetch(
    "http://localhost:3001/products"
  );
  return (
    <div className="font-body-font mt-5 pl-5 pr-5">
      <h1 className="text-2xl font-medium font-forum">Featured Products</h1>
      <div className="grid gap-5 mt-5  pb-5">
        {loading && (
          <div>
            <img
              className="w-12 place-self-center"
              src="/loading.svg"
              alt="loading"
            />
          </div>
        )}
        {products.map((product) => {
          if (product.featured === true) {
            return (
              <div
                className="bg-grey flex rounded-md h-72 pb-5 pt-5 flex-col justify-center items-center p-2 font-open-sans"
                key={product.id}
              >
                <div className="relative">
                  <img className="w-fit" src={product.img_url} alt="" />
                  {product.available === true ? (
                    <p className="absolute top-0 -left-10 bg-black text-white w-14 flex rounded-xl justify-center">
                      sale
                    </p>
                  ) : (
                    "out of stock"
                  )}
                  <IconHeart className="absolute top-0 -right-10 bg-white p-1 rounded-full" />
                </div>
                <div className="mt-3 flex gap-5">
                  <p>{product.name}</p>
                  <p className="font-semibold text-rose-500">
                    ₵{product.price}
                  </p>
                </div>
                <button className="bg-black w-52 mt-3 flex justify-center items-center  gap-2 text-white font-bold p-2">
                  Add To Cart
                  <IconShoppingBag />
                </button>
              </div>
            );
          }
        })}

        <div className="pb-5 flex mt-5 items-center justify-center">
          <NavLink
            to="full-products/all-products"
            className="bg-black text-white text-center w-30 p-1"
          >
            View All
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Products;
