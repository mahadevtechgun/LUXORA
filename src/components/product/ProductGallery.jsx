import React, { useEffect, useState } from "react";

function ProductGallery({ product, selectedColor }) {
  const images = product?.images || [];

  const [selectedImage, setSelectedImage] = useState("");

  // Product load first image 
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0].src);
    }
  }, [product]);

  // Color change on image change
  useEffect(() => {
    if (!selectedColor || images.length === 0) return;

    const colors =
      product?.attributes?.find(
        (attr) => attr.name === "Color"
      )?.terms || [];

    const colorIndex = colors.findIndex(
      (item) => item.name === selectedColor
    );

    if (colorIndex !== -1 && images[colorIndex]) {
      setSelectedImage(images[colorIndex].src);
    }
  }, [selectedColor, product, images]);

  return (
    <div>
      <div className="grid sm:grid-cols-[90px_1fr] gap-4 lg:gap-6">

        {/* THUMBNAILS */}
        <div className="flex sm:flex-col gap-3 order-2 sm:order-1 overflow-auto sm:overflow-visible">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img.src)}
              className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                selectedImage === img.src
                  ? "border-black scale-105"
                  : "border-black/10 hover:border-black/30"
              }`}
            >
              <img
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover"
                src={img.src}
                alt={img.alt || "product"}
              />
            </button>
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div className="relative order-1 sm:order-2 rounded-[2rem] overflow-hidden bg-white shadow-lg border border-black/5">
          <img
            className="w-full h-[320px] sm:h-[500px] lg:h-[620px] object-cover hover:scale-105 transition duration-700"
            src={selectedImage || images?.[0]?.src}
            alt={product?.name}
          />

          <span className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-full text-xs sm:text-sm font-black shadow-lg">
            Featured
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductGallery;