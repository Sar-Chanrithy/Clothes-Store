import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  icon: Icon,
  iconPosition = "left",
  to,
  ...props
}) => {
  // Base styles
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  // Variant styles
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl hover:scale-[1.02]",
    secondary: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600",
    outline: "border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-xl hover:scale-[1.02]",
    success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl hover:scale-[1.02]",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
    link: "text-purple-600 dark:text-purple-400 hover:underline"
  };

  // Size styles
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };

  const combinedClassName = `
    ${baseStyles}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${className}
  `.trim();

  const buttonContent = loading ? (
    <>
      <svg
        className="w-4 h-4 mr-2 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      Loading...
    </>
  ) : (
    <>
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4 mr-2" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="w-4 h-4 ml-2" />}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={combinedClassName} {...props}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClassName}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default Button;