import { FiAward, FiShield, FiTruck, FiStar } from "react-icons/fi";

function About() {
  return (
    <main className="bg-[#f7f5ef] pt-36 pb-24 overflow-hidden">
      <section className="max-w-7xl mx-auto px-5">
        <div className="relative rounded-[50px] bg-black text-white overflow-hidden p-8 sm:p-12 lg:p-16">
          <div className="absolute -top-28 -right-28 w-96 h-96 bg-[#D6BA72]/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-[#D6BA72] font-black uppercase tracking-[0.35em] text-xs">
                About Luxe
              </span>

              <h1 className="text-5xl sm:text-7xl font-black leading-[0.95] mt-6">
                Luxury Made For Modern Living.
              </h1>

              <p className="text-white/60 text-lg leading-8 mt-8 max-w-xl">
                We bring premium products, elegant design, and a smooth shopping
                experience together for customers who value quality and style.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-[#D6BA72] rounded-[38px] rotate-3" />

              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
                alt="Luxury collection"
                className="relative w-full h-[460px] object-cover rounded-[36px] shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 mt-20 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <span className="text-[#8a6519] font-black uppercase tracking-widest text-xs">
            Our Story
          </span>

          <h2 className="text-4xl sm:text-5xl font-black mt-4">
            Built On Quality, Trust & Detail.
          </h2>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[36px] p-8 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
          <p className="text-neutral-600 leading-8">
            Our brand was created with a simple idea: premium shopping should
            feel personal, refined, and effortless. Every product is selected
            with attention to design, quality, comfort, and long-term value.
          </p>

          <p className="text-neutral-600 leading-8 mt-5">
            From product discovery to final delivery, we focus on creating an
            experience that feels elegant, reliable, and truly customer-first.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 mt-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Feature icon={<FiAward />} title="Premium Quality" text="Carefully selected luxury products." />
          <Feature icon={<FiShield />} title="Trusted Store" text="Safe, reliable and secure shopping." />
          <Feature icon={<FiTruck />} title="Fast Delivery" text="Smooth delivery experience." />
          <Feature icon={<FiStar />} title="Elegant Style" text="Modern collections with timeless appeal." />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 mt-20">
        <div className="rounded-[46px] bg-white p-8 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.08)] grid md:grid-cols-4 gap-8 text-center">
          <Stat number="10K+" label="Happy Customers" />
          <Stat number="500+" label="Premium Products" />
          <Stat number="50+" label="Luxury Brands" />
          <Stat number="24/7" label="Support" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 mt-20 text-center">
        <span className="text-[#8a6519] font-black uppercase tracking-widest text-xs">
          Our Promise
        </span>

        <h2 className="text-4xl sm:text-5xl font-black mt-4">
          We Don’t Just Sell Products, We Deliver Experience.
        </h2>

        <p className="mt-6 text-neutral-600 leading-8">
          Our promise is to provide premium products, honest service, secure
          shopping, and a luxury experience that keeps customers coming back.
        </p>
      </section>
    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="group bg-white rounded-[32px] p-7 shadow-md border border-black/5 hover:-translate-y-2 transition">
      <div className="h-14 w-14 rounded-2xl bg-black text-[#D6BA72] flex items-center justify-center text-2xl group-hover:bg-[#D6BA72] group-hover:text-black transition">
        {icon}
      </div>

      <h3 className="font-black text-xl mt-6">{title}</h3>
      <p className="text-neutral-500 mt-3 text-sm leading-6">{text}</p>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <h3 className="text-4xl sm:text-5xl font-black text-[#D6BA72]">
        {number}
      </h3>
      <p className="text-neutral-500 mt-2 font-semibold">{label}</p>
    </div>
  );
}

export default About;