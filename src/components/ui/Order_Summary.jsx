import { useEffect, useState } from "react";
import { FiArrowRight, FiTag, FiTruck, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getShippingRates, applyCouponApi } from "../../api/checkoutApi";
import { toast } from "react-toastify";

function Order_Summary() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items || []);

  const freeShipping = {
    id: "free_shipping",
    label: "Free Shipping",
    cost: 0,
  };

  const [shippingRate, setShippingRate] = useState(freeShipping);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [couponData, setCouponData] = useState(null);

  const subtotal = cartItems.reduce((acc, item) => {
    const rawPrice = item?.prices?.price || item?.price || 0;
    const price = item?.prices?.price
      ? Number(rawPrice) / 100
      : Number(rawPrice);

    const quantity = Number(item?.quantity || 1);
    return acc + price * quantity;
  }, 0);

  const totalItems = cartItems.reduce((acc, item) => {
    return acc + Number(item?.quantity || 1);
  }, 0);

  useEffect(() => {
    const loadCoupon = () => {
      const savedCoupon = JSON.parse(
        localStorage.getItem("applied_coupon") || "null"
      );

      if (savedCoupon?.code && Number(savedCoupon?.discount || 0) > 0) {
        setCouponData(savedCoupon);
      } else {
        setCouponData(null);
      }
    };

    loadCoupon();
    window.addEventListener("couponUpdated", loadCoupon);

    return () => {
      window.removeEventListener("couponUpdated", loadCoupon);
    };
  }, []);

  useEffect(() => {
    const fetchShipping = async () => {
      const savedAddresses = JSON.parse(
        localStorage.getItem("checkout_addresses") || "[]"
      );

      const address = savedAddresses?.[0];

      if (!address || cartItems.length === 0) {
        setShippingRate(freeShipping);
        return;
      }

      try {
        setShippingLoading(true);

        const payload = {
          country: address.country || "IN",
          state: address.state || "",
          city: address.city || "",
          postcode: address.postal || "",
          items: cartItems.map((item) => ({
            product_id: item.product_id || item.id,
            quantity: Number(item.quantity || 1),
          })),
        };

        const data = await getShippingRates(payload);
        const rates = data?.rates || [];

        setShippingRate(rates.length > 0 ? rates[0] : freeShipping);
      } catch (error) {
        console.log(error);
        setShippingRate(freeShipping);
      } finally {
        setShippingLoading(false);
      }
    };

    fetchShipping();
  }, [cartItems]);

  useEffect(() => {
    const recalculateCoupon = async () => {
      const savedCoupon = JSON.parse(
        localStorage.getItem("applied_coupon") || "null"
      );

      if (!savedCoupon?.code || cartItems.length === 0) return;

      try {
        const payload = {
          coupon_code: savedCoupon.code,
          items: cartItems.map((item) => ({
            product_id: item.product_id || item.id,
            quantity: Number(item.quantity || 1),
          })),
        };

        const data = await applyCouponApi(payload);

        if (!data?.success) return;

        const updatedCoupon = {
          code: data.coupon_code || savedCoupon.code,
          discount: Number(data.discount_total || 0),
          percent:
            data.discount_type === "percent"
              ? Number(data.amount || 0)
              : Number(savedCoupon.percent || 0),
        };

        localStorage.setItem("applied_coupon", JSON.stringify(updatedCoupon));
        setCouponData(updatedCoupon);
        window.dispatchEvent(new Event("couponUpdated"));
      } catch (error) {
        console.log(error);
        localStorage.removeItem("applied_coupon");
        setCouponData(null);
        window.dispatchEvent(new Event("couponUpdated"));
      }
    };

    recalculateCoupon();
  }, [cartItems]);

  const removeCoupon = () => {
    localStorage.removeItem("applied_coupon");
    setCouponData(null);
    window.dispatchEvent(new Event("couponUpdated"));
    toast.success("Coupon removed");
  };

  const handleCheckout = () => {
    if (totalItems === 0) return;

    const isLoggedIn = !!localStorage.getItem("token");

    if (!isLoggedIn) {
      toast.error("Please login before checkout");
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  const shipping = Number(shippingRate?.cost || 0);

  const discount = couponData?.code
    ? Math.min(Number(couponData?.discount || 0), subtotal)
    : 0;

  const couponPercent = Number(couponData?.percent || 0);
  const total = Math.max(subtotal - discount + shipping, 0);

  return (
    <div className="relative overflow-hidden rounded-[36px] bg-black text-white p-7 shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#D6BA72]/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

      <div className="relative">
        <span className="text-[#D6BA72] text-xs font-black uppercase tracking-[0.25em]">
          Checkout Details
        </span>

        <h2 className="text-3xl sm:text-4xl font-black mt-3">
          Order Summary
        </h2>

        <div className="mt-6 rounded-3xl bg-white/10 border border-white/10 p-4 flex justify-between items-center">
          <span className="text-white/60">Total Items</span>
          <strong className="text-[#D6BA72] text-xl">{totalItems}</strong>
        </div>

        <div className="space-y-5 mt-7">
          <SummaryRow label="Subtotal" value={`₹${subtotal.toFixed(2)}`} />

          {discount > 0 && (
            <div className="rounded-3xl bg-[#D6BA72]/15 border border-[#D6BA72]/30 p-4">
              <div className="flex justify-between gap-4">
                <span className="flex items-center gap-2 text-[#D6BA72] font-bold">
                  <FiTag />
                  {couponPercent > 0
                    ? `${couponPercent}% Discount`
                    : "Discount"}
                </span>

                <strong className="text-[#D6BA72]">
                  -₹{discount.toFixed(2)}
                </strong>
              </div>

              <button
                type="button"
                onClick={removeCoupon}
                className="mt-3 inline-flex items-center gap-2 text-red-300 text-sm font-bold hover:text-red-200"
              >
                <FiX />
                Remove Coupon
              </button>
            </div>
          )}

          <SummaryRow
            label="Shipping"
            icon={<FiTruck />}
            value={
              shippingLoading
                ? "Loading..."
                : shipping === 0
                ? "Free"
                : `₹${shipping.toFixed(2)}`
            }
          />

          <div className="border-t border-white/10 pt-6 flex justify-between items-end">
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
          onClick={handleCheckout}
          disabled={totalItems === 0}
          className="mt-8 w-full h-14 rounded-full bg-[#D6BA72] text-black font-black hover:bg-white transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed To Checkout
          <FiArrowRight />
        </button>

        <p className="text-center text-white/40 text-xs mt-5">
          Secure checkout • Fast delivery • Premium support
        </p>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, icon }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-white/60 flex items-center gap-2">
        {icon}
        {label}
      </span>

      <strong className="text-white">{value}</strong>
    </div>
  );
}

export default Order_Summary;