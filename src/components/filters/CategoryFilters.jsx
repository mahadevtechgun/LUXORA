import { useState, useEffect } from "react";
import { getCategories } from "../../Api/GetApi";

function CategoryFilters({ selectedCategory, setSelectedCategory }) {
  const [category, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories();
        setCategory(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
        setCategory([]);
      }
    };

    fetchData();
  }, []);

  const filteredCategories = category.filter((item) =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-black text-sm sm:text-base uppercase tracking-[0.22em] text-black">
          Categories
        </h4>

        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory("")}
            className="text-xs text-[#9b7423] hover:text-black font-black transition"
          >
            Clear
          </button>
        )}
      </div>

      <div className="mb-5 relative">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 text-sm bg-[#fbfaf7] border border-black/10 rounded-2xl focus:outline-none focus:border-[#D6BA72] focus:ring-4 focus:ring-[#D6BA72]/15 transition placeholder:text-neutral-400 font-medium"
        />
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {filteredCategories.length === 0 ? (
          <p className="text-neutral-400 text-sm text-center py-5 bg-[#fbfaf7] rounded-2xl">
            No categories found
          </p>
        ) : (
          filteredCategories.map((items, index) => (
            <label
              key={items?.id || index}
              className={`flex items-center gap-3 cursor-pointer group px-3 py-3 rounded-2xl border transition-all ${
                selectedCategory === items.name
                  ? "bg-[#D6BA72]/15 border-[#D6BA72]/40 shadow-sm"
                  : "bg-white border-black/5 hover:bg-[#fbfaf7] hover:border-[#D6BA72]/30"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedCategory === items.name}
                onChange={() =>
                  setSelectedCategory(
                    selectedCategory === items.name ? "" : items.name
                  )
                }
                className="w-4 h-4 rounded border-gray-300 text-[#D6BA72] focus:ring-[#D6BA72] focus:ring-2 cursor-pointer"
              />

              <span
                className={`text-sm transition-colors ${
                  selectedCategory === items.name
                    ? "text-[#9b7423] font-black"
                    : "text-neutral-600 font-bold group-hover:text-black"
                }`}
              >
                {items.name}
              </span>

              {items.count > 0 && (
                <span className="text-xs text-neutral-400 ml-auto font-bold">
                  ({items.count})
                </span>
              )}
            </label>
          ))
        )}
      </div>

      {selectedCategory && (
        <div className="mt-5 pt-4 border-t border-black/10">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-500 font-bold">Selected</span>

            <span className="text-xs font-black text-[#9b7423] bg-[#D6BA72]/15 border border-[#D6BA72]/30 px-3 py-1.5 rounded-full">
              {selectedCategory}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryFilters;