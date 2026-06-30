import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiClock, FiTruck, FiTag } from "react-icons/fi";

function FlashSale() {
  return (
    <section className="bg-[#fbfaf7] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] bg-black text-white shadow-[0_35px_100px_rgba(0,0,0,0.25)]">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D6BA72]/40 blur-[130px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 blur-[130px] rounded-full" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center p-6 sm:p-10 lg:p-16">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D6BA72]/15 text-[#D6BA72] text-xs font-black uppercase tracking-widest">
                <FiTag />
                Limited Time Deal
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black mt-6 leading-tight">
                Flash Sale
                <span className="block text-[#D6BA72]">Up To 40% Off</span>
              </h2>

              <p className="text-white/65 mt-5 text-base sm:text-lg max-w-xl leading-8">
                Upgrade your style with premium products, special discounts,
                and free shipping for a limited time.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
                <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                  <FiClock className="text-[#D6BA72] mb-2" />
                  <p className="text-xs text-white/50">Ends In</p>
                  <h4 className="font-black">Tonight</h4>
                </div>

                <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                  <FiTruck className="text-[#D6BA72] mb-2" />
                  <p className="text-xs text-white/50">Shipping</p>
                  <h4 className="font-black">Free</h4>
                </div>

                <div className="rounded-2xl bg-white/10 border border-white/10 p-4 col-span-2 sm:col-span-1">
                  <FiTag className="text-[#D6BA72] mb-2" />
                  <p className="text-xs text-white/50">Discount</p>
                  <h4 className="font-black">40% Off</h4>
                </div>
              </div>

              <Link
                to="/shop"
                className="inline-flex items-center gap-3 mt-9 px-8 py-4 rounded-full bg-[#D6BA72] text-black font-black hover:bg-white transition"
              >
                Shop Flash Sale
                <FiArrowRight size={18} />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[#D6BA72]/20 blur-3xl rounded-full" />

              <img
                className="relative rounded-[2rem] h-[320px] sm:h-[420px] w-full object-cover shadow-2xl"
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200"
                alt="Flash sale"
              />

              <div className="absolute top-5 left-5 bg-white text-black rounded-2xl px-5 py-3 shadow-xl">
                <p className="text-xs font-black text-gray-500 uppercase">
                  Save
                </p>
                <h3 className="text-2xl font-black">40%</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FlashSale;