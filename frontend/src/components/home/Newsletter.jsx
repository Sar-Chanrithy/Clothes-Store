import React, { useState } from "react";
import { 
  Mail, 
  CheckCircle2, 
  Sparkles, 
  Gift, 
  Star, 
  Crown,
  ArrowRight,
  Bell,
  Zap,
  Shield
} from "lucide-react";

const Newsletter = ({ 
  variant = "luxury",
  title = "Join The RITHY STORE Club",
  subtitle = "Subscribe to receive private preview invitations, new arrivals, and exclusive seasonal member discounts in Cambodia.",
  placeholder = "Enter your email address...",
  buttonText = "Subscribe",
  successMessage = "Welcome to RITHY STORE. Your welcome voucher has been dispatched.",
  showIcon = true,
  showFeatures = false,
  className = "",
  onSubscribe
}) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Variant configurations
  const variants = {
    default: {
      container: "bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white",
      iconBg: "bg-white/10",
      iconColor: "text-purple-300",
      inputBg: "bg-white/10 border-white/20 text-white placeholder-purple-200/60",
      button: "bg-white text-purple-950 hover:bg-purple-50",
      title: "text-3xl sm:text-4xl font-extrabold",
      subtitle: "text-purple-200",
      successBg: "bg-white/10 border-white/20 text-purple-200"
    },
    minimal: {
      container: "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      inputBg: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500",
      button: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl",
      title: "text-2xl sm:text-3xl font-bold",
      subtitle: "text-gray-600 dark:text-gray-400",
      successBg: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300"
    },
    "dark-elegant": {
      container: "bg-black text-white",
      iconBg: "bg-white/5",
      iconColor: "text-white/70",
      inputBg: "bg-white/5 border-white/10 text-white placeholder-white/40",
      button: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-xl hover:shadow-purple-500/30",
      title: "text-3xl sm:text-4xl font-light",
      subtitle: "text-white/60",
      successBg: "bg-white/5 border-white/10 text-white/80"
    },
    "luxury": {
      container: "bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-900 dark:text-white border-y border-amber-200 dark:border-gray-800",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
      inputBg: "bg-white dark:bg-gray-800 border-amber-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500",
      button: "bg-amber-600 hover:bg-amber-700 text-white hover:shadow-xl",
      title: "text-3xl sm:text-4xl font-serif",
      subtitle: "text-amber-700 dark:text-amber-300",
      successBg: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300"
    },
    "footer": {
      container: "bg-transparent text-gray-900 dark:text-white",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      inputBg: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500",
      button: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl",
      title: "text-xl font-bold",
      subtitle: "text-gray-600 dark:text-gray-400",
      successBg: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300"
    }
  };

  const config = variants[variant] || variants.default;

  // Features for enhanced version
  const features = [
    { icon: Gift, label: "15% Off First Order" },
    { icon: Sparkles, label: "VIP Early Access" },
    { icon: Star, label: "Exclusive Collections" },
    { icon: Crown, label: "Member Only Events" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic email validation
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onSubscribe) {
        await onSubscribe(email);
      }
      
      setIsSubscribed(true);
      setEmail("");
      setError("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      className={`
        py-12 md:py-16 lg:py-20 
        relative overflow-hidden 
        ${config.container}
        ${className}
      `}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        {variant === "luxury" && (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.02)_100%)]" />
          </>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Icon */}
        {showIcon && (
          <div className={`
            w-14 h-14 ${config.iconBg} 
            backdrop-blur-md rounded-2xl 
            flex items-center justify-center 
            mx-auto mb-6
            transition-transform duration-300 hover:scale-110
          `}>
            {variant === "luxury" ? (
              <Crown className={`w-7 h-7 ${config.iconColor}`} />
            ) : variant === "dark-elegant" ? (
              <Zap className={`w-7 h-7 ${config.iconColor}`} />
            ) : (
              <Mail className={`w-7 h-7 ${config.iconColor}`} />
            )}
          </div>
        )}

        {/* Title */}
        <h2 className={`
          ${config.title}
          tracking-tight
        `}>
          {title}
        </h2>

        {/* Subtitle */}
        <p className={`
          ${config.subtitle}
          mt-3 text-base max-w-lg mx-auto
          leading-relaxed
        `}>
          {subtitle}
        </p>

        {/* Features */}
        {showFeatures && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 max-w-2xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center gap-2 text-xs justify-center">
                  <div className={`p-1.5 ${config.iconBg} rounded-lg`}>
                    <Icon className={`w-3.5 h-3.5 ${config.iconColor}`} />
                  </div>
                  <span className={config.subtitle}>
                    {feature.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Form */}
        {isSubscribed ? (
          <div className={`
            mt-8 p-4 backdrop-blur-md border rounded-2xl 
            max-w-md mx-auto flex items-center justify-center gap-2
            ${config.successBg}
            animate-fadeIn
          `}>
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  required
                  className={`
                    w-full px-5 py-3.5 
                    backdrop-blur-md border rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-purple-400 
                    text-sm transition-all duration-300
                    ${config.inputBg}
                    ${error ? 'border-red-500 ring-2 ring-red-500' : ''}
                  `}
                />
                {error && (
                  <p className="text-xs text-red-500 mt-1 text-left">
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  px-6 py-3.5 font-bold rounded-xl 
                  transition-all duration-200 shadow-lg 
                  text-sm flex items-center justify-center gap-2
                  ${config.button}
                  disabled:opacity-70 disabled:cursor-not-allowed
                  hover:scale-[1.02]
                `}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {buttonText}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Trust Badge */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs opacity-60">
          <Shield className="w-3.5 h-3.5" />
          <span className={config.subtitle}>
            No spam, unsubscribe anytime
          </span>
        </div>
      </div>
    </section>
  );
};

// Sub-component for inline newsletter (for footer)
export const NewsletterInline = ({ variant = "footer", className = "" }) => {
  return (
    <Newsletter 
      variant={variant}
      title="Subscribe to Our Newsletter"
      subtitle="Get 15% off your first order and exclusive offers"
      buttonText="Subscribe"
      showIcon={false}
      className={className}
    />
  );
};

// Sub-component for popup/modal style
export const NewsletterPopup = ({ onClose, className = "" }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-8 shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
        >
          ✕
        </button>
        <Newsletter 
          variant="minimal"
          title="Join the RITHY STORE VIP Club"
          subtitle="Get 15% off your first order and exclusive access to new collections"
          className="!py-4"
        />
      </div>
    </div>
  );
};

export default Newsletter;