import React from "react";
import { NavLink, Outlet } from "react-router";

const FullProducts = () => {
  return (
    <div className="p-5 font-open-sans">
      <div className="flex gap-5">
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
