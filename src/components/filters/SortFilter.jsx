import React from 'react'

function SortFilter({ sortBy, setSortBy }) {
  return (
    <div className="relative">
      <select 
        id="sortSelect" 
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-5 py-2.5 rounded-full border border-gray-200 bg-white focus:bg-white focus:outline-none focus:border-[#D6BA72] focus:ring-2 focus:ring-[#D6BA72]/20 transition-all duration-300 text-sm appearance-none cursor-pointer pr-10"
      >
        <option value="default">Sort by</option>
        <option value="latest">Latest</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
        <option value="rating">Rating: High to Low</option>
        <option value="popular">Popularity</option>
      </select>
      
      {/* Custom dropdown arrow */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}

export default SortFilter