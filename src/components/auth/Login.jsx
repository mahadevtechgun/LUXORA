import React, { useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiArrowRight,
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../Api/PostApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/cartSlice";
import { setWishlist } from "../../redux/wishlistSlice";
import { getCartApi, getWishlistApi } from "../../Api/checkoutApi";

function Login() {
  const [show, setShow] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formLogin = async (e) => {
    e.preventDefault();

    if (!mail || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(mail, password);

      console.log("Login Response:", data);

      if (data?.token) {
        localStorage.setItem("token", data.token);

        const userId =
          data?.user_id ||
          data?.customer_id ||
          data?.id ||
          data?.ID ||
          data?.user?.id ||
          data?.user?.ID;

        if (userId) {
          localStorage.setItem("user_id", userId);
          localStorage.setItem("customer_id", userId);
        }

        const userEmail =
          data?.user_email ||
          data?.email ||
          data?.user?.email ||
          data?.user?.user_email;

        if (userEmail) {
          localStorage.setItem("user_email", userEmail);
        }

        const userName =
          data?.user_display_name ||
          data?.display_name ||
          data?.name ||
          data?.user?.name ||
          data?.user?.display_name;

        if (userName) {
          localStorage.setItem("user_name", userName);
        }

        try {
          const cartResponse = await getCartApi(data.token);

          if (cartResponse?.success) {
            dispatch(setCart(cartResponse.items || []));
          }

          const wishlistResponse = await getWishlistApi(data.token);

          if (wishlistResponse?.success) {
            dispatch(setWishlist(wishlistResponse.items || []));
          }
        } catch (syncError) {
          console.log("Cart/Wishlist Load Error:", syncError);
        }

        toast.success("Login Successful");

        const from = location.state?.from?.pathname || "/";
        navigate(from);
      } else {
        toast.error("Token not received");
      }
    } catch (error) {
      console.log("Login Error:", error.response?.data || error.message);

      const message = error.response?.data?.message || "";
      const cleanMessage = message.replace(/<[^>]*>/g, "");

      if (
        cleanMessage.includes("password you entered") ||
        cleanMessage.toLowerCase().includes("incorrect")
      ) {
        toast.error("Incorrect Password");
      } else if (
        cleanMessage.includes("Unknown email address") ||
        cleanMessage.includes("Invalid username") ||
        cleanMessage.toLowerCase().includes("invalid email")
      ) {
        toast.error("Email not registered");
      } else {
        toast.error(cleanMessage || "Invalid Email or Password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f5ef] px-4 pt-28 pb-10 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-[34px] p-7 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.10)] border border-black/5">
        <div className="text-center mb-9">
          <div className="mx-auto mb-5 h-16 w-16 rounded-3xl bg-black text-white flex items-center justify-center shadow-lg">
            <FiLock size={28} />
          </div>

          <h1 className="text-4xl font-black text-black tracking-tight">
            Welcome Back
          </h1>

          <p className="text-neutral-500 mt-3 text-sm">
            Login to continue your account.
          </p>
        </div>

        <form onSubmit={formLogin} className="space-y-5">
          <InputBox
            label="Email Address"
            icon={<FiMail size={20} />}
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Enter your email"
          />

          <div>
            <label className="text-sm font-black text-black block mb-3">
              Password
            </label>

            <div className="relative group">
              <FiLock
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-[#D6BA72] transition"
              />

              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-14 rounded-2xl border border-black/10 bg-[#fafafa] pl-14 pr-14 text-sm outline-none focus:border-[#D6BA72] focus:ring-4 focus:ring-[#D6BA72]/20 transition-all"
              />

              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black transition"
              >
                {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <div className="text-right -mt-2">
            <Link
              to="/forgot"
              className="text-sm font-bold text-black hover:text-[#D6BA72] transition"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-black text-white font-black hover:bg-[#D6BA72] hover:text-black transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Login Account"}
            {!loading && <FiArrowRight size={18} />}
          </button>
        </form>

        <Link
          to="/register"
          className="text-center block mt-7 text-sm font-bold text-black hover:text-[#D6BA72] transition"
        >
          Create New Account
        </Link>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  );
}

function InputBox({ label, icon, type, value, onChange, placeholder }) {
  return (
    <div>
      <label className="text-sm font-black text-black block mb-3">
        {label}
      </label>

      <div className="relative group">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-[#D6BA72] transition">
          {icon}
        </span>

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full h-14 rounded-2xl border border-black/10 bg-[#fafafa] pl-14 pr-5 text-sm outline-none focus:border-[#D6BA72] focus:ring-4 focus:ring-[#D6BA72]/20 transition-all"
        />
      </div>
    </div>
  );
}

export default Login;