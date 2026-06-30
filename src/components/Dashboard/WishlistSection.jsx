import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import EmptyState from "./EmptyState";

function WishlistSection({ items = [] }) {
  if (!items || items.length === 0) {
    return (
      <EmptyState
        title="Wishlist Empty"
        text="No wishlist products."
        icon={<FiHeart />}
      />
    );
  }

  const getImage = (item) =>
    item?.images?.[0]?.src ||
    item?.image?.src ||
    item?.image ||
    "https://via.placeholder.com/200";

  const formatPrice = (price) => {
    if (!price) return null;

    const finalPrice =
      Number(price) > 1000 ? Number(price) / 100 : Number(price);

    return `₹${finalPrice.toFixed(2)}`;
  };

  const getPrice = (item) => {
    const salePrice =
      item?.sale_price ||
      item?.prices?.sale_price ||
      item?.prices?.price ||
      item?.price;

    const regularPrice =
      item?.regular_price ||
      item?.prices?.regular_price ||
      item?.regularPrice;

    return {
      salePrice: formatPrice(salePrice),
      regularPrice: formatPrice(regularPrice),
    };
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-6">My Wishlist</h2>

      <div className="space-y-4">
        {items.map((item) => {
          const { salePrice, regularPrice } = getPrice(item);

          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-5 bg-[#fbfaf7] rounded-2xl p-5 border border-black/5"
            >
              <img
                src={getImage(item)}
                alt={item?.name || "Product"}
                className="w-24 h-24 rounded-xl object-cover bg-white"
              />

              <div className="flex-1 w-full">
                <span className="text-lg font-black">
                  {item?.name || "Product Name"}
                </span>

                <div className="flex items-center gap-3 mt-3">
                  {salePrice ? (
                    <span className="text-xl font-black text-black">
                      {salePrice}
                    </span>
                  ) : (
                    <span className="text-xl font-black text-black">
                      Price not available
                    </span>
                  )}

                  {regularPrice && regularPrice !== salePrice && (
                    <span className="text-sm font-bold text-neutral-500 line-through">
                      {regularPrice}
                    </span>
                  )}
                </div>
              </div>

              <Link
                to={`/product/${item.id}`}
                className="px-6 py-3 rounded-xl bg-black text-white font-black hover:bg-[#9b7423] transition"
              >
                View Product
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WishlistSection;