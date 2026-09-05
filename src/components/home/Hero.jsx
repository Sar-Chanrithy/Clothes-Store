import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  ShoppingBag, 
  Eye, 
  Truck, 
  RefreshCw, 
  Shield, 
  Award,
  Sparkles,
  ChevronRight,
  Play,
  Star,
  Heart,
  MoveRight
} from "lucide-react";

import { products } from "../../data/products";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Hero Slides Data
  const slides = [
    {
      id: 1,
      title: "FASHION THAT",
      highlight: "MOVES WITH YOU.",
      subtitle: "NEW COLLECTION 2024",
      description: "Discover the perfect blend of comfort and style with our latest collection designed for the modern lifestyle.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop",
      ctaPrimary: "SHOP NOW",
      ctaSecondary: "EXPLORE NEW IN",
      gradient: "from-purple-600 via-pink-500 to-orange-400"
    },
    {
      id: 2,
      title: "ELEVATE YOUR",
      highlight: "EVERYDAY STYLE.",
      subtitle: "NEW SEASON NEW VIBES",
      description: "Step into the new season with confidence. Our curated collection brings you the latest trends with timeless elegance.",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=800&fit=crop",
      ctaPrimary: "EXPLORE COLLECTION",
      ctaSecondary: "VIEW TRENDS",
      gradient: "from-blue-600 via-indigo-500 to-purple-400"
    },
    {
      id: 3,
      title: "WHERE COMFORT",
      highlight: "MEETS ELEGANCE.",
      subtitle: "PREMIUM COLLECTION 2024",
      description: "Experience the perfect fusion of luxury and comfort. Designed for those who appreciate the finer things in life.",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&h=800&fit=crop",
      ctaPrimary: "DISCOVER NOW",
      ctaSecondary: "LEARN MORE",
      gradient: "from-emerald-600 via-teal-500 to-cyan-400"
    }
  ];

  // Categories Data
  const categories = [
    {
      name: "MEN",
      description: "Dedicated everyday essentials.",
      link: "/shop",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=500&fit=crop"
    },
    {
      name: "WOMEN",
      description: "Effortless style for every day.",
      link: "/shop",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=500&fit=crop"
    },
    {
      name: "KIDS",
      description: "Comfort meets cool everyday.",
      link: "/shop",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=500&fit=crop"
    }
  ];

  // Features Data
  const features = [
    { icon: Truck, label: "FAST DELIVERY", desc: "Quick & safe delivery" },
    { icon: RefreshCw, label: "EASY RETURNS", desc: "Within 15 days" },
    { icon: Shield, label: "QUALITY ASSURED", desc: "Best fashion, best quality" },
    { icon: Award, label: "SECURE PAYMENT", desc: "100% secure checkout" }
  ];

  // Best of VELORA Curated Products
  const bestProducts = products.slice(0, 4);

  // Auto-play carousel
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, slides.length]);

  const current = slides[currentSlide];

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* ===== HERO SECTION ===== */}
      <section 
        className="relative min-h-[90vh] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={current.image} 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[90vh] flex items-center">
          <div className="max-w-3xl text-white">
            {/* Brand Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs font-semibold tracking-widest border border-white/20 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              {current.subtitle}
            </div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] mb-2">
              {current.title}
              <br />
              <span className={`bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent`}>
                {current.highlight}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-200 max-w-xl mt-4 leading-relaxed">
              {current.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/shop"
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2 hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5" />
                {current.ctaPrimary}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/shop"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <Eye className="w-5 h-5" />
                {current.ctaSecondary}
              </Link>
            </div>

            {/* Slide Indicators */}
            <div className="flex gap-2 mt-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? "w-12 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500"
                      : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Slide Navigation Arrows */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="group relative overflow-hidden rounded-2xl h-80 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold tracking-wider">{category.name}</h3>
                  <p className="text-sm text-gray-200 mt-1">{category.description}</p>
                  <div className="flex items-center gap-1 mt-2 font-medium text-sm group-hover:gap-2 transition-all">
                    SHOP {category.name}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-12 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.label} className="text-center group">
                  <div className="w-14 h-14 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center group-hover:bg-purple-500 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-purple-600 dark:text-purple-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mt-3 tracking-wide">
                    {feature.label}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== BEST OF GAZU SECTION ===== */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                BEST OF GAZU
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Our most loved pieces, curated just for you
              </p>
            </div>
            <Link
              to="/shop"
              className="text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {bestProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 block border border-gray-100 dark:border-gray-800"
              >
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop&q=80";
                    }}
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-base font-bold text-purple-600 dark:text-purple-400">
                      ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;