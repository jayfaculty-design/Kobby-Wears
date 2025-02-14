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
import Cart from "./components/Cart";
import WishList from "./components/WishList";
import ProductDetails from "./components/ProductDetails";
import { CartProvider } from "./contexts/CartContext";
import { WishListProvider } from "./contexts/WishListContext";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Layout from "./components/Layout";
import Profile from "./components/Profile";

const App = () => {
  return (
    <CartProvider>
      <WishListProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" index element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wishlist" element={<WishList />} />
              <Route path="/product-details/:id" element={<ProductDetails />} />
              <Route path="full-products" element={<FullProducts />}>
                <Route path="hoodies" element={<Hoodies />} />
                <Route path="jeans" element={<Jeans />} />
                <Route path="shirts" element={<Shirts />} />
                <Route path="caps" element={<Caps />} />
                <Route path="all-products" element={<AllProducts />} />
              </Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </WishListProvider>
    </CartProvider>
  );
};

export default App;
