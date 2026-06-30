import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../redux/wishlistSlice";
import { saveWishlistApi } from "../../api/checkoutApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function WishlistProductButton({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const wishlistItems = useSelector((state) => state.wishlist.items || []);

  const isWishlisted =
    isLoggedIn &&
    product &&
    wishlistItems.some((item) => item.id === product.id);

  const handleWishlist = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to add wishlist");
      navigate("/login");
      return;
    }

    if (!product) {
      toast.error("Product not found");
      return;
    }

    let updatedWishlist = [];

    if (isWishlisted) {
      updatedWishlist = wishlistItems.filter(
        (item) => item.id !== product.id
      );
    } else {
      updatedWishlist = [...wishlistItems, product];
    }

    dispatch(toggleWishlist(product));

    try {
      await saveWishlistApi(updatedWishlist, token);

      toast.success(
        isWishlisted
          ? "Product removed from wishlist"
          : "Product added to wishlist"
      );
    } catch (error) {
      console.log(error);
      toast.error("Wishlist saved locally, but backend sync failed");
    }
  };

  return (
    <button
      type="button"
      onClick={handleWishlist}
      className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md"
    >
      <FaHeart
        size={18}
        className={isWishlisted ? "text-red-500" : "text-gray-400"}
      />
    </button>
  );
}

export default WishlistProductButton;