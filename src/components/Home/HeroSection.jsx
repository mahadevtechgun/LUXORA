import React from "react";
import { FiAward } from "react-icons/fi";
import "../../assets/css/home.css";
import { Link } from "react-router-dom";

function HeroSection({ product = [] }) {
  return (
    <div className="bg-[#fbfaf7] text-black overflow-x-hidden">
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D6BA72]/25 blur-[130px] rounded-full"></div>

        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-400/10 blur-[100px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-14 items-center relative z-10">
          {/* Left Content */}
          <div>
            <span className="inline-block px-5 py-2 rounded-full bg-[#D6BA72]/20 text-[#8a6519] font-black mb-6">
              Luxury Ecommerce Experience
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black leading-[0.95] tracking-[-0.055em]">
              Shop The Future Of Premium Living.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-600">
              A premium ecommerce homepage with wishlist, login system, and
              modern UI.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="px-8 py-4 rounded-full bg-black text-white font-black text-center hover:bg-[#D6BA72] hover:text-black transition"
              >
                Explore Products
              </Link>

              <a
                href="#"
                className="px-8 py-4 rounded-full border-2 border-black font-black text-center hover:bg-black hover:text-white transition"
              >
                View Deals
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-5 max-w-lg">
              <div>
                <h3 className="text-3xl font-black">30K+</h3>
                <p className="text-sm text-neutral-500 font-semibold">
                  Customers
                </p>
              </div>

              <div>
                {/* Total Products */}
                <h3 className="text-3xl font-black">
                  {Array.isArray(product) ? product.length : 0}+
                </h3>

                <p className="text-sm text-neutral-500 font-semibold">
                  Products
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black">4.9★</h3>

                <p className="text-sm text-neutral-500 font-semibold">
                  Rating
                </p>
              </div>
            </div>
          </div>

          {/* Right Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-[2rem] overflow-hidden h-[360px] sm:h-[430px] mt-10 sm:mt-16 shadow-2xl">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=900"
                  alt="Luxury sneakers"
                />
              </div>

              <div className="space-y-5">
                <div className="rounded-[2rem] overflow-hidden h-[220px] sm:h-[260px] shadow-2xl">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=900"
                    alt="Premium watch"
                  />
                </div>

                <div className="rounded-[2rem] bg-black text-white p-6 sm:p-7 shadow-2xl">
                  <p className="text-[#D6BA72] font-black">
                    Today Deal
                  </p>

                  <h3 className="text-3xl sm:text-4xl font-black mt-2">
                    40% OFF
                  </h3>

                  <p className="text-white/60 mt-2">
                    Limited premium drop
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute left-2 sm:-left-5 bottom-6 bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-black/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D6BA72]/30 flex items-center justify-center">
                <FiAward size={20} />
              </div>

              <div>
                <p className="font-black text-lg">
                  Best Seller
                </p>

                <p className="text-neutral-500 text-sm">
                  1.2k sold this week
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;