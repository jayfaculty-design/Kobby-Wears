import {
  IconArrowDownDashed,
  IconArrowUpDashed,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandPaypal,
  IconBrandTiktok,
  IconBrandVisa,
  IconBrandX,
  IconCreditCard,
} from "@tabler/icons-react";
import React, { useEffect } from "react";
import { Link } from "react-router";

const Footer = () => {
  const top = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="bg-black text-white font-forum p-5">
      <div className="flex justify-center pb-3">
        <IconArrowUpDashed onClick={() => top()} />
      </div>
      <div>
        <h1 className="text-gray-200">Quick Links</h1>
        <ul>
          <Link to="full-products/hoodies">
            {" "}
            <li>Hoodies</li>
          </Link>
          <Link to="full-products/shirts">
            <li>Shirts</li>
          </Link>
          <Link to="full-products/caps">
            <li>Caps</li>
          </Link>
        </ul>
      </div>
      <div className="mt-5 flex flex-col gap-2">
        <p>Join Our Mailing List</p>
        <input
          className="border-white rounded-sm border-1 pl-2 w-full h-10"
          type="email"
          placeholder="Email"
        />
      </div>
      <div className="flex gap-3 items-center justify-center mt-5">
        <IconBrandFacebook />
        <IconBrandX />
        <IconBrandInstagram />
        <IconBrandTiktok />
        <IconBrandGithub />
      </div>
      <div className="mt-10 flex flex-col items-center">
        <p>Pay With</p>
        <div className="flex gap-5 mt-3">
          <IconBrandVisa />
          <IconBrandPaypal />
          <IconCreditCard />
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <p>© {new Date().getFullYear()}, Kobby Wears - Jay Webs</p>
      </div>
    </div>
  );
};

export default Footer;
