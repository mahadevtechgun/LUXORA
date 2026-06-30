import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingCart, FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import EmptyState from "./EmptyState";
import { removeItem, increaseQty, decreaseQty } from "../../redux/cartSlice";

function CartSection() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items) || [];

  const getImage = (item) =>
    item?.images?.[0]?.src ||
    item?.image?.src ||
    item?.image ||
    "https://via.placeholder.com/200";

  const getPrice = (item) => {
    const rawPrice =
      item?.sale_price ||
      item?.price ||
      item?.regular_price ||
      item?.prices?.price ||
      0;

    const price =
      Number(rawPrice) > 1000 ? Number(rawPrice) / 100 : Number(rawPrice);

    return price || 0;
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + getPrice(item) * (Number(item.quantity) || 1);
  }, 0);

  if (!cartItems || cartItems.length === 0) {
    return (
      <EmptyState
        title="Cart Empty"
        text="Products added to cart will appear here."
        icon={<FiShoppingCart />}
      />
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-6">My Cart</h2>

      <div className="space-y-4">
        {cartItems.map((item) => {
          const price = getPrice(item);
          const quantity = Number(item.quantity) || 1;

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
                <h3 className="text-lg font-black">
                  {item?.name || "Product Name"}
                </h3>

                <p className="text-neutral-600 font-bold mt-2">
                  ₹{price.toFixed(2)}
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="w-9 h-9 rounded-xl bg-white border border-black/10 flex items-center justify-center hover:bg-neutral-100 transition"
                  >
                    <FiMinus />
                  </button>

                  <span className="font-black">{quantity}</span>

                  <button
                    type="button"
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="w-9 h-9 rounded-xl bg-white border border-black/10 flex items-center justify-center hover:bg-neutral-100 transition"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
                <p className="font-black text-lg">
                  ₹{(price * quantity).toFixed(2)}
                </p>

                <button
                  type="button"
                  onClick={() => dispatch(removeItem(item.id))}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white font-black flex items-center justify-center gap-2 hover:bg-red-700 transition"
                >
                  <FiTrash2 /> Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-[#fbfaf7] rounded-2xl p-6 border border-black/5">
        <div className="flex items-center justify-between mb-5">
          <span className="font-black text-lg">Subtotal</span>
          <span className="font-black text-2xl">
            ₹{subtotal.toFixed(2)}
          </span>
        </div>

        <Link
          to="/checkout"
          className="block text-center w-full px-7 py-4 rounded-xl bg-black text-white font-black hover:bg-[#9b7423] transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default CartSection;