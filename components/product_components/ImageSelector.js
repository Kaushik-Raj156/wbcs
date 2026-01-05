import { useState, useEffect } from "react";
import Image from "next/image";
// image placeholder functions
import { shimmer, toBase64 } from "../../shared/utils/imgPlaceholder";
//icons
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import { useGlobalContext } from "../../Contexts/globalContext/context";

export default function ImageSelectore({ name, price, images }) {
  const { theme } = useGlobalContext();
  const isDark = theme === "dark";
  // indicate what index of images array is currently selected to show as big image
  const [imgIndex, setImgIndex] = useState(0);
  //set image index to 0 every time product change
  useEffect(() => {
    setImgIndex(0);
  }, [name]);

  const frameClass = isDark
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-white/10"
    : "bg-white border-gray-200";
  const arrowClass = isDark
    ? "border-white/20 bg-black/40 hover:bg-black/60 text-white"
    : "border-gray-200 bg-white/70 hover:bg-white text-gray-700";
  const thumbNeutral = isDark
    ? "border-white/10 hover:border-white/40"
    : "border-gray-200 hover:border-gray-400";

  return (
    <div className="space-y-6 group">
      {/* Main Product Image */}
      <div
        className={`relative rounded-3xl overflow-hidden border shadow-[0_25px_55px_rgba(0,0,0,0.25)] ${frameClass}`}
      >
        <div className="aspect-square relative">
          <Image
            src={images[imgIndex]}
            alt={name}
            width={600}
            height={600}
            className={`object-contain w-full h-full ${
              isDark ? "mix-blend-lighten" : ""
            }`}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(600, 600)
            )}`}
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => {
                  if (imgIndex > 0) setImgIndex(imgIndex - 1);
                }}
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur transition-all duration-200 opacity-0 group-hover:opacity-100 ${arrowClass}`}
                aria-label="Previous image"
              >
                <ArrowLeftIcon width={20} />
              </button>
              <button
                onClick={() => {
                  if (imgIndex < images.length - 1) setImgIndex(imgIndex + 1);
                }}
                className={`absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur transition-all duration-200 opacity-0 group-hover:opacity-100 ${arrowClass}`}
                aria-label="Next image"
              >
                <ArrowRightIcon width={20} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => setImgIndex(i)}
              className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border transition-all duration-200 ${
                i === imgIndex
                  ? "border-accent shadow-lg shadow-accent/30"
                  : thumbNeutral
              }`}
              aria-label={`Select image ${i + 1}`}
            >
              <Image
                width={80}
                height={80}
                src={url}
                className="object-cover w-full h-full"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(80, 80)
                )}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
