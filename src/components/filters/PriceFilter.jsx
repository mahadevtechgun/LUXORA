import React, { useState } from "react";

function PriceFilter({ setMaxPrice, maxPrice }) {
  const [isOpen, setIsOpen] = useState(true);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="mb-8">
      {/* Header with Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full group mb-4"
      >
        <h4 className="font-black text-sm uppercase tracking-wider text-gray-800">
          Price Range
        </h4>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="space-y-4">
          {/* Price Range Labels */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Min</span>
            <span className="text-xs font-semibold text-gray-500">Max</span>
          </div>

          {/* Price Values Display */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
              <span className="text-xs text-gray-400">₹</span>
              <span className="text-sm font-bold text-gray-800 ml-1">50</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
              <span className="text-xs text-gray-400">₹</span>
              <span className="text-sm font-bold text-gray-800 ml-1">{maxPrice}</span>
            </div>
          </div>

          {/* Range Slider */}
          <div className="relative pt-2">
            <input
              type="range"
              min="50"
              max="5000"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D6BA72]"
              style={{
                background: `linear-gradient(to right, #D6BA72 0%, #D6BA72 ${(maxPrice - 50) / (5000 - 50) * 100}%, #e5e7eb ${(maxPrice - 50) / (5000 - 50) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>

          {/* Min/Max Labels */}
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">₹50</span>
            <span className="text-xs font-medium text-[#9b7423] bg-[#D6BA72]/10 px-2 py-1 rounded-full">
              Up to {formatPrice(maxPrice)}
            </span>
            <span className="text-xs text-gray-400">₹5,000</span>
          </div>

          {/* Quick Filters */}
          <div className="pt-2">
            <p className="text-xs text-gray-500 mb-2">Quick select:</p>
            <div className="flex flex-wrap gap-2">
              {[1000, 2000, 3000, 4000, 5000].map((price) => (
                <button
                  key={price}
                  onClick={() => setMaxPrice(price)}
                  className={`text-xs px-3 py-1 rounded-full transition-all duration-200 ${
                    maxPrice === price
                      ? "bg-[#D6BA72] text-black font-bold shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  ₹{price / 1000}K
                </button>
              ))}
            </div>
          </div>

         
        </div>
      )}
    </div>
  );
}

export default PriceFilter;



// import React from "react";

// function PriceFilter({ setMaxPrice, maxPrice }) {
//   return (
//     <div className="mb-8">

//       <h4 className="font-black mb-4">
//         Price Range
//       </h4>

//       <input
//         onChange={(e) =>
//           setMaxPrice(Number(e.target.value))
//         }
//         type="range"
//         min="50"
//         max="5000"
//         value={maxPrice}
//         className="w-full"
//       />

//       <div className="flex justify-between text-sm text-neutral-500 mt-2">

//         <span>₹50</span>

//         <span>
//           Max: ₹{maxPrice}
//         </span>

//       </div>

//     </div>
//   );
// }

// export default PriceFilter;