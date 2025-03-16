import { useEffect } from "react";
import { Link } from "react-router";
import { Home, ArrowLeft, Search } from "lucide-react";

const Error404 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Visual Element */}
        <div className="mb-8 relative">
          <div className="text-[120px] sm:text-[150px] font-bold text-neutral-100 select-none">
            404
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img
              src="/kobby-wears-1.svg"
              alt="Kobby Wears"
              className="w-24 sm:w-32 opacity-80"
            />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl sm:text-3xl font-semibold mb-3">
          Page Not Found
        </h1>
        <p className="text-neutral-600 mb-8 max-w-sm mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-md hover:bg-neutral-800 transition-all transform hover:scale-[1.02] shadow-sm"
          >
            <Home size={18} />
            <span>Back to Home</span>
          </Link>

          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
            className="flex items-center justify-center gap-2 bg-neutral-100 text-neutral-800 px-6 py-3 rounded-md hover:bg-neutral-200 transition-all"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </Link>
        </div>

        {/* Search Suggestion */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 mb-4">
            Try searching for what you're looking for:
          </p>
          <div className="flex max-w-xs mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-grow border border-neutral-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
            <button className="bg-neutral-100 hover:bg-neutral-200 px-4 rounded-r-md border border-l-0 border-neutral-300 transition-colors">
              <Search size={18} className="text-neutral-700" />
            </button>
          </div>
        </div>

        {/* Help Link */}
        <p className="mt-8 text-sm text-neutral-500">
          Need help?{" "}
          <Link
            to="/contact"
            className="text-neutral-800 underline hover:text-black"
          >
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Error404;
