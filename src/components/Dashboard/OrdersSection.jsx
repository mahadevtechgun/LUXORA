import { useState } from "react";
import { Link } from "react-router-dom";
import { FiPackage } from "react-icons/fi";
import { cancelMyOrder } from "../../Api/UpdateApi";
import EmptyState from "./EmptyState";

function OrdersSection({ orders = [], loader = false, setOrders }) {
  const [cancelLoading, setCancelLoading] = useState(null);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      setCancelLoading(orderId);

      const result = await cancelMyOrder(orderId);

      console.log("Cancel Order Response:", result);

      if (!result?.success && result?.status !== "cancelled") {
        alert(result?.message || "Order cancel failed");
        return;
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: "cancelled" } : order
        )
      );

      alert("Order cancelled successfully");
    } catch (error) {
      console.log(
        "Cancel Order Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          error.response?.data?.data?.message ||
          "Order cancel failed"
      );
    } finally {
      setCancelLoading(null);
    }
  };

  if (loader) {
    return (
      <EmptyState
        title="Loading Orders..."
        text="Please wait, your orders are loading."
        icon={<FiPackage />}
      />
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        title="No Orders Found"
        text="You have not placed any orders yet."
        icon={<FiPackage />}
      />
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-6">My Orders</h2>

      <div className="space-y-5">
        {orders.map((order) => {
          const canCancel =
            order.status === "pending" ||
            order.status === "processing" ||
            order.status === "on-hold";

          return (
            <div
              key={order.id}
              className="bg-[#fbfaf7] rounded-2xl p-5 border border-black/5"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4">
                <div>
                  <h3 className="font-black text-xl">
                    Order #{order.order_number || order.id}
                  </h3>

                  <p className="text-sm text-neutral-500 mt-1">
                    {order.date || "N/A"}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span
                    className={`inline-block px-4 py-2 rounded-full font-black capitalize ${
                      order.status === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-[#D6BA72]/30 text-[#9b7423]"
                    }`}
                  >
                    {order.status || "pending"}
                  </span>

                  <p className="font-black mt-2">
                    {order.currency || "INR"} {order.total || 0}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {order.items?.length > 0 ? (
                  order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-white rounded-xl p-3"
                    >
                      <img
                        src={item.image || "https://via.placeholder.com/100"}
                        alt={item.name || "Product"}
                        className="w-16 h-16 rounded-xl object-cover bg-white"
                      />

                      <div className="flex-1">
                        <h4 className="font-black">
                          {item.name || "Product Name"}
                        </h4>

                        <p className="text-sm text-neutral-500">
                          Qty: {item.quantity || 1}
                        </p>
                      </div>

                      <p className="font-black">₹{item.total || 0}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-neutral-500 text-sm">
                    Products not available for this order.
                  </p>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-black/10 text-sm text-neutral-500 flex flex-wrap gap-4">
                <span>Payment: {order.payment_method || "N/A"}</span>
                <span>Email: {order.billing_email || "N/A"}</span>
              </div>

              {canCancel && (
                <button
                  type="button"
                  onClick={() => handleCancelOrder(order.id)}
                  disabled={cancelLoading === order.id}
                  className="mt-5 px-6 py-3 rounded-xl bg-red-600 text-white font-black hover:bg-red-700 transition disabled:opacity-50"
                >
                  {cancelLoading === order.id
                    ? "Cancelling..."
                    : "Cancel Order"}
                </button>
              )}

              {order.status === "cancelled" && (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <p className="text-red-600 font-black">
                    This order has been cancelled.
                  </p>

                  <Link
                    to="/shop"
                    className="px-6 py-3 rounded-xl bg-black text-white font-black hover:bg-[#9b7423] transition"
                  >
                    Buy Again
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrdersSection;