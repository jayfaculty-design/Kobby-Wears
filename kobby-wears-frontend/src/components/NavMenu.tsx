import { NavContext } from "@/contexts/NavContext";
import { X } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router";

const NavMenu = () => {
  const navContext = useContext(NavContext);
  if (!navContext) {
    return null; // or handle the error as needed
  }
  const { activeNav, setActiveNav } = navContext;

  const closeNav = () => {
    setActiveNav(false);
  };
  return (
    <div
      className={`nav-menu h-full ${
        activeNav ? "show" : ""
      } p-4 bg-white hidden fixed w-full z-50 inset-0`}
    >
      <div
        className="bg-red-50 w-fit cursor-pointer"
        onClick={() => closeNav()}
      >
        <X />
      </div>
      <div className="flex gap-5 flex-col p-4 w-fit">
        <Link onClick={() => setActiveNav(false)} to="products/hoodies">
          Hoodies
        </Link>
        <Link onClick={() => setActiveNav(false)} to="products/shirts">
          Shirts
        </Link>
        <Link onClick={() => setActiveNav(false)} to="products/jeans">
          Jeans
        </Link>
        <Link onClick={() => setActiveNav(false)} to="products/caps">
          Caps
        </Link>
      </div>
      <button className="border-t absolute bottom-1 cursor-pointer border-b w-full text-left px-4 py-3">
        Login
      </button>
    </div>
  );
};

export default NavMenu;
