import { useState } from "react";
import {
  FiStar,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiMail,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { submitReviewApi } from "../../Api/checkoutApi";

function ReviewForm({ product, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product?.id) {
      toast.error("Product not found");
      return;
    }

    if (!name.trim() || !email.trim() || !review.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        product_id: product.id,
        name: name.trim(),
        email: email.trim(),
        rating,
        review: review.trim(),
      };

      const data = await submitReviewApi(payload);

      if (!data?.success) {
        toast.error(data?.message || "Review submit failed");
        return;
      }

      toast.success("Review submitted successfully");

      setName("");
      setEmail("");
      setReview("");
      setRating(5);

      if (onSuccess) {
        onSuccess();
      }

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Review submit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 bg-white rounded-[2rem] p-5 sm:p-8 border border-black/10 shadow-lg">
      <div className="mb-6">
        <span className="text-[#9b7423] font-black text-sm">
          ✦ Customer Review ✦
        </span>

        <h3 className="text-2xl sm:text-3xl font-black mt-2 text-black">
          Write Your Review
        </h3>

        <p className="text-neutral-500 text-sm mt-2">
          Share your experience with this product.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-black mb-2 block">Your Name</label>

          <div className="relative">
            <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400" />

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              disabled={loading}
              className="w-full h-14 rounded-2xl border border-black/10 bg-[#fbfaf7] pl-12 pr-5 outline-none focus:border-[#D6BA72] focus:ring-4 focus:ring-[#D6BA72]/20 transition disabled:opacity-60"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-black mb-2 block">Your Email</label>

          <div className="relative">
            <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400" />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
              className="w-full h-14 rounded-2xl border border-black/10 bg-[#fbfaf7] pl-12 pr-5 outline-none focus:border-[#D6BA72] focus:ring-4 focus:ring-[#D6BA72]/20 transition disabled:opacity-60"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-black mb-2 block">Rating</label>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                disabled={loading}
                onClick={() => setRating(star)}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition disabled:opacity-60 ${
                  rating >= star
                    ? "bg-[#D6BA72] text-black"
                    : "bg-[#fbfaf7] text-neutral-400"
                }`}
              >
                <FiStar />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-black mb-2 block">Your Review</label>

          <div className="relative">
            <FiMessageSquare className="absolute left-5 top-5 text-neutral-400" />

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              rows={5}
              disabled={loading}
              className="w-full rounded-2xl border border-black/10 bg-[#fbfaf7] pl-12 pr-5 py-4 outline-none resize-none focus:border-[#D6BA72] focus:ring-4 focus:ring-[#D6BA72]/20 transition disabled:opacity-60"
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 h-14 rounded-full bg-black text-white font-black hover:bg-[#D6BA72] hover:text-black transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Review"}
            {!loading && <FiSend />}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="sm:w-40 h-14 rounded-full border border-black/10 font-black hover:bg-black hover:text-white transition disabled:opacity-60"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;