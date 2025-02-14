import {
  IconArrowNarrowRight,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandRedhat,
  IconBrandTiktok,
  IconBrandX,
  IconCapRounded,
  IconHeart,
  IconHome2,
  IconJacket,
  IconLogin2,
  IconLogout,
  IconMenu4,
  IconShirt,
  IconShoe,
  IconShoppingBag,
  IconUserCircle,
  IconX,
} from "@tabler/icons-react";
import { Activity } from "lucide";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { CartContext } from "../contexts/CartContext";
import { WishListContext } from "../contexts/WishListContext";

const NavBar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { wishLists } = useContext(WishListContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };
  return (
    <div className="flex flex-col shadow-sm">
      <div
        className={`${
          navOpen ? "show" : "hidden"
        } modal bg-white hidden h-[100vh] text-[20px] z-10 w-full fixed top-0 p-5`}
      >
        <div className="flex items-center justify-between">
          <div className="pb-10 cursor-pointer relative mt-2 w-fit h-0">
            <IconX
              onClick={() => {
                setNavOpen(false);
              }}
              size={24}
            />
          </div>
          <p className="font-logo-font text-[24px]">Kobby Wears</p>
        </div>

        <div className="flex font-poppins flex-col gap-5 mt-5 border-b pb-5 border-gray-200">
          <Link
            className="flex items-center justify-between"
            onClick={() => {
              setNavOpen(false);
            }}
            to="/"
          >
            Home <IconHome2 className="text-gray-600" />
          </Link>
          <Link
            onClick={() => {
              setNavOpen(false);
            }}
            className="flex items-center justify-between"
            to="full-products/hoodies"
          >
            Hoodies <IconJacket className="text-gray-600" />
          </Link>
          <Link
            onClick={() => {
              setNavOpen(false);
            }}
            className="flex items-center justify-between"
            to="full-products/jeans"
          >
            Jeans <IconShoe className="text-gray-600" />
          </Link>
          <Link
            onClick={() => {
              setNavOpen(false);
            }}
            className="flex items-center justify-between"
            to="full-products/shirts"
          >
            Shirts <IconShirt className="text-gray-600" />
          </Link>
          <Link
            onClick={() => {
              setNavOpen(false);
            }}
            className="flex items-center justify-between"
            to="full-products/caps"
          >
            Caps <IconBrandRedhat className="text-gray-600" />
          </Link>

          <div>
            {isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <Link
                  onClick={() => {
                    setNavOpen(false);
                  }}
                  className="flex items-center justify-between"
                  to="/profile"
                >
                  Profile <IconUserCircle className="text-gray-600" />
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setNavOpen(true);
                  }}
                  className="flex items-center justify-between"
                >
                  Logout <IconLogout className="text-gray-600" />{" "}
                </button>
              </div>
            ) : (
              <Link
                onClick={() => {
                  setNavOpen(false);
                }}
                className="flex items-center justify-between"
                to="/login"
              >
                Login <IconLogin2 className="text-gray-600" />
              </Link>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <p className="text-[16px]">Connect with us: </p>
        </div>
        <div className="flex gap-3 items-center justify-center mt-5">
          <IconBrandFacebook />
          <IconBrandX />
          <IconBrandInstagram />
          <IconBrandTiktok />
          <IconBrandGithub />
        </div>
      </div>
      <div className="flex shadow-md justify-between p-5 lg:p-10 items-center fixed w-full z-2 bg-white">
        <div className="menu-cta lg:hidden cursor-pointer">
          <IconMenu4
            onClick={() => {
              setNavOpen(true);
            }}
            className="text-2xl"
          />
        </div>
        <Link to="/" className="logo">
          <p className="font-logo-font text-[24px] lg:text-3xl">Kobby Wears</p>
        </Link>

        <div className="hidden lg:flex gap-5 items-center text-[18px]">
          <NavLink to="/">Featured</NavLink>
          <NavLink to="full-products/hoodies">Hoodies</NavLink>
          <NavLink to="full-products/jeans">Jeans</NavLink>
          <NavLink to="full-products/shirts">Shirts</NavLink>

          <NavLink to="full-products/caps">Caps</NavLink>
        </div>

        <div className="text-2xl flex gap-2">
          <Link to="/profile">
            <IconUserCircle />
          </Link>

          <Link to="wishlist" className="flex items-center relative">
            <IconHeart />
            <span className="text-[10px] absolute right-0 left-3 top-3 w-4 h-4 flex items-center justify-center text-black bg-red-300 p-1 rounded-full">
              {wishLists.length}
            </span>
          </Link>
          <Link to="cart" className="flex items-center relative">
            <IconShoppingBag className="" />
            <span className="text-[10px] absolute right-0 left-3 top-3 w-4 h-4 flex items-center justify-center bg-red-300 text-black p-1 rounded-full">
              {cartItems.length}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
