import React from "react";
import {
  FiFileText,
  FiShoppingBag,
  FiTruck,
  FiRefreshCw,
  FiCreditCard,
  FiShield,
} from "react-icons/fi";

function TermsConditions() {
  const terms = [
    {
      icon: <FiShoppingBag />,
      title: "Orders",
      text: "All orders placed on our website are subject to product availability and order confirmation. We reserve the right to refuse or cancel any order if necessary.",
    },
    {
      icon: <FiCreditCard />,
      title: "Payments",
      text: "Orders must be paid using the available payment methods at checkout. Cash on Delivery may be available for selected locations.",
    },
    {
      icon: <FiTruck />,
      title: "Shipping & Delivery",
      text: "Estimated delivery times are provided for convenience only. Delivery dates may vary depending on your location, courier services and unforeseen circumstances.",
    },
    {
      icon: <FiRefreshCw />,
      title: "Returns & Refunds",
      text: "Products may be returned or exchanged according to our Return Policy. Returned items must be unused, in original condition and with original packaging where applicable.",
    },
    {
      icon: <FiShield />,
      title: "User Responsibilities",
      text: "Customers are responsible for providing accurate billing and shipping information. Incorrect details may result in delayed or failed deliveries.",
    },
    {
      icon: <FiFileText />,
      title: "Policy Updates",
      text: "We reserve the right to modify these Terms & Conditions at any time. Changes become effective immediately after they are published on this page.",
    },
  ];

  return (
    <main className="bg-[#f7f5ef] min-h-screen">
      {/* Hero */}
      <section className="relative bg-black text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D6BA72]/40 blur-[140px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 blur-[140px] rounded-full" />

        <div className="relative max-w-6xl mx-auto px-5 text-center">
          <span className="text-[#D6BA72] uppercase tracking-[0.25em] font-black text-sm">
            Legal
          </span>

          <h1 className="text-5xl lg:text-7xl font-black mt-5">
            Terms & Conditions
          </h1>

          <p className="text-white/60 max-w-3xl mx-auto mt-6 leading-8">
            Please read these Terms & Conditions carefully before using our
            website or placing an order. By using our services, you agree to
            these terms.
          </p>
        </div>
      </section>

      {/* Terms Cards */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="space-y-8">
            {terms.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[2rem] p-8 border border-black/5 shadow-lg"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#D6BA72]/20 text-[#9b7423] flex items-center justify-center text-2xl">
                  {item.icon}
                </div>

                <h2 className="text-2xl font-black mt-6">
                  {item.title}
                </h2>

                <p className="text-neutral-600 leading-8 mt-4">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Agreement */}
          <div className="mt-10 bg-black text-white rounded-[2rem] p-8">
            <h2 className="text-3xl font-black">
              Acceptance of Terms
            </h2>

            <p className="text-white/60 mt-4 leading-8">
              By accessing or using our website, you acknowledge that you have
              read, understood and agreed to these Terms & Conditions. If you
              do not agree with any part of these terms, please discontinue the
              use of our website.
            </p>
          </div>

          {/* Contact */}
          <div className="mt-10 bg-white rounded-[2rem] p-8 border border-black/5 shadow-lg">
            <h2 className="text-3xl font-black">
              Contact Information
            </h2>

            <p className="text-neutral-600 mt-4 leading-8">
              If you have any questions regarding these Terms & Conditions,
              please contact our support team through the Contact Us page. We
              will be happy to assist you.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TermsConditions;