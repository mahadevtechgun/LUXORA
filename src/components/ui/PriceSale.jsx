import React from "react";

function PriceSale({ items }) {
  const currency = "₹";
  const price = items?.sale_price || items?.price || items?.prices?.price || 0;
  const finalPrice = items?.prices?.price ? Number(price) / 100 : Number(price);

  return (
    <>
      {currency}
      {finalPrice.toFixed(2)}
    </>
  );
}

export default PriceSale;