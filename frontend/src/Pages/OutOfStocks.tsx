import React from "react";

const OutOfStocks: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#433224]/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-[#433224]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 7l-8-4-8 4m16 0v10l-8 4m8-14l-8 4m0 0L4 7m8 4v10"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-[#433224]">Out of Stock</h1>

        {/* Description */}
        <p className="mt-3 text-base leading-6 text-gray-500">
          Sorry, this item is currently unavailable. Please check back soon for
          restocking.
        </p>

        {/* Button */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-7 rounded-lg bg-[#433224] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#35271c] focus:outline-none focus:ring-2 focus:ring-[#433224]/30"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default OutOfStocks;
