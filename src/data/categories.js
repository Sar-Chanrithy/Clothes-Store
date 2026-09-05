export const categories = {
  "Men's Fashion": {
    id: "men",
    name: "Men's Fashion",
    icon: "shirt",
    description: "Premium menswear collection",
    subcategories: [
      "Suits & Blazers",
      "Shirts",
      "T-Shirts",
      "Pants & Trousers",
      "Jeans",
      "Shorts",
      "Sweaters & Knits",
      "Jackets & Coats",
      "Ties & Bowties",
      "Belts",
      "Socks",
      "Underwear"
    ],
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=300&fit=crop"
  },
  "Women's Fashion": {
    id: "women",
    name: "Women's Fashion",
    icon: "sparkles",
    description: "Elegant women's collection",
    subcategories: [
      "Dresses",
      "Skirts",
      "Blouses & Tops",
      "Pants & Leggings",
      "Jeans",
      "Jackets & Coats",
      "Sweaters & Cardigans",
      "Jumpsuits",
      "Activewear",
      "Lingerie",
      "Swimwear"
    ],
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=300&fit=crop"
  },
  Footwear: {
    id: "footwear",
    name: "Footwear",
    icon: "shoe",
    description: "Premium footwear collection",
    subcategories: [
      "Sneakers",
      "Boots",
      "Heels",
      "Sandals",
      "Loafers",
      "Oxfords",
      "Slippers",
      "Athletic Shoes",
      "Formal Shoes",
      "Casual Shoes"
    ],
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop"
  },
  Accessories: {
    id: "accessories",
    name: "Accessories",
    icon: "watch",
    description: "Complete your look",
    subcategories: [
      "Watches",
      "Jewelry",
      "Bags & Handbags",
      "Belts",
      "Scarves & Wraps",
      "Hats & Caps",
      "Sunglasses",
      "Gloves",
      "Wallets",
      "Phone Cases"
    ],
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=300&fit=crop"
  },
  Luxury: {
    id: "luxury",
    name: "Luxury",
    icon: "gem",
    description: "Premium designer collections",
    subcategories: [
      "Designer Bags",
      "Fine Jewelry",
      "Luxury Watches",
      "Designer Sunglasses",
      "Premium Leather Goods",
      "Exclusive Perfumes",
      "Limited Edition",
      "Couture Pieces",
      "Investment Pieces"
    ],
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop"
  },
  Sportswear: {
    id: "sportswear",
    name: "Sportswear",
    icon: "shopping-bag",
    description: "Active & fitness gear",
    subcategories: [
      "Activewear",
      "Athletic Shoes",
      "Gym Bags",
      "Sports Bras",
      "Yoga Pants",
      "Training Tops",
      "Running Gear",
      "Swimwear",
      "Sports Accessories"
    ],
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop"
  },
  "Kids Fashion": {
    id: "kids",
    name: "Kids Fashion",
    icon: "sparkles",
    description: "Stylish kids collection",
    subcategories: [
      "Baby Clothing",
      "Toddler Fashion",
      "Kids Dresses",
      "Kids Shoes",
      "Kids Accessories",
      "School Uniforms",
      "Party Wear",
      "Winter Wear"
    ],
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop"
  },
  "Winter Collection": {
    id: "winter",
    name: "Winter Collection",
    icon: "snowflake",
    description: "Stay warm in style",
    subcategories: [
      "Winter Coats",
      "Sweaters",
      "Scarves",
      "Gloves",
      "Beanies",
      "Thermals",
      "Winter Boots",
      "Puffer Jackets",
      "Wool Blends"
    ],
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400&h=300&fit=crop"
  },
  "Summer Collection": {
    id: "summer",
    name: "Summer Collection",
    icon: "sun",
    description: "Stay cool & stylish",
    subcategories: [
      "Summer Dresses",
      "Shorts",
      "T-Shirts",
      "Swimwear",
      "Sandals",
      "Sunglasses",
      "Hats",
      "Linen Clothing",
      "Light Fabrics"
    ],
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop"
  },
  Sustainable: {
    id: "sustainable",
    name: "Sustainable",
    icon: "leaf",
    description: "Eco-friendly fashion",
    subcategories: [
      "Eco-Friendly Fabrics",
      "Recycled Materials",
      "Organic Cotton",
      "Vegan Leather",
      "Sustainable Footwear",
      "Ethical Fashion",
      "Zero Waste",
      "Upcycled Pieces"
    ],
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=300&fit=crop"
  }
};

// Helper functions
export const getCategoryById = (id) => {
  return Object.values(categories).find(cat => cat.id === id) || null;
};

export const getCategoryByName = (name) => {
  return categories[name] || null;
};

export const getAllCategories = () => {
  return Object.keys(categories).map(name => ({
    ...categories[name],
    key: name
  }));
};

export const getSubcategories = (categoryName) => {
  return categories[categoryName]?.subcategories || [];
};

export const getCategoryKeys = () => {
  return Object.keys(categories);
};

export default categories;