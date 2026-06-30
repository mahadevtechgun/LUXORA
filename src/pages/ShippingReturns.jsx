import React from "react";
import {
  FiTruck,
  FiClock,
  FiPackage,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

function ShippingReturns() {
  const policies = [
    {
      icon: <FiTruck />,
      title: "Shipping Time",
      text: "Most orders are delivered within 3–5 business days. Delivery time may vary depending on your location, product availability and courier service.",
    },
    {
      icon: <FiClock />,
      title: "Order Processing",
      text: "Orders are usually processed within 24–48 hours after confirmation. Orders placed on holidays or weekends may take extra time.",
    },
    {
      icon: <FiPackage />,
      title: "Shipping Charges",
      text: "Shipping charges are calculated at checkout. Free shipping may be available on selected products or promotional offers.",
    },
    {
      icon: <FiRefreshCw />,
      title: "Return Window",
      text: "Returns can be requested within 7 days of delivery. Items must be unused, undamaged and in original packaging.",
    },
    {
      icon: <FiCheckCircle />,
      title: "Return Approval",
      text: "After your return request is reviewed and approved, our support team will guide you through the return process.",
    },
    {
      icon: <FiAlertCircle />,
      title: "Non-Returnable Items",
      text: "Used, damaged, washed or altered products may not be eligible for return. Final sale or clearance items may also be non-returnable.",
    },
  ];

  return (
    <main className="bg-[#f7f5ef] min-h-screen">
      <section className="relative bg-black text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D6BA72]/40 blur-[140px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 blur-[140px] rounded-full" />

        <div className="relative max-w-6xl mx-auto px-5 text-center">
          <span className="text-[#D6BA72] uppercase tracking-[0.25em] font-black text-sm">
            Support
          </span>

          <h1 className="text-5xl lg:text-7xl font-black mt-5">
            Shipping & Returns
          </h1>

          <p className="text-white/60 max-w-3xl mx-auto mt-6 leading-8">
            Learn about our delivery process, shipping timelines, return
            eligibility and how to request a return.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-8">
            {policies.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[2rem] p-8 border border-black/5 shadow-lg hover:-translate-y-1 hover:shadow-xl transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#D6BA72]/20 text-[#9b7423] flex items-center justify-center text-2xl">
                  {item.icon}
                </div>

                <h2 className="text-2xl font-black mt-6">{item.title}</h2>

                <p className="text-neutral-600 leading-8 mt-4">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-black text-white rounded-[2rem] p-8 lg:p-10">
            <h2 className="text-3xl font-black">Need Return Support?</h2>

            <p className="text-white/60 mt-4 leading-8 max-w-3xl">
              If your order is eligible for return, please contact our support
              team with your order ID, product details and reason for return.
              We will review your request and guide you with the next steps.
            </p>

            <a
              href="/contact"
              className="inline-block mt-6 px-8 py-4 rounded-full bg-[#D6BA72] text-black font-black hover:bg-white transition"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ShippingReturns;