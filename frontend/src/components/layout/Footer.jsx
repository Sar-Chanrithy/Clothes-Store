import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../common/Logo";
import { useLanguage } from "../../context/LanguageContext";
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  ArrowUp,
  Heart,
  ShoppingBag,
  Shield,
  Truck,
  RefreshCw,
  Clock,
  CreditCard,
  Award
} from "lucide-react";

// Lucide does not export brand/social media icons
const Instagram = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Twitter = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Facebook = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Youtube = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { t, isKhmer } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const features = [
    { icon: Truck, label: isKhmer ? "ដឹកជញ្ជូនរហ័ស" : "Free Shipping", desc: isKhmer ? "ឥតគិតថ្លៃលើសពី $30" : "On orders over $30" },
    { icon: RefreshCw, label: isKhmer ? "ប្តូរទំហំងាយស្រួល" : "Easy Exchange", desc: isKhmer ? "ធានាក្នុងរយៈពេល ៧ ថ្ងៃ" : "7-day return guarantee" },
    { icon: Shield, label: isKhmer ? "ទូទាត់ប្រកបដោយសុវត្ថិភាព" : "Secure Payment", desc: isKhmer ? "ABA KHQR & Wing" : "ABA KHQR & Wing Pay" },
    { icon: Clock, label: isKhmer ? "សេវាបម្រើអតិថិជន" : "Concierge Service", desc: isKhmer ? "ម៉ោង ៩ ព្រឹក – ៩ យប់" : "9:00 AM – 9:00 PM" }
  ];

  const categories = [
    { name: isKhmer ? "✨ មកដល់ថ្មី" : "New Arrivals", href: "/new-arrivals" },
    { name: isKhmer ? "ម៉ូដអាវធំបុរស" : "Men's Tailoring", href: "/shop" },
    { name: isKhmer ? "ម៉ូដនារីទាន់សម័យ" : "Women's Collection", href: "/shop" },
    { name: isKhmer ? "ស្បែកជើង & ស្បែកសុទ្ធ" : "Leather Footwear", href: "/shop" },
    { name: isKhmer ? "កាបូប & គ្រឿងតុបតែង" : "Designer Bags", href: "/shop" },
    { name: isKhmer ? "🔥 បញ្ចុះតម្លៃ 30%" : "Sale (Up to 50%)", href: "/sale" }
  ];

  const companyLinks = [
    { name: isKhmer ? "អំពីយើង" : "About Us", href: "/about" },
    { name: isKhmer ? "ទិនានុប្បវត្តិ & ម៉ូដ" : "Journal & Editorial", href: "/journal" },
    { name: isKhmer ? "សិល្បៈកាត់ដេរ & ក្រណាត់" : "Atelier & Sourcing", href: "/about" },
    { name: isKhmer ? "ទំនាក់ទំនងយើងខ្ញុំ" : "Contact & Atelier", href: "/contact" }
  ];

  const supportLinks = [
    { name: "Help Center", href: "#" },
    { name: "Track Order", href: "#" },
    { name: "Returns & Refunds", href: "#" },
    { name: "Size Guide", href: "#" },
    { name: "FAQs", href: "#" }
  ];

  const socialLinks = [
    { icon: Instagram, label: "Instagram", color: "hover:text-pink-500" },
    { icon: Twitter, label: "Twitter", color: "hover:text-blue-400" },
    { icon: Facebook, label: "Facebook", color: "hover:text-blue-600" },
    { icon: Youtube, label: "Youtube", color: "hover:text-red-500" }
  ];

  const paymentMethods = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg"
  ];

  return (
    <footer className="relative bg-stone-100 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border-t border-neutral-200 dark:border-white/10 transition-colors duration-300">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c2a677]/60 to-transparent" />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 -translate-x-1/2 p-2.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-white/20 text-[#9a783e] dark:text-[#c2a677] hover:text-neutral-950 dark:hover:text-white rounded-full shadow-lg dark:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer"
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1.5">
            <Logo variant="full" />

            <p className="mt-4 text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-xs">
              {t("footer_tagline", "Quality apparel and modern essentials tailored for Cambodia, combining contemporary fashion with everyday comfort and affordable prices.")}
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href="#"
                    className={`p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {t("footer_trusted", "Trusted by 50,000+ customers in Cambodia")}
              </span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              {isKhmer ? "ទំនិញ & ម៉ូដ" : "Collections"}
            </h3>
            <ul className="space-y-2.5">
              {categories.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#9a783e] dark:hover:text-[#c2a677] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c2a677] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              {isKhmer ? "ស្ថាប័នយើង" : "Company"}
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#9a783e] dark:hover:text-[#c2a677] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c2a677] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              {isKhmer ? "សេវាអតិថិជន" : "Concierge"}
            </h3>
            <ul className="space-y-2.5">
              {supportLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to="/contact"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#9a783e] dark:hover:text-[#c2a677] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c2a677] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-5 space-y-2.5 pt-4 border-t border-neutral-200 dark:border-white/10">
              <a href="tel:+85512888999" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#9a783e] dark:hover:text-[#c2a677] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#9a783e] dark:text-[#c2a677]" />
                <span>+855 12 888 999</span>
              </a>
              <a href="mailto:support@rithystore.com" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#9a783e] dark:hover:text-[#c2a677] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#9a783e] dark:text-[#c2a677]" />
                <span>support@rithystore.com</span>
              </a>
              <Link to="/contact" className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#9a783e] dark:hover:text-[#c2a677] transition-colors">
                <MapPin className="w-3.5 h-3.5 text-[#9a783e] dark:text-[#c2a677] mt-0.5 flex-shrink-0" />
                <span>St. 214, Boeung Keng Kang, Phnom Penh</span>
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Subscribe for exclusive offers & early access
            </p>

            <form onSubmit={handleSubmit} className="relative">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 pr-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 dark:text-white text-sm"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {isSubscribed ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Send className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-0.5 -translate-y-0.5' : ''}`} />
                  )}
                </button>
              </div>
            </form>

            {isSubscribed && (
              <div className="mt-3 text-sm text-green-600 dark:text-green-400 animate-fadeIn">
                ✓ Subscribed successfully!
              </div>
            )}

            {/* Payment Methods */}
            <div className="mt-6">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Secure payments
              </p>
              <div className="flex gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <CreditCard className="w-3.5 h-3.5 text-purple-500" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Visa</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <CreditCard className="w-3.5 h-3.5 text-orange-500" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Master</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <CreditCard className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>
                © 2025 RITHY STORE. {t("footer_rights", "All rights reserved.")}
              </span>
              <span className="hidden md:inline">•</span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse fill-red-500" />
              <span>by RITHY STORE Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;