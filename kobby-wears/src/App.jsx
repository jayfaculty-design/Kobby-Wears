import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Hoodies from "./components/Hoodies";
import FullProducts from "./components/FullProducts";
import Jeans from "./components/Jeans";
import Shirts from "./components/Shirts";
import Caps from "./components/Caps";
import AllProducts from "./components/AllProducts";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="full-products" element={<FullProducts />}>
          <Route path="hoodies" element={<Hoodies />} />
          <Route path="jeans" element={<Jeans />} />
          <Route path="shirts" element={<Shirts />} />
          <Route path="caps" element={<Caps />} />
          <Route path="all-products" element={<AllProducts />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
