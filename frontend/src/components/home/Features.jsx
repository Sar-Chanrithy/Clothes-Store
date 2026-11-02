import React from "react";
import { 
  Truck, 
  RefreshCw, 
  Shield, 
  Award, 
  CreditCard,
  Headphones,
  Gift,
  Sparkles,
  Clock,
  Package,
  Leaf,
  Star
} from "lucide-react";

const Features = ({ 
  variant = "default", 
  columns = 4,
  showBorder = true,
  className = "",
  featureSize = "md"
}) => {
  // Feature configurations
  const featureSets = {
    default: [
      {
        id: 1,
        icon: Truck,
        title: "Complimentary Global Delivery",
        description: "Free express shipping on all orders over $150 with insured signature tracking",
        badge: "Free",
        color: "purple"
      },
      {
        id: 2,
        icon: RefreshCw,
        title: "Hassle-Free Returns",
        description: "Enjoy 30 days of seamless, complimentary exchanges and full returns",
        badge: "30 Days",
        color: "blue"
      },
      {
        id: 3,
        icon: Shield,
        title: "Guaranteed Authentic",
        description: "Each garment is certified with authentic provenance and luxury materials",
        badge: "Certified",
        color: "green"
      },
      {
        id: 4,
        icon: Award,
        title: "Artisanal Craftsmanship",
        description: "Tailored by seasoned European artisans with premium fine stitching",
        badge: "Premium",
        color: "pink"
      }
    ],
    extended: [
      {
        id: 1,
        icon: Truck,
        title: "Complimentary Global Delivery",
        description: "Free express shipping on all orders over $150 with insured signature tracking",
        badge: "Free",
        color: "purple"
      },
      {
        id: 2,
        icon: RefreshCw,
        title: "Hassle-Free Returns",
        description: "Enjoy 30 days of seamless, complimentary exchanges and full returns",
        badge: "30 Days",
        color: "blue"
      },
      {
        id: 3,
        icon: Shield,
        title: "Guaranteed Authentic",
        description: "Each garment is certified with authentic provenance and luxury materials",
        badge: "Certified",
        color: "green"
      },
      {
        id: 4,
        icon: Award,
        title: "Artisanal Craftsmanship",
        description: "Tailored by seasoned European artisans with premium fine stitching",
        badge: "Premium",
        color: "pink"
      },
      {
        id: 5,
        icon: CreditCard,
        title: "Secure Payment",
        description: "Multiple payment options with advanced encryption and fraud protection",
        badge: "Secure",
        color: "indigo"
      },
      {
        id: 6,
        icon: Headphones,
        title: "24/7 Concierge Support",
        description: "Dedicated fashion consultants available around the clock for personalized assistance",
        badge: "Live Chat",
        color: "orange"
      },
      {
        id: 7,
        icon: Gift,
        title: "Luxury Gift Packaging",
        description: "Every order arrives in signature branded packaging with a personalized note",
        badge: "Complimentary",
        color: "red"
      },
      {
        id: 8,
        icon: Clock,
        title: "Express Processing",
        description: "Orders are processed and dispatched within 24 hours of confirmation",
        badge: "Fast",
        color: "teal"
      }
    ],
    minimal: [
      {
        id: 1,
        icon: Package,
        title: "Free Shipping",
        description: "On orders over $150",
        color: "purple"
      },
      {
        id: 2,
        icon: RefreshCw,
        title: "Easy Returns",
        description: "30-day return policy",
        color: "blue"
      },
      {
        id: 3,
        icon: Shield,
        title: "Secure Payment",
        description: "100% protected",
        color: "green"
      },
      {
        id: 4,
        icon: Award,
        title: "Premium Quality",
        description: "Guaranteed satisfaction",
        color: "pink"
      }
    ],
    "eco-friendly": [
      {
        id: 1,
        icon: Leaf,
        title: "Sustainable Materials",
        description: "Crafted from eco-friendly, ethically sourced fabrics and materials",
        badge: "Eco-Certified",
        color: "green"
      },
      {
        id: 2,
        icon: Package,
        title: "Zero-Waste Packaging",
        description: "100% recyclable packaging with minimal environmental footprint",
        badge: "Recyclable",
        color: "teal"
      },
      {
        id: 3,
        icon: Award,
        title: "Ethical Production",
        description: "Fair trade certified manufacturing with transparent supply chains",
        badge: "Fair Trade",
        color: "purple"
      },
      {
        id: 4,
        icon: Star,
        title: "Carbon-Neutral",
        description: "Offsetting carbon emissions through verified environmental projects",
        badge: "Carbon-Neutral",
        color: "blue"
      }
    ]
  };

  // Color mapping for badges and icons
  const colorMap = {
    purple: {
      bg: "bg-purple-100 dark:bg-purple-950/60",
      text: "text-purple-600 dark:text-purple-400",
      badge: "bg-purple-600",
      hover: "hover:bg-purple-50 dark:hover:bg-purple-950/40"
    },
    blue: {
      bg: "bg-blue-100 dark:bg-blue-950/60",
      text: "text-blue-600 dark:text-blue-400",
      badge: "bg-blue-600",
      hover: "hover:bg-blue-50 dark:hover:bg-blue-950/40"
    },
    green: {
      bg: "bg-green-100 dark:bg-green-950/60",
      text: "text-green-600 dark:text-green-400",
      badge: "bg-green-600",
      hover: "hover:bg-green-50 dark:hover:bg-green-950/40"
    },
    pink: {
      bg: "bg-pink-100 dark:bg-pink-950/60",
      text: "text-pink-600 dark:text-pink-400",
      badge: "bg-pink-600",
      hover: "hover:bg-pink-50 dark:hover:bg-pink-950/40"
    },
    indigo: {
      bg: "bg-indigo-100 dark:bg-indigo-950/60",
      text: "text-indigo-600 dark:text-indigo-400",
      badge: "bg-indigo-600",
      hover: "hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
    },
    orange: {
      bg: "bg-orange-100 dark:bg-orange-950/60",
      text: "text-orange-600 dark:text-orange-400",
      badge: "bg-orange-600",
      hover: "hover:bg-orange-50 dark:hover:bg-orange-950/40"
    },
    red: {
      bg: "bg-red-100 dark:bg-red-950/60",
      text: "text-red-600 dark:text-red-400",
      badge: "bg-red-600",
      hover: "hover:bg-red-50 dark:hover:bg-red-950/40"
    },
    teal: {
      bg: "bg-teal-100 dark:bg-teal-950/60",
      text: "text-teal-600 dark:text-teal-400",
      badge: "bg-teal-600",
      hover: "hover:bg-teal-50 dark:hover:bg-teal-950/40"
    }
  };

  // Size configurations
  const sizeMap = {
    sm: {
      icon: "w-5 h-5",
      title: "text-sm",
      description: "text-xs",
      padding: "p-2",
      gap: "gap-3"
    },
    md: {
      icon: "w-6 h-6",
      title: "text-base",
      description: "text-sm",
      padding: "p-3",
      gap: "gap-4"
    },
    lg: {
      icon: "w-8 h-8",
      title: "text-lg",
      description: "text-base",
      padding: "p-4",
      gap: "gap-5"
    }
  };

  const features = featureSets[variant] || featureSets.default;
  const sizes = sizeMap[featureSize] || sizeMap.md;

  return (
    <section 
      className={`py-12 md:py-16 bg-white dark:bg-gray-900 ${
        showBorder ? "border-y border-gray-100 dark:border-gray-800" : ""
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Optional Header */}
        {(variant === "extended" || variant === "eco-friendly") && (
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-semibold mb-3">
              Why Choose VELORA
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              The VELORA <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Difference</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
              Experience luxury fashion redefined with our commitment to excellence
            </p>
          </div>
        )}

        <div 
          className={`
            grid gap-6 
            ${columns === 2 ? "grid-cols-1 sm:grid-cols-2" : ""}
            ${columns === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : ""}
            ${columns === 4 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : ""}
            ${columns === 5 ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" : ""}
            ${columns === 6 ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6" : ""}
          `}
        >
          {features.map((item) => {
            const Icon = item.icon;
            const colors = colorMap[item.color] || colorMap.purple;

            return (
              <div
                key={item.id}
                className={`
                  group flex ${sizes.gap} p-4 rounded-2xl 
                  transition-all duration-300 
                  ${colors.hover}
                  hover:shadow-lg hover:shadow-purple-500/5
                  ${variant === "minimal" ? "items-center" : "items-start"}
                `}
              >
                {/* Icon Container */}
                <div 
                  className={`
                    ${sizes.padding} ${colors.bg} ${colors.text} 
                    rounded-2xl flex-shrink-0 transition-all duration-300
                    group-hover:scale-110 group-hover:rotate-3
                  `}
                >
                  <Icon className={sizes.icon} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className={`
                      font-bold text-gray-900 dark:text-white 
                      ${sizes.title}
                    `}>
                      {item.title}
                    </h4>
                    
                    {/* Badge */}
                    {item.badge && (
                      <span className={`
                        inline-flex items-center px-2 py-0.5 
                        ${colors.badge} text-white 
                        text-[10px] font-bold rounded-full
                        animate-pulse
                      `}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  
                  <p className={`
                    text-gray-500 dark:text-gray-400 
                    ${sizes.description}
                    mt-1 leading-relaxed
                  `}>
                    {item.description}
                  </p>

                  {/* Optional CTA link for extended features */}
                  {variant === "extended" && (
                    <button className="mt-2 text-xs font-medium text-purple-600 dark:text-purple-400 hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note for default variant */}
        {variant === "default" && (
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              All features are included with every purchase
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// Sub-components for more flexibility
export const FeatureItem = ({ icon: Icon, title, description, badge, color = "purple" }) => {
  const colors = {
    purple: "bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400",
    blue: "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400",
    green: "bg-green-100 dark:bg-green-950/60 text-green-600 dark:text-green-400",
    pink: "bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400",
  };

  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className={`p-3 rounded-2xl flex-shrink-0 ${colors[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white text-base">
          {title}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Features;