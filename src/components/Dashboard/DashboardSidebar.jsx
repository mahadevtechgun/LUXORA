import {
  FiUser,
  FiPackage,
  FiMapPin,
  FiSettings,
  FiHeart,
  FiShoppingCart,
  FiLogOut,
} from "react-icons/fi";

function DashboardSidebar({
  active,
  setActive,
  userName,
  userEmail,
  logout,
}) {
  const menu = [
    {
      id: "overview",
      label: "Dashboard",
      icon: <FiUser size={20} />,
    },
    {
      id: "orders",
      label: "Orders",
      icon: <FiPackage size={20} />,
    },
    {
      id: "cart",
      label: "My Cart",
      icon: <FiShoppingCart size={20} />,
    },
    {
      id: "address",
      label: "Addresses",
      icon: <FiMapPin size={20} />,
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: <FiHeart size={20} />,
    },
    {
      id: "account",
      label: "Account Details",
      icon: <FiSettings size={20} />,
    },
  ];

  return (
    <aside className="bg-white rounded-[28px] shadow-lg border border-gray-200 p-6 h-fit sticky top-28">
      {/* User */}
      <div className="flex items-center gap-4 border-b pb-6">
        <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold uppercase">
          {userName?.charAt(0) || "U"}
        </div>

        <div className="overflow-hidden">
          <h3 className="font-bold text-lg truncate">
            {userName || "User"}
          </h3>

          <p className="text-sm text-gray-500 truncate">
            {userEmail || "user@email.com"}
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-6 flex flex-col gap-2">
        {menu.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300 font-semibold ${
              active === item.id
                ? "bg-black text-white"
                : "hover:bg-[#F6F3EC] text-gray-700"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={logout}
        className="mt-8 w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
      >
        <FiLogOut />
        Logout
      </button>
    </aside>
  );
}

export default DashboardSidebar;