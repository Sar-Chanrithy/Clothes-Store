import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Leaf,
  Gem,
  Package,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

/**
 * Hero Banner Component - TREND WEAR READYMADE
 * Featuring the flagship boutique store interior with luxury editorial typography.
 */
const Hero = ({ showFeatures = true }) => {
  const { t, language } = useLanguage();
  const isKhmer = language === "km";

  const showroomSlides = [
    {
      imageJpg: "/images/banner/store-interior.jpg",
      imageWebp: "/images/banner/store-interior.webp",
      alt: "Trend Wear Readymade - Good Choice Good Style Boutique Showroom",
      tag: "TREND WEAR READYMADE",
      title: "GOOD CHOICE • GOOD STYLE"
    },
    {
      imageJpg: "/images/banner/store-luxury-showroom.jpg",
      imageWebp: "/images/banner/store-luxury-showroom.webp",
      alt: "Flagship Luxury Fashion Boutique & Ready to Wear Atelier",
      tag: "FLAGSHIP SHOWROOM",
      title: "LUXURY ATELIER • READY TO WEAR"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % showroomSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, showroomSlides.length]);

  return (
    <div className="relative bg-[#0c0c0e] dark:bg-neutral-950 text-white overflow-hidden transition-colors duration-300">
      {/* Background Ambient Warm Lighting Glow matching store illumination */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#c2a677]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[460px] h-[460px] bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* ===== HERO MAIN BANNER SECTION ===== */}
      <section className="relative w-full border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Brand Story & Luxury Typography */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center z-10">
              
              {/* Eyebrow Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#c2a677]/50 text-[#c2a677] text-xs font-semibold tracking-[0.22em] uppercase backdrop-blur-md w-fit mb-4 sm:mb-5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#c2a677]" />
                <span>
                  {isKhmer ? "ហាងផ្ទាល់ខ្លួន & សម្លៀកបំពាក់ទាន់សម័យ" : "TREND WEAR • READYMADE"}
                </span>
              </div>

              {/* Main Headline (Editorial Serif) */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight text-white uppercase leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                {isKhmer ? (
                  <>
                    ជម្រើសល្អ <br />
                    <span className="text-[#c2a677] font-light">ស្ទីលទាន់សម័យ</span>
                  </>
                ) : (
                  <>
                    GOOD CHOICE. <br />
                    <span className="text-[#c2a677] font-light">GOOD STYLE.</span>
                  </>
                )}
              </h1>

              {/* Slogan */}
              <p className="text-sm sm:text-lg font-light text-[#e5d5be] mt-3 sm:mt-4 tracking-wide drop-shadow">
                {isKhmer ? "ស្ទីលសម្រាប់អ្នកគ្រប់គ្នា (Style For Every You)" : "Style For Every You."}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base text-neutral-300/90 font-light max-w-lg leading-relaxed mt-2 drop-shadow">
                {isKhmer
                  ? "សូមស្វាគមន៍មកកាន់ហាងផ្ទាល់ខ្លួនរបស់យើង។ ស្វែងរកការប្រមូលសម្លៀកបំពាក់បុរស និងនារីទាន់សម័យ ក្រណាត់គុណភាពខ្ពស់ និងការរចនាម៉ូដយ៉ាងផ្ចិតផ្ចង់។"
                  : "Step into our boutique showroom. Discover curated ready-to-wear essentials, premium imported textiles, and modern tailoring crafted for effortless everyday luxury."}
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                {/* Primary Button */}
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#c2a677] hover:bg-[#d6bc8f] text-neutral-950 font-bold tracking-[0.18em] text-xs sm:text-sm uppercase rounded transition-all duration-300 shadow-xl hover:shadow-[#c2a677]/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{isKhmer ? "ទិញឥឡូវនេះ" : "SHOP NOW"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Secondary Button */}
                <Link
                  to="/shop?filter=new"
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 bg-white/10 hover:bg-white/15 text-white font-medium tracking-[0.16em] text-xs sm:text-sm uppercase rounded backdrop-blur-md border border-white/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
                >
                  <span>{isKhmer ? "ទំនិញថ្មីៗ" : "NEW ARRIVALS"}</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 mt-6 sm:mt-8 pt-6 border-t border-white/10 text-xs text-neutral-300/80">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c2a677]" />
                  <span>{isKhmer ? "ក្រណាត់កប្បាស & លីណិនប្រណិត" : "Premium Fabrics"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c2a677]" />
                  <span>{isKhmer ? "កាត់ដេរយ៉ាងផ្ចិតផ្ចង់" : "Tailored Precision"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c2a677]" />
                  <span>{isKhmer ? "ដឹកជញ្ជូនរហ័សទូទាំងប្រទេស" : "Fast Delivery"}</span>
                </div>
              </div>

            </div>

            {/* Right Column: High-Resolution Boutique Storefront Card Carousel */}
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
              <div
                className="group relative block w-full max-w-[540px] aspect-square rounded-2xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(194,166,119,0.15)] transition-all duration-700 hover:border-[#c2a677]/60 hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_60px_rgba(194,166,119,0.25)] select-none"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Store Images with Cross-Fade Transition */}
                <Link to="/shop" className="block w-full h-full cursor-pointer" aria-label="Visit Boutique Store">
                  {showroomSlides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                      }`}
                    >
                      <picture>
                        <source srcSet={slide.imageWebp} type="image/webp" />
                        <img
                          src={slide.imageJpg}
                          alt={slide.alt}
                          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </picture>
                    </div>
                  ))}

                  {/* Subtle vignette on edges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 z-10 pointer-events-none" />
                </Link>

                {/* Left Arrow Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentSlide((prev) => (prev === 0 ? showroomSlides.length - 1 : prev - 1));
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-[#c2a677] text-white hover:text-neutral-950 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                  aria-label="Previous showroom photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Right Arrow Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentSlide((prev) => (prev + 1) % showroomSlides.length);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-[#c2a677] text-white hover:text-neutral-950 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                  aria-label="Next showroom photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Bottom Overlay Label & Navigation Dots */}
                <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between px-4 py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-white">
                  <div>
                    <p className="text-[11px] font-mono tracking-widest text-[#c2a677] uppercase transition-all duration-300">
                      {showroomSlides[currentSlide].tag}
                    </p>
                    <p className="text-xs font-semibold tracking-wide transition-all duration-300">
                      {showroomSlides[currentSlide].title}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Slide Dots Indicator */}
                    <div className="flex items-center gap-1.5 mr-1">
                      {showroomSlides.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCurrentSlide(idx);
                          }}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            currentSlide === idx ? "w-5 bg-[#c2a677]" : "w-1.5 bg-white/40 hover:bg-white/80"
                          }`}
                          aria-label={`Go to showroom photo ${idx + 1}`}
                        />
                      ))}
                    </div>
                    <Link
                      to="/shop"
                      className="w-8 h-8 rounded-full bg-[#c2a677] text-neutral-950 flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-md hover:bg-[#d6bc8f]"
                      aria-label="Explore store"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ===== BOTTOM 4-COLUMN LUXURY FEATURES BAR ===== */}
        {showFeatures && (
          <div className="relative z-20 w-full bg-[#09090b] border-t border-white/10 py-5 sm:py-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 gap-4 md:gap-0">
                
                {/* Feature 1: Premium Fabrics */}
                <div className="flex items-center gap-3.5 md:px-5 py-2 md:py-0 group">
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#c2a677] flex-shrink-0 group-hover:bg-[#c2a677]/15 transition-colors">
                    <Leaf className="w-4 h-4" strokeWidth={1.7} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-white">
                      {t("f1_title", "PREMIUM FABRICS")}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-neutral-400 font-light mt-0.5">
                      {t("f1_desc", "Carefully selected materials")}
                    </p>
                  </div>
                </div>

                {/* Feature 2: Timeless Design */}
                <div className="flex items-center gap-3.5 md:px-5 py-2 md:py-0 group">
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#c2a677] flex-shrink-0 group-hover:bg-[#c2a677]/15 transition-colors">
                    <Gem className="w-4 h-4" strokeWidth={1.7} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-white">
                      {t("f2_title", "TIMELESS DESIGN")}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-neutral-400 font-light mt-0.5">
                      {t("f2_desc", "Built to last beyond trends")}
                    </p>
                  </div>
                </div>

                {/* Feature 3: Worldwide / Fast Delivery */}
                <div className="flex items-center gap-3.5 md:px-5 py-2 md:py-0 group">
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#c2a677] flex-shrink-0 group-hover:bg-[#c2a677]/15 transition-colors">
                    <Package className="w-4 h-4" strokeWidth={1.7} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-white">
                      {t("f3_title", "WORLDWIDE SHIPPING")}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-neutral-400 font-light mt-0.5">
                      {t("f3_desc", "Delivering luxury anywhere")}
                    </p>
                  </div>
                </div>

                {/* Feature 4: Bespoke Quality Guarantee */}
                <div className="flex items-center gap-3.5 md:px-5 py-2 md:py-0 group">
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#c2a677] flex-shrink-0 group-hover:bg-[#c2a677]/15 transition-colors">
                    <ShieldCheck className="w-4 h-4" strokeWidth={1.7} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-white">
                      {isKhmer ? "ការធានាគុណភាព ១០០%" : "BESPOKE QUALITY"}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-neutral-400 font-light mt-0.5">
                      {isKhmer ? "សេវាកាត់ដេរផ្ចិតផ្ចង់" : "Handcrafted excellence"}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </section>
    </div>
  );
};

export default Hero;
