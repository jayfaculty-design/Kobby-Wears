import React from "react";
import { useLocation } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const showHeaderFooter = !["/login", "/register"].includes(location.pathname);

  return (
    <div>
      {showHeaderFooter && <NavBar />}
      <main>{children}</main>
      {showHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;
