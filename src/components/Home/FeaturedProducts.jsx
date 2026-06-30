import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WishlistProductButton from "../ui/WishlistProductButton";
import ProductName from "../ui/Product_name";
import { getFeaturedProducts } from "../../Api/GetApi";

function FeaturedProducts({ product = [] }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatPrice = (value) => {
    const price = Number(value || 0);
    return price > 0 ? `₹${price.toFixed(2)}` : "₹0.00";
  };

  const getPrice = (item) => {
    if (item?.prices?.price) {
      return Number(item.prices.price) / 100;
    }

    return Number(item?.sale_price || item?.price || 0);
  };

  const getRegularPrice = (item) => {
    if (item?.prices?.regular_price) {
      return Number(item.prices.regular_price) / 100;
    }

    return Number(item?.regular_price || item?.price || 0);
  };

  const getDiscount = (item) => {
    const regular = getRegularPrice(item);
    const sale = getPrice(item);

    if (!regular || !sale || regular <= sale) return "";

    const discount = Math.round(((regular - sale) / regular) * 100);
    return `${discount}% OFF`;
  };

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);

        const data = await getFeaturedProducts();

        const finalProducts = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
          ? data.products
          : Array.isArray(data?.data)
          ? data.data
          : [];

        setFeaturedProducts(finalProducts);
      } catch (error) {
        console.log("Featured Products Error:", error);

        const fallbackProducts = product.filter((item) => {
          return (
            item?.featured === true ||
            item?.featured === "true" ||
            item?.featured === 1 ||
            item?.featured === "1" ||
            item?.featured === "yes" ||
            item?.is_featured === true ||
            item?.is_featured === "true" ||
            item?.is_featured === 1 ||
            item?.is_featured === "1"
          );
        });

        setFeaturedProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [product]);

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center font-black text-gray-500">
            Loading Featured Products...
          </p>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-[#fbfaf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#D6BA72]/15 text-[#8a6519] font-black text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              Trending Now
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-black">
              Featured Products
            </h2>

            <p className="text-gray-500 text-sm sm:text-base mt-3 max-w-lg">
              Discover our most highlighted products from the latest collection.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-black text-gray-700 hover:text-[#D6BA72] transition group"
          >
            View All
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {featuredProducts.slice(0, 4).map((items) => {
            const price = getPrice(items);
            const regularPrice = getRegularPrice(items);
            const discountText = getDiscount(items);

            const image =
              items.images?.[0]?.src ||
              items.image?.src ||
              items.image ||
              "https://via.placeholder.com/500";

            return (
              <div
                key={items.id}
                className="group bg-white rounded-[28px] overflow-hidden border border-black/5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_28px_80px_rgba(0,0,0,0.14)] hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative h-64 sm:h-72 overflow-hidden bg-[#f4f1ea]">
                  <Link to={`/product/${items.id}`}>
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                      src={image}
                      alt={items.name || "Product"}
                      loading="lazy"
                    />
                  </Link>

                  <div className="absolute top-3 right-3 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white rounded-full p-2 shadow-md hover:bg-black hover:text-white transition-colors">
                      <WishlistProductButton product={items} />
                    </div>
                  </div>

                  {discountText && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg">
                        {discountText}
                      </span>
                    </div>
                  )}

                  <Link to={`/product/${items.id}`}>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-black translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Quick View
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="p-5 sm:p-6">
                  <Link to={`/product/${items.id}`}>
                    <p className="text-[#9b7423] text-xs font-black uppercase tracking-wider mb-2">
                      {items.categories?.[0]?.name || "Premium Product"}
                    </p>
                  </Link>

                  <Link to={`/product/${items.id}`}>
                    <h3 className="text-base sm:text-lg font-black text-gray-900 hover:text-[#9b7423] transition line-clamp-2 min-h-[3.5rem]">
                      <ProductName items={items} />
                    </h3>
                  </Link>

                  {Number(items?.average_rating || 0) > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <div className="flex text-[#D6BA72] text-xs">
                        {"★".repeat(Math.round(Number(items.average_rating)))}
                        {"☆".repeat(
                          5 - Math.round(Number(items.average_rating))
                        )}
                      </div>

                      <span className="text-gray-400 text-xs">
                        ({items.review_count || 0})
                      </span>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-2 flex-wrap">
                    <span className="text-2xl font-black text-[#9b7423]">
                      {formatPrice(price)}
                    </span>

                    {regularPrice > price && (
                      <span className="text-gray-400 line-through text-sm font-bold">
                        {formatPrice(regularPrice)}
                      </span>
                    )}
                  </div>

                  <Link to={`/product/${items.id}`}>
                    <button className="w-full mt-5 py-3 rounded-full bg-black text-white text-sm font-black hover:bg-[#D6BA72] hover:text-black transition-all duration-300">
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 sm:hidden">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-black text-gray-700 hover:text-[#D6BA72] transition"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;