import React from "react";
import ImageSelector from "./ImageSelector";
// selece color size and add to cart component
import ColorSizeSelector from "./ColorSizeSelector";
import { useGlobalContext } from "../../Contexts/globalContext/context";

function SingleProduct({ product }) {
  const { theme } = useGlobalContext();
  const isDark = theme === "dark";
  const pageBg = isDark
    ? "bg-gradient-to-b from-[#05070f] via-[#0b0f1b] to-black text-secondary"
    : "bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900";
  const glowBg = isDark
    ? "bg-gradient-to-r from-purple-600/30 via-blue-500/30 to-emerald-400/30"
    : "bg-gradient-to-r from-rose-200/60 via-amber-200/60 to-emerald-100/60";
  const cardClass = isDark
    ? "bg-white/5 border-white/10 text-white"
    : "bg-white border-gray-200 text-gray-900";

  // Safety check for product
  if (!product) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark
            ? "bg-gradient-to-b from-gray-900 via-black to-gray-950 text-secondary"
            : "bg-gradient-to-b from-white via-gray-100 to-gray-200 text-gray-900"
        }`}
      >
        <p className={isDark ? "text-gray-300" : "text-gray-600"}>
          Product not found
        </p>
      </div>
    );
  }

  const { name, price, store, description } = product;

  // take out all image urls from store and push into images[]
  var images = [];
  if (store && Array.isArray(store)) {
    store.forEach((color) => {
      if (color && color["imgUrls"] && Array.isArray(color["imgUrls"])) {
        color["imgUrls"].forEach((url) => {
          if (url) images.push(url);
        });
      }
    });
  }

  // Fallback if no images found
  if (images.length === 0) {
    images = ["/black-hat.png"]; // Default placeholder image
  }

  return (
    <div className={`min-h-screen ${pageBg}`}>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
        <div className="absolute inset-0 mx-auto max-w-5xl blur-3xl opacity-30 pointer-events-none">
          <div className={`h-72 w-full ${glowBg} rounded-full`} />
        </div>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image Section */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ImageSelector name={name} price={price} images={images} />
          </div>

          {/* Product Details Section */}
          <div className="lg:pt-4">
            <div
              className={`${cardClass} rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.25)] backdrop-blur`}
            >
            <ColorSizeSelector
              store={store}
              description={description}
              name={name}
              price={price}
              img={images[0]}
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
