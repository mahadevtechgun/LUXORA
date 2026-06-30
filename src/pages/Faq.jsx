import React from "react";
import {
  FiHelpCircle,
  FiTruck,
  FiCreditCard,
  FiRefreshCw,
  FiShield,
  FiMail,
} from "react-icons/fi";

function Faq() {
  const faqs = [
    {
      icon: <FiTruck />,
      question: "How long does delivery take?",
      answer:
        "Most orders are delivered within 3–5 business days. Delivery time may vary depending on your location and product availability.",
    },
    {
      icon: <FiCreditCard />,
      question: "What payment methods are available?",
      answer:
        "Currently, Cash on Delivery is available. More payment options like card, UPI and wallet payments can be added later.",
    },
    {
      icon: <FiRefreshCw />,
      question: "Can I cancel my order?",
      answer:
        "Yes, you can cancel your order while it is in pending or processing status. Once shipped, cancellation may not be available.",
    },
    {
      icon: <FiShield />,
      question: "Are my details safe?",
      answer:
        "Yes, your personal details are kept secure and are used only for order processing, delivery and customer support.",
    },
    {
      icon: <FiHelpCircle />,
      question: "How can I track my order?",
      answer:
        "After placing an order, you can check your order status from your account dashboard under the My Orders section.",
    },
    {
      icon: <FiMail />,
      question: "How can I contact support?",
      answer:
        "You can contact our support team through the Contact Us page for order help, product queries and delivery support.",
    },
  ];

  return (
    <main className="bg-[#f7f5ef] min-h-screen">
      <section className="relative bg-black text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D6BA72]/40 blur-[130px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 blur-[130px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-5 text-center">
          <span className="text-[#D6BA72] font-black uppercase tracking-[0.25em] text-sm">
            Help Center
          </span>

          <h1 className="text-5xl lg:text-7xl font-black mt-5">
            Frequently Asked Questions
          </h1>

          <p className="text-white/60 max-w-2xl mx-auto mt-6 leading-8">
            Find quick answers about orders, shipping, payments, returns and
            account support.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[2rem] p-7 border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.10)] transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#D6BA72]/20 text-[#9b7423] flex items-center justify-center text-2xl mb-6">
                  {item.icon}
                </div>

                <h3 className="text-xl font-black text-black">
                  {item.question}
                </h3>

                <p className="text-neutral-500 leading-7 mt-4 text-sm">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-black text-white rounded-[2rem] p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-black">Still need help?</h2>
              <p className="text-white/60 mt-3">
                Contact our support team and we will help you as soon as
                possible.
              </p>
            </div>

            <a
              href="/contact"
              className="px-8 py-4 rounded-full bg-[#D6BA72] text-black font-black hover:bg-white transition"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Faq;