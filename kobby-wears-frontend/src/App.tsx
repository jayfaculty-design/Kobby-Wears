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
import ProductsDetails from "./components/Products-details";
import Newsletter from "./components/Newsletter";
import Cart from "./components/CartPage/Cart";
import { CartProvider } from "./contexts/CartContext";
import NavMenu from "./components/NavMenu";
import { NavProvider } from "./contexts/NavContext";
import Error404 from "./Error404";
import ProfilePage from "./components/ProfilePage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import axios from "axios";

axios.defaults.baseURL = "https://kobby-wears.onrender.com/";

const App = () => {
  return (
    <BrowserRouter>
      <NavProvider>
        <CartProvider>
          <NavBar />
          <NavMenu />
          <Routes>
            <Route path="*" element={<Error404 />} />
            <Route path="/" index element={<Home />} />
            <Route path="/products" element={<ProductsSection />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products/shoes" element={<Shoes />} />
            <Route path="/products/shirts" element={<Shirts />} />
            <Route path="/products/hoodies" element={<Hoodies />} />
            <Route path="/products/caps" element={<Caps />} />
            <Route path="/products/jeans" element={<Jeans />} />
            <Route path="/products/all-products" element={<AllProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<ProductsDetails />} />
          </Routes>
          <Newsletter />
          <Footer />
        </CartProvider>
      </NavProvider>
    </BrowserRouter>
  );
};

export default App;
