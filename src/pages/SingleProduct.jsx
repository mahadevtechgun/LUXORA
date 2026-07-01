import React, { useEffect, useMemo, useState } from "react";
import RelatedProducts from "../components/product/RelatedProducts";
import ProductGallery from "../components/product/ProductGallery";
import { getVariation } from "../Api/GetApi";
import { Link, useParams } from "react-router-dom";
import Singleproduct_Tab from "../components/ui/Singleproduct_Tab";
import ProductQuantity from "../components/ui/ProductQuantity";
import ProductName from "../components/ui/Product_name";
import Short_description from "../components/ui/Short_description";
import Regular_price from "../../src/components/ui/Regular_price";
import PriceSale from "../components/ui/PriceSale";
import AddtoCartButton from "../components/ui/AddtoCartButton";
import { OffProduct } from "../components/ui/OffProduct";
import { FiChevronRight, FiTruck, FiLock, FiRefreshCw } from "react-icons/fi";

function SingleProduct() {
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const { id } = useParams();

  const clean = (value) =>
    String(value || "")
      .toLowerCase()
      .replace("attribute_", "")
      .replace("pa_", "")
      .replace(/-/g, " ")
      .replace(/_/g, " ")
      .trim();

  const normalizeAttr = (value) =>
    clean(value).replace("select ", "").replace("choose ", "").trim();

  const getItemValue = (item) =>
    item?.name || item?.option || item?.value || "";

  const isAttrMatch = (attr, targetName) => {
    const target = normalizeAttr(targetName);
    const name = normalizeAttr(attr?.name);
    const slug = normalizeAttr(attr?.slug);
    const key = normalizeAttr(attr?.key);

    return (
      name === target ||
      slug === target ||
      key === target ||
      name.includes(target) ||
      slug.includes(target) ||
      key.includes(target)
    );
  };

  const getAttrValue = (variation, targetName) => {
    if (!variation) return "";

    const attrs = variation.attributes || {};

    if (Array.isArray(attrs)) {
      const found = attrs.find((attr) => isAttrMatch(attr, targetName));
      return found?.option || found?.value || found?.name || "";
    }

    if (typeof attrs === "object") {
      const target = normalizeAttr(targetName);

      const foundKey = Object.keys(attrs).find((key) => {
        const normalKey = normalizeAttr(key);
        return normalKey === target || normalKey.includes(target);
      });

      return foundKey ? attrs[foundKey] : "";
    }

    return "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getVariation();

        setAllProducts(products);

        const singleProduct = products.find(
          (item) => Number(item.id) === Number(id)
        );

        setProduct(singleProduct);

        const productColors =
          singleProduct?.attributes?.find((attr) =>
            normalizeAttr(attr.name).includes("color")
          )?.terms || [];

        const productSizes =
          singleProduct?.attributes?.find((attr) =>
            normalizeAttr(attr.name).includes("size")
          )?.terms || [];

        setSelectedColor(getItemValue(productColors[0]));
        setSelectedSize(getItemValue(productSizes[0]));
      } catch (error) {
        console.log("Single Product Error:", error);
      }
    };

    fetchData();
  }, [id]);

  const colors =
    product?.attributes?.find((attr) =>
      normalizeAttr(attr.name).includes("color")
    )?.terms || [];

  const sizes =
    product?.attributes?.find((attr) =>
      normalizeAttr(attr.name).includes("size")
    )?.terms || [];

  const variations =
    product?.variations ||
    product?.available_variations ||
    product?.variation ||
    [];

  const selectedVariation = useMemo(() => {
    if (!product || !Array.isArray(variations) || variations.length === 0) {
      return null;
    }

    return variations.find((variation) => {
      const variationColor = getAttrValue(variation, "color");
      const variationSize = getAttrValue(variation, "size");

      const colorMatch =
        selectedColor && variationColor
          ? clean(variationColor) === clean(selectedColor)
          : true;

      const sizeMatch =
        selectedSize && variationSize
          ? clean(variationSize) === clean(selectedSize)
          : true;

      return colorMatch && sizeMatch;
    });
  }, [product, variations, selectedColor, selectedSize]);

  const displayProduct = selectedVariation
    ? {
        ...product,
        ...selectedVariation,
        id: product?.id,
        parent_id: product?.id,
        variation_id: selectedVariation?.id,
        name: product?.name,
        attributes: product?.attributes,
        images:
          selectedVariation?.images?.length > 0
            ? selectedVariation.images
            : selectedVariation?.image
            ? [selectedVariation.image]
            : product?.images,
      }
    : product;

  const discountText = OffProduct({ items: displayProduct });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbfaf7] to-[#f7f5f0]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="flex flex-wrap items-center gap-1 text-xs sm:text-sm font-medium text-neutral-500 mb-6 sm:mb-8">
          <Link to="/" className="hover:text-[#9b7423] transition-colors">
            Home
          </Link>

          <FiChevronRight size={12} />

          <Link to="/shop" className="hover:text-[#9b7423] transition-colors">
            Shop
          </Link>

          <FiChevronRight size={12} />

          <span className="text-black font-bold truncate max-w-[200px] sm:max-w-none">
            <ProductName items={product} />
          </span>
        </div>

        <section className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-14 items-start">
          <ProductGallery product={displayProduct} selectedColor={selectedColor} />

          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-tight">
              <ProductName items={product} />
            </h1>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="text-[#D6BA72] text-base sm:text-lg flex">
                {"★".repeat(Math.round(product?.average_rating || 0))}
                {"☆".repeat(5 - Math.round(product?.average_rating || 0))}
              </div>

              <p className="text-neutral-500 font-semibold text-xs sm:text-sm">
                {product?.average_rating} Rating · {product?.review_count} Reviews
              </p>
            </div>

            <div className="text-sm sm:text-base leading-relaxed text-neutral-600">
              <Short_description items={product} />
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <h2 className="text-3xl sm:text-4xl font-black text-[#9b7423]">
                <PriceSale items={displayProduct} />
              </h2>

              <span className="text-base sm:text-lg line-through text-neutral-400">
                <Regular_price items={displayProduct} />
              </span>

              {discountText && (
                <span className="px-3 py-1 rounded-full bg-black text-white text-xs sm:text-sm font-black">
                  Save {discountText}
                </span>
              )}
            </div>

            <div className="pt-2">
              <span
                className={`inline-flex items-center gap-2 font-bold px-3 py-1 rounded-full text-xs sm:text-sm ${
                  displayProduct?.is_in_stock
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    displayProduct?.is_in_stock ? "bg-green-700" : "bg-red-700"
                  }`}
                ></span>
                {displayProduct?.is_in_stock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {colors.length > 0 && (
              <div className="pt-2">
                <h3 className="font-black mb-3 text-sm sm:text-base">
                  Choose Color
                </h3>

                <div className="flex gap-3 flex-wrap">
                  {colors.map((item, index) => {
                    const colorValue = getItemValue(item);

                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(colorValue)}
                        title={colorValue}
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border-4 transition-all duration-300 hover:scale-110 ${
                          clean(selectedColor) === clean(colorValue)
                            ? "border-[#D6BA72] scale-110 shadow-lg"
                            : "border-white/20 shadow-md"
                        }`}
                        style={{
                          backgroundColor:
                            item.slug || colorValue.toLowerCase() || "#000",
                        }}
                      />
                    );
                  })}
                </div>

                <p className="mt-3 text-xs sm:text-sm font-semibold text-neutral-500">
                  Selected Color:
                  <span className="ml-1 font-black capitalize">
                    {selectedColor}
                  </span>
                </p>
              </div>
            )}

            {sizes.length > 0 && (
              <div className="pt-2">
                <h3 className="font-black mb-3 text-sm sm:text-base">
                  Choose Size
                </h3>

                <div className="flex gap-3 flex-wrap">
                  {sizes.map((item, index) => {
                    const sizeValue = getItemValue(item);

                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(sizeValue)}
                        className={`px-5 py-2 rounded-xl border-2 font-bold transition-all duration-300 ${
                          clean(selectedSize) === clean(sizeValue)
                            ? "bg-black text-white border-black scale-105"
                            : "bg-white text-black border-neutral-200 hover:border-black"
                        }`}
                      >
                        {sizeValue}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-3 text-xs sm:text-sm font-semibold text-neutral-500">
                  Selected Size:
                  <span className="ml-1 font-black capitalize">
                    {selectedSize}
                  </span>
                </p>
              </div>
            )}

            {variations.length > 0 && !selectedVariation && (
              <p className="text-sm font-bold text-red-600">
                This variation is not available.
              </p>
            )}

            <div className="pt-2">
              <h3 className="font-black mb-3 text-sm sm:text-base">Quantity</h3>
              <ProductQuantity item={displayProduct} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex-1">
                <AddtoCartButton
                  product={displayProduct}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                  selectedVariation={selectedVariation}
                  variationId={selectedVariation?.id}
                  disabled={variations.length > 0 && !selectedVariation}
                />
              </div>

              <div className="flex-1">
                <Link to="/checkout">
                  <button
                    disabled={variations.length > 0 && !selectedVariation}
                    className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-black to-gray-800 hover:from-[#D6BA72] hover:to-[#c5a455] hover:text-black transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6">
              <div className="bg-white rounded-2xl p-3 shadow-md border border-black/5 flex items-center gap-3">
                <FiTruck className="text-xl text-[#D6BA72]" />
                <div>
                  <h4 className="font-black text-sm">Free Shipping</h4>
                  <p className="text-xs text-neutral-500">On orders above $100</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-3 shadow-md border border-black/5 flex items-center gap-3">
                <FiLock className="text-xl text-[#D6BA72]" />
                <div>
                  <h4 className="font-black text-sm">Secure Payment</h4>
                  <p className="text-xs text-neutral-500">Protected checkout</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-3 shadow-md border border-black/5 flex items-center gap-3">
                <FiRefreshCw className="text-xl text-[#D6BA72]" />
                <div>
                  <h4 className="font-black text-sm">Easy Return</h4>
                  <p className="text-xs text-neutral-500">7-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-16 sm:mt-20 lg:mt-24">
          <Singleproduct_Tab product={product} />
        </div>

        <section className="mt-16 sm:mt-20 lg:mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#D6BA72]/20 text-[#8a6519] font-black text-xs sm:text-sm mb-3">
                You May Also Like
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                Related Products
              </h2>
            </div>
          </div>

          <RelatedProducts allProducts={allProducts} product={product} />
        </section>
      </main>
    </div>
  );
}

export default SingleProduct;