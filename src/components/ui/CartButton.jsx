import { FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function CartButton() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const cartItems = useSelector(
    (state) => state.cart.items || []
  );

  const count = isLoggedIn ? cartItems.length : 0;

  const handleClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <div>
      <Link
        to={isLoggedIn ? "/cart" : "#"}
        onClick={handleClick}
      >
        <button
          className="relative w-11 h-11 rounded-full border border-black/5 bg-black text-white flex items-center justify-center hover:bg-[#D6BA72] hover:text-black transition"
        >
          <FiShoppingBag size={18} />

          {count > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-black text-[10px] font-black flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </Link>
    </div>
  );
}

export default CartButton;