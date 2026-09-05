import React from "react";
import { Link } from "react-router-dom";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import CartItem from "./CartItem";

const CartDrawer = ({
  isOpen = false,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemove
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
              Shopping Cart ({items.reduce((sum, item) => sum + (item.quantity || 1), 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
              <p className="text-base font-semibold text-gray-700 dark:text-gray-300">Your cart is empty</p>
              <p className="text-xs text-gray-400 mt-1 mb-6">Add some luxury pieces to get started.</p>
              <div className="flex flex-col gap-2">
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-semibold shadow-md hover:opacity-95 transition-all text-center"
                >
                  Start Shopping
                </Link>
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="w-full py-2 px-4 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center"
                >
                  View Cart Page
                </Link>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <CartItem
                key={`${item.id}-${item.size}-${item.color}`}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 space-y-4">
            <div className="flex justify-between items-center text-base font-bold text-gray-900 dark:text-white">
              <span>Subtotal</span>
              <span className="text-purple-600 dark:text-purple-400">${subtotal.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/cart"
                onClick={onClose}
                className="py-3 px-4 text-center border border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-colors text-sm"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                onClick={onClose}
                className="py-3 px-4 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-md hover:opacity-95 transition-all text-sm flex items-center justify-center gap-1"
              >
                Checkout <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;