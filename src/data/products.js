// Centralized Products Database (Single Source of Truth)
export const products = [
  // ============ MEN'S FASHION (IDs 1 - 12) ============
  {
    id: 1,
    name: "Premium Wool Suit",
    brand: "VELORA Collection",
    price: 899.00,
    originalPrice: 1299.00,
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=800&fit=crop&q=80"
    ],
    category: "Men's Fashion",
    subCategory: "Suits & Blazers",
    badge: "Best Seller",
    isNew: false,
    isSale: true,
    sizes: ["38R", "40R", "42R", "44R"],
    size: ["38R", "40R", "42R", "44R"],
    colors: ["Charcoal", "Navy", "Black"],
    inStock: true,
    maxQuantity: 5,
    sku: "VEL-0001",
    description: "Crafted from Super 130s pure virgin wool, this tailored suit delivers an impeccable silhouette with unmatched drape and breathability.",
    details: [
      "100% Super 130s Italian virgin wool",
      "Full canvas construction for bespoke drape",
      "Hand-finished pick stitching on lapels",
      "Horn buttons and cupro breathable lining"
    ]
  },
  {
    id: 2,
    name: "Italian Silk Shirt",
    brand: "VELORA Collection",
    price: 199.00,
    originalPrice: 299.00,
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15c429fbb41?w=600&h=800&fit=crop&q=80"
    ],
    category: "Men's Fashion",
    subCategory: "Shirts",
    badge: "Premium",
    isNew: false,
    isSale: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    size: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Blue", "Pink"],
    inStock: true,
    maxQuantity: 8,
    sku: "VEL-0002",
    description: "Woven in Como, Italy, this lustrous silk shirt combines refined fluidity with clean lines for evening wear or elevated tailoring.",
    details: [
      "100% Mulberry silk woven in Como",
      "Mother-of-pearl buttons",
      "Spread collar with removable stays",
      "Single-needle tailoring throughout"
    ]
  },
  {
    id: 3,
    name: "Cashmere Sweater",
    brand: "VELORA Collection",
    price: 349.00,
    originalPrice: null,
    rating: 4.7,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583744946564-b52d1e3899aa?w=600&h=800&fit=crop&q=80"
    ],
    category: "Men's Fashion",
    subCategory: "Knits",
    badge: "Luxury",
    isNew: true,
    isSale: false,
    sizes: ["S", "M", "L", "XL"],
    size: ["S", "M", "L", "XL"],
    colors: ["Camel", "Navy", "Charcoal"],
    inStock: true,
    maxQuantity: 4,
    sku: "VEL-0003",
    description: "Spun from 2-ply Grade-A Mongolian cashmere, this classic crewneck provides cloud-like softness and reliable warmth without bulk.",
    details: [
      "100% Grade-A Mongolian cashmere",
      "2-ply yarn for exceptional pill resistance",
      "Ribbed collar, cuffs, and hem",
      "Regular tailored fit"
    ]
  },
  {
    id: 4,
    name: "Designer Leather Jacket",
    brand: "VELORA Collection",
    price: 599.00,
    originalPrice: 899.00,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600&h=800&fit=crop&q=80"
    ],
    category: "Men's Fashion",
    subCategory: "Jackets",
    badge: "Trending",
    isNew: false,
    isSale: true,
    sizes: ["S", "M", "L", "XL"],
    size: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
    inStock: true,
    maxQuantity: 3,
    sku: "VEL-0004",
    description: "Supple full-grain lambskin leather crafted into an iconic biker silhouette with heavy-duty gunmetal hardware and satin quilted lining.",
    details: [
      "100% full-grain Italian lambskin",
      "Asymmetrical zipper with snap-down lapels",
      "Multiple zippered exterior utility pockets",
      "Quilted satin interior for effortless layering"
    ]
  },
  {
    id: 5,
    name: "Tailored Wool Blazer",
    brand: "VELORA Collection",
    price: 699.00,
    originalPrice: 999.00,
    rating: 4.8,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=800&fit=crop&q=80"
    ],
    category: "Men's Fashion",
    subCategory: "Suits & Blazers",
    badge: "Premium",
    isNew: true,
    isSale: true,
    sizes: ["38R", "40R", "42R", "44R"],
    size: ["38R", "40R", "42R", "44R"],
    colors: ["Navy", "Charcoal", "Gray"],
    inStock: true,
    maxQuantity: 5,
    sku: "VEL-0005",
    description: "A versatile standalone sport coat crafted in pure hopsack wool, ideal for smart-casual dressing and business travel.",
    details: [
      "100% breathable wool hopsack",
      "Half-canvas tailored body",
      "Patch pockets with classic barchetta chest pocket",
      "Double back vents for ease of movement"
    ]
  },
  {
    id: 6,
    name: "Premium Cotton Chinos",
    brand: "VELORA Collection",
    price: 189.00,
    originalPrice: null,
    rating: 4.6,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop&q=80"
    ],
    category: "Men's Fashion",
    subCategory: "Pants",
    badge: "Essential",
    isNew: false,
    isSale: false,
    sizes: ["30x32", "32x32", "34x32", "36x32"],
    size: ["30x32", "32x32", "34x32", "36x32"],
    colors: ["Beige", "Navy", "Olive"],
    inStock: true,
    maxQuantity: 10,
    sku: "VEL-0006",
    description: "Garment-dyed stretch cotton twill cut in a clean tapered silhouette that pairs seamlessly with sneakers or loafers.",
    details: [
      "98% Supima cotton, 2% elastane",
      "Garment-dyed for depth of color",
      "Horn button and zip fly closure",
      "Welt back pockets"
    ]
  },
  {
    id: 7,
    name: "Merino Wool Turtleneck",
    brand: "VELORA Collection",
    price: 249.00,
    originalPrice: 349.00,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1583744946564-b52d1e3899aa?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1583744946564-b52d1e3899aa?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&q=80"
    ],
    category: "Men's Fashion",
    subCategory: "Knits",
    badge: "Winter",
    isNew: true,
    isSale: true,
    sizes: ["S", "M", "L", "XL"],
    size: ["S", "M", "L", "XL"],
    colors: ["Black", "Burgundy", "Charcoal"],
    inStock: true,
    maxQuantity: 6,
    sku: "VEL-0007",
    description: "Extra-fine merino wool knitted in a sleek gauge for streamlined layering under suits or outerwear on chilly days.",
    details: [
      "100% extrafine Australian merino wool",
      "Comfort-rib turtleneck collar",
      "Naturally temperature-regulating",
      "Tailored slim fit"
    ]
  },
  {
    id: 8,
    name: "Slim Fit Denim Jeans",
    brand: "VELORA Collection",
    price: 159.00,
    originalPrice: null,
    rating: 4.5,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop&q=80"
    ],
    category: "Men's Fashion",
    subCategory: "Denim",
    badge: "Popular",
    isNew: false,
    isSale: false,
    sizes: ["30", "32", "34", "36"],
    size: ["30", "32", "34", "36"],
    colors: ["Indigo", "Black", "Washed Blue"],
    inStock: true,
    maxQuantity: 8,
    sku: "VEL-0008",
    description: "Japanese selvedge denim woven with a touch of comfort stretch, finished with an authentic vintage indigo wash.",
    details: [
      "12.5 oz Japanese comfort-stretch denim",
      "Custom copper hardware rivets",
      "Chain-stitched waistband and hem",
      "Slim tailored leg opening"
    ]
  },
  {
    id: 9,
    name: "Classic Polo Shirt",
    brand: "VELORA Collection",
    price: 129.00,
    originalPrice: null,
    rating: 4.4,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop&q=80"
    ],
    category: "Men's Fashion",
    subCategory: "Tops",
    badge: "Essential",
    isNew: false,
    isSale: false,
    sizes: ["S", "M", "L", "XL"],
    size: ["S", "M", "L", "XL"],
    colors: ["Navy", "White", "Burgundy"],
    inStock: true,
    maxQuantity: 10,
    sku: "VEL-0009",
    description: "Knit from long-staple pima cotton pique, offering a structured ribbed collar that stays crisp throughout the day.",
    details: [
      "100% Peruvian Pima cotton pique",
      "Mother-of-pearl 3-button placket",
      "Reinforced collar edge that resists curling",
      "Side vents for comfortable movement"
    ]
  },
  {
    id: 10,
    name: "Puffer Vest",
    brand: "VELORA Collection",
    price: 279.00,
    originalPrice: 399.00,
    rating: 4.8,
    reviews: 123,
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=800&fit=crop&q=80"
    ],
    category: "Men's Fashion",
    subCategory: "Outerwear",
    badge: "Winter",
    isNew: true,
    isSale: true,
    sizes: ["S", "M", "L", "XL"],
    size: ["S", "M", "L", "XL"],
    colors: ["Black", "Olive", "Navy"],
    inStock: true,
    maxQuantity: 6,
    sku: "VEL-0010",
    description: "Insulated with 700-fill-power ethical down encased in water-resistant matte Japanese micro-ripstop nylon.",
    details: [
      "700 fill-power RDS-certified goose down",
      "DWR water-repellent shell",
      "Fleece-lined handwarmer pockets",
      "Interior zip secure passport pocket"
    ]
  },
  {
    id: 11,
    name: "Linen Summer Shirt",
    brand: "VELORA Collection",
    price: 169.00,
    originalPrice: null,
    rating: 4.5,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop&q=80"
    ],
    category: "Men's Fashion",
    subCategory: "Shirts",
    badge: "Summer",
    isNew: true,
    isSale: false,
    sizes: ["S", "M", "L", "XL"],
    size: ["S", "M", "L", "XL"],
    colors: ["White", "Sky Blue", "Beige"],
    inStock: true,
    maxQuantity: 9,
    sku: "VEL-0011",
    description: "Washed French flax linen that gets softer with every wear, featuring a breezy camp collar designed for warm days.",
    details: [
      "100% Normandy certified linen",
      "Pre-washed for instant softness",
      "Relaxed camp collar styling",
      "Breathable and naturally anti-microbial"
    ]
  },
  {
    id: 12,
    name: "Leather Dress Belt",
    brand: "VELORA Collection",
    price: 89.00,
    originalPrice: null,
    rating: 4.6,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop&q=80"
    ],
    category: "Men's Fashion",
    subCategory: "Accessories",
    badge: "Essential",
    isNew: false,
    isSale: false,
    sizes: ["32", "34", "36", "38"],
    size: ["32", "34", "36", "38"],
    colors: ["Black", "Brown", "Tan"],
    inStock: true,
    maxQuantity: 12,
    sku: "VEL-0012",
    description: "Handcrafted full-grain bridle leather with feathered edges and a brushed solid brass buckle.",
    details: [
      "Vegetable-tanned full-grain leather",
      "Feathered edge with contrast edge paint",
      "Solid brass buckle with satin finish",
      "Handcrafted in Florence, Italy"
    ]
  },

  // ============ WOMEN'S FASHION (IDs 13 - 24) ============
  {
    id: 13,
    name: "Silk Evening Dress",
    brand: "VELORA Collection",
    price: 499.00,
    originalPrice: 699.00,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop&q=80"
    ],
    category: "Women's Fashion",
    subCategory: "Dresses",
    badge: "Best Seller",
    isNew: false,
    isSale: true,
    sizes: ["XS", "S", "M", "L"],
    size: ["XS", "S", "M", "L"],
    colors: ["Burgundy", "Emerald", "Black"],
    inStock: true,
    maxQuantity: 4,
    sku: "VEL-0013",
    description: "Bias-cut silk charmeuse that skims gracefully over the figure, highlighted by an open cowl back and subtle train.",
    details: [
      "100% 22-momme pure silk charmeuse",
      "Bias cut for a flattering silhouette",
      "Floor-sweeping maxi length",
      "Concealed side zipper closure"
    ]
  },
  {
    id: 14,
    name: "Cashmere Cardigan",
    brand: "VELORA Collection",
    price: 279.00,
    originalPrice: null,
    rating: 4.6,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&q=80"
    ],
    category: "Women's Fashion",
    subCategory: "Knits",
    badge: "Premium",
    isNew: true,
    isSale: false,
    sizes: ["XS", "S", "M", "L"],
    size: ["XS", "S", "M", "L"],
    colors: ["Camel", "Ivory", "Charcoal"],
    inStock: true,
    maxQuantity: 6,
    sku: "VEL-0014",
    description: "Slouchy yet sophisticated, this v-neck cardigan is spun from ultra-soft Mongolian cashmere with tonal horn buttons.",
    details: [
      "100% fine Mongolian cashmere",
      "Deep V-neckline with ribbed trim",
      "Genuine horn buttons",
      "Dropped shoulders for a modern relaxed fit"
    ]
  },
  {
    id: 15,
    name: "Designer Jumpsuit",
    brand: "VELORA Collection",
    price: 389.00,
    originalPrice: 549.00,
    rating: 4.7,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&q=80"
    ],
    category: "Women's Fashion",
    subCategory: "Jumpsuits",
    badge: "New",
    isNew: true,
    isSale: true,
    sizes: ["XS", "S", "M", "L"],
    size: ["XS", "S", "M", "L"],
    colors: ["Black", "Olive", "Navy"],
    inStock: true,
    maxQuantity: 5,
    sku: "VEL-0015",
    description: "Tailored crepe jumpsuit with a sharp notched collar, structured waist sash, and fluid wide legs.",
    details: [
      "Heavyweight Italian stretch crepe",
      "Removable self-tie waist belt",
      "Inseam slant pockets",
      "Wide-leg architectural silhouette"
    ]
  },
  {
    id: 16,
    name: "Wool Blend Coat",
    brand: "VELORA Collection",
    price: 799.00,
    originalPrice: 1099.00,
    rating: 4.8,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1548624313-0396c8b5d8c6?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1548624313-0396c8b5d8c6?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop&q=80"
    ],
    category: "Women's Fashion",
    subCategory: "Outerwear",
    badge: "Luxury",
    isNew: true,
    isSale: true,
    sizes: ["XS", "S", "M", "L"],
    size: ["XS", "S", "M", "L"],
    colors: ["Camel", "Black", "Oatmeal"],
    inStock: true,
    maxQuantity: 3,
    sku: "VEL-0016",
    description: "Double-faced virgin wool wrap coat with an exaggerated lapel, belted waist, and hand-sewn finished edges.",
    details: [
      "90% virgin wool, 10% cashmere",
      "Double-face fabric with hand-finished seams",
      "Self-tie sash belt with belt loops",
      "Roomy patch hand pockets"
    ]
  },
  {
    id: 17,
    name: "High-Waist Trousers",
    brand: "VELORA Collection",
    price: 229.00,
    originalPrice: null,
    rating: 4.5,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&q=80"
    ],
    category: "Women's Fashion",
    subCategory: "Pants",
    badge: "Trending",
    isNew: false,
    isSale: false,
    sizes: ["0", "2", "4", "6", "8"],
    size: ["0", "2", "4", "6", "8"],
    colors: ["White", "Charcoal", "Taupe"],
    inStock: true,
    maxQuantity: 7,
    sku: "VEL-0017",
    description: "Pleated front trousers engineered in lightweight wool-blend suiting fabric with a fluid drape and comfortable high rise.",
    details: [
      "Fine wool-poly blend with stretch",
      "Double front pleats with crisp center crease",
      "Extended waistband tab with concealed hook",
      "Full-length wide leg"
    ]
  },
  {
    id: 18,
    name: "Linen Summer Dress",
    brand: "VELORA Collection",
    price: 189.00,
    originalPrice: null,
    rating: 4.5,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop&q=80"
    ],
    category: "Women's Fashion",
    subCategory: "Dresses",
    badge: "Summer",
    isNew: true,
    isSale: false,
    sizes: ["XS", "S", "M", "L"],
    size: ["XS", "S", "M", "L"],
    colors: ["White", "Beige", "Sky Blue"],
    inStock: true,
    maxQuantity: 8,
    sku: "VEL-0018",
    description: "Effortlessly chic midi dress crafted from breathable washed linen with subtle smocking at the back for a custom fit.",
    details: [
      "100% washed European linen",
      "Square neckline with wide straps",
      "Smocked elastic back panel",
      "Hidden side seam pockets"
    ]
  },
  {
    id: 19,
    name: "Silk Blouse",
    brand: "VELORA Collection",
    price: 259.00,
    originalPrice: 359.00,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop&q=80"
    ],
    category: "Women's Fashion",
    subCategory: "Tops",
    badge: "Premium",
    isNew: false,
    isSale: true,
    sizes: ["XS", "S", "M", "L"],
    size: ["XS", "S", "M", "L"],
    colors: ["Champagne", "Black", "Ivory"],
    inStock: true,
    maxQuantity: 6,
    sku: "VEL-0019",
    description: "Pure silk crepe de chine blouse tailored with subtle pleating at the shoulders and covered button cuffs.",
    details: [
      "100% silk crepe de chine",
      "Concealed front button placket",
      "French seams throughout",
      "Gentle curved shirt-tail hem"
    ]
  },
  {
    id: 20,
    name: "Pleated Midi Skirt",
    brand: "VELORA Collection",
    price: 199.00,
    originalPrice: null,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&q=80"
    ],
    category: "Women's Fashion",
    subCategory: "Skirts",
    badge: "Trending",
    isNew: true,
    isSale: false,
    sizes: ["XS", "S", "M", "L"],
    size: ["XS", "S", "M", "L"],
    colors: ["Gold", "Silver", "Emerald"],
    inStock: true,
    maxQuantity: 7,
    sku: "VEL-0020",
    description: "Sunburst knife-pleated skirt in metallic luster satin with a comfortable elasticated grosgrain waistband.",
    details: [
      "Liquid satin with metallic sheen",
      "Permanently heat-set knife pleating",
      "Grosgrain elastic waistband",
      "Midi length below the knee"
    ]
  },
  {
    id: 21,
    name: "Knit Sweater Dress",
    brand: "VELORA Collection",
    price: 279.00,
    originalPrice: 399.00,
    rating: 4.7,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=800&fit=crop&q=80"
    ],
    category: "Women's Fashion",
    subCategory: "Dresses",
    badge: "Winter",
    isNew: false,
    isSale: true,
    sizes: ["XS", "S", "M", "L"],
    size: ["XS", "S", "M", "L"],
    colors: ["Camel", "Oatmeal", "Black"],
    inStock: true,
    maxQuantity: 5,
    sku: "VEL-0021",
    description: "Flattering rib-knit midi dress spun from a cozy wool-cashmere blend with a mock neck and removable matching tie belt.",
    details: [
      "70% fine wool, 30% cashmere",
      "Body-skimming vertical rib knit",
      "Side slit for easy movement",
      "Matching knit waist belt included"
    ]
  },
  {
    id: 22,
    name: "Designer Handbag",
    brand: "VELORA Collection",
    price: 649.00,
    originalPrice: 849.00,
    rating: 4.8,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop&q=80"
    ],
    category: "Women's Fashion",
    subCategory: "Bags",
    badge: "Best Seller",
    isNew: false,
    isSale: true,
    sizes: ["One Size"],
    size: ["One Size"],
    colors: ["Red", "Black", "Tan"],
    inStock: true,
    maxQuantity: 4,
    sku: "VEL-0022",
    description: "Architectural top-handle handbag in smooth calfskin leather with polished palladium turn-lock hardware and detachable shoulder strap.",
    details: [
      "100% full-grain Italian calfskin leather",
      "Polished turn-lock closure with signature logo engraving",
      "Suede-lined dual internal compartments",
      "Detachable & adjustable leather crossbody strap"
    ]
  },
  {
    id: 23,
    name: "Lace Detail Blouse",
    brand: "VELORA Collection",
    price: 189.00,
    originalPrice: null,
    rating: 4.6,
    reviews: 123,
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop&q=80"
    ],
    category: "Women's Fashion",
    subCategory: "Tops",
    badge: "Trending",
    isNew: true,
    isSale: false,
    sizes: ["XS", "S", "M", "L"],
    size: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Black"],
    inStock: true,
    maxQuantity: 6,
    sku: "VEL-0023",
    description: "Delicate cotton voile blouse inset with romantic floral lace panels along the yoke and bishop sleeves.",
    details: [
      "100% lightweight organic cotton voile",
      "Guipure floral lace paneling",
      "Mandarin collar with ruffle edge",
      "Gathered cuffs with button closure"
    ]
  },
  {
    id: 24,
    name: "Wool Tailored Pants",
    brand: "VELORA Collection",
    price: 269.00,
    originalPrice: 379.00,
    rating: 4.7,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop&q=80"
    ],
    category: "Women's Fashion",
    subCategory: "Pants",
    badge: "Premium",
    isNew: true,
    isSale: true,
    sizes: ["0", "2", "4", "6", "8"],
    size: ["0", "2", "4", "6", "8"],
    colors: ["Charcoal", "Camel", "Navy"],
    inStock: true,
    maxQuantity: 5,
    sku: "VEL-0024",
    description: "Classic straight-leg trousers tailored in virgin wool with a mid rise and clean pressed creases.",
    details: [
      "100% fine Italian virgin wool",
      "Mid-rise straight leg fit",
      "Side slash pockets and rear jetted pockets",
      "Internal curtain waistband construction"
    ]
  },

  // ============ FOOTWEAR (IDs 25 - 32) ============
  {
    id: 25,
    name: "Luxury Leather Sneakers",
    brand: "VELORA Collection",
    price: 299.00,
    originalPrice: null,
    rating: 4.8,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop&q=80"
    ],
    category: "Footwear",
    subCategory: "Sneakers",
    badge: "Trending",
    isNew: false,
    isSale: false,
    sizes: ["7", "8", "9", "10", "11", "12"],
    size: ["7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Tan"],
    inStock: true,
    maxQuantity: 6,
    sku: "VEL-0025",
    description: "Minimalist low-top sneakers handmade in Portugal from full-grain calf leather on durable Margom rubber cupsoles.",
    details: [
      "Full-grain Italian calf leather upper",
      "Stitched Margom rubber sole",
      "Full calfskin leather lining",
      "Cushioned memory foam footbed"
    ]
  },
  {
    id: 26,
    name: "Italian Leather Boots",
    brand: "VELORA Collection",
    price: 459.00,
    originalPrice: 659.00,
    rating: 4.9,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520635522740-d5e665e25bed?w=600&h=800&fit=crop&q=80"
    ],
    category: "Footwear",
    subCategory: "Boots",
    badge: "Premium",
    isNew: false,
    isSale: true,
    sizes: ["7", "8", "9", "10", "11", "12"],
    size: ["7", "8", "9", "10", "11", "12"],
    colors: ["Brown", "Black"],
    inStock: true,
    maxQuantity: 4,
    sku: "VEL-0026",
    description: "Goodyear-welted lace-up boots constructed from rich burnished calfskin with a rugged Vibram lug sole.",
    details: [
      "Hand-burnished Italian calfskin leather",
      "Goodyear welt construction (resoleable)",
      "Vibram rubber commando lug outsole",
      "Speed hook eyelets for easy lacing"
    ]
  },
  {
    id: 27,
    name: "Designer Heels",
    brand: "VELORA Collection",
    price: 349.00,
    originalPrice: null,
    rating: 4.7,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop&q=80"
    ],
    category: "Footwear",
    subCategory: "Heels",
    badge: "Best Seller",
    isNew: false,
    isSale: false,
    sizes: ["6", "7", "8", "9", "10"],
    size: ["6", "7", "8", "9", "10"],
    colors: ["Black", "Nude", "Red"],
    inStock: true,
    maxQuantity: 5,
    sku: "VEL-0027",
    description: "Timeless 85mm pointed-toe pumps crafted in supple suede with an ergonomically cushioned leather insole.",
    details: [
      "100% fine kid suede upper",
      "85mm (3.3 inch) stiletto heel",
      "Leather sole with rubber injection for grip",
      "Padded insole for all-day comfort"
    ]
  },
  {
    id: 28,
    name: "Classic Loafers",
    brand: "VELORA Collection",
    price: 259.00,
    originalPrice: 359.00,
    rating: 4.6,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617127365659-c47e60e4c035?w=600&h=800&fit=crop&q=80"
    ],
    category: "Footwear",
    subCategory: "Loafers",
    badge: "Essential",
    isNew: true,
    isSale: true,
    sizes: ["7", "8", "9", "10", "11", "12"],
    size: ["7", "8", "9", "10", "11", "12"],
    colors: ["Burgundy", "Black", "Brown"],
    inStock: true,
    maxQuantity: 7,
    sku: "VEL-0028",
    description: "Penny loafers cut from polished French calf leather with hand-sewn moc toe stitching and stacked leather heels.",
    details: [
      "French box calf leather",
      "Traditional hand-sewn apron stitch",
      "Blake stitch flexible sole construction",
      "Stacked leather heel with rubber tap"
    ]
  },
  {
    id: 29,
    name: "Athletic Running Shoes",
    brand: "VELORA Collection",
    price: 199.00,
    originalPrice: null,
    rating: 4.5,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop&q=80"
    ],
    category: "Footwear",
    subCategory: "Athletic",
    badge: "Sport",
    isNew: true,
    isSale: false,
    sizes: ["7", "8", "9", "10", "11", "12"],
    size: ["7", "8", "9", "10", "11", "12"],
    colors: ["Red", "Black", "White"],
    inStock: true,
    maxQuantity: 10,
    sku: "VEL-0029",
    description: "Engineered mesh running shoes equipped with high-rebound supercritical foam cushioning and responsive carbon plate.",
    details: [
      "Seamless breathable engineered mesh upper",
      "Supercritical nitrogen-infused foam midsole",
      "Full-length carbon composite stabilizer plate",
      "High-abrasion zoned rubber outsole"
    ]
  },
  {
    id: 30,
    name: "Chelsea Boots",
    brand: "VELORA Collection",
    price: 399.00,
    originalPrice: 549.00,
    rating: 4.8,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1520635522740-d5e665e25bed?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1520635522740-d5e665e25bed?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop&q=80"
    ],
    category: "Footwear",
    subCategory: "Boots",
    badge: "Luxury",
    isNew: true,
    isSale: true,
    sizes: ["7", "8", "9", "10", "11", "12"],
    size: ["7", "8", "9", "10", "11", "12"],
    colors: ["Suede Tan", "Black Leather", "Dark Brown"],
    inStock: true,
    maxQuantity: 5,
    sku: "VEL-0030",
    description: "Sleek whole-cut suede Chelsea boots with heavy-duty elastic side gussets and reinforced pull tabs.",
    details: [
      "Water-resistant Italian calf suede",
      "Double elasticated gore for easy slip-on",
      "Goodyear welted low-profile Dainite rubber sole",
      "Reinforced grosgrain heel pull loops"
    ]
  },
  {
    id: 31,
    name: "Strappy Sandals",
    brand: "VELORA Collection",
    price: 189.00,
    originalPrice: null,
    rating: 4.4,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&q=80"
    ],
    category: "Footwear",
    subCategory: "Sandals",
    badge: "Summer",
    isNew: true,
    isSale: false,
    sizes: ["6", "7", "8", "9", "10"],
    size: ["6", "7", "8", "9", "10"],
    colors: ["Gold", "Tan", "Black"],
    inStock: true,
    maxQuantity: 8,
    sku: "VEL-0031",
    description: "Barely-there tubular leather sandals with an adjustable ankle wrap strap and comfortable flared block heel.",
    details: [
      "Supple metallic nappa leather straps",
      "50mm (2 inch) modern block heel",
      "Square open-toe silhouette",
      "Padded leather insole"
    ]
  },
  {
    id: 32,
    name: "Oxford Shoes",
    brand: "VELORA Collection",
    price: 329.00,
    originalPrice: 449.00,
    rating: 4.8,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1617127365659-c47e60e4c035?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1617127365659-c47e60e4c035?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=800&fit=crop&q=80"
    ],
    category: "Footwear",
    subCategory: "Oxfords",
    badge: "Premium",
    isNew: true,
    isSale: true,
    sizes: ["7", "8", "9", "10", "11", "12"],
    size: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "Cognac"],
    inStock: true,
    maxQuantity: 5,
    sku: "VEL-0032",
    description: "Formal closed-lacing cap-toe Oxfords crafted in premium calfskin with mirror-shine toe caps and channeled leather soles.",
    details: [
      "Full-grain French calfskin leather",
      "Closed five-eyelet Oxford lacing",
      "Goodyear welted leather sole with channeled stitching",
      "Gentleman's corner notch on inner heel"
    ]
  },

  // ============ ACCESSORIES (IDs 33 - 42) ============
  {
    id: 33,
    name: "Luxury Chronograph Watch",
    brand: "VELORA Collection",
    price: 1299.00,
    originalPrice: 1899.00,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&h=800&fit=crop&q=80"
    ],
    category: "Accessories",
    subCategory: "Watches",
    badge: "Luxury",
    isNew: false,
    isSale: true,
    sizes: ["One Size"],
    size: ["One Size"],
    colors: ["Silver", "Gold", "Black"],
    inStock: true,
    maxQuantity: 3,
    sku: "VEL-0033",
    description: "Swiss automatic movement chronograph housed in a 41mm 316L stainless steel case with anti-reflective sapphire crystal.",
    details: [
      "Swiss-made automatic mechanical chronograph movement",
      "41mm 316L surgical-grade stainless steel case",
      "Scratch-resistant sapphire crystal with AR coating",
      "Water-resistant up to 100 meters (10 ATM)"
    ]
  },
  {
    id: 34,
    name: "Designer Sunglasses",
    brand: "VELORA Collection",
    price: 289.00,
    originalPrice: 399.00,
    rating: 4.7,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop&q=80"
    ],
    category: "Accessories",
    subCategory: "Sunglasses",
    badge: "Trending",
    isNew: true,
    isSale: true,
    sizes: ["One Size"],
    size: ["One Size"],
    colors: ["Tortoise", "Black", "Gold"],
    inStock: true,
    maxQuantity: 8,
    sku: "VEL-0034",
    description: "Handcrafted Italian acetate frames featuring polarized mineral glass lenses with 100% UV400 protection.",
    details: [
      "Mazzucchelli handcrafted bio-acetate frames",
      "Polarized Category 3 mineral glass lenses",
      "Seven-barrel stainless steel hinges",
      "Includes protective leather case and microfiber cloth"
    ]
  },
  {
    id: 35,
    name: "Silk Scarf",
    brand: "VELORA Collection",
    price: 149.00,
    originalPrice: null,
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=800&fit=crop&q=80"
    ],
    category: "Accessories",
    subCategory: "Scarves",
    badge: "Essential",
    isNew: true,
    isSale: false,
    sizes: ["One Size"],
    size: ["One Size"],
    colors: ["Multi-Color", "Navy Gold", "Floral"],
    inStock: true,
    maxQuantity: 10,
    sku: "VEL-0035",
    description: "Square silk twill scarf decorated with an exclusive equestrian crest print, finished with hand-rolled borders.",
    details: [
      "100% pure silk twill (90x90cm)",
      "Exclusive illustrated heritage print",
      "Artisanal hand-rolled edges",
      "Made in Lyon, France"
    ]
  },
  {
    id: 36,
    name: "Leather Belt",
    brand: "VELORA Collection",
    price: 159.00,
    originalPrice: 229.00,
    rating: 4.6,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&q=80"
    ],
    category: "Accessories",
    subCategory: "Belts",
    badge: "Essential",
    isNew: false,
    isSale: true,
    sizes: ["30", "32", "34", "36", "38"],
    size: ["30", "32", "34", "36", "38"],
    colors: ["Black", "Brown"],
    inStock: true,
    maxQuantity: 10,
    sku: "VEL-0036",
    description: "Reversible full-grain leather belt featuring a swiveling polished chrome buckle for versatile styling.",
    details: [
      "Reversible black and cognac leather strap",
      "Quick-twist metal buckle mechanism",
      "Solid zinc alloy hardware with palladium plating",
      "Custom gift box packaging"
    ]
  },
  {
    id: 37,
    name: "Leather Wallet",
    brand: "VELORA Collection",
    price: 129.00,
    originalPrice: null,
    rating: 4.7,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop&q=80"
    ],
    category: "Accessories",
    subCategory: "Wallets",
    badge: "Essential",
    isNew: false,
    isSale: false,
    sizes: ["One Size"],
    size: ["One Size"],
    colors: ["Black", "Brown", "Navy"],
    inStock: true,
    maxQuantity: 12,
    sku: "VEL-0037",
    description: "Slim bifold wallet handcrafted in cross-grain Saffiano leather with built-in RFID blocking protection.",
    details: [
      "Durable scratch-resistant Saffiano leather",
      "8 card slots and dual currency compartments",
      "Certified RFID-blocking lining",
      "Ultra-slim 10mm profile"
    ]
  },
  {
    id: 38,
    name: "Diamond Stud Earrings",
    brand: "VELORA Collection",
    price: 2499.00,
    originalPrice: 3499.00,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop&q=80"
    ],
    category: "Accessories",
    subCategory: "Jewelry",
    badge: "Exclusive",
    isNew: true,
    isSale: true,
    sizes: ["One Size"],
    size: ["One Size"],
    colors: ["White Gold", "Yellow Gold", "Platinum"],
    inStock: true,
    maxQuantity: 2,
    sku: "VEL-0038",
    description: "Matched pair of 1.0 total carat weight brilliant-cut round diamonds set in four-prong 18k solid gold baskets.",
    details: [
      "1.00 ctw conflict-free lab diamonds (VS1 clarity, F color)",
      "18-karat solid white gold four-prong setting",
      "Secure double-notch friction post backs",
      "Includes IGI Certificate of Authenticity"
    ]
  },
  {
    id: 39,
    name: "Cashmere Beanie",
    brand: "VELORA Collection",
    price: 89.00,
    originalPrice: null,
    rating: 4.4,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&h=800&fit=crop&q=80"
    ],
    category: "Accessories",
    subCategory: "Hats",
    badge: "Winter",
    isNew: false,
    isSale: false,
    sizes: ["One Size"],
    size: ["One Size"],
    colors: ["Black", "Gray", "Navy"],
    inStock: true,
    maxQuantity: 15,
    sku: "VEL-0039",
    description: "Chunky ribbed knit watch cap spun from 100% pure cashmere for effortless winter warmth.",
    details: [
      "100% high-grade Mongolian cashmere",
      "Fold-over cuff for adjustable coverage",
      "Seamless circular knit design",
      "Naturally insulating and ultra-soft"
    ]
  },
  {
    id: 40,
    name: "Leather Gloves",
    brand: "VELORA Collection",
    price: 159.00,
    originalPrice: 229.00,
    rating: 4.6,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1516475429286-465d3151b66c?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1516475429286-465d3151b66c?w=600&h=800&fit=crop&q=80"
    ],
    category: "Accessories",
    subCategory: "Gloves",
    badge: "Winter",
    isNew: true,
    isSale: true,
    sizes: ["S", "M", "L"],
    size: ["S", "M", "L"],
    colors: ["Black", "Brown"],
    inStock: true,
    maxQuantity: 6,
    sku: "VEL-0040",
    description: "Soft nappa leather driving gloves lined with plush pure cashmere, with touchscreen-compatible fingertips.",
    details: [
      "Butter-soft Italian hairsheep leather",
      "100% cashmere interior knit lining",
      "Conductive touchscreen-friendly leather index fingers",
      "Elasticated palm vent for comfortable fit"
    ]
  },
  {
    id: 41,
    name: "Patterned Silk Tie",
    brand: "VELORA Collection",
    price: 89.00,
    originalPrice: null,
    rating: 4.5,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1589756823695-278bc923f962?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1589756823695-278bc923f962?w=600&h=800&fit=crop&q=80"
    ],
    category: "Accessories",
    subCategory: "Ties",
    badge: "Essential",
    isNew: false,
    isSale: false,
    sizes: ["One Size"],
    size: ["One Size"],
    colors: ["Navy Pattern", "Burgundy Dot", "Gold Paisley"],
    inStock: true,
    maxQuantity: 12,
    sku: "VEL-0041",
    description: "Seven-fold jacquard silk necktie with intricate micro-geometric weave and pure wool interlining.",
    details: [
      "100% Jacquard woven Italian silk",
      "Classic 8cm blade width",
      "Pure wool interlining for a perfect dimple knot",
      "Hand-sewn bar tack closures"
    ]
  },
  {
    id: 42,
    name: "Leather Backpack",
    brand: "VELORA Collection",
    price: 399.00,
    originalPrice: 549.00,
    rating: 4.7,
    reviews: 123,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop&q=80"
    ],
    category: "Accessories",
    subCategory: "Bags",
    badge: "New",
    isNew: true,
    isSale: true,
    sizes: ["One Size"],
    size: ["One Size"],
    colors: ["Black", "Cognac"],
    inStock: true,
    maxQuantity: 4,
    sku: "VEL-0042",
    description: "Sleek executive daypack crafted from pebbled calfskin with padded 16-inch laptop pocket and luggage pass-through strap.",
    details: [
      "Full-grain pebbled calf leather",
      "Padded compartment holds up to 16\" MacBook Pro",
      "Waterproof nylon interior lining",
      "Ergonomic padded leather shoulder straps"
    ]
  },

  // ============ SPORTSWEAR (IDs 43 - 46) ============
  {
    id: 43,
    name: "Premium Yoga Set",
    brand: "VELORA Collection",
    price: 159.00,
    originalPrice: 229.00,
    rating: 4.6,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=800&fit=crop&q=80"
    ],
    category: "Sportswear",
    subCategory: "Activewear",
    badge: "Trending",
    isNew: false,
    isSale: true,
    sizes: ["XS", "S", "M", "L"],
    size: ["XS", "S", "M", "L"],
    colors: ["Sage Green", "Charcoal", "Clay"],
    inStock: true,
    maxQuantity: 8,
    sku: "VEL-0043",
    description: "Seamless matching bra and high-rise legging set knitted with four-way stretch compressive compression fabric.",
    details: [
      "Seamless four-way micro-compression knit",
      "Squat-proof high-rise stay-put waistband",
      "Moisture-wicking with silver anti-odor technology",
      "Removable padded bra inserts"
    ]
  },
  {
    id: 44,
    name: "Running Jacket",
    brand: "VELORA Collection",
    price: 199.00,
    originalPrice: null,
    rating: 4.5,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop&q=80"
    ],
    category: "Sportswear",
    subCategory: "Outerwear",
    badge: "Sport",
    isNew: true,
    isSale: false,
    sizes: ["S", "M", "L", "XL"],
    size: ["S", "M", "L", "XL"],
    colors: ["Black", "Neon Yellow", "Cobalt"],
    inStock: true,
    maxQuantity: 6,
    sku: "VEL-0044",
    description: "Ultralight windproof running shell with 360-degree reflective accents and laser-cut underarm ventilation.",
    details: [
      "Windproof and rain-resistant ripstop shell",
      "Packs down completely into its own chest pocket",
      "360-degree high-visibility reflective elements",
      "Fitted hood that stays secure when sprinting"
    ]
  },
  {
    id: 45,
    name: "Gym Training Shorts",
    brand: "VELORA Collection",
    price: 79.00,
    originalPrice: null,
    rating: 4.4,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&h=800&fit=crop&q=80"
    ],
    category: "Sportswear",
    subCategory: "Shorts",
    badge: "Essential",
    isNew: false,
    isSale: false,
    sizes: ["S", "M", "L", "XL"],
    size: ["S", "M", "L", "XL"],
    colors: ["Black", "Heather Gray", "Navy"],
    inStock: true,
    maxQuantity: 10,
    sku: "VEL-0045",
    description: "Two-in-one 7-inch performance shorts featuring a compressive compression liner and secure zipper phone pocket.",
    details: [
      "Lightweight stretch woven outer shell",
      "Built-in compressive boxer-brief liner",
      "Bouncing-free bounce-proof phone pocket",
      "Drawcord waistband with towel loop"
    ]
  },
  {
    id: 46,
    name: "Sports Bra",
    brand: "VELORA Collection",
    price: 69.00,
    originalPrice: null,
    rating: 4.5,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=800&fit=crop&q=80"
    ],
    category: "Sportswear",
    subCategory: "Activewear",
    badge: "Essential",
    isNew: true,
    isSale: false,
    sizes: ["XS", "S", "M", "L"],
    size: ["XS", "S", "M", "L"],
    colors: ["Black", "White", "Plum"],
    inStock: true,
    maxQuantity: 12,
    sku: "VEL-0046",
    description: "Medium-support strappy back sports bra with second-skin feel and moisture-wicking quick-dry fabric.",
    details: [
      "Sweat-wicking and quick-drying nylon-spandex blend",
      "Criss-cross back straps for free shoulder mobility",
      "Comfort band under bust that doesn't dig in",
      "Breathable mesh interior lining"
    ]
  },

  // ============ KIDS FASHION (IDs 47 - 50) ============
  {
    id: 47,
    name: "Kids Designer Dress",
    brand: "VELORA Collection",
    price: 129.00,
    originalPrice: null,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=800&fit=crop&q=80"
    ],
    category: "Kids Fashion",
    subCategory: "Dresses",
    badge: "Cute",
    isNew: true,
    isSale: false,
    sizes: ["2T", "3T", "4T", "5T", "6"],
    size: ["2T", "3T", "4T", "5T", "6"],
    colors: ["Pink", "White", "Blue"],
    inStock: true,
    maxQuantity: 6,
    sku: "VEL-0047",
    description: "Sweet cotton voile tiered dress with flutter cap sleeves and delicate broderie anglaise embroidery.",
    details: [
      "100% ultra-soft gentle organic cotton",
      "Breathable 100% cotton voile lining",
      "Flutter cap sleeves with scalloped lace",
      "Back button closure with keyhole"
    ]
  },
  {
    id: 48,
    name: "Kids Sneakers",
    brand: "VELORA Collection",
    price: 99.00,
    originalPrice: null,
    rating: 4.6,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop&q=80"
    ],
    category: "Kids Fashion",
    subCategory: "Footwear",
    badge: "Popular",
    isNew: false,
    isSale: false,
    sizes: ["10K", "11K", "12K", "13K", "1Y", "2Y"],
    size: ["10K", "11K", "12K", "13K", "1Y", "2Y"],
    colors: ["White/Red", "Navy", "All White"],
    inStock: true,
    maxQuantity: 8,
    sku: "VEL-0048",
    description: "Durable kid-proof leather sneakers with easy hook-and-loop velcro straps and non-marking rubber outsoles.",
    details: [
      "Scuff-resistant genuine leather upper",
      "Dual hook-and-loop velcro straps for easy on/off",
      "Padded collar and tongue for gentle comfort",
      "Non-marking natural rubber tread outsole"
    ]
  },
  {
    id: 49,
    name: "Kids Winter Jacket",
    brand: "VELORA Collection",
    price: 159.00,
    originalPrice: 229.00,
    rating: 4.7,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop&q=80"
    ],
    category: "Kids Fashion",
    subCategory: "Outerwear",
    badge: "Winter",
    isNew: true,
    isSale: true,
    sizes: ["3T", "4T", "5T", "6", "7"],
    size: ["3T", "4T", "5T", "6", "7"],
    colors: ["Navy", "Yellow", "Olive"],
    inStock: true,
    maxQuantity: 5,
    sku: "VEL-0049",
    description: "High-loft synthetic down jacket with wind-stopping storm hood and reflective sleeve stripes.",
    details: [
      "Water-repellent durable outer fabric",
      "Thermal high-loft cruelty-free insulation",
      "Cozy micro-fleece hood and body lining",
      "Storm cuffs to seal out cold wind"
    ]
  },
  {
    id: 50,
    name: "Kids Polo Shirt",
    brand: "VELORA Collection",
    price: 59.00,
    originalPrice: null,
    rating: 4.4,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=800&fit=crop&q=80"
    ],
    category: "Kids Fashion",
    subCategory: "Tops",
    badge: "Essential",
    isNew: false,
    isSale: false,
    sizes: ["2T", "3T", "4T", "5T"],
    size: ["2T", "3T", "4T", "5T"],
    colors: ["White", "Navy", "Red"],
    inStock: true,
    maxQuantity: 10,
    sku: "VEL-0050",
    description: "Classic kids polo shirt made from 100% breathable cotton pique, designed for school days and active play.",
    details: [
      "100% breathable organic cotton pique",
      "Tag-free neckline to prevent skin irritation",
      "Two-button reinforced front placket",
      "Pre-shrunk to retain shape wash after wash"
    ]
  },
  {
    id: 51,
    name: "Leather Dress Shoes",
    brand: "VELORA Collection",
    price: 459.00,
    originalPrice: 659.00,
    rating: 4.9,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop&q=80"
    ],
    category: "Footwear",
    subCategory: "Dress Shoes",
    badge: "Best Seller",
    isNew: false,
    isSale: true,
    sizes: ["8", "9", "10", "11", "12"],
    size: ["8", "9", "10", "11", "12"],
    colors: ["Brown", "Black"],
    inStock: true,
    maxQuantity: 5,
    sku: "VEL-0051",
    description: "Handcrafted Italian leather dress boots engineered with Goodyear welted outsoles and burnished finish.",
    details: [
      "Full-grain hand-burnished calfskin leather",
      "Traditional Goodyear welted sole",
      "Cushioned leather insole with arch support",
      "Handcrafted in Italy"
    ]
  },
  {
    id: 52,
    name: "Silk Pocket Square",
    brand: "VELORA Collection",
    price: 89.00,
    originalPrice: null,
    rating: 4.7,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop&q=80"
    ],
    category: "Accessories",
    subCategory: "Pocket Squares",
    badge: "Essential",
    isNew: true,
    isSale: false,
    sizes: ["One Size"],
    size: ["One Size"],
    colors: ["Blue Motif", "Navy", "Burgundy"],
    inStock: true,
    maxQuantity: 10,
    sku: "VEL-0052",
    description: "Finely woven mulberry silk pocket square featuring hand-rolled edges, adding refined elegance to any jacket.",
    details: [
      "100% pure Mulberry silk twill",
      "Hand-rolled and hand-sewn borders",
      "Dimensions: 33cm x 33cm (13 x 13 in)",
      "Dry clean only"
    ]
  }
];

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