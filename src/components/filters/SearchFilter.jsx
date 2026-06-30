import React from "react";

function SearchFilter({ search, setSearch }) {
  return (
    <div className="relative w-full lg:w-80">
      {/* Search Icon - Using Text/Emoji */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <span className="text-gray-400 text-sm">🔍</span>
      </div>

      {/* Search Input */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-10 py-2.5 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#D6BA72] focus:ring-2 focus:ring-[#D6BA72]/20 transition-all duration-300 text-sm"
        placeholder="Search products..."
      />

      {/* Clear Button - Using Text */}
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition font-bold"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchFilter;