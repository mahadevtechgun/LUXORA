import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { cancelMyOrder } from "../../Api/UpdateApi";

function Order_Success({ orderId, onClose }) {
  const dispatch = useDispatch();

  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const clearLocalCartData = () => {
    dispatch(clearCart());

    localStorage.removeItem("persist:root");
    localStorage.removeItem("checkout_addresses");
    localStorage.removeItem("applied_coupon");
    localStorage.removeItem("cart");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("checkout_cart");
  };

  const handleCancelOrder = async () => {
    try {
      setLoading(true);

      if (orderId) {
        const result = await cancelMyOrder(orderId);

        if (result?.status !== "cancelled") {
          console.log("Cancel failed:", result);
          return;
        }
      }

      clearLocalCartData();

      setIsCancelled(true);
      setShowCancelPopup(false);
    } catch (error) {
      console.log("Cancel order error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 overflow-y-auto">
      <section className="relative overflow-hidden bg-black text-white py-20 lg:py-28 min-h-screen">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D6BA72] blur-[160px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white blur-[160px] rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto px-5 text-center relative z-10">
          <div
            className={`w-32 h-32 mx-auto rounded-full border flex items-center justify-center backdrop-blur ${
              isCancelled
                ? "bg-red-500/20 border-red-500/40"
                : "bg-[#D6BA72]/20 border-[#D6BA72]/40"
            }`}
          >
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center text-5xl font-black ${
                isCancelled
                  ? "bg-red-600 text-white"
                  : "bg-[#D6BA72] text-black"
              }`}
            >
              {isCancelled ? "!" : "✓"}
            </div>
          </div>

          <span
            className={`inline-block mt-10 px-6 py-2 rounded-full bg-white/10 font-black tracking-wide ${
              isCancelled ? "text-red-400" : "text-[#D6BA72]"
            }`}
          >
            {isCancelled ? "✦ Order Cancelled ✦" : "✦ Order Confirmed ✦"}
          </span>

          <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[0.95] mt-6">
            {isCancelled
              ? "Your Order Has Been Cancelled."
              : "Your Order Is On The Way."}
          </h1>

          <p className="text-white/60 text-lg leading-8 max-w-2xl mx-auto mt-8">
            {isCancelled
              ? "This order has been cancelled successfully. Your cart products have been removed."
              : "Thank you for shopping with us. Your order has been placed successfully and is now being prepared for delivery."}
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mt-14">
            <div className="bg-white/10 backdrop-blur rounded-[2rem] p-6 border border-white/10">
              <p className="text-white/50 font-semibold">Order ID</p>
              <h3 className="text-2xl font-black mt-2">
                #{orderId || "Processing"}
              </h3>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-[2rem] p-6 border border-white/10">
              <p className="text-white/50 font-semibold">Payment</p>
              <h3 className="text-2xl font-black mt-2">
                {isCancelled ? "Cancelled" : "Confirmed"}
              </h3>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-[2rem] p-6 border border-white/10">
              <p className="text-white/50 font-semibold">Status</p>
              <h3 className="text-2xl font-black mt-2">
                {isCancelled ? "Cancelled" : "3–5 Days"}
              </h3>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-14">
            {!isCancelled && (
              <button
                type="button"
                className="px-8 py-4 rounded-full bg-[#D6BA72] text-black font-black hover:bg-white transition"
              >
                Track Order
              </button>
            )}

            <Link
              to="/shop"
              onClick={clearLocalCartData}
              className="px-8 py-4 rounded-full border border-white/20 text-white font-black hover:bg-white hover:text-black transition"
            >
              Continue Shopping
            </Link>

            {!isCancelled && (
              <button
                type="button"
                onClick={() => setShowCancelPopup(true)}
                className="px-8 py-4 rounded-full bg-red-600 text-white font-black hover:bg-red-700 transition"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </section>

      {showCancelPopup && (
        <div className="fixed inset-0 z-[1000] bg-black/80 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-[2rem] p-8 text-center shadow-2xl">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-600 text-4xl font-black">
              !
            </div>

            <h2 className="text-3xl font-black text-black mt-6">
              Cancel Order?
            </h2>

            <p className="text-gray-600 mt-4 leading-7">
              Are you sure you want to cancel this order?
            </p>

            <div className="flex gap-4 justify-center mt-8">
              <button
                type="button"
                onClick={handleCancelOrder}
                disabled={loading}
                className="px-7 py-3 rounded-full bg-red-600 text-white font-black hover:bg-red-700 transition disabled:opacity-60"
              >
                {loading ? "Cancelling..." : "Yes"}
              </button>

              <button
                type="button"
                onClick={() => setShowCancelPopup(false)}
                disabled={loading}
                className="px-7 py-3 rounded-full border border-gray-300 text-black font-black hover:bg-gray-100 transition disabled:opacity-60"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Order_Success;