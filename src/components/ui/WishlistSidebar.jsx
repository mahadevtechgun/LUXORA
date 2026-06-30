import React from "react";
import { FiHeart, FiX, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist, clearWishlist } from "../../redux/wishlistSlice";

import PriceSale from "./PriceSale";
import AddtoCartButton from "./AddtoCartButton";

function WishlistSidebar({ sidebar, setSidebar }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const count = wishlist.length;

  return (
    <>
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#f7f5ef] z-[110] shadow-[0_30px_100px_rgba(0,0,0,0.35)] transform transition-transform duration-500 ease-out flex flex-col ${
          sidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative overflow-hidden p-6 bg-black text-white">
          <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#D6BA72]/30 blur-3xl" />

          <div className="relative flex justify-between items-center">
            <div>
              <span className="text-[#D6BA72] text-xs font-black uppercase tracking-[0.25em]">
                Luxe Collection
              </span>

              <h3 className="text-2xl font-black mt-2 flex items-center gap-3">
                My Wishlist
                <span className="text-xs bg-[#D6BA72] text-black px-3 py-1 rounded-full">
                  {count}
                </span>
              </h3>
            </div>

            <button
              onClick={() => setSidebar(false)}
              className="w-11 h-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-[#D6BA72] hover:text-black transition"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center text-[#D6BA72]">
                <FiHeart size={42} />
              </div>

              <h4 className="text-2xl font-black mt-6">
                Wishlist is Empty
              </h4>

              <p className="text-neutral-500 mt-3 text-sm leading-6">
                Save your favorite luxury products here and shop them anytime.
              </p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-[28px] p-4 border border-black/5 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition"
              >
                <div className="flex gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={item.image || item.images?.[0]?.src}
                      alt={item.name}
                      className="w-24 h-24 rounded-3xl object-cover bg-[#f7f5ef]"
                    />

                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-black text-[#D6BA72] flex items-center justify-center">
                      <FiHeart size={15} />
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-[#9b7423] uppercase tracking-widest truncate">
                      {item.category || "Premium"}
                    </p>

                    <h4 className="font-black text-base mt-1 line-clamp-2">
                      {item.name}
                    </h4>

                    <div className="text-lg font-black mt-2">
                      <PriceSale items={item} />
                    </div>
                  </div>

                  <button
                    onClick={() => dispatch(toggleWishlist(item))}
                    className="shrink-0 w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition"
                    title="Remove"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>

                <div className="mt-4">
                  <AddtoCartButton product={item} />
                </div>
              </div>
            ))
          )}
        </div>

        {wishlist.length > 0 && (
          <div className="p-5 border-t border-black/10 bg-white">
            <button
              onClick={() => dispatch(clearWishlist())}
              className="w-full h-13 py-4 rounded-full bg-black text-white text-sm font-black hover:bg-[#D6BA72] hover:text-black transition flex items-center justify-center gap-2"
            >
              <FiTrash2 size={16} />
              Clear Wishlist
            </button>
          </div>
        )}
      </aside>

      <div
        onClick={() => setSidebar(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[105] transition-all duration-500 ${
          sidebar ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />
    </>
  );
}

export default WishlistSidebar;