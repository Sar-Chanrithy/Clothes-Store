import React, { useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/home/Hero";
import Newsletter from "../components/home/Newsletter";
import { products, formatKHR } from "../data/products";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { Star, Heart, Eye, ShoppingBag, Check, Search, X, Sparkles, ArrowRight } from "lucide-react";

// Categories definition
const categories = {
  "All": [],
  "✨ New Arrivals": [],
  "🔥 On Sale": [],
  "Men's Fashion": ["Suits & Blazers", "Shirts", "Knits", "Jackets", "Pants", "Denim", "Tops", "Outerwear", "Accessories"],
  "Women's Fashion": ["Dresses", "Knits", "Jumpsuits", "Outerwear", "Pants", "Tops", "Skirts", "Bags"]
};

const Home = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [addedId, setAddedId] = useState(null);
  const { t, isKhmer } = useLanguage();

  const { addItem, toggleWishlist, isInWishlist } = useCart();

  const categoryList = Object.keys(categories);
  const subCategories = selectedCategory !== "All" ? categories[selectedCategory] : [];

  const getCategoryLabel = (category) => {
    switch (category) {
      case "All": return t("cat_all", "All");
      case "✨ New Arrivals": return t("cat_new", "✨ New Arrivals");
      case "🔥 On Sale": return t("cat_sale", "🔥 On Sale");
      case "Men's Fashion": return t("cat_men", "Men's Fashion");
      case "Women's Fashion": return t("cat_women", "Women's Fashion");
      case "Footwear": return t("cat_footwear", "Footwear");
      case "Accessories": return t("cat_accessories", "Accessories");
      case "Sportswear": return t("cat_sportswear", "Sportswear");
      case "Kids Fashion": return t("cat_kids", "Kids Fashion");
      default: return category;
    }
  };

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
    <div className="bg-stone-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <Hero />

      {/* Search & Category Navigation Section */}
      <section className="py-5 bg-white/95 dark:bg-neutral-900/90 sticky top-[60px] md:top-[68px] z-30 shadow-md dark:shadow-2xl border-y border-neutral-200 dark:border-white/10 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Live Search Bar */}
          <div className="max-w-2xl mx-auto mb-5 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8894d] dark:text-[#c2a677]" />
            <input
              type="text"
              placeholder="Search timeless suits, jackets, linen shirts, leather shoes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-neutral-100 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-white/15 focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 text-sm tracking-wide transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white p-1"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Chips - Swipeable on phone, wrapping on tablet & laptop */}
          <div className="overflow-x-auto no-scrollbar scroll-smooth flex sm:flex-wrap gap-2 sm:justify-center px-1 pb-1">
            {categoryList.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedSubCategory(null);
                }}
                className={`flex-shrink-0 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-xs font-medium tracking-[0.12em] sm:tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer ${
                  selectedCategory === category
                    ? "bg-[#c2a677] text-neutral-950 font-semibold shadow-lg shadow-[#c2a677]/20 scale-105"
                    : "bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-white/10 border border-neutral-200 dark:border-white/5"
                }`}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>

          {/* Subcategory Chips - Swipeable on mobile */}
          {selectedCategory !== "All" && subCategories && subCategories.length > 0 && (
            <div className="overflow-x-auto no-scrollbar scroll-smooth flex sm:flex-wrap gap-2 sm:justify-center mt-3 pt-3 border-t border-neutral-200 dark:border-white/5 px-1 pb-1">
              <button
                onClick={() => setSelectedSubCategory(null)}
                className={`flex-shrink-0 px-3 py-1 rounded-lg text-[10px] sm:text-[11px] tracking-wider uppercase font-medium transition-all duration-200 cursor-pointer ${
                  selectedSubCategory === null
                    ? "bg-[#c2a677] text-neutral-950 font-semibold"
                    : "bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-white/10 border border-neutral-200/60 dark:border-transparent"
                }`}
              >
                {isKhmer ? `ទាំងអស់ ${getCategoryLabel(selectedCategory)}` : `All ${selectedCategory}`}
              </button>
              {subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`flex-shrink-0 px-3 py-1 rounded-lg text-[10px] sm:text-[11px] tracking-wider uppercase font-medium transition-all duration-200 cursor-pointer ${
                    selectedSubCategory === sub
                      ? "bg-[#c2a677] text-neutral-950 font-semibold"
                      : "bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-white/10 border border-neutral-200/60 dark:border-transparent"
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
              <h2 className="font-serif-luxury text-3xl md:text-4xl font-normal text-neutral-900 dark:text-white">
                {selectedCategory === "All" ? t("all_collections", "All Collections") : getCategoryLabel(selectedCategory)}
                {selectedSubCategory && ` — ${selectedSubCategory}`}
              </h2>
              <div className="flex items-center gap-2 mt-1.5">
                <p className="text-neutral-500 dark:text-neutral-400 text-sm font-light">
                  {filteredProducts.length} {t("products_available", "products available")}
                </p>
                {searchQuery && (
                  <span className="text-xs bg-[#c2a677]/15 text-[#9a783e] dark:text-[#c2a677] border border-[#c2a677]/30 px-2.5 py-0.5 rounded-full font-medium">
                    {t("matching", "Matching")} "{searchQuery}"
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Reset filter button if filtered */}
              {(searchQuery || selectedCategory !== "All" || selectedSubCategory) && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#9a783e] dark:text-[#c2a677] hover:underline font-semibold transition-colors cursor-pointer"
                >
                  {t("clear_filters", "Clear all filters")}
                </button>
              )}

              <div className="flex gap-1.5 bg-neutral-200/70 dark:bg-neutral-900 border border-neutral-300/70 dark:border-white/10 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === "grid" ? "bg-white dark:bg-white/15 text-[#9a783e] dark:text-[#c2a677] shadow-sm" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`}
                  aria-label="Grid view"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === "list" ? "bg-white dark:bg-white/15 text-[#9a783e] dark:text-[#c2a677] shadow-sm" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`}
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
            <div className="py-20 text-center bg-white dark:bg-neutral-900/60 rounded-3xl border border-neutral-200 dark:border-white/10 p-8 shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c2a677]/15 flex items-center justify-center text-[#9a783e] dark:text-[#c2a677]">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-neutral-900 dark:text-white mb-2 font-serif-luxury">
                {t("no_matching_products", "No matching products found")}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-6 text-sm">
                {isKhmer 
                  ? `យើងរកមិនឃើញផលិតផលដែលត្រូវនឹង "${searchQuery}" ទេ។ សូមសាកល្បងស្វែងរកដោយពាក្យគន្លឹះផ្សេង ឬជ្រើសរើសប្រភេទដទៃទៀត។` 
                  : `We couldn't find any products matching "${searchQuery}". Try checking for typos or searching by another category.`}
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-[#c2a677] text-neutral-950 font-semibold rounded-xl hover:bg-[#d4ba8b] transition-colors shadow-md cursor-pointer"
              >
                {t("reset_search", "Reset Search & View All")}
              </button>
            </div>
          ) : (
            <div className={`grid ${viewMode === "grid" ? "grid-cols-2 min-[640px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"} gap-3 sm:gap-6`}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`group relative bg-white dark:bg-neutral-900/90 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl dark:shadow-lg dark:hover:shadow-2xl transition-all duration-500 border border-neutral-200/80 dark:border-white/10 hover:border-[#c2a677]/60 dark:hover:border-[#c2a677]/40 ${viewMode === "list" ? "flex" : ""}`}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-32 sm:w-48 h-32 sm:h-48 flex-shrink-0" : "aspect-[4/5]"}`}>
                    <Link to={`/product/${product.id}`} className="block w-full h-full">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop&q=80";
                        }}
                      />
                    </Link>
                    {product.badge && (
                      <span className="absolute top-2 sm:top-3 left-2 sm:left-3 px-2 sm:px-3 py-0.5 sm:py-1 bg-[#c2a677] text-neutral-950 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase rounded-full shadow-md pointer-events-none">
                        {product.badge}
                      </span>
                    )}
                    
                    {/* Floating Action Buttons */}
                    <div className={`absolute inset-0 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center gap-1.5 sm:gap-3 transition-opacity duration-300 ${hoveredProduct === product.id ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                      <Link
                        to={`/product/${product.id}`}
                        className="p-2 sm:p-3 bg-neutral-900 text-white rounded-full hover:bg-[#c2a677] hover:text-neutral-950 transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-lg border border-white/10"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Link>
                      <button
                        onClick={(e) => handleWishlistToggle(e, product.id)}
                        className={`p-2 sm:p-3 bg-neutral-900 rounded-full transition-all duration-300 hover:scale-110 shadow-lg border border-white/10 cursor-pointer ${isInWishlist(product.id) ? "text-[#c2a677]" : "text-white hover:text-[#c2a677]"}`}
                        title="Add to Wishlist"
                      >
                        <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isInWishlist(product.id) ? "fill-[#c2a677] text-[#c2a677]" : ""}`} />
                      </button>
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="p-2 sm:p-3 bg-neutral-900 text-white rounded-full hover:bg-[#c2a677] hover:text-neutral-950 transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-lg border border-white/10 cursor-pointer"
                        title="Add to Cart"
                      >
                        {addedId === product.id ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                        ) : (
                          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className={`p-3 sm:p-4.5 bg-stone-50/90 dark:bg-neutral-950/90 border-t border-neutral-100 dark:border-white/5 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                    <div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-serif-luxury font-medium text-neutral-900 dark:text-white text-sm sm:text-base lg:text-lg mb-1 hover:text-[#9a783e] dark:hover:text-[#c2a677] transition-colors truncate">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 mb-1.5 sm:mb-2 tracking-wider uppercase font-light">
                        {product.category} • {product.subCategory}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-neutral-200/60 dark:border-white/5">
                      <div className="flex items-baseline flex-wrap gap-1 sm:gap-1.5">
                        {product.originalPrice && (
                          <span className="text-[10px] sm:text-xs text-neutral-400 dark:text-neutral-500 line-through">
                            ${typeof product.originalPrice === "number" ? product.originalPrice.toFixed(2) : product.originalPrice}
                          </span>
                        )}
                        <span className="text-sm sm:text-base font-semibold text-[#9a783e] dark:text-[#c2a677] tracking-tight">
                          ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-medium text-stone-500 dark:text-neutral-400">
                          (≈ {formatKHR(product.price)})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] sm:text-xs flex-shrink-0">
                        <Star className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-neutral-900 dark:text-white">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 sm:py-20 bg-stone-100/80 dark:bg-neutral-950 border-b border-neutral-200 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs tracking-[0.25em] text-[#9a783e] dark:text-[#c2a677] uppercase font-semibold mb-2">Praise & Recognition</p>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl text-neutral-900 dark:text-white font-normal">What Our Patrons Say</h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm mt-2 font-light">Reflections from discerning clients in Cambodia</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { name: "Sarah Johnson", role: "Creative Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80", text: "RITHY STORE captures timeless style like few others. The tactile quality and comfort of the fabrics are exceptional." },
              { name: "Michael Chen", role: "Architect", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80", text: "Exceptional precision in stitching and cut. Fast delivery in Phnom Penh and outstanding value." },
              { name: "Emma Thompson", role: "Fashion Editor", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80", text: "A rare balance of modern aesthetics and enduring comfort. Great prices and effortless online ordering." }
            ].map((testimonial, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border border-[#c2a677]/30" />
                    <div>
                      <h4 className="font-serif-luxury text-base text-neutral-900 dark:text-white font-medium">{testimonial.name}</h4>
                      <p className="text-xs text-[#9a783e] dark:text-[#c2a677] tracking-wider uppercase font-light">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed italic font-light">"{testimonial.text}"</p>
                </div>
                <div className="flex gap-1 mt-4 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
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