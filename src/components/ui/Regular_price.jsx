import React from "react";

function Regular_price({ items }) {
  const currency = "₹";

  const regularPrice =
    items?.regular_price || items?.prices?.regular_price || items?.price || 0;

  const finalPrice = items?.prices?.regular_price
    ? Number(regularPrice) / 100
    : Number(regularPrice);

  return (
    <>
      {currency}
      {finalPrice.toFixed(2)}
    </>
  );
}

export default Regular_price;