import { useEffect, useState } from "react";
import { FiTag, FiCheckCircle } from "react-icons/fi";
import { applyCouponApi, getCouponsApi } from "../../Api/checkoutApi";
import { toast } from "react-toastify";

function Apply_Coupon({ cartItems = [] }) {
  const [coupon, setCoupon] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await getCouponsApi();
        setCoupons(data?.coupons || []);
      } catch (error) {
        console.log("Coupons Load Error:", error);
      }
    };

    fetchCoupons();
  }, []);

  const handleApplyCoupon = async (code = coupon) => {
    if (!code.trim()) {
      toast.error("Please enter coupon code");
      return;
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        coupon_code: code.trim(),
        items: cartItems.map((item) => ({
          product_id: item.product_id || item.id,
          quantity: Number(item.quantity || 1),
        })),
      };

      const data = await applyCouponApi(payload);

      if (!data?.success) {
        toast.error(data?.message || "Invalid coupon code");
        return;
      }

      const discountAmount = Number(data.discount_total || 0);

      if (discountAmount <= 0) {
        toast.error("Coupon applied but discount is 0");
        return;
      }

      const finalCoupon = {
        code: data.coupon_code || code.trim(),
        discount: discountAmount,
        percent: data.discount_type === "percent" ? Number(data.amount || 0) : 0,
      };

      localStorage.setItem("applied_coupon", JSON.stringify(finalCoupon));
      window.dispatchEvent(new Event("couponUpdated"));

      toast.success("Coupon applied successfully");
      setCoupon("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid coupon code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 relative overflow-hidden bg-white rounded-[36px] shadow-[0_25px_70px_rgba(0,0,0,0.08)] border border-black/5 p-7">
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#D6BA72]/20 rounded-full blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-black text-[#D6BA72] flex items-center justify-center">
            <FiTag size={22} />
          </div>

          <div>
            <h3 className="text-2xl font-black">Apply Coupon</h3>
            <p className="text-sm text-neutral-500 mt-1">
              Select or enter your promo code to unlock savings.
            </p>
          </div>
        </div>

        {coupons.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-3">
            {coupons.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCoupon(item.code.toUpperCase())}
                className="px-4 py-3 rounded-2xl bg-[#fbfaf7] border border-[#D6BA72]/40 hover:bg-[#D6BA72] hover:text-black transition text-left"
              >
                <p className="font-black tracking-widest uppercase">
                  {item.code}
                </p>

                <p className="text-xs text-neutral-500 font-bold mt-1">
                  {item.discount_type === "percent"
                    ? `${item.amount}% OFF`
                    : `₹${item.amount} OFF`}
                </p>
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleApplyCoupon();
              }
            }}
            className="flex-1 h-14 px-6 rounded-full border border-black/10 bg-[#f7f5ef] outline-none focus:border-[#D6BA72] focus:ring-4 focus:ring-[#D6BA72]/20 font-bold tracking-widest uppercase"
            placeholder="ENTER COUPON CODE"
          />

          <button
            type="button"
            onClick={() => handleApplyCoupon()}
            disabled={loading}
            className="h-14 px-8 rounded-full bg-black text-white font-black hover:bg-[#D6BA72] hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? "Applying..." : "Apply"}
            {!loading && <FiCheckCircle size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Apply_Coupon;