import React from "react";
import { FiStar } from "react-icons/fi";

function Marquee() {
  return (
    <div>
      <section className="bg-black text-white py-5 overflow-hidden">
        <div className="marquee-track whitespace-nowrap font-black text-xl tracking-wide flex items-center gap-6">
          <span className="flex items-center gap-2">
            NIKE
            <FiStar size={16} />
          </span>

          <span className="flex items-center gap-2">
            APPLE
            <FiStar size={16} />
          </span>

          <span className="flex items-center gap-2">
            SONY
            <FiStar size={16} />
          </span>

          <span className="flex items-center gap-2">
            ADIDAS
            <FiStar size={16} />
          </span>

          <span className="flex items-center gap-2">
            ZARA
            <FiStar size={16} />
          </span>

          <span className="flex items-center gap-2">
            SAMSUNG
            <FiStar size={16} />
          </span>

          <span className="flex items-center gap-2">
            LUXORA
            <FiStar size={16} />
          </span>

          <span className="flex items-center gap-2">
            GUCCI
            <FiStar size={16} />
          </span>

          <span className="flex items-center gap-2">
            PRADA
            <FiStar size={16} />
          </span>

          <span className="flex items-center gap-2">
            PREMIUM STORE
            <FiStar size={16} />
          </span>
        </div>
      </section>
    </div>
  );
}

export default Marquee;