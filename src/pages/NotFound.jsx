import React from "react";
import {
  Home,
  ArrowLeft,
  ShoppingBag,
  Search,
  Sparkles,
  ArrowRight,
  Heart,
  Star
} from "lucide-react";

const NotFound = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen flex items-center justify-center py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Graphic */}
        <div className="relative">
          <div className="text-8xl md:text-9xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              404
            </span>
          </div>
          <div className="absolute -top-4 -right-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        {/* Icon */}
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mb-6">
          <Search className="w-12 h-12 text-purple-600 dark:text-purple-400" />
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
          The page you're looking for doesn't exist or has been moved.
          <br />
          Let's get you back on track.
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <a
            href="#"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-all duration-300 group"
          >
            <Home className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors">
              Home
            </span>
          </a>
          <a
            href="#"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-all duration-300 group"
          >
            <ShoppingBag className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors">
              Shop
            </span>
          </a>
          <a
            href="#"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-all duration-300 group"
          >
            <Heart className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors">
              Wishlist
            </span>
          </a>
        </div>

        {/* Main CTA */}
        <a
          href="#"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
          <ArrowRight className="w-5 h-5" />
        </a>

        {/* Decorative Elements */}
        <div className="mt-12 grid grid-cols-5 gap-2 max-w-xs mx-auto">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full ${
                i % 2 === 0
                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>

        {/* Help Text */}
        <p className="mt-6 text-sm text-gray-400 dark:text-gray-500">
          Need help? <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;