import React, { useState } from "react";
import { FiTrash2, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import PriceSale from "../components/ui/PriceSale";
import Regular_price from "../components/ui/Regular_price";
import ProductQuantity from "../components/ui/ProductQuantity";
import { Link } from "react-router-dom";
import { removeItem } from "../redux/cartSlice";
import Order_Summary from "../components/ui/Order_Summary";
import Apply_Coupon from "../components/ui/Apply_Coupon";

export const Cart = () => {
  const cartadd = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();

  const [couponData, setCouponData] = useState(null);

  return (
    <main className="min-h-screen bg-[#f7f5ef] pt-32 pb-20">
      <section className="max-w-7xl mx-auto px-5">
        <div className="relative overflow-hidden rounded-[46px] bg-black text-white p-8 sm:p-12">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#D6BA72]/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 text-[#D6BA72] font-black uppercase tracking-[0.25em] text-xs">
              <FiShoppingBag />
              Shopping Cart
            </span>

            <h1 className="text-5xl lg:text-7xl font-black mt-5 tracking-tight">
              Your Cart
            </h1>

            <p className="text-white/60 mt-5 max-w-2xl text-lg leading-8">
              Review your selected premium products, update quantities and
              proceed to secure checkout.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 mt-12 grid lg:grid-cols-[1fr_390px] gap-10 items-start">
        <div className="space-y-6">
          <div className="bg-white rounded-[36px] shadow-[0_25px_80px_rgba(0,0,0,0.08)] border border-black/5 overflow-hidden">
            <div className="hidden md:grid grid-cols-[1.6fr_120px_160px_120px_60px] gap-4 px-7 py-5 border-b border-black/10 font-black text-xs text-neutral-400 uppercase tracking-widest">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
              <div></div>
            </div>

            {cartadd.length === 0 ? (
              <div className="text-center p-10 sm:p-16">
                <div className="mx-auto w-24 h-24 rounded-full bg-[#f7f5ef] flex items-center justify-center text-[#D6BA72]">
                  <FiShoppingBag size={42} />
                </div>

                <h3 className="text-3xl font-black mt-6">
                  Your cart is empty
                </h3>

                <p className="text-neutral-500 mt-3">
                  Add premium products to continue shopping.
                </p>

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 mt-7 px-8 py-4 rounded-full bg-black text-white font-black hover:bg-[#D6BA72] hover:text-black transition"
                >
                  Continue Shopping
                  <FiArrowRight />
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-black/5">
                {cartadd.map((items) => {
                  const itemKey =
                    items.cartKey ||
                    `${items.id}-${items.variation_id || 0}-${
                      items.selectedColor || ""
                    }-${items.selectedSize || ""}`;

                  return (
                    <div
                      key={itemKey}
                      className="grid md:grid-cols-[1.6fr_120px_160px_120px_60px] gap-5 items-center p-5 sm:p-7"
                    >
                      <div className="flex gap-4 items-center min-w-0">
                        <img
                          className="w-24 h-24 rounded-3xl object-cover bg-[#f7f5ef]"
                          src={
                            items?.images?.[0]?.src ||
                            items?.image?.src ||
                            items?.image ||
                            "https://via.placeholder.com/200"
                          }
                          alt={items?.title || items?.name}
                        />

                        <div className="min-w-0">
                          <p className="text-[#9b7423] text-[11px] font-black uppercase tracking-widest">
                            {items?.categories?.[0]?.name || "Premium"}
                          </p>

                          <Link
                            to={`/product/${items.id}`}
                            className="block text-lg sm:text-xl font-black hover:text-[#D6BA72] transition mt-1 line-clamp-2"
                          >
                            {items.name}
                          </Link>

                          <div className="flex flex-wrap gap-2 mt-2">
                            {items?.selectedColor && (
                              <span className="px-3 py-1 rounded-full bg-[#f7f5ef] text-xs font-bold text-black border border-black/10">
                                Color: {items.selectedColor}
                              </span>
                            )}

                            {items?.selectedSize && (
                              <span className="px-3 py-1 rounded-full bg-[#f7f5ef] text-xs font-bold text-black border border-black/10">
                                Size: {items.selectedSize}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="text-gray-400 line-through text-xs md:text-sm">
                          <Regular_price items={items} />
                        </span>

                        <span className="block text-base md:text-lg font-black text-black">
                          <PriceSale items={items} />
                        </span>
                      </div>

                      <div className="flex items-center w-fit rounded-full border border-black/15 overflow-hidden">
                        <ProductQuantity item={{ ...items, cartKey: itemKey }} />
                      </div>

                      <p className="font-black text-lg">
                        <PriceSale items={items} />
                      </p>

                      <button
                        type="button"
                        onClick={() => dispatch(removeItem(itemKey))}
                        className="w-11 h-11 rounded-full bg-[#f7f5ef] hover:bg-black hover:text-white transition flex items-center justify-center"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {cartadd.length > 0 && (
            <Apply_Coupon
              cartItems={cartadd}
              onCouponApplied={(data) => setCouponData(data)}
            />
          )}
        </div>

        <aside className="lg:sticky lg:top-28">
          <Order_Summary couponData={couponData} />
        </aside>
      </section>
    </main>
  );
};

export default Cart;