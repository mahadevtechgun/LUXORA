import { useEffect, useState } from "react";
import {
  getMyOrders,
  getAccountDetails,
  getUserAddresses,
} from "../Api/GetApi";

import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import DashboardOverview from "../components/Dashboard/DashboardOverview";
import OrdersSection from "../components/Dashboard/OrdersSection";
import AddressSection from "../components/Dashboard/AddressSection";
import AccountDetails from "../components/Dashboard/AccountDetails";
import WishlistSection from "../components/Dashboard/WishlistSection";
import CartSection from "../components/Dashboard/Cartsection";

import { useSelector } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";

function UserDashboard() {
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [orders, setOrders] = useState([]);
  const [orderLoader, setOrderLoader] = useState(true);

  const [editAccount, setEditAccount] = useState(false);
  const [accountSaving, setAccountSaving] = useState(false);

  const [account, setAccount] = useState({
    name: localStorage.getItem("user_name") || "Customer",
    email: localStorage.getItem("user_email") || "customer@gmail.com",
  });

  const wishlistItems = useSelector((state) => state.wishlist.items || []);
  const cartItems = useSelector((state) => state.cart.items || []);

  const [savedAddresses, setSavedAddresses] = useState(() =>
    JSON.parse(localStorage.getItem("checkout_addresses") || "[]")
  );

  const userName = account.name;
  const userEmail = account.email;

  useEffect(() => {
    const customerId =
      localStorage.getItem("customer_id") || localStorage.getItem("user_id");

    const email = localStorage.getItem("user_email");

    const fetchOrders = async () => {
      try {
        console.log("Customer ID:", customerId);
        console.log("User Email:", email);

        const data = await getMyOrders(customerId, email);

        console.log("Orders API Response:", data);

        const finalOrders = Array.isArray(data)
          ? data
          : Array.isArray(data?.orders)
          ? data.orders
          : Array.isArray(data?.data)
          ? data.data
          : [];

        setOrders(finalOrders);
      } catch (error) {
        console.log("Orders Error:", error);
        setOrders([]);
      } finally {
        setOrderLoader(false);
      }
    };

    if (customerId || email) {
      fetchOrders();
    } else {
      console.log("Customer ID and Email not found");
      setOrderLoader(false);
    }
  }, []);

  useEffect(() => {
    const userId =
      localStorage.getItem("customer_id") || localStorage.getItem("user_id");

    const fetchAccount = async () => {
      try {
        const data = await getAccountDetails(userId);

        setAccount({
          name:
            data.user?.name ||
            localStorage.getItem("user_name") ||
            "Customer",
          email:
            data.user?.email ||
            localStorage.getItem("user_email") ||
            "customer@gmail.com",
        });

        localStorage.setItem(
          "user_name",
          data.user?.name || localStorage.getItem("user_name") || "Customer"
        );

        localStorage.setItem(
          "user_email",
          data.user?.email ||
            localStorage.getItem("user_email") ||
            "customer@gmail.com"
        );
      } catch (error) {
        console.log("Account Details Error:", error);
      }
    };

    if (userId) {
      fetchAccount();
    }
  }, []);

  useEffect(() => {
    const userId =
      localStorage.getItem("customer_id") || localStorage.getItem("user_id");

    const fetchAddresses = async () => {
      try {
        const data = await getUserAddresses(userId);

        console.log("User Addresses Response:", data);

        const finalAddresses = Array.isArray(data)
          ? data
          : Array.isArray(data?.addresses)
          ? data.addresses
          : Array.isArray(data?.data)
          ? data.data
          : [];

        setSavedAddresses(finalAddresses);
        localStorage.setItem(
          "checkout_addresses",
          JSON.stringify(finalAddresses)
        );
      } catch (error) {
        console.log("Address Load Error:", error);
      }
    };

    if (userId) {
      fetchAddresses();
    }
  }, []);

  const handleTabChange = (tab) => {
    setActive(tab);
    setEditAccount(false);
    setSidebarOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("applied_coupon");
    localStorage.removeItem("customer_id");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");

    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-[#f7f5ef] pt-40 lg:pt-32 pb-14 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Fixed Mobile Dashboard Button */}
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-[92px] left-4 right-4 z-40 h-12 rounded-full bg-black text-white font-black flex items-center justify-center gap-3 shadow-2xl"
        >
          <FiMenu size={20} />
          Dashboard Menu
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5 lg:gap-8 items-start">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:sticky lg:top-28 z-10">
            <DashboardSidebar
              active={active}
              setActive={handleTabChange}
              userName={userName}
              userEmail={userEmail}
              logout={logout}
            />
          </aside>

          {/* Mobile Overlay */}
          <div
            onClick={() => setSidebarOpen(false)}
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[998] transition-all duration-300 lg:hidden ${
              sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          />

          {/* Mobile Slider Sidebar */}
          <aside
            className={`fixed top-0 left-0 h-screen w-[320px] max-w-[86vw] bg-[#f7f5ef] z-[999] shadow-2xl transition-transform duration-300 lg:hidden overflow-y-auto ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="sticky top-0 z-10 bg-[#f7f5ef] border-b border-black/10 px-5 py-4 flex items-center justify-between">
              <h2 className="text-xl font-black">Dashboard</h2>

              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="p-4">
              <DashboardSidebar
                active={active}
                setActive={handleTabChange}
                userName={userName}
                userEmail={userEmail}
                logout={logout}
              />
            </div>
          </aside>

          {/* Content */}
          <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 shadow-xl border border-black/5 min-w-0">
            {active === "overview" && (
              <DashboardOverview
                userName={userName}
                orders={orders}
                wishlistItems={wishlistItems}
                cartItems={cartItems}
                savedAddresses={savedAddresses}
                setActive={setActive}
              />
            )}

            {active === "orders" && (
              <OrdersSection
                orders={orders}
                loader={orderLoader}
                setOrders={setOrders}
              />
            )}

            {active === "cart" && <CartSection />}

            {active === "address" && (
              <AddressSection
                savedAddresses={savedAddresses}
                setSavedAddresses={setSavedAddresses}
              />
            )}

            {active === "account" && (
              <AccountDetails
                account={account}
                setAccount={setAccount}
                editAccount={editAccount}
                setEditAccount={setEditAccount}
                accountSaving={accountSaving}
                setAccountSaving={setAccountSaving}
              />
            )}

            {active === "wishlist" && <WishlistSection items={wishlistItems} />}
          </section>
        </div>
      </div>
    </main>
  );
}

export default UserDashboard;