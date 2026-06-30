import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import EmptyState from "./EmptyState";

function CompareSection({ items = [] }) {
  if (!items || items.length === 0) {
    return (
      <EmptyState
        title="No Compare Products"
        text="Compare me products add karne ke baad yaha show honge."
        icon={<FiShoppingBag />}
      />
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-6">Compare Products</h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border border-black/10 rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-[#fbfaf7]">
              <th className="p-4 text-left font-black">Feature</th>

              {items.map((item) => (
                <th
                  key={item.id}
                  className="p-4 text-center font-black min-w-[220px]"
                >
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Image */}
            <tr>
              <td className="p-4 font-black">Image</td>

              {items.map((item) => {
                const image =
                  item?.images?.[0]?.src ||
                  item?.image?.src ||
                  item?.image ||
                  "https://via.placeholder.com/200";

                return (
                  <td key={item.id} className="p-4 text-center">
                    <img
                      src={image}
                      alt={item.name}
                      className="w-28 h-28 object-cover rounded-xl mx-auto"
                    />
                  </td>
                );
              })}
            </tr>

            {/* Price */}
            <tr className="bg-[#fbfaf7]">
              <td className="p-4 font-black">Price</td>

              {items.map((item) => (
                <td
                  key={item.id}
                  className="p-4 text-center font-bold"
                >
                  ₹{item.price || item.regular_price || 0}
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr>
              <td className="p-4 font-black">Rating</td>

              {items.map((item) => (
                <td key={item.id} className="p-4 text-center">
                  ⭐ {item.average_rating || 0}
                </td>
              ))}
            </tr>

            {/* Stock */}
            <tr className="bg-[#fbfaf7]">
              <td className="p-4 font-black">Stock</td>

              {items.map((item) => (
                <td key={item.id} className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      item.stock_status === "instock"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.stock_status || "N/A"}
                  </span>
                </td>
              ))}
            </tr>

            {/* SKU */}
            <tr>
              <td className="p-4 font-black">SKU</td>

              {items.map((item) => (
                <td key={item.id} className="p-4 text-center">
                  {item.sku || "-"}
                </td>
              ))}
            </tr>

            {/* Button */}
            <tr className="bg-[#fbfaf7]">
              <td className="p-4 font-black">Action</td>

              {items.map((item) => (
                <td key={item.id} className="p-4 text-center">
                  <Link
                    to={`/product/${item.id}`}
                    className="inline-block px-6 py-3 rounded-xl bg-black text-white font-black hover:bg-[#9b7423] transition"
                  >
                    View Product
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompareSection;