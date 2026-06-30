import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addcart } from "../../redux/cartSlice";
import { saveCartApi } from "../../Api/checkoutApi";
import { toast } from "react-toastify";

function AddtoCartButton({ product, selectedColor }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const cartItems = useSelector((state) => state.cart.items || []);

  const iscartadd =
    isLoggedIn &&
    product &&
    cartItems.some((item) => item.id === product.id);

  const handelcard = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to add product");
      navigate("/login");
      return;
    }

    if (!product) {
      toast.error("Product not found");
      return;
    }

    if (iscartadd) return;

    const newProduct = {
      ...product,
      quantity: 1,
      selectedColor,
    };

    const updatedCart = [...cartItems, newProduct];

    dispatch(addcart(newProduct));

    try {
      await saveCartApi(updatedCart, token);
      toast.success("Product added to cart");
    } catch (error) {
      console.log(error);
      toast.error("Cart saved locally, but backend sync failed");
    }
  };

  return (
    <button
      type="button"
      onClick={handelcard}
      disabled={iscartadd}
      className={`
        w-full py-3 rounded-xl font-bold text-sm sm:text-base 
        transition-all duration-300 ease-in-out transform
        hover:scale-[1.02] active:scale-95
        ${
          iscartadd
            ? "bg-green-500 text-white cursor-not-allowed opacity-75"
            : "bg-black text-white hover:bg-[#D6BA72] hover:text-black hover:shadow-lg"
        }
      `}
    >
      <span className="flex items-center justify-center gap-2">
        {iscartadd ? "Added to Cart" : "Add to Cart"}
      </span>
    </button>
  );
}

export default AddtoCartButton;