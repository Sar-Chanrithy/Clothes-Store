import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Tag } from "lucide-react";
import { formatKHR } from "../../data/products";

const CartSummary = ({
  subtotal = 0,
  shipping = 0,
  tax = 0,
  discount = 0,
  onCheckout,
  showCheckoutButton = true
}) => {
  const total = Math.max(0, subtotal + shipping + tax - discount);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">
        Order Summary
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Estimated Shipping (Cambodia)</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {tax > 0 && (
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Estimated Tax</span>
            <span className="font-semibold text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> Promo Discount</span>
            <span className="font-semibold">-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex flex-col gap-1">
          <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white">
            <span>Total</span>
            <span className="text-xl text-purple-600 dark:text-purple-400">${total.toFixed(2)}</span>
          </div>
          <div className="text-right text-xs font-medium text-stone-500 dark:text-gray-400">
            ≈ {formatKHR(total)}
          </div>
        </div>
      </div>

      {showCheckoutButton && (
        <div className="pt-2">
          {onCheckout ? (
            <button
              onClick={onCheckout}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to="/checkout"
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}

      <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center gap-2 text-xs text-gray-400">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Secure 256-Bit SSL Encrypted Checkout</span>
      </div>
    </div>
  );
};

export default CartSummary;