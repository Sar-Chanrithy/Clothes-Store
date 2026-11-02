import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Predefined Demo Accounts
export const DEMO_USER = {
  id: "usr-001",
  name: "Rithy Sar",
  email: "user@rithystore.com",
  role: "Customer",
  phone: "+855 12 345 678",
  joinedDate: "January 2024",
  address: {
    street: "Street 271, Sangkat Boeung Tumpun",
    city: "Phnom Penh",
    province: "Phnom Penh",
    country: "Cambodia"
  },
  bio: "Fashion enthusiast curating timeless luxury essentials.",
  avatar: null
};

export const DEMO_ADMIN = {
  id: "adm-001",
  name: "Admin Rithy",
  email: "admin@rithystore.com",
  role: "Admin",
  phone: "+855 98 765 432",
  joinedDate: "October 2023",
  address: {
    street: "Preah Monivong Blvd, Sangkat Wat Phnom",
    city: "Phnom Penh",
    province: "Phnom Penh",
    country: "Cambodia"
  },
  bio: "Lead Store Administrator & Curator at RITHY STORE.",
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
      return DEMO_USER; // Default initial user
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

    const cleanEmail = email.trim().toLowerCase();

    // 1. Check Predefined Admin Account
    if (
      cleanEmail === "admin@rithystore.com" ||
      cleanEmail === "admin@gmail.com" ||
      cleanEmail === "admin"
    ) {
      if (password !== "admin123" && password !== "123456") {
        return { success: false, error: "Incorrect admin password. (Password is: admin123)" };
      }
      setUser(DEMO_ADMIN);
      closeAuthModal();
      return { success: true, user: DEMO_ADMIN };
    }

    // 2. Check Predefined Customer / User Account
    if (
      cleanEmail === "user@rithystore.com" ||
      cleanEmail === "rithysar78@gmail.com" ||
      cleanEmail === "user@gmail.com" ||
      cleanEmail === "john@example.com" ||
      cleanEmail === "user"
    ) {
      if (password !== "user123" && password !== "password123" && password !== "123456") {
        return { success: false, error: "Incorrect user password. (Password is: user123)" };
      }
      setUser(DEMO_USER);
      closeAuthModal();
      return { success: true, user: DEMO_USER };
    }

    // 3. Generic Custom User Login
    const nameFromEmail = cleanEmail.split("@")[0].replace(/[._]/g, " ");
    const formattedName = nameFromEmail
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ") || "Valued Customer";

    const loggedInUser = {
      id: "usr-" + Date.now().toString(36),
      name: formattedName,
      email: cleanEmail,
      role: "Customer",
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
      role: "Customer",
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

  const updateProfile = (updatedData) => {
    setUser((prev) => {
      const merged = { ...prev, ...updatedData };
      localStorage.setItem("velora_auth_user", JSON.stringify(merged));
      return merged;
    });
  };

  const switchAccount = (role = "user") => {
    if (role === "admin") {
      setUser(DEMO_ADMIN);
      return DEMO_ADMIN;
    } else {
      setUser(DEMO_USER);
      return DEMO_USER;
    }
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
    isAdmin: user?.role === "Admin",
    login,
    register,
    logout,
    updateProfile,
    switchAccount,
    openAuthModal,
    closeAuthModal,
    isAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    getInitials,
    DEMO_USER,
    DEMO_ADMIN
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
