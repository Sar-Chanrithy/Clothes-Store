// Centralized Products Database (Single Source of Truth)
import { DRESS_IMAGES } from "./dressImages.js";

export const products = [
  {
    id: 62,
    name: "Classic Oxford Long-Sleeve Shirt",
    brand: "VELORA Collection",
    price: 30.50,
    originalPrice: 45.00,
    rating: 4.9,
    reviews: 142,
    image: "/images/products/shirt-sky-blue.jpg",
    images: [
      "/images/products/shirt-sky-blue.jpg",
      "/images/products/shirt-white-oxford.jpg",
      "/images/products/shirt-navy-blue.jpg",
      "/images/products/shirt-slate-grey.jpg"
    ],
    colorImages: {
      "Sky Blue": "/images/products/shirt-sky-blue.jpg",
      "White": "/images/products/shirt-white-oxford.jpg",
      "Navy": "/images/products/shirt-navy-blue.jpg",
      "Slate Grey": "/images/products/shirt-slate-grey.jpg"
    },
    category: "Men's Fashion",
    subCategory: "Shirts",
    badge: "Trending",
    isNew: true,
    isSale: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    size: ["S", "M", "L", "XL", "XXL"],
    colors: ["Sky Blue", "White", "Navy", "Slate Grey"],
    inStock: true,
    maxQuantity: 15,
    sku: "VEL-0062",
    description: "Crafted from 100% premium long-staple cotton, this timeless long-sleeve shirt offers an effortless balance between formal polish and casual comfort. Featuring a structured collar, chest pocket, and refined tailored silhouette.",
    details: [
      "100% premium breathable combed cotton",
      "Available in 4 essential colors: Sky Blue, Crisp White, Navy Blue, and Slate Grey",
      "Buttoned barrel cuffs with contrast inner trim",
      "Tailored fit with curved hem suitable for tucking or untucked wear"
    ]
  },
  {
    id: 64,
    name: "Crisp Oxford Cotton Dress Shirt",
    brand: "VELORA Collection",
    price: 28.00,
    originalPrice: 42.00,
    rating: 4.9,
    reviews: 168,
    image: "/images/products/shirt-white-oxford.jpg",
    images: [
      "/images/products/shirt-white-oxford.jpg"
    ],
    colorImages: {
      "White": "/images/products/shirt-white-oxford.jpg"
    },
    category: "Men's Fashion",
    subCategory: "Shirts",
    badge: "Essential",
    isNew: true,
    isSale: false,
    sizes: ["S", "M", "L", "XL", "XXL"],
    size: ["S", "M", "L", "XL", "XXL"],
    colors: ["White"],
    inStock: true,
    maxQuantity: 20,
    sku: "VEL-0064",
    description: "The quintessential wardrobe staple. Pure white Oxford cotton shirt with button-down collar, durable mother-of-pearl buttons, and impeccable tailored drape.",
    details: [
      "Heavyweight Oxford weave 100% cotton",
      "Button-down collar that stays crisp throughout the day",
      "Front chest pocket and box pleat for ease of movement",
      "Easy-iron finish for effortless daily maintenance"
    ]
  },
  {
    id: 65,
    name: "Tailored Slim Fit Dress Shirt",
    brand: "VELORA Collection",
    price: 29.00,
    originalPrice: 45.00,
    rating: 4.9,
    reviews: 114,
    image: "/images/products/shirt-navy-blue.jpg",
    images: [
      "/images/products/shirt-navy-blue.jpg"
    ],
    colorImages: {
      "Navy": "/images/products/shirt-navy-blue.jpg"
    },
    category: "Men's Fashion",
    subCategory: "Shirts",
    badge: "Premium",
    isNew: true,
    isSale: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    size: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy"],
    inStock: true,
    maxQuantity: 12,
    sku: "VEL-0065",
    description: "Sophisticated deep navy dress shirt designed with a sharp modern fit. Sleek tonal buttons and clean front deliver an elevated aesthetic for evenings and business settings.",
    details: [
      "Smooth high-thread-count cotton blend with slight stretch",
      "Deep navy colorway resistant to fading",
      "Structured spread collar with back darts for a sculpted silhouette",
      "Seamless clean-finish seams"
    ]
  },
  {
    id: 66,
    name: "Washed Cotton Utility Overshirt",
    brand: "VELORA Collection",
    price: 32.00,
    originalPrice: 48.00,
    rating: 4.8,
    reviews: 88,
    image: "/images/products/shirt-slate-grey.jpg",
    images: [
      "/images/products/shirt-slate-grey.jpg"
    ],
    colorImages: {
      "Slate Grey": "/images/products/shirt-slate-grey.jpg"
    },
    category: "Men's Fashion",
    subCategory: "Shirts",
    badge: "New Arrival",
    isNew: true,
    isSale: false,
    sizes: ["S", "M", "L", "XL", "XXL"],
    size: ["S", "M", "L", "XL", "XXL"],
    colors: ["Slate Grey"],
    inStock: true,
    maxQuantity: 14,
    sku: "VEL-0066",
    description: "Rugged yet refined, this washed slate grey overshirt features a vintage garment-washed patina, durable midweight cotton twill, and a utility chest pocket.",
    details: [
      "Midweight 100% garment-dyed cotton twill",
      "Vintage garment wash with subtle washed fade",
      "Reinforced workwear stitching and utility chest pocket",
      "Wear open as a lightweight jacket or buttoned as a statement shirt"
    ]
  }
];

// ============ CAMBODIA CURRENCY HELPER ============
export const KHR_RATE = 4100;

export const formatKHR = (usdPrice) => {
  if (typeof usdPrice !== "number" || isNaN(usdPrice)) return "0 ៛";
  return `${Math.round(usdPrice * KHR_RATE).toLocaleString()} ៛`;
};

// ============ HELPER FUNCTIONS ============

export const getProductById = (id) => {
  return products.find(product => String(product.id) === String(id)) || null;
};

export const getProductsByCategory = (category) => {
  if (!category || category === "All") return products;
  return products.filter(product => product.category === category);
};

export const getProductsBySubCategory = (category, subCategory) => {
  return products.filter(product => 
    product.category === category && product.subCategory === subCategory
  );
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.badge === "Best Seller" || product.badge === "Trending");
};

export const getNewProducts = () => {
  return products.filter(product => product.isNew);
};

export const getSaleProducts = () => {
  return products.filter(product => product.isSale);
};

export const getRelatedProducts = (productId, limit = 4) => {
  const product = getProductById(productId);
  if (!product) return products.slice(0, limit);
  
  const sameCategory = products.filter(p => String(p.id) !== String(productId) && p.category === product.category);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  
  const others = products.filter(p => String(p.id) !== String(productId) && p.category !== product.category);
  return [...sameCategory, ...others].slice(0, limit);
};

export const searchProducts = (query) => {
  if (!query || !query.trim()) return products;
  const searchTerm = query.toLowerCase().trim();
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.subCategory.toLowerCase().includes(searchTerm)
  );
};

export const filterProducts = (filters) => {
  let filtered = [...products];

  if (filters.category && filters.category !== "All") {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  if (filters.subCategory) {
    filtered = filtered.filter(p => p.subCategory === filters.subCategory);
  }

  if (filters.priceMin !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.priceMin);
  }

  if (filters.priceMax !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.priceMax);
  }

  if (filters.size && filters.size.length > 0) {
    filtered = filtered.filter(p => {
      const pSizes = p.sizes || p.size || [];
      return pSizes.some(s => filters.size.includes(s));
    });
  }

  if (filters.color && filters.color.length > 0) {
    filtered = filtered.filter(p => {
      const pColors = p.colors || [];
      return pColors.some(c => filters.color.includes(typeof c === "string" ? c : c.name));
    });
  }

  if (filters.rating) {
    filtered = filtered.filter(p => p.rating >= filters.rating);
  }

  if (filters.inStock) {
    filtered = filtered.filter(p => p.inStock);
  }

  if (filters.sale) {
    filtered = filtered.filter(p => p.isSale);
  }

  if (filters.new) {
    filtered = filtered.filter(p => p.isNew);
  }

  return filtered;
};

export const sortProducts = (productList, sortBy) => {
  const sorted = [...productList];
  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "popular":
      return sorted.sort((a, b) => b.reviews - a.reviews);
    case "newest":
      return sorted.sort((a, b) => (a.isNew ? -1 : 1));
    default:
      return sorted;
  }
};

export default products;
