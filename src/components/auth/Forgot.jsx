import { useState } from "react";
import { FiMail, FiArrowRight } from "react-icons/fi";

import { forgotPassword } from "../../Api/PostApi";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const data = await forgotPassword(email);

      console.log("Forgot Password Success:", data);

      alert(
        data?.message || "Password reset link sent to your email"
      );

      setEmail("");

    } catch (error) {
      console.log(
        "Forgot Password Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Failed to send reset link"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f5ef] px-4 pt-28 pb-10 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-[34px] p-7 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.10)] border border-black/5">

        <div className="text-center mb-9">
          <div className="mx-auto mb-5 h-16 w-16 rounded-3xl bg-black text-white flex items-center justify-center">
            <FiMail size={28} />
          </div>

          <h1 className="text-4xl font-black text-black tracking-tight">
            Forgot Password
          </h1>

          <p className="text-neutral-500 mt-3 text-sm">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <form
          onSubmit={handleForgotPassword}
          className="space-y-5"
        >
          <div>
            <label className="text-sm font-black text-black block mb-3">
              Email Address
            </label>

            <div className="relative">
              <FiMail
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-14 rounded-2xl border border-black/10 bg-[#fafafa] pl-14 pr-5 text-sm outline-none focus:border-[#D6BA72] focus:ring-4 focus:ring-[#D6BA72]/20"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-black text-white font-black hover:bg-[#D6BA72] hover:text-black transition-all duration-300 flex items-center justify-center gap-3"
          >
            {loading ? "Sending..." : "Send Reset Link"}

            {!loading && <FiArrowRight size={18} />}
          </button>
        </form>
      </div>
    </main>
  );
}