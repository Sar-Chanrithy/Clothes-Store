import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { products, getRelatedProducts, formatKHR } from "../data/products";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import {
  Star,
  Heart,
  ShoppingBag,
  Eye,
  ArrowRight,
  Minus,
  Plus,
  Truck,
  RefreshCw,
  Shield,
  Award,
  Share2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Check,
  Sparkles,
  X
} from "lucide-react";

/**
 * Editorial Product Detail Page
 * Featuring Arch-top gallery with Front & Back view switcher,
 * Minimalist luxury typography, responsive size/color selectors,
 * Brand impact story card, and collapsible accordions.
 */
const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addItem, toggleWishlist, isInWishlist } = useCart();
  const { t, language } = useLanguage();
  const isKhmer = language === "km";

  // Find exact product by id from URL, or fallback safely
  const decodedId = id ? decodeURIComponent(id).trim() : "";
  const product = useMemo(() => {
    if (!id) return products[0];
    return (
      products.find((p) => String(p.id) === decodedId) ||
      products.find((p) => String(p.id) === String(parseInt(decodedId, 10))) ||
      products.find((p) => p.name.toLowerCase() === decodedId.toLowerCase()) ||
      products.find((p) => p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === decodedId.toLowerCase()) ||
      products.find((p) => p.name.toLowerCase().includes(decodedId.toLowerCase())) ||
      products.find((p) => p.sku && p.sku.toLowerCase() === decodedId.toLowerCase()) ||
      products[0]
    );
  }, [id, decodedId]);

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
    : [product?.category || "Fashion", product?.subCategory || "Tops", "Luxury", "Velora"];

  const productColors = useMemo(() => {
    return (product?.colors && product.colors.length > 0 ? product.colors : ["Classic"]).map((c) => {
      if (typeof c === "string") {
        const colorMap = {
          white: "#FFFFFF",
          black: "#1A1A1A",
          navy: "#1B2A4A",
          charcoal: "#4A4A4A",
          camel: "#C4A882",
          gray: "#6B7280",
          grey: "#6B7280",
          blue: "#2563EB",
          "cobalt blue": "#1D4ED8",
          pink: "#EC4899",
          burgundy: "#831843",
          brown: "#78350F",
          tan: "#D97706",
          gold: "#F59E0B",
          silver: "#E5E7EB",
          olive: "#4D7C0F",
          beige: "#F5F5DC",
          red: "#DC2626",
          emerald: "#059669"
        };
        return { name: c, value: colorMap[c.toLowerCase()] || "#6B7280" };
      }
      return c;
    });
  }, [product]);

  const productSizes = useMemo(() => {
    if (product?.sizes && product.sizes.length > 0) return product.sizes;
    if (product?.size && product.size.length > 0) {
      return Array.isArray(product.size) ? product.size : [product.size];
    }
    return ["One Size"];
  }, [product]);

  const [selectedSize, setSelectedSize] = useState(productSizes[0] || null);
  const [selectedColor, setSelectedColor] = useState(productColors[0]?.name || null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Accordion open/close state
  const [accordions, setAccordions] = useState({
    details: true,
    care: false,
    shipping: false,
    returns: false
  });

  const toggleAccordion = (key) => {
    setAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Sync state whenever product changes
  useEffect(() => {
    if (product) {
      const sizes = (product.sizes && product.sizes.length > 0)
        ? product.sizes
        : (product.size && product.size.length > 0)
          ? (Array.isArray(product.size) ? product.size : [product.size])
          : ["One Size"];

      const colors = (product.colors && product.colors.length > 0 ? product.colors : ["Classic"]).map((c) =>
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

    if (product.colorImages) {
      if (product.colorImages[colorName]) return product.colorImages[colorName];
      const matchKey = Object.keys(product.colorImages).find(
        (k) => k.toLowerCase() === String(colorName).toLowerCase()
      );
      if (matchKey) return product.colorImages[matchKey];
    }

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

  // Build image list dynamically based on product images and selected color
  const displayImages = useMemo(() => {
    if (!product) return [];

    const activeColorImg = getColorImage(selectedColor);
    let baseImages = (product.images && product.images.length > 0)
      ? [...product.images]
      : [product.image];

    // If active color image is distinct, make sure it's at index 0
    if (activeColorImg && baseImages[0] !== activeColorImg) {
      baseImages = [activeColorImg, ...baseImages.filter((img) => img !== activeColorImg)];
    }

    return baseImages;
  }, [product, selectedColor]);

  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);
    const colorImg = getColorImage(colorName);
    if (colorImg) {
      const idx = displayImages.indexOf(colorImg);
      setSelectedImage(idx !== -1 ? idx : 0);
    } else {
      setSelectedImage(0);
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
    const clickedImg = displayImages[index];

    // Synchronize selectedColor if this image belongs to a specific color variant
    if (product?.colorImages && clickedImg) {
      const matched = Object.entries(product.colorImages).find(
        ([, path]) => path === clickedImg
      );
      if (matched && matched[0] !== selectedColor) {
        setSelectedColor(matched[0]);
      }
    } else if (product?.colors && product.colors[index] && product.images?.length > 1) {
      const matchedColor = typeof product.colors[index] === "string" ? product.colors[index] : product.colors[index].name;
      if (matchedColor && matchedColor !== selectedColor) {
        setSelectedColor(matchedColor);
      }
    }
  };

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#0c0c0e] text-white">
        <Eye className="w-12 h-12 text-[#c2a677] mb-4" />
        <h2 className="text-3xl font-serif mb-2">Product Not Found</h2>
        <p className="text-neutral-400 mb-6 max-w-md text-sm">
          We couldn't locate this piece in our collection. It may have sold out or been updated.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-[#c2a677] text-neutral-950 font-semibold rounded-full hover:bg-[#d6bc8f] transition-all"
        >
          Explore All Pieces
        </Link>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id, 4);

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => Math.min(prev + 1, product.maxQuantity || 10));
    } else {
      setQuantity((prev) => Math.max(prev - 1, 1));
    }
  };

  const addToCart = () => {
    if (productSizes.length > 0 && !selectedSize) {
      alert("Please choose a size first");
      return;
    }

    const chosenImage = displayImages[selectedImage] || displayImages[0] || product.image;

    addItem(
      {
        ...product,
        size: selectedSize || "One Size",
        color: selectedColor || "Default",
        selectedSize: selectedSize || "One Size",
        selectedColor: selectedColor || "Default",
        image: chosenImage
      },
      quantity
    );

    setToastMessage(`Added ${quantity} × ${product.name} to your bag!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isFavorited = isInWishlist(product.id);
  const activeImageSrc = displayImages[selectedImage] || product.image;

  return (
    <div className="bg-[#fcfbf9] dark:bg-[#0c0c0e] text-neutral-900 dark:text-neutral-100 min-h-screen transition-colors duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-slide-up border border-neutral-800 dark:border-neutral-200">
          <div className="p-2 bg-[#c2a677] text-neutral-950 rounded-full">
            <Check className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <p className="font-semibold text-sm">{toastMessage}</p>
            <div className="flex gap-4 mt-1">
              <Link to="/cart" className="text-xs text-[#c2a677] dark:text-amber-700 font-bold hover:underline">
                View Bag →
              </Link>
              <Link to="/checkout" className="text-xs text-neutral-400 dark:text-neutral-600 font-medium hover:underline">
                Checkout →
              </Link>
            </div>
          </div>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-neutral-400 hover:text-white dark:hover:text-neutral-950">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-medium overflow-x-auto whitespace-nowrap py-1">
          <Link to="/" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
            {isKhmer ? "ទំព័រដើម" : "Home"}
          </Link>
          <span className="text-neutral-300 dark:text-neutral-700">/</span>
          <Link to="/shop" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
            {isKhmer ? "ទំនិញទាំងអស់" : "Shop"}
          </Link>
          <span className="text-neutral-300 dark:text-neutral-700">/</span>
          <Link
            to={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-neutral-950 dark:hover:text-white transition-colors"
          >
            {product.category}
          </Link>
          <span className="text-neutral-300 dark:text-neutral-700">/</span>
          <span className="text-neutral-950 dark:text-white font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Main Product Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* ===== LEFT COLUMN: Editorial Luxury Product Gallery ===== */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col">
            
            {/* The Signature Editorial Gallery Card (4:5 Portrait Ratio) */}
            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-100 dark:bg-[#18181b] border border-neutral-200/80 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] group transition-all">
              
              {/* Product Garment Image Presentation */}
              {activeImageSrc && activeImageSrc.toLowerCase().endsWith(".png") ? (
                <div className="w-full h-full flex items-center justify-center p-8 sm:p-12 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-[#18181b] dark:to-[#121215]">
                  <img
                    key={activeImageSrc}
                    src={activeImageSrc}
                    alt={product.name}
                    className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80";
                    }}
                  />
                </div>
              ) : (
                <img
                  key={activeImageSrc}
                  src={activeImageSrc}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80";
                  }}
                />
              )}

              {/* Floating Prev / Next Navigation Arrows on Hover (when multiple photos exist) */}
              {displayImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleThumbnailClick((selectedImage - 1 + displayImages.length) % displayImages.length);
                    }}
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md text-neutral-800 dark:text-neutral-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl cursor-pointer border border-white/60 dark:border-white/10 z-20"
                    title="Previous image"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleThumbnailClick((selectedImage + 1) % displayImages.length);
                    }}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md text-neutral-800 dark:text-neutral-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl cursor-pointer border border-white/60 dark:border-white/10 z-20"
                    title="Next image"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Top-Left Badge (Discount / Special Drop) — Positioned with clean breathing room */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 flex flex-col gap-1.5 pointer-events-none">
                {product.drop ? (
                  <span className="px-3.5 py-1.5 bg-neutral-950/85 dark:bg-white/95 text-white dark:text-neutral-950 text-[11px] font-mono tracking-widest uppercase rounded-full shadow-lg backdrop-blur-md border border-white/15 dark:border-neutral-200 font-semibold">
                    {product.badge || "SPECIAL DROP"}
                  </span>
                ) : product.originalPrice && product.originalPrice > product.price ? (
                  <span className="px-3.5 py-1.5 bg-[#c2a677] text-neutral-950 text-xs font-bold uppercase rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5 tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-950"></span>
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                ) : product.badge ? (
                  <span className="px-3.5 py-1.5 bg-neutral-950/85 dark:bg-white/95 text-white dark:text-neutral-950 text-[11px] font-mono tracking-widest uppercase rounded-full shadow-lg backdrop-blur-md border border-white/15 dark:border-neutral-200 font-semibold">
                    {product.badge}
                  </span>
                ) : null}
              </div>

              {/* Top-Right Wishlist Heart Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-3 rounded-full bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md text-neutral-800 dark:text-neutral-200 hover:scale-110 active:scale-95 shadow-lg transition-all duration-300 cursor-pointer border border-white/60 dark:border-white/10 z-20"
                title="Save to wishlist"
                aria-label="Save to wishlist"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isFavorited ? "fill-rose-500 text-rose-500" : "text-neutral-700 dark:text-neutral-300"
                  }`}
                />
              </button>
            </div>

            {/* Thumbnails Gallery (Only shown if multiple actual images/colors exist) */}
            {displayImages.length > 1 && (
              <div className="flex items-center gap-3 sm:gap-4 mt-4 pt-1 overflow-x-auto pb-1">
                {displayImages.map((img, index) => {
                  const isActive = selectedImage === index;
                  const thumbIsPng = Boolean(img && img.toLowerCase().endsWith(".png"));
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleThumbnailClick(index)}
                      className={`group relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 flex-shrink-0 cursor-pointer aspect-[4/5] w-16 sm:w-20 ${
                        isActive
                          ? "ring-2 ring-neutral-950 dark:ring-[#c2a677] ring-offset-2 dark:ring-offset-neutral-950 shadow-md scale-105"
                          : "border border-neutral-200 dark:border-white/10 opacity-70 hover:opacity-100 hover:border-neutral-400"
                      } bg-neutral-100 dark:bg-neutral-900`}
                      aria-label={`View photo ${index + 1}`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className={`w-full h-full ${thumbIsPng ? "object-contain p-1.5" : "object-cover"} transition-transform duration-500 group-hover:scale-110`}
                      />
                    </button>
                  );
                })}
              </div>
            )}

          </div>

          {/* ===== RIGHT COLUMN: Editorial Typography & Product Actions ===== */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 sm:space-y-7">
            
            {/* Header Block */}
            <div>
              {/* Eyebrow / Drop Tag */}
              <p className="text-xs font-mono tracking-[0.25em] text-[#c2a677] uppercase font-semibold mb-2">
                {product.drop || `${product.brand || "VELORA"} • SKU: ${product.sku || `VEL-${String(product.id).padStart(4, "0")}`}`}
              </p>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-neutral-950 dark:text-white tracking-tight leading-[1.08] mb-3">
                {product.name}
              </h1>

              {/* Price & Currency */}
              <div className="flex items-baseline flex-wrap gap-3 mt-2">
                <span className="text-3xl sm:text-4xl font-sans font-bold text-neutral-950 dark:text-white tracking-tight">
                  ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                </span>
                <span className="text-base sm:text-lg font-normal text-neutral-500 dark:text-neutral-400 font-sans">
                  (≈ {formatKHR(product.price)})
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-neutral-400 line-through">
                    ${typeof product.originalPrice === "number" ? product.originalPrice.toFixed(2) : product.originalPrice}
                  </span>
                )}
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Rating & Stock status */}
              <div className="flex items-center gap-3 mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating || 5)
                          ? "fill-[#c2a677] text-[#c2a677]"
                          : "text-neutral-300 dark:text-neutral-700"
                      }`}
                    />
                  ))}
                  <span className="ml-1 font-semibold text-neutral-900 dark:text-white">
                    {product.rating || 5.0}
                  </span>
                </div>
                <span>•</span>
                <span>{product.reviews || 84} reviews</span>
                <span>•</span>
                <span className={`font-medium ${product.inStock ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"}`}>
                  {product.inStock ? "✓ In Stock" : "Sold Out"}
                </span>
              </div>
            </div>

            {/* Color Selector */}
            {productColors.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-medium mb-3">
                  Color — <span className="text-neutral-950 dark:text-white font-semibold capitalize">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {productColors.map((color) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => handleColorChange(color.name)}
                        className={`flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-neutral-950 dark:border-white bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-md scale-105"
                            : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-950 dark:hover:border-white text-neutral-700 dark:text-neutral-300 bg-white/50 dark:bg-neutral-900/50"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/20 shadow-inner flex-shrink-0"
                          style={{ backgroundColor: color.value }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-medium">
                  Size — <span className="text-neutral-950 dark:text-white font-semibold">{selectedSize ? selectedSize : "Choose a size"}</span>
                </p>
                {product.category !== "Accessories" && (
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs text-neutral-500 hover:text-neutral-950 dark:hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
                  >
                    Size guide
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {productSizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[50px] h-11 px-4 rounded-full font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-neutral-950 dark:bg-[#c2a677] text-white dark:text-neutral-950 font-bold shadow-md scale-105"
                          : "border border-neutral-300 dark:border-neutral-700 hover:border-neutral-950 dark:hover:border-white text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-900/60"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={quantity <= 1}
                  className="px-3.5 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-30 cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-mono text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange("increase")}
                  disabled={quantity >= (product.maxQuantity || 10)}
                  className="px-3.5 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-30 cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-xs text-neutral-400">
                Max {product.maxQuantity || 18} pieces
              </span>
            </div>

            {/* Primary Action Button (Matches Image 1: Full-Width Rounded Pill) */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={addToCart}
                className="w-full py-4 sm:py-4.5 rounded-full bg-neutral-950 hover:bg-neutral-800 dark:bg-[#c2a677] dark:hover:bg-[#d6bc8f] text-white dark:text-neutral-950 font-semibold tracking-wider text-sm sm:text-base uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {selectedSize
                    ? `Add to Cart — $${(product.price * quantity).toFixed(2)}`
                    : `Choose a size — $${(product.price * quantity).toFixed(2)}`}
                </span>
              </button>

              {/* Value Propositions directly below button (Matches Image 1) */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400 pt-1">
                <span>{product.id === 108 ? "✓ Free shipping over $75" : "✓ Free shipping over $30"}</span>
                <span>✓ 14-day returns</span>
                {product.id !== 108 && <span>✓ Guaranteed authenticity</span>}
              </div>
            </div>

            {/* Impact / Brand Story Card ("Where your $X.XX goes" - matches reference exactly) */}
            <div className="bg-[#f7f5f0] dark:bg-[#151518] border border-neutral-200/90 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-sm">
              <h3 className="font-serif italic text-lg sm:text-xl text-neutral-900 dark:text-white mb-2">
                Where your ${typeof product.price === "number" ? product.price.toFixed(2) : product.price} goes
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
                {product.id === 108
                  ? "A share of this purchase enters Project Pakistan — Rural Pakistan. The project page tracks updates and field photos as the work progresses."
                  : product.dropDescription ||
                    "A portion of every purchase funds our Phnom Penh tailoring atelier, ethically supporting Cambodian garment artisans with living wages, safe workshops, and sustainable textile craft."}
              </p>
              {product.id === 108 ? (
                <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="italic">Live totals connecting...</span>
                    <span className="font-medium text-neutral-900 dark:text-white">Goal $20,000</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-neutral-900 dark:bg-white rounded-full" />
                  </div>
                  <div className="pt-1">
                    <a href="#project" className="text-xs font-medium text-neutral-900 dark:text-white underline underline-offset-4 hover:text-[#c2a677] transition-colors">
                      See the project →
                    </a>
                  </div>
                </div>
              ) : (
                <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1.5 font-medium text-[#c2a677]">
                    <Check className="w-3.5 h-3.5" /> Handcrafted in Cambodia
                  </span>
                  <Link
                    to="/about"
                    className="font-mono text-[11px] uppercase tracking-wider text-neutral-600 dark:text-neutral-300 hover:text-[#c2a677] transition-colors"
                  >
                    Our atelier story →
                  </Link>
                </div>
              )}
            </div>

            {/* Collapsible Accordions ("Details & fit" like Image 1) */}
            <div className="border-t border-neutral-200 dark:border-white/10 pt-2 divide-y divide-neutral-200 dark:divide-white/10">
              
              {/* Accordion 1: Details & fit */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion("details")}
                  className="w-full flex items-center justify-between text-left font-serif text-base sm:text-lg text-neutral-950 dark:text-white hover:text-[#c2a677] transition-colors cursor-pointer"
                >
                  <span>Details & fit</span>
                  {accordions.details ? <Minus className="w-4 h-4 text-neutral-400" /> : <Plus className="w-4 h-4 text-neutral-400" />}
                </button>
                {accordions.details && (
                  <div className="pt-3 pb-1 space-y-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed animate-fade-in">
                    <p>{product.description}</p>
                    <ul className="space-y-1.5 pl-4 list-disc text-neutral-600 dark:text-neutral-300">
                      {productDetails.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Fabric & care */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion("care")}
                  className="w-full flex items-center justify-between text-left font-serif text-base sm:text-lg text-neutral-950 dark:text-white hover:text-[#c2a677] transition-colors cursor-pointer"
                >
                  <span>Fabric & care</span>
                  {accordions.care ? <Minus className="w-4 h-4 text-neutral-400" /> : <Plus className="w-4 h-4 text-neutral-400" />}
                </button>
                {accordions.care && (
                  <div className="pt-3 pb-1 space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed animate-fade-in">
                    <p>• Machine wash cold (30°C) with like colors inside out.</p>
                    <p>• Do not bleach or tumble dry high heat.</p>
                    <p>• Lay flat or hang in shade to preserve textile softness and silhouette.</p>
                    <p>• Warm iron if needed, avoiding direct graphic prints.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & delivery */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full flex items-center justify-between text-left font-serif text-base sm:text-lg text-neutral-950 dark:text-white hover:text-[#c2a677] transition-colors cursor-pointer"
                >
                  <span>Shipping & delivery in Cambodia</span>
                  {accordions.shipping ? <Minus className="w-4 h-4 text-neutral-400" /> : <Plus className="w-4 h-4 text-neutral-400" />}
                </button>
                {accordions.shipping && (
                  <div className="pt-3 pb-1 space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed animate-fade-in">
                    <p>• <strong>Phnom Penh:</strong> Same-day or next-day delivery via local courier ($1.50, free over $30).</p>
                    <p>• <strong>Provinces:</strong> 1-2 business days delivery nationwide via J&T Express or Virak Buntham ($2.50).</p>
                    <p>• <strong>Payment Methods:</strong> Cash on Delivery (COD), ABA Pay QR, and Wing Pay accepted.</p>
                  </div>
                )}
              </div>

              {/* Accordion 4: 14-day returns */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion("returns")}
                  className="w-full flex items-center justify-between text-left font-serif text-base sm:text-lg text-neutral-950 dark:text-white hover:text-[#c2a677] transition-colors cursor-pointer"
                >
                  <span>14-Day returns & exchanges</span>
                  {accordions.returns ? <Minus className="w-4 h-4 text-neutral-400" /> : <Plus className="w-4 h-4 text-neutral-400" />}
                </button>
                {accordions.returns && (
                  <div className="pt-3 pb-1 space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed animate-fade-in">
                    <p>• Enjoy hassle-free 14-day returns or size swaps.</p>
                    <p>• Garment must be unworn, unwashed with original tags attached.</p>
                    <p>• Contact our team via Telegram or Facebook for instant exchange courier pickup.</p>
                  </div>
                )}
              </div>

            </div>

            {/* Share action */}
            <div className="pt-2 flex items-center justify-between text-xs text-neutral-400">
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.name,
                      text: `Discover ${product.name} at RITHY STORE!`,
                      url: window.location.href
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
                className="inline-flex items-center gap-2 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share this piece</span>
              </button>
              <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                100% Authentic Quality
              </span>
            </div>

          </div>

        </div>
      </main>

      {/* ===== RELATED PRODUCTS SECTION ===== */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-t border-neutral-200 dark:border-white/10">
          <div className="flex items-end justify-between mb-8 sm:mb-10">
            <div>
              <p className="text-xs font-mono tracking-[0.22em] text-[#c2a677] uppercase font-semibold mb-1">
                CURATED COMPLEMENTS
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif text-neutral-950 dark:text-white tracking-tight">
                You May Also Like
              </h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-neutral-950 dark:text-white hover:text-[#c2a677] transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-white dark:bg-[#151518] border border-neutral-200/80 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <Link to={`/product/${item.id}`} className="block relative aspect-square overflow-hidden bg-[#f4f2ee] dark:bg-[#1a1a1e]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {item.badge && (
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-neutral-950/80 dark:bg-white/90 text-white dark:text-neutral-950 text-[10px] font-mono tracking-wider uppercase rounded-full backdrop-blur-md">
                      {item.badge}
                    </span>
                  )}
                </Link>
                <div className="p-4">
                  <Link to={`/product/${item.id}`} className="block">
                    <h3 className="font-medium text-xs sm:text-sm text-neutral-900 dark:text-white truncate group-hover:text-[#c2a677] transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="font-bold text-sm sm:text-base text-neutral-950 dark:text-white">
                      ${typeof item.price === "number" ? item.price.toFixed(2) : item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through">
                        ${typeof item.originalPrice === "number" ? item.originalPrice.toFixed(2) : item.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== SIZE GUIDE MODAL ===== */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#151518] rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl border border-neutral-200 dark:border-white/10">
            <button
              type="button"
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-neutral-500"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-2xl text-neutral-950 dark:text-white mb-2">
              Size & Measurements Guide
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
              All measurements are tailored in inches for modern comfortable fit.
            </p>
            <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-white/10">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="bg-neutral-100 dark:bg-neutral-800/60 font-semibold text-neutral-900 dark:text-white">
                    <th className="px-4 py-3 text-left">Size</th>
                    <th className="px-4 py-3 text-left">Chest (in)</th>
                    <th className="px-4 py-3 text-left">Length (in)</th>
                    <th className="px-4 py-3 text-left">Shoulder (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-white/10 text-neutral-700 dark:text-neutral-300">
                  {[
                    { size: "XS", chest: "36-38", len: "26.5", shoulder: "17.0" },
                    { size: "S", chest: "38-40", len: "27.5", shoulder: "17.5" },
                    { size: "M", chest: "40-42", len: "28.5", shoulder: "18.5" },
                    { size: "L", chest: "42-44", len: "29.5", shoulder: "19.5" },
                    { size: "XL", chest: "44-46", len: "30.5", shoulder: "20.5" },
                    { size: "XXL", chest: "46-48", len: "31.5", shoulder: "21.5" }
                  ].map((row) => (
                    <tr key={row.size} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                      <td className="px-4 py-3 font-bold text-neutral-950 dark:text-white">{row.size}</td>
                      <td className="px-4 py-3">{row.chest}</td>
                      <td className="px-4 py-3">{row.len}</td>
                      <td className="px-4 py-3">{row.shoulder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 p-4 rounded-xl bg-[#f7f5f0] dark:bg-[#1a1a1e] border border-neutral-200/80 dark:border-white/10 text-xs text-neutral-600 dark:text-neutral-300 space-y-1">
              <p>• <strong>Chest:</strong> Measure around the fullest part of chest under the arms.</p>
              <p>• <strong>Length:</strong> Measure from the highest point of the shoulder down to the hem.</p>
              <p>• Need personalized sizing advice? Chat with our team anytime.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Product;
