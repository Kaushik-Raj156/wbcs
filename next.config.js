const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public", // fix typo here
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  images: {
    domains: ["demo.vercel.store", "cdn11.bigcommerce.com"], // use the exact domains from your images
  },
});
