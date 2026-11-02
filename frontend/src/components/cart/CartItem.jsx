import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus } from "lucide-react";

const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200' fill='%23f3f4f6'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%239ca3af'%3EProduct%3C/text%3E%3C/svg%3E";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  if (!item) return null;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <Link to={`/product/${item.id}`} className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
          <img
            src={item.image || FALLBACK_IMAGE}
            alt={item.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
          />
        </Link>
        <div>
          <Link to={`/product/${item.id}`}>
            <h4 className="font-semibold text-gray-900 dark:text-white text-base hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              {item.name}
            </h4>
          </Link>
          <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-0.5">
            {item.brand || "VELORA Collection"}
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
            {item.size && <span>Size: <strong className="text-gray-700 dark:text-gray-200">{item.size}</strong></span>}
            {item.color && <span>Color: <strong className="text-gray-700 dark:text-gray-200">{item.color}</strong></span>}
          </div>
          <div className="text-sm font-bold text-gray-900 dark:text-white mt-2">
            ${Number(item.price).toFixed(2)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-800">
        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-1">
          <button
            onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
            className="p-1.5 text-gray-500 hover:text-purple-600 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-semibold text-gray-900 dark:text-white">
            {item.quantity || 1}
          </span>
          <button
            onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, Math.min(10, (item.quantity || 1) + 1))}
            className="p-1.5 text-gray-500 hover:text-purple-600 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-right sm:w-24">
          <p className="text-base font-bold text-purple-600 dark:text-purple-400">
            ${(Number(item.price) * (item.quantity || 1)).toFixed(2)}
          </p>
        </div>

        <button
          onClick={() => onRemove && onRemove(item.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;