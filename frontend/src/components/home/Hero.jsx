import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import menBanner from "../../assets/banner/men.png";
import womanBanner from "../../assets/banner/womanbanner.png";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Gem,
  ShieldCheck,
  Truck,
  ShoppingBag,
  ArrowRight
} from "lucide-react";

const SLIDE_DURATION = 5500; // 5.5 seconds per banner

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const { t, isKhmer } = useLanguage();

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // The 2 official banners requested by the user
  const slides = [
    {
      id: 1,
      name: "Men's Collection",
      tabLabel: t("tab_mens", "Men's Collection"),
      discount: "30% - 50% OFF",
      image: menBanner,
      link: "/shop?category=Men's Fashion",
      alt: "RITHY STORE - Men's Collection - Trendy, Comfortable & High Quality (30% - 50% OFF)"
    },
    {
      id: 2,
      name: "Women's Collection",
      tabLabel: t("tab_womens", "Women's Collection"),
      discount: "30% - 50% OFF",
      image: womanBanner,
      link: "/shop?category=Women's Fashion",
      alt: "RITHY STORE - Women's Collection - Trendy, Elegant & Comfortable Outfits (30% - 50% OFF)"
    }
  ];

  // Smooth auto-scroll timer with progress bar
  useEffect(() => {
    if (isPaused) return;

    const intervalStep = 50;
    const stepIncrement = (intervalStep / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % slides.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handleSelectSlide = (index) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
  };

  return (
    <div className="relative bg-stone-50 dark:bg-neutral-950 transition-colors duration-300">
      
      {/* ===== HERO 2-BANNER SLIDER CONTAINER ===== */}
      <section 
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Banner Artboard with Exact 1840:855 Aspect Ratio */}
        <div 
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/80 dark:border-white/10 bg-neutral-900 aspect-[1840/855] group select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Link
                  to={slide.link}
                  className="block w-full h-full relative cursor-pointer group/link"
                  title={`${slide.name} - ${slide.discount}`}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover sm:object-contain md:object-cover transition-transform duration-700 ease-out group-hover/link:scale-[1.01]"
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                </Link>
              </div>
            );
          })}

          {/* Floating Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-[#c2a677] text-white hover:text-neutral-950 backdrop-blur-md border border-white/20 hover:border-[#c2a677] flex items-center justify-center transition-all duration-300 shadow-xl opacity-90 sm:opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Floating Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-[#c2a677] text-white hover:text-neutral-950 backdrop-blur-md border border-white/20 hover:border-[#c2a677] flex items-center justify-center transition-all duration-300 shadow-xl opacity-90 sm:opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer"
            aria-label="Next banner"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* ===== HIGH-VISIBILITY "BUY NOW" / "ទិញឥឡូវនេះ" BUTTON IN MIDDLE ===== */}
          <div className="absolute bottom-3 sm:bottom-6 md:bottom-9 lg:bottom-11 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
            <Link
              to={slides[currentSlide].link}
              className="group/btn relative inline-flex items-center gap-2 sm:gap-2.5 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-[#e0b74c] to-amber-400 hover:from-amber-300 hover:to-amber-300 text-neutral-950 font-black text-xs sm:text-sm md:text-base tracking-wider uppercase shadow-[0_12px_36px_rgba(0,0,0,0.65)] hover:shadow-[0_16px_40px_rgba(224,183,76,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/90 ring-4 ring-black/25 cursor-pointer whitespace-nowrap"
              title={`${slides[currentSlide].name} - ${isKhmer ? "ទិញឥឡូវនេះ" : "Buy Now"}`}
            >
              {/* Soft Pulsing Ambient Glow Ring */}
              <span className="absolute -inset-1 rounded-full bg-amber-400/50 blur-md group-hover/btn:bg-amber-300/80 animate-pulse -z-10" />

              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-950 group-hover/btn:-rotate-12 transition-transform duration-300" strokeWidth={2.5} />
              <span className="font-extrabold tracking-wide drop-shadow-xs">
                {isKhmer ? "ទិញឥឡូវនេះ" : "BUY NOW"}
              </span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-950 group-hover/btn:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
            </Link>
          </div>

          {/* Minimal Floating Indicator Dots (Positioned at bottom-right) */}
          <div className="absolute bottom-2.5 sm:bottom-4 right-3 sm:right-5 z-20 hidden min-[480px]:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/15">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSlide(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === idx
                    ? "w-5 sm:w-6 h-1.5 bg-[#c2a677] shadow-xs shadow-[#c2a677]"
                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/80"
                }`}
                aria-label={`Go to banner ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ===== TAB SWITCHER & SLIDE CONTROLS (Directly Below Banner) ===== */}
        <div className="mt-3 sm:mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3">
          
          {/* The 2 Collection Tabs */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 flex-1 max-w-xl">
            {slides.map((slide, index) => {
              const isActive = currentSlide === index;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleSelectSlide(index)}
                  className={`relative overflow-hidden px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-between border ${
                    isActive
                      ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 border-[#c2a677] shadow-lg shadow-[#c2a677]/10"
                      : "bg-white/95 dark:bg-neutral-900/80 hover:bg-white dark:hover:bg-neutral-850 text-neutral-600 dark:text-neutral-400 border-neutral-200/80 dark:border-white/10"
                  }`}
                >
                  {/* Live Filling Progress Bar on Active Tab */}
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 h-[2.5px] bg-[#c2a677] transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                  
                  <div className="flex items-center gap-2 truncate">
                    <span className={`text-xs font-black ${isActive ? "text-[#c2a677] dark:text-[#a8894d]" : "text-neutral-400"}`}>
                      0{index + 1}
                    </span>
                    <span className="truncate">{slide.tabLabel}</span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isActive 
                      ? "bg-[#c2a677]/25 text-[#c2a677] dark:bg-[#c2a677]/25 dark:text-amber-900" 
                      : "bg-neutral-100 dark:bg-white/5 text-neutral-500"
                  }`}>
                    {slide.discount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Slide Controls & Auto/Paused Indicator */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 flex-shrink-0">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 hover:border-[#c2a677] rounded-xl text-xs font-mono text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer shadow-xs"
              title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-amber-500" /> : <Pause className="w-3.5 h-3.5 text-[#c2a677]" />}
              <span>{isPaused ? "PAUSED" : "AUTO"}</span>
            </button>

            <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 px-1">
              <span className="text-[#9a783e] dark:text-[#c2a677] font-bold">0{currentSlide + 1}</span> / 0{slides.length}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:border-[#c2a677] rounded-xl transition-colors cursor-pointer shadow-xs"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:border-[#c2a677] rounded-xl transition-colors cursor-pointer shadow-xs"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ===== BOTTOM FEATURE HIGHLIGHTS BAR ===== */}
      <section className="relative z-20 w-full bg-stone-100/90 dark:bg-neutral-900/90 border-y border-neutral-200 dark:border-white/10 py-4 sm:py-5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-white/10 gap-3 md:gap-0">
            
            {/* Feature 1: Premium Quality */}
            <div className="flex items-center gap-3.5 md:px-6 py-1.5 md:py-0 group">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center justify-center text-[#9a783e] dark:text-[#c2a677] flex-shrink-0 group-hover:bg-[#c2a677]/10 transition-colors shadow-xs">
                <Gem className="w-5 h-5" strokeWidth={1.7} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-neutral-900 dark:text-white">
                  {t("f1_title", "100% PREMIUM FABRICS")}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light mt-0.5">
                  {t("f1_desc", "Italian virgin wool, Mulberry silks & organic flax")}
                </p>
              </div>
            </div>

            {/* Feature 2: Perfect Fit & Guarantee */}
            <div className="flex items-center gap-3.5 md:px-6 py-1.5 md:py-0 group">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center justify-center text-[#9a783e] dark:text-[#c2a677] flex-shrink-0 group-hover:bg-[#c2a677]/10 transition-colors shadow-xs">
                <ShieldCheck className="w-5 h-5" strokeWidth={1.7} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-neutral-900 dark:text-white">
                  {t("f2_title", "PERFECT FIT & 7-DAY RETURN")}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light mt-0.5">
                  {t("f2_desc", "Hassle-free exchange & satisfaction guarantee")}
                </p>
              </div>
            </div>

            {/* Feature 3: Cambodia Fast Delivery */}
            <div className="flex items-center gap-3.5 md:px-6 py-1.5 md:py-0 group">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center justify-center text-[#9a783e] dark:text-[#c2a677] flex-shrink-0 group-hover:bg-[#c2a677]/10 transition-colors shadow-xs">
                <Truck className="w-5 h-5" strokeWidth={1.7} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-neutral-900 dark:text-white">
                  {t("f3_title", "CAMBODIA FAST DELIVERY")}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light mt-0.5">
                  {t("f3_desc", "Free on orders over $30 across all 25 provinces")}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Hero;
