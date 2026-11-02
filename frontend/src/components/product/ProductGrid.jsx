import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Grid3x3, List } from "lucide-react";

const ProductGrid = ({
  products = [],
  viewMode = "grid",
  onViewModeChange = () => {},
  onWishlistToggle = () => {},
  onAddToCart = () => {}
}) => {
  const safeProducts = Array.isArray(products) ? products : [];

  if (safeProducts.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
        <div className="text-6xl mb-4 animate-bounce">🔍</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          No products found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          We couldn't find any items matching your current filters or search query. Try resetting filters.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* View Controls */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-white">{safeProducts.length}</span> products
        </p>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-1 flex items-center gap-1 shadow-sm">
          <button
            onClick={() => onViewModeChange("grid")}
            aria-label="Grid View"
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === "grid"
                ? "bg-purple-600 text-white shadow"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            aria-label="List View"
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === "list"
                ? "bg-purple-600 text-white shadow"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "grid-cols-1 gap-4"
        }`}
      >
        {safeProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onWishlistToggle={onWishlistToggle}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;