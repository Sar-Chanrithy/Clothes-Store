import React, { useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/home/Hero";
import Newsletter from "../components/home/Newsletter";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { Star, Heart, Eye, ShoppingBag, Check, Search, X, Sparkles, ArrowRight } from "lucide-react";

// Categories definition
const categories = {
  "All": [],
  "✨ New Arrivals": [],
  "🔥 On Sale": [],
  "Men's Fashion": ["Suits & Blazers", "Shirts", "Knits", "Jackets", "Pants", "Denim", "Tops", "Outerwear", "Accessories"],
  "Women's Fashion": ["Dresses", "Knits", "Jumpsuits", "Outerwear", "Pants", "Tops", "Skirts", "Bags"],
  "Footwear": ["Sneakers", "Boots", "Heels", "Loafers", "Athletic", "Sandals", "Oxfords"],
  "Accessories": ["Watches", "Sunglasses", "Scarves", "Belts", "Wallets", "Jewelry", "Hats", "Gloves", "Ties", "Bags"],
  "Sportswear": ["Activewear", "Outerwear", "Shorts"],
  "Kids Fashion": ["Dresses", "Footwear", "Outerwear", "Tops"]
};

const Home = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [addedId, setAddedId] = useState(null);

  const { addItem, toggleWishlist, isInWishlist } = useCart();

  const categoryList = Object.keys(categories);
  const subCategories = selectedCategory !== "All" ? categories[selectedCategory] : [];

  // Filter products by category, subcategory AND search query
  const filteredProducts = products.filter((p) => {
    let matchesCategory = true;
    if (selectedCategory === "✨ New Arrivals") {
      matchesCategory = p.isNew;
    } else if (selectedCategory === "🔥 On Sale") {
      matchesCategory = p.isSale;
    } else if (selectedCategory !== "All") {
      matchesCategory = p.category === selectedCategory;
    }

    const matchesSubCategory = !selectedSubCategory || p.subCategory === selectedSubCategory;

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subCategory.toLowerCase().includes(q) ||
      (p.badge && p.badge.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q));

    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const handleWishlistToggle = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedSubCategory(null);
    setSearchQuery("");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <Hero />

      {/* Search & Category Navigation Section */}
      <section className="py-6 bg-white dark:bg-gray-900 sticky top-16 md:top-20 z-30 shadow-md border-b border-gray-200 dark:border-gray-800 backdrop-blur-md bg-opacity-95 dark:bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Live Search Bar */}
          <div className="max-w-2xl mx-auto mb-5 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-600 dark:text-purple-400" />
            <input
              type="text"
              placeholder="Search 50+ products (e.g. 'Wool Suit', 'Silk', 'Dress', 'Bag', 'Sneakers')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white text-sm sm:text-base shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categoryList.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedSubCategory(null);
                }}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-medium transition-all duration-300 text-xs sm:text-sm ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-105"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Subcategory Chips */}
          {selectedCategory !== "All" && subCategories && subCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <button
                onClick={() => setSelectedSubCategory(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                  selectedSubCategory === null
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                All {selectedCategory}
              </button>
              {subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                    selectedSubCategory === sub
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {selectedCategory === "All" ? "All Collections" : selectedCategory}
                {selectedSubCategory && ` — ${selectedSubCategory}`}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} available
                </p>
                {searchQuery && (
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 px-2.5 py-0.5 rounded-full font-medium">
                    Matching "{searchQuery}"
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Reset filter button if filtered */}
              {(searchQuery || selectedCategory !== "All" || selectedSubCategory) && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-semibold"
                >
                  Clear all filters
                </button>
              )}

              <div className="flex gap-1.5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white dark:bg-gray-700 text-purple-600 shadow-sm" : "text-gray-500 dark:text-gray-400"}`}
                  aria-label="Grid view"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-white dark:bg-gray-700 text-purple-600 shadow-sm" : "text-gray-500 dark:text-gray-400"}`}
                  aria-label="List view"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Empty State when no products match search */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No matching products found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6 text-sm">
                We couldn't find any products matching "{searchQuery}". Try checking for typos or searching by another category.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors shadow-md"
              >
                Reset Search & View All
              </button>
            </div>
          ) : (
            <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-6`}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 ${viewMode === "list" ? "flex" : ""}`}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 h-48 flex-shrink-0" : "aspect-[4/5]"}`}>
                    <Link to={`/product/${product.id}`} className="block w-full h-full">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop&q=80";
                        }}
                      />
                    </Link>
                    <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-md pointer-events-none">
                      {product.badge}
                    </span>
                    
                    {/* Floating Action Buttons */}
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${hoveredProduct === product.id ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                      <Link
                        to={`/product/${product.id}`}
                        className="p-3 bg-white text-gray-800 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-lg"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={(e) => handleWishlistToggle(e, product.id)}
                        className={`p-3 bg-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${isInWishlist(product.id) ? "text-red-500" : "text-gray-800 hover:text-red-500"}`}
                        title="Add to Wishlist"
                      >
                        <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-red-500" : ""}`} />
                      </button>
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="p-3 bg-white text-gray-800 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-lg"
                        title="Add to Cart"
                      >
                        {addedId === product.id ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <ShoppingBag className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1 hover:text-purple-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {product.category} • {product.subCategory}
                    </p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ${typeof product.originalPrice === "number" ? product.originalPrice.toFixed(2) : product.originalPrice}
                          </span>
                        )}
                        <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                          ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900 dark:text-white">{product.rating}</span>
                        <span className="text-gray-400 text-xs">({product.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4">
            🔥 Limited Time Offer
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Up to 50% Off</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover our exclusive collection with premium discounts
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop" className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Shop Sale
            </Link>
            <Link to="/shop" className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold hover:bg-white/30 transition-all duration-300">
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What Our Customers Say</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Real reviews from real customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Johnson", role: "Fashion Enthusiast", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80", text: "Absolutely love VELORA! The quality is unmatched and the pieces are timeless." },
              { name: "Michael Chen", role: "Style Influencer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80", text: "The best investment I've made in my wardrobe. Premium quality and exceptional service." },
              { name: "Emma Thompson", role: "Fashion Designer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80", text: "VELORA represents the perfect blend of modern trends and timeless elegance." }
            ].map((testimonial, index) => (
              <div key={index} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-4 mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter variant="luxury" />
    </div>
  );
};

export default Home;