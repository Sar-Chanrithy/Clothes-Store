import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import {
  ShoppingBag,
  MapPin,
  Globe,
  ArrowRight,
  Sparkles,
  Tag,
  Percent,
  Check,
  MousePointerClick
} from "lucide-react";

// Social media mini icons
const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const PromoBanners = () => {
  const [activeBanner, setActiveBanner] = useState("all"); // "all" | "yellow" | "denim"
  const { t, isKhmer } = useLanguage();

  return (
    <section className="py-12 sm:py-16 bg-neutral-100/60 dark:bg-neutral-950/80 border-y border-neutral-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-[#9a783e] dark:text-[#c2a677] uppercase">
              <Sparkles className="w-4 h-4" />
              <span>{isKhmer ? "ការផ្តល់ជូនពិសេស & ទំនិញទើបមកដល់" : "SPECIAL PROMOTIONS & NEW ARRIVALS"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mt-1 font-serif-luxury">
              {isKhmer ? "យុទ្ធនាការប្រូម៉ូសិនប្រចាំរដូវកាល" : "Featured Seasonal Campaigns"}
            </h2>
          </div>

          {/* Quick Filter Pill Switch */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 self-start sm:self-auto shadow-xs">
            <button
              onClick={() => setActiveBanner("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeBanner === "all"
                  ? "bg-[#c2a677] text-neutral-950 shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              {isKhmer ? "យុទ្ធនាការទាំងអស់" : "All Campaigns"}
            </button>
            <button
              onClick={() => setActiveBanner("yellow")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeBanner === "yellow"
                  ? "bg-amber-400 text-neutral-950 font-bold shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              {isKhmer ? "បញ្ចុះ 30% រដូវក្តៅ" : "30% OFF Summer"}
            </button>
            <button
              onClick={() => setActiveBanner("denim")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeBanner === "denim"
                  ? "bg-neutral-900 text-amber-300 font-bold border border-amber-400/40 shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              {isKhmer ? "បញ្ចុះ 50% Streetwear" : "50% OFF Streetwear"}
            </button>
          </div>
        </div>

        {/* BANNERS CONTAINER */}
        <div className="space-y-10">

          {/* ============================================================== */}
          {/* BANNER 1: Exact Yellow Online Shopping Banner (30% OFF) */}
          {/* ============================================================== */}
          {(activeBanner === "all" || activeBanner === "yellow") && (
            <div className="space-y-4">
              {/* Exact Banner Requested by User - Pixel Perfect Cropped to Yellow Artboard */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-300/80 bg-[#FED034] group transition-all duration-500 hover:shadow-amber-500/20">
                
                {/* 16:8.15 Cropped Container */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1440 / 734" }}>
                  <img
                    src="/images/yellow-shopping-banner.png"
                    alt="Online Shopping 30% OFF Banner - RITHY STORE"
                    className="absolute max-w-none pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    style={{
                      width: "133.333%",
                      height: "147.058%",
                      left: "-16.666%",
                      top: "-23.529%",
                      objectFit: "fill"
                    }}
                  />

                  {/* Clickable Overlay covering the entire banner */}
                  <Link
                    to="/shop?filter=sale"
                    className="absolute inset-0 z-10 cursor-pointer"
                    title={isKhmer ? "ទិញទំនិញបញ្ចុះតម្លៃ 30% ឥឡូវនេះ" : "Shop 30% OFF Summer Online Sale"}
                    aria-label="Shop 30% OFF Summer Sale"
                  />

                  {/* Hotspot: Clickable Button matching bottom right */}
                  <div className="absolute bottom-[3.5%] sm:bottom-[4.5%] right-[3.5%] sm:right-[5%] z-20 pointer-events-auto">
                    <Link
                      to="/shop?filter=sale"
                      className="px-3 sm:px-6 py-1.5 sm:py-2.5 bg-black hover:bg-neutral-900 text-white font-black text-[9px] sm:text-xs tracking-wider uppercase rounded-md sm:rounded-lg shadow-2xl flex items-center gap-1.5 border border-white/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 hidden sm:inline" />
                      <span>WWW.RITHYSTORE.COM</span>
                      <span className="text-amber-300 text-xs sm:text-sm animate-bounce">👆</span>
                    </Link>
                  </div>

                  {/* Hotspot: Official Store Badge Top Left */}
                  <div className="absolute top-[3.5%] sm:top-[4.5%] left-[3.5%] sm:left-[4.5%] z-20 pointer-events-auto flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-1.5 bg-black/90 text-amber-300 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold shadow-lg border border-amber-300/40 backdrop-blur-xs">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>RITHY STORE • {isKhmer ? "បញ្ចុះតម្លៃ 30%" : "30% OFF CODE: RITHY30"}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Quick-Action Bar */}
                <div className="bg-neutral-950 text-white px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 border-t border-amber-300/30">
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-amber-300 font-bold uppercase">{isKhmer ? "ការបញ្ចុះតម្លៃរដូវក្តៅ" : "ONLINE PROMO"}:</span>
                    <span className="text-neutral-300">{isKhmer ? "ទទួលបានការបញ្ចុះតម្លៃ 30% លើការកុម្ម៉ង់ទូទាំងកម្ពុជា" : "Instant 30% discount on all online orders across Cambodia"}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold bg-amber-400 text-neutral-950 px-2.5 py-0.5 rounded-md">
                      CODE: RITHY30
                    </span>
                    <Link
                      to="/shop?filter=sale"
                      className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1 group/btn"
                    >
                      <span>{isKhmer ? "ទិញឥឡូវនេះ" : "SHOP SALE"}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          )}


          {/* ============================================================== */}
          {/* BANNER 2: Dark Grunge Urban Denim Edition (50% OFF) */}
          {/* ============================================================== */}
          {(activeBanner === "all" || activeBanner === "denim") && (
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-neutral-950 text-white border border-neutral-800 transition-transform duration-500 hover:shadow-teal-500/10">
              
              {/* Background Textured Overlays */}
              <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal-600/25 to-transparent pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Main Banner Grid */}
              <div className="relative z-10 p-6 sm:p-10 lg:p-12">
                
                {/* Top Brand & Socials Bar */}
                <div className="flex items-center justify-between pb-6 mb-4 border-b border-white/10">
                  {/* Brand Logo with gold text */}
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/15 shadow-md">
                      <img
                        src="/images/rithy-store-logo.png"
                        alt="RITHY STORE Logo"
                        className="h-8 sm:h-9 w-auto object-contain invert"
                      />
                    </div>
                    <div>
                      <span className="font-serif tracking-[0.22em] font-extrabold text-sm sm:text-base text-white uppercase block leading-none">
                        RITHY STORE
                      </span>
                      <span className="tracking-[0.25em] text-[10px] text-[#c2a677] uppercase font-bold">
                        Urban Denim Atelier
                      </span>
                    </div>
                  </div>

                  {/* Social Media Icons */}
                  <div className="flex items-center gap-2">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-[#c2a677] hover:text-neutral-950 transition-all"
                      aria-label="Facebook"
                    >
                      <FacebookIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-[#c2a677] hover:text-neutral-950 transition-all"
                      aria-label="Instagram"
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-[#c2a677] hover:text-neutral-950 transition-all"
                      aria-label="Twitter"
                    >
                      <TwitterIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Banner Body */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: 50% OFF & Fashion Headline */}
                  <div className="lg:col-span-7 space-y-5 text-left">
                    
                    {/* Discount Headline */}
                    <div className="flex items-baseline gap-4">
                      <div>
                        <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#c2a677] uppercase block">
                          GET THE SPECIAL DISCOUNT
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-6xl sm:text-7xl lg:text-8xl font-black text-[#f59e0b] tracking-tighter leading-none">
                            50%
                          </span>
                          <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                            OFF
                          </span>
                        </div>
                      </div>
                      <span className="hidden sm:inline-block h-12 w-px bg-white/20" />
                      <div className="hidden sm:block text-xs text-neutral-400 font-light max-w-[140px]">
                        CHECK OUR WEBSITE & ENTER THE CODE
                      </div>
                    </div>

                    {/* New Arrival Fashion Typography */}
                    <div className="space-y-1 pt-1">
                      <div className="font-mono text-xs tracking-[0.3em] uppercase text-neutral-400">
                        NEW ARRIVAL
                      </div>
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-wide uppercase font-editorial">
                        FASH<span className="text-[#f59e0b]">I</span>ON
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-lg leading-relaxed">
                      Discover bold jackets, distressed Japanese denim, and contemporary silhouettes engineered for statement aesthetics and all-day comfort.
                    </p>

                    {/* CTA Button and Store Info */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <Link
                        to="/shop?filter=new"
                        className="px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-[#c2a677] hover:from-amber-300 hover:to-[#d6bb88] text-neutral-950 font-black text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-lg shadow-amber-500/20 hover:scale-105 flex items-center gap-2"
                      >
                        <span>{isKhmer ? "កុម្ម៉ង់ទុកមុន" : "PRE-ORDER"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <div className="flex items-center gap-4 text-xs text-neutral-400 font-medium">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#c2a677]" />
                          <span>Phnom Penh, Cambodia</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Globe className="w-4 h-4 text-[#c2a677]" />
                          <span>rithystore.com</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Denim Model with Vertical UNLOCK YOUR STYLE */}
                  <div className="lg:col-span-5 relative flex items-center justify-center">
                    
                    {/* Model Image with cyan frame glow */}
                    <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-2 border-teal-400/40 group">
                      <img
                        src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&auto=format&fit=crop&q=80"
                        alt="Urban Denim Male Model"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&fit=crop&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                      
                      {/* Floating Denim Badge */}
                      <div className="absolute bottom-4 left-4 right-4 p-3 bg-neutral-950/90 backdrop-blur-md rounded-2xl border border-white/10 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase text-white">Denim Atelier</span>
                          <span className="text-[10px] text-amber-400 font-bold">50% OFF CODE: RITHY50</span>
                        </div>
                      </div>
                    </div>

                    {/* Bold Stylized Typography: "UNLOCK YOUR STYLE" */}
                    <div className="hidden sm:block absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 pointer-events-none select-none">
                      <div className="flex flex-col text-right font-black uppercase leading-none opacity-80 space-y-1">
                        <span className="text-3xl lg:text-4xl text-transparent [-webkit-text-stroke:1.5px_#f59e0b]">
                          UNLOCK
                        </span>
                        <span className="text-3xl lg:text-4xl text-transparent [-webkit-text-stroke:1.5px_#f59e0b]">
                          YOUR
                        </span>
                        <span className="text-3xl lg:text-4xl text-transparent [-webkit-text-stroke:1.5px_#f59e0b]">
                          STYLE
                        </span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default PromoBanners;
