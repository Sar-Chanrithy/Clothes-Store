import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products as allProducts, formatKHR } from "../data/products";
import { useCart } from "../context/CartContext";
import {
  Sparkles,
  ArrowRight,
  Star,
  Heart,
  ShoppingBag,
  Eye,
  SlidersHorizontal,
  ChevronDown,
  Grid3x3,
  List,
  X,
  Check,
  Search,
  Filter,
  ShoppingCart,
  TrendingUp,
  Clock,
  Award,
  Zap
} from "lucide-react";

const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500' fill='%23f3f4f6'%3E%3Crect width='400' height='500' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%239ca3af'%3EProduct Image%3C/text%3E%3C/svg%3E";

const Shop = ({ defaultFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || searchParams.get("q") || "";
  const initialFilter = searchParams.get("filter") || defaultFilter || "all";

  const [activeSpecialFilter, setActiveSpecialFilter] = useState(initialFilter);
  const [viewMode, setViewMode] = useState("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    priceRange: [],
    size: [],
    color: [],
    rating: []
  });
  const [maxPrice, setMaxPrice] = useState(60);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [addedId, setAddedId] = useState(null);

  const { addItem, toggleWishlist, isInWishlist } = useCart();

  useEffect(() => {
    const q = searchParams.get("search") || searchParams.get("q") || "";
    setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    const f = searchParams.get("filter") || defaultFilter || "all";
    setActiveSpecialFilter(f);
  }, [searchParams, defaultFilter]);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set("search", val.trim());
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  const handleSpecialFilter = (filterKey) => {
    setActiveSpecialFilter(filterKey);
    const newParams = new URLSearchParams(searchParams);
    if (filterKey === "all") {
      newParams.delete("filter");
    } else {
      newParams.set("filter", filterKey);
    }
    setSearchParams(newParams);
  };

  const productsPerPage = 12;

  // Filter options
  const categories = ["All", "Men's Fashion", "Women's Fashion"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "6", "7", "8", "9", "10", "11", "12", "One Size"];
  const colors = ["Black", "White", "Navy", "Charcoal", "Camel", "Brown", "Gray", "Red", "Blue", "Pink", "Burgundy", "Olive", "Beige", "Tan", "Gold", "Silver"];
  const priceRanges = [
    { label: "Under $10", min: 0, max: 10 },
    { label: "$10 - $20", min: 10, max: 20 },
    { label: "$20 - $30", min: 20, max: 30 },
    { label: "$30 - $40", min: 30, max: 40 },
    { label: "$40+", min: 40, max: Infinity }
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Top Rated" },
    { value: "popular", label: "Most Popular" }
  ];

  // Filter and sort products
  const filteredProducts = allProducts.filter(product => {
    // Special filters (New Arrivals / Sale)
    if (activeSpecialFilter === "new" && !product.isNew) return false;
    if (activeSpecialFilter === "sale" && !product.isSale) return false;

    const matchesSearch = !searchQuery.trim() ||
                          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (product.subCategory && product.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));

    // If no category selected or "All" is selected, matches all categories
    const activeCategories = selectedFilters.category.filter(c => c !== "All");
    const matchesCategory = activeCategories.length === 0 || 
                           activeCategories.includes(product.category);

    const productSizes = product.size || product.sizes || [];
    const matchesSize = selectedFilters.size.length === 0 || 
                        productSizes.some(s => selectedFilters.size.includes(s));

    const productColors = (product.colors || []).map(c => typeof c === "string" ? c : c.name);
    const matchesColor = selectedFilters.color.length === 0 || 
                         productColors.some(c => selectedFilters.color.includes(c));

    const matchesRating = selectedFilters.rating.length === 0 || 
                         selectedFilters.rating.some(r => (product.rating || 0) >= r);

    const matchesPrice = (maxPrice >= 1500 || product.price <= maxPrice) &&
                        (selectedFilters.priceRange.length === 0 ||
                        selectedFilters.priceRange.some(label => {
                          const found = priceRanges.find(p => p.label === label);
                          if (!found) return true;
                          return product.price >= found.min && product.price <= found.max;
                        }));
    
    return matchesSearch && matchesCategory && matchesSize && matchesColor && 
           matchesRating && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return a.isNew ? -1 : 1;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popular":
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters, sortBy, searchQuery, activeSpecialFilter]);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold uppercase tracking-wider mb-4">
            {activeSpecialFilter === "new" ? "✨ Fresh Drops" : activeSpecialFilter === "sale" ? "🔥 Exclusive Deals" : "Explore Collections"}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {activeSpecialFilter === "new" ? "New Arrivals" : activeSpecialFilter === "sale" ? "On Sale & Offers" : "Shop All Collections"}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {activeSpecialFilter === "new" 
              ? "Discover the newest additions to our luxury seasonal collection" 
              : activeSpecialFilter === "sale"
                ? "Limited-time discounts on curated premium fashion pieces"
                : "Discover our curated selection of premium fashion pieces"}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
              {filteredProducts.length} Products
            </span>
            <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
              Free Shipping
            </span>
            <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
              Premium Quality
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Collections Navigation Bar */}
        <div className="flex flex-wrap gap-2.5 mb-8 justify-center sm:justify-start">
          <button
            onClick={() => handleSpecialFilter("all")}
            className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-sm ${
              activeSpecialFilter === "all"
                ? "bg-purple-600 text-white shadow-purple-500/25"
                : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            All Products ({allProducts.length})
          </button>
          <button
            onClick={() => handleSpecialFilter("new")}
            className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5 ${
              activeSpecialFilter === "new"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-500/25"
                : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            New Arrivals ({allProducts.filter(p => p.isNew).length})
          </button>
          <button
            onClick={() => handleSpecialFilter("sale")}
            className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5 ${
              activeSpecialFilter === "sale"
                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/25"
                : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20"
            }`}
          >
            <Zap className="w-4 h-4 text-red-500" />
            On Sale ({allProducts.filter(p => p.isSale).length})
          </button>
        </div>
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden px-4 py-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center gap-2 hover:border-purple-500 transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-3 pr-10 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white cursor-pointer transition-all duration-300"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-purple-500 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-purple-500 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white">Filters</h3>
                <button
                  onClick={() => {
                    setSelectedFilters({
                      category: [],
                      priceRange: [],
                      size: [],
                      color: [],
                      rating: []
                    });
                    setMaxPrice(1500);
                  }}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Reset All
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const isAll = category === "All";
                    const isChecked = isAll
                      ? selectedFilters.category.length === 0 || selectedFilters.category.includes("All")
                      : selectedFilters.category.includes(category);

                    return (
                      <label key={category} className="flex items-center gap-2 cursor-pointer group select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (isAll) {
                              setSelectedFilters({
                                ...selectedFilters,
                                category: []
                              });
                            } else if (e.target.checked) {
                              setSelectedFilters({
                                ...selectedFilters,
                                category: [...selectedFilters.category.filter(c => c !== "All"), category]
                              });
                            } else {
                              setSelectedFilters({
                                ...selectedFilters,
                                category: selectedFilters.category.filter(c => c !== category)
                              });
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          {category}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Filter with Scroll Slider & Options */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Price Range</h4>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded-full">
                    {maxPrice >= 60 ? "$0 — $60+" : `$0 — $${maxPrice}`}
                  </span>
                </div>

                {/* Interactive Price Range Scroll Slider */}
                <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-xl border border-gray-100 dark:border-gray-800 mb-3 space-y-2">
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600 focus:outline-none"
                    aria-label="Filter products by price slider"
                  />
                  <div className="flex justify-between text-[11px] font-medium text-gray-400">
                    <span>$5</span>
                    <span>$30</span>
                    <span>$60+</span>
                  </div>
                </div>

                {/* Scrollable Price Range Checkboxes */}
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1.5 scrollbar-thin">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedFilters.priceRange.includes(range.label)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFilters({
                              ...selectedFilters,
                              priceRange: [...selectedFilters.priceRange, range.label]
                            });
                          } else {
                            setSelectedFilters({
                              ...selectedFilters,
                              priceRange: selectedFilters.priceRange.filter(r => r !== range.label)
                            });
                          }
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500 cursor-pointer"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter with Scroll */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Size</h4>
                  {selectedFilters.size.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedFilters({ ...selectedFilters, size: [] })}
                      className="text-xs text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                    >
                      Clear ({selectedFilters.size.length})
                    </button>
                  )}
                </div>

                {/* Scrollable Size Grid */}
                <div className="max-h-36 overflow-y-auto pr-1.5 scrollbar-thin">
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          if (selectedFilters.size.includes(size)) {
                            setSelectedFilters({
                              ...selectedFilters,
                              size: selectedFilters.size.filter(s => s !== size)
                            });
                          } else {
                            setSelectedFilters({
                              ...selectedFilters,
                              size: [...selectedFilters.size, size]
                            });
                          }
                        }}
                        className={`py-2 px-1 text-center rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer truncate ${
                          selectedFilters.size.includes(size)
                            ? "bg-purple-600 text-white shadow-sm ring-1 ring-purple-400"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                        title={size}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        if (selectedFilters.color.includes(color)) {
                          setSelectedFilters({
                            ...selectedFilters,
                            color: selectedFilters.color.filter(c => c !== color)
                          });
                        } else {
                          setSelectedFilters({
                            ...selectedFilters,
                            color: [...selectedFilters.color, color]
                          });
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                        selectedFilters.color.includes(color)
                          ? "bg-purple-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedFilters.rating.includes(rating)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFilters({
                              ...selectedFilters,
                              rating: [...selectedFilters.rating, rating]
                            });
                          } else {
                            setSelectedFilters({
                              ...selectedFilters,
                              rating: selectedFilters.rating.filter(r => r !== rating)
                            });
                          }
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {rating}+ Stars
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {sortedProducts.length === 0 ? (
                  <span>Showing <span className="font-semibold text-gray-900 dark:text-white">0</span> products</span>
                ) : (
                  <span>
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> -{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {Math.min(startIndex + productsPerPage, sortedProducts.length)}
                    </span>{" "}
                    of <span className="font-semibold text-gray-900 dark:text-white">{sortedProducts.length}</span> products
                  </span>
                )}
              </p>
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="md:hidden text-sm text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Empty State when no products match */}
            {currentProducts.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
                <div className="text-6xl mb-4 animate-bounce">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto text-sm">
                  We couldn't find any products matching your current filters. Try adjusting or resetting your filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedFilters({
                      category: [],
                      priceRange: [],
                      size: [],
                      color: [],
                      rating: []
                    });
                    setMaxPrice(60);
                    setSearchQuery("");
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:scale-105 transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={`grid ${
                viewMode === "grid" 
                  ? "grid-cols-2 min-[640px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6" 
                  : "grid-cols-1 gap-3 sm:gap-4"
              }`}>
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className={`group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className={`relative overflow-hidden ${
                    viewMode === "list" ? "w-32 sm:w-48 h-32 sm:h-48 flex-shrink-0" : "aspect-[4/5]"
                  }`}>
                    <Link to={`/product/${product.id}`} className="block w-full h-full">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                      />
                    </Link>
                    
                    {/* Badges */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 pointer-events-none">
                      {product.badge && (
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[9px] sm:text-xs font-bold rounded-full shadow-md">
                          {product.badge}
                        </span>
                      )}
                      {product.isNew && (
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[9px] sm:text-xs font-bold rounded-full shadow-md">
                          New
                        </span>
                      )}
                      {product.isSale && product.originalPrice && (
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] sm:text-xs font-bold rounded-full shadow-md">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 sm:top-3 right-2 sm:top-3 p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 hover:scale-110 z-10 shadow-xs"
                      title="Toggle Wishlist"
                    >
                      <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                        isInWishlist(product.id) 
                          ? "fill-red-500 text-red-500" 
                          : "text-gray-600 hover:text-red-500"
                      }`} />
                    </button>

                    {/* Quick Actions */}
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 sm:gap-3 transition-opacity duration-300 ${
                      hoveredProduct === product.id ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}>
                      <Link to={`/product/${product.id}`} className="p-2 sm:p-3 bg-white text-gray-800 rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300 hover:scale-110 flex items-center justify-center" title="View details">
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Link>
                      <button 
                        onClick={() => {
                          addItem(product, 1);
                          setAddedId(product.id);
                          setTimeout(() => setAddedId(null), 2000);
                        }} 
                        className="p-2 sm:p-3 bg-white text-gray-800 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer" 
                        title="Add to cart"
                      >
                        {addedId === product.id ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        ) : (
                          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className={`p-3 sm:p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[11px] sm:text-xs text-purple-600 dark:text-purple-400 font-semibold truncate">
                          {product.brand}
                        </p>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm mt-0.5 sm:mt-1 hover:text-purple-600 transition-colors truncate">
                            {product.name}
                          </h3>
                        </Link>
                        {viewMode === "list" && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Category: {product.category}
                          </p>
                        )}
                        <div className="flex items-baseline flex-wrap gap-1.5 mt-2">
                          {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-base font-bold text-purple-600 dark:text-purple-400">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-[11px] font-medium text-stone-500 dark:text-neutral-400">
                            ({formatKHR(product.price)})
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {product.rating}
                          </span>
                          <span className="text-xs text-gray-400">({product.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
                      currentPage === index + 1
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="relative ml-auto w-full max-w-sm bg-white dark:bg-gray-900 h-full overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedFilters({
                      category: [],
                      priceRange: [],
                      size: [],
                      color: [],
                      rating: []
                    });
                    setMaxPrice(1500);
                  }}
                  className="text-xs text-purple-600 dark:text-purple-400 font-medium hover:underline"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            {/* Mobile filter content */}
            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const isAll = category === "All";
                    const isChecked = isAll
                      ? selectedFilters.category.length === 0 || selectedFilters.category.includes("All")
                      : selectedFilters.category.includes(category);

                    return (
                      <label key={category} className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (isAll) {
                              setSelectedFilters({
                                ...selectedFilters,
                                category: []
                              });
                            } else if (e.target.checked) {
                              setSelectedFilters({
                                ...selectedFilters,
                                category: [...selectedFilters.category.filter(c => c !== "All"), category]
                              });
                            } else {
                              setSelectedFilters({
                                ...selectedFilters,
                                category: selectedFilters.category.filter(c => c !== category)
                              });
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{category}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Filter with Scroll Slider & Options */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Price Range</h4>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded-full">
                    {maxPrice >= 60 ? "$0 — $60+" : `$0 — $${maxPrice}`}
                  </span>
                </div>

                {/* Interactive Price Range Scroll Slider */}
                <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-xl border border-gray-100 dark:border-gray-800 mb-3 space-y-2">
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600 focus:outline-none"
                    aria-label="Filter products by price slider"
                  />
                  <div className="flex justify-between text-[11px] font-medium text-gray-400">
                    <span>$5</span>
                    <span>$30</span>
                    <span>$60+</span>
                  </div>
                </div>

                {/* Scrollable Price Range Checkboxes */}
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1.5 scrollbar-thin">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedFilters.priceRange.includes(range.label)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFilters({
                              ...selectedFilters,
                              priceRange: [...selectedFilters.priceRange, range.label]
                            });
                          } else {
                            setSelectedFilters({
                              ...selectedFilters,
                              priceRange: selectedFilters.priceRange.filter(r => r !== range.label)
                            });
                          }
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter with Scroll */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Size</h4>
                  {selectedFilters.size.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedFilters({ ...selectedFilters, size: [] })}
                      className="text-xs text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                    >
                      Clear ({selectedFilters.size.length})
                    </button>
                  )}
                </div>

                {/* Scrollable Size Grid */}
                <div className="max-h-36 overflow-y-auto pr-1.5 scrollbar-thin">
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          if (selectedFilters.size.includes(size)) {
                            setSelectedFilters({
                              ...selectedFilters,
                              size: selectedFilters.size.filter(s => s !== size)
                            });
                          } else {
                            setSelectedFilters({
                              ...selectedFilters,
                              size: [...selectedFilters.size, size]
                            });
                          }
                        }}
                        className={`py-2 px-1 text-center rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer truncate ${
                          selectedFilters.size.includes(size)
                            ? "bg-purple-600 text-white shadow-sm ring-1 ring-purple-400"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                        title={size}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply Filters Button */}
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;