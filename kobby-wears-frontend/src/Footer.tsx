import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4 ">
            <Link to="/">
              <img
                src="/kobby-wears-1.svg"
                alt="Kobby Wears"
                className="h-10 mb-4 invert" // Invert for white logo on dark background
              />
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Premium clothing for the modern individual. Quality fabrics,
              timeless designs, and exceptional comfort.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://facebook.com"
                className="text-neutral-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="text-neutral-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-neutral-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-3">
              {["Hoodies", "Shirts", "Jeans", "Caps"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/products/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-3">
              {[
                "Contact Us",
                "FAQs",
                "Shipping & Returns",
                "Size Guide",
                "Track Order",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin
                  size={18}
                  className="text-neutral-400 mt-0.5 flex-shrink-0"
                />
                <span className="text-neutral-400 text-sm">
                  Alhaji Israel, Accra, Ghana
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-neutral-400 flex-shrink-0" />
                <span className="text-neutral-400 text-sm">
                  +233 240 536 268
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-neutral-400 flex-shrink-0" />
                <span className="text-neutral-400 text-sm">
                  info@kobbywears.com
                </span>
              </li>
            </ul>

            {/* Newsletter Mini Form */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-neutral-800 text-sm border-none rounded-l-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-neutral-600"
                />
                <button className="bg-neutral-700 hover:bg-neutral-600 px-3 rounded-r-md transition-colors">
                  <Mail size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-neutral-800 pt-6 pb-4">
          <div className="flex flex-wrap justify-center gap-4">
            <img src="/payment-visa.svg" alt="Visa" className="h-6" />
            <img
              src="/payment-mastercard.svg"
              alt="Mastercard"
              className="h-6"
            />
            <img src="/payment-paypal.svg" alt="PayPal" className="h-6" />
            <img src="/payment-apple-pay.svg" alt="Apple Pay" className="h-6" />
            <img
              src="/payment-mtn-momo.svg"
              alt="MTN Mobile Money"
              className="h-6"
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-neutral-500 text-sm mt-6">
          <p>© {currentYear} Kobby Wears. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
