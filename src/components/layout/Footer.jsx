import React, { useState } from "react";
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
    { icon: Truck, label: "Free Shipping", desc: "On orders over $100" },
    { icon: RefreshCw, label: "Easy Returns", desc: "30-day return policy" },
    { icon: Shield, label: "Secure Payment", desc: "100% protected" },
    { icon: Clock, label: "24/7 Support", desc: "Dedicated assistance" }
  ];

  const categories = [
    { name: "New Arrivals", href: "#" },
    { name: "Men's Collection", href: "#" },
    { name: "Women's Collection", href: "#" },
    { name: "Luxury Watches", href: "#" },
    { name: "Designer Bags", href: "#" },
    { name: "Premium Sneakers", href: "#" }
  ];

  const companyLinks = [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#", badge: "We're Hiring" },
    { name: "Sustainability", href: "#" },
    { name: "Press & Media", href: "#" },
    { name: "Contact", href: "#" }
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
    <footer className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400" />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110"
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </button>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 group-hover:from-purple-500 group-hover:to-pink-500 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                    {feature.label}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1.5">
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative p-2.5 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
                  <Sparkles className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                    VELORA
                  </span>
                </span>
                <span className="text-[10px] font-medium tracking-widest text-gray-400 dark:text-gray-500 uppercase">
                  Luxury Fashion
                </span>
              </div>
            </a>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
              Elevating your style with premium collections. Where luxury meets 
              sophistication, curated for the modern connoisseur.
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
                Trusted by 50,000+ customers
              </span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {categories.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                    {item.badge && (
                      <span className="text-[10px] font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2.5">
              {supportLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-3.5 h-3.5 text-purple-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-3.5 h-3.5 text-purple-500" />
                <span>hello@velora.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-3.5 h-3.5 text-purple-500 mt-0.5" />
                <span>123 Fashion Avenue, New York, NY 10001</span>
              </div>
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
                © 2024 VELORA. All rights reserved.
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
              <span>by VELORA Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;