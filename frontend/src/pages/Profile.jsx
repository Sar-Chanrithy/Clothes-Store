import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import {
  User,
  ShoppingBag,
  Heart,
  Gift,
  CreditCard,
  MapPin,
  Settings,
  LogOut,
  Shield,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  ChevronRight,
  Package,
  Truck,
  Clock,
  Sparkles,
  Edit3,
  Plus,
  Trash2,
  Key,
  Bell,
  ArrowRight,
  Check
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, updateProfile, logout, openAuthModal, getInitials } = useAuth();
  const { wishlist, addItem, toggleWishlist } = useCart();

  // Active tab state driven by URL search params
  const activeTab = searchParams.get("tab") || "profile";
  const setActiveTab = (tab) => {
    setSearchParams({ tab });
  };

  // Profile Form state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "+1 (555) 234-5678",
    bio: user?.bio || "Curating timeless fashion and modern elegance.",
    street: user?.address?.street || "742 Evergreen Terrace",
    city: user?.address?.city || "Springfield",
    state: user?.address?.state || "OR",
    zipCode: user?.address?.zipCode || "97477",
    country: user?.address?.country || "United States"
  });

  // Sync form data when user context updates
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "+1 (555) 234-5678",
        bio: user.bio || "Curating timeless fashion and modern elegance.",
        street: user.address?.street || "742 Evergreen Terrace",
        city: user.address?.city || "Springfield",
        state: user.address?.state || "OR",
        zipCode: user.address?.zipCode || "97477",
        country: user.address?.country || "United States"
      });
    }
  }, [user]);

  // Notifications / feedback state
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordMsg, setPasswordMsg] = useState({ text: "", isError: false });

  // Saved Payment Methods state
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "pm-1",
      type: "visa",
      number: "•••• •••• •••• 4242",
      holder: user?.name || "Rithysar",
      expiry: "08/28",
      isDefault: true
    },
    {
      id: "pm-2",
      type: "mastercard",
      number: "•••• •••• •••• 8899",
      holder: user?.name || "Rithysar",
      expiry: "11/27",
      isDefault: false
    }
  ]);

  // New Card Modal/Drawer State
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    holder: "",
    expiry: "",
    cvv: ""
  });

  // Mock Orders list for rich order tracking
  const [orders] = useState([
    {
      id: "ORD-9428",
      date: "March 3, 2026",
      status: "Delivered",
      total: 348.0,
      trackingNumber: "TRK-982736192",
      items: [
        {
          name: "Premium Wool Suit",
          size: "40R",
          color: "Charcoal",
          qty: 1,
          price: 289.0,
          image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=250&fit=crop"
        },
        {
          name: "Silk Pocket Square",
          size: "One Size",
          color: "Burgundy",
          qty: 1,
          price: 59.0,
          image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=250&fit=crop"
        }
      ]
    },
    {
      id: "ORD-8910",
      date: "February 18, 2026",
      status: "In Transit",
      total: 189.0,
      trackingNumber: "TRK-102938475",
      items: [
        {
          name: "Italian Leather Oxford Shoes",
          size: "42",
          color: "Espresso",
          qty: 1,
          price: 189.0,
          image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200&h=250&fit=crop"
        }
      ]
    },
    {
      id: "ORD-7621",
      date: "January 14, 2026",
      status: "Delivered",
      total: 129.0,
      trackingNumber: "TRK-554433221",
      items: [
        {
          name: "Cashmere Turtleneck Sweater",
          size: "M",
          color: "Camel",
          qty: 1,
          price: 129.0,
          image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=250&fit=crop"
        }
      ]
    }
  ]);

  // Wishlist products resolution
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  // Handle saving personal info
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      updateProfile({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        bio: formData.bio.trim(),
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        }
      });

      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    }, 400);
  };

  // Copy promo coupon code
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Add new payment card
  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCard.cardNumber || !newCard.expiry) return;

    const last4 = newCard.cardNumber.slice(-4) || "1234";
    const added = {
      id: "pm-" + Date.now(),
      type: newCard.cardNumber.startsWith("4") ? "visa" : "mastercard",
      number: `•••• •••• •••• ${last4}`,
      holder: newCard.holder || user?.name || "Member",
      expiry: newCard.expiry,
      isDefault: false
    };

    setPaymentMethods([...paymentMethods, added]);
    setShowAddCard(false);
    setNewCard({ cardNumber: "", holder: "", expiry: "", cvv: "" });
  };

  // Remove payment card
  const handleRemoveCard = (id) => {
    setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id));
  };

  // Handle password update simulation
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMsg({ text: "New passwords do not match!", isError: true });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordMsg({ text: "Password must be at least 6 characters.", isError: true });
      return;
    }

    setPasswordMsg({ text: "Password changed successfully! 🔒", isError: false });
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setPasswordMsg({ text: "", isError: false }), 3500);
  };

  // If user is not logged in, render helpful auth prompt
  if (!user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-md w-full text-center bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Sign In Required
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Please sign in to access your profile, order tracking, wishlist, and exclusive rewards.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => openAuthModal("login")}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all cursor-pointer"
            >
              Sign In Now
            </button>
            <Link
              to="/"
              className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "orders", label: "My Orders", icon: ShoppingBag, badge: orders.length },
    { id: "wishlist", label: "Wishlist", icon: Heart, badge: wishlist.length },
    { id: "rewards", label: "Rewards & VIP", icon: Gift },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 lg:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HERO HEADER CARD ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 md:p-8 shadow-sm mb-8">
          {/* Ambient Top Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-blue-600/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Profile Avatar */}
              <div className="relative group">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white font-extrabold text-2xl md:text-3xl shadow-xl shadow-purple-500/25 ring-4 ring-white dark:ring-gray-800">
                  {getInitials(user.name)}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 border-2 border-white dark:border-gray-900 w-5 h-5 rounded-full" title="Online" />
              </div>

              {/* User Info */}
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {user.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40">
                    <Sparkles className="w-3 h-3" />
                    {user.role || "VIP Gold Member"}
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  {user.email}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Member since {user.joinedDate || "January 2024"}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab("profile")}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-medium text-sm hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Stat Cards Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            <div 
              onClick={() => setActiveTab("orders")}
              className="p-3 rounded-2xl bg-gray-50/80 dark:bg-gray-800/50 hover:bg-purple-50/60 dark:hover:bg-purple-950/20 transition-all cursor-pointer group"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Orders</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white mt-1 group-hover:text-purple-600 transition-colors">
                {orders.length}
              </p>
            </div>

            <div 
              onClick={() => setActiveTab("wishlist")}
              className="p-3 rounded-2xl bg-gray-50/80 dark:bg-gray-800/50 hover:bg-pink-50/60 dark:hover:bg-pink-950/20 transition-all cursor-pointer group"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400">Wishlist Items</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white mt-1 group-hover:text-pink-600 transition-colors">
                {wishlist.length}
              </p>
            </div>

            <div 
              onClick={() => setActiveTab("rewards")}
              className="p-3 rounded-2xl bg-gray-50/80 dark:bg-gray-800/50 hover:bg-amber-50/60 dark:hover:bg-amber-950/20 transition-all cursor-pointer group"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400">Rewards Points</p>
              <p className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                {user.points || 1250} <span className="text-xs font-normal text-gray-500">($25 value)</span>
              </p>
            </div>

            <div 
              onClick={() => setActiveTab("rewards")}
              className="p-3 rounded-2xl bg-gray-50/80 dark:bg-gray-800/50 hover:bg-blue-50/60 dark:hover:bg-blue-950/20 transition-all cursor-pointer group"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400">Tier Status</p>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                {user.tier || "Gold VIP"}
              </p>
            </div>
          </div>
        </div>

        {/* ================= MAIN CONTENT LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Navigation Tabs (Sidebar) */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-3 border border-gray-100 dark:border-gray-800 shadow-sm sticky top-24 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/25"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400"}`} />
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Main Panel Content */}
          <div className="lg:col-span-3">

            {/* Global Success Feedback Banner */}
            {saveSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-3 text-emerald-700 dark:text-emerald-300 animate-fade-in shadow-sm">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500" />
                <span className="font-medium text-sm">Your profile has been updated successfully! Changes are saved across your account.</span>
              </div>
            )}

            {/* TAB 1: MY PROFILE & PERSONAL INFO */}
            {activeTab === "profile" && (
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Personal Information
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Manage your profile details and personal credentials.
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-full font-semibold">
                    Synced & Active
                  </span>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Display Name / Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Member Role & Tier
                      </label>
                      <input
                        type="text"
                        disabled
                        value={user.role || "VIP Gold Member"}
                        className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Bio / Personal Note
                    </label>
                    <textarea
                      rows="3"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white resize-none"
                    />
                  </div>

                  {/* Address Section */}
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      Primary Shipping Address
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          value={formData.street}
                          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                          State / Province
                        </label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Postal / ZIP Code
                        </label>
                        <input
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSaving ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                      <span>Save Profile Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: MY ORDERS */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Order History & Tracking
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      View all past purchases, download invoices, and track live shipments.
                    </p>
                  </div>
                  <Link
                    to="/shop"
                    className="px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 text-sm font-semibold hover:bg-purple-100 transition-colors hidden sm:inline-flex items-center gap-1.5"
                  >
                    <span>Continue Shopping</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 gap-3">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-gray-900 dark:text-white text-base">
                              {order.id}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                order.status === "Delivered"
                                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40"
                                  : "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Ordered on {order.date} • Tracking: <span className="font-mono">{order.trackingNumber}</span>
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">Total</span>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Items in order */}
                      <div className="py-4 divide-y divide-gray-100 dark:divide-gray-800">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-14 h-16 object-cover rounded-xl border border-gray-100 dark:border-gray-800"
                              />
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                  Size: {item.size} • Color: {item.color} • Qty: {item.qty}
                                </p>
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Order Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <Package className="w-4 h-4 text-purple-500" />
                          <span>Delivered with Standard Express Courier</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => alert(`Invoice for ${order.id} downloaded.`)}
                            className="px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                          >
                            View Invoice
                          </button>
                          <Link
                            to="/shop"
                            className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors shadow-sm"
                          >
                            Buy Again
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: WISHLIST */}
            {activeTab === "wishlist" && (
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                      My Wishlist ({wishlist.length})
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Items you saved for later. Move them to your shopping bag anytime!
                    </p>
                  </div>
                  <Link
                    to="/shop"
                    className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Browse More Items
                  </Link>
                </div>

                {wishlistProducts.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-pink-50 dark:bg-pink-950/40 text-pink-500 flex items-center justify-center">
                      <Heart className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Your wishlist is empty
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 mb-6 max-w-sm mx-auto">
                      Explore our collections and tap the heart icon on any product to save it here.
                    </p>
                    <Link
                      to="/shop"
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 inline-flex items-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Start Exploring Shop</span>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistProducts.map((product) => (
                      <div
                        key={product.id}
                        className="group bg-gray-50 dark:bg-gray-800/60 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/60 flex flex-col justify-between"
                      >
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-red-500 shadow-md hover:scale-110 transition-transform"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                              {product.category}
                            </span>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white mt-1 line-clamp-1">
                              {product.name}
                            </h4>
                            <p className="text-base font-bold text-gray-900 dark:text-white mt-2">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
                            <button
                              onClick={() => {
                                addItem(product, 1);
                                alert(`Added ${product.name} to cart! 🛍️`);
                              }}
                              className="flex-1 py-2 px-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-xs font-semibold hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              Move to Cart
                            </button>
                            <Link
                              to={`/product/${product.id}`}
                              className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                              title="View Details"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: REWARDS & VIP */}
            {activeTab === "rewards" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
                  <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <span className="text-xs uppercase tracking-widest text-purple-300 font-bold">
                          VELORA Privilège Club
                        </span>
                        <h2 className="text-3xl font-extrabold mt-1">
                          VIP Gold Tier Status
                        </h2>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-300 block">Available Balance</span>
                        <span className="text-3xl font-black text-amber-400">
                          {user.points || 1250} Pts
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar to Next Tier */}
                    <div className="mt-8">
                      <div className="flex justify-between text-xs text-gray-300 mb-2">
                        <span>Gold Member (1,000 pts)</span>
                        <span>Platinum Elite (2,000 pts)</span>
                      </div>
                      <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-400 to-pink-500 h-full rounded-full transition-all duration-500"
                          style={{ width: "62%" }}
                        />
                      </div>
                      <p className="text-xs text-purple-200 mt-2">
                        750 more points needed to unlock Platinum Tier (free personal styling & concierge).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Claimable Vouchers */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-purple-600" />
                    Available Exclusive Vouchers
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Redeem these coupon codes at checkout to apply instant discounts.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        code: "VIP15",
                        discount: "15% OFF",
                        desc: "Valid on all new season collections",
                        expires: "Expires in 28 days"
                      },
                      {
                        code: "FREESHIP",
                        discount: "FREE SHIPPING",
                        desc: "No minimum spend required worldwide",
                        expires: "Active Gold Perk"
                      },
                      {
                        code: "VELORA30",
                        discount: "$30 OFF",
                        desc: "Orders over $150 in suits & blazers",
                        expires: "Expires Mar 31, 2026"
                      }
                    ].map((voucher, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl border-2 border-dashed border-purple-200 dark:border-purple-800/60 bg-purple-50/40 dark:bg-purple-950/20 flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                            PROMO REWARD
                          </span>
                          <h4 className="text-xl font-extrabold text-gray-900 dark:text-white mt-1">
                            {voucher.discount}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {voucher.desc}
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-purple-100 dark:border-purple-900/50 flex items-center justify-between">
                          <span className="font-mono text-sm font-bold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 px-2.5 py-1 rounded-lg border border-purple-200 dark:border-purple-700">
                            {voucher.code}
                          </span>
                          <button
                            onClick={() => handleCopyCode(voucher.code)}
                            className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
                          >
                            {copiedCode === voucher.code ? (
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" /> Copied!
                              </span>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: PAYMENT METHODS */}
            {activeTab === "payments" && (
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Payment Methods
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Manage your saved credit cards and secure digital wallets.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddCard(!showAddCard)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Card</span>
                  </button>
                </div>

                {/* Add Card Form Modal / Collapsible */}
                {showAddCard && (
                  <form
                    onSubmit={handleAddCard}
                    className="mb-8 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-4 animate-fade-in"
                  >
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                      Add New Credit or Debit Card
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="4532 8899 0012 3456"
                          maxLength="19"
                          value={newCard.cardNumber}
                          onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Name on card"
                          value={newCard.holder}
                          onChange={(e) => setNewCard({ ...newCard, holder: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Expiry Date (MM/YY)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="09/29"
                          maxLength="5"
                          value={newCard.expiry}
                          onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Security CVV
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="•••"
                          maxLength="4"
                          value={newCard.cvv}
                          onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddCard(false)}
                        className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 shadow cursor-pointer"
                      >
                        Save Card
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((pm) => (
                    <div
                      key={pm.id}
                      className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700/80 bg-gray-50/50 dark:bg-gray-800/40 relative flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-slate-800 to-slate-950 flex items-center justify-center text-white font-black text-xs">
                            {pm.type === "visa" ? "VISA" : "MC"}
                          </div>
                          <div>
                            <p className="text-sm font-mono font-bold text-gray-900 dark:text-white">
                              {pm.number}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Exp: {pm.expiry}
                            </p>
                          </div>
                        </div>

                        {pm.isDefault && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                            Default
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700/60">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {pm.holder}
                        </span>
                        <button
                          onClick={() => handleRemoveCard(pm.id)}
                          className="text-xs text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: ADDRESSES */}
            {activeTab === "addresses" && (
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Saved Shipping Addresses
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Choose or modify default addresses for one-click checkout.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-purple-700 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Default Address</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Default Residence Address */}
                  <div className="p-6 rounded-2xl border-2 border-purple-500/40 bg-purple-50/20 dark:bg-purple-950/10 relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        Home Address
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300">
                        Default
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {user.address?.street || "742 Evergreen Terrace"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.address?.city || "Springfield"}, {user.address?.state || "OR"} {user.address?.zipCode || "97477"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.address?.country || "United States"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-mono">
                      Phone: {user.phone || "+1 (555) 234-5678"}
                    </p>
                  </div>

                  {/* Secondary Office Address */}
                  <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        Office & Work
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {user.name} (c/o Studio)
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      500 Fashion Avenue, 14th Floor
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      New York, NY 10018
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      United States
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: SETTINGS & SECURITY */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                {/* Change Password Card */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                    <Key className="w-5 h-5 text-purple-600" />
                    Change Account Password
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Ensure your account is using a strong, unique password.
                  </p>

                  {passwordMsg.text && (
                    <div
                      className={`mb-4 p-3.5 rounded-xl text-sm flex items-center gap-2 ${
                        passwordMsg.isError
                          ? "bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/40 dark:border-red-900"
                          : "bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900"
                      }`}
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{passwordMsg.text}</span>
                    </div>
                  )}

                  <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        New Password (min 6 chars)
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 dark:text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl shadow transition-colors cursor-pointer"
                    >
                      Update Password
                    </button>
                  </form>
                </div>

                {/* Notifications Preferences */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-purple-600" />
                    Notification & Privacy Preferences
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Choose what updates and communications you receive from VELORA.
                  </p>

                  <div className="space-y-4 max-w-xl">
                    {[
                      {
                        title: "Order Status & Shipment Tracking",
                        desc: "Get live real-time SMS & Email tracking on every order."
                      },
                      {
                        title: "Private VIP Member Drops",
                        desc: "Early access notifications 2 hours before general release."
                      },
                      {
                        title: "Exclusive Flash Sales & Coupons",
                        desc: "Receive curated discount codes based on your wardrobe wishlist."
                      }
                    ].map((pref, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/40">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{pref.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{pref.desc}</p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 cursor-pointer accent-purple-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-50/50 dark:bg-red-950/20 rounded-3xl p-6 border border-red-200 dark:border-red-900/40">
                  <h3 className="text-base font-bold text-red-600 dark:text-red-400 mb-1">
                    Danger Zone
                  </h3>
                  <p className="text-xs text-red-500/80 mb-4">
                    Sign out from all active sessions or delete your account data.
                  </p>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Log Out of All Devices
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
