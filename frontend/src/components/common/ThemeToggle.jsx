import React from "react";

/**
 * Luxury Celestial Sun & Moon Icons with custom gradients and ambient glow
 */
export const CelestialSun = ({ className = "w-4 h-4", glow = true }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={`transition-transform duration-500 ${className}`}
  >
    <defs>
      <linearGradient id="sunGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <radialGradient id="sunAura" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
      </radialGradient>
    </defs>
    {glow && <circle cx="12" cy="12" r="11" fill="url(#sunAura)" />}
    <circle cx="12" cy="12" r="5" fill="url(#sunGold)" />
    {/* Solar Rays */}
    <g stroke="url(#sunGold)" strokeWidth="1.8" strokeLinecap="round">
      <line x1="12" y1="2" x2="12" y2="4.5" />
      <line x1="12" y1="19.5" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4.5" y2="12" />
      <line x1="19.5" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="6.7" y2="6.7" />
      <line x1="17.3" y1="17.3" x2="19.07" y2="19.07" />
      <line x1="4.93" y1="19.07" x2="6.7" y2="17.3" />
      <line x1="17.3" y1="6.7" x2="19.07" y2="4.93" />
    </g>
  </svg>
);

export const CelestialMoon = ({ className = "w-4 h-4", glow = true }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={`transition-transform duration-500 ${className}`}
  >
    <defs>
      <linearGradient id="moonGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF3D6" />
        <stop offset="45%" stopColor="#E2C488" />
        <stop offset="100%" stopColor="#B38D4A" />
      </linearGradient>
      <radialGradient id="moonAura" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#E2C488" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#E2C488" stopOpacity="0" />
      </radialGradient>
    </defs>
    {glow && <circle cx="12" cy="12" r="11" fill="url(#moonAura)" />}
    {/* Crescent Moon */}
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
      fill="url(#moonGold)"
    />
    {/* Twinkling Star 1 */}
    <path
      d="M17.5 4.5 L18 6 L19.5 6.5 L18 7 L17.5 8.5 L17 7 L15.5 6.5 L17 6 Z"
      fill="#FFF7E0"
      className="animate-pulse"
    />
    {/* Twinkling Star 2 */}
    <circle cx="19.5" cy="10.5" r="0.75" fill="#FFE8B2" opacity="0.8" />
  </svg>
);

/**
 * High-End Theme Toggle Component with multiple luxury presentation variants
 */
const ThemeToggle = ({
  isDarkMode,
  onToggle,
  variant = "compact", // "compact" | "pill" | "segmented"
  className = "",
  showTooltip = true
}) => {
  // 1. Compact Navbar Jewel Button
  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-label={isDarkMode ? "Switch to daylight mode" : "Switch to midnight mode"}
        title={showTooltip ? (isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode") : undefined}
        className={`group relative p-2 sm:p-2.5 rounded-full transition-all duration-300 cursor-pointer overflow-hidden ${
          isDarkMode
            ? "bg-neutral-900/80 hover:bg-neutral-800 border border-[#c2a677]/40 shadow-[0_0_15px_rgba(194,166,119,0.2)] hover:shadow-[0_0_20px_rgba(194,166,119,0.35)] hover:border-[#c2a677]"
            : "bg-white/90 hover:bg-amber-50/70 border border-amber-300/80 shadow-[0_2px_10px_rgba(245,158,11,0.18)] hover:shadow-[0_4px_16px_rgba(245,158,11,0.28)] hover:border-amber-400"
        } ${className}`}
      >
        {/* Subtle Ambient Halo */}
        <span
          className={`absolute inset-0 rounded-full transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${
            isDarkMode
              ? "bg-gradient-to-r from-[#c2a677]/10 to-amber-500/10"
              : "bg-gradient-to-r from-amber-400/15 to-orange-400/15"
          }`}
        />

        <div className="relative z-10 flex items-center justify-center w-5 h-5 sm:w-5.5 sm:h-5.5">
          {isDarkMode ? (
            <div className="transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
              <CelestialSun className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          ) : (
            <div className="transform transition-all duration-500 group-hover:-rotate-12 group-hover:scale-110">
              <CelestialMoon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          )}
        </div>
      </button>
    );
  }

  // 2. Luxury Sliding Pill Toggle
  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-label="Toggle light or dark theme"
        className={`relative inline-flex items-center w-16 h-8 rounded-full p-1 transition-all duration-300 cursor-pointer border ${
          isDarkMode
            ? "bg-neutral-900 border-[#c2a677]/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
            : "bg-stone-200 border-amber-300/70 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
        } ${className}`}
      >
        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
          <CelestialSun className="w-3.5 h-3.5 opacity-60" glow={false} />
          <CelestialMoon className="w-3.5 h-3.5 opacity-60" glow={false} />
        </div>

        {/* Sliding Thumb */}
        <span
          className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ease-out shadow-md ${
            isDarkMode
              ? "translate-x-8 bg-gradient-to-br from-[#c2a677] to-[#8d6f34] text-neutral-950 shadow-[0_0_10px_rgba(194,166,119,0.5)]"
              : "translate-x-0 bg-gradient-to-br from-amber-400 to-orange-400 text-white shadow-[0_0_10px_rgba(245,158,11,0.5)]"
          }`}
        >
          {isDarkMode ? (
            <CelestialMoon className="w-3.5 h-3.5 text-neutral-950" glow={false} />
          ) : (
            <CelestialSun className="w-3.5 h-3.5 text-white" glow={false} />
          )}
        </span>
      </button>
    );
  }

  // 3. Segmented Switch for Drawer / Settings Modal
  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 ${className}`}
    >
      <button
        type="button"
        onClick={() => isDarkMode && onToggle()}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
          !isDarkMode
            ? "bg-white text-neutral-950 shadow-md border border-amber-300/60"
            : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white"
        }`}
      >
        <CelestialSun className="w-3.5 h-3.5" glow={false} />
        <span>LIGHT</span>
      </button>

      <button
        type="button"
        onClick={() => !isDarkMode && onToggle()}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
          isDarkMode
            ? "bg-gradient-to-r from-[#c2a677] to-[#9a783e] text-neutral-950 shadow-md font-bold"
            : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white"
        }`}
      >
        <CelestialMoon className="w-3.5 h-3.5" glow={false} />
        <span>DARK</span>
      </button>
    </div>
  );
};

export default ThemeToggle;
