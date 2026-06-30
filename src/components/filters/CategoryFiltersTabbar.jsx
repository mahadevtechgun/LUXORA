import React from 'react'

function CategoryFiltersTabbar() {
  return (
    <div>
        <div className="flex flex-wrap gap-3">
            <button className="px-5 py-2 rounded-full bg-black text-white font-bold">
              All
            </button>

            <button className="px-5 py-2 rounded-full border border-black/20 font-bold">
              Fashion
            </button>

            <button className="px-5 py-2 rounded-full border border-black/20 font-bold">
              Hi-Fi Audio
            </button>

            <button className="px-5 py-2 rounded-full border border-black/20 font-bold">
              Horology
            </button>

            <button className="px-5 py-2 rounded-full border border-black/20 font-bold">
              Streetwear
            </button>
          </div>
    </div>
  )
}

export default CategoryFiltersTabbar