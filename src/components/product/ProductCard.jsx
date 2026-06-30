import { Link } from "react-router-dom";
import AddtoCartButton from "../ui/AddtoCartButton";
import WishlistProductButton from "../ui/WishlistProductButton";
import PriceSale from "../ui/PriceSale";
import Regular_price from "../ui/Regular_price";
import Product_name from "../ui/Product_name";
import Short_description from "../ui/Short_description";
import { OffProduct } from "../ui/OffProduct";

function ProductCard({ product = [] }) {
  const getRating = (item) => {
    const rating =
      parseFloat(item?.average_rating) ||
      parseFloat(item?.rating) ||
      parseFloat(item?.rating_average) ||
      parseFloat(item?.acf?.rating) ||
      0;

    return Number.isNaN(rating) ? 0 : rating;
  };

  const getReviewCount = (item) => {
    const count =
      Number(item?.review_count) ||
      Number(item?.rating_count) ||
      Number(item?.total_reviews) ||
      0;

    return Number.isNaN(count) ? 0 : count;
  };

  return (
    <>
      {product.length === 0 ? (
        <div className="text-center py-16 sm:py-20 col-span-full">
          <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-gray-500">
            No Products Found
          </h3>

          <p className="text-gray-400 text-sm mt-2">
            Check back later for new arrivals
          </p>
        </div>
      ) : (
        product.map((items) => {
          const rating = getRating(items);
          const roundedRating = Math.round(rating);
          const reviewCount = getReviewCount(items);
          const discountText = OffProduct({ items });

          const productImage =
            items?.images?.[0]?.src ||
            items?.image ||
            "https://via.placeholder.com/600x600?text=No+Image";

          return (
            <div
              key={items?.id}
              className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative overflow-hidden bg-gray-100">
                <Link to={`/product/${items?.id}`}>
                  <img
                    src={productImage}
                    alt={items?.name || "Product"}
                    className="w-full h-56 sm:h-64 lg:h-72 object-cover group-hover:scale-110 transition duration-700"
                    loading="lazy"
                  />
                </Link>

                {discountText && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                      {discountText}
                    </span>
                  </div>
                )}

                <div className="absolute top-3 right-3 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white rounded-full p-2 shadow-md hover:bg-black hover:text-white transition-colors cursor-pointer">
                    <WishlistProductButton product={items} />
                  </div>
                </div>

                <Link to={`/product/${items?.id}`}>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Quick View
                    </span>
                  </div>
                </Link>
              </div>

              <div className="p-4 sm:p-5">
                <Link to={`/product/${items?.id}`}>
                  <p className="text-[#9b7423] text-xs sm:text-sm font-black uppercase tracking-wider mb-1">
                    {items?.categories?.[0]?.name || "Premium Product"}
                  </p>
                </Link>

                <Link to={`/product/${items?.id}`}>
                  <h3 className="text-base sm:text-lg font-black text-gray-900 hover:text-[#9b7423] transition line-clamp-2 min-h-[3.5rem]">
                    <Product_name items={items} />
                  </h3>
                </Link>

                <div className="text-gray-500 text-xs sm:text-sm mt-2 line-clamp-2">
                  <Short_description items={items} />
                </div>

                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-black text-[#9b7423]">
                    <PriceSale items={items} />
                  </span>

                  <span className="text-gray-400 line-through text-sm">
                    <Regular_price items={items} />
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-1">
                  <div className="flex text-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= roundedRating
                            ? "text-[#D6BA72]"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <span className="text-gray-400 text-xs">
                    {rating.toFixed(1)} ({reviewCount})
                  </span>
                </div>

                <div className="mt-4">
                  <AddtoCartButton product={items} />
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default ProductCard;