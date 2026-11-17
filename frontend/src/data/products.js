// Centralized Products Database (Single Source of Truth)
import { DRESS_IMAGES } from "./dressImages.js";

const INITIAL_PRODUCTS = [
  {
    "id": 62,
    "name": "Classic Oxford Long-Sleeve Shirt",
    "brand": "VELORA Collection",
    "price": 6.5,
    "originalPrice": 8.5,
    "rating": 4.9,
    "reviews": 142,
    "image": "/images/products/shirt-sky-blue.jpg",
    "images": [
      "/images/products/shirt-sky-blue.jpg",
      "/images/products/shirt-sky-blue-back.jpg",
      "/images/products/shirt-white-oxford.jpg",
      "/images/products/shirt-navy-blue.jpg",
      "/images/products/shirt-slate-grey.jpg"
    ],
    "colorImages": {
      "Sky Blue": "/images/products/shirt-sky-blue.jpg",
      "White": "/images/products/shirt-white-oxford.jpg",
      "Navy": "/images/products/shirt-navy-blue.jpg",
      "Slate Grey": "/images/products/shirt-slate-grey.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Shirts",
    "badge": "Trending",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Sky Blue",
      "White",
      "Navy",
      "Slate Grey"
    ],
    "inStock": true,
    "stock": 15,
    "maxQuantity": 15,
    "sku": "VEL-0062",
    "description": "Crafted from 100% premium long-staple cotton, this timeless long-sleeve shirt offers an effortless balance between formal polish and casual comfort. Featuring a structured collar, chest pocket, and refined tailored silhouette.",
    "details": [
      "100% premium breathable combed cotton",
      "Available in 4 essential colors: Sky Blue, Crisp White, Navy Blue, and Slate Grey",
      "Buttoned barrel cuffs with contrast inner trim",
      "Tailored fit with curved hem suitable for tucking or untucked wear"
    ]
  },
  {
    "id": 64,
    "name": "Crisp Oxford Cotton Dress Shirt",
    "brand": "VELORA Collection",
    "price": 6,
    "originalPrice": 8,
    "rating": 4.9,
    "reviews": 168,
    "image": "/images/products/shirt-white-oxford.jpg",
    "images": [
      "/images/products/shirt-white-oxford.jpg"
    ],
    "colorImages": {
      "White": "/images/products/shirt-white-oxford.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Shirts",
    "badge": "Essential",
    "isNew": true,
    "isSale": false,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "White"
    ],
    "inStock": true,
    "stock": 20,
    "maxQuantity": 20,
    "sku": "VEL-0064",
    "description": "The quintessential wardrobe staple. Pure white Oxford cotton shirt with button-down collar, durable mother-of-pearl buttons, and impeccable tailored drape.",
    "details": [
      "Heavyweight Oxford weave 100% cotton",
      "Button-down collar that stays crisp throughout the day",
      "Front chest pocket and box pleat for ease of movement",
      "Easy-iron finish for effortless daily maintenance"
    ]
  },
  {
    "id": 65,
    "name": "Tailored Slim Fit Dress Shirt",
    "brand": "VELORA Collection",
    "price": 6.5,
    "originalPrice": 8.5,
    "rating": 4.9,
    "reviews": 114,
    "image": "/images/products/shirt-navy-blue.jpg",
    "images": [
      "/images/products/shirt-navy-blue.jpg"
    ],
    "colorImages": {
      "Navy": "/images/products/shirt-navy-blue.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Shirts",
    "badge": "Premium",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Navy"
    ],
    "inStock": true,
    "stock": 12,
    "maxQuantity": 12,
    "sku": "VEL-0065",
    "description": "Sophisticated deep navy dress shirt designed with a sharp modern fit. Sleek tonal buttons and clean front deliver an elevated aesthetic for evenings and business settings.",
    "details": [
      "Smooth high-thread-count cotton blend with slight stretch",
      "Deep navy colorway resistant to fading",
      "Structured spread collar with back darts for a sculpted silhouette",
      "Seamless clean-finish seams"
    ]
  },
  {
    "id": 66,
    "name": "Washed Cotton Utility Overshirt",
    "brand": "VELORA Collection",
    "price": 7.5,
    "originalPrice": 9.5,
    "rating": 4.8,
    "reviews": 88,
    "image": "/images/products/shirt-slate-grey.jpg",
    "images": [
      "/images/products/shirt-slate-grey.jpg"
    ],
    "colorImages": {
      "Slate Grey": "/images/products/shirt-slate-grey.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Shirts",
    "badge": "New Arrival",
    "isNew": true,
    "isSale": false,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Slate Grey"
    ],
    "inStock": true,
    "stock": 14,
    "maxQuantity": 14,
    "sku": "VEL-0066",
    "description": "Rugged yet refined, this washed slate grey overshirt features a vintage garment-washed patina, durable midweight cotton twill, and a utility chest pocket.",
    "details": [
      "Midweight 100% garment-dyed cotton twill",
      "Vintage garment wash with subtle washed fade",
      "Reinforced workwear stitching and utility chest pocket",
      "Wear open as a lightweight jacket or buttoned as a statement shirt"
    ]
  },
  {
    "id": 67,
    "name": "Essential Black Crewneck Tees (2-Pack)",
    "brand": "VELORA Basics",
    "price": 4.5,
    "originalPrice": 6,
    "rating": 4.9,
    "reviews": 154,
    "image": "/images/products/tee-black-2pack.png",
    "images": [
      "/images/products/tee-black-2pack.png"
    ],
    "colorImages": {
      "Black": "/images/products/tee-black-2pack.png"
    },
    "category": "Men's Fashion",
    "subCategory": "Tops",
    "badge": "Best Seller",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black"
    ],
    "inStock": true,
    "stock": 25,
    "maxQuantity": 25,
    "sku": "VEL-0067",
    "description": "A value pack of two ultra-soft, breathable combed cotton crewneck t-shirts. Engineered with reinforced seams and pre-shrunk fabric for lasting comfort and shape retention.",
    "details": [
      "Pack of 2 premium black crewneck t-shirts",
      "100% combed ringspun cotton for all-day comfort",
      "Ribbed collar with shape-stay neck tape",
      "Machine wash cold, tumble dry low"
    ]
  },
  {
    "id": 68,
    "name": "Two-Tone Raglan Baseball Long-Sleeve Tee",
    "brand": "VELORA Collection",
    "price": 4,
    "originalPrice": 5.5,
    "rating": 4.8,
    "reviews": 92,
    "image": "/images/products/tee-raglan-burgundy.png",
    "images": [
      "/images/products/tee-raglan-burgundy.png",
      "/images/products/tee-raglan-burgundy-back.jpg"
    ],
    "colorImages": {
      "Burgundy": "/images/products/tee-raglan-burgundy.png"
    },
    "category": "Men's Fashion",
    "subCategory": "Tops",
    "badge": "Trending",
    "isNew": true,
    "isSale": false,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Burgundy",
      "White"
    ],
    "inStock": true,
    "stock": 18,
    "maxQuantity": 18,
    "sku": "VEL-0068",
    "description": "Classic retro athletic style featuring deep burgundy raglan sleeves and an off-white cotton core. Designed for easy layering and casual everyday wear.",
    "details": [
      "Vintage-inspired contrast raglan sleeve cut",
      "Soft breathable combed cotton jersey",
      "Overlock durable stitching on sleeves and hem",
      "Comfort stretch crew collar"
    ]
  },
  {
    "id": 69,
    "name": "Sky Blue Striped Button-Down Casual Shirt",
    "brand": "VELORA Collection",
    "price": 6,
    "originalPrice": 8,
    "rating": 4.9,
    "reviews": 110,
    "image": "/images/products/shirt-striped-blue-white.png",
    "images": [
      "/images/products/shirt-striped-blue-white.png"
    ],
    "colorImages": {
      "Blue": "/images/products/shirt-striped-blue-white.png"
    },
    "category": "Men's Fashion",
    "subCategory": "Shirts",
    "badge": "Popular",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Blue",
      "White"
    ],
    "inStock": true,
    "stock": 20,
    "maxQuantity": 20,
    "sku": "VEL-0069",
    "description": "Refined vertical striped long-sleeve button-down shirt. Clean collar, pearlized buttons, and breathable lightweight poplin cotton make it ideal for office or weekend wear.",
    "details": [
      "100% fine yarn cotton poplin",
      "Vertical fine pinstripe pattern in sky blue & crisp white",
      "Point collar and adjustable buttoned cuffs",
      "Regular modern fit suitable for tucking or untucked"
    ]
  },
  {
    "id": 70,
    "name": "Heavyweight Boxy Black Crewneck T-Shirt",
    "brand": "VELORA Basics",
    "price": 3.5,
    "originalPrice": 5,
    "rating": 4.8,
    "reviews": 135,
    "image": "/images/products/tee-black-crewneck.jpg",
    "images": [
      "/images/products/tee-black-crewneck.jpg"
    ],
    "colorImages": {
      "Black": "/images/products/tee-black-crewneck.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Tops",
    "badge": "Essential",
    "isNew": true,
    "isSale": false,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black"
    ],
    "inStock": true,
    "stock": 30,
    "maxQuantity": 30,
    "sku": "VEL-0070",
    "description": "A structured, heavyweight 220 GSM cotton t-shirt with a relaxed boxy cut and a thick ribbed crewneck. Designed to hold its silhouette wash after wash.",
    "details": [
      "220 GSM heavyweight combed cotton",
      "Reinforced drop shoulder seams",
      "Pre-washed to resist shrinkage and color fading",
      "Clean minimal aesthetic with zero side twisting"
    ]
  },
  {
    "id": 71,
    "name": "Classic Pique Knit Short-Sleeve Polo Shirt",
    "brand": "VELORA Collection",
    "price": 5,
    "originalPrice": 7,
    "rating": 4.9,
    "reviews": 88,
    "image": "/images/products/polo-white-pique.png",
    "images": [
      "/images/products/polo-white-pique.png"
    ],
    "colorImages": {
      "White": "/images/products/polo-white-pique.png"
    },
    "category": "Men's Fashion",
    "subCategory": "Tops",
    "badge": "Best Seller",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "White"
    ],
    "inStock": true,
    "stock": 22,
    "maxQuantity": 22,
    "sku": "VEL-0071",
    "description": "Crisp white pique cotton polo shirt featuring a ribbed collar, two-button placket, and side-vent hem. The perfect smart-casual choice for any occasion.",
    "details": [
      "100% breathable honeycomb pique cotton",
      "Ribbed knit collar and matching sleeve cuffs",
      "Mother-of-pearl effect buttons",
      "Split side vents for unrestricted movement"
    ]
  },
  {
    "id": 72,
    "name": "Premium Fleece Pullover Hoodie",
    "brand": "VELORA Streetwear",
    "price": 8.5,
    "originalPrice": 10,
    "rating": 4.9,
    "reviews": 147,
    "image": "/images/products/hoodie-white-fleece.png",
    "images": [
      "/images/products/hoodie-white-fleece.png"
    ],
    "colorImages": {
      "White": "/images/products/hoodie-white-fleece.png"
    },
    "category": "Men's Fashion",
    "subCategory": "Outerwear",
    "badge": "Trending",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "White"
    ],
    "inStock": true,
    "stock": 15,
    "maxQuantity": 15,
    "sku": "VEL-0072",
    "description": "Plush, heavy-gauge fleece pullover hoodie with a double-layered hood, matching tonal drawstrings, and a spacious front kangaroo pouch pocket.",
    "details": [
      "380 GSM brushed fleece cotton blend",
      "Spacious double-layer drawstring hood",
      "Kangaroo pocket with reinforced bartack corners",
      "Heavyweight ribbed cuffs and waistband"
    ]
  },
  {
    "id": 73,
    "name": "Outclass Solid Light Blue Oxford Dress Shirt",
    "brand": "VELORA Collection",
    "price": 6.5,
    "originalPrice": 8.5,
    "rating": 4.9,
    "reviews": 162,
    "image": "/images/products/shirt-oxford-sky-blue.jpg",
    "images": [
      "/images/products/shirt-oxford-sky-blue.jpg"
    ],
    "colorImages": {
      "Blue": "/images/products/shirt-oxford-sky-blue.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Shirts",
    "badge": "Popular",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Blue"
    ],
    "inStock": true,
    "stock": 19,
    "maxQuantity": 19,
    "sku": "VEL-0073",
    "description": "An iconic light blue Oxford button-down shirt made from durable basketweave cotton. Features a chest pocket, curved hem, and refined collar roll.",
    "details": [
      "100% long-staple basketweave Oxford cotton",
      "Button-down collar with clean architectural roll",
      "Single chest pocket with double-needle topstitching",
      "Easy-care, crease-resistant finish"
    ]
  },
  {
    "id": 74,
    "name": "Vintage Wash Blue Denim Trucker Jacket",
    "brand": "VELORA Denim",
    "price": 9.5,
    "originalPrice": 10,
    "rating": 4.9,
    "reviews": 203,
    "image": "/images/products/jacket-denim-trucker.jpg",
    "images": [
      "/images/products/jacket-denim-trucker.jpg"
    ],
    "colorImages": {
      "Blue": "/images/products/jacket-denim-trucker.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Jackets",
    "badge": "Best Seller",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Blue"
    ],
    "inStock": true,
    "stock": 14,
    "maxQuantity": 14,
    "sku": "VEL-0074",
    "description": "A timeless denim trucker jacket with vintage stonewashing, brass shank buttons, dual chest flap pockets, and side welt hand pockets.",
    "details": [
      "13 oz 100% durable cotton denim",
      "Vintage stonewash with natural authentic fading",
      "Embossed metal shank button hardware",
      "Dual chest flap pockets and deep side hand pockets"
    ]
  },
  {
    "id": 75,
    "name": "Classic Straight-Leg Vintage Denim Jeans",
    "brand": "VELORA Denim",
    "price": 8,
    "originalPrice": 10,
    "rating": 4.8,
    "reviews": 178,
    "image": "/images/products/jeans-blue-denim.jpg",
    "images": [
      "/images/products/jeans-blue-denim.jpg"
    ],
    "colorImages": {
      "Blue": "/images/products/jeans-blue-denim.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Denim",
    "badge": "Essential",
    "isNew": true,
    "isSale": false,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Blue"
    ],
    "inStock": true,
    "stock": 24,
    "maxQuantity": 24,
    "sku": "VEL-0075",
    "description": "Classic mid-rise straight-leg jeans in a versatile medium blue wash with subtle whiskering and durable copper rivet detailing.",
    "details": [
      "99% cotton, 1% elastane for flexible comfort stretch",
      "5-pocket styling with heavy-duty YKK zip fly",
      "Reinforced belt loops and authentic copper rivet hardware",
      "Mid-rise regular straight leg fit"
    ]
  },
  {
    "id": 76,
    "name": "Multi-Pocket Tactical Cargo Shorts",
    "brand": "VELORA Outdoor",
    "price": 4.5,
    "originalPrice": 6.5,
    "rating": 4.8,
    "reviews": 95,
    "image": "/images/products/shorts-cargo-khaki.jpg",
    "images": [
      "/images/products/shorts-cargo-khaki.jpg"
    ],
    "colorImages": {
      "Khaki": "/images/products/shorts-cargo-khaki.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Pants",
    "badge": "Popular",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Khaki",
      "Tan"
    ],
    "inStock": true,
    "stock": 20,
    "maxQuantity": 20,
    "sku": "VEL-0076",
    "description": "Durable ripstop cotton cargo shorts with multiple utility flap pockets, secure snap closures, and a comfortable relaxed cut for warm days.",
    "details": [
      "Durable 100% cotton ripstop weave",
      "6-pocket utility cargo layout with snap flaps",
      "Reinforced seat and pocket corners",
      "10-inch inseam hitting right above the knee"
    ]
  },
  {
    "id": 77,
    "name": "Slim-Fit Stretch Cotton Chino Pants",
    "brand": "VELORA Collection",
    "price": 7,
    "originalPrice": 9,
    "rating": 4.9,
    "reviews": 142,
    "image": "/images/products/pants-chino-khaki.jpg",
    "images": [
      "/images/products/pants-chino-khaki.jpg"
    ],
    "colorImages": {
      "Khaki": "/images/products/pants-chino-khaki.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Pants",
    "badge": "Trending",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Khaki",
      "Beige"
    ],
    "inStock": true,
    "stock": 22,
    "maxQuantity": 22,
    "sku": "VEL-0077",
    "description": "Versatile camel/khaki stretch chino pants cut in a modern slim profile. Finished with clean slant front pockets and buttoned rear welt pockets.",
    "details": [
      "98% combed cotton twill, 2% spandex for all-day comfort",
      "Flat-front design with clean pressed line",
      "Zip fly with horn button closure",
      "Breathable for work, dining, and casual outings"
    ]
  },
  {
    "id": 78,
    "name": "Fleece Cuffed Athletic Jogger Pants",
    "brand": "VELORA Sport",
    "price": 6,
    "originalPrice": 8,
    "rating": 4.8,
    "reviews": 124,
    "image": "/images/products/sweatpants-grey-jogger.jpg",
    "images": [
      "/images/products/sweatpants-grey-jogger.jpg"
    ],
    "colorImages": {
      "Gray": "/images/products/sweatpants-grey-jogger.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Pants",
    "badge": "Best Seller",
    "isNew": true,
    "isSale": false,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Gray"
    ],
    "inStock": true,
    "stock": 25,
    "maxQuantity": 25,
    "sku": "VEL-0078",
    "description": "Ultra-comfy heather grey brushed fleece sweatpants with an elastic drawstring waistband, deep side pockets, and snug ribbed ankle cuffs.",
    "details": [
      "Heather grey cotton-poly fleece blend with soft brushed lining",
      "Encased elastic waistband with metal-tipped drawcord",
      "Tapered leg with ribbed ankle cuffs",
      "Deep side slash pockets and rear patch pocket"
    ]
  },
  {
    "id": 79,
    "name": "Minimalist French Terry Crewneck Sweatshirt",
    "brand": "VELORA Basics",
    "price": 7.5,
    "originalPrice": 9.5,
    "rating": 4.8,
    "reviews": 106,
    "image": "/images/products/sweatshirt-black-crewneck.jpg",
    "images": [
      "/images/products/sweatshirt-black-crewneck.jpg"
    ],
    "colorImages": {
      "Black": "/images/products/sweatshirt-black-crewneck.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Outerwear",
    "badge": "Essential",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black"
    ],
    "inStock": true,
    "stock": 18,
    "maxQuantity": 18,
    "sku": "VEL-0079",
    "description": "Clean black French terry crewneck sweatshirt. Features raglan-style shoulder seams, ribbed collar, cuffs, and hem for an effortless modern look.",
    "details": [
      "100% premium French terry loopback cotton",
      "Ribbed crew neck with classic triangle stitch",
      "Clean tonal flatlock seams throughout",
      "Relaxed modern fit for versatile layering"
    ]
  },
  {
    "id": 80,
    "name": "Cuban Camp Collar Short-Sleeve Resort Shirt",
    "brand": "VELORA Collection",
    "price": 5.5,
    "originalPrice": 7.5,
    "rating": 4.9,
    "reviews": 118,
    "image": "/images/products/shirt-black-camp-collar.jpg",
    "images": [
      "/images/products/shirt-black-camp-collar.jpg"
    ],
    "colorImages": {
      "Black": "/images/products/shirt-black-camp-collar.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Shirts",
    "badge": "Trending",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black"
    ],
    "inStock": true,
    "stock": 20,
    "maxQuantity": 20,
    "sku": "VEL-0080",
    "description": "Lightweight matte black camp collar shirt with contrast white buttons and relaxed short sleeves. Perfect for summer evenings and modern styling.",
    "details": [
      "Lightweight breathable rayon-cotton blend",
      "Open Cuban camp collar",
      "Straight-cut hem designed to be worn untucked",
      "High-contrast white mother-of-pearl buttons"
    ]
  },
  {
    "id": 81,
    "name": "Vintage Melange Charcoal Crewneck T-Shirt",
    "brand": "VELORA Basics",
    "price": 3.5,
    "originalPrice": 5,
    "rating": 4.8,
    "reviews": 89,
    "image": "/images/products/tee-charcoal-melange.png",
    "images": [
      "/images/products/tee-charcoal-melange.png"
    ],
    "colorImages": {
      "Charcoal": "/images/products/tee-charcoal-melange.png"
    },
    "category": "Men's Fashion",
    "subCategory": "Tops",
    "badge": "New Arrival",
    "isNew": true,
    "isSale": false,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Charcoal",
      "Gray"
    ],
    "inStock": true,
    "stock": 24,
    "maxQuantity": 24,
    "sku": "VEL-0081",
    "description": "Garment-washed charcoal grey melange t-shirt with a soft hand-feel and flattering tailored silhouette.",
    "details": [
      "Fine-gauge heather melange cotton yarn",
      "Pre-washed vintage patina finish",
      "Self-fabric reinforced collar tape",
      "Regular comfort fit with smooth drape"
    ]
  },
  {
    "id": 82,
    "name": "Everyday Multi-Color Crewneck Tees (5-Pack)",
    "brand": "VELORA Basics",
    "price": 8.5,
    "originalPrice": 10,
    "rating": 4.9,
    "reviews": 240,
    "image": "/images/products/tee-multi-color-pack.jpg",
    "images": [
      "/images/products/tee-multi-color-pack.jpg"
    ],
    "colorImages": {
      "Multi": "/images/products/tee-multi-color-pack.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Tops",
    "badge": "Best Value",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Blue",
      "White",
      "Navy",
      "Gray",
      "Charcoal"
    ],
    "inStock": true,
    "stock": 30,
    "maxQuantity": 30,
    "sku": "VEL-0082",
    "description": "Ultimate capsule 5-pack of everyday cotton crewneck tees in essential shades: Slate Blue, Crisp White, Sky Blue, Charcoal, and Navy.",
    "details": [
      "Bundle of 5 assorted classic crewneck t-shirts",
      "100% ringspun combed cotton",
      "Reinforced neck ribbing and curved tail hem",
      "Excellent colorfastness wash after wash"
    ]
  },
  {
    "id": 83,
    "name": "Minimalist Embroidered Chest Logo Tee",
    "brand": "VELORA Streetwear",
    "price": 3.5,
    "originalPrice": 5,
    "rating": 4.7,
    "reviews": 74,
    "image": "/images/products/tee-white-minimal-logo.png",
    "images": [
      "/images/products/tee-white-minimal-logo.png"
    ],
    "colorImages": {
      "White": "/images/products/tee-white-minimal-logo.png"
    },
    "category": "Men's Fashion",
    "subCategory": "Tops",
    "badge": "New Arrival",
    "isNew": true,
    "isSale": false,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "White"
    ],
    "inStock": true,
    "stock": 22,
    "maxQuantity": 22,
    "sku": "VEL-0083",
    "description": "Clean off-white graphic tee featuring a tasteful micro embroidery badge on the left chest. Soft, lightweight cotton for effortless everyday streetwear.",
    "details": [
      "100% organic soft cotton jersey",
      "High-density monochrome chest embroidery",
      "Drop shoulder relaxed silhouette",
      "Ribbed crew collar that keeps its shape"
    ]
  },
  {
    "id": 84,
    "name": "Streetwear Wide-Leg Piping Cargo Pants",
    "brand": "VELORA Streetwear",
    "price": 8,
    "originalPrice": 10,
    "rating": 4.9,
    "reviews": 165,
    "image": "/images/products/pants-streetwear-cargo-black.jpg",
    "images": [
      "/images/products/pants-streetwear-cargo-black.jpg"
    ],
    "colorImages": {
      "Black": "/images/products/pants-streetwear-cargo-black.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Pants",
    "badge": "Trending",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black"
    ],
    "inStock": true,
    "stock": 16,
    "maxQuantity": 16,
    "sku": "VEL-0084",
    "description": "Modern wide-leg skate cargo pants in jet black with dynamic contrast white piping, side cargo pockets, and adjustable toggles at cuffs.",
    "details": [
      "Matte technical nylon-cotton blend",
      "Reflective-edge contrast curved piping",
      "Bellowed dual side cargo pockets",
      "Bungee cord adjustable ankle cuffs"
    ]
  },
  {
    "id": 85,
    "name": "Tactical Vintage Washed Cargo Pants",
    "brand": "VELORA Outdoor",
    "price": 7.5,
    "originalPrice": 9.5,
    "rating": 4.8,
    "reviews": 132,
    "image": "/images/products/pants-vintage-cargo-khaki.jpg",
    "images": [
      "/images/products/pants-vintage-cargo-khaki.jpg"
    ],
    "colorImages": {
      "Khaki": "/images/products/pants-vintage-cargo-khaki.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Pants",
    "badge": "Popular",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Khaki",
      "Tan"
    ],
    "inStock": true,
    "stock": 18,
    "maxQuantity": 18,
    "sku": "VEL-0085",
    "description": "Authentic military-inspired cargo pants with drawstring waist ties, deep pleated leg pockets, distressed wash finish, and reinforced knee panels.",
    "details": [
      "Heavyweight 100% vintage-washed cotton",
      "Internal drawcord waistband and cuff ties",
      "Dual expandable flap cargo pockets",
      "Articulated knee seams for durability"
    ]
  },
  {
    "id": 86,
    "name": "Relaxed Fit Pleated Cotton Chinos",
    "brand": "VELORA Collection",
    "price": 7,
    "originalPrice": 9,
    "rating": 4.9,
    "reviews": 98,
    "image": "/images/products/pants-relaxed-ecru-chino.jpg",
    "images": [
      "/images/products/pants-relaxed-ecru-chino.jpg"
    ],
    "colorImages": {
      "Beige": "/images/products/pants-relaxed-ecru-chino.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Pants",
    "badge": "Trending",
    "isNew": true,
    "isSale": false,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "inStock": true,
    "stock": 15,
    "maxQuantity": 15,
    "sku": "VEL-0086",
    "description": "Ecru / off-white wide pleated chinos with tailored drape. Pairs effortlessly with loafers or sneakers for a contemporary European silhouette.",
    "details": [
      "100% crisp cotton twill",
      "Single front pleat styling",
      "Belt loops and welt back pockets",
      "Relaxed straight drape from hip to hem"
    ]
  },
  {
    "id": 87,
    "name": "Classic Tailored Straight Dress Trousers",
    "brand": "VELORA Collection",
    "price": 6.5,
    "originalPrice": 8.5,
    "rating": 4.8,
    "reviews": 87,
    "image": "/images/products/pants-tailored-grey-chino.jpg",
    "images": [
      "/images/products/pants-tailored-grey-chino.jpg"
    ],
    "colorImages": {
      "Gray": "/images/products/pants-tailored-grey-chino.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Pants",
    "badge": "Essential",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Gray"
    ],
    "inStock": true,
    "stock": 20,
    "maxQuantity": 20,
    "sku": "VEL-0087",
    "description": "Light grey straight-leg dress trousers featuring crisp pressed creases, subtle stretch, and refined concealed hook-and-bar closure.",
    "details": [
      "Wrinkle-resistant poly-rayon stretch weave",
      "Tailored straight leg fit",
      "Discreet side slash pockets and rear button pockets",
      "Clean pressed front crease"
    ]
  },
  {
    "id": 88,
    "name": "Smart Slim-Fit Stretch Black Trousers",
    "brand": "VELORA Collection",
    "price": 6.5,
    "originalPrice": 8.5,
    "rating": 4.9,
    "reviews": 145,
    "image": "/images/products/pants-slim-black-trouser.jpg",
    "images": [
      "/images/products/pants-slim-black-trouser.jpg"
    ],
    "colorImages": {
      "Black": "/images/products/pants-slim-black-trouser.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Pants",
    "badge": "Best Seller",
    "isNew": true,
    "isSale": false,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black"
    ],
    "inStock": true,
    "stock": 24,
    "maxQuantity": 24,
    "sku": "VEL-0088",
    "description": "Sleek jet-black slim-fit trousers designed for work or formal events. Offers 4-way stretch comfort while holding a sharp, modern line.",
    "details": [
      "4-way stretch tailored tech fabric",
      "Slim silhouette through thigh and leg opening",
      "Side slant pockets and dual rear pockets",
      "Machine washable easy-care fabric"
    ]
  },
  {
    "id": 89,
    "name": "Performance Commuter Stretch Chino",
    "brand": "VELORA Collection",
    "price": 7,
    "originalPrice": 9,
    "rating": 4.8,
    "reviews": 112,
    "image": "/images/products/pants-commuter-khaki.jpg",
    "images": [
      "/images/products/pants-commuter-khaki.jpg"
    ],
    "colorImages": {
      "Khaki": "/images/products/pants-commuter-khaki.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Pants",
    "badge": "Popular",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Khaki",
      "Tan"
    ],
    "inStock": true,
    "stock": 20,
    "maxQuantity": 20,
    "sku": "VEL-0089",
    "description": "Tan khaki commuter chinos featuring technical stretch fabric, water-resistant finish, and an athletic tailored fit built for daily movement.",
    "details": [
      "Breathable moisture-wicking stretch twill",
      "Hidden zip security pocket",
      "Gusseted crotch for unrestricted motion",
      "Tapered ankle cut"
    ]
  },
  {
    "id": 90,
    "name": "Vibrant Yellow Floral Belted Retro Dress",
    "brand": "VELORA Femme",
    "price": 8.5,
    "originalPrice": 10,
    "rating": 4.9,
    "reviews": 118,
    "image": "/images/products/dress-yellow-floral-belted.jpg",
    "images": [
      "/images/products/dress-yellow-floral-belted.jpg"
    ],
    "colorImages": {
      "Yellow": "/images/products/dress-yellow-floral-belted.jpg"
    },
    "category": "Women's Fashion",
    "subCategory": "Dresses",
    "badge": "Best Seller",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Yellow"
    ],
    "inStock": true,
    "stock": 16,
    "maxQuantity": 16,
    "sku": "VEL-0090",
    "description": "Eye-catching retro A-line dress featuring bold blooming floral motifs in sunny yellow and white, complete with a high-shine black buckle belt.",
    "details": [
      "Vibrant pop-art floral print on smooth cotton sateen",
      "Flattering strapless sweetheart neckline with structured boning",
      "Includes detachable high-gloss patent belt with buckle",
      "Full flared skirt with concealed back zip closure"
    ]
  },
  {
    "id": 91,
    "name": "Bohemian Tiered Lace Halter Maxi Dress",
    "brand": "VELORA Femme",
    "price": 9,
    "originalPrice": 10,
    "rating": 4.9,
    "reviews": 142,
    "image": "/images/products/dress-blue-lace-maxi.jpg",
    "images": [
      "/images/products/dress-blue-lace-maxi.jpg"
    ],
    "colorImages": {
      "Blue": "/images/products/dress-blue-lace-maxi.jpg"
    },
    "category": "Women's Fashion",
    "subCategory": "Dresses",
    "badge": "Trending",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Blue"
    ],
    "inStock": true,
    "stock": 14,
    "maxQuantity": 14,
    "sku": "VEL-0091",
    "description": "Breezy azure blue maxi sundress featuring delicate lace insert panels, a tie-neck halter silhouette, and cascading ruffled tiers.",
    "details": [
      "100% lightweight crinkle rayon with breathable cotton lace trim",
      "Adjustable halter tie neckline with plunging V-bodice",
      "Multi-tiered flowing maxi length with pintuck detailing",
      "Elasticized smocked back band for a custom fit"
    ]
  },
  {
    "id": 92,
    "name": "Emerald Satin Off-Shoulder Cocktail Mini Dress",
    "brand": "VELORA Evening",
    "price": 8.5,
    "originalPrice": 10,
    "rating": 4.9,
    "reviews": 105,
    "image": "/images/products/dress-green-satin-mini.jpg",
    "images": [
      "/images/products/dress-green-satin-mini.jpg"
    ],
    "colorImages": {
      "Green": "/images/products/dress-green-satin-mini.jpg"
    },
    "category": "Women's Fashion",
    "subCategory": "Dresses",
    "badge": "Popular",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Green"
    ],
    "inStock": true,
    "stock": 12,
    "maxQuantity": 12,
    "sku": "VEL-0092",
    "description": "Lustrous emerald green silk-satin mini dress with an off-the-shoulder neckline, delicate black lace bust trim, and a body-skimming tailored cut.",
    "details": [
      "Rich lustrous satin with fluid drape and subtle stretch",
      "Romantic off-the-shoulder sleeve drape with lace bodice detail",
      "Fitted waistline contouring into a mini pencil hem",
      "Hidden side invisible zipper"
    ]
  },
  {
    "id": 93,
    "name": "Timeless V-Neck Slip Silk Maxi Gown",
    "brand": "VELORA Evening",
    "price": 9.5,
    "originalPrice": 10,
    "rating": 4.9,
    "reviews": 176,
    "image": "/images/products/dress-black-slip-maxi.png",
    "images": [
      "/images/products/dress-black-slip-maxi.png"
    ],
    "colorImages": {
      "Black": "/images/products/dress-black-slip-maxi.png"
    },
    "category": "Women's Fashion",
    "subCategory": "Dresses",
    "badge": "Essential",
    "isNew": true,
    "isSale": false,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black"
    ],
    "inStock": true,
    "stock": 15,
    "maxQuantity": 15,
    "sku": "VEL-0093",
    "description": "An iconic 90s-inspired minimalist black slip maxi gown with delicate spaghetti straps, sculpted plunging V-neckline, and an elongated floor-length drape.",
    "details": [
      "Premium heavyweight satin crepe cut on the bias",
      "Double-layer bust lining with delicate non-stretch spaghetti straps",
      "Dramatic fluted flare hem towards the floor",
      "Perfect for galas, dinners, and evening occasions"
    ]
  },
  {
    "id": 94,
    "name": "Strong Independent Woman Slogan Tee",
    "brand": "VELORA Graphics",
    "price": 3.5,
    "originalPrice": 5,
    "rating": 4.8,
    "reviews": 92,
    "image": "/images/products/tee-strong-independent-woman.jpg",
    "images": [
      "/images/products/tee-strong-independent-woman.jpg"
    ],
    "colorImages": {
      "Black": "/images/products/tee-strong-independent-woman.jpg"
    },
    "category": "Women's Fashion",
    "subCategory": "Tops",
    "badge": "Trending",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black"
    ],
    "inStock": true,
    "stock": 25,
    "maxQuantity": 25,
    "sku": "VEL-0094",
    "description": "Empowering statement tee in black cotton jersey, featuring bold typography: 'STRONG INDEPENDENT Woman WHO DON'T NEED NO MAN' in red and white.",
    "details": [
      "100% soft ringspun combed cotton",
      "High-durability screen print in crimson red & crisp white",
      "Classic relaxed crewneck fit",
      "Double-needle neck and hem construction"
    ]
  },
  {
    "id": 95,
    "name": "Sarcastic Daily Mood Graphic Tee",
    "brand": "VELORA Graphics",
    "price": 3.5,
    "originalPrice": 5,
    "rating": 4.8,
    "reviews": 84,
    "image": "/images/products/tee-one-person-a-day.jpg",
    "images": [
      "/images/products/tee-one-person-a-day.jpg"
    ],
    "colorImages": {
      "Black": "/images/products/tee-one-person-a-day.jpg"
    },
    "category": "Women's Fashion",
    "subCategory": "Tops",
    "badge": "Popular",
    "isNew": true,
    "isSale": false,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black"
    ],
    "inStock": true,
    "stock": 22,
    "maxQuantity": 22,
    "sku": "VEL-0095",
    "description": "Witty slogan t-shirt: 'I Can Only Please One Person a Day. Today Isn't Your Day. Tomorrow Doesn't Look Good Either.' Soft and comfortable.",
    "details": [
      "100% breathable lightweight combed cotton",
      "Two-tone typography print with vintage flourish accents",
      "Tear-away neck label for scratch-free comfort",
      "Casual relaxed silhouette"
    ]
  },
  {
    "id": 96,
    "name": "Be A Difficult Woman Illustrated Tee",
    "brand": "VELORA Graphics",
    "price": 3.5,
    "originalPrice": 5,
    "rating": 4.9,
    "reviews": 114,
    "image": "/images/products/tee-difficult-woman.jpg",
    "images": [
      "/images/products/tee-difficult-woman.jpg"
    ],
    "colorImages": {
      "Black": "/images/products/tee-difficult-woman.jpg"
    },
    "category": "Women's Fashion",
    "subCategory": "Tops",
    "badge": "Best Seller",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black"
    ],
    "inStock": true,
    "stock": 28,
    "maxQuantity": 28,
    "sku": "VEL-0096",
    "description": "Cute artistic t-shirt featuring a spiral notepad doodle reading 'BE A difficult woman' surrounded by pastel retro flowers and a purple pencil.",
    "details": [
      "100% premium combed jersey cotton",
      "Charming colorful pastel illustration on jet black base",
      "Pre-shrunk fabric with reinforced shoulder-to-shoulder tape",
      "Regular women's relaxed fit"
    ]
  },
  {
    "id": 97,
    "name": "Sculpting Corset Halter Neck Top",
    "brand": "VELORA Femme",
    "price": 4.5,
    "originalPrice": 6,
    "rating": 4.9,
    "reviews": 96,
    "image": "/images/products/top-brown-corset-halter.jpg",
    "images": [
      "/images/products/top-brown-corset-halter.jpg"
    ],
    "colorImages": {
      "Brown": "/images/products/top-brown-corset-halter.jpg"
    },
    "category": "Women's Fashion",
    "subCategory": "Tops",
    "badge": "Trending",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Brown"
    ],
    "inStock": true,
    "stock": 18,
    "maxQuantity": 18,
    "sku": "VEL-0097",
    "description": "Chocolate brown sculpted halter corset top featuring contoured vertical seam boning, sweetheart V-neck, and smooth shapewear compression fabric.",
    "details": [
      "Ultra-flattering corset bodice with vertical structural seaming",
      "Supportive halter neck strap",
      "Double-layered compressive stretch fabric",
      "V-curved hemline contouring the waist"
    ]
  },
  {
    "id": 98,
    "name": "Deep Plunge Halter Sleeveless Bodice Top",
    "brand": "VELORA Femme",
    "price": 3.5,
    "originalPrice": 5,
    "rating": 4.8,
    "reviews": 78,
    "image": "/images/products/top-brown-plunge-halter.png",
    "images": [
      "/images/products/top-brown-plunge-halter.png"
    ],
    "colorImages": {
      "Brown": "/images/products/top-brown-plunge-halter.png"
    },
    "category": "Women's Fashion",
    "subCategory": "Tops",
    "badge": "Popular",
    "isNew": true,
    "isSale": false,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Brown"
    ],
    "inStock": true,
    "stock": 20,
    "maxQuantity": 20,
    "sku": "VEL-0098",
    "description": "Minimalist dark espresso halter top with an elongated deep plunge scoop neckline and a seamless second-skin fit.",
    "details": [
      "Buttery soft seamless microfiber fabric",
      "Deep plunge scoop front with wide halter neck band",
      "Open back silhouette",
      "Anti-roll hem finish"
    ]
  },
  {
    "id": 99,
    "name": "Essential Racerback Cotton Tank Top",
    "brand": "VELORA Basics",
    "price": 2.5,
    "originalPrice": 4,
    "rating": 4.9,
    "reviews": 130,
    "image": "/images/products/top-white-racerback-tank.png",
    "images": [
      "/images/products/top-white-racerback-tank.png"
    ],
    "colorImages": {
      "White": "/images/products/top-white-racerback-tank.png"
    },
    "category": "Women's Fashion",
    "subCategory": "Tops",
    "badge": "Essential",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White"
    ],
    "inStock": true,
    "stock": 35,
    "maxQuantity": 35,
    "sku": "VEL-0099",
    "description": "Crisp white classic racerback ribbed tank top. Made from ultra-breathable stretch cotton with a curved scoop hem, perfect for layering or gym-to-street wear.",
    "details": [
      "95% ribbed cotton, 5% spandex for flexible recovery",
      "Athletic racerback design offering full range of motion",
      "Scoop neckline with bound trim",
      "Curved hemline designed to stay tucked or sit naturally"
    ]
  },
  {
    "id": 100,
    "name": "High-Waisted Pleated Wide-Leg Trousers",
    "brand": "VELORA Femme",
    "price": 7.5,
    "originalPrice": 9.5,
    "rating": 4.9,
    "reviews": 148,
    "image": "/images/products/pants-women-pleated-wide-leg.jpg",
    "images": [
      "/images/products/pants-women-pleated-wide-leg.jpg"
    ],
    "colorImages": {
      "Taupe": "/images/products/pants-women-pleated-wide-leg.jpg"
    },
    "category": "Women's Fashion",
    "subCategory": "Pants",
    "badge": "Trending",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Beige",
      "Tan"
    ],
    "inStock": true,
    "stock": 20,
    "maxQuantity": 20,
    "sku": "VEL-0100",
    "description": "Viral high-waisted wide-leg dress trousers featuring sharp double front pleats, elastic back waist comfort, and an effortless fluid drape.",
    "details": [
      "Flowy poly-viscose blend with elegant drape and crease resistance",
      "High-rise fit with double front pleats",
      "Comfort elastic back waistband with button and zip fly front",
      "Deep side slash pockets and wide straight leg profile"
    ]
  },
  {
    "id": 101,
    "name": "Minimalist Tailored Straight Office Trousers",
    "brand": "VELORA Femme",
    "price": 6.5,
    "originalPrice": 8.5,
    "rating": 4.8,
    "reviews": 92,
    "image": "/images/products/pants-women-tailored-taupe.jpg",
    "images": [
      "/images/products/pants-women-tailored-taupe.jpg"
    ],
    "colorImages": {
      "Beige": "/images/products/pants-women-tailored-taupe.jpg"
    },
    "category": "Women's Fashion",
    "subCategory": "Pants",
    "badge": "Essential",
    "isNew": true,
    "isSale": false,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Beige",
      "Tan"
    ],
    "inStock": true,
    "stock": 24,
    "maxQuantity": 24,
    "sku": "VEL-0101",
    "description": "Clean warm beige straight-leg trousers tailored for everyday office chic. Features a smooth flat waistband, discreet belt loops, and subtle stretch.",
    "details": [
      "Midweight stretch twill with a polished matte finish",
      "Tailored straight silhouette from hip to hem",
      "Flat waistband with belt loops and hidden hook closure",
      "Versatile styling for office, brunch, or casual chic wear"
    ]
  },
  {
    "id": 102,
    "name": "Gothic Tapestry Embroidered Velvet Mini Skirt",
    "brand": "VELORA Studio",
    "price": 5.5,
    "originalPrice": 7.5,
    "rating": 4.9,
    "reviews": 112,
    "image": "/images/products/skirt-black-velvet-embroidered.jpg",
    "images": [
      "/images/products/skirt-black-velvet-embroidered.jpg"
    ],
    "colorImages": {
      "Black": "/images/products/skirt-black-velvet-embroidered.jpg"
    },
    "category": "Women's Fashion",
    "subCategory": "Skirts",
    "badge": "Trending",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black"
    ],
    "inStock": true,
    "stock": 16,
    "maxQuantity": 16,
    "sku": "VEL-0102",
    "description": "Enchanting black crushed velvet mini skirt embellished with intricate botanical and serpent tapestry embroidery. Features a body-skimming A-line cut.",
    "details": [
      "Plush stretch velvet base with detailed metallic yarn embroidery",
      "High-rise structured waistline with concealed side zip",
      "Soft inner lining for anti-static comfort",
      "Versatile styling with chunky boots, cardigans, or crop tops"
    ]
  },
  {
    "id": 103,
    "name": "Vintage Light Wash A-Line Denim Mini Skirt",
    "brand": "VELORA Denim",
    "price": 5,
    "originalPrice": 7,
    "rating": 4.8,
    "reviews": 126,
    "image": "/images/products/skirt-blue-denim-aline.jpg",
    "images": [
      "/images/products/skirt-blue-denim-aline.jpg"
    ],
    "colorImages": {
      "Blue": "/images/products/skirt-blue-denim-aline.jpg"
    },
    "category": "Women's Fashion",
    "subCategory": "Skirts",
    "badge": "Best Seller",
    "isNew": true,
    "isSale": false,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Blue"
    ],
    "inStock": true,
    "stock": 22,
    "maxQuantity": 22,
    "sku": "VEL-0103",
    "description": "Everyday summer essential A-line denim skirt in a light stonewash tint. Fitted through the waist with functional back patch pockets and contrast tobacco stitching.",
    "details": [
      "100% durable cotton denim with authentic stonewash patina",
      "High-rise waist with belt loops and zip fly button closure",
      "Flattering flared A-line silhouette",
      "Functional dual back spade pockets"
    ]
  },
  {
    "id": 104,
    "name": "High-Waisted Knife-Pleated Tennis Skirt",
    "brand": "VELORA Sport",
    "price": 4.5,
    "originalPrice": 6,
    "rating": 4.9,
    "reviews": 185,
    "image": "/images/products/skirt-white-pleated-tennis.jpg",
    "images": [
      "/images/products/skirt-white-pleated-tennis.jpg"
    ],
    "colorImages": {
      "White": "/images/products/skirt-white-pleated-tennis.jpg"
    },
    "category": "Women's Fashion",
    "subCategory": "Skirts",
    "badge": "Popular",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White"
    ],
    "inStock": true,
    "stock": 30,
    "maxQuantity": 30,
    "sku": "VEL-0104",
    "description": "Crisp bright white high-waisted pleated tennis mini skirt. Features sharp thermal-set knife pleats, side zipper closure, and built-in safety shorts.",
    "details": [
      "Stain-resistant poly-twill that holds crisp knife pleats wash after wash",
      "Comfortable built-in stretch safety shorts lining",
      "Structured fitted waistband with hidden side zipper",
      "Classic preppy aesthetic for casual outings and sporty chic looks"
    ]
  },
  {
    "id": 105,
    "name": "Daily Mood Sarcastic Graphic Tee - Burgundy",
    "brand": "VELORA Edition",
    "price": 50,
    "originalPrice": 65,
    "rating": 4.9,
    "reviews": 168,
    "image": "/images/products/tee-sarcastic-burgundy.png",
    "images": [
      "/images/products/tee-sarcastic-burgundy.png"
    ],
    "colorImages": {
      "Burgundy": "/images/products/tee-sarcastic-burgundy.png",
      "Blue": "/images/products/tee-sarcastic-blue.png"
    },
    "category": "Men's Fashion",
    "subCategory": "Tops",
    "badge": "Premium Drop",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Burgundy",
      "Blue"
    ],
    "inStock": true,
    "stock": 20,
    "maxQuantity": 20,
    "sku": "VEL-0105",
    "description": "Limited edition heavyweight combed cotton statement tee in rich burgundy. Emblazoned with crisp typography: 'I CAN ONLY PLEASE ONE PERSON A DAY. TODAY ISN'T YOUR DAY. TOMORROW DOESN'T LOOK GOOD EITHER.'",
    "details": [
      "Heavyweight 240 GSM premium combed cotton jersey",
      "High-density screenprint lettering with crisp contrast",
      "Pre-shrunk and silicone washed for luxurious drape",
      "Available in Burgundy and Cobalt Blue"
    ]
  },
  {
    "id": 106,
    "name": "Daily Mood Sarcastic Graphic Tee - Cobalt Blue",
    "brand": "VELORA Edition",
    "price": 50,
    "originalPrice": 65,
    "rating": 4.9,
    "reviews": 152,
    "image": "/images/products/tee-sarcastic-blue.png",
    "images": [
      "/images/products/tee-sarcastic-blue.png"
    ],
    "colorImages": {
      "Blue": "/images/products/tee-sarcastic-blue.png",
      "Burgundy": "/images/products/tee-sarcastic-burgundy.png"
    },
    "category": "Men's Fashion",
    "subCategory": "Tops",
    "badge": "Trending",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Blue",
      "Burgundy"
    ],
    "inStock": true,
    "stock": 20,
    "maxQuantity": 20,
    "sku": "VEL-0106",
    "description": "Limited edition heavyweight combed cotton statement tee in vivid cobalt blue. Emblazoned with crisp typography: 'I CAN ONLY PLEASE ONE PERSON A DAY. TODAY ISN'T YOUR DAY. TOMORROW DOESN'T LOOK GOOD EITHER.'",
    "details": [
      "Heavyweight 240 GSM premium combed cotton jersey",
      "High-density screenprint lettering with crisp contrast",
      "Pre-shrunk and silicone washed for luxurious drape",
      "Available in Cobalt Blue and Burgundy"
    ]
  },
  {
    "id": 107,
    "name": "Nobero Heather Grey Heavyweight Crewneck Tee",
    "brand": "VELORA Studio",
    "price": 50,
    "originalPrice": 65,
    "rating": 4.9,
    "reviews": 134,
    "image": "/images/products/tee-grey-melange-crewneck.jpg",
    "images": [
      "/images/products/tee-grey-melange-crewneck.jpg"
    ],
    "colorImages": {
      "Gray": "/images/products/tee-grey-melange-crewneck.jpg"
    },
    "category": "Men's Fashion",
    "subCategory": "Tops",
    "badge": "Exclusive",
    "isNew": true,
    "isSale": true,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "size": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Gray"
    ],
    "inStock": true,
    "stock": 25,
    "maxQuantity": 25,
    "sku": "VEL-0107",
    "description": "Ultra-premium heather grey melange crewneck t-shirt by Nobero. Cut from heavyweight luxury combed cotton with reinforced rib collar and tailored drop-shoulder fit.",
    "details": [
      "100% luxury combed ringspun cotton in fine heather grey melange",
      "Tailored drop shoulder with reinforced flatlock seam construction",
      "Pre-shrunk and enzyme-washed for cloud-soft hand-feel",
      "Heavyweight collar ribbing designed to never sag"
    ]
  },
  {
    "id": 108,
    "name": "The K2 Tee",
    "brand": "VELORA Edition",
    "drop": "DROP 003 — FUNDS PROJECT PAKISTAN",
    "collection": "The Water & Life Drop",
    "price": 41.99,
    "originalPrice": 50.0,
    "rating": 5.0,
    "reviews": 118,
    "image": "/images/products/the-k2-tee-front.png",
    "images": [
      "/images/products/the-k2-tee-front.png",
      "/images/products/the-k2-tee-back.png"
    ],
    "colorImages": {
      "White": "/images/products/the-k2-tee-front.png"
    },
    "category": "Men's Fashion",
    "subCategory": "Tops",
    "badge": "Special Drop",
    "isNew": true,
    "isSale": false,
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "colors": [
      "White"
    ],
    "inStock": true,
    "stock": 25,
    "maxQuantity": 10,
    "sku": "DROP-K2-003",
    "description": "K2 is the world's second highest summit and Pakistan's greatest. It has always stood for something bigger than the climb itself. This tee wraps the mountain's silhouette in the patterns of traditional Pakistani folk art, pulling from generations of craft, color, and heritage. Every purchase funds humanitarian relief for communities across Pakistan.",
    "details": [
      "Boxy oversized streetwear silhouette with relaxed drop shoulders",
      "Heavyweight 260 GSM 100% organic combed ringspun cotton",
      "Screenprinted traditional Pakistani folk art mountain graphic on back",
      "Minimalist SOULTIES green chest embroidery on front",
      "Durable rib-knit crew collar with reinforced double-stitched seams"
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

const STORAGE_KEY = "velora_products_catalog";

const loadStoredProducts = () => {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not load products from localStorage", e);
    }
  }
  return [...INITIAL_PRODUCTS];
};

export let products = loadStoredProducts();

export const saveProductToCatalog = (productData) => {
  const targetId = productData.id;
  let savedItem = null;
  
  if (targetId) {
    const index = products.findIndex(p => String(p.id) === String(targetId));
    if (index !== -1) {
      products[index] = { ...products[index], ...productData };
      savedItem = products[index];
    } else {
      savedItem = { ...productData };
      products.unshift(savedItem);
    }
  } else {
    const maxId = products.reduce((max, p) => {
      const num = Number(p.id);
      return !isNaN(num) && num > max ? num : max;
    }, 108);
    savedItem = {
      ...productData,
      id: maxId + 1,
      rating: productData.rating || 5.0,
      reviews: productData.reviews || 0,
      inStock: productData.inStock !== false,
      isNew: productData.isNew !== false,
      images: productData.images && productData.images.length > 0 ? productData.images : [productData.image],
    };
    products.unshift(savedItem);
  }

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      window.dispatchEvent(new CustomEvent("products-updated", { detail: { products, savedItem } }));
    } catch (e) {
      console.error("Failed to save products to localStorage", e);
    }
  }

  return savedItem;
};

export const deleteProductFromCatalog = (productId) => {
  const index = products.findIndex(p => String(p.id) === String(productId));
  if (index !== -1) {
    products.splice(index, 1);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        window.dispatchEvent(new CustomEvent("products-updated", { detail: { products, deletedId: productId } }));
      } catch (e) {
        console.error("Failed to delete product from localStorage", e);
      }
    }
    return true;
  }
  return false;
};

export const resetProductsCatalog = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    products.length = 0;
    products.push(...INITIAL_PRODUCTS);
    window.dispatchEvent(new CustomEvent("products-updated", { detail: { products } }));
  }
  return products;
};

export { INITIAL_PRODUCTS };
export default products;
