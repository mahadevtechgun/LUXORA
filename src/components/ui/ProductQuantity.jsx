import { useDispatch, useSelector } from "react-redux";
import { addcart, increaseQty, decreaseQty } from "../../redux/cartSlice";

function ProductQuantity({ item }) {
  const dispatch = useDispatch();

  if (!item) return null;

  const itemKey =
    item.cartKey ||
    `${item.id}-${item.variation_id || 0}-${item.selectedColor || ""}-${
      item.selectedSize || ""
    }`;

  const cartItem = useSelector((state) =>
    state.cart.items.find((i) => i.cartKey === itemKey)
  );

  const quantity = cartItem?.quantity || 1;

  const handleIncrease = () => {
    if (cartItem) {
      dispatch(increaseQty(itemKey));
    } else {
      dispatch(
        addcart({
          ...item,
          cartKey: itemKey,
          quantity: 1,
        })
      );
    }
  };

  const handleDecrease = () => {
    if (cartItem && quantity > 1) {
      dispatch(decreaseQty(itemKey));
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center rounded-full border border-black/20 overflow-hidden bg-white">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={!cartItem || quantity <= 1}
          className="px-5 py-3 font-black text-xl disabled:opacity-40"
        >
          −
        </button>

        <span className="px-5 py-3 font-black">{quantity}</span>

        <button
          type="button"
          onClick={handleIncrease}
          className="px-5 py-3 font-black text-xl"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ProductQuantity;