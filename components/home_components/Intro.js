import { motion } from "framer-motion";
import Image from "next/image";
import { shimmer, toBase64 } from "../../shared/utils/imgPlaceholder";
import Link from "next/link";
import { bannerImages } from "../../shared/json";
import { useGlobalContext } from "../../Contexts/globalContext/context";

export default function Intro() {
  const { translate: t } = useGlobalContext();

  return (
    <div className="text-secondary relative overflow-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative h-screen flex items-center justify-center"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>

        {/* Black Hat Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10"
        >
          <Image
            layout="intrinsic"
            width={400}
            height={400}
            priority
            src="/black-hat.png"
            className="object-contain drop-shadow-2xl"
            alt="Minimalist Black Hat"
          />
        </motion.div>

        {/* Moto Text */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-32 left-0 right-0 text-center z-20"
        >
          <p className="text-xl md:text-2xl font-light tracking-wider">
            {t('moto1')}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-secondary/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-secondary/50 rounded-full mt-2"
            ></motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Second Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="h-[50vh] flex items-center justify-center bg-gradient-to-b from-secondary to-third"
      >
        <div className="text-center">
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4"
          >
            {t("moto2")}
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-24 h-0.5 bg-accent mx-auto"
          ></motion.div>
        </div>
      </motion.div>

      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-third py-16 overflow-hidden"
      >
        <div className="relative">
          <motion.div
            animate={{ x: [0, -100] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex space-x-8"
          >
            {bannerImages.concat(bannerImages).map((item, i) => (
              <Link key={i} href={`/product/${item.name.replace(/\s/g, "_")}?cat=${item.cat}`}>
                <a className="flex-shrink-0 group">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-72 h-96 relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 bg-secondary border-2 border-hover"
                  >
                    {/* Product Image */}
                    <div className="h-72 relative overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg uppercase tracking-wide">
                          {item.cat}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 bg-secondary">
                      <h3 className="text-primary font-bold text-base mb-2 capitalize line-clamp-2 group-hover:text-blue-500 transition-colors duration-300">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <span className="text-xs font-semibold text-secondary">New</span>
                        </div>
                        <button className="px-3 py-1 bg-third hover:bg-blue-500 text-primary hover:text-white rounded-lg text-xs font-bold transition-all duration-200 shadow-sm">
                          View
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </a>
              </Link>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
