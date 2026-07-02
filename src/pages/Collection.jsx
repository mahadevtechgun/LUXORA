import { useEffect, useState } from "react";
import { getCategories, getProduct } from "../Api/GetApi";
import { Link } from "react-router-dom";

function Collection() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          getCategories(),
          getProduct(),
        ]);

        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-20 sm:pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white py-16 sm:py-20 lg:py-24">
        <div className="absolute right-0 top-0 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] bg-[#D6BA72]/30 blur-[100px] sm:blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-5 relative z-10">
          <span className="text-[#D6BA72] font-black text-sm sm:text-base">
            ✦ Luxury Collections ✦
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-8xl font-black mt-5 tracking-tight leading-[1.05] lg:leading-[0.95]">
            Curated Lifestyle Collections.
          </h1>

          <p className="text-white/60 mt-5 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-7 lg:leading-8">
            Explore premium collections designed for modern buyers — fashion,
            audio, horology and streetwear essentials in one luxury shopping
            experience.
          </p>
        </div>
      </section>

      {/* Collections */}
      <section className="py-14 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-5">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block px-4 sm:px-5 py-2 rounded-full bg-[#D6BA72]/20 text-[#8a6519] font-black mb-4 text-xs sm:text-sm">
              Explore Collections
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight leading-tight">
              Shop By Lifestyle
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {categories?.slice(0, 100).map((category, index) => (
              <Link
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                key={category._id}
                className={`collection-card relative h-[240px] sm:h-[260px] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden group cursor-pointer block ${
                  index === 0
                    ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 sm:h-[360px] lg:h-[540px]"
                    : ""
                }`}
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  src={category.image}
                  alt={category.name}
                />

                <div className="absolute inset-0 bg-black/50"></div>

                <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 text-white">
                  <p className="text-[#D6BA72] font-black text-sm sm:text-base">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="text-xl sm:text-2xl font-black">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-14 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-5">
          <div className="rounded-[1.8rem] sm:rounded-[2.5rem] bg-black text-white p-6 sm:p-10 lg:p-16 grid lg:grid-cols-2 gap-8 lg:gap-10 items-center overflow-hidden relative">
            <div className="absolute right-0 top-0 w-60 h-60 sm:w-80 sm:h-80 bg-[#D6BA72]/30 blur-[90px] sm:blur-[110px] rounded-full"></div>

            <div className="relative">
              <span className="text-[#D6BA72] font-black text-sm sm:text-base">
                Luxury Buying Experience
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mt-4 leading-tight">
                Built For Premium Product Discovery.
              </h2>

              <p className="text-white/60 mt-5 text-sm sm:text-base lg:text-lg leading-7 lg:leading-8">
                This collection page helps users browse by lifestyle, discover
                curated products, and move quickly toward category-based
                shopping.
              </p>

              <Link to="/shop">
                <button className="mt-7 sm:mt-8 w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#D6BA72] text-black font-black">
                  Explore Store
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              <div className="bg-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6">
                <h3 className="text-3xl sm:text-4xl font-black">
                  {categories?.length || 0}
                </h3>
                <p className="text-white/60 mt-2 text-sm sm:text-base">
                  Main Collections
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6">
                <h3 className="text-3xl sm:text-4xl font-black">
                  {categories?.reduce(
                    (total, category) =>
                      total + (category.subCategories?.length || 0),
                    0
                  )}
                </h3>
                <p className="text-white/60 mt-2 text-sm sm:text-base">
                  Sub Categories
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6">
                <h3 className="text-3xl sm:text-4xl font-black">
                  {products?.length || 0}
                </h3>
                <p className="text-white/60 mt-2 text-sm sm:text-base">
                  Products
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6">
                <h3 className="text-3xl sm:text-4xl font-black">4.9★</h3>
                <p className="text-white/60 mt-2 text-sm sm:text-base">
                  Rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Collection;