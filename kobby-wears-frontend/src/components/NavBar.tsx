import { CartContext } from "@/contexts/CartContext";
import { MenuIcon, ShoppingCartIcon, X, User, LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";

const NavBar = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext ? cartContext.cartItems : [];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Hoodies", path: "/products/hoodies" },
    { name: "Shirts", path: "/products/shirts" },
    { name: "Jeans", path: "/products/jeans" },
    { name: "Caps", path: "/products/caps" },
  ];

  // Check authentication status
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Re-check auth when location changes (for when user logs in/out)
  useEffect(() => {
    checkAuth();
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <div className="pb-32">
      <div className="p-5 bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <header className="flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/">
            <div className="logo">
              <img
                src="/kobby-wears-1.svg"
                className="w-24 sm:w-24 md:w-28 lg:w-32"
                alt="logo"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-neutral-700 hover:text-black font-medium hover:underline underline-offset-4 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Login/Profile Button (Desktop) */}
            <div className="hidden md:block">
              {isAuthenticated ? (
                <div className="relative group">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-800 transition-colors"
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </Link>

                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      My Account
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-800 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Cart Icon */}
            <div className="flex items-center gap-1">
              <Link to="/cart" className="relative">
                <ShoppingCartIcon
                  color="#525252"
                  className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6"
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-color w-5 h-5 flex items-center text-xs rounded-full justify-center text-white">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden cursor-pointer"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <MenuIcon color="#525252" className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-white h-full w-4/5 max-w-sm p-5 shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <img src="/kobby-wears-1.svg" className="w-24" alt="logo" />
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="p-2"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-neutral-700" />
              </button>
            </div>

            <nav className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-neutral-800 text-lg font-medium hover:text-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Login/Profile */}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-neutral-800 text-lg font-medium hover:text-black"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={20} />
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800 text-lg font-medium"
                  >
                    <LogOut size={20} />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-black text-white py-3 px-4 rounded-md text-center font-medium hover:bg-neutral-800 transition-colors mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
