import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10 pb-12">
          <div>
            <h2 className="text-3xl font-black tracking-tight">
              Luxora<span className="text-[#D6BA72]">.</span>
            </h2>

            <p className="text-white/50 mt-4 text-sm leading-7">
              Redefining digital luxury since 2024. Curated elegance for modern
              lifestyles.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D6BA72] hover:text-black transition flex items-center justify-center"
              >
                <FiInstagram size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D6BA72] hover:text-black transition flex items-center justify-center"
              >
                <FiTwitter size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D6BA72] hover:text-black transition flex items-center justify-center"
              >
                <FiFacebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-black text-lg mb-5">Quick Links</h4>

            <ul className="space-y-3 text-white/50 text-sm">
              <li>
                <Link to="/shop" className="hover:text-white transition">
                  Shop
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-lg mb-5">Support</h4>

            <ul className="space-y-3 text-white/50 text-sm">
              <li>
                <Link to="/faqs" className="hover:text-white transition">
                  FAQs
                </Link>
              </li>

              <li>
                <Link
                  to="/shipping-returns"
                  className="hover:text-white transition"
                >
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-lg mb-5">Legal</h4>

            <ul className="space-y-3 text-white/50 text-sm">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms-conditions"
                  className="hover:text-white transition"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 text-white/40 text-xs">
          <p>© 2026 Luxora — All rights reserved.</p>

          <p>Payment methods: Visa • Mastercard • Amex • PayPal</p>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-white/30 text-xs tracking-[0.2em] uppercase">
            Designed & Developed By Ashish Rajput
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;