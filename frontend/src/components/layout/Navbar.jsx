import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { products } from "../../data/products";
import CartDrawer from "../cart/CartDrawer";
import Logo from "../common/Logo";
import ThemeToggle from "../common/ThemeToggle";
import { 
  ShoppingBag, 
  Search, 
  User, 
  Heart, 
  Menu, 
  X, 
  ChevronDown,
  Sun, 
  Moon, 
  LogOut, 
  Settings, 
  Gift, 
  CreditCard, 
  ArrowRight, 
  Star, 
  ShieldCheck,
  Globe
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { language, setLanguage, toggleLanguage, isKhmer, t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      // Default to true for DORÉ luxury dark aesthetic
      return true;
    }
    return true;
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, totalQuantity, updateQuantity, removeItem, wishlist } = useCart();
  const { user, isAdmin, logout, openAuthModal, getInitials } = useAuth();
  const wishlistCount = wishlist?.length || 0;

  const quickSearches = ["Wool Suit", "Silk Dress", "Linen Shirt", "Overcoat", "Cashmere", "Loafers", "Leather Bag"];

  const liveResults = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e, customTerm) => {
    if (e) e.preventDefault();
    const term = (customTerm || searchQuery).trim();
    if (!term) return;
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(`/shop?search=${encodeURIComponent(term)}`);
  };

  // Scroll listener for sticky transparent/solid navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme persistence
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const navLinks = [
    { name: t("nav_home", "HOME"), href: "/" },
    { name: t("nav_shop", "SHOP"), href: "/shop" },
    { name: t("nav_collections", "COLLECTIONS"), href: "/shop" },
    { name: t("nav_about", "ABOUT"), href: "/about" },
    { name: t("nav_journal", "JOURNAL"), href: "/journal" },
    { name: t("nav_contact", "CONTACT"), href: "/contact" }
  ];

  const userMenuItems = [
    ...(isAdmin
      ? [
          { icon: ShieldCheck, label: t("nav_admin_dashboard", "Admin Dashboard"), href: "/admin", badge: t("store_admin", "ADMIN"), action: "admin" },
          { divider: true }
        ]
      : []),
    { icon: User, label: t("nav_my_profile", "My Profile"), href: "/profile", action: "profile" },
    { icon: ShoppingBag, label: t("nav_my_orders", "My Orders"), href: "/profile?tab=orders", action: "orders" },
    { icon: Heart, label: t("nav_wishlist", "Wishlist"), href: "/profile?tab=wishlist", badge: wishlistCount, action: "wishlist" },
    { icon: Gift, label: t("nav_privilege_club", "Privilege Club"), href: "/profile?tab=rewards", action: "rewards" },
    { icon: CreditCard, label: t("nav_payment_methods", "Payment Methods"), href: "/profile?tab=payment", action: "payment" },
    { icon: Settings, label: t("nav_preferences", "Preferences"), action: "/profile?tab=settings", actionType: "navigate", href: "/profile?tab=settings" },
    { divider: true },
    { icon: LogOut, label: t("nav_sign_out", "Sign Out"), action: "logout", danger: true }
  ];

  const handleUserMenuAction = (item) => {
    setIsDropdownOpen(false);
    if (item.action === "logout") {
      logout();
    } else if (item.href && item.href !== "#") {
      navigate(item.href);
    }
  };

  const isHome = location.pathname === "/";
  const isTransparent = isHome && !isScrolled;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 md:py-6 text-white"
          : isScrolled
            ? "bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md shadow-md dark:shadow-2xl border-b border-neutral-200 dark:border-white/10 py-3 md:py-4 text-neutral-900 dark:text-white"
            : "bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-white/10 py-4 text-neutral-900 dark:text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Mobile menu button + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors cursor-pointer ${
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-neutral-700 dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            
            {/* RITHY STORE Brand Logo */}
            <Logo isTransparent={isTransparent} />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isActive = link.href === "/" 
                ? location.pathname === "/" 
                : location.pathname === link.href;

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative py-1 text-xs tracking-[0.22em] font-medium transition-colors duration-200 uppercase ${
                    isTransparent
                      ? (isActive ? "text-white" : "text-neutral-300 hover:text-white")
                      : (isActive ? "text-neutral-950 dark:text-white font-semibold" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white")
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className={`absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full transition-all ${
                      isTransparent ? "bg-white" : "bg-neutral-950 dark:bg-white"
                    }`} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                isTransparent
                  ? "text-neutral-200 hover:text-white hover:bg-white/10"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
              }`}
              aria-label="Search"
              title="Search collection"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Luxury Celestial Theme Toggle (Mobile & Desktop) */}
            <ThemeToggle
              isDarkMode={isDarkMode}
              onToggle={() => setIsDarkMode(!isDarkMode)}
              variant="compact"
            />

            {/* Bilingual Language Switcher (KM / EN) */}
            <button
              onClick={toggleLanguage}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border cursor-pointer ${
                isTransparent
                  ? "bg-white/10 hover:bg-white/20 text-white border-white/20 shadow-sm"
                  : isKhmer
                    ? "bg-[#c2a677]/15 hover:bg-[#c2a677]/25 text-[#9a783e] dark:text-[#d4af37] border-[#c2a677]/40 shadow-sm"
                    : "bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/15 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-white/15"
              }`}
              title={isKhmer ? "Switch to English (EN)" : "ប្តូរទៅភាសាខ្មែរ (KM)"}
              aria-label="Toggle language"
            >
              <span className="text-sm leading-none">{isKhmer ? "🇰🇭" : "🇬🇧"}</span>
              <span className="font-semibold text-[11px] sm:text-xs tracking-wider">
                {isKhmer ? "ខ្មែរ" : "EN"}
              </span>
            </button>

            {/* Wishlist */}
            <Link 
              to="/shop" 
              className={`relative p-2 rounded-full transition-all hidden sm:flex ${
                isTransparent
                  ? "text-neutral-200 hover:text-white hover:bg-white/10"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
              }`}
              title="Saved items"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c2a677] text-neutral-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User Profile / Sign In */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center gap-1.5 p-1.5 rounded-full transition-colors cursor-pointer ${
                    isTransparent ? "hover:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                  aria-label="User account"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#c2a677] flex items-center justify-center text-neutral-950 font-bold text-xs shadow">
                    {getInitials(user.name)}
                  </div>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                    isTransparent ? "text-neutral-200" : "text-neutral-600 dark:text-neutral-300"
                  } ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Click outside to close backdrop */}
                {isDropdownOpen && (
                  <div 
                    className="fixed inset-0 z-40 bg-black/20 sm:bg-transparent" 
                    onClick={() => setIsDropdownOpen(false)} 
                  />
                )}

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-[-2.6rem] sm:right-0 mt-3 w-64 max-w-[calc(100vw-1.5rem)] bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-neutral-200/80 dark:border-white/10 py-2 transform origin-top-right transition-all duration-200 z-50">
                    <div className="px-4 py-3 border-b border-neutral-200/80 dark:border-white/10">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-neutral-900 dark:text-white text-sm truncate">{user.name}</p>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider ${
                          isAdmin 
                            ? "bg-[#c2a677] text-neutral-950" 
                            : "bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300"
                        }`}>
                          {isAdmin ? (t("store_admin", "ADMIN")) : (t("customer", "CUSTOMER"))}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">{user.email}</p>
                    </div>

                    <div className="py-1">
                      {userMenuItems.map((item, index) => {
                        if (item.divider) {
                          return (
                            <div key={index} className="h-px bg-neutral-200 dark:bg-white/10 my-1.5" />
                          );
                        }
                        const Icon = item.icon;
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleUserMenuAction(item)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs tracking-wider transition-colors text-left cursor-pointer ${
                              item.danger
                                ? "text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 font-medium"
                                : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-neutral-950 dark:hover:text-white"
                            }`}
                          >
                            <Icon className="w-4 h-4 flex-shrink-0 text-neutral-400" />
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className="ml-auto bg-[#c2a677] text-neutral-950 font-bold text-[10px] px-1.5 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}

                      {/* Language Switcher inside User Dropdown */}
                      <div className="px-4 py-2 flex items-center justify-between border-t border-neutral-200/80 dark:border-white/10 bg-neutral-50/60 dark:bg-white/[0.02]">
                        <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400 tracking-wider flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-[#c2a677]" />
                          <span>{t("nav_language", "LANGUAGE")}</span>
                        </span>
                        <div className="flex items-center gap-1 bg-neutral-200/60 dark:bg-white/10 p-0.5 rounded-lg">
                          <button
                            type="button"
                            onClick={() => setLanguage("km")}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                              isKhmer
                                ? "bg-[#c2a677] text-neutral-950 shadow-xs"
                                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                            }`}
                          >
                            🇰🇭 ខ្មែរ
                          </button>
                          <button
                            type="button"
                            onClick={() => setLanguage("en")}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                              !isKhmer
                                ? "bg-[#c2a677] text-neutral-950 shadow-xs"
                                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                            }`}
                          >
                            🇬🇧 EN
                          </button>
                        </div>
                      </div>

                      {/* Theme Mode Toggle inside User Dropdown */}
                      <div className="px-4 py-2.5 flex items-center justify-between border-t border-neutral-200/80 dark:border-white/10 bg-neutral-50/60 dark:bg-white/[0.02]">
                        <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400 tracking-wider">{t("nav_appearance", "APPEARANCE")}</span>
                        <ThemeToggle
                          isDarkMode={isDarkMode}
                          onToggle={() => setIsDarkMode(!isDarkMode)}
                          variant="pill"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  isTransparent
                    ? "text-neutral-200 hover:text-white hover:bg-white/10"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                }`}
                aria-label="Account login"
                title="Sign in / Register"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}

            {/* Shopping Bag Button */}
            <button 
              onClick={() => setIsCartOpen(true)} 
              className={`relative p-2 rounded-full transition-all cursor-pointer ${
                isTransparent
                  ? "text-neutral-200 hover:text-white hover:bg-white/10"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
              }`}
              aria-label="Cart"
              title="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalQuantity > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-[#c2a677] text-neutral-950 text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-neutral-200 dark:border-white/10 pb-4 bg-white/98 dark:bg-neutral-950/98 rounded-2xl px-4 shadow-2xl border border-neutral-200 dark:border-transparent">
            {/* Mobile Account Info */}
            <div className="py-3 px-3 mb-3 bg-neutral-100 dark:bg-white/5 rounded-xl flex items-center justify-between border border-neutral-200 dark:border-white/5">
              {user ? (
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#c2a677] flex items-center justify-center text-neutral-950 font-bold text-xs flex-shrink-0">
                    {getInitials(user.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-xs text-neutral-900 dark:text-white truncate">{user.name}</p>
                      <span className={`px-1.5 py-0.2 rounded text-[8px] font-bold ${
                        isAdmin 
                          ? "bg-[#c2a677] text-neutral-950" 
                          : "bg-neutral-200 dark:bg-white/10 text-neutral-600 dark:text-neutral-300"
                      }`}>
                        {isAdmin ? (t("store_admin", "ADMIN")) : (t("customer", "CUSTOMER"))}
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">{user.email}</p>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-neutral-700 dark:text-neutral-300 font-medium tracking-wider">
                  {t("nav_member_badge", "RITHY STORE MEMBER")}
                </div>
              )}

              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-xs text-red-500 dark:text-red-400 font-medium px-2.5 py-1 bg-red-50 dark:bg-red-950/40 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors cursor-pointer"
                >
                  {t("nav_sign_out", "Sign Out")}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    openAuthModal("login");
                    setIsMenuOpen(false);
                  }}
                  className="text-xs text-neutral-950 font-semibold px-3 py-1.5 bg-[#c2a677] rounded-lg shadow transition-all cursor-pointer"
                >
                  {t("nav_sign_in", "Sign In")}
                </button>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2.5 text-xs tracking-[0.2em] font-bold text-[#9a783e] dark:text-[#c2a677] bg-[#c2a677]/10 rounded-xl transition-colors uppercase flex items-center justify-between mb-1"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t("nav_admin_dashboard", "Admin Dashboard")}</span>
                  </span>
                  <span className="text-[9px] bg-[#c2a677] text-neutral-950 font-bold px-1.5 py-0.5 rounded">
                    {t("store_admin", "ADMIN")}
                  </span>
                </Link>
              )}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2.5 text-xs tracking-[0.2em] font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 rounded-xl transition-colors uppercase"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Language Switcher in Mobile Drawer */}
            <div className="flex items-center justify-between pt-4 mt-3 border-t border-neutral-200 dark:border-white/10 text-xs text-neutral-600 dark:text-neutral-400">
              <span className="font-semibold tracking-wider text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#c2a677]" />
                <span>{t("nav_language", "LANGUAGE")}</span>
              </span>
              <div className="flex items-center gap-1 bg-neutral-100 dark:bg-white/5 p-1 rounded-xl border border-neutral-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setLanguage("km")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                    isKhmer
                      ? "bg-[#c2a677] text-neutral-950 shadow-sm"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                  }`}
                >
                  <span>🇰🇭</span>
                  <span>ខ្មែរ</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                    !isKhmer
                      ? "bg-[#c2a677] text-neutral-950 shadow-sm"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>EN</span>
                </button>
              </div>
            </div>

            {/* Appearance Theme Toggle in Mobile Drawer */}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-neutral-200 dark:border-white/10 text-xs text-neutral-600 dark:text-neutral-400">
              <span className="font-semibold tracking-wider text-neutral-800 dark:text-neutral-200">{t("nav_appearance", "APPEARANCE")}</span>
              <ThemeToggle
                isDarkMode={isDarkMode}
                onToggle={() => setIsDarkMode(!isDarkMode)}
                variant="segmented"
              />
            </div>
          </div>
        )}

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/98 dark:bg-neutral-950/98 backdrop-blur-xl shadow-2xl p-4 sm:p-6 border-b border-neutral-200 dark:border-white/10 transition-all duration-300 z-50">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8894d] dark:text-[#c2a677]" />
                <input
                  type="text"
                  placeholder={t("nav_search_placeholder", "Search timeless suits, jackets, linen shirts, leather shoes...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-24 py-3 bg-neutral-100 dark:bg-white/5 rounded-xl border border-neutral-300 dark:border-white/15 focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 text-sm tracking-wide"
                  autoFocus
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="p-1 text-neutral-400 hover:text-white rounded"
                      title="Clear"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#c2a677] hover:bg-[#b59868] text-neutral-950 rounded-lg text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                  >
                    SEARCH
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="p-1.5 text-neutral-400 hover:text-white ml-1 cursor-pointer"
                    title="Close search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Quick Search Suggestions */}
              {!searchQuery.trim() && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-2">
                    Curated Categories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickSearches.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleSearchSubmit(null, tag)}
                        className="px-3 py-1 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-[#c2a677] rounded-lg text-xs tracking-wider transition-colors cursor-pointer border border-white/5"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Search Instant Results */}
              {searchQuery.trim() && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-neutral-400">
                      Found {liveResults.length} matching pieces
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSearchSubmit(null, searchQuery)}
                      className="text-xs text-[#c2a677] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Explore all in Shop <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {liveResults.length > 0 ? (
                    <div className="space-y-2">
                      {liveResults.map((item) => (
                        <Link
                          key={item.id}
                          to={`/product/${item.id}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors group"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-14 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-white truncate group-hover:text-[#c2a677] transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-xs text-neutral-400">
                              {item.category} • {item.subCategory}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-semibold text-[#c2a677]">
                              ${typeof item.price === "number" ? item.price.toFixed(2) : item.price}
                            </span>
                            <div className="flex items-center gap-1 justify-end text-xs text-amber-400">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>{item.rating}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-neutral-400">
                      <p className="text-sm">No items found matching "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </nav>
  );
}

export default Navbar;