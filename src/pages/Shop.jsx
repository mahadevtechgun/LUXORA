import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// API
import { getProduct } from "../Api/GetApi";

// FILTER COMPONENTS
import CategoryFilters from "../components/filters/CategoryFilters";
import MobilefilterSidebar from "../components/filters/MobilefilterSidebar";
import PriceFilter from "../components/filters/PriceFilter";
import SearchFilter from "../components/filters/SearchFilter";
import SortFilter from "../components/filters/SortFilter";

// PRODUCT COMPONENT
import ProductCard from "../components/product/ProductCard";

function Shop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);

  const [visibleProducts, setVisibleProducts] = useState(6);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProduct();

        setTimeout(() => {
          setProduct(Array.isArray(data) ? data : []);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.log(error);

        setTimeout(() => {
          setError("Failed to load products.");
          setProduct([]);
          setLoading(false);
        }, 800);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setVisibleProducts(6);
  }, [search, selectedCategory, maxPrice]);

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 6);

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const filteredProducts = product.filter((item) => {
    const matchesSearch = item?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = selectedCategory
      ? item?.categories?.some((cat) => cat.name === selectedCategory)
      : true;

    const productPrice = Number(item?.prices?.price || 0) / 100;

    const matchprice = productPrice <= maxPrice;

    return matchesSearch && matchesCategory && matchprice;
  });

  const visibleProductList = filteredProducts.slice(0, visibleProducts);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-28 bg-[#050505] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,186,114,0.24),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_32%)]"></div>
        <div className="absolute -top-28 -right-20 w-80 h-80 bg-[#D6BA72]/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[130px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/10 text-[#D6BA72] font-black text-xs sm:text-sm uppercase tracking-[0.25em] shadow-lg">
            Premium Store
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mt-5 sm:mt-6 tracking-tight leading-none">
            Shop <span className="text-[#D6BA72]">Collection</span>
          </h1>

          <p className="text-white/60 mt-5 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed">
            Explore curated luxury products across fashion, audio, watches and
            streetwear essentials.
          </p>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="py-4 sm:py-6 border-b border-black/5 bg-white/90 backdrop-blur-xl sticky top-0 z-20 shadow-[0_10px_35px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <SearchFilter search={search} setSearch={setSearch} />
              <SortFilter />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-[#fbfaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-10">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block">
              <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-5 sm:p-6 lg:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-black/5 sticky top-28">
                <h3 className="text-xl sm:text-2xl font-black mb-5 sm:mb-6">
                  Filters
                </h3>

                <CategoryFilters
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />

                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-black/10">
                  <PriceFilter setMaxPrice={setMaxPrice} maxPrice={maxPrice} />
                </div>
              </div>
            </aside>

            {/* Products Section */}
            <section>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                <div>
                  <span className="text-[#D6BA72] font-black text-xs uppercase tracking-[0.25em]">
                    Curated Luxury
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
                    All Products
                  </h2>

                  <div className="mt-2 sm:mt-3">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-black to-neutral-800 text-white text-xs sm:text-sm font-bold shadow-lg">
                      Showing {visibleProductList.length} of{" "}
                      {filteredProducts.length} Products
                    </span>
                  </div>
                </div>

                {/* Mobile Filter Button */}
                <button
                  onClick={() => setOpenFilter(true)}
                  className="lg:hidden px-5 py-2.5 rounded-full bg-black text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                  Filters
                </button>

                <MobilefilterSidebar
                  openFilter={openFilter}
                  setOpenFilter={setOpenFilter}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                />
              </div>

              {/* Loading State */}
              {loading && (
                <div className="py-16 sm:py-20 lg:py-24 text-center bg-white rounded-[2rem] shadow-[0_15px_50px_rgba(0,0,0,0.06)] border border-black/5">
                  <div className="inline-block">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#D6BA72] border-t-transparent rounded-full animate-spin shadow-lg"></div>
                  </div>
                  <h3 className="text-base sm:text-lg font-black mt-4">
                    Loading Products...
                  </h3>
                  <p className="text-neutral-500 text-xs sm:text-sm mt-2">
                    Please wait while we fetch the best products
                  </p>
                </div>
              )}

              {/* Error State */}
              {!loading && error && (
                <div className="py-16 sm:py-20 lg:py-24 text-center bg-white rounded-[2rem] shadow-[0_15px_50px_rgba(0,0,0,0.06)] border border-red-100">
                  <div className="text-red-500 text-4xl sm:text-5xl mb-4">
                    ⚠️
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-red-600">
                    {error}
                  </h2>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && filteredProducts.length === 0 && (
                <div className="min-h-[50vh] bg-white rounded-[2rem] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.06)] border border-black/5">
                  <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[#D6BA72]/20 blur-[100px] rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-[260px] sm:w-[340px] h-[260px] sm:h-[340px] bg-black/5 blur-[100px] rounded-full"></div>

                  <div className="relative z-10 text-center max-w-2xl">
                    <div className="inline-block p-3 sm:p-4 bg-[#D6BA72]/10 rounded-full mb-5 sm:mb-6 shadow-lg">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 text-[#D6BA72]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                      No Products Found
                    </h1>

                    <p className="text-neutral-500 text-base sm:text-lg leading-relaxed max-w-md mx-auto mt-4">
                      We couldn't find any products matching your search or
                      selected category.
                    </p>
                  </div>
                </div>
              )}

              {/* Products Grid */}
              {!loading && !error && filteredProducts.length > 0 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 transition-all duration-500">
                    <ProductCard product={visibleProductList} />
                  </div>

                  {filteredProducts.length > visibleProducts && (
                    <div className="flex justify-center mt-12">
                      <button
                        type="button"
                        onClick={handleLoadMore}
                        className="px-10 py-4 rounded-full bg-black text-white font-black text-base sm:text-lg hover:bg-[#D6BA72] hover:text-black transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
                      >
                        Read More
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default Shop;

// import { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

// // API
// import { getProduct } from "../Api/GetApi";

// // FILTER COMPONENTS
// import CategoryFilters from "../components/filters/CategoryFilters";
// import MobilefilterSidebar from "../components/filters/MobilefilterSidebar";
// import PriceFilter from "../components/filters/PriceFilter";
// import SearchFilter from "../components/filters/SearchFilter";
// import SortFilter from "../components/filters/SortFilter";

// // PRODUCT COMPONENT
// import ProductCard from "../components/product/ProductCard";

// function Shop() {
//   const [openFilter, setOpenFilter] = useState(false);
//   const [product, setProduct] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [maxPrice, setMaxPrice] = useState(5000);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [searchParams] = useSearchParams();
//   const categoryFromUrl = searchParams.get("category");

//   useEffect(() => {
//     if (categoryFromUrl) {
//       setSelectedCategory(categoryFromUrl);
//     }
//   }, [categoryFromUrl]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const data = await getProduct();

//         setTimeout(() => {
//           setProduct(Array.isArray(data) ? data : []);
//           setLoading(false);
//         }, 800);
//       } catch (error) {
//         console.log(error);

//         setTimeout(() => {
//           setError("Failed to load products.");
//           setProduct([]);
//           setLoading(false);
//         }, 800);
//       }
//     };

//     fetchData();
//   }, []);

//   const filteredProducts = product.filter((item) => {
//     const matchesSearch = item?.name
//       ?.toLowerCase()
//       .includes(search.toLowerCase());

//     const matchesCategory = selectedCategory
//       ? item?.categories?.some((cat) => cat.name === selectedCategory)
//       : true;

//     const productPrice = Number(item?.prices?.price || 0) / 100;

//     const matchprice = productPrice <= maxPrice;

//     return matchesSearch && matchesCategory && matchprice;
//   });

//   return (
//     <>
//       <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-28 bg-[#050505] text-white overflow-hidden">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,186,114,0.24),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_32%)]"></div>
//         <div className="absolute -top-28 -right-20 w-80 h-80 bg-[#D6BA72]/20 rounded-full blur-[120px]"></div>
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[130px]"></div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/10 text-[#D6BA72] font-black text-xs sm:text-sm uppercase tracking-[0.25em] shadow-lg">
//             Premium Store
//           </span>

//           <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mt-5 sm:mt-6 tracking-tight leading-none">
//             Shop <span className="text-[#D6BA72]">Collection</span>
//           </h1>

//           <p className="text-white/60 mt-5 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed">
//             Explore curated luxury products across fashion, audio, watches and
//             streetwear essentials.
//           </p>
//         </div>
//       </section>

//       <section className="py-4 sm:py-6 border-b border-black/5 bg-white/90 backdrop-blur-xl sticky top-0 z-20 shadow-[0_10px_35px_rgba(0,0,0,0.06)]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-between">
//             <div className="flex flex-col sm:flex-row gap-3 flex-1">
//               <SearchFilter search={search} setSearch={setSearch} />
//               <SortFilter />
//             </div>
//           </div>
//         </div>
//       </section>

//       <main className="bg-[#fbfaf7]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
//           <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-10">
//             <aside className="hidden lg:block">
//               <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-5 sm:p-6 lg:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-black/5 sticky top-28">
//                 <h3 className="text-xl sm:text-2xl font-black mb-5 sm:mb-6">
//                   Filters
//                 </h3>

//                 <CategoryFilters
//                   selectedCategory={selectedCategory}
//                   setSelectedCategory={setSelectedCategory}
//                 />

//                 <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-black/10">
//                   <PriceFilter setMaxPrice={setMaxPrice} maxPrice={maxPrice} />
//                 </div>
//               </div>
//             </aside>

//             <section>
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
//                 <div>
//                   <span className="text-[#D6BA72] font-black text-xs uppercase tracking-[0.25em]">
//                     Curated Luxury
//                   </span>

//                   <h2 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
//                     All Products
//                   </h2>

//                   <div className="mt-2 sm:mt-3">
//                     <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-black to-neutral-800 text-white text-xs sm:text-sm font-bold shadow-lg">
//                       Showing {loading ? 0 : filteredProducts.length} Products
//                     </span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => setOpenFilter(true)}
//                   className="lg:hidden px-5 py-2.5 rounded-full bg-black text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"
//                 >
//                   Filters
//                 </button>

//                 <MobilefilterSidebar
//                   openFilter={openFilter}
//                   setOpenFilter={setOpenFilter}
//                   selectedCategory={selectedCategory}
//                   setSelectedCategory={setSelectedCategory}
//                   maxPrice={maxPrice}
//                   setMaxPrice={setMaxPrice}
//                 />
//               </div>

//               {loading && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
//                   {[...Array(9)].map((_, index) => (
//                     <div
//                       key={index}
//                       className="bg-white rounded-[2rem] overflow-hidden border border-black/5 shadow-[0_15px_45px_rgba(0,0,0,0.06)]"
//                     >
//                       <div className="h-72 bg-neutral-200 animate-pulse"></div>

//                       <div className="p-5">
//                         <div className="h-4 bg-neutral-200 rounded-full animate-pulse mb-3"></div>
//                         <div className="h-6 w-3/4 bg-neutral-200 rounded-full animate-pulse mb-4"></div>
//                         <div className="h-5 w-1/3 bg-neutral-200 rounded-full animate-pulse mb-5"></div>
//                         <div className="h-11 bg-neutral-200 rounded-full animate-pulse"></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {!loading && error && (
//                 <div className="py-16 sm:py-20 lg:py-24 text-center bg-white rounded-[2rem] shadow-[0_15px_50px_rgba(0,0,0,0.06)] border border-red-100">
//                   <div className="text-red-500 text-4xl sm:text-5xl mb-4">
//                     ⚠️
//                   </div>
//                   <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-red-600">
//                     {error}
//                   </h2>
//                 </div>
//               )}

//               {!loading && !error && filteredProducts.length === 0 && (
//                 <div className="min-h-[50vh] bg-white rounded-[2rem] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.06)] border border-black/5">
//                   <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[#D6BA72]/20 blur-[100px] rounded-full"></div>
//                   <div className="absolute bottom-0 left-0 w-[260px] sm:w-[340px] h-[260px] sm:h-[340px] bg-black/5 blur-[100px] rounded-full"></div>

//                   <div className="relative z-10 text-center max-w-2xl">
//                     <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
//                       No Products Found
//                     </h1>

//                     <p className="text-neutral-500 text-base sm:text-lg leading-relaxed max-w-md mx-auto mt-4">
//                       We couldn't find any products matching your search or
//                       selected category.
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {!loading && !error && filteredProducts.length > 0 && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
//                   <ProductCard product={filteredProducts} />
//                 </div>
//               )}
//             </section>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

// export default Shop;