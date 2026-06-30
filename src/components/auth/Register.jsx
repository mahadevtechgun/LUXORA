import { useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiUser,
  FiArrowRight,
} from "react-icons/fi";

import { registeruser } from "../../Api/PostApi";

export function Register() {
  const [show, setShow] = useState(false);

  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handalregister = async (e) => {
    e.preventDefault();

    if (!name || !mail || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const data = await registeruser(name, mail, password);

      console.log("Register Success:", data);

      // token save
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      alert("Register Successfully");

      // clear fields
      setName("");
      setMail("");
      setPassword("");

    } catch (error) {
      console.log(
        "Register Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message || "Register Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f5ef] px-4 pt-28 pb-10 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-[34px] p-7 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.10)] border border-black/5">

        {/* Header */}
        <div className="text-center mb-9">
          <div className="mx-auto mb-5 h-16 w-16 rounded-3xl bg-black text-white flex items-center justify-center shadow-lg">
            <FiUser size={28} />
          </div>

          <h1 className="text-4xl font-black text-black tracking-tight">
            Create Account
          </h1>

          <p className="text-neutral-500 mt-3 text-sm">
            Register to create your new account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handalregister} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm font-black text-black block mb-3">
              Full Name
            </label>

            <div className="relative">
              <FiUser
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full h-14 rounded-2xl border border-black/10 bg-[#fafafa] pl-14 pr-5 text-sm outline-none focus:border-[#D6BA72] focus:ring-4 focus:ring-[#D6BA72]/20"
              />
            </div>
          </div>

          {/* Email */}
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
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-14 rounded-2xl border border-black/10 bg-[#fafafa] pl-14 pr-5 text-sm outline-none focus:border-[#D6BA72] focus:ring-4 focus:ring-[#D6BA72]/20"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-black text-black block mb-3">
              Password
            </label>

            <div className="relative">
              <FiLock
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                className="w-full h-14 rounded-2xl border border-black/10 bg-[#fafafa] pl-14 pr-14 text-sm outline-none focus:border-[#D6BA72] focus:ring-4 focus:ring-[#D6BA72]/20"
              />

              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-500"
              >
                {show ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-black text-white font-black hover:bg-[#D6BA72] hover:text-black transition-all duration-300 flex items-center justify-center gap-3"
          >
            {loading ? "Creating..." : "Create Account"}

            {!loading && <FiArrowRight size={18} />}
          </button>
        </form>
      </div>
    </main>
  );
}