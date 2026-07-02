import { FiAward, FiShield, FiTruck, FiStar } from "react-icons/fi";

function About() {
  return (
    <main className="bg-[#f7f5ef] pt-24 sm:pt-28 lg:pt-36 pb-14 sm:pb-20 lg:pb-24 overflow-hidden">
      <section className="max-w-7xl mx-auto px-4 sm:px-5">
        <div className="relative rounded-[28px] sm:rounded-[40px] lg:rounded-[50px] bg-black text-white overflow-hidden p-6 sm:p-10 lg:p-16">
          <div className="absolute -top-20 -right-20 sm:-top-28 sm:-right-28 w-64 h-64 sm:w-96 sm:h-96 bg-[#D6BA72]/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 sm:-bottom-28 sm:-left-28 w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <span className="text-[#D6BA72] font-black uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[10px] sm:text-xs">
                About Luxe
              </span>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] sm:leading-[0.95] mt-5 sm:mt-6">
                Luxury Made For Modern Living.
              </h1>

              <p className="text-white/60 text-sm sm:text-base lg:text-lg leading-7 lg:leading-8 mt-5 sm:mt-8 max-w-xl">
                We bring premium products, elegant design, and a smooth shopping
                experience together for customers who value quality and style.
              </p>
            </div>

            <div className="relative mt-4 lg:mt-0">
              <div className="absolute -inset-2 sm:-inset-4 bg-[#D6BA72] rounded-[26px] sm:rounded-[38px] rotate-3" />

              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
                alt="Luxury collection"
                className="relative w-full h-[280px] sm:h-[380px] lg:h-[460px] object-cover rounded-[24px] sm:rounded-[36px] shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-5 mt-14 sm:mt-20 grid lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-1">
          <span className="text-[#8a6519] font-black uppercase tracking-widest text-xs">
            Our Story
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 leading-tight">
            Built On Quality, Trust & Detail.
          </h2>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[26px] sm:rounded-[36px] p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
          <p className="text-neutral-600 text-sm sm:text-base leading-7 sm:leading-8">
            Our brand was created with a simple idea: premium shopping should
            feel personal, refined, and effortless. Every product is selected
            with attention to design, quality, comfort, and long-term value.
          </p>

          <p className="text-neutral-600 text-sm sm:text-base leading-7 sm:leading-8 mt-5">
            From product discovery to final delivery, we focus on creating an
            experience that feels elegant, reliable, and truly customer-first.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-5 mt-14 sm:mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Feature
            icon={<FiAward />}
            title="Premium Quality"
            text="Carefully selected luxury products."
          />
          <Feature
            icon={<FiShield />}
            title="Trusted Store"
            text="Safe, reliable and secure shopping."
          />
          <Feature
            icon={<FiTruck />}
            title="Fast Delivery"
            text="Smooth delivery experience."
          />
          <Feature
            icon={<FiStar />}
            title="Elegant Style"
            text="Modern collections with timeless appeal."
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-5 mt-14 sm:mt-20">
        <div className="rounded-[28px] sm:rounded-[46px] bg-white p-6 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.08)] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          <Stat number="10K+" label="Happy Customers" />
          <Stat number="500+" label="Premium Products" />
          <Stat number="50+" label="Luxury Brands" />
          <Stat number="24/7" label="Support" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-5 mt-14 sm:mt-20 text-center">
        <span className="text-[#8a6519] font-black uppercase tracking-widest text-xs">
          Our Promise
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 leading-tight">
          We Don’t Just Sell Products, We Deliver Experience.
        </h2>

        <p className="mt-5 sm:mt-6 text-neutral-600 text-sm sm:text-base leading-7 sm:leading-8">
          Our promise is to provide premium products, honest service, secure
          shopping, and a luxury experience that keeps customers coming back.
        </p>
      </section>
    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="group bg-white rounded-[26px] sm:rounded-[32px] p-6 sm:p-7 shadow-md border border-black/5 hover:-translate-y-2 transition">
      <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-black text-[#D6BA72] flex items-center justify-center text-xl sm:text-2xl group-hover:bg-[#D6BA72] group-hover:text-black transition">
        {icon}
      </div>

      <h3 className="font-black text-lg sm:text-xl mt-5 sm:mt-6">{title}</h3>
      <p className="text-neutral-500 mt-3 text-sm leading-6">{text}</p>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#D6BA72]">
        {number}
      </h3>
      <p className="text-neutral-500 mt-2 font-semibold text-xs sm:text-sm lg:text-base">
        {label}
      </p>
    </div>
  );
}

export default About;