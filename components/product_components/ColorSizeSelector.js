import { useState, useEffect } from "react";
import { useGlobalContext } from "../../Contexts/globalContext/context";
import { useRouter } from "next/router";
//icons
import {
    CheckIcon,
    TruckIcon,
    ShieldCheckIcon,
    RefreshIcon
  } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";

export default function ColorSizeSelector({store, description, name,price,img}){

  const router = useRouter();
  const { translate: t, addItem, cartToggler, theme } = useGlobalContext();
  const isDark = theme === "dark";

  // Safety check for store
  if (!store || !Array.isArray(store) || store.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold mb-2 capitalize ${isDark ? "text-white" : "text-gray-900"}`}>
            {name ? name.replace(/_/g, " ") : "Product"}
          </h1>
          <p className="text-red-500">{t('product information not available')}</p>
        </div>
      </div>
    );
  }

  // Product & Cart State
  const [color, setColor] = useState(store[0]?.color || "");
  const [colorCode, setColorCode] = useState(store[0]?.colorCode || "#f3f4f6");
  const [size, setSize] = useState(store[0]?.sizeAmnt?.[0]?.size || "");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (store && store.length > 0 && store[0]) {
      if (store[0].color) setColor(store[0].color);
      if (store[0].sizeAmnt && store[0].sizeAmnt.length > 0 && store[0].sizeAmnt[0]?.size) {
        setSize(store[0].sizeAmnt[0].size);
      }
    }
  }, [store]);

  // Get available sizes for selected color
  const getAvailableSizes = () => {
    if (!store || !Array.isArray(store)) return [];
    const selectedColorData = store.find(item => item && item.color === color);
    return selectedColorData && selectedColorData.sizeAmnt && Array.isArray(selectedColorData.sizeAmnt)
      ? selectedColorData.sizeAmnt.filter(sizeItem => sizeItem && sizeItem.amount > 0)
      : [];
  };

  const availableSizes = getAvailableSizes();

  const handleBuyNow = () => {
    addItem({
      name,
      price,
      amount: quantity,
      color,
      colorCode,
      size,
      image: img,
    });
    router.push('/checkout');
  };

  const selectedTotal = price * quantity;

  const headingColor = isDark ? "text-white" : "text-gray-900";
  const subTextColor = isDark ? "text-gray-400" : "text-gray-500";
  const dividerColor = isDark ? "border-white/15" : "border-gray-200";
  const infoTileClass = `flex items-center space-x-3 p-4 rounded-2xl border backdrop-blur ${
    isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
  }`;

  const colorRingNeutral = isDark
    ? "border-white/15 hover:border-white/50"
    : "border-gray-200 hover:border-gray-400";
  const sizeButtonNeutral = isDark
    ? "border-white/15 text-gray-100 hover:border-accent/70"
    : "border-gray-300 text-gray-800 hover:border-gray-500";
  const buyNowButtonClass = isDark
    ? "flex-1 text-lg font-bold py-4 rounded-2xl border border-white/20 text-white bg-gradient-to-r from-white/15 via-white/5 to-transparent shadow-lg shadow-black/30 transition-all duration-200 hover:translate-y-[-2px] hover:from-white/25 hover:via-white/10"
    : "flex-1 text-lg font-bold py-4 rounded-2xl border border-gray-300 text-white bg-gradient-to-r from-gray-900 to-gray-600 shadow-lg shadow-gray-400/40 transition-all duration-200 hover:translate-y-[-2px]";

  const discountBadgeClass = isDark
    ? "bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-semibold px-4 py-1 rounded-full text-sm shadow-lg shadow-emerald-500/30"
    : "bg-gradient-to-r from-emerald-400 to-lime-400 text-gray-900 font-semibold px-4 py-1 rounded-full text-sm shadow shadow-emerald-500/20 ring-1 ring-emerald-300/60";

  const addToCartButtonClass = isDark
    ? "flex-1 bg-gradient-to-r from-accent to-emerald-500 text-white text-lg font-bold py-4 rounded-2xl transition-all duration-200 transform hover:translate-y-[-2px] shadow-lg shadow-emerald-500/40"
    : "flex-1 bg-gradient-to-r from-emerald-200 via-emerald-300 to-lime-200 text-gray-900 text-lg font-bold py-4 rounded-2xl transition-all duration-200 transform hover:translate-y-[-2px] shadow-md shadow-emerald-200/60 border border-emerald-200";

  const addToCartLabel = t("add to cart") || "Add to cart";
  const buyNowLabel = t("buy now") || "Buy now";

  return(
    <div className="space-y-8">
      {/* Product Title and Price */}
      <div className="space-y-3">
        <p className={`uppercase tracking-[0.35em] text-xs ${subTextColor}`}>
          Exclusive drop
        </p>
        <h1 className={`text-3xl lg:text-4xl font-bold capitalize ${headingColor}`}>
          {name.replace(/_/g, " ")}
        </h1>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-4xl font-bold text-accent">₹{price}</span>
          <span className={`text-lg line-through ${subTextColor}`}>
            ₹{Math.round(price * 1.2)}
          </span>
          <span className={discountBadgeClass}>
            20% OFF
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className="w-5 h-5 text-yellow-400 fill-current drop-shadow"
              />
            ))}
          </div>
          <span className={`text-sm ${subTextColor}`}>(4.2) • 1,234 reviews</span>
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-4">
        <h4 className={`text-sm font-semibold uppercase tracking-[0.25em] ${subTextColor}`}>
          {t('color')}
        </h4>
        <div className="flex flex-wrap gap-4">
          {store && Array.isArray(store) && store.map((item) => (
            <button
              key={item.color}
              onClick={() => {
                setColor(item.color);
                setColorCode(item.colorCode);
              }}
              className={`group relative w-14 h-14 rounded-full border transition-all duration-200 ${
                item.color === color
                  ? 'border-accent scale-110 shadow-lg shadow-accent/30'
                  : colorRingNeutral
              }`}
              style={{
                backgroundColor: item.colorCode || '#f3f4f6',
              }}
              title={item.color}
            >
              {item.color === color && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckIcon className={`w-6 h-6 ${item.color === 'white' ? 'text-black' : 'text-white drop-shadow'}`} />
                </div>
              )}
              <span className="sr-only">{item.color}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      {store && store[0] && store[0].sizeAmnt && store[0].sizeAmnt[0] && store[0].sizeAmnt[0].size && (
        <div className="space-y-4">
          <h4 className={`text-sm font-semibold uppercase tracking-[0.25em] ${subTextColor}`}>
            {t('size')}
          </h4>
          <div className="flex flex-wrap gap-3">
            {availableSizes.map((sizeItem, i) => (
              <button
                key={i}
                onClick={() => setSize(sizeItem.size)}
                className={`w-16 h-16 rounded-2xl border font-semibold transition-all duration-200 ${
                  sizeItem.size === size
                    ? 'border-accent bg-accent text-white scale-105 shadow-lg shadow-accent/30'
                    : `${sizeButtonNeutral} hover:scale-105`
                }`}
                aria-label={`Select size ${sizeItem.size}`}
              >
                {sizeItem.size}
              </button>
            ))}
          </div>
          <p className={`text-sm ${subTextColor}`}>
            {t('Selected')}: <span className={`font-medium tracking-wide ${headingColor}`}>
              {size || t('select size')}
            </span>
          </p>
        </div>
      )}

      {/* Quantity Selection */}
      <div className="space-y-4">
        <h4 className={`text-sm font-semibold uppercase tracking-[0.25em] ${subTextColor}`}>
          {t('quantity')}
        </h4>
        <div className="flex flex-wrap items-center gap-4">
          <div className={`flex items-center ${dividerColor} border rounded-2xl ${isDark ? "bg-white/5" : "bg-white"}`}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className={`w-12 h-12 flex items-center justify-center text-xl font-bold transition ${isDark ? "hover:bg-white/10 text-white" : "hover:bg-gray-50 text-gray-900"}`}
              aria-label={t('decrease quantity')}
            >
              -
            </button>
            <span className={`w-16 text-center font-semibold text-lg ${headingColor}`}>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className={`w-12 h-12 flex items-center justify-center text-xl font-bold transition ${isDark ? "hover:bg-white/10 text-white" : "hover:bg-gray-50 text-gray-900"}`}
              aria-label={t('increase quantity')}
            >
              +
            </button>
          </div>
          <span className={`text-sm ${subTextColor}`}>
            {availableSizes.find(s => s.size === size)?.amount || 0} {t('available')}
          </span>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={infoTileClass}>
          <TruckIcon className="w-6 h-6 text-emerald-400" />
          <div>
            <p className={`text-sm font-semibold ${headingColor}`}>Free Delivery</p>
            <p className={`text-xs ${subTextColor}`}>Within 3-5 days</p>
          </div>
        </div>
        <div className={infoTileClass}>
          <RefreshIcon className="w-6 h-6 text-sky-400" />
          <div>
            <p className={`text-sm font-semibold ${headingColor}`}>Easy Returns</p>
            <p className={`text-xs ${subTextColor}`}>30 days policy</p>
          </div>
        </div>
        <div className={infoTileClass}>
          <ShieldCheckIcon className="w-6 h-6 text-purple-400" />
          <div>
            <p className={`text-sm font-semibold ${headingColor}`}>Secure Payment</p>
            <p className={`text-xs ${subTextColor}`}>100% protected</p>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-2xl px-4 py-3 ${isDark ? "border border-white/10 bg-white/5" : "border border-gray-200 bg-gray-50"}`}>
          <span className={`text-sm uppercase tracking-[0.2em] ${subTextColor}`}>
            {size ? `${size} · ${t('selected')}` : t('select size')}
          </span>
          <span className={`text-2xl font-semibold ${headingColor}`}>₹{selectedTotal}</span>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <button
            onClick={() => {
              addItem({
                name,
                price,
                amount: quantity,
                color,
                colorCode,
                size,
                image: img,
              });
              cartToggler();
            }}
            className={addToCartButtonClass}
          >
            {addToCartLabel}
          </button>

          <button
            onClick={handleBuyNow}
            className={buyNowButtonClass}
          >
            {buyNowLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
