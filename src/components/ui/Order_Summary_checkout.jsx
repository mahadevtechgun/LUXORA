import { useSelector } from "react-redux";
import { FiCreditCard, FiTruck, FiTag, FiShield } from "react-icons/fi";

function Order_Summary_checkout({
  onPlaceOrder,
  loading,
  shipping = 0,
  couponData = null,
  orderSuccess = false,
}) {
  const cartItems = useSelector((state) => state.cart.items || []);

  const getPrice = (item) => {
    if (
      item?.prices?.price !== undefined &&
      item?.prices?.price !== null &&
      item?.prices?.price !== ""
    ) {
      return Number(item.prices.price) / 100;
    }

    if (
      item?.sale_price !== undefined &&
      item?.sale_price !== null &&
      item?.sale_price !== ""
    ) {
      return Number(item.sale_price);
    }

    if (
      item?.price !== undefined &&
      item?.price !== null &&
      item?.price !== ""
    ) {
      return Number(item.price);
    }

    if (
      item?.regular_price !== undefined &&
      item?.regular_price !== null &&
      item?.regular_price !== ""
    ) {
      return Number(item.regular_price);
    }

    return 0;
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = getPrice(item);
    const quantity = Number(item?.quantity || 1);
    return acc + price * quantity;
  }, 0);

  const totalItems = cartItems.reduce((acc, item) => {
    return acc + Number(item?.quantity || 1);
  }, 0);

  const discount = couponData?.code
    ? Math.min(Number(couponData?.discount || 0), subtotal)
    : 0;

  const couponPercent = Number(couponData?.percent || 0);
  const tax = 0;
  const total = Math.max(subtotal - discount + Number(shipping) + tax, 0);

  return (
    <aside className="relative overflow-hidden bg-black text-white rounded-[36px] p-6 sm:p-7 sticky top-28 shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#D6BA72]/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

      <div className="relative">
        <span className="text-[#D6BA72] text-xs font-black uppercase tracking-[0.25em]">
          Checkout Details
        </span>

        <h2 className="text-3xl sm:text-4xl font-black mt-3">
          Your Order
        </h2>

        <div className="mt-5 rounded-3xl bg-white/10 border border-white/10 p-4 flex justify-between">
          <span className="text-white/60">Total Items</span>
          <strong className="text-[#D6BA72]">{totalItems}</strong>
        </div>

        <div className="space-y-4 mt-7 max-h-[330px] overflow-y-auto pr-1">
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              const price = getPrice(item);
              const quantity = Number(item?.quantity || 1);

              const image =
                item?.images?.[0]?.src ||
                item?.image?.src ||
                item?.image ||
                "https://via.placeholder.com/300";

              return (
                <div
                  className="flex gap-4 rounded-3xl bg-white/10 border border-white/10 p-3"
                  key={item.variation_id || item.id || item.key}
                >
                  <img
                    className="w-20 h-20 rounded-2xl object-cover bg-white/10"
                    src={image}
                    alt={item.name || "Product"}
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-black line-clamp-2">
                      {item.name || "Product"}
                    </h4>

                    <p className="text-white/50 text-sm mt-1">
                      Qty: {quantity}
                    </p>

                    {item?.selectedColor && (
                      <p className="text-white/50 text-xs mt-1">
                        Color: {item.selectedColor}
                      </p>
                    )}

                    {item?.selectedSize && (
                      <p className="text-white/50 text-xs mt-1">
                        Size: {item.selectedSize}
                      </p>
                    )}
                  </div>

                  <strong className="text-[#D6BA72] whitespace-nowrap">
                    ₹{(price * quantity).toFixed(2)}
                  </strong>
                </div>
              );
            })
          ) : (
            <p className="text-white/50">Your cart is empty</p>
          )}
        </div>

        <div className="space-y-5 mt-8 border-t border-white/10 pt-6">
          <SummaryRow label="Subtotal" value={`₹${subtotal.toFixed(2)}`} />

          {discount > 0 && (
            <SummaryRow
              icon={<FiTag />}
              label={
                couponPercent > 0
                  ? `${couponPercent}% Discount`
                  : "Discount"
              }
              value={`-₹${discount.toFixed(2)}`}
              highlight
            />
          )}

          <SummaryRow
            icon={<FiTruck />}
            label="Shipping"
            value={
              Number(shipping) === 0
                ? "Free"
                : `₹${Number(shipping).toFixed(2)}`
            }
          />

          <SummaryRow label="Tax" value={`₹${tax.toFixed(2)}`} />

          <div className="border-t border-white/10 pt-5 flex justify-between items-end">
            <div>
              <span className="text-white/50 text-sm">Payable Amount</span>
              <h3 className="text-xl font-black mt-1">Total</h3>
            </div>

            <strong className="text-4xl font-black text-[#D6BA72]">
              ₹{total.toFixed(2)}
            </strong>
          </div>
        </div>

        <button
          type="button"
          onClick={onPlaceOrder}
          disabled={loading || orderSuccess || cartItems.length === 0}
          className="mt-8 w-full h-14 rounded-full bg-[#D6BA72] text-black font-black hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {loading
            ? "Placing Order..."
            : orderSuccess
            ? "Order Placed"
            : "Place Order"}

          {!loading && !orderSuccess && <FiCreditCard size={18} />}
        </button>

        <p className="mt-5 text-center text-white/40 text-xs flex justify-center items-center gap-2">
          <FiShield />
          Secure checkout • Premium support
        </p>
      </div>
    </aside>
  );
}

function SummaryRow({ label, value, icon, highlight }) {
  return (
    <div className="flex justify-between items-center text-sm gap-4">
      <span
        className={`flex items-center gap-2 ${
          highlight ? "text-[#D6BA72]" : "text-white/60"
        }`}
      >
        {icon}
        {label}
      </span>

      <strong className={highlight ? "text-[#D6BA72]" : "text-white"}>
        {value}
      </strong>
    </div>
  );
}

export default Order_Summary_checkout;