const Newsletter = () => {
  return (
    <div className="py-12 px-4 sm:px-6 md:py-16 lg:py-20 flex flex-col items-center w-full justify-center gap-5 bg-gradient-to-r from-gray-100 to-gray-100">
      <div className="max-w-md w-full text-center">
        <h2 className="capitalize text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
          Join Our Community
        </h2>
        <p className="text-neutral-600 mb-6 text-sm sm:text-base max-w-sm mx-auto">
          Subscribe to our newsletter for exclusive deals and style updates
        </p>

        <form className="flex flex-col sm:flex-row w-full max-w-md mx-auto gap-3 sm:gap-0">
          <input
            placeholder="Your email address"
            className="border border-neutral-300 rounded-md sm:rounded-r-none px-4 py-3 flex-grow focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
            type="email"
            required
            aria-label="Email address"
          />
          <button
            type="submit"
            className="bg-primary-color cursor-pointer text-white font-medium px-6 py-3 rounded-md sm:rounded-l-none hover:bg-opacity-90 transition-all transform hover:scale-[1.02] shadow-sm"
          >
            Subscribe
          </button>
        </form>

        <p className="text-xs text-neutral-500 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
