import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import {
  Leaf,
  Gem,
  Package,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

const slides = [
  {
    id: "elevated",
    imageWebp: "/slide-elevated.webp",
    imageJpg: "/slide-elevated.jpg",
    tagEn: "NEW COLLECTION 2024 / 2025",
    tagKm: "ការប្រមូលម៉ូដថ្មី ២០២៤ / ២០២៥",
    titleEn: "ELEVATED ESSENTIALS",
    titleKm: "ភាពប្រណិតមិនចេះរីងស្ងួត",
    subtitleEn: "Timeless Style. Modern Edge.",
    subtitleKm: "ស្ទីលមិនចេះហួសសម័យ ភាពទាន់សម័យដែលលេចធ្លោ",
    descEn: "Designed for those who seek understated luxury, contemporary cuts, and premium natural textiles.",
    descKm: "រចនាឡើងសម្រាប់អ្នកដែលស្រឡាញ់ភាពប្រណិតទាន់សម័យ និងក្រណាត់គុណភាពខ្ពស់បំផុត។",
    ctaPrimaryEn: "SHOP NEW ARRIVALS",
    ctaPrimaryKm: "ទិញទំនិញថ្មីៗ",
    ctaPrimaryLink: "/shop?filter=new",
    ctaSecondaryEn: "EXPLORE ALL",
    ctaSecondaryKm: "មើលការប្រមូលទាំងមូល",
    ctaSecondaryLink: "/shop",
    textPosition: "left"
  },
  {
    id: "boutique",
    imageWebp: "/slide-boutique.webp",
    imageJpg: "/slide-boutique.jpg",
    tagEn: "FLAGSHIP SHOWROOM & ATELIER",
    tagKm: "ហាងផ្ទាល់ខ្លួន & កន្លែងកាត់ដេរប្រណិត",
    titleEn: "THE BOUTIQUE EXPERIENCE",
    titleKm: "បទពិសោធន៍ហាងផ្ទាល់ខ្លួន",
    subtitleEn: "Where Craftsmanship Meets Elegance",
    subtitleKm: "សិល្បៈស្ថាបត្យកម្ម និងពិភពម៉ូដទាន់សម័យ",
    descEn: "Immerse in our bespoke Phnom Penh showroom. Handcrafted tailoring, private fittings, and personalized styling.",
    descKm: "ទទួលបានបទពិសោធន៍ផ្ទាល់នៅបន្ទប់តាំងបង្ហាញ ជាមួយសេវាកាត់ដេរតាមទំហំ និងការរៀបចំស្ទីលយ៉ាងផ្ចិតផ្ចង់។",
    ctaPrimaryEn: "EXPLORE COLLECTION",
    ctaPrimaryKm: "ស្វែងយល់ពីការប្រមូល",
    ctaPrimaryLink: "/shop",
    ctaSecondaryEn: "ABOUT ATELIER",
    ctaSecondaryKm: "អំពីយើង",
    ctaSecondaryLink: "/about",
    textPosition: "center-bottom"
  },
  {
    id: "timeless",
    imageWebp: "/slide-timeless.webp",
    imageJpg: "/slide-timeless.jpg",
    tagEn: "BESPOKE MENSWEAR CAPSULE",
    tagKm: "ឈុតបុរសប្រណិតបែបទំនើប",
    titleEn: "TIMELESS BY NATURE",
    titleKm: "ភាពទាក់ទាញបែបធម្មជាតិ",
    subtitleEn: "Italian Wool & Modern Tailoring",
    subtitleKm: "ក្រណាត់រោមចៀមអ៊ីតាលី និងការកាត់ដេរទំនើប",
    descEn: "Premium essentials crafted for the modern gentleman's wardrobe, engineered for effortless sophistication.",
    descKm: "សម្លៀកបំពាក់បុរសប្រណិត រចនាឡើងដើម្បីផ្តល់ទំនុកចិត្ត និងភាពថ្លៃថ្នូរក្នុងគ្រប់កាលៈទេសៈ។",
    ctaPrimaryEn: "SHOP MEN'S SUITS",
    ctaPrimaryKm: "ទិញឈុតបុរស",
    ctaPrimaryLink: "/shop?category=men",
    ctaSecondaryEn: "VIEW LOOKBOOK",
    ctaSecondaryKm: "មើលម៉ូដសម្លៀកបំពាក់",
    ctaSecondaryLink: "/shop",
    textPosition: "left"
  }
];

const Hero = () => {
  const { t, language } = useLanguage();
  const isKhmer = language === "km";

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-rotation every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div
      className="relative bg-[#0c0c0e] dark:bg-neutral-950 text-white overflow-hidden transition-colors duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* ===== HERO MAIN BANNER SLIDER ===== */}
      <section className="relative w-full">
        <div className="relative w-full max-w-[1920px] mx-auto overflow-hidden group">
          
          {/* Main Visual Carousel Viewport */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[460px] sm:min-h-[540px] md:min-h-[620px] lg:min-h-[720px] overflow-hidden select-none bg-black">
            
            {slides.map((slide, idx) => {
              const isActive = idx === currentSlide;

              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                    isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  {/* High-Resolution Background Imagery */}
                  <picture>
                    <source srcSet={slide.imageWebp} type="image/webp" />
                    <img
                      src={slide.imageJpg}
                      alt={isKhmer ? slide.titleKm : slide.titleEn}
                      className={`w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                        isActive ? "scale-105" : "scale-100"
                      }`}
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </picture>

                  {/* Dynamic Adaptive Overlay depending on slide layout */}
                  {slide.textPosition === "center-bottom" ? (
                    // Boutique Showroom Layout: Clean, bright view of store with floating luxury glass bar at bottom
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 flex flex-col justify-end items-center px-4 sm:px-8 pb-14 sm:pb-16 text-center">
                      <div className="max-w-3xl bg-black/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl animate-fade-in">
                        
                        {/* Eyebrow Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#c2a677]/60 text-[#c2a677] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                          <Sparkles className="w-3.5 h-3.5 text-[#c2a677]" />
                          <span>{isKhmer ? slide.tagKm : slide.tagEn}</span>
                        </div>

                        {/* Display Headline */}
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif tracking-wide text-white uppercase drop-shadow-md">
                          {isKhmer ? slide.titleKm : slide.titleEn}
                        </h2>

                        {/* Subtitle */}
                        <p className="text-xs sm:text-base text-neutral-200 font-light mt-2 max-w-xl mx-auto drop-shadow">
                          {isKhmer ? slide.descKm : slide.descEn}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-5">
                          <Link
                            to={slide.ctaPrimaryLink}
                            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#c2a677] hover:bg-[#d6bc8f] text-neutral-950 font-bold tracking-[0.16em] text-xs sm:text-sm uppercase rounded transition-all duration-300 shadow-xl hover:shadow-[#c2a677]/30 hover:-translate-y-0.5"
                          >
                            <span>{isKhmer ? slide.ctaPrimaryKm : slide.ctaPrimaryEn}</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>

                          <Link
                            to={slide.ctaSecondaryLink}
                            className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium tracking-[0.16em] text-xs sm:text-sm uppercase rounded backdrop-blur-md border border-white/25 transition-all duration-300 hover:-translate-y-0.5"
                          >
                            <span>{isKhmer ? slide.ctaSecondaryKm : slide.ctaSecondaryEn}</span>
                          </Link>
                        </div>

                      </div>
                    </div>
                  ) : (
                    // Editorial Left-Aligned Layout (Elevated Essentials & Timeless by Nature)
                    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent flex flex-col justify-center px-6 sm:px-14 md:px-20 lg:px-28">
                      <div className="max-w-2xl animate-fade-in">
                        
                        {/* Eyebrow Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-[#c2a677]/50 text-[#c2a677] text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-md w-fit mb-4 shadow-lg">
                          <Sparkles className="w-3.5 h-3.5 text-[#c2a677]" />
                          <span>{isKhmer ? slide.tagKm : slide.tagEn}</span>
                        </div>

                        {/* Display Headline */}
                        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal tracking-wide text-white uppercase leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                          {isKhmer ? slide.titleKm : slide.titleEn}
                        </h2>

                        {/* Tagline */}
                        <p className="text-sm sm:text-lg md:text-xl font-light text-[#c2a677] mt-2 sm:mt-3 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                          {isKhmer ? slide.subtitleKm : slide.subtitleEn}
                        </p>

                        {/* Description */}
                        <p className="text-xs sm:text-sm md:text-base text-neutral-200/90 font-light max-w-lg leading-relaxed mt-2 sm:mt-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                          {isKhmer ? slide.descKm : slide.descEn}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mt-6 sm:mt-8">
                          <Link
                            to={slide.ctaPrimaryLink}
                            className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#c2a677] hover:bg-[#d6bc8f] text-neutral-950 font-bold tracking-[0.16em] text-xs sm:text-sm uppercase rounded transition-all duration-300 shadow-xl hover:shadow-[#c2a677]/30 hover:-translate-y-0.5 active:translate-y-0"
                          >
                            <span>{isKhmer ? slide.ctaPrimaryKm : slide.ctaPrimaryEn}</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>

                          <Link
                            to={slide.ctaSecondaryLink}
                            className="inline-flex items-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 bg-black/50 hover:bg-black/70 text-white font-medium tracking-[0.16em] text-xs sm:text-sm uppercase rounded backdrop-blur-md border border-white/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
                          >
                            <span>{isKhmer ? slide.ctaSecondaryKm : slide.ctaSecondaryEn}</span>
                          </Link>
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              );
            })}

            {/* Left & Right Interactive Navigation Controls */}
            <div className="absolute inset-y-0 left-4 sm:left-8 z-30 flex items-center pointer-events-none">
              <button
                onClick={prevSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#c2a677] text-white hover:text-black border border-white/20 hover:border-[#c2a677] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-xl pointer-events-auto opacity-70 group-hover:opacity-100 hover:scale-105"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="absolute inset-y-0 right-4 sm:right-8 z-30 flex items-center pointer-events-none">
              <button
                onClick={nextSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#c2a677] text-white hover:text-black border border-white/20 hover:border-[#c2a677] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-xl pointer-events-auto opacity-70 group-hover:opacity-100 hover:scale-105"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Luxury Slide Pagination Indicators at Bottom */}
            <div className="absolute bottom-4 sm:bottom-6 right-6 sm:right-12 z-30 flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`group/btn flex items-center gap-2 transition-all duration-300 ${
                    idx === currentSlide ? "text-[#c2a677]" : "text-white/60 hover:text-white"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <span className="text-[11px] font-mono tracking-widest">{`0${idx + 1}`}</span>
                  <div
                    className={`h-[2px] rounded-full transition-all duration-500 ${
                      idx === currentSlide ? "w-8 bg-[#c2a677]" : "w-3 bg-white/30 group-hover/btn:bg-white/60"
                    }`}
                  />
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* ===== BOTTOM 4-COLUMN LUXURY FEATURES BAR ===== */}
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

      </section>

    </div>
  );
};

export default Hero;
