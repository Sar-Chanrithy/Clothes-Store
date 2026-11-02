import React, { useState } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";

const ProductFilter = ({
  filters = {},
  onFilterChange = () => {},
  onReset = () => {}
}) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    size: true,
    color: true,
    rating: true
  });

  const categories = filters.categories || ["All", "Men's Fashion", "Women's Fashion"];
  const selectedCategories = filters.selectedCategories || [];

  const priceRanges = filters.priceRanges || [
    { label: "Under $100", min: 0, max: 100 },
    { label: "$100 - $300", min: 100, max: 300 },
    { label: "$300 - $600", min: 300, max: 600 },
    { label: "Over $600", min: 600, max: 2000 }
  ];
  const selectedPriceRanges = filters.selectedPriceRanges || [];

  const sizes = filters.sizes || ["XS", "S", "M", "L", "XL", "XXL"];
  const selectedSizes = filters.selectedSizes || [];

  const colors = filters.colors || ["Black", "White", "Navy", "Charcoal", "Camel", "Blue"];
  const selectedColors = filters.selectedColors || [];

  const selectedRatings = filters.selectedRatings || [];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FilterSection = ({ title, section, children }) => (
    <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-800 last:border-b-0 last:pb-0">
      <button
        onClick={() => toggleSection(section)}
        type="button"
        className="flex items-center justify-between w-full text-left mb-3 group"
      >
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {title}
        </h4>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
            expandedSections[section] ? "rotate-180" : ""
          }`}
        />
      </button>
      {expandedSections[section] && children}
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-bold text-gray-900 dark:text-white text-base">Filters</h3>
        <button
          onClick={onReset}
          type="button"
          className="text-xs font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All
        </button>
      </div>

      {/* Category Filter */}
      <FilterSection title="Category" section="category">
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2.5 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={(e) => onFilterChange("categories", category, e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection title="Price Range" section="price">
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center gap-2.5 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={selectedPriceRanges.includes(range.label)}
                onChange={(e) => onFilterChange("priceRanges", range.label, e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Size Filter */}
      <FilterSection title="Size" section="size">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onFilterChange("sizes", size)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                selectedSizes.includes(size)
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Color Filter */}
      <FilterSection title="Color" section="color">
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onFilterChange("colors", color)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                selectedColors.includes(color)
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection title="Rating" section="rating">
        <div className="space-y-2">
          {[4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center gap-2.5 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={(e) => onFilterChange("ratings", rating, e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {rating}+ Stars
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

export default ProductFilter;