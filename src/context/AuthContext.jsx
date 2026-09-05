import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Default demo user
const DEMO_USER = {
  id: "usr-001",
  name: "John Doe",
  email: "john@example.com",
  role: "Customer",
  joinedDate: "January 2024",
  avatar: null
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("velora_auth_user");
      if (savedUser) {
        try {
          return JSON.parse(savedUser);
        } catch (e) {
          return DEMO_USER;
        }
      }
      return DEMO_USER; // Default to John Doe initially as shown in user's screenshot
    }
    return DEMO_USER;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login"); // "login" | "register"

  useEffect(() => {
    if (user) {
      localStorage.setItem("velora_auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("velora_auth_user");
    }
  }, [user]);

  const openAuthModal = (mode = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email, password) => {
    if (!email || !password) {
      return { success: false, error: "Please enter both email and password." };
    }

    // Realistic authentication logic with demo support
    const nameFromEmail = email.split("@")[0].replace(/[._]/g, " ");
    const formattedName = nameFromEmail
      .split(" ")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ") || "Valued Customer";

    const loggedInUser = {
      id: "usr-" + Date.now().toString(36),
      name: email.toLowerCase() === "john@example.com" ? "John Doe" : formattedName,
      email: email.trim().toLowerCase(),
      role: "Member",
      joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      avatar: null
    };

    setUser(loggedInUser);
    closeAuthModal();
    return { success: true, user: loggedInUser };
  };

  const register = (name, email, password) => {
    if (!name || !email || !password) {
      return { success: false, error: "All fields are required." };
    }

    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters." };
    }

    const newUser = {
      id: "usr-" + Date.now().toString(36),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: "Member",
      joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      avatar: null
    };

    setUser(newUser);
    closeAuthModal();
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("velora_auth_user");
  };

  const getInitials = (nameStr) => {
    if (!nameStr) return "U";
    const parts = nameStr.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    openAuthModal,
    closeAuthModal,
    isAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    getInitials,
    DEMO_USER
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
