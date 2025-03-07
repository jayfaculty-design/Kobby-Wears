import React from "react";
import { NavLink, Outlet } from "react-router";

const FullProducts = () => {
  return (
    <div className="p-5 mt-14 w-full lg:mt-24">
      <div className="flex gap-5 py-3 lg:p-10 fixed w-full z-1 bg-white">
        <NavLink to="all-products">All</NavLink>
        <NavLink to="hoodies">Hoodies</NavLink>
        <NavLink to="shirts">Shirts</NavLink>
        <NavLink to="jeans">Jeans</NavLink>
        <NavLink to="caps">Caps</NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default FullProducts;
