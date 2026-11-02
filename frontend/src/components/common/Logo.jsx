import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ 
  className = "", 
  variant = "full", // "full" | "icon" | "image-only"
  isTransparent = false,
  to = "/" 
}) => {
  const content = (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* RITHY STORE Logo Image */}
      {variant === "image-only" ? (
        <img
          src="/images/rithy-store-logo.png"
          alt="RITHY STORE"
          className="h-10 sm:h-12 w-auto object-contain mix-blend-multiply dark:invert dark:mix-blend-screen transition-transform duration-300 group-hover:scale-105"
          loading="eager"
        />
      ) : (
        <>
          <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 p-1 shadow-xs transition-transform duration-300 group-hover:scale-105">
            <img
              src="/images/rithy-store-logo.png"
              alt="RITHY STORE Emblem"
              className="h-9 w-9 sm:h-10 sm:w-10 object-contain dark:invert"
              loading="eager"
            />
          </div>

          {variant !== "icon" && (
            <div className="flex flex-col text-left">
              <span
                className={`font-serif tracking-[0.22em] text-lg sm:text-xl font-bold uppercase transition-colors leading-none ${
                  isTransparent
                    ? "text-white group-hover:text-amber-200"
                    : "text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400"
                }`}
              >
                RITHY
              </span>
              <span
                className={`tracking-[0.38em] text-[9px] sm:text-[10px] font-semibold uppercase mt-0.5 transition-colors ${
                  isTransparent
                    ? "text-neutral-300"
                    : "text-neutral-500 dark:text-neutral-400"
                }`}
              >
                STORE
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );

  if (!to) return content;

  return (
    <Link to={to} className="flex items-center" aria-label="RITHY STORE Home">
      {content}
    </Link>
  );
};

export default Logo;
