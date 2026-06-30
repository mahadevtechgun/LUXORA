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
    <div className="pt-24">
      <section className="relative overflow-hidden bg-black text-white py-24">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#D6BA72]/30 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <span className="text-[#D6BA72] font-black">
            ✦ Luxury Collections ✦
          </span>

          <h1 className="text-5xl lg:text-8xl font-black mt-5 tracking-tight leading-[0.95]">
            Curated Lifestyle Collections.
          </h1>

          <p className="text-white/60 mt-6 max-w-2xl text-lg leading-8">
            Explore premium collections designed for modern buyers — fashion,
            audio, horology and streetwear essentials in one luxury shopping
            experience.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 rounded-full bg-[#D6BA72]/20 text-[#8a6519] font-black mb-4">
              Explore Collections
            </span>

            <h2 className="text-4xl lg:text-6xl font-black tracking-tight">
              Shop By Lifestyle
            </h2>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {categories?.slice(0, 100).map((category, index) => (
              <Link
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                key={category._id}
                className={`collection-card relative h-[260px] rounded-[2rem] overflow-hidden group cursor-pointer block ${
                  index === 0
                    ? "lg:col-span-2 lg:row-span-2 h-[540px]"
                    : ""
                }`}
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  src={category.image}
                  alt={category.name}
                />

                <div className="absolute inset-0 bg-black/50"></div>

                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-[#D6BA72] font-black">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="text-2xl font-black">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="rounded-[2.5rem] bg-black text-white p-10 lg:p-16 grid lg:grid-cols-2 gap-10 items-center overflow-hidden relative">
            <div className="absolute right-0 top-0 w-80 h-80 bg-[#D6BA72]/30 blur-[110px] rounded-full"></div>

            <div className="relative">
              <span className="text-[#D6BA72] font-black">
                Luxury Buying Experience
              </span>

              <h2 className="text-4xl lg:text-6xl font-black mt-4 leading-tight">
                Built For Premium Product Discovery.
              </h2>

              <p className="text-white/60 mt-5 text-lg leading-8">
                This collection page helps users browse by lifestyle, discover
                curated products, and move quickly toward category-based
                shopping.
              </p>

              <Link to="/shop">
                <button className="mt-8 px-8 py-4 rounded-full bg-[#D6BA72] text-black font-black">
                  Explore Store
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 relative">
              <div className="bg-white/10 rounded-3xl p-6">
                <h3 className="text-4xl font-black">
                  {categories?.length || 0}
                </h3>
                <p className="text-white/60 mt-2">Main Collections</p>
              </div>

              <div className="bg-white/10 rounded-3xl p-6">
                <h3 className="text-4xl font-black">
                  {categories?.reduce(
                    (total, category) =>
                      total + (category.subCategories?.length || 0),
                    0
                  )}
                </h3>
                <p className="text-white/60 mt-2">Sub Categories</p>
              </div>

              <div className="bg-white/10 rounded-3xl p-6">
                <h3 className="text-4xl font-black">
                  {products?.length || 0}
                </h3>
                <p className="text-white/60 mt-2">Products</p>
              </div>

              <div className="bg-white/10 rounded-3xl p-6">
                <h3 className="text-4xl font-black">4.9★</h3>
                <p className="text-white/60 mt-2">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Collection;