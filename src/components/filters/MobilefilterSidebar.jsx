import CategoryFilters from "./CategoryFilters";
import PriceFilter from "./PriceFilter";

function MobilefilterSidebar({
  openFilter,
  setOpenFilter,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
}) {
  return (
    <>
      <aside
        className={`fixed top-0 right-0 h-full w-[88%] max-w-[360px]
        bg-white z-50 overflow-y-auto lg:hidden shadow-2xl transform transition-transform duration-500 ease-out
        ${openFilter ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="sticky top-0 bg-white border-b border-black/10 px-6 py-5 flex items-center justify-between">
          <h3 className="text-2xl font-black">Filters</h3>

          <button
            onClick={() => setOpenFilter(false)}
            className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <CategoryFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="my-8">
            <PriceFilter maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
          </div>

          <div className="flex gap-3 mt-10">
            <button
              onClick={() => {
                setSelectedCategory("");
                setMaxPrice(5000);
              }}
              className="flex-1 border border-black py-3 rounded-full font-semibold"
            >
              Reset
            </button>

            <button
              onClick={() => setOpenFilter(false)}
              className="flex-1 bg-black text-white py-3 rounded-full font-semibold border border-black"
            >
              Apply
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default MobilefilterSidebar;