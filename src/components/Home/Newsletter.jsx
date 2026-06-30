import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { newsletterSubscribe } from "../../Api/PostApi";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const data = await newsletterSubscribe(email);

      toast.success(data?.message || "Subscribed successfully");
      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Subscription failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-[#f0ede8]">
      <div className="max-w-5xl mx-auto px-5 text-center">
        <span className="text-[#8a6519] font-black uppercase">
          Join Luxe Circle
        </span>

        <h3 className="text-3xl sm:text-5xl font-black mt-2">
          Receive Early Access
        </h3>

        <form
          onSubmit={handleSubscribe}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 px-6 py-4 rounded-full border border-black/20 bg-white outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-full bg-black text-white font-black hover:bg-[#D6BA72] hover:text-black transition inline-flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? "Subscribing..." : "Subscribe"}
            {!loading && <FiSend size={18} />}
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}

export default Newsletter;