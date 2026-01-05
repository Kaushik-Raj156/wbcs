import {
  HomeIcon,
  PhoneIcon,
  InformationCircleIcon,
  TemplateIcon,
} from "@heroicons/react/outline";
import { FiTwitter, FiInstagram, FiFacebook } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
export const sideList = [
  { name: "Home", icon: HomeIcon, url: "/" },
  { name: "Categories", icon: TemplateIcon, url: "/search" },
  { name: "About", icon: InformationCircleIcon, url: "/about" },
  { name: "Contact", icon: PhoneIcon, url: "/contact" },
];
export const socialLinks = [
  { url: "https://twitter.com/mamad_coder", icon: FiTwitter },
  { url: "https://twitter.com/mamad_coder", icon: FiInstagram },
  { url: "https://twitter.com/mamad_coder", icon: FiFacebook },
  { url: "https://twitter.com/mamad_coder", icon: FaWhatsapp },
];

export const sortView = [
  {
    sort: "relevence",
    name: "relevence",
    arrSorter: (arr) => {
      return arr;
    },
  },
  {
    sort: "sale",
    name: "on sale",
    arrSorter: (arr) => {
      return arr.filter((item) => item.sale === true);
    },
  },
  {
    sort: "latest",
    name: "latest arivals",
    arrSorter: (arr) => {
      return arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
  {
    sort: "price_inc",
    name: "prcie: low to high",
    arrSorter: (arr) => {
      return arr.sort((a, b) => a.price - b.price);
    },
  },
  {
    sort: "price_dec",
    name: "price: high to low",
    arrSorter: (arr) => {
      return arr.sort((a, b) => b.price - a.price);
    },
  },
];

export const bannerImages = [
  {
    name: "cotton hat",
    cat: "hat",
    url: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/027205/01/fnd/IND/fmt/png/PUMA-x-Royal-Challengers-Bangalore-Men's-Cricket-Cap",
  },
  {
    name: "light weight jacket",
    cat: "jacket",
    url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
  },
  {
    name: "vercel t-shirt",
    cat: "t-shirt",
    url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
  },
  {
    name: "mask",
    cat: "accessory",
    url: "https://i.etsystatic.com/23049470/r/il/ef02c9/5380012997/il_1588xN.5380012997_8zr6.jpg",
  },
  {
    name: "champion packable jacket",
    cat: "jacket",
    url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
  },
  {
    name: "unisex skinny joggers",
    cat: "pants",
    url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80",
  },
  {
    name: "long sleeve shirt",
    cat: "shirt",
    url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80",
  },
  {
    name: "cotton hat",
    cat: "hat",
    url: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/027205/01/fnd/IND/fmt/png/PUMA-x-Royal-Challengers-Bangalore-Men's-Cricket-Cap",
  },
  {
    name: "light weight jacket",
    cat: "jacket",
    url: "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F116%2F512%2FMen-Jacket-Front-Black__15466.1603283963.png&w=1920&q=85",
  },
  {
    name: "vercel t-shirt",
    cat: "t-shirt",
    url: "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F117%2F532%2FMen-TShirt-White-Front__99616.1603284781.png&w=640&q=85",
  },
];

export const refreshToken = { type: "refresh", age: 60 * 60 * 24 * 365 * 5 };// 5years
export const accessToken = { type: "access", age: 7 * 60 }; // 7min
