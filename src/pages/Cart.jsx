import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import {
  ShoppingBag,
  Heart,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Minus,
  Plus,
  X,
  Truck,
  RefreshCw,
  Shield,
  Award,
  CreditCard,
  Lock,
  Gift,
  Sparkles,
  ChevronRight,
  Check,
  Tag,
  Package,
  Clock,
  Eye
} from "lucide-react";

const Cart = () => {
  const { 
    items: cartItems, 
    subtotal, 
    shipping, 
    tax, 
    promoDiscount: discount,
    promoCode: contextPromoCode,
    applyPromo,
    updateQuantity,
    removeItem,
    addItem
  } = useCart();

  const [promoCode, setPromoCode] = useState(contextPromoCode || "");
  const [promoError, setPromoError] = useState("");
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [addedId, setAddedId] = useState(null);

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      brand: product.brand || "VELORA Collection",
      size: product.size || "One Size",
      color: product.color || "Default",
      quantity: 1,
      maxQuantity: 10
    }, 1);

    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  const promoApplied = !!contextPromoCode;

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "VELORA10") {
      applyPromo(promoCode.toUpperCase(), 10);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setTimeout(() => setPromoError(""), 3000);
    }
  };



  const handleCheckout = () => {
    setIsCheckoutLoading(true);
    setTimeout(() => {
      setIsCheckoutLoading(false);
      alert("Proceeding to checkout...");
    }, 1500);
  };

  // Recommended products
  const recommendedProducts = [
    {
      id: 51,
      name: "Leather Dress Shoes",
      price: 459.00,
      originalPrice: 659.00,
      image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300&h=350&fit=crop",
      rating: 4.9,
      brand: "VELORA Collection",
      size: "10",
      color: "Brown"
    },
    {
      id: 52,
      name: "Silk Pocket Square",
      price: 89.00,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=350&fit=crop",
      rating: 4.7,
      brand: "VELORA Collection",
      size: "One Size",
      color: "Blue Motif"
    },
    {
      id: 36,
      name: "Leather Belt",
      price: 159.00,
      originalPrice: 229.00,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=350&fit=crop",
      rating: 4.6,
      brand: "VELORA Collection",
      size: "34",
      color: "Brown"
    }
  ];

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-12">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Looks like you haven't added any items to your cart yet.
              <br />
              Discover our latest collections and find your perfect style.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Shopping Cart
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {cartItems.length} items in your cart
            </p>
          </div>
          <Link
            to="/shop"
            className="text-purple-600 dark:text-purple-400 font-medium flex items-center gap-2 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem 
                key={`${item.id}-${item.size}-${item.color}`}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}

            {/* Free Shipping Progress */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4 border border-purple-100 dark:border-purple-900/30">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {subtotal >= 100 
                      ? "🎉 You qualify for Free Shipping!" 
                      : `Add $${(100 - subtotal).toFixed(2)} more for Free Shipping`}
                  </p>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Products */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Complete Your Look
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Link to={`/product/${product.id}`} className="block w-full h-full">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </Link>
                      <Link
                        to={`/product/${product.id}`}
                        className="absolute bottom-2 right-2 p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md hover:bg-purple-600 hover:text-white text-gray-700 dark:text-gray-200"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                    <div className="p-3 flex flex-col flex-grow justify-between">
                      <div>
                        <Link to={`/product/${product.id}`}>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            {product.name}
                          </h4>
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 mt-3">
                        <Link
                          to={`/product/${product.id}`}
                          className="py-1.5 px-2.5 border border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                          title="View Product"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </Link>
                        <button 
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer ${
                            addedId === product.id
                              ? "bg-emerald-600 text-white shadow-md scale-98"
                              : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:shadow-lg active:scale-95"
                          }`}
                        >
                          {addedId === product.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Added!
                            </>
                          ) : (
                            "Add to Cart"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <CartSummary 
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                discount={discount}
                onCheckout={handleCheckout}
                showCheckoutButton={false}
              />

              {/* Promo Code within CartSummary style box */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                  Apply Promo Code
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white text-sm"
                    disabled={promoApplied}
                  />
                  <button
                    onClick={applyPromoCode}
                    disabled={promoApplied || !promoCode}
                    className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {promoApplied ? "Applied ✓" : "Apply"}
                  </button>
                </div>
                {promoError && (
                  <p className="text-xs text-red-500 mt-1">{promoError}</p>
                )}
                {promoApplied && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    ✓ Promo code applied successfully!
                  </p>
                )}
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckoutLoading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isCheckoutLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Proceed to Checkout
                  </>
                )}
              </button>

              {/* Trust Badges */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <Shield className="w-4 h-4 mx-auto text-green-500" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                      Secure Checkout
                    </p>
                  </div>
                  <div className="text-center">
                    <RefreshCw className="w-4 h-4 mx-auto text-blue-500" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                      Easy Returns
                    </p>
                  </div>
                  <div className="text-center">
                    <Truck className="w-4 h-4 mx-auto text-purple-500" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                      Free Shipping*
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-4 flex justify-center gap-2 opacity-60">
                <CreditCard className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-400">|</span>
                <span className="text-xs text-gray-400">Visa</span>
                <span className="text-xs text-gray-400">Mastercard</span>
                <span className="text-xs text-gray-400">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;