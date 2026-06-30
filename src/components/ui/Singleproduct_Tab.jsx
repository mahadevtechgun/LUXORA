import React, { useState } from "react";
import Description from "./Description";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import {
  FiTruck,
  FiClock,
  FiRefreshCw,
  FiThumbsUp,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Singleproduct_Tab({ product }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const [tabbar, setTabbar] = useState("description");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRefresh, setReviewRefresh] = useState(0);

  return (
    <section className="mt-16 sm:mt-20 bg-white rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 lg:p-12 shadow-xl border border-black/5">
      <div className="flex flex-wrap gap-3 sm:gap-6 border-b border-black/10 pb-4 sm:pb-5">
        {["description", "specifications", "reviews", "shipping"].map(
          (tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setTabbar(tab);
                if (tab !== "reviews") setShowReviewForm(false);
              }}
              className={`font-black text-sm sm:text-base capitalize transition-all duration-300 pb-2 sm:pb-3 ${
                tabbar === tab
                  ? "text-[#9b7423] border-b-2 border-[#9b7423]"
                  : "text-neutral-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {tabbar === "description" && (
        <div className="tab-content mt-6 sm:mt-8">
          <h2 className="text-2xl sm:text-3xl font-black mb-4 text-gray-800">
            Product Story
          </h2>

          <div className="text-neutral-600 leading-7 sm:leading-8 text-sm sm:text-base">
            <Description product={product} />
          </div>
        </div>
      )}

      {tabbar === "specifications" && (
        <div className="tab-content mt-6 sm:mt-8">
          {product?.attributes?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {product.attributes.map((items, index) => (
                <div
                  key={index}
                  className="bg-[#fbfaf7] rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:shadow-md transition-shadow"
                >
                  <h4 className="font-black text-sm sm:text-base text-gray-800">
                    {items?.name}
                  </h4>

                  <p className="text-neutral-500 text-xs sm:text-sm mt-1.5">
                    {items?.terms?.map((term) => term?.name).join(", ") ||
                      "N/A"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">No specifications available.</p>
          )}
        </div>
      )}

      {tabbar === "reviews" && (
        <div className="tab-content mt-6 sm:mt-8">
          <div className="bg-[#fbfaf7] rounded-xl sm:rounded-2xl p-5 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 pb-5 sm:pb-6 border-b border-black/10">
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-black text-[#9b7423]">
                  {product?.average_rating || 0}
                  <span className="text-base sm:text-lg text-gray-400">
                    /5
                  </span>
                </div>

                <div className="text-[#D6BA72] text-base sm:text-lg mt-1">
                  {"★".repeat(Math.round(Number(product?.average_rating || 0)))}
                  {"☆".repeat(
                    5 - Math.round(Number(product?.average_rating || 0))
                  )}
                </div>

                <p className="text-neutral-500 text-xs sm:text-sm mt-1">
                  Based on {product?.review_count || 0} reviews
                </p>
              </div>

              <div className="flex-1">
                <p className="text-neutral-600 leading-6 sm:leading-7 text-sm sm:text-base">
                  {product?.short_description
                    ? product.short_description.replace(/<[^>]*>/g, "")
                    : "Share your experience and help other customers choose better."}
                </p>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  if (!isLoggedIn) {
                    toast.error("Please login to write a review");
                    navigate("/login");
                    return;
                  }

                  setShowReviewForm((prev) => !prev);
                }}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-black text-white rounded-full text-sm sm:text-base font-bold hover:bg-[#D6BA72] hover:text-black transition inline-flex items-center gap-2"
              >
                <FiThumbsUp size={16} />
                {showReviewForm ? "Close Review" : "Write a Review"}
              </button>
            </div>

            {showReviewForm && (
              <ReviewForm
                product={product}
                onClose={() => setShowReviewForm(false)}
                onSuccess={() => setReviewRefresh((prev) => prev + 1)}
              />
            )}

            <ReviewList product={product} refreshKey={reviewRefresh} />
          </div>
        </div>
      )}

      {tabbar === "shipping" && (
        <div className="tab-content mt-6 sm:mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-[#fbfaf7] rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D6BA72]/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <FiTruck className="text-xl sm:text-2xl text-[#9b7423]" />
              </div>

              <h4 className="font-black text-base sm:text-lg mb-1">
                Free Shipping
              </h4>

              <p className="text-neutral-500 text-xs sm:text-sm">
                On orders above $100
              </p>
            </div>

            <div className="bg-[#fbfaf7] rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D6BA72]/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <FiClock className="text-xl sm:text-2xl text-[#9b7423]" />
              </div>

              <h4 className="font-black text-base sm:text-lg mb-1">
                Delivery Time
              </h4>

              <p className="text-neutral-500 text-xs sm:text-sm">
                {product?.is_in_stock ? "3-5 business days" : "Not available"}
              </p>
            </div>

            <div className="bg-[#fbfaf7] rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D6BA72]/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <FiRefreshCw className="text-xl sm:text-2xl text-[#9b7423]" />
              </div>

              <h4 className="font-black text-base sm:text-lg mb-1">
                Easy Returns
              </h4>

              <p className="text-neutral-500 text-xs sm:text-sm">
                7-day return policy
              </p>
            </div>
          </div>

          <div
            className={`mt-5 sm:mt-6 p-4 sm:p-5 rounded-xl sm:rounded-2xl ${
              product?.is_in_stock
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <p
              className={`text-sm sm:text-base font-semibold ${
                product?.is_in_stock ? "text-green-700" : "text-red-700"
              }`}
            >
              {product?.is_in_stock
                ? "✓ In Stock - Ready to ship"
                : "✗ Out of Stock - Not available for shipping"}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Singleproduct_Tab;