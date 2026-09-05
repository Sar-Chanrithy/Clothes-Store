import React, { createContext, useContext, useReducer, useEffect } from "react";

// Initial state
const initialState = {
  items: [],
  wishlist: [],
  totalQuantity: 0,
  totalPrice: 0,
  subtotal: 0,
  savings: 0,
  shipping: 0,
  tax: 0,
  grandTotal: 0,
  promoCode: null,
  promoDiscount: 0
};

// Cart actions
const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  TOGGLE_WISHLIST: "TOGGLE_WISHLIST",
  APPLY_PROMO: "APPLY_PROMO",
  REMOVE_PROMO: "REMOVE_PROMO",
  CALCULATE_TOTALS: "CALCULATE_TOTALS"
};

// Cart reducer
const cartReducer = (state, action) => {
  let updatedItems;
  let updatedWishlist;

  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.min(item.quantity + (action.payload.quantity || 1), item.maxQuantity || 10) }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }];
      }
      
      return { ...state, items: updatedItems };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      updatedItems = state.items.filter(item => item.id !== action.payload);
      return { ...state, items: updatedItems };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      updatedItems = state.items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.maxQuantity || 10)) }
          : item
      );
      return { ...state, items: updatedItems };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return { ...state, items: [] };
    }

    case CART_ACTIONS.TOGGLE_WISHLIST: {
      const productId = action.payload;
      const exists = state.wishlist.includes(productId);
      updatedWishlist = exists
        ? state.wishlist.filter(id => id !== productId)
        : [...state.wishlist, productId];
      return { ...state, wishlist: updatedWishlist };
    }

    case CART_ACTIONS.APPLY_PROMO: {
      const { code, discount } = action.payload;
      return { ...state, promoCode: code, promoDiscount: discount };
    }

    case CART_ACTIONS.REMOVE_PROMO: {
      return { ...state, promoCode: null, promoDiscount: 0 };
    }

    case CART_ACTIONS.CALCULATE_TOTALS: {
      const { items } = state;
      
      // Calculate subtotal
      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Calculate original total (before discounts)
      const originalTotal = items.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0);
      
      // Calculate savings
      const savings = originalTotal - subtotal;
      
      // Calculate total quantity
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
      
      // Calculate shipping (free over $100)
      const shipping = subtotal > 100 ? 0 : 15.00;
      
      // Calculate tax (8%)
      const tax = subtotal * 0.08;
      
      // Calculate promo discount
      const promoDiscount = state.promoCode ? subtotal * (state.promoDiscount / 100) : 0;
      
      // Calculate grand total
      const grandTotal = subtotal + shipping + tax - promoDiscount;

      return {
        ...state,
        subtotal,
        savings,
        totalQuantity,
        totalPrice: subtotal,
        shipping,
        tax,
        grandTotal
      };
    }

    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Cart provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    // Load from localStorage on initial render
    const stored = localStorage.getItem('velora_cart');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return initialState;
      }
    }
    return initialState;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('velora_cart', JSON.stringify(state));
    
    // Recalculate totals on any change
    dispatch({ type: CART_ACTIONS.CALCULATE_TOTALS });
  }, [state.items, state.promoCode, state.promoDiscount]);

  // Action creators
  const addItem = (product, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { ...product, quantity }
    });
  };

  const removeItem = (id) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: id
    });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const toggleWishlist = (id) => {
    dispatch({
      type: CART_ACTIONS.TOGGLE_WISHLIST,
      payload: id
    });
  };

  const applyPromo = (code, discount) => {
    dispatch({
      type: CART_ACTIONS.APPLY_PROMO,
      payload: { code, discount }
    });
  };

  const removePromo = () => {
    dispatch({ type: CART_ACTIONS.REMOVE_PROMO });
  };

  // Helper functions
  const isInCart = (id) => {
    return state.items.some(item => item.id === id);
  };

  const getItemQuantity = (id) => {
    const item = state.items.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  const isInWishlist = (id) => {
    return state.wishlist.includes(id);
  };

  const getCartTotal = () => {
    return state.grandTotal;
  };

  const getItemCount = () => {
    return state.totalQuantity;
  };

  const value = {
    // State
    ...state,
    
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleWishlist,
    applyPromo,
    removePromo,
    
    // Helpers
    isInCart,
    getItemQuantity,
    isInWishlist,
    getCartTotal,
    getItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;