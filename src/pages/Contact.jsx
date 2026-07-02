import { useState } from "react";
import { FiMail, FiPhone, FiSend, FiArrowUpRight } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { sendContactMessage } from "../Api/PostApi";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name.trim()) return toast.error("Please enter your name");
    if (!form.email.trim()) return toast.error("Please enter your email");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return toast.error("Please enter valid email");
    }

    if (!form.subject.trim()) return toast.error("Please enter subject");
    if (!form.message.trim()) return toast.error("Please enter message");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm() !== true) return;

    try {
      setLoading(true);

      const data = await sendContactMessage(form);

      toast.success(data?.message || "Message sent successfully");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Message sending failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f5ef] pt-24 sm:pt-28 lg:pt-36 pb-14 sm:pb-20 lg:pb-24 overflow-hidden">
      <section className="max-w-7xl mx-auto px-4 sm:px-5">
        <div className="relative rounded-[28px] sm:rounded-[40px] lg:rounded-[48px] bg-black text-white overflow-hidden p-6 sm:p-10 lg:p-16">
          <div className="absolute -top-20 -right-20 sm:-top-32 sm:-right-32 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-[#D6BA72]/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 sm:-bottom-32 sm:-left-32 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-[#D6BA72] font-black uppercase tracking-[0.22em] sm:tracking-[0.35em] text-[10px] sm:text-xs">
                Luxe Support
                <FiArrowUpRight />
              </span>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] sm:leading-[0.95] mt-5 sm:mt-6">
                Talk To Our Luxury Desk.
              </h1>

              <p className="text-white/60 text-sm sm:text-base lg:text-lg leading-7 lg:leading-8 mt-5 sm:mt-8 max-w-xl">
                Need help with products, orders, delivery, or custom support?
                Send your message and we’ll reach you directly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 sm:mt-12">
                <MiniCard title="Phone" text="+91 72175 11751" />
                <MiniCard title="Email" text="ashishrajput1751@gmail.com" />
                <MiniCard title="Location" text="Delhi, India" />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative bg-[#f7f5ef] text-black rounded-[26px] sm:rounded-[36px] p-5 sm:p-8 shadow-[0_35px_100px_rgba(0,0,0,0.35)]"
            >
              <div className="absolute -top-4 sm:-top-5 right-5 sm:right-8 bg-[#D6BA72] text-black px-4 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest">
                Message Us
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-4 mt-4">
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                />

                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                />
              </div>

              <Input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                placeholder="Write your message..."
                className="w-full mt-4 p-4 sm:p-5 rounded-[22px] sm:rounded-3xl bg-white border border-black/10 outline-none focus:border-[#D6BA72] focus:ring-4 focus:ring-[#D6BA72]/20 resize-none text-sm sm:text-base"
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full h-13 sm:h-14 py-4 rounded-full bg-black text-white font-black hover:bg-[#D6BA72] hover:text-black transition flex items-center justify-center gap-3 disabled:opacity-70 text-sm sm:text-base"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <FiSend size={18} />}
              </button>

              <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:+917217511751"
                  className="rounded-2xl bg-white p-4 border border-black/10 hover:border-[#D6BA72] transition flex gap-3 items-center justify-center sm:justify-start"
                >
                  <FiPhone className="text-[#8a6519]" />
                  <span className="text-sm font-bold">Call Now</span>
                </a>

                <a
                  href="mailto:ashishrajput1751@gmail.com"
                  className="rounded-2xl bg-white p-4 border border-black/10 hover:border-[#D6BA72] transition flex gap-3 items-center justify-center sm:justify-start"
                >
                  <FiMail className="text-[#8a6519]" />
                  <span className="text-sm font-bold">Mail Now</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>

      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  );
}

function Input({ name, type = "text", value, onChange, placeholder }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full mt-4 h-13 sm:h-14 py-4 px-4 sm:px-5 rounded-full bg-white border border-black/10 outline-none focus:border-[#D6BA72] focus:ring-4 focus:ring-[#D6BA72]/20 text-sm sm:text-base"
    />
  );
}

function MiniCard({ title, text }) {
  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white/10 border border-white/10 p-4 sm:p-5 backdrop-blur">
      <p className="text-[#D6BA72] text-[10px] sm:text-xs font-black uppercase tracking-widest">
        {title}
      </p>
      <p className="text-white font-bold mt-2 sm:mt-3 text-sm break-words">
        {text}
      </p>
    </div>
  );
}

export default Contact;