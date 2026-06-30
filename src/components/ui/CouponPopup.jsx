import React, { useEffect, useState } from "react";
import { FiCopy, FiGift, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { getCouponsApi } from "../../Api/checkoutApi";

function CouponPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const data = await getCouponsApi();

        if (data?.success && data?.coupons?.length > 0) {
          setCoupon(data.coupons[0]);
        } else {
          toast.error("No active coupon found");
        }
      } catch (error) {
        toast.error("Failed to load coupon");
      }
    };

    fetchCoupon();

    const alreadyClosed = sessionStorage.getItem("coupon_popup_closed");

    if (!alreadyClosed) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    sessionStorage.setItem("coupon_popup_closed", "true");
    setShowPopup(false);
  };

  const copyCoupon = async () => {
    if (!coupon?.code) {
      toast.error("Coupon not available");
      return;
    }

    try {
      await navigator.clipboard.writeText(coupon.code);
      toast.success("Coupon copied successfully");
      closePopup();
    } catch (error) {
      toast.error("Failed to copy coupon");
    }
  };

  if (!showPopup || !coupon) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative w-full max-w-md bg-white rounded-[2rem] p-7 text-center shadow-2xl overflow-hidden">

        <button
          type="button"
          onClick={closePopup}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#D6BA72] hover:text-black transition"
        >
          <FiX size={20} />
        </button>

        <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#D6BA72]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">

          <div className="mx-auto w-20 h-20 rounded-full bg-[#D6BA72]/20 flex items-center justify-center text-[#9b7423] text-4xl mb-5">
            <FiGift />
          </div>

          <span className="text-[#9b7423] uppercase tracking-[0.25em] text-xs font-black">
            Limited Time Offer
          </span>

          <h2 className="text-4xl font-black text-black mt-4">
            {coupon.discount_type === "percent"
              ? `Get ${coupon.amount}% OFF`
              : `Save ₹${coupon.amount}`}
          </h2>

          <p className="text-neutral-500 leading-7 mt-4">
            {coupon.description ||
              "Use this coupon code during checkout and enjoy your exclusive discount."}
          </p>

          <div className="mt-7 border-2 border-dashed border-[#D6BA72] rounded-2xl bg-[#fbfaf7] p-5">
            <p className="text-xs uppercase font-black text-neutral-400">
              Coupon Code
            </p>

            <h3 className="text-3xl font-black tracking-[0.2em] mt-2">
              {coupon.code}
            </h3>

            <p className="mt-3 text-[#9b7423] font-black">
              {coupon.label ||
                (coupon.discount_type === "percent"
                  ? `${coupon.amount}% OFF`
                  : `₹${coupon.amount} OFF`)}
            </p>
          </div>

          <button
            type="button"
            onClick={copyCoupon}
            className="mt-7 w-full h-14 rounded-full bg-black text-white font-black hover:bg-[#D6BA72] hover:text-black transition flex items-center justify-center gap-2"
          >
            <FiCopy size={18} />
            Copy Coupon
          </button>

          <button
            type="button"
            onClick={closePopup}
            className="mt-5 text-sm font-bold text-neutral-500 hover:text-black transition"
          >
            No thanks, continue shopping
          </button>

        </div>
      </div>
    </div>
  );
}

export default CouponPopup;