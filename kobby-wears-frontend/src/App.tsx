import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar";
import ProductsSection from "./components/ProductSection/Products-Section";
import Shoes from "./components/ProductSection/Shoes";
import Hoodies from "./components/ProductSection/Hoodies";
import Caps from "./components/ProductSection/Caps";
import Jeans from "./components/ProductSection/Jeans";
import AllProducts from "./components/ProductSection/AllProducts";
import Shirts from "./components/ProductSection/Shirts";
import Footer from "./Footer";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/products" element={<ProductsSection />} />
        <Route path="/products/shoes" element={<Shoes />} />
        <Route path="/products/shirts" element={<Shirts />} />
        <Route path="/products/hoodies" element={<Hoodies />} />
        <Route path="/products/caps" element={<Caps />} />
        <Route path="/products/jeans" element={<Jeans />} />
        <Route path="/products/all-products" element={<AllProducts />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
