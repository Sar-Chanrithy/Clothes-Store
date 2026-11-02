import React, { useState } from "react";
import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";

const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500' fill='%23f3f4f6'%3E%3Crect width='400' height='500' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%239ca3af'%3EProduct Image%3C/text%3E%3C/svg%3E";

const ProductCard = ({ product, onWishlistToggle, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  if (!product) return null;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlist(!isWishlist);
    if (onWishlistToggle) {
      onWishlistToggle(product.id);
    }
  };

  const handleCartClick = (e) => {
    if (onAddToCart) {
      e.preventDefault();
      e.stopPropagation();
      onAddToCart(product);
    }
  };

  const formattedPrice = typeof product.price === "number"
    ? product.price.toFixed(2)
    : Number(product.price || 0).toFixed(2);

  const formattedOriginalPrice = product.originalPrice && typeof product.originalPrice === "number"
    ? product.originalPrice.toFixed(2)
    : product.originalPrice ? Number(product.originalPrice).toFixed(2) : null;

  return (
    <div
      className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/5] bg-gray-100 dark:bg-gray-800">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image || FALLBACK_IMAGE}
            alt={product.name || "Product"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
          {product.badge && (
            <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-md">
              {product.badge}
            </span>
          )}
          {product.isNew && (
            <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full shadow-md">
              New
            </span>
          )}
          {product.isSale && formattedOriginalPrice && (
            <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-md">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          type="button"
          aria-label="Toggle Wishlist"
          className="absolute top-3 right-3 p-2.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 z-10"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlist
                ? "fill-red-500 text-red-500"
                : "text-gray-600 dark:text-gray-300"
            }`}
          />
        </button>

        {/* Quick Actions Hover Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Link
            to={`/product/${product.id}`}
            className="p-3 bg-white text-gray-800 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg flex items-center justify-center"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <Link
            to="/cart"
            onClick={handleCartClick}
            className="p-3 bg-white text-gray-800 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg flex items-center justify-center"
            title="Add to Cart"
          >
            <ShoppingBag className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {product.brand && (
            <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mb-1">
              {product.brand}
            </p>
          )}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            {formattedOriginalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${formattedOriginalPrice}
              </span>
            )}
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
              ${formattedPrice}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {product.rating || "4.8"}
            </span>
            <span className="text-xs text-gray-400">({product.reviews || 45})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;