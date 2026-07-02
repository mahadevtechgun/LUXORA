import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Order_Summary_checkout from "../components/ui/Order_Summary_checkout";
import Order_Success from "../components/ui/Order_Success";
import {
  getCountries,
  getStates,
  getShippingRates,
  placeOrderApi,
  getUserAddresses,
  saveUserAddresses,
} from "../Api/checkoutApi";

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items || []);

  const freeShipping = {
    id: "free_shipping",
    label: "Free Shipping",
    cost: 0,
  };

  const emptyForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postal: "",
    country: "IN",
    payment: "cod",
  };

  const [form, setForm] = useState(emptyForm);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const [shippingRates, setShippingRates] = useState([freeShipping]);
  const [selectedShipping, setSelectedShipping] = useState(freeShipping);
  const [shippingLoading, setShippingLoading] = useState(false);

  const [couponData, setCouponData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const inputStyle =
    "w-full px-5 py-4 rounded-2xl border border-black/10 bg-[#fafafa] outline-none focus:border-[#D6BA72] focus:ring-4 focus:ring-[#D6BA72]/20 transition";

  useEffect(() => {
    const loadCoupon = () => {
      const savedCoupon = JSON.parse(
        localStorage.getItem("applied_coupon") || "null"
      );

      if (savedCoupon?.code && Number(savedCoupon?.discount || 0) > 0) {
        setCouponData(savedCoupon);
      } else {
        setCouponData(null);
      }
    };

    loadCoupon();
    window.addEventListener("couponUpdated", loadCoupon);

    return () => {
      window.removeEventListener("couponUpdated", loadCoupon);
    };
  }, []);

  useEffect(() => {
    const loadAddresses = async () => {
      const userId =
        localStorage.getItem("customer_id") || localStorage.getItem("user_id");

      if (!userId) {
        const localSaved = JSON.parse(
          localStorage.getItem("checkout_addresses") || "[]"
        );

        setAddresses(localSaved);

        if (localSaved.length > 0) {
          setSelectedAddressId(localSaved[0].id);
          setForm({ ...emptyForm, ...localSaved[0] });
          setShowForm(false);
        }

        return;
      }

      try {
        const data = await getUserAddresses(userId);
        const saved = data?.addresses || [];

        setAddresses(saved);
        localStorage.setItem("checkout_addresses", JSON.stringify(saved));

        if (saved.length > 0) {
          setSelectedAddressId(saved[0].id);
          setForm({ ...emptyForm, ...saved[0] });
          setShowForm(false);
        }
      } catch (error) {
        console.log("Address Load Error:", error);
      }
    };

    loadAddresses();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
        setCountries([]);
        toast.error("Unable to load countries");
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!form.country) return;

    const fetchStates = async () => {
      try {
        const data = await getStates(form.country);

        let finalStates = [];

        if (Array.isArray(data)) {
          finalStates = data;
        } else if (data && typeof data === "object") {
          finalStates = Object.entries(data).map(([code, name]) => ({
            code,
            name,
          }));
        }

        setStates(finalStates);
      } catch (error) {
        console.log(error);
        setStates([]);
        toast.error("Unable to load states");
      }
    };

    fetchStates();
  }, [form.country]);

  useEffect(() => {
    const fetchShippingRates = async () => {
      if (!form.country || cartItems.length === 0) {
        setShippingRates([freeShipping]);
        setSelectedShipping(freeShipping);
        return;
      }

      try {
        setShippingLoading(true);

        const payload = {
          country: form.country || "IN",
          state: form.state || "",
          city: form.city || "",
          postcode: form.postal || "",
          items: cartItems.map((item) => ({
            product_id: item.parent_id || item.product_id || item.id,
            variation_id: item.variation_id || 0,
            quantity: Number(item.quantity || 1),
          })),
        };

        console.log("Shipping Payload:", payload);

        const data = await getShippingRates(payload);

        console.log("Shipping Response:", data);

        const rates = data?.rates || [];

        if (rates.length > 0) {
          setShippingRates(rates);
          setSelectedShipping(rates[0]);
        } else {
          setShippingRates([freeShipping]);
          setSelectedShipping(freeShipping);
        }
      } catch (error) {
        console.log("Shipping Error:", error);
        setShippingRates([freeShipping]);
        setSelectedShipping(freeShipping);
      } finally {
        setShippingLoading(false);
      }
    };

    fetchShippingRates();
  }, [form.country, form.state, form.city, form.postal, cartItems]);

  const saveAddressesToLocal = async (newAddresses) => {
    setAddresses(newAddresses);
    localStorage.setItem("checkout_addresses", JSON.stringify(newAddresses));

    const userId =
      localStorage.getItem("customer_id") || localStorage.getItem("user_id");

    if (!userId) {
      console.log("User ID not found. Address saved only in localStorage.");
      return;
    }

    try {
      await saveUserAddresses(userId, newAddresses);
    } catch (error) {
      console.log("Address Save Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" ? { state: "" } : {}),
    }));
  };

  const validateAddress = () => {
    return (
      form.firstName &&
      form.lastName &&
      form.email &&
      form.phone &&
      form.address &&
      form.city &&
      form.state &&
      form.postal &&
      form.country
    );
  };

  const isSameAddress = (a, b) => {
    return (
      a.firstName === b.firstName &&
      a.lastName === b.lastName &&
      a.email === b.email &&
      a.phone === b.phone &&
      a.address === b.address &&
      a.city === b.city &&
      a.state === b.state &&
      a.postal === b.postal &&
      a.country === b.country
    );
  };

  const saveAddress = async () => {
    if (!validateAddress()) {
      toast.error("Please complete all required fields");
      return false;
    }

    let newAddresses = [...addresses];

    if (editingId) {
      const duplicate = addresses.find(
        (addr) => addr.id !== editingId && isSameAddress(addr, form)
      );

      if (duplicate) {
        toast.error("This address already exists");
        setSelectedAddressId(duplicate.id);
        setForm({ ...emptyForm, ...duplicate });
        setEditingId(null);
        setShowForm(false);
        return true;
      }

      newAddresses = addresses.map((addr) =>
        addr.id === editingId ? { ...form, id: editingId } : addr
      );

      setSelectedAddressId(editingId);
      setEditingId(null);
    } else {
      const duplicate = addresses.find((addr) => isSameAddress(addr, form));

      if (duplicate) {
        toast.error("This address already exists");
        setSelectedAddressId(duplicate.id);
        setForm({ ...emptyForm, ...duplicate });
        setShowForm(false);
        return true;
      }

      const newAddress = {
        ...form,
        id: Date.now(),
      };

      newAddresses = [newAddress, ...addresses];
      setSelectedAddressId(newAddress.id);
    }

    await saveAddressesToLocal(newAddresses);
    setShowForm(false);
    toast.success("Address saved successfully");
    return true;
  };

  const addNewAddress = () => {
    setForm(emptyForm);
    setEditingId(null);
    setSelectedAddressId(null);
    setShowForm(true);
  };

  const editAddress = (addr) => {
    setForm({ ...emptyForm, ...addr });
    setEditingId(addr.id);
    setSelectedAddressId(addr.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectAddress = (addr) => {
    setForm({ ...emptyForm, ...addr });
    setSelectedAddressId(addr.id);
  };

  const deleteAddress = async (id) => {
    const newAddresses = addresses.filter((addr) => addr.id !== id);

    await saveAddressesToLocal(newAddresses);

    if (selectedAddressId === id) {
      if (newAddresses.length > 0) {
        setSelectedAddressId(newAddresses[0].id);
        setForm({ ...emptyForm, ...newAddresses[0] });
      } else {
        setSelectedAddressId(null);
        setForm(emptyForm);
        setShowForm(true);
      }
    }

    toast.success("Address deleted successfully");
  };

  const placeOrder = async () => {
    if (!validateAddress()) {
      toast.error("Please select or complete address");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const finalShipping = selectedShipping || freeShipping;
    const toastId = toast.loading("Placing order...");

    try {
      setLoading(true);

      const latestCoupon = JSON.parse(
        localStorage.getItem("applied_coupon") || "null"
      );

      const payload = {
        payment_method: form.payment,
        shipping_method: finalShipping.id,
        shipping_title: finalShipping.label,
        shipping_total: Number(finalShipping.cost || 0),
        coupon_code: latestCoupon?.code || "",

        billing: {
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          address_1: form.address,
          city: form.city,
          state: form.state,
          postcode: form.postal,
          country: form.country,
        },

        shipping: {
          first_name: form.firstName,
          last_name: form.lastName,
          address_1: form.address,
          city: form.city,
          state: form.state,
          postcode: form.postal,
          country: form.country,
        },

        items: cartItems.map((item) => ({
          product_id: item.parent_id || item.product_id || item.id,
          variation_id: item.variation_id || 0,
          quantity: Number(item.quantity || 1),
        })),
      };

      const data = await placeOrderApi(payload);

      if (!data?.success) {
        toast.error(data?.message || "Unable to place order", { id: toastId });
        return;
      }

      toast.success("Order placed successfully", { id: toastId });

      localStorage.removeItem("applied_coupon");
      window.dispatchEvent(new Event("couponUpdated"));

      setOrderId(data.order_id);
      setShowSuccess(true);
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Network error. Please try again",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1920"
          className="absolute inset-0 w-full h-full object-cover scale-110"
          alt="Checkout"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 h-full flex items-center pt-20">
          <div className="max-w-2xl text-white">
            <span className="text-[#D6BA72] font-black uppercase tracking-[0.25em] text-sm">
              Secure Checkout
            </span>

            <h1 className="text-5xl lg:text-7xl font-black mt-5 tracking-tight">
              Complete Your Order
            </h1>

            <p className="text-white/70 mt-6 text-lg leading-8">
              Select your saved address, choose shipping method and place your
              order securely.
            </p>
          </div>
        </div>
      </section>

      <main className="bg-[#f7f5ef]">
        <div className="max-w-7xl mx-auto px-5 py-16 grid lg:grid-cols-[1fr_420px] gap-10">
          <section className="space-y-8">
            {addresses.length > 0 && (
              <div className="bg-white rounded-[40px] p-7 lg:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.08)] border border-black/5">
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div>
                    <span className="text-[#9b7423] font-black uppercase tracking-widest text-xs">
                      Step 01
                    </span>
                    <h2 className="text-3xl font-black mt-2">
                      Saved Addresses
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={addNewAddress}
                    className="px-5 py-3 rounded-full bg-black text-white font-black hover:bg-[#D6BA72] hover:text-black transition"
                  >
                    + Add New
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => selectAddress(addr)}
                      className={`p-6 rounded-[30px] border cursor-pointer transition-all ${
                        selectedAddressId === addr.id
                          ? "border-2 border-[#D6BA72] bg-gradient-to-br from-[#fff8e8] to-white shadow-[0_20px_50px_rgba(214,186,114,0.25)]"
                          : "border-black/10 bg-[#fafafa] hover:border-[#D6BA72]"
                      }`}
                    >
                      <div className="flex justify-between gap-3">
                        <h3 className="font-black text-lg">
                          {addr.firstName} {addr.lastName}
                        </h3>

                        {selectedAddressId === addr.id && (
                          <span className="h-fit text-[10px] font-black text-black bg-[#D6BA72] px-3 py-1 rounded-full">
                            SELECTED
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-neutral-600 mt-3 leading-6">
                        {addr.address}, {addr.city}, {addr.state},{" "}
                        {addr.postal}
                      </p>

                      <p className="text-sm text-neutral-600">{addr.country}</p>
                      <p className="text-sm text-neutral-600">{addr.phone}</p>

                      <div className="flex gap-3 mt-5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            editAddress(addr);
                          }}
                          className="px-4 py-2 rounded-full bg-black text-white font-bold text-sm"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteAddress(addr.id);
                          }}
                          className="px-4 py-2 rounded-full border border-black/20 font-bold text-sm hover:bg-black hover:text-white transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showForm && (
              <div className="bg-white rounded-[40px] p-7 lg:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.08)] border border-black/5">
                <div className="flex justify-between items-center mb-8 gap-4">
                  <div>
                    <span className="text-[#9b7423] font-black uppercase tracking-widest text-xs">
                      Address Details
                    </span>

                    <h2 className="text-3xl font-black mt-2">
                      {editingId ? "Edit Address" : "Add Address"}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={saveAddress}
                    className="px-5 py-3 rounded-full bg-black text-white font-black hover:bg-[#D6BA72] hover:text-black transition"
                  >
                    {editingId ? "Update Address" : "Save Address"}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name *" className={inputStyle} />
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name *" className={inputStyle} />
                  <input name="email" value={form.email} onChange={handleChange} placeholder="Email *" type="email" className={inputStyle} />
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone *" className={inputStyle} />
                  <input name="address" value={form.address} onChange={handleChange} placeholder="Street Address *" className={`md:col-span-2 ${inputStyle}`} />
                  <input name="city" value={form.city} onChange={handleChange} placeholder="City *" className={inputStyle} />
                  <input name="postal" value={form.postal} onChange={handleChange} placeholder="Postal Code *" className={inputStyle} />

                  <select name="country" value={form.country} onChange={handleChange} className={inputStyle}>
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>

                  <select name="state" value={form.state} onChange={handleChange} className={inputStyle}>
                    <option value="">Select State</option>
                    {states.map((state, index) => (
                      <option key={state.code || index} value={state.code || state.name}>
                        {state.name || state.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="bg-white rounded-[40px] p-7 lg:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.08)] border border-black/5">
              <span className="text-[#9b7423] font-black uppercase tracking-widest text-xs">
                Step 02
              </span>

              <h2 className="text-3xl font-black mt-2 mb-6">
                Shipping Method
              </h2>

              {shippingLoading && (
                <p className="text-neutral-500 font-bold mb-4">
                  Loading shipping...
                </p>
              )}

              <div className="space-y-4">
                {shippingRates.map((rate) => (
                  <label
                    key={rate.id}
                    className={`flex items-center justify-between p-5 rounded-[30px] border-2 cursor-pointer transition ${
                      selectedShipping?.id === rate.id
                        ? "border-[#D6BA72] bg-gradient-to-r from-[#fff7e5] to-white shadow-lg"
                        : "border-black/10 bg-[#fafafa] hover:border-[#D6BA72]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="shipping"
                        checked={selectedShipping?.id === rate.id}
                        onChange={() => setSelectedShipping(rate)}
                      />

                      <div>
                        <h4 className="font-black">{rate.label}</h4>
                        <p className="text-neutral-500 text-sm">
                          Delivery charge
                        </p>
                      </div>
                    </div>

                    <strong>₹{Number(rate.cost || 0).toFixed(2)}</strong>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-7 lg:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.08)] border border-black/5">
              <span className="text-[#9b7423] font-black uppercase tracking-widest text-xs">
                Step 03
              </span>

              <h2 className="text-3xl font-black mt-2 mb-6">
                Payment Method
              </h2>

              <label
                className={`rounded-[32px] p-6 cursor-pointer border-2 transition-all duration-300 block ${
                  form.payment === "cod"
                    ? "border-[#D6BA72] bg-[#fff7e5]"
                    : "border-black/10 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={form.payment === "cod"}
                  onChange={handleChange}
                  className="hidden"
                />

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-black text-[#D6BA72] flex items-center justify-center text-2xl">
                    ₹
                  </div>

                  <div>
                    <h4 className="font-black uppercase">Cash On Delivery</h4>

                    <p className="text-sm text-neutral-500 mt-1">
                      Pay when your order arrives.
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </section>

          <aside>
            <Order_Summary_checkout
              onPlaceOrder={placeOrder}
              loading={loading}
              shipping={Number(selectedShipping?.cost || 0)}
              couponData={couponData}
            />
          </aside>
        </div>
      </main>

      {showSuccess && (
        <Order_Success orderId={orderId} onClose={() => setShowSuccess(false)} />
      )}
    </>
  );
}

export default Checkout;