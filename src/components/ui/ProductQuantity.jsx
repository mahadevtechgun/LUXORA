import { useDispatch, useSelector } from "react-redux";
import { addcart, increaseQty, decreaseQty } from "../../redux/cartSlice";

function ProductQuantity({ item }) {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    state.cart.items.find((i) => i.id === item?.id)
  );

  if (!item) return null;

  const quantity = cartItem?.quantity || 1;

  const handleIncrease = () => {
    if (cartItem) {
      dispatch(increaseQty(item.id));
    } else {
      dispatch(addcart(item));
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center rounded-full border border-black/20 overflow-hidden bg-white">
        <button
          onClick={() => dispatch(decreaseQty(item.id))}
          disabled={!cartItem || quantity <= 1}
          className="px-5 py-3 font-black text-xl disabled:opacity-40"
        >
          −
        </button>

        <span className="px-5 py-3 font-black">{quantity}</span>

        <button
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