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

function UserDashboard() {
  const [active, setActive] = useState("overview");

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
    <main className="min-h-screen bg-[#f7f5ef] pt-28 pb-14 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          <DashboardSidebar
            active={active}
            setActive={(tab) => {
              setActive(tab);
              setEditAccount(false);
            }}
            userName={userName}
            userEmail={userEmail}
            logout={logout}
          />

          <section className="bg-white rounded-[2rem] p-5 sm:p-8 shadow-xl border border-black/5">
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