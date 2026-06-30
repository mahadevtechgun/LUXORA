export const OffProduct = ({ items }) => {
  const discount = Math.round(
    ((Number(items?.prices?.regular_price) -
      Number(items?.prices?.price)) /
      Number(items?.prices?.regular_price)) *
      100
  );

  return discount > 0 ? `${discount}% OFF` : null;
};