import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { products, getRelatedProducts, formatKHR } from "../data/products";
import { useCart } from "../context/CartContext";
import {
  Star,
  Heart,
  ShoppingBag,
  Eye,
  ArrowRight,
  ArrowLeft,
  Minus,
  Plus,
  Truck,
  RefreshCw,
  Shield,
  Award,
  Share2,
  ChevronRight,
  Check,
  Sparkles,
  X,
  ShoppingCart
} from "lucide-react";

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addItem, toggleWishlist, isInWishlist } = useCart();

  // Find exact product by id from URL, or fallback safely to first product
  const decodedId = id ? decodeURIComponent(id).trim() : "";
  const product = id 
    ? (
        products.find((p) => String(p.id) === decodedId) ||
        products.find((p) => String(p.id) === String(parseInt(decodedId, 10))) ||
        products.find((p) => p.name.toLowerCase() === decodedId.toLowerCase()) ||
        products.find((p) => p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === decodedId.toLowerCase()) ||
        products.find((p) => p.name.toLowerCase().includes(decodedId.toLowerCase())) ||
        products.find((p) => p.sku && p.sku.toLowerCase() === decodedId.toLowerCase()) ||
        products[0]
      )
    : products[0];

  const productDetails = (product?.details && product.details.length > 0) 
    ? product.details 
    : [
        "100% premium quality tailored construction",
        "Designed for modern luxury and supreme comfort",
        "Durable fine stitching with premium finish",
        "Easy care instructions and lasting color retention"
      ];

  const productTags = (product?.tags && product.tags.length > 0)
    ? product.tags
    : [product?.category || "Fashion", product?.subCategory || "NewArrival", "Luxury", "Velora"];

  const productColors = (product?.colors && product.colors.length > 0 ? product.colors : ["Classic"]).map((c) => {
    if (typeof c === "string") {
      const colorMap = {
        white: "#FFFFFF",
        black: "#1A1A1A",
        navy: "#1B2A4A",
        charcoal: "#4A4A4A",
        camel: "#C4A882",
        gray: "#6B7280",
        blue: "#2563EB",
        "blue motif": "#4A6B82",
        pink: "#EC4899",
        burgundy: "#831843",
        brown: "#78350F",
        tan: "#D97706",
        gold: "#F59E0B",
        silver: "#E5E7EB",
        olive: "#4D7C0F",
        beige: "#F5F5DC",
        red: "#DC2626",
        emerald: "#059669",
        champagne: "#F7E7CE",
        oatmeal: "#E6DEC8"
      };
      return { name: c, value: colorMap[c.toLowerCase()] || "#6B7280" };
    }
    return c;
  });

  const productSizes = (product?.sizes && product.sizes.length > 0)
    ? product.sizes
    : (product?.size && product.size.length > 0)
      ? (Array.isArray(product.size) ? product.size : [product.size])
      : ["One Size"];

  const [selectedSize, setSelectedSize] = useState(productSizes[0] || null);
  const [selectedColor, setSelectedColor] = useState(productColors[0]?.name || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync state whenever product changes
  useEffect(() => {
    if (product) {
      const sizes = (product.sizes && product.sizes.length > 0)
        ? product.sizes
        : (product.size && product.size.length > 0)
          ? (Array.isArray(product.size) ? product.size : [product.size])
          : ["One Size"];
      
      const colors = (product.colors && product.colors.length > 0 ? product.colors : ["Classic"]).map(c => 
        typeof c === "string" ? c : c.name
      );

      setSelectedSize(sizes[0] || null);
      setSelectedColor(colors[0] || null);
      setSelectedImage(0);
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [id, product]);

  // Helper to retrieve the matching photo for a given color
  const getColorImage = (colorName) => {
    if (!product || !colorName) return product?.image;

    // 1. Check explicit colorImages map
    if (product.colorImages) {
      if (product.colorImages[colorName]) return product.colorImages[colorName];
      const matchKey = Object.keys(product.colorImages).find(
        (k) => k.toLowerCase() === String(colorName).toLowerCase()
      );
      if (matchKey) return product.colorImages[matchKey];
    }

    // 2. Check 1-to-1 index alignment between colors and images
    if (product.colors && product.images && product.images.length > 1) {
      const idx = product.colors.findIndex(
        (c) => (typeof c === "string" ? c : c.name).toLowerCase() === String(colorName).toLowerCase()
      );
      if (idx !== -1 && product.images[idx]) {
        return product.images[idx];
      }
    }

    return product.image;
  };

  // Build image list dynamically, placing the selected color image first
  const displayImages = React.useMemo(() => {
    if (!product) return [];

    const activeColorImg = getColorImage(selectedColor);
    const baseImages = (product.images && product.images.length > 0) ? product.images : [product.image];

    if (activeColorImg) {
      const remaining = baseImages.filter((img) => img !== activeColorImg);
      return [activeColorImg, ...remaining];
    }

    return baseImages;
  }, [product, selectedColor]);

  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);
    setSelectedImage(0); // Immediately displays image matching the selected color
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
    // If thumbnails correspond to distinct colors, synchronize selectedColor as well
    if (product?.colors && product.colors[index]) {
      const matchedColor = typeof product.colors[index] === "string" ? product.colors[index] : product.colors[index].name;
      if (matchedColor && matchedColor !== selectedColor) {
        setSelectedColor(matchedColor);
      }
    }
  };

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-gray-950">
        <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
          <Eye className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">Product Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
          We couldn't find the product you're looking for (ID #{id}). It may be unavailable or deleted.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg shadow-purple-500/25 hover:scale-105 transition-all"
        >
          Explore All Products
        </Link>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id, 4);

  const features = [
    { icon: Truck, label: "Free Delivery", desc: "On orders over $30 in Cambodia" },
    { icon: RefreshCw, label: "Easy Returns", desc: "7-day return policy" },
    { icon: Shield, label: "Secure Payment", desc: "ABA Pay, Wing & Cash on Delivery" },
    { icon: Award, label: "Premium Quality", desc: "Guaranteed satisfaction" }
  ];

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity(prev => Math.min(prev + 1, product.maxQuantity || 10));
    } else {
      setQuantity(prev => Math.max(prev - 1, 1));
    }
  };

  const addToCart = () => {
    if (productSizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }
    if (productColors.length > 0 && !selectedColor) {
      alert("Please select a color");
      return;
    }

    const chosenImage = displayImages[selectedImage] || displayImages[0] || product.image;

    addItem({
      ...product,
      size: selectedSize || "One Size",
      color: selectedColor || "Default",
      selectedSize: selectedSize || "One Size",
      selectedColor: selectedColor || "Default",
      image: chosenImage
    }, quantity);

    setToastMessage(`Added ${quantity} × ${product.name} (${selectedColor}) to your cart!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-slide-up border border-gray-700 dark:border-gray-200">
          <div className="p-2 bg-green-500 text-white rounded-full">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">{toastMessage}</p>
            <div className="flex gap-3 mt-1">
              <Link to="/cart" className="text-xs text-purple-400 dark:text-purple-600 font-bold hover:underline">
                View Cart →
              </Link>
              <Link to="/checkout" className="text-xs text-pink-400 dark:text-pink-600 font-bold hover:underline">
                Checkout →
              </Link>
            </div>
          </div>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-gray-400 hover:text-white dark:hover:text-gray-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/shop" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-purple-600 dark:text-purple-400 font-medium">
            {product.category}
          </span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images Gallery */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg aspect-[4/5] sm:aspect-auto sm:h-[500px]">
              <img
                key={`${product.id}-${selectedColor}-${selectedImage}`}
                src={displayImages[selectedImage] || product.image}
                alt={`${product.name} in ${selectedColor || 'Default'}`}
                className="w-full h-full object-cover transition-all duration-500"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop&q=80";
                }}
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                title="Toggle Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"}`} />
              </button>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold rounded-full shadow-md">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}

              {/* Color Tag Badge on Image */}
              {selectedColor && (
                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 dark:bg-gray-900/80 backdrop-blur-md rounded-xl text-white text-xs font-medium flex items-center gap-2 shadow-lg pointer-events-none">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/50"
                    style={{
                      backgroundColor:
                        productColors.find((c) => c.name === selectedColor)?.value || "#6B7280"
                    }}
                  />
                  <span>Color: {selectedColor}</span>
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {displayImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`relative rounded-xl overflow-hidden transition-all duration-300 aspect-square cursor-pointer ${
                      selectedImage === index 
                        ? "ring-2 ring-purple-500 shadow-lg scale-105" 
                        : "hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  {product.brand}
                </span>
                <span className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  SKU: {product.sku || `VEL-${String(product.id).padStart(4, "0")}`}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({product.reviews} reviews)
                </span>
                <span className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                <span className={`text-sm font-medium ${product.inStock ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
                  {product.inStock ? "✓ In Stock" : "Out of Stock"}
                </span>
              </div>

              <div className="mt-5">
                <div className="flex items-baseline flex-wrap gap-3">
                  <span className="text-4xl font-black text-gray-900 dark:text-white">
                    ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                  </span>
                  <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                    (≈ {formatKHR(product.price)})
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      ${typeof product.originalPrice === "number" ? product.originalPrice.toFixed(2) : product.originalPrice}
                    </span>
                  )}
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1 font-medium">
                    You save ${(product.originalPrice - product.price).toFixed(2)} ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                  </p>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Select Size
                </h3>
                {product.category !== "Accessories" && (
                  <button 
                    onClick={() => setShowSizeGuide(true)}
                    className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Size Guide
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {productSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[52px] px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            {productColors.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Select Color: <span className="font-normal text-purple-600 dark:text-purple-400">{selectedColor}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {productColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleColorChange(color.name)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border cursor-pointer ${
                        selectedColor === color.name
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 shadow-sm ring-1 ring-purple-400"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-gray-300 shadow-inner"
                        style={{ backgroundColor: color.value }}
                      />
                      <span>{color.name}</span>
                      {selectedColor === color.name && (
                        <Check className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-xl transition-colors disabled:opacity-40"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-xl transition-colors disabled:opacity-40"
                    disabled={quantity >= (product.maxQuantity || 10)}
                  >
                    <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Max {product.maxQuantity || 10} items
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={addToCart}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.name,
                      text: `Check out ${product.name} on VELORA!`,
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Product link copied to clipboard!");
                  }
                }}
                className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl font-semibold hover:border-purple-500 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Features Bar */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              {features.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tags */}
            {productTags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                {productTags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800">
          <div className="flex border-b border-gray-200 dark:border-gray-800">
            {[
              { id: "description", label: "Description" },
              { id: "details", label: "Details & Care" },
              { id: "reviews", label: "Reviews" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-500 bg-purple-50/50 dark:bg-purple-900/10"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-8">
            {activeTab === "description" && (
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                  {product.description}
                </p>
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    Key Highlights
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {productDetails.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                        <Check className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productDetails.map((detail, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                    <Check className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{detail}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <div className="text-center sm:text-left">
                    <div className="text-5xl font-extrabold text-gray-900 dark:text-white">
                      {product.rating}
                    </div>
                    <div className="flex gap-1 mt-2 justify-center sm:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"}`} />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Based on {product.reviews} authentic reviews
                    </div>
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-6 font-medium">{star}★</span>
                        <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                            style={{ width: `${star === 5 ? 78 : star === 4 ? 16 : star === 3 ? 4 : 2}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                You May Also Like
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                More pieces from our {product.category} collection
              </p>
            </div>
            <Link to="/shop" className="text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              View Shop
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map((item) => (
              <div key={item.id} className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800">
                <div className="relative overflow-hidden aspect-[4/5]">
                  <Link to={`/product/${item.id}`} className="block w-full h-full">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop&q=80";
                      }}
                    />
                  </Link>
                  {item.badge && (
                    <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] sm:text-xs font-bold rounded-full pointer-events-none">
                      {item.badge}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 sm:gap-3">
                    <Link
                      to={`/product/${item.id}`}
                      className="p-2 sm:p-3 bg-white text-gray-800 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-lg"
                      title="View"
                    >
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                    <button
                      onClick={() => toggleWishlist(item.id)}
                      className={`p-2 sm:p-3 bg-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${isInWishlist(item.id) ? "text-red-500" : "text-gray-800 hover:text-red-500"}`}
                      title="Wishlist"
                    >
                      <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isInWishlist(item.id) ? "fill-red-500" : ""}`} />
                    </button>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 hover:text-purple-600 transition-colors truncate">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    {item.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ${typeof item.originalPrice === "number" ? item.originalPrice.toFixed(2) : item.originalPrice}
                      </span>
                    )}
                    <span className="text-base font-bold text-purple-600 dark:text-purple-400">
                      ${typeof item.price === "number" ? item.price.toFixed(2) : item.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {item.rating}
                    </span>
                    <span className="text-gray-400">({item.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl border border-gray-200 dark:border-gray-800">
            <button 
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-5 right-5 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Size Guide</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">General Sizing Dimensions</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400">Size</th>
                        <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400">Chest/Bust (in)</th>
                        <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400">Waist (in)</th>
                        <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400">Hips (in)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {[
                        { size: "XS", chest: "32-34", waist: "26-28", hips: "34-36" },
                        { size: "S", chest: "35-37", waist: "29-31", hips: "37-39" },
                        { size: "M", chest: "38-40", waist: "32-34", hips: "40-42" },
                        { size: "L", chest: "41-43", waist: "35-37", hips: "43-45" },
                        { size: "XL", chest: "44-46", waist: "38-40", hips: "46-48" }
                      ].map((row) => (
                        <tr key={row.size} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.size}</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.chest}</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.waist}</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.hips}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-5 border border-purple-100 dark:border-purple-800">
                <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">How to Measure:</h4>
                <ul className="space-y-1.5 text-sm text-purple-700 dark:text-purple-300">
                  <li>• <strong>Chest/Bust:</strong> Measure around the fullest part of your chest.</li>
                  <li>• <strong>Waist:</strong> Measure around your natural waistline above your hip bones.</li>
                  <li>• <strong>Hips:</strong> Measure around the fullest part of your hips and seat.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;