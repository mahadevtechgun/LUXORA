import {
  FiPackage,
  FiHeart,
  FiShoppingCart,
  FiMapPin,
} from "react-icons/fi";

function DashboardOverview({
  userName = "Customer",
  orders = [],
  wishlistItems = [],
  cartItems = [],
  savedAddresses = [],
  setActive,
}) {
  const cards = [
    {
      title: "Orders",
      value: orders.length,
      icon: <FiPackage />,
      tab: "orders",
    },
    {
      title: "Cart",
      value: cartItems.length,
      icon: <FiShoppingCart />,
      tab: "cart",
    },
    {
      title: "Wishlist",
      value: wishlistItems.length,
      icon: <FiHeart />,
      tab: "wishlist",
    },
    {
      title: "Addresses",
      value: savedAddresses.length,
      icon: <FiMapPin />,
      tab: "address",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-black mb-3">Dashboard</h2>

      <p className="text-neutral-500 mb-6">
        Welcome back,{" "}
        <span className="font-black text-black">{userName}</span>.
        Manage your orders, cart, addresses, wishlist and account details.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => (
          <button
            key={card.title}
            onClick={() => setActive(card.tab)}
            className="bg-[#fbfaf7] rounded-2xl p-5 border border-black/5 text-left hover:-translate-y-1 hover:shadow-lg transition"
          >
            <div className="w-12 h-12 rounded-full bg-[#D6BA72]/30 text-[#9b7423] flex items-center justify-center text-xl">
              {card.icon}
            </div>

            <h3 className="text-neutral-500 text-sm mt-4">
              {card.title}
            </h3>

            <p className="text-3xl font-black mt-1">
              {card.value}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-8 bg-black text-white rounded-3xl p-6">
        <h3 className="text-2xl font-black">
          My Account
        </h3>

        <p className="text-white/70 mt-2 max-w-2xl">
          From your account dashboard you can view your recent orders,
          manage your shopping cart, edit checkout addresses,
          update your account details and view your wishlist.
        </p>
      </div>
    </div>
  );
}

export default DashboardOverview;