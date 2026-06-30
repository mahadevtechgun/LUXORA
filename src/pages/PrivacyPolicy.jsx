import React from "react";
import {
  FiLock,
  FiShield,
  FiDatabase,
  FiUserCheck,
  FiMail,
} from "react-icons/fi";

function PrivacyPolicy() {
  const sections = [
    {
      icon: <FiUserCheck />,
      title: "Information We Collect",
      text: "We collect your name, email address, phone number, billing address, shipping address and payment-related information when you place an order or create an account.",
    },
    {
      icon: <FiDatabase />,
      title: "How We Use Your Information",
      text: "Your information is used to process orders, deliver products, improve customer support, personalize your shopping experience and send important order updates.",
    },
    {
      icon: <FiShield />,
      title: "Data Protection",
      text: "We use industry-standard security measures to protect your personal information. Your data is securely stored and is never sold or shared without your consent.",
    },
    {
      icon: <FiLock />,
      title: "Cookies",
      text: "Our website uses cookies to improve website performance, remember your preferences and provide a better shopping experience.",
    },
    {
      icon: <FiMail />,
      title: "Marketing Emails",
      text: "You may receive promotional emails if you subscribe to our newsletter. You can unsubscribe at any time using the unsubscribe link provided in every email.",
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
            Privacy Policy
          </h1>

          <p className="text-white/60 max-w-3xl mx-auto mt-6 leading-8">
            Your privacy is important to us. This Privacy Policy explains how
            Luxora collects, uses, protects and manages your personal
            information when you use our website.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="space-y-8">
            {sections.map((item, index) => (
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

          <div className="mt-10 bg-black rounded-[2rem] text-white p-8">
            <h2 className="text-3xl font-black">
              Changes to This Privacy Policy
            </h2>

            <p className="text-white/60 mt-4 leading-8">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page. We encourage you to review this page
              periodically to stay informed about how we protect your
              information.
            </p>
          </div>

          <div className="mt-10 bg-white rounded-[2rem] p-8 border border-black/5 shadow-lg">
            <h2 className="text-3xl font-black">
              Contact Us
            </h2>

            <p className="text-neutral-600 mt-4 leading-8">
              If you have any questions regarding this Privacy Policy or how
              your information is handled, please contact us through our Contact
              Us page.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PrivacyPolicy;