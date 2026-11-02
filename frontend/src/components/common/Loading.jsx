import React from "react";

const Loading = ({
  type = "spinner",
  size = "md",
  color = "purple",
  text = "Loading...",
  fullScreen = false,
  className = ""
}) => {
  // Size mapping
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  // Color mappings (explicit classes for Tailwind CSS compatibility)
  const borderColors = {
    purple: "border-purple-500",
    blue: "border-blue-500",
    pink: "border-pink-500",
    white: "border-white",
    gray: "border-gray-400"
  };

  const bgColors = {
    purple: "bg-purple-200 dark:bg-purple-900/40",
    blue: "bg-blue-200 dark:bg-blue-900/40",
    pink: "bg-pink-200 dark:bg-pink-900/40",
    white: "bg-white/40",
    gray: "bg-gray-200 dark:bg-gray-800"
  };

  const dotBgColors = {
    purple: "bg-purple-600 dark:bg-purple-400",
    blue: "bg-blue-600 dark:bg-blue-400",
    pink: "bg-pink-600 dark:bg-pink-400",
    white: "bg-white",
    gray: "bg-gray-600 dark:bg-gray-400"
  };

  const textColors = {
    purple: "text-purple-600 dark:text-purple-400",
    blue: "text-blue-600 dark:text-blue-400",
    pink: "text-pink-600 dark:text-pink-400",
    white: "text-white",
    gray: "text-gray-600 dark:text-gray-400"
  };

  const currentSize = sizes[size] || sizes.md;
  const currentBorder = borderColors[color] || borderColors.purple;
  const currentBg = bgColors[color] || bgColors.gray;
  const currentDotBg = dotBgColors[color] || dotBgColors.purple;
  const currentText = textColors[color] || textColors.purple;

  // Spinner Component
  const Spinner = () => (
    <div
      className={`${currentSize} border-4 border-t-transparent ${currentBorder} rounded-full animate-spin`}
    />
  );

  // Dots Component
  const Dots = () => (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((dot) => (
        <div
          key={dot}
          className={`${currentDotBg} rounded-full animate-bounce`}
          style={{
            animationDelay: `${dot * 0.15}s`,
            width: size === "sm" ? "8px" : size === "md" ? "12px" : "16px",
            height: size === "sm" ? "8px" : size === "md" ? "12px" : "16px"
          }}
        />
      ))}
    </div>
  );

  // Skeleton Component
  const Skeleton = () => (
    <div className="space-y-4 w-full max-w-md">
      <div className={`h-4 ${currentBg} rounded-lg animate-pulse`} style={{ width: "100%" }} />
      <div className={`h-4 ${currentBg} rounded-lg animate-pulse`} style={{ width: "80%" }} />
      <div className={`h-4 ${currentBg} rounded-lg animate-pulse`} style={{ width: "60%" }} />
    </div>
  );

  // Skeleton Card
  const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className={`aspect-[4/5] ${currentBg} rounded-xl animate-pulse`} />
      <div className="mt-4 space-y-2.5">
        <div className={`h-3 ${currentBg} rounded animate-pulse`} style={{ width: "70%" }} />
        <div className={`h-4 ${currentBg} rounded animate-pulse`} style={{ width: "50%" }} />
        <div className={`h-3 ${currentBg} rounded animate-pulse`} style={{ width: "40%" }} />
      </div>
    </div>
  );

  // Skeleton Grid
  const SkeletonGrid = ({ columns = 4 }) => (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-6 w-full`}>
      {[...Array(columns * 2)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );

  const renderLoader = () => {
    switch (type) {
      case "spinner":
        return <Spinner />;
      case "dots":
        return <Dots />;
      case "skeleton":
        return <Skeleton />;
      case "skeleton-grid":
        return <SkeletonGrid />;
      default:
        return <Spinner />;
    }
  };

  const content = (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      {renderLoader()}
      {text && (
        <p className={`mt-4 ${currentText} font-medium text-sm tracking-wide`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;