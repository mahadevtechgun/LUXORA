import React from "react";

function Description({ product }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: product?.description || "",
      }}
    />
  );
}

export default Description;