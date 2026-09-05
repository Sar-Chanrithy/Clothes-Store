import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, Heart, Package } from "lucide-react";

const EmptyState = ({
  icon = "shopping-bag",
  title = "Nothing here yet",
  description = "Start exploring and add items to your collection",
  actionText = "Browse Collection",
  actionLink,
  onAction,
  className = ""
}) => {
  // Icon mapping
  const iconMap = {
    "shopping-bag": ShoppingBag,
    search: Search,
    heart: Heart,
    package: Package
  };

  const IconComponent = typeof icon === "function" || (typeof icon === "object" && icon !== null)
    ? icon
    : (iconMap[icon] || ShoppingBag);

  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mb-6 shadow-sm">
        <IconComponent className="w-10 h-10 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto text-sm leading-relaxed">
        {description}
      </p>
      {actionLink ? (
        <Link
          to={actionLink}
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 text-sm"
        >
          {actionText}
        </Link>
      ) : onAction ? (
        <button
          onClick={onAction}
          type="button"
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 text-sm"
        >
          {actionText}
        </button>
      ) : null}
    </div>
  );
};

export default EmptyState;