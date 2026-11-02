import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  Sparkles,
  Scissors,
  ShieldCheck,
  Leaf,
  Award,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Gem,
  Truck,
  PhoneCall
} from "lucide-react";

const About = () => {
  const { t, isKhmer } = useLanguage();
  const [activeMaterial, setActiveMaterial] = useState(0);

  const stats = [
    { value: "2020", label: isKhmer ? "ឆ្នាំបង្កើតឡើង" : "Founded in Phnom Penh" },
    { value: "50,000+", label: isKhmer ? "អតិថិជនពេញចិត្ត" : "Satisfied Clients" },
    { value: "100%", label: isKhmer ? "ក្រណាត់ធម្មជាតិសុទ្ធ" : "Natural Fibers" },
    { value: "25", label: isKhmer ? "ខេត្តក្រុងដឹកជញ្ជូនដល់" : "Provinces Covered" }
  ];

  const pillars = [
    {
      icon: Sparkles,
      title: t("about_p1_title", "100% Sourced Fibers"),
      desc: t("about_p1_desc", "Imported directly from certified textile heritage mills across Italy and France."),
      accent: "from-amber-500/20 to-yellow-500/10"
    },
    {
      icon: Scissors,
      title: t("about_p2_title", "Cambodia Tailoring"),
      desc: t("about_p2_desc", "Meticulously crafted and fitted by skilled master tailors right here in Phnom Penh."),
      accent: "from-amber-600/20 to-orange-500/10"
    },
    {
      icon: ShieldCheck,
      title: t("about_p3_title", "Transparent Pricing"),
      desc: t("about_p3_desc", "Honest dual currency pricing in $ USD and ៛ KHR without middlemen markups."),
      accent: "from-yellow-600/20 to-amber-500/10"
    },
    {
      icon: Leaf,
      title: t("about_p4_title", "Sustainable & Guaranteed"),
      desc: t("about_p4_desc", "Biodegradable packaging, ethical working standards, and hassle-free 7-day exchanges."),
      accent: "from-emerald-600/20 to-teal-500/10"
    }
  ];

  const materials = [
    {
      name: isKhmer ? "រោមចៀមអ៊ីតាលី 100%" : "Italian Virgin Wool",
      origin: "Biella, Italy",
      tag: "Super 120s Fine Weave",
      desc: isKhmer 
        ? "សាច់ក្រណាត់ស្រាល មានខ្យល់ចេញចូលល្អ មិនងាយជ្រីវជ្រួញ ស័ក្តិសមឥតខ្ចោះសម្រាប់ឈុតអាវធំផ្លូវការក្នុងអាកាសធាតុកម្ពុជា។" 
        : "Ultra-breathable high-twist wool that drapes naturally, resists creasing, and adapts seamlessly from air-conditioned offices to tropical evenings.",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&auto=format&fit=crop&q=80"
    },
    {
      name: isKhmer ? "ក្រណាត់កប្បាសបារាំង" : "French Flax Linen",
      origin: "Normandy, France",
      tag: "Pure Organic Linen",
      desc: isKhmer 
        ? "ក្រណាត់កប្បាសធម្មជាតិត្រជាក់ស្រួល ស្រូបញើសបានលឿន និងកាន់តែទន់ល្មើយពេលបោកគក់ច្រើនដង។" 
        : "Unmatched natural breathability with slub-textured lightness, woven to keep you effortlessly cool under the Phnom Penh sun.",
      image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=900&auto=format&fit=crop&q=80"
    },
    {
      name: isKhmer ? "សូត្រមនធម្មជាតិ" : "Mulberry Silk",
      origin: "Siem Reap & Artisanal Co-ops",
      tag: "100% Raw Cultivated Silk",
      desc: isKhmer 
        ? "សូត្រសរសៃម៉ដ្ឋរលោង ផ្តល់នូវអារម្មណ៍ប្រណិត និងស្រស់ស្អាតថ្លៃថ្នូរគ្រប់ពេលវេលា។" 
        : "Hand-spun silk with luminous sheen and delicate drape, honoring Cambodia's revered tradition of world-class silk craftsmanship.",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=80"
    },
    {
      name: isKhmer ? "ខូវប៊យ Denim ជប៉ុន 14oz" : "14oz Selvedge Denim",
      origin: "Kurashiki, Japan",
      tag: "Vintage Shuttle Loom",
      desc: isKhmer 
        ? "ក្រណាត់ខូវប៊យសាច់ក្រាស់ រឹងមាំ ថ្នេរដេររៀបរយស្អាត និងផ្លាស់ប្តូរពណ៌កាន់តែស្អាតតាមពេលវេលា។" 
        : "Rigid shuttle-loomed selvedge denim built to break in naturally with age, delivering authentic character for generations.",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&auto=format&fit=crop&q=80"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: isKhmer ? "ការចាប់ផ្តើមដំបូងនៅភ្នំពេញ" : "The Atelier is Born",
      desc: isKhmer 
        ? "បើកហាងដំបូងលើវិថីសម្ដេចប៉ាន (ផ្លូវ ២១៤) ដោយមានគោលបំណងកាត់សម្លៀកបំពាក់ប្រណិតក្នុងតម្លៃសមរម្យ។" 
        : "Founded on Samdach Pan Avenue (St. 214) in Phnom Penh with a clear mission: couture-level craftsmanship at transparent prices."
    },
    {
      year: "2022",
      title: isKhmer ? "ពង្រីកបន្ទប់កាត់ដេរ & VIP Lounge" : "BKK Atelier Expansion",
      desc: isKhmer 
        ? "បើកសម្ពោធបន្ទប់កាត់ដេរផ្ទាល់ខ្លួន និងសាលទទួលភ្ញៀវពិសេសនៅសង្កាត់បឹងកេងកង សម្រាប់សេវាកាត់តម្រូវទំហំ។" 
        : "Unveiled our dedicated bespoke tailoring suite and private VIP salon in Boeung Keng Kang for personalized fittings."
    },
    {
      year: "2024",
      title: isKhmer ? "គម្រោងសូត្រ និងកប្បាសនិរន្តរភាព" : "Sustainable Sourcing Initiative",
      desc: isKhmer 
        ? "ចុះកិច្ចព្រមព្រៀងផ្ទាល់ជាមួយសហគមន៍តម្បាញសូត្រ និងរោងចក្រកប្បាសសរីរាង្គដើម្បីកាត់បន្ថយផលប៉ះពាល់បរិស្ថាន។" 
        : "Forged direct partnerships with certified organic mills and artisan weavers, eliminating chemical dyes and middlemen."
    },
    {
      year: "2026",
      title: isKhmer ? "បទពិសោធន៍ឌីជីថល & ដឹកជញ្ជូន ២៥ ខេត្តក្រុង" : "Omnichannel Luxury & Nationwide Express",
      desc: isKhmer 
        ? "ប្រព័ន្ធទិញទំនិញអនឡាញថ្មី ទូទាត់តាម ABA / Wing និងដឹកជញ្ជូនរហ័សដល់ដៃអតិថិជនទូទាំងប្រទេសកម្ពុជា។" 
        : "Digital atelier launch offering seamless KHQR/ABA payment, real-time tailoring consultations, and express nationwide delivery."
    }
  ];

  return (
    <div className="bg-stone-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors duration-300 min-h-screen">
      {/* Top Banner / Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 border-b border-neutral-200 dark:border-white/10">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-gradient-to-b from-[#c2a677]/15 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-6 font-mono">
            <Link to="/" className="hover:text-[#c2a677] transition-colors">
              {t("nav_home", "HOME")}
            </Link>
            <span>/</span>
            <span className="text-[#9a783e] dark:text-[#c2a677] font-semibold">
              {t("nav_about", "ABOUT US")}
            </span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c2a677]/10 border border-[#c2a677]/30 text-[#9a783e] dark:text-[#c2a677] text-xs font-semibold tracking-wider uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isKhmer ? "រឿងរ៉ាវ & មរតកនៃ RITHY STORE" : "HERITAGE & ATELIER CRAFTSMANSHIP"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-neutral-900 dark:text-white leading-[1.15] tracking-tight mb-6">
              {t("about_title", "Couture Tailoring, Proudly Rooted in Cambodia.")}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
              {t("about_subtitle", "Bridging European bespoke tailoring traditions with contemporary elegance, comfort, and affordable luxury designed for Cambodia.")}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-neutral-200 dark:border-white/10">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-white/5 backdrop-blur-sm shadow-sm">
                <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-white tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-[#9a783e] to-[#c2a677] dark:from-white dark:via-[#e5cca0] dark:to-[#c2a677]">
                    {s.value}
                  </span>
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 uppercase tracking-wider font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Story & Workshop Showcase */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase (Photo Gallery / Visual Composition) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Primary Image */}
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&auto=format&fit=crop&q=80"
                  alt="Tailoring atelier craftsmanship"
                  className="w-full h-[440px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-[#c2a677] font-semibold">
                    {isKhmer ? "បន្ទប់កាត់ដេរភ្នំពេញ" : "Phnom Penh Atelier Lounge"}
                  </span>
                  <h3 className="text-xl font-serif font-bold mt-1 text-white">
                    {isKhmer ? "ការដេរដោយដៃផ្ចិតផ្ចង់ និងម៉ត់ចត់" : "Precision Hand-Stitching & Fit"}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
                    {isKhmer 
                      ? "ជាងកាត់ដេរខ្មែរមានបទពិសោធន៍យូរឆ្នាំ ផ្តោតលើភាពលម្អិត និងទម្រង់រូបរាង" 
                      : "Over two decades of master pattern cutting, crafted with reverence for natural drape."}
                  </p>
                </div>
              </div>

              {/* Floating Accent Card */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-xl p-4 sm:p-5 shadow-2xl max-w-[240px] sm:max-w-[280px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#c2a677]/20 flex items-center justify-center text-[#9a783e] dark:text-[#c2a677]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                      Boeung Keng Kang
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Street 214, Phnom Penh
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/60 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 text-xs font-medium tracking-wide">
              <Award className="w-3.5 h-3.5 text-[#9a783e] dark:text-[#c2a677]" />
              <span>{t("about_story_badge", "HERITAGE & CRAFTSMANSHIP")}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-white leading-tight">
              {t("about_story_title", "Born in Phnom Penh. Built to Last.")}
            </h2>

            <div className="prose prose-neutral dark:prose-invert text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed space-y-4 font-light">
              <p>
                {t(
                  "about_story_p1",
                  "Founded in 2020 in the vibrant heart of Phnom Penh, RITHY STORE was created with a clear and uncompromising philosophy: exceptional tailoring should never be out of reach. We set out to redefine Cambodian fashion by sourcing the world's most distinguished natural fibers—Italian wool, French flax linen, and organic mulberry silk—and tailoring them specifically for Southeast Asia's climate."
                )}
              </p>
              <p>
                {t(
                  "about_story_p2",
                  "Every garment is produced in strictly limited small batches. We obsess over the subtle details: double-stitched reinforced seams, hand-polished horn buttons, breathable half-canvassing, and flattering silhouettes that inspire confidence wherever life takes you."
                )}
              </p>
            </div>

            {/* Checklist of guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {[
                isKhmer ? "ធានាប្តូរទំហំក្នុងរយៈពេល ៧ ថ្ងៃ" : "7-Day Hassle-Free Size Exchange",
                isKhmer ? "កាត់ដេរយ៉ាងសមសួនសម្រាប់ជនជាតិខ្មែរ" : "Tailored for Southeast Asian Fits",
                isKhmer ? "ទូទាត់រហ័សតាម ABA KHQR & Wing" : "Seamless ABA KHQR & Wing Pay",
                isKhmer ? "ដឹកជញ្ជូនរហ័ស ២៥ ខេត្តក្រុង" : "Express 25-Province Shipping"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#9a783e] dark:text-[#c2a677] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-xs uppercase tracking-wider hover:bg-[#9a783e] dark:hover:bg-[#c2a677] transition-all shadow-md group"
              >
                <span>{isKhmer ? "ស្វែងរកម៉ូដសម្លៀកបំពាក់" : "EXPLORE THE SHOP"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-300 dark:border-white/20 text-neutral-800 dark:text-white font-semibold text-xs uppercase tracking-wider hover:border-[#c2a677] hover:text-[#9a783e] dark:hover:text-[#c2a677] transition-colors"
              >
                <span>{isKhmer ? "ទាក់ទងមកកាន់ហាង" : "VISIT ATELIER"}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Four Pillars */}
      <section className="py-16 md:py-24 bg-white dark:bg-neutral-900/60 border-y border-neutral-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#9a783e] dark:text-[#c2a677] font-semibold font-mono">
              {isKhmer ? "គុណតម្លៃស្នូល" : "OUR CORE FOUNDATION"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-white mt-2">
              {t("about_pillars_title", "The Four Pillars of RITHY STORE")}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-3 font-light">
              {isKhmer
                ? "គោលការណ៍ដែលយើងរក្សាជាប់លាប់តាំងពីថ្ងៃដំបូង ក្នុងការបម្រើអតិថិជនកម្ពុជា"
                : "Unyielding commitments guiding every stitch, fabric selection, and boutique interaction."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-6 sm:p-7 rounded-2xl bg-stone-50 dark:bg-neutral-950 border border-neutral-200 dark:border-white/10 hover:border-[#c2a677]/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c2a677]/20 to-[#9a783e]/10 flex items-center justify-center text-[#9a783e] dark:text-[#c2a677] mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-[#9a783e] dark:group-hover:text-[#c2a677] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Materials & Fabric Laboratory */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#9a783e] dark:text-[#c2a677] font-semibold font-mono">
              {isKhmer ? "សារធាតុផ្សំគុណភាពខ្ពស់" : "MATERIALS ARCHIVE"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-white mt-1">
              {isKhmer ? "ក្រណាត់ប្រណិតលំដាប់ពិភពលោក" : "World-Class Fabric Selection"}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-light">
            {isKhmer
              ? "យើងជ្រើសរើសតែសរសៃក្រណាត់ធម្មជាតិសុទ្ធ ដើម្បីធានាផាសុកភាពខ្ពស់បំផុតក្នុងអាកាសធាតុកម្ពុជា។"
              : "We reject synthetic plastics. Our fabrics breathe, age gracefully, and offer exceptional tactile richness."}
          </p>
        </div>

        {/* Material Selection Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {materials.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setActiveMaterial(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeMaterial === idx
                  ? "bg-[#9a783e] dark:bg-[#c2a677] text-white dark:text-neutral-900 shadow-md scale-105"
                  : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-300 hover:border-[#c2a677]"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Active Material Showcase Card */}
        <div className="rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
            <img
              src={materials[activeMaterial].image}
              alt={materials[activeMaterial].name}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20">
                {materials[activeMaterial].tag}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#9a783e] dark:text-[#c2a677] mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{materials[activeMaterial].origin}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-white mb-4">
                {materials[activeMaterial].name}
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed mb-6">
                {materials[activeMaterial].desc}
              </p>

              <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500">{isKhmer ? "កម្រិតផាសុកភាព" : "Breathability Rating"}</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">10 / 10</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500">{isKhmer ? "ការថែទាំ" : "Care Instructions"}</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{isKhmer ? "បោកគក់ទឹកត្រជាក់ / ស្ងួត" : "Gentle Cold Wash or Dry Clean"}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500">{isKhmer ? "ភាពធន់យូរអង្វែង" : "Longevity Life"}</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{isKhmer ? "៥ - ១០ ឆ្នាំ" : "5 - 10+ Years"}</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9a783e] dark:text-[#c2a677] hover:underline"
              >
                <span>{isKhmer ? "ទិញសម្លៀកបំពាក់ធ្វើពីក្រណាត់នេះ" : "View Pieces Made From This Fabric"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Milestones */}
      <section className="py-16 md:py-24 bg-stone-100/70 dark:bg-neutral-900/40 border-t border-neutral-200 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-[#9a783e] dark:text-[#c2a677] font-semibold font-mono">
              {isKhmer ? "ដំណើរកាលប្បវត្តិ" : "OUR EVOLUTION"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-white mt-1">
              {isKhmer ? "ដំណើរឆ្ពោះទៅមុខនៃ RITHY STORE" : "Milestones of Growth (2020 – 2026)"}
            </h2>
          </div>

          <div className="relative border-l-2 border-[#c2a677]/40 ml-4 sm:ml-32 space-y-12">
            {milestones.map((item, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-10 group">
                {/* Year Marker on Left for screens */}
                <div className="hidden sm:block absolute -left-32 top-0.5 text-right w-24">
                  <span className="text-xl font-serif font-bold text-[#9a783e] dark:text-[#c2a677] tracking-wider">
                    {item.year}
                  </span>
                </div>

                {/* Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#c2a677] group-hover:scale-125 transition-transform" />

                {/* Content Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-sm group-hover:border-[#c2a677]/40 transition-all">
                  <span className="sm:hidden text-xs font-serif font-bold text-[#9a783e] dark:text-[#c2a677] block mb-1">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-neutral-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's / Tailor's Note */}
      <section className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white border border-[#c2a677]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#c2a677]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#c2a677] flex-shrink-0 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                alt="Founder & Atelier Master"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#c2a677] font-mono">
                <Gem className="w-3.5 h-3.5" />
                <span>{isKhmer ? "សារពីស្ថាបនិក" : "FOUNDER'S CREED"}</span>
              </div>

              <blockquote className="text-base sm:text-lg font-serif italic text-neutral-200 leading-relaxed font-light">
                &ldquo;{isKhmer
                  ? "យើងមិនគ្រាន់តែលក់សម្លៀកបំពាក់នោះទេ ប៉ុន្តែយើងកំពុងជួយលើកកម្ពស់ទំនុកចិត្ត និងភាពថ្លៃថ្នូររបស់អ្នកពាក់រាល់ថ្ងៃ។ សម្លៀកបំពាក់ដែលដេរយ៉ាងសមសួន នឹងធ្វើឱ្យអ្នកមានអារម្មណ៍អស្ចារ្យ គ្រប់ទីកន្លែងដែលអ្នកទៅ។"
                  : "We do not merely make clothes; we build armor of quiet confidence. A garment tailored with respect for fiber and form empowers the individual who wears it to walk into any room with poise."}&rdquo;
              </blockquote>

              <div>
                <div className="font-serif font-bold text-white text-base">Chanrithy Sar</div>
                <div className="text-xs text-[#c2a677] uppercase tracking-wider">
                  {isKhmer ? "ស្ថាបនិក & ប្រធានកាត់ដេរ RITHY STORE" : "Founder & Creative Director • RITHY STORE"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 border-t border-neutral-200 dark:border-white/10 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-white mb-3">
            {isKhmer ? "ត្រៀមខ្លួនស្វែងរកស្ទីលថ្មីរបស់អ្នកហើយឬនៅ?" : "Experience RITHY STORE In Person or Online"}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-6 font-light">
            {isKhmer
              ? "អញ្ជើញមកកាន់ហាងរបស់យើងនៅបឹងកេងកង ឬទិញតាមអនឡាញជាមួយការដឹកជញ្ជូនរហ័ស ២៥ ខេត្តក្រុង។"
              : "Step into our Boeung Keng Kang atelier lounge or order online with guaranteed 25-province delivery."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/shop"
              className="px-6 py-3 rounded-xl bg-[#9a783e] dark:bg-[#c2a677] text-white dark:text-neutral-900 font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
            >
              {isKhmer ? "មើលកាតាឡុកទំនិញ" : "SHOP ALL COLLECTIONS"}
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl border border-neutral-300 dark:border-white/20 text-neutral-800 dark:text-white font-semibold text-xs uppercase tracking-wider hover:border-[#c2a677] transition-colors"
            >
              {isKhmer ? "ទំនាក់ទំនង ឬកក់ណាត់ជួប" : "CONTACT CONCIERGE"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
