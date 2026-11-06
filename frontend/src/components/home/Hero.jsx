import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { boutiqueHeroBanner } from "../../assets/banner/boutiqueHeroImage";
import {
  Leaf,
  Gem,
  Package,
  ArrowRight,
  Sparkles
} from "lucide-react";

const Hero = () => {
  const { t, language } = useLanguage();
  const isKhmer = language === "km";

  return (
    <div className="relative bg-[#0c0c0d] dark:bg-neutral-950 text-white overflow-hidden transition-colors duration-300">
      
      {/* ===== HERO MAIN BANNER (LUXURY BOUTIQUE) ===== */}
      <section className="relative w-full">
        <div className="relative w-full max-w-[1920px] mx-auto overflow-hidden group">
          
          {/* Main Visual Container */}
          <div className="relative w-full aspect-[2/1] min-h-[420px] sm:min-h-[520px] md:min-h-[620px] lg:min-h-[720px] overflow-hidden select-none">
            {/* Background Storefront Photograph */}
            <img
              src={boutiqueHeroBanner}
              alt="Thyy Store - Luxury Flagship Boutique"
              className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
              loading="eager"
            />

            {/* Dark Scrim Gradients for Superior Contrast & Luxury Warmth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent sm:from-black/80 sm:via-black/35 sm:to-black/15 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />

            {/* Overlay Editorial Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 max-w-5xl">
              
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-[#c2a677]/40 text-[#c2a677] text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-md w-fit mb-4 animate-fade-in">
                <Sparkles className="w-3.5 h-3.5 text-[#c2a677]" />
                <span>
                  {isKhmer ? "ការប្រមូលម៉ូដប្រណិត ២០២៤" : "FLAGSHIP BOUTIQUE COLLECTION"}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal tracking-wide text-white uppercase leading-[1.1] drop-shadow-md">
                {isKhmer ? (
                  <>
                    លើកកម្ពស់ <span className="text-[#c2a677] italic font-light">ស្ទីលរបស់អ្នក</span>
                  </>
                ) : (
                  <>
                    Elevate <span className="text-[#c2a677] italic font-light">Your Style</span>
                  </>
                )}
              </h1>

              {/* Editorial Description */}
              <p className="text-xs sm:text-base md:text-lg text-neutral-200/90 font-light max-w-xl leading-relaxed mt-3 sm:mt-4 drop-shadow">
                {isKhmer
                  ? "ស្វែងរកសម្លៀកបំពាក់ទាន់សម័យ ក្រណាត់គុណភាពខ្ពស់ និងការរចនាម៉ូដយ៉ាងផ្ចិតផ្ចង់សម្រាប់ជីវិតប្រចាំថ្ងៃរបស់អ្នក។"
                  : "Discover refined silhouettes, premium imported fabrics, and contemporary tailoring crafted for the modern lifestyle."}
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mt-6 sm:mt-8">
                {/* Primary Button */}
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#c2a677] hover:bg-[#d6bc8f] text-neutral-950 font-bold tracking-[0.16em] text-xs sm:text-sm uppercase rounded transition-all duration-300 shadow-xl hover:shadow-[#c2a677]/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{isKhmer ? "ទិញឥឡូវនេះ" : "EXPLORE COLLECTION"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Secondary Button */}
                <Link
                  to="/shop?filter=new"
                  className="inline-flex items-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-medium tracking-[0.16em] text-xs sm:text-sm uppercase rounded backdrop-blur-md border border-white/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{isKhmer ? "ទំនិញថ្មីៗ" : "NEW ARRIVALS"}</span>
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* ===== BOTTOM 3-COLUMN LUXURY FEATURES BAR ===== */}
        <div className="relative z-20 w-full bg-[#0a0a0b] border-t border-white/10 py-5 sm:py-6 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 gap-4 md:gap-0">
              
              {/* Feature 1: Premium Fabrics */}
              <div className="flex items-center gap-4 md:px-6 py-2 md:py-0 group">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#c2a677] flex-shrink-0 group-hover:bg-[#c2a677]/15 transition-colors">
                  <Leaf className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-white">
                    {t("f1_title", "PREMIUM FABRICS")}
                  </h4>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">
                    {t("f1_desc", "Carefully selected materials")}
                  </p>
                </div>
              </div>

              {/* Feature 2: Timeless Design */}
              <div className="flex items-center gap-4 md:px-6 py-2 md:py-0 group">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#c2a677] flex-shrink-0 group-hover:bg-[#c2a677]/15 transition-colors">
                  <Gem className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-white">
                    {t("f2_title", "TIMELESS DESIGN")}
                  </h4>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">
                    {t("f2_desc", "Built to last beyond trends")}
                  </p>
                </div>
              </div>

              {/* Feature 3: Worldwide / Fast Delivery */}
              <div className="flex items-center gap-4 md:px-6 py-2 md:py-0 group">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#c2a677] flex-shrink-0 group-hover:bg-[#c2a677]/15 transition-colors">
                  <Package className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-white">
                    {t("f3_title", "WORLDWIDE SHIPPING")}
                  </h4>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">
                    {t("f3_desc", "Delivering luxury anywhere")}
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
