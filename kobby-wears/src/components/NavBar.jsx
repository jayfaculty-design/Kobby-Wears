import {
  IconArrowNarrowRight,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandX,
  IconHeart,
  IconMenu4,
  IconShoppingBag,
  IconX,
} from "@tabler/icons-react";
import { Activity } from "lucide";
import React, { useState } from "react";
import { NavLink, Link } from "react-router";

const NavBar = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className="flex flex-col shadow-sm">
      <div
        className={`${
          navOpen ? "show" : "hidden"
        } modal bg-white hidden h-[100vh] text-[20px] z-1 w-full fixed top-0 p-5`}
      >
        <div className="flex items-center justify-between">
          <div className="pb-10 relative mt-2 w-fit h-0">
            <IconX
              onClick={() => {
                setNavOpen(false);
              }}
              size={24}
            />
          </div>
          <p className="font-logo-font text-[24px]">Kobby Wears</p>
        </div>

        <div className="flex flex-col gap-5 mt-10 border-b pb-5 border-gray-200 font-semibold">
          <NavLink
            onClick={() => {
              setNavOpen(false);
            }}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => {
              setNavOpen(false);
            }}
            className="flex items-center justify-between"
            to="full-products/hoodies"
          >
            Hoodies <IconArrowNarrowRight />
          </NavLink>
          <NavLink
            onClick={() => {
              setNavOpen(false);
            }}
            className="flex items-center justify-between"
            to="full-products/jeans"
          >
            Jeans <IconArrowNarrowRight />
          </NavLink>
          <NavLink
            onClick={() => {
              setNavOpen(false);
            }}
            className="flex items-center justify-between"
            to="full-products/shirts"
          >
            Shirts <IconArrowNarrowRight />
          </NavLink>
          <NavLink
            onClick={() => {
              setNavOpen(false);
            }}
            className="flex items-center justify-between"
            to="full-products/caps"
          >
            Caps <IconArrowNarrowRight />
          </NavLink>
        </div>
        <div className="flex justify-center mt-10">
          <p className="text-[16px]">Connect with us: </p>
        </div>
        <div className="flex gap-3 items-center justify-center mt-10">
          <IconBrandFacebook />
          <IconBrandX />
          <IconBrandInstagram />
          <IconBrandTiktok />
          <IconBrandGithub />
        </div>
      </div>
      <div className="flex justify-between p-5 items-center">
        <div className="menu-cta">
          <IconMenu4
            onClick={() => {
              setNavOpen(true);
            }}
            className="text-2xl"
          />
        </div>
        <Link to="/" className="logo">
          <p className="font-logo-font text-[24px]">Kobby Wears</p>
        </Link>
        <div className="text-2xl flex gap-2">
          <IconHeart />
          <IconShoppingBag className="" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
