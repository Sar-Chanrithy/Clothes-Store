import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { elevatedEssentialsBanner } from "../../assets/banner/elevatedEssentialsImage";
import {
  Leaf,
  Gem,
  Package
} from "lucide-react";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-[#0c0c0d] dark:bg-neutral-950 text-white overflow-hidden transition-colors duration-300">
      
      {/* ===== HERO MAIN BANNER (ELEVATED ESSENTIALS) ===== */}
      <section className="relative w-full">
        <div className="relative w-full max-w-[1920px] mx-auto overflow-hidden group">
          {/* Main Hero Visual Image */}
          <Link
            to="/shop?filter=new"
            className="block relative w-full aspect-[1024/446] min-h-[300px] sm:min-h-[420px] md:min-h-[500px] lg:min-h-[620px] overflow-hidden cursor-pointer select-none"
            aria-label="Elevated Essentials - Shop New Arrivals"
          >
            <img
              src={elevatedEssentialsBanner}
              alt="Elevated Essentials - Timeless Style. Modern Edge."
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              loading="eager"
            />

            {/* Subtle Interactive CTA Hover Indicator Overlay on the SHOP NEW ARRIVALS button */}
            <div 
              className="absolute left-[5.5%] bottom-[16%] w-[21%] h-[12%] min-w-[130px] min-h-[36px] max-w-[240px] max-h-[50px] pointer-events-none rounded transition-all duration-300 group-hover:ring-2 group-hover:ring-white/40 group-hover:bg-white/10"
              aria-hidden="true"
            />
          </Link>
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
