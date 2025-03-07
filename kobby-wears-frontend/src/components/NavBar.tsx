import { HeartIcon, MenuIcon, ShoppingCartIcon } from "lucide-react";

const NavBar = () => {
  return (
    <div className="pb-32">
      <div className="p-5 bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <header className="flex justify-between items-center">
          <div className="logo">
            <img
              src="/kobby-wears-1.svg"
              className="w-24 sm:w-24 md:w-28 lg:w-32"
              alt="logo"
            />
          </div>
          <div className="tabs flex gap-5 items-center">
            <HeartIcon
              color="#525252"
              className="cursor-pointer text-lg sm:text-xl md:text-2xl"
            />
            <ShoppingCartIcon
              color="#525252"
              className="cursor-pointer text-lg sm:text-xl md:text-2xl"
            />
            <MenuIcon
              color="#525252"
              className="cursor-pointer text-xl sm:text-2xl md:text-3xl"
            />
          </div>
        </header>
      </div>
    </div>
  );
};

export default NavBar;
