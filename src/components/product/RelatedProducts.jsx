import React from "react";
import { Link } from "react-router-dom";
import Regular_price from "../ui/Regular_price";
import Product_name from "../ui/Product_name";
import PriceSale from "../ui/PriceSale";
import WishlistProductButton from "../ui/WishlistProductButton";
import { OffProduct } from "../ui/OFFproduct";
import { FiShoppingCart, FiEye } from "react-icons/fi";

function RelatedProducts({ allProducts = [], product }) {
  const relatedProducts = allProducts.filter(
    (item) =>
      item?.id !== product?.id &&
      item?.categories?.some((cat) =>
        product?.categories?.some((pCat) => pCat.id === cat.id)
      )
  );

  if (!relatedProducts.length) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl">
        <p className="text-neutral-500 font-medium">No related products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {relatedProducts.slice(0, 4).map((item) => {
        const discountText = OffProduct({ items: item });
        
        return (
          <div
            key={item.id}
            className="group relative bg-white rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Wishlist Button */}
            <div className="absolute top-3 right-3 z-10">
              <WishlistProductButton product={item} />
            </div>

            {/* Discount Badge */}
            {discountText && (
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
                  {discountText}
                </span>
              </div>
            )}

            {/* Product Image */}
            <Link to={`/product/${item.id}`} className="block overflow-hidden">
              <img
                className="h-56 sm:h-64 w-full object-cover group-hover:scale-110 transition duration-500"
                src={item?.images?.[0]?.src}
                alt={item?.name || "Product image"}
              />
            </Link>

            {/* Product Info */}
            <div className="p-4 sm:p-5">
              {/* Category */}
              {item?.categories?.[0]?.name && (
                <p className="text-[#9b7423] text-xs sm:text-sm font-black mb-1">
                  {item.categories[0].name}
                </p>
              )}

              {/* Product Name */}
              <Link to={`/product/${item.id}`}>
                <h3 className="font-black text-base sm:text-lg hover:text-[#D6BA72] transition line-clamp-2 min-h-[3.5rem]">
                  <Product_name items={item} />
                </h3>
              </Link>

              {/* Price Section */}
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="text-xl sm:text-2xl font-black text-[#9b7423]">
                  <PriceSale items={item} />
                </span>
                <span className="text-sm text-gray-400 line-through">
                  <Regular_price items={item} />
                </span>
              </div>

              
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RelatedProducts;