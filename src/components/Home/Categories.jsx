import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { getCategories } from "../../Api/GetApi";
import { Link } from "react-router-dom";

function Categories() {
  const [categ, setCateg] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories();
        setCateg(Array.isArray(data) ? data.slice(0, 5) : []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-24 bg-[#fbfaf7]">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
          <span className="inline-block px-5 py-2 rounded-full bg-[#D6BA72]/20 text-[#8a6519] font-black mb-4">
            Curated Selections
          </span>

          <h2 className="text-4xl lg:text-6xl font-black tracking-tight">
            Shop By Lifestyle
          </h2>
        </div>

        {categ.length > 0 ? (
          <div className="grid lg:grid-cols-4 gap-6">
            {categ.map((item, index) => (
              <div
                key={item._id || index}
                className={`relative overflow-hidden group rounded-[2rem] ${
                  index === 0
                    ? "lg:col-span-2 lg:row-span-2 h-[520px]"
                    : "h-[250px]"
                }`}
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  src={item.image}
                  alt={item.name}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute bottom-8 left-8 text-white">
                  <h3
                    className={`font-black ${
                      index === 0 ? "text-4xl" : "text-2xl"
                    }`}
                  >
                    {item.name}
                  </h3>
<Link to="/shop">
                  <span className="inline-flex items-center gap-2 mt-4 font-bold border-b border-white">
                    Shop now
                    <FiArrowRight size={18} />
                  </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No Categories Available
          </p>
        )}
      </div>
    </section>
  );
}

export default Categories;