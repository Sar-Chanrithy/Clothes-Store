import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login, DEMO_USER, DEMO_ADMIN } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        setSuccessMessage("Welcome back! Redirecting...");
        setTimeout(() => {
          navigate(result.user?.role === "Admin" ? "/admin" : "/");
        }, 800);
      } else {
        setError(result.error || "Invalid email or password.");
      }
      setIsLoading(false);
    }, 500);
  };

  const handleQuickLogin = (type = "user") => {
    const target = type === "admin" ? DEMO_ADMIN : DEMO_USER;
    const pwd = type === "admin" ? "admin123" : "user123";

    setEmail(target.email);
    setPassword(pwd);
    setIsLoading(true);

    setTimeout(() => {
      login(target.email, pwd);
      setSuccessMessage(`Logged in as ${type === "admin" ? "Store Administrator" : "Customer (Rithy Sar)"}!`);
      setIsLoading(false);
      setTimeout(() => {
        navigate(type === "admin" ? "/admin" : "/");
      }, 700);
    }, 400);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-8 relative overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 absolute top-0 left-0 right-0" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl shadow-purple-500/30 mb-4">
            <Sparkles className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sign In</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Access your curated fashion wardrobe and personalized recommendations.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => alert("Password reset link sent to demo email!")}
                className="text-xs text-purple-600 dark:text-purple-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-3 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-800 space-y-3">
          <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
            Instant One-Click Demo Access
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickLogin("user")}
              className="py-2.5 px-3 bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200 font-medium text-xs rounded-xl transition-all border border-stone-200 dark:border-white/10 flex flex-col items-center justify-center text-center cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-white">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Customer</span>
              </div>
              <span className="text-[10px] text-neutral-400 mt-0.5 truncate">user@rithystore.com</span>
              <span className="text-[9px] text-neutral-400">Pass: user123</span>
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
              <span className="text-[9px] text-neutral-400">Pass: admin123</span>
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            Don't have an account yet?{" "}
            <Link to="/register" className="font-semibold text-purple-600 dark:text-purple-400 hover:underline">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
