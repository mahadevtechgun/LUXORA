import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addcart } from "../../redux/cartSlice";
import { saveCartApi } from "../../Api/checkoutApi";
import { toast } from "react-toastify";

function AddtoCartButton({
  product,
  selectedColor,
  selectedSize,
  selectedVariation,
  variationId,
  cartKey,
  disabled,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const cartItems = useSelector((state) => state.cart.items || []);

  const finalVariationId =
    variationId || selectedVariation?.id || product?.variation_id || 0;

  const finalCartKey =
    cartKey ||
    `${product?.id}-${finalVariationId}-${selectedColor || ""}-${selectedSize || ""}`;

  const iscartadd =
    isLoggedIn &&
    product &&
    cartItems.some((item) => item.cartKey === finalCartKey);

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

    if (disabled) {
      toast.error("Please select valid color and size");
      return;
    }

    const newProduct = {
      ...product,
      parent_id: product.parent_id || product.id,
      product_id: product.product_id || product.id,
      variation_id: finalVariationId,
      selectedColor: selectedColor || "",
      selectedSize: selectedSize || "",
      cartKey: finalCartKey,
      quantity: 1,
    };

    const updatedCart = iscartadd
      ? cartItems.map((item) =>
          item.cartKey === finalCartKey
            ? { ...item, quantity: Number(item.quantity || 1) + 1 }
            : item
        )
      : [...cartItems, newProduct];

    dispatch(addcart(newProduct));

    try {
      await saveCartApi(updatedCart, token);
      toast.success(iscartadd ? "Cart quantity updated" : "Product added to cart");
    } catch (error) {
      console.log(error);
      toast.error("Cart saved locally, but backend sync failed");
    }
  };

  return (
    <button
      type="button"
      onClick={handelcard}
      disabled={disabled}
      className={`
        w-full py-3 rounded-xl font-bold text-sm sm:text-base 
        transition-all duration-300 ease-in-out transform
        hover:scale-[1.02] active:scale-95
        ${
          disabled
            ? "bg-gray-400 text-white cursor-not-allowed opacity-75"
            : iscartadd
            ? "bg-green-500 text-white hover:bg-[#D6BA72] hover:text-black"
            : "bg-black text-white hover:bg-[#D6BA72] hover:text-black hover:shadow-lg"
        }
      `}
    >
      <span className="flex items-center justify-center gap-2">
        {iscartadd ? "Add More" : "Add to Cart"}
      </span>
    </button>
  );
}

export default AddtoCartButton;