import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const AuthModal = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    login,
    register,
    DEMO_USER,
    DEMO_ADMIN
  } = useAuth();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    setTimeout(() => {
      if (authModalMode === "login") {
        const result = login(email, password);
        if (result.success) {
          setSuccessMessage("Welcome back! Signed in successfully.");
          setTimeout(() => {
            closeAuthModal();
            setEmail("");
            setPassword("");
          }, 800);
        } else {
          setError(result.error || "Failed to sign in. Check your credentials.");
        }
      } else {
        const result = register(name, email, password);
        if (result.success) {
          setSuccessMessage("Account created successfully! Welcome to RITHY STORE.");
          setTimeout(() => {
            closeAuthModal();
            setName("");
            setEmail("");
            setPassword("");
          }, 800);
        } else {
          setError(result.error || "Failed to register.");
        }
      }
      setIsLoading(false);
    }, 500);
  };

  const handleQuickLogin = (type = "user") => {
    const target = type === "admin" ? DEMO_ADMIN : DEMO_USER;
    const pwd = type === "admin" ? "admin123" : "user123";

    setEmail(target.email);
    setPassword(pwd);
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      login(target.email, pwd);
      setSuccessMessage(`Logged in as ${type === "admin" ? "Store Administrator" : "Customer (Rithy Sar)"}!`);
      setIsLoading(false);
      setTimeout(() => {
        closeAuthModal();
      }, 700);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Modal Card */}
      <div
        className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Background Gradient Bar */}
        <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 w-full" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close auth dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Brand & Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md mb-3">
              <img src="/images/rithy-store-logo.png" alt="RITHY STORE" className="w-12 h-12 object-contain dark:invert" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {authModalMode === "login" ? "Welcome to RITHY STORE" : "Create an Account"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {authModalMode === "login"
                ? "Enter your credentials to access your account"
                : "Join RITHY STORE today for member perks & fast delivery"}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => {
                setAuthModalMode("login");
                setError("");
              }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                authModalMode === "login"
                  ? "bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthModalMode("register");
                setError("");
              }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                authModalMode === "register"
                  ? "bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Register
            </button>
          </div>

          {/* Error & Success Feedback */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authModalMode === "register" && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Password
                </label>
                {authModalMode === "login" && (
                  <button
                    type="button"
                    onClick={() => alert("Password reset link sent to your email demo!")}
                    className="text-xs text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {authModalMode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Accounts Selection */}
          <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2.5 text-center">
              Quick 1-Click Access
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLogin("user")}
                className="py-2.5 px-3 bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200 font-medium text-xs rounded-xl transition-all border border-stone-200 dark:border-white/10 flex flex-col items-center justify-center text-center cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-white">
                  <User className="w-3.5 h-3.5 text-[#a8894d] dark:text-[#c2a677]" />
                  <span>Customer</span>
                </div>
                <span className="text-[10px] text-neutral-400 mt-0.5 truncate">user@rithystore.com</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("admin")}
                className="py-2.5 px-3 bg-gradient-to-r from-amber-500/10 to-purple-500/10 hover:from-amber-500/20 hover:to-purple-500/20 text-neutral-900 dark:text-white font-medium text-xs rounded-xl transition-all border border-[#c2a677]/40 dark:border-[#c2a677]/40 flex flex-col items-center justify-center text-center cursor-pointer group shadow-xs"
              >
                <div className="flex items-center gap-1.5 font-bold text-[#9a783e] dark:text-[#c2a677]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Store Admin</span>
                </div>
                <span className="text-[10px] text-neutral-400 mt-0.5 truncate">admin@rithystore.com</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
