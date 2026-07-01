import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiHome,
  FiShoppingBag,
  FiSearch,
  FiAlertTriangle,
} from "react-icons/fi";

function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-4 py-28">
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-[#D6BA72]/30 rounded-full blur-[140px]" />
      <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] bg-white/10 rounded-full blur-[140px]" />

      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

      <section className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="mx-auto mb-8 w-24 h-24 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[#D6BA72] text-5xl shadow-2xl">
          <FiAlertTriangle />
        </div>

        <p className="text-[#D6BA72] uppercase tracking-[0.35em] font-black text-xs sm:text-sm">
          Page Not Found
        </p>

        <h1 className="text-[110px] sm:text-[150px] lg:text-[210px] font-black leading-none tracking-[-0.08em] mt-4">
          404
        </h1>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black mt-4">
          Lost in Luxury?
        </h2>

        <p className="text-white/60 max-w-2xl mx-auto mt-6 leading-8 text-sm sm:text-base">
          The page you are looking for does not exist, has been moved, or is
          temporarily unavailable. Let’s get you back to shopping.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#D6BA72] text-black font-black hover:bg-white transition"
          >
            <FiHome />
            Back Home
          </Link>

          <Link
            to="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/10 border border-white/15 text-white font-black hover:bg-white hover:text-black transition"
          >
            <FiShoppingBag />
            Continue Shopping
          </Link>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <Link
            to="/shop"
            className="group rounded-3xl bg-white/10 border border-white/10 p-5 text-left hover:bg-[#D6BA72] hover:text-black transition"
          >
            <FiSearch className="text-2xl text-[#D6BA72] group-hover:text-black" />
            <h3 className="font-black mt-4">Browse Products</h3>
            <p className="text-white/50 group-hover:text-black/70 text-sm mt-2">
              Explore latest collections.
            </p>
          </Link>

          <Link
            to="/contact"
            className="group rounded-3xl bg-white/10 border border-white/10 p-5 text-left hover:bg-[#D6BA72] hover:text-black transition"
          >
            <FiArrowRight className="text-2xl text-[#D6BA72] group-hover:text-black" />
            <h3 className="font-black mt-4">Need Help?</h3>
            <p className="text-white/50 group-hover:text-black/70 text-sm mt-2">
              Contact our support team.
            </p>
          </Link>

          <Link
            to="/faqs"
            className="group rounded-3xl bg-white/10 border border-white/10 p-5 text-left hover:bg-[#D6BA72] hover:text-black transition"
          >
            <FiAlertTriangle className="text-2xl text-[#D6BA72] group-hover:text-black" />
            <h3 className="font-black mt-4">FAQs</h3>
            <p className="text-white/50 group-hover:text-black/70 text-sm mt-2">
              Find quick answers.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;