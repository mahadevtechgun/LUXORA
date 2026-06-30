import { useEffect, useState } from "react";
import { FiStar } from "react-icons/fi";
import { getProductReviewsApi } from "../../Api/checkoutApi";

function ReviewList({ product, refreshKey }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!product?.id) return;

      try {
        setLoading(true);

        const data = await getProductReviewsApi(product.id);

        if (data?.success) {
          setReviews(data.reviews || []);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [product?.id, refreshKey]);

  if (loading) {
    return (
      <div className="mt-6 text-center">
        Loading reviews...
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="mt-6 text-center text-neutral-500">
        No reviews yet.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white border border-black/10 rounded-2xl p-5"
        >
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold">
                {review.name}
              </h4>

              <p className="text-xs text-neutral-500">
                {review.date}
              </p>
            </div>

            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  className={
                    star <= Number(review.rating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
          </div>

          <p className="mt-3 text-neutral-700">
            {review.review}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;