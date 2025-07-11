const ProductSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
      {/* Image */}
      <div className="bg-gray-200 h-48 sm:h-56"></div>

      <div className="p-4">
        {/* Category */}
        <div className="h-5 w-16 bg-gray-200 rounded mb-3"></div>

        {/* Title */}
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>

        {/* Rating */}
        <div className="flex space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-gray-200 rounded"></div>
          ))}
        </div>

        {/* Price and size */}
        <div className="flex justify-between mb-4">
          <div className="h-7 w-20 bg-gray-200 rounded"></div>
          <div className="h-7 w-16 bg-gray-200 rounded"></div>
        </div>

        {/* Button placehol */}
        <div className="h-10 w-full bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
