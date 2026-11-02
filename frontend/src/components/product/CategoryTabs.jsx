import React from "react";

const CategoryTabs = ({
  categories = ["All", "Outerwear", "Shirts", "Suits", "Dresses", "Accessories"],
  activeCategory = "All",
  onCategoryChange = () => {}
}) => {
  const safeCategories = Array.isArray(categories) && categories.length > 0
    ? categories
    : ["All", "Outerwear", "Shirts", "Suits", "Dresses", "Accessories"];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {safeCategories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
            activeCategory === category
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-105"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;