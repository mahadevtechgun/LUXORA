import React, { useState } from "react";
import CartButton from "../ui/CartButton";
import WishlistButton from "../ui/WishlistBitton";
import WishlistSidebar from "../ui/WishlistSidebar";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser } from "react-icons/fi";

function Header() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/collection", label: "Collection" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    ...(isLoggedIn ? [{ path: "/dashboard", label: "Dashboard" }] : []),
  ];

  const handleLogin = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("applied_coupon");

      setSidebar(false);
      setMenuOpen(false);

      navigate("/");
      window.location.reload();
    } else {
      setMenuOpen(false);
      navigate("/login");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="relative overflow-hidden border-b border-white/10 bg-white/80 backdrop-blur-2xl shadow-[0_10px_50px_rgba(0,0,0,0.08)]">
          <div className="absolute -top-20 right-0 w-72 h-72 bg-[#D6BA72]/20 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-20 left-20 w-60 h-60 bg-black/5 blur-[90px] rounded-full"></div>

          <div className="relative z-10 h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
            <div className="flex items-center gap-14">
              <NavLink
                to="/"
                className="text-3xl sm:text-4xl font-black tracking-[-0.08em]"
              >
                LUX<span className="text-[#D6BA72]">ORA</span>
              </NavLink>

              <nav className="hidden lg:flex items-center gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-5 py-3 rounded-full text-[13px] uppercase font-black tracking-[0.14em] transition-all duration-300 ${
                        isActive
                          ? "bg-black text-white shadow-lg"
                          : "text-black/70 hover:bg-black/5"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <WishlistButton setSidebar={setSidebar} />
              <CartButton />

              <button
                type="button"
                onClick={handleLogin}
                className="hidden md:flex items-center gap-3 h-11 px-5 rounded-full bg-[#D6BA72] text-black font-black hover:bg-black hover:text-white transition shadow-[0_8px_25px_rgba(214,186,114,0.35)]"
              >
                <FiUser size={17} />
                {isLoggedIn ? "Logout" : "Login"}
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="lg:hidden w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shadow-lg"
              >
                <FiMenu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <WishlistSidebar sidebar={sidebar} setSidebar={setSidebar} />

      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[998] transition-all duration-300 lg:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      <div
        className={`fixed top-0 right-0 h-screen w-[320px] bg-white z-[999] transition-all duration-500 shadow-2xl lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative overflow-hidden h-24 border-b border-black/10 flex items-center justify-between px-5">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D6BA72]/20 blur-[70px] rounded-full"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-[-0.06em]">
              LUX<span className="text-[#D6BA72]">ORA</span>
            </h2>

            <p className="text-xs uppercase tracking-[0.25em] font-bold text-neutral-400 mt-1">
              Premium Menu
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="relative z-10 w-11 h-11 rounded-full bg-black text-white flex items-center justify-center"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-5 py-4 rounded-2xl font-black transition-all duration-300 ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-neutral-50 text-black hover:bg-[#D6BA72]/20"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <button
            type="button"
            onClick={handleLogin}
            className="w-full py-4 rounded-full bg-[#D6BA72] text-black font-black flex items-center justify-center gap-3 hover:bg-black hover:text-white transition"
          >
            <FiUser size={18} />
            {isLoggedIn ? "Logout" : "Login / Account"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;