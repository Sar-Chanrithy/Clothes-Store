import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import {
  Star,
  Heart,
  ShoppingBag,
  Eye,
  Truck,
  RefreshCw,
  Shield,
  Award,
  Minus,
  Plus,
  Check,
  ChevronRight,
  Share2,
  X
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find product by id from URL, or fallback to first product
  const product = products.find((p) => String(p.id) === String(id)) || products[0];

  const productDetails = (product.details && product.details.length > 0)
    ? product.details
    : [
        "100% premium quality tailored construction",
        "Designed for modern luxury and supreme comfort",
        "Durable fine stitching with premium finish",
        "Easy care instructions and lasting color retention"
      ];

  const productTags = (product.tags && product.tags.length > 0)
    ? product.tags
    : [product.category || "Fashion", "NewArrival", "Luxury", "Velora"];

  const productColors = (product.colors && product.colors.length > 0 ? product.colors : ["Classic"]).map((c) => {
    if (typeof c === "string") {
      const colorMap = {
        white: "#FFFFFF",
        black: "#1A1A1A",
        navy: "#1B2A4A",
        charcoal: "#4A4A4A",
        camel: "#C4A882",
        gray: "#6B7280",
        blue: "#2563EB",
        pink: "#EC4899",
        burgundy: "#831843",
        brown: "#78350F",
        tan: "#D97706",
        gold: "#F59E0B",
        silver: "#E5E7EB",
        olive: "#4D7C0F",
        beige: "#F5F5DC",
        red: "#DC2626"
      };
      return { name: c, value: colorMap[c.toLowerCase()] || "#6B7280" };
    }
    return c;
  });

  const productSizes = (product.sizes && product.sizes.length > 0) ? product.sizes : ["S", "M", "L", "XL"];
  const displayImages = (product.images && product.images.length > 0) ? product.images : [product.image];

  const [selectedSize, setSelectedSize] = useState(productSizes[0] || null);
  const [selectedColor, setSelectedColor] = useState(productColors[0]?.name || null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Sync state whenever id changes
  useEffect(() => {
    setSelectedSize(productSizes[0] || null);
    setSelectedColor(productColors[0]?.name || null);
    setSelectedImage(0);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  const features = [
    { icon: Truck, label: "Free Shipping", desc: "On orders over $100" },
    { icon: RefreshCw, label: "Easy Returns", desc: "30-day return policy" },
    { icon: Shield, label: "Secure Payment", desc: "100% protected" },
    { icon: Award, label: "Premium Quality", desc: "Guaranteed satisfaction" }
  ];

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => Math.min(prev + 1, 10));
    } else {
      setQuantity((prev) => Math.max(prev - 1, 1));
    }
  };

  const addToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    if (!selectedColor) {
      alert("Please select a color");
      return;
    }
    navigate("/cart");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/shop" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg aspect-[4/5]">
              <img
                src={displayImages[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsWishlist(!isWishlist)}
                aria-label="Wishlist"
                className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <Heart className={`w-5 h-5 ${isWishlist ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"}`} />
              </button>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold rounded-full shadow-md">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {displayImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative rounded-xl overflow-hidden aspect-[4/5] transition-all duration-300 ${
                      selectedImage === index
                        ? "ring-2 ring-purple-500 shadow-lg scale-105"
                        : "hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                {product.brand || "VELORA Collection"}
              </p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating || 5)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {product.rating || "4.9"}
                </span>
                <span className="text-sm text-gray-400">
                  ({product.reviews || 120} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                ${Number(product.price).toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Color: <span className="text-purple-600 dark:text-purple-400 font-normal">{selectedColor}</span>
                </span>
              </div>
              <div className="flex gap-3">
                {productColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 rounded-full relative transition-transform duration-200 ${
                      selectedColor === color.name ? "ring-2 ring-offset-2 ring-purple-500 scale-110" : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {selectedColor === color.name && (
                      <Check
                        className={`w-4 h-4 absolute inset-0 m-auto ${
                          color.value === "#FFFFFF" ? "text-gray-900" : "text-white"
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Size: <span className="text-purple-600 dark:text-purple-400 font-normal">{selectedSize}</span>
                </span>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {productSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-purple-600 text-white shadow-md shadow-purple-500/30 scale-105"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
                  aria-label="Decrease"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-semibold text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
                  aria-label="Increase"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={addToCart}
                className="flex-1 py-3.5 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart • ${(product.price * quantity).toFixed(2)}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">{f.label}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {productTags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-800">
            {[
              { id: "description", label: "Description" },
              { id: "details", label: "Details & Specifications" },
              { id: "reviews", label: `Reviews (${product.reviews || 120})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 bg-purple-50/50 dark:bg-purple-950/20"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === "description" && (
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                  {product.description}
                </p>
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-5 mt-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Highlights:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {productDetails.slice(0, 4).map((detail, index) => (
                      <li key={index} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                        <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
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
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{detail}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                  <div className="text-center">
                    <div className="text-5xl font-extrabold text-gray-900 dark:text-white">
                      {product.rating || "4.9"}
                    </div>
                    <div className="flex gap-1 mt-2 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Based on {product.reviews || 120} verified reviews
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <div key={item.id} className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden aspect-[4/5]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Link to={`/product/${item.id}`} className="p-2.5 bg-white rounded-full hover:bg-purple-600 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="p-4">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm hover:text-purple-600 truncate">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-purple-600 font-bold mt-1">${Number(item.price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Size Guide</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  <tr>
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">Chest</th>
                    <th className="p-2.5">Waist</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                  <tr><td className="p-2.5 font-medium">S</td><td className="p-2.5">36-38"</td><td className="p-2.5">30-32"</td></tr>
                  <tr><td className="p-2.5 font-medium">M</td><td className="p-2.5">38-40"</td><td className="p-2.5">32-34"</td></tr>
                  <tr><td className="p-2.5 font-medium">L</td><td className="p-2.5">40-42"</td><td className="p-2.5">34-36"</td></tr>
                  <tr><td className="p-2.5 font-medium">XL</td><td className="p-2.5">42-44"</td><td className="p-2.5">36-38"</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;