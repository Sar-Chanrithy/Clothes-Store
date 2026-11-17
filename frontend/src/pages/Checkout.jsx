import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { sendTelegramOrderAlert, getDirectTelegramOrderUrl } from "../utils/telegram";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  Lock,
  Check,
  ChevronRight,
  Shield,
  RefreshCw,
  Sparkles,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Package,
  Calendar,
  Clock,
  AlertCircle,
  ShoppingBag,
  CheckCircle2
} from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    items: cartItems, 
    subtotal: cartSubtotal, 
    savings: cartSavings, 
    tax: cartTax, 
    promoDiscount,
    clearCart 
  } = useCart();

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);
  const [generalError, setGeneralError] = useState("");

  // Default fallback items if cart is empty when accessing checkout directly
  const fallbackItems = [
    {
      id: 51,
      name: "Leather Dress Shoes",
      price: 459.00,
      quantity: 1,
      size: "10",
      color: "Brown",
      image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300&h=350&fit=crop"
    }
  ];

  const items = cartItems.length > 0 ? cartItems : fallbackItems;

  // Form state pre-populated with user profile if available
  const [formData, setFormData] = useState({
    firstName: user?.name ? user.name.split(" ")[0] : "Admin",
    lastName: user?.name && user.name.split(" ").length > 1 ? user.name.split(" ").slice(1).join(" ") : "Rithy",
    email: user?.email || "admin@rithystore.com",
    phone: user?.phone || "+855 12 345 678",
    address: user?.address?.street || "Preah Monivong Blvd",
    apartment: user?.address?.apartment || "Suite 4B",
    city: user?.address?.city || "Phnom Penh",
    country: "KH",
    saveInfo: true,
    // Shipping method
    shippingMethod: "standard",
    // Payment
    cardNumber: "4242 •••• •••• 4242",
    cardName: user?.name || "Admin Rithy",
    expiryDate: "12/28",
    cvv: "888",
    saveCard: true,
    // Billing
    sameAsShipping: true,
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZip: ""
  });

  const [errors, setErrors] = useState({});

  // Sync with user details if user logs in later
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: prev.firstName || (user.name ? user.name.split(" ")[0] : ""),
        lastName: prev.lastName || (user.name && user.name.split(" ").length > 1 ? user.name.split(" ").slice(1).join(" ") : ""),
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "+1 (555) 234-5678",
        cardName: prev.cardName || user.name || "John Doe"
      }));
    }
  }, [user]);

  const shippingMethods = [
    { id: "standard", label: "Standard Shipping", days: "4-6 business days", price: 0 },
    { id: "express", label: "Express Priority", days: "2-3 business days", price: 15.00 },
    { id: "overnight", label: "Overnight Delivery", days: "Next business day", price: 35.00 }
  ];

  const selectedShipping = shippingMethods.find((m) => m.id === formData.shippingMethod) || shippingMethods[0];

  // Dynamic calculations based on cart items
  const subtotal = cartItems.length > 0 ? cartSubtotal : 459.00;
  const savings = cartItems.length > 0 ? cartSavings : 200.00;
  const discountAmount = promoDiscount ? subtotal * (promoDiscount / 100) : 0;
  const shippingCost = selectedShipping.price;
  const tax = cartItems.length > 0 && cartTax > 0 ? cartTax : subtotal * 0.08;
  const total = Math.max(0, subtotal - discountAmount + shippingCost + tax);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (generalError) {
      setGeneralError("");
    }
  };

  // Quick autofill customer information helper
  const handleAutofillCustomer = () => {
    setFormData(prev => ({
      ...prev,
      firstName: user?.name ? user.name.split(" ")[0] : "John",
      lastName: user?.name && user.name.split(" ").length > 1 ? user.name.split(" ").slice(1).join(" ") : "Doe",
      email: user?.email || "john.doe@example.com",
      phone: user?.phone || "+1 (555) 019-2834",
      address: user?.address?.street || "742 Evergreen Terrace",
      apartment: user?.address?.apartment || "Suite 4B",
      city: user?.address?.city || "New York",
      country: "US"
    }));
    setErrors({});
    setGeneralError("");
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.address.trim()) newErrors.address = "Street address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";

      if (Object.keys(newErrors).length > 0) {
        setGeneralError("Please fill in all required customer information below to continue.");
      } else {
        setGeneralError("");
      }
    }

    if (currentStep === 2) {
      if (!formData.shippingMethod) newErrors.shippingMethod = "Please select a shipping method";
    }

    if (currentStep === 3) {
      if (paymentMethod === "card") {
        if (!formData.cardNumber || !formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
        if (!formData.cardName || !formData.cardName.trim()) newErrors.cardName = "Name on card is required";
        if (!formData.expiryDate || !formData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required";
        if (!formData.cvv || !formData.cvv.trim()) newErrors.cvv = "Security code (CVV) is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const placeOrder = () => {
    if (validateStep(step)) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        const orderNumber = "VEL-" + Math.floor(100000 + Math.random() * 900000);
        const paymentLabel = paymentMethod === "bakong" 
          ? "ABA / Bakong KHQR" 
          : paymentMethod === "cod" 
            ? "Cash on Delivery" 
            : "Credit Card";

        const orderData = {
          orderNumber,
          customerName: `${formData.firstName} ${formData.lastName}`.trim() || user?.name || "Admin Rithy",
          email: formData.email || user?.email || "admin@rithystore.com",
          phone: formData.phone || "+855 12 345 678",
          address: `${formData.address}, ${formData.city}`,
          shippingMethod: selectedShipping.label,
          items: [...items],
          total: total,
          paymentMethod: paymentLabel
        };

        setPlacedOrderDetails(orderData);

        // 1. Send automated alert to Telegram Bot
        try {
          sendTelegramOrderAlert(orderData);
        } catch (tgErr) {
          console.error("Telegram alert error:", tgErr);
        }

        // 2. Persist to Admin Dashboard orders
        try {
          const existingOrders = JSON.parse(localStorage.getItem("velora_admin_orders") || "[]");
          const newAdminOrder = {
            id: `ORD-${orderNumber.replace("VEL-", "")}`,
            customer: orderData.customerName,
            phone: orderData.phone,
            province: formData.city || "Phnom Penh",
            items: (items || []).map(i => `${i.name} (x${i.quantity})`).join(", ") || "Store Order",
            totalUSD: Number(total),
            paymentMethod: orderData.paymentMethod,
            status: "Processing",
            date: "Just now"
          };
          localStorage.setItem("velora_admin_orders", JSON.stringify([newAdminOrder, ...existingOrders]));
        } catch (e) {
          console.error("Failed to sync order to admin storage", e);
        }

        clearCart();
        setOrderComplete(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1500);
    }
  };

  // Order Success Screen
  if (orderComplete && placedOrderDetails) {
    const telegramUrl = getDirectTelegramOrderUrl(placedOrderDetails);

    return (
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100 dark:border-gray-800 text-center animate-fade-in">
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-emerald-500 to-green-400 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
            Order Placed Successfully
          </span>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-4 mb-2">
            Thank You, {placedOrderDetails.customerName}!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto mb-6">
            Your luxury order has been confirmed. A receipt and shipment tracker has been sent to{" "}
            <span className="font-semibold text-gray-800 dark:text-gray-200">{placedOrderDetails.email}</span>.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-200/60 dark:border-gray-700 text-left space-y-3 mb-6">
            <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Order Number</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                #{placedOrderDetails.orderNumber}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Delivery Address</span>
              <span className="font-medium text-gray-800 dark:text-gray-200 truncate max-w-[220px]">
                {placedOrderDetails.address}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Shipping Method</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {placedOrderDetails.shippingMethod}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm pt-1 font-bold text-gray-900 dark:text-white">
              <span>Total Paid</span>
              <span className="text-purple-600 dark:text-purple-400 text-lg">
                ${placedOrderDetails.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Direct Telegram Action Card */}
          <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-center mb-6 space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#0088cc] dark:text-sky-400 uppercase tracking-wider">
              <span>Telegram Order Confirmation</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
              Send your payment slip or chat directly with our store team on Telegram to confirm faster dispatch:
            </p>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              <span>Send Receipt on Telegram (@rithystore)</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/shop"
              className="flex-1 py-3.5 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all text-center"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="flex-1 py-3.5 px-6 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page bg-gray-50 dark:bg-gray-950 min-h-screen py-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Checkout
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              A few details and your order is on its way.
            </p>
          </div>
          <Link
            to="/cart"
            className="text-purple-600 dark:text-purple-400 font-medium flex items-center gap-2 hover:gap-3 transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="checkout-progress flex items-center justify-center">
          {[
            { num: 1, label: "Details" },
            { num: 2, label: "Shipping" },
            { num: 3, label: "Payment" }
          ].map((item, idx) => (
            <React.Fragment key={item.num}>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step >= item.num
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step > item.num ? <Check className="w-5 h-5" /> : item.num}
                </div>
                <span
                  className={`text-sm font-medium ${
                    step >= item.num ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
              </div>
              {idx < 2 && (
                <div
                  className={`w-12 sm:w-20 h-0.5 mx-2 ${
                    step > item.num ? "bg-purple-500" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Steps Form */}
          <div className="lg:col-span-2">
            <div className="checkout-card checkout-form bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              
              {/* Step 1: Customer Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-purple-500" />
                        Contact & delivery
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Where should we send your order?
                      </p>
                    </div>

                    {/* Quick Autofill Button */}
                    <button
                      type="button"
                      onClick={handleAutofillCustomer}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/50 dark:hover:bg-purple-900/60 text-purple-600 dark:text-purple-300 rounded-xl text-xs font-semibold transition-all cursor-pointer border border-purple-200/60 dark:border-purple-800/40 shadow-xs"
                      title="Quickly fill in sample customer information"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-500 animate-pulse" />
                      <span>Autofill details</span>
                    </button>
                  </div>

                  {/* Validation Error Banner */}
                  {generalError && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl flex items-center justify-between gap-3 text-red-600 dark:text-red-400 text-sm">
                      <div className="flex items-center gap-2.5">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{generalError}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleAutofillCustomer}
                        className="text-xs font-bold underline hover:text-red-700 whitespace-nowrap cursor-pointer"
                      >
                        Autofill info
                      </button>
                    </div>
                  )}

                  {/* Customer Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="e.g. John"
                        className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 dark:text-white transition-colors ${
                          errors.firstName
                            ? "border-red-400 focus:ring-red-400 bg-red-50/20"
                            : "border-gray-200 dark:border-gray-700 focus:ring-purple-500"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="e.g. Doe"
                        className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 dark:text-white transition-colors ${
                          errors.lastName
                            ? "border-red-400 focus:ring-red-400 bg-red-50/20"
                            : "border-gray-200 dark:border-gray-700 focus:ring-purple-500"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Customer Contact Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. customer@example.com"
                          className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 dark:text-white transition-colors ${
                            errors.email
                              ? "border-red-400 focus:ring-red-400 bg-red-50/20"
                              : "border-gray-200 dark:border-gray-700 focus:ring-purple-500"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. 742 Evergreen Terrace"
                      className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 dark:text-white transition-colors ${
                        errors.address
                          ? "border-red-400 focus:ring-red-400 bg-red-50/20"
                          : "border-gray-200 dark:border-gray-700 focus:ring-purple-500"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      placeholder="e.g. Apt 4B"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. New York"
                        className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 dark:text-white transition-colors ${
                          errors.city
                            ? "border-red-400 focus:ring-red-400 bg-red-50/20"
                            : "border-gray-200 dark:border-gray-700 focus:ring-purple-500"
                        }`}
                      />
                      {errors.city && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.city}
                        </p>
                      )}
                    </div>

                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="saveInfo"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500 cursor-pointer"
                    />
                    <label htmlFor="saveInfo" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                      Save my details for next time
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="checkout-primary w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
                  >
                    <span>Continue to shipping</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Step 2: Shipping Method */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Truck className="w-5 h-5 text-purple-500" />
                        Shipping Method
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Delivering to: <span className="font-semibold text-gray-700 dark:text-gray-300">{formData.address}, {formData.city}</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {shippingMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.shippingMethod === method.id
                            ? "border-purple-500 bg-purple-50/60 dark:bg-purple-900/20 shadow-xs"
                            : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value={method.id}
                            checked={formData.shippingMethod === method.id}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-purple-500 focus:ring-purple-500"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {method.label}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Estimated delivery: {method.days}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {method.price === 0 ? "Free" : `$${method.price.toFixed(2)}`}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer"
                    >
                      Back to details
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="checkout-primary flex-1 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
                    >
                      Continue to payment
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-purple-500" />
                        Payment Method
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Select your preferred payment method below
                      </p>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        paymentMethod === "card"
                          ? "border-purple-600 bg-purple-50/50 dark:bg-purple-900/20 shadow-sm"
                          : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <CreditCard className={`w-5 h-5 ${paymentMethod === "card" ? "text-purple-600 dark:text-purple-400" : "text-gray-400"}`} />
                        {paymentMethod === "card" && <Check className="w-4 h-4 text-purple-600 dark:text-purple-400 stroke-[3]" />}
                      </div>
                      <p className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">Credit / Debit Card</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Visa, Mastercard</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("bakong")}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        paymentMethod === "bakong"
                          ? "border-[#0088cc] bg-sky-50/50 dark:bg-sky-950/20 shadow-sm"
                          : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-5 h-5 rounded-md bg-[#0088cc] text-white flex items-center justify-center text-[10px] font-black">
                          QR
                        </div>
                        {paymentMethod === "bakong" && <Check className="w-4 h-4 text-[#0088cc] stroke-[3]" />}
                      </div>
                      <p className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">ABA / Bakong KHQR</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Instant Scan & Telegram</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        paymentMethod === "cod"
                          ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm"
                          : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Package className={`w-5 h-5 ${paymentMethod === "cod" ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`} />
                        {paymentMethod === "cod" && <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />}
                      </div>
                      <p className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">Cash on Delivery</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Pay upon package arrival</p>
                    </button>
                  </div>

                  {/* Payment Details Content */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-gray-50/70 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 animate-fade-in">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Card Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="4242 4242 4242 4242"
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white font-mono text-sm"
                        />
                        {errors.cardNumber && (
                          <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Name on Card <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="Admin Rithy"
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white text-sm"
                        />
                        {errors.cardName && (
                          <p className="text-xs text-red-500 mt-1">{errors.cardName}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Expiry Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY (e.g. 12/28)"
                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white text-sm"
                          />
                          {errors.expiryDate && (
                            <p className="text-xs text-red-500 mt-1">{errors.expiryDate}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Security code (CVV) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="888"
                            maxLength="4"
                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white font-mono text-sm"
                          />
                          {errors.cvv && (
                            <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "bakong" && (
                    <div className="p-5 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/50 space-y-3 animate-fade-in text-center sm:text-left">
                      <div className="flex items-center gap-2.5 text-sky-700 dark:text-sky-300 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-[#0088cc]" />
                        <span>ABA Pay & Bakong KHQR Instant Checkout</span>
                      </div>
                      <p className="text-xs text-sky-800 dark:text-sky-300/80 leading-relaxed">
                        After placing your order, an instant receipt will be generated. You can tap <strong>"Send Receipt on Telegram (@rithystore)"</strong> to send your KHQR transaction slip directly to our concierge team for immediate fulfillment.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "cod" && (
                    <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-3 animate-fade-in text-center sm:text-left">
                      <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Cash on Delivery (ទូទាត់ពេលដឹកជញ្ជូនដល់)</span>
                      </div>
                      <p className="text-xs text-emerald-800 dark:text-emerald-300/80 leading-relaxed">
                        No advance payment required. You can pay cash directly to the delivery courier in USD ($) or Cambodian Riel (៛) upon inspecting your items.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 py-3.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={placeOrder}
                      disabled={isProcessing}
                      className="checkout-primary flex-1 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing Order...
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5" />
                          Place Order (${total.toFixed(2)})
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="checkout-card checkout-summary sticky top-24 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-purple-500" />
                  Your order
                </h2>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-100 dark:border-gray-800"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=100&fit=crop";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Qty: {item.quantity} â€¢ Size: {item.size || "M"} â€¢ {item.color || "Default"}
                      </p>
                      <p className="text-sm font-bold text-purple-600 dark:text-purple-400 mt-0.5">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

              {/* Totals */}
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Promo Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Free</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Estimated Tax</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <Shield className="w-4 h-4 mx-auto text-green-500 mb-1" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Secure SSL</p>
                  </div>
                  <div className="text-center">
                    <RefreshCw className="w-4 h-4 mx-auto text-blue-500 mb-1" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">30-Day Returns</p>
                  </div>
                  <div className="text-center">
                    <Lock className="w-4 h-4 mx-auto text-purple-500 mb-1" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Encrypted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
