import { FiHeart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function WishlistButton({ setSidebar }) {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const wishlistItems = useSelector((state) => state.wishlist.items || []);

  const count = isLoggedIn ? wishlistItems.length : 0;

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setSidebar(true);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative w-11 h-11 rounded-full border border-black/5 bg-white flex items-center justify-center"
    >
      <FiHeart size={18} />

      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D6BA72] text-black text-[10px] flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
    </button>
  );
}

export default WishlistButton;