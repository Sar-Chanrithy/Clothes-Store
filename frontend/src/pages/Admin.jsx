import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  products as globalProducts,
  saveProductToCatalog,
  deleteProductFromCatalog,
  resetProductsCatalog,
  formatKHR
} from "../data/products";
import {
  ShieldCheck,
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  Truck,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  LogOut,
  RefreshCw,
  Sparkles,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  Download,
  SlidersHorizontal,
  Layers,
  Tag,
  ExternalLink,
  AlertTriangle,
  Image as ImageIcon
} from "lucide-react";

// Predefined demo orders with realistic Cambodian customer data
const INITIAL_ORDERS = [
  {
    id: "ORD-8492",
    customer: "Sokha Mean",
    phone: "+855 12 889 012",
    province: "Phnom Penh",
    items: "Italian Virgin Wool Suit (Navy, 40R)",
    totalUSD: 85.00,
    paymentMethod: "ABA Pay",
    status: "Delivered",
    date: "Today, 2:15 PM"
  },
  {
    id: "ORD-8491",
    customer: "Dara Chan",
    phone: "+855 98 443 219",
    province: "Siem Reap",
    items: "Linen Long Sleeve Shirt + Leather Belt",
    totalUSD: 23.00,
    paymentMethod: "Wing",
    status: "In Transit",
    date: "Today, 11:30 AM"
  },
  {
    id: "ORD-8490",
    customer: "Bopha Pich",
    phone: "+855 77 125 678",
    province: "Battambang",
    items: "Cashmere Knit Sweater (Camel, M)",
    totalUSD: 42.00,
    paymentMethod: "Cash on Delivery",
    status: "Processing",
    date: "Yesterday"
  },
  {
    id: "ORD-8489",
    customer: "Vannak Sam",
    phone: "+855 16 990 321",
    province: "Sihanoukville",
    items: "Classic Tailored Blazer (Charcoal, 38R)",
    totalUSD: 65.00,
    paymentMethod: "ABA Pay",
    status: "Delivered",
    date: "Yesterday"
  },
  {
    id: "ORD-8488",
    customer: "Kanika Ouk",
    phone: "+855 89 332 110",
    province: "Kampot",
    items: "Silk Evening Dress + Silk Pocket Square",
    totalUSD: 51.50,
    paymentMethod: "ABA Pay",
    status: "Pending",
    date: "Oct 26, 2026"
  }
];

const PRESET_IMAGE_OPTIONS = [
  { label: "Heather Grey Tee (Product 107)", url: "/images/products/tee-grey-melange-crewneck.jpg" },
  { label: "The K2 Tee Front (Product 108)", url: "/images/products/the-k2-tee-front.png" },
  { label: "Oxford Sky Blue (Product 62)", url: "/images/products/shirt-sky-blue.jpg" },
  { label: "Raglan Burgundy Tee (Product 68)", url: "/images/products/tee-raglan-burgundy.png" },
  { label: "White Oxford Shirt", url: "/images/products/shirt-white-oxford.jpg" },
  { label: "Navy Blue Shirt", url: "/images/products/shirt-navy-blue.jpg" },
  { label: "Denim Trucker Jacket", url: "/images/products/jacket-denim-trucker.jpg" },
  { label: "White Pique Polo", url: "/images/products/polo-white-pique.png" },
  { label: "White Fleece Hoodie", url: "/images/products/hoodie-white-fleece.png" },
  { label: "Charcoal Melange Tee", url: "/images/products/tee-charcoal-melange.png" }
];

const STANDARD_CATEGORIES = [
  "Men's Fashion",
  "Women's Fashion",
  "Suits & Tailoring",
  "Shoes & Footwear",
  "Bags & Leather",
  "Accessories"
];

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "One Size"];
const AVAILABLE_COLORS = ["Black", "White", "Navy", "Slate Grey", "Burgundy", "Camel", "Olive", "Sky Blue", "Beige"];

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, switchAccount, logout } = useAuth();

  // Active top navigation tab
  const [activeTab, setActiveTab] = useState("products"); // "products" | "orders" | "settings"

  // Products state (CRUD)
  const [productsList, setProductsList] = useState([...globalProducts]);
  const [productSearch, setProductSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All"); // "All" | "In Stock" | "Out of Stock"
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Product Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create" | "edit"
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Form State for Create/Edit Product
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    brand: "VELORA Collection",
    sku: "",
    price: "",
    originalPrice: "",
    category: "Men's Fashion",
    subCategory: "Tops",
    badge: "",
    drop: "",
    image: "",
    inStock: true,
    stock: 25,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy"],
    description: ""
  });

  // Orders State (CRUD)
  const [orders, setOrders] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("velora_admin_orders");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return INITIAL_ORDERS;
        }
      }
    }
    return INITIAL_ORDERS;
  });
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");

  // New Order Modal
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [newOrderData, setNewOrderData] = useState({
    customer: "",
    phone: "",
    province: "Phnom Penh",
    items: "",
    totalUSD: "",
    paymentMethod: "ABA Pay",
    status: "Processing"
  });

  // Toast notifications
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Sync products when catalog changes
  useEffect(() => {
    const handleProductsUpdated = () => {
      setProductsList([...globalProducts]);
    };
    window.addEventListener("products-updated", handleProductsUpdated);
    return () => window.removeEventListener("products-updated", handleProductsUpdated);
  }, []);

  // Save orders to localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("velora_admin_orders", JSON.stringify(orders));
    }
  }, [orders]);

  // KPI Calculations
  const stats = useMemo(() => {
    const totalOrderRevenue = orders.reduce((sum, o) => sum + (Number(o.totalUSD) || 0), 0);
    const inStockCount = productsList.filter((p) => p.inStock !== false).length;
    const outOfStockCount = productsList.length - inStockCount;

    return {
      totalRevenue: totalOrderRevenue + 48250,
      totalOrders: orders.length + 1280,
      deliveredOrders: orders.filter((o) => o.status === "Delivered").length + 1210,
      catalogCount: productsList.length,
      inStockCount,
      outOfStockCount
    };
  }, [orders, productsList]);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return productsList
      .filter((p) => {
        const query = productSearch.toLowerCase().trim();
        const matchesSearch =
          !query ||
          p.name.toLowerCase().includes(query) ||
          (p.brand && p.brand.toLowerCase().includes(query)) ||
          (p.sku && p.sku.toLowerCase().includes(query)) ||
          (p.category && p.category.toLowerCase().includes(query)) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(query));

        const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;

        const matchesStock =
          stockFilter === "All" ||
          (stockFilter === "In Stock" && p.inStock !== false) ||
          (stockFilter === "Out of Stock" && p.inStock === false);

        return matchesSearch && matchesCategory && matchesStock;
      })
      .sort((a, b) => {
        if (sortOption === "price-low") return (Number(a.price) || 0) - (Number(b.price) || 0);
        if (sortOption === "price-high") return (Number(b.price) || 0) - (Number(a.price) || 0);
        if (sortOption === "rating") return (Number(b.rating) || 0) - (Number(a.rating) || 0);
        if (sortOption === "stock") return (Number(b.stock) || 0) - (Number(a.stock) || 0);
        return (Number(b.id) || 0) - (Number(a.id) || 0);
      });
  }, [productsList, productSearch, categoryFilter, stockFilter, sortOption]);

  // Paginated Products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Filter Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const q = orderSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        o.customer.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.province.toLowerCase().includes(q) ||
        o.phone.toLowerCase().includes(q);

      const matchesStatus = orderStatusFilter === "All" || o.status === orderStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  // === PRODUCT CRUD HANDLERS ===
  const handleOpenCreateProduct = () => {
    setModalMode("create");
    setFormData({
      id: null,
      name: "",
      brand: "VELORA Studio",
      sku: `VEL-${String(productsList.length + 109).padStart(4, "0")}`,
      price: "",
      originalPrice: "",
      category: "Men's Fashion",
      subCategory: "Tops",
      badge: "New",
      drop: "",
      image: "/images/products/tee-grey-melange-crewneck.jpg",
      inStock: true,
      stock: 30,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White"],
      description: "Crafted from heavyweight premium cotton with bespoke tailoring and structured silhouette."
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setFormData({
      id: product.id,
      name: product.name || "",
      brand: product.brand || "VELORA Collection",
      sku: product.sku || `VEL-${String(product.id).padStart(4, "0")}`,
      price: product.price ?? "",
      originalPrice: product.originalPrice ?? "",
      category: product.category || "Men's Fashion",
      subCategory: product.subCategory || "Tops",
      badge: product.badge || "",
      drop: product.drop || "",
      image: product.image || "/images/products/tee-grey-melange-crewneck.jpg",
      inStock: product.inStock !== false,
      stock: product.stock ?? 25,
      sizes: product.sizes || product.size || ["S", "M", "L", "XL"],
      colors: (product.colors || []).map((c) => (typeof c === "string" ? c : c.name || "Default")),
      description: product.description || ""
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast("Product name is required", "error");
      return;
    }
    if (formData.price === "" || isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      showToast("Please enter a valid price", "error");
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      stock: Number(formData.stock) || 0,
      isNew: formData.badge === "New" || Boolean(formData.isNew),
      isSale: Boolean(formData.originalPrice && Number(formData.originalPrice) > Number(formData.price)),
      images: [formData.image],
      image: formData.image || "/images/products/tee-grey-melange-crewneck.jpg"
    };

    const saved = saveProductToCatalog(payload);
    setProductsList([...globalProducts]);
    setIsProductModalOpen(false);

    showToast(
      modalMode === "create"
        ? `Added "${saved.name}" to store catalog!`
        : `Updated "${saved.name}" successfully!`,
      "success"
    );
  };

  const handleOpenDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedProduct) return;
    deleteProductFromCatalog(selectedProduct.id);
    setProductsList([...globalProducts]);
    setIsDeleteModalOpen(false);
    showToast(`Deleted product #${selectedProduct.id} from catalog`, "success");
    setSelectedProduct(null);
  };

  const handleToggleStock = (productId) => {
    const product = productsList.find((p) => p.id === productId);
    if (!product) return;
    const newStatus = product.inStock === false;
    saveProductToCatalog({ ...product, inStock: newStatus });
    setProductsList([...globalProducts]);
    showToast(
      `${product.name} is now ${newStatus ? "In Stock" : "Out of Stock"}`,
      "info"
    );
  };

  // === ORDERS CRUD HANDLERS ===
  const handleOrderStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order ${orderId} updated to "${newStatus}"`, "success");
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    if (!newOrderData.customer || !newOrderData.totalUSD) {
      showToast("Customer name and total amount are required", "error");
      return;
    }

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: newOrderData.customer,
      phone: newOrderData.phone || "+855 12 000 000",
      province: newOrderData.province || "Phnom Penh",
      items: newOrderData.items || "Custom Store Order",
      totalUSD: Number(newOrderData.totalUSD),
      paymentMethod: newOrderData.paymentMethod,
      status: newOrderData.status,
      date: "Just now"
    };

    setOrders((prev) => [newOrder, ...prev]);
    setIsOrderModalOpen(false);
    setNewOrderData({
      customer: "",
      phone: "",
      province: "Phnom Penh",
      items: "",
      totalUSD: "",
      paymentMethod: "ABA Pay",
      status: "Processing"
    });
    showToast(`Created order ${newOrder.id} successfully!`, "success");
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to remove order ${orderId}?`)) {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      showToast(`Order ${orderId} deleted`, "info");
    }
  };

  // Export JSON backup
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(productsList, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `store_products_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Downloaded catalog JSON backup!", "success");
  };

  // Reset to Factory Catalog
  const handleResetCatalog = () => {
    if (window.confirm("Are you sure you want to reset all products back to the original factory catalog? Any custom added products will be reset.")) {
      resetProductsCatalog();
      setProductsList([...globalProducts]);
      showToast("Store catalog reset to default factory items", "info");
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#0c0c0e] text-neutral-900 dark:text-neutral-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-up border border-neutral-800 dark:border-neutral-200">
          <div className="p-1.5 bg-[#c2a677] text-neutral-950 rounded-full flex-shrink-0">
            <Check className="w-4 h-4 stroke-[2.5]" />
          </div>
          <p className="font-semibold text-xs sm:text-sm">{toast.message}</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">

        {/* ========================================================= */}
        {/* TOP EXECUTIVE HEADER CARD */}
        {/* ========================================================= */}
        <div className="p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-white/10 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 via-[#c2a677] to-amber-700 text-white flex items-center justify-center shadow-xl shadow-amber-500/25 flex-shrink-0 border border-white/20">
              <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>
            <div>
              <div className="flex items-center flex-wrap gap-2.5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-neutral-950 dark:text-white">
                  Admin Master Dashboard
                </h1>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#c2a677] text-neutral-950 tracking-widest uppercase shadow-sm">
                  SUPER ADMIN
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 flex items-center gap-2">
                <span>Logged in as <strong>{user?.name || "Admin"}</strong> ({user?.email || "admin@rithy.com"})</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Live"></span>
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenCreateProduct}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#c2a677] to-[#9a783e] hover:brightness-105 text-neutral-950 text-xs sm:text-sm font-bold shadow-lg shadow-[#c2a677]/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add New Product</span>
            </button>

            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="px-4 py-3 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs sm:text-sm font-semibold shadow-md hover:opacity-90 transition-all cursor-pointer flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Create Order</span>
            </button>

            <Link
              to="/shop"
              className="px-4 py-3 rounded-xl border border-neutral-300 dark:border-white/15 text-xs sm:text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>Live Store</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* REAL-TIME KPI STATS CARDS */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Revenue */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Total Revenue
              </span>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-[#a8894d] dark:text-[#c2a677]">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white mt-2 tracking-tight">
              ${stats.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-[#a8894d] dark:text-[#c2a677] mt-1 font-medium">
              ≈ {formatKHR(stats.totalRevenue)}
            </p>
          </div>

          {/* Orders */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Store Orders
              </span>
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white mt-2 tracking-tight">
              {stats.totalOrders} Orders
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
              ✓ {stats.deliveredOrders} delivered successfully
            </p>
          </div>

          {/* Products in Catalog */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Catalog Inventory
              </span>
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white mt-2 tracking-tight">
              {stats.catalogCount} Items
            </p>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">{stats.inStockCount} In Stock</span>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <span className="text-rose-500 font-medium">{stats.outOfStockCount} Out of Stock</span>
            </div>
          </div>

          {/* Cambodia Delivery */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Logistics & Drops
              </span>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Truck className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white mt-2 tracking-tight">
              25 Provinces
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Phnom Penh Same-Day Courier
            </p>
          </div>

        </div>

        {/* ========================================================= */}
        {/* MAIN CRUD TABS CONTENT CARD */}
        {/* ========================================================= */}
        <div className="bg-white dark:bg-neutral-900 rounded-[2rem] border border-neutral-200/80 dark:border-white/10 shadow-xl overflow-hidden">
          
          {/* Tabs Navigation Header */}
          <div className="flex border-b border-neutral-200 dark:border-white/10 px-6 pt-5 gap-8 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("products")}
              className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                activeTab === "products"
                  ? "border-[#c2a677] text-[#9a783e] dark:text-[#c2a677]"
                  : "border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products Catalog CRUD ({filteredProducts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                activeTab === "orders"
                  ? "border-[#c2a677] text-[#9a783e] dark:text-[#c2a677]"
                  : "border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders Management ({filteredOrders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                activeTab === "settings"
                  ? "border-[#c2a677] text-[#9a783e] dark:text-[#c2a677]"
                  : "border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Data & Backup Settings</span>
            </button>
          </div>

          {/* ======================================================= */}
          {/* TAB 1: PRODUCTS CRUD (FULL CREATE, READ, UPDATE, DELETE) */}
          {/* ======================================================= */}
          {activeTab === "products" && (
            <div className="p-6 space-y-6">
              
              {/* Product Search & Filter Controls */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search by name, SKU, brand, category..."
                    value={productSearch}
                    onChange={(e) => {
                      setProductSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                  />
                  {productSearch && (
                    <button
                      onClick={() => setProductSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filter and Sort selectors */}
                <div className="flex flex-wrap items-center gap-3">
                  
                  {/* Category Filter */}
                  <select
                    value={categoryFilter}
                    onChange={(e) => {
                      setCategoryFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="bg-stone-100 dark:bg-neutral-950 border border-neutral-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-200 cursor-pointer focus:outline-none"
                  >
                    <option value="All">All Categories</option>
                    {STANDARD_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                  {/* Stock Filter */}
                  <select
                    value={stockFilter}
                    onChange={(e) => {
                      setStockFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="bg-stone-100 dark:bg-neutral-950 border border-neutral-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-200 cursor-pointer focus:outline-none"
                  >
                    <option value="All">All Stock</option>
                    <option value="In Stock">In Stock Only</option>
                    <option value="Out of Stock">Out of Stock Only</option>
                  </select>

                  {/* Sort By */}
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-stone-100 dark:bg-neutral-950 border border-neutral-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-200 cursor-pointer focus:outline-none"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="stock">Stock Quantity</option>
                  </select>

                  {/* Primary Add Button */}
                  <button
                    onClick={handleOpenCreateProduct}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#c2a677] to-[#9a783e] text-neutral-950 text-xs font-bold shadow-md hover:brightness-105 transition-all cursor-pointer flex items-center gap-1.5 ml-auto"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Create</span>
                  </button>
                </div>

              </div>

              {/* Products Table */}
              <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-white/10">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Product Details</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Price (USD)</th>
                      <th className="py-3.5 px-4">Price (KHR)</th>
                      <th className="py-3.5 px-4">Stock Status</th>
                      <th className="py-3.5 px-4">Badges</th>
                      <th className="py-3.5 px-4 text-right">Actions (CRUD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-white/10">
                    {paginatedProducts.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-neutral-500">
                          <Package className="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-700 mb-2" />
                          <p className="font-semibold text-sm">No products found matching filters</p>
                          <p className="text-xs text-neutral-400 mt-1">Try resetting search or category filters</p>
                        </td>
                      </tr>
                    ) : (
                      paginatedProducts.map((p) => {
                        const inStock = p.inStock !== false;
                        return (
                          <tr key={p.id} className="hover:bg-stone-50 dark:hover:bg-white/[0.02] transition-colors">
                            
                            {/* Product Info + Image */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-14 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 border border-neutral-200 dark:border-white/10">
                                  <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src = "/images/products/tee-grey-melange-crewneck.jpg";
                                    }}
                                  />
                                </div>
                                <div className="max-w-xs">
                                  <p className="font-bold text-neutral-950 dark:text-white truncate" title={p.name}>
                                    {p.name}
                                  </p>
                                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                                    {p.brand || "VELORA"} • SKU: {p.sku || `VEL-${String(p.id).padStart(4, "0")}`}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Category & SubCategory */}
                            <td className="py-3.5 px-4">
                              <span className="font-medium text-neutral-800 dark:text-neutral-200 block">
                                {p.category}
                              </span>
                              <span className="text-[10px] text-neutral-400">
                                {p.subCategory || "General"}
                              </span>
                            </td>

                            {/* Price USD */}
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-neutral-950 dark:text-white">
                                ${typeof p.price === "number" ? p.price.toFixed(2) : p.price}
                              </div>
                              {p.originalPrice && p.originalPrice > p.price && (
                                <span className="text-[10px] text-neutral-400 line-through">
                                  ${typeof p.originalPrice === "number" ? p.originalPrice.toFixed(2) : p.originalPrice}
                                </span>
                              )}
                            </td>

                            {/* Price KHR */}
                            <td className="py-3.5 px-4 font-medium text-[#a8894d] dark:text-[#c2a677]">
                              {formatKHR(p.price)}
                            </td>

                            {/* Stock Quick-Toggle */}
                            <td className="py-3.5 px-4">
                              <button
                                type="button"
                                onClick={() => handleToggleStock(p.id)}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                                  inStock
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 hover:bg-emerald-200"
                                    : "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400 hover:bg-rose-200"
                                }`}
                                title="Click to toggle stock status"
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${inStock ? "bg-emerald-600" : "bg-rose-600"}`} />
                                <span>{inStock ? `In Stock (${p.stock || 25})` : "Out of Stock"}</span>
                              </button>
                            </td>

                            {/* Badges */}
                            <td className="py-3.5 px-4">
                              {p.badge ? (
                                <span className="inline-block px-2 py-0.5 rounded-md text-[9px] font-bold bg-[#c2a677]/20 text-[#856b3e] dark:text-[#c2a677] uppercase tracking-wider">
                                  {p.badge}
                                </span>
                              ) : p.drop ? (
                                <span className="inline-block px-2 py-0.5 rounded-md text-[9px] font-mono bg-purple-500/10 text-purple-600 dark:text-purple-400 uppercase">
                                  DROP
                                </span>
                              ) : (
                                <span className="text-neutral-400 text-[10px]">—</span>
                              )}
                            </td>

                            {/* CRUD Actions */}
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                
                                {/* View in Store */}
                                <Link
                                  to={`/product/${p.id}`}
                                  className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-950 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-neutral-800 transition-colors"
                                  title="View on Store"
                                >
                                  <Eye className="w-4 h-4" />
                                </Link>

                                {/* Edit Product (U in CRUD) */}
                                <button
                                  onClick={() => handleOpenEditProduct(p)}
                                  className="p-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                                  title="Edit Product"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>

                                {/* Delete Product (D in CRUD) */}
                                <button
                                  onClick={() => handleOpenDelete(p)}
                                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>

                              </div>
                            </td>

                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-neutral-500">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} items
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="p-2 rounded-xl border border-neutral-200 dark:border-white/10 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-semibold px-2">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="p-2 rounded-xl border border-neutral-200 dark:border-white/10 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 2: ORDERS MANAGEMENT */}
          {/* ======================================================= */}
          {activeTab === "orders" && (
            <div className="p-6 space-y-6">
              
              {/* Order Search & Status Filter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search by customer, order #, province..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
                  {["All", "Processing", "In Transit", "Delivered", "Pending"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setOrderStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex-shrink-0 ${
                        orderStatusFilter === status
                          ? "bg-[#c2a677] text-neutral-950 font-bold"
                          : "bg-stone-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 hover:bg-stone-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                  <button
                    onClick={() => setIsOrderModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold flex items-center gap-1 cursor-pointer flex-shrink-0 ml-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Order</span>
                  </button>
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-white/10">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-white/10">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-stone-50 dark:hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-neutral-950 dark:text-white">
                          {order.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-neutral-950 dark:text-white">{order.customer}</p>
                          <p className="text-[10px] text-neutral-400">{order.phone}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-neutral-800 dark:text-neutral-200">{order.province}</span>
                          <span className="text-[10px] text-neutral-400 block">{order.paymentMethod}</span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs truncate text-neutral-600 dark:text-neutral-300">
                          {order.items}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-neutral-950 dark:text-white">
                            ${Number(order.totalUSD).toFixed(2)}
                          </span>
                          <span className="text-[10px] text-[#a8894d] dark:text-[#c2a677] block font-medium">
                            {formatKHR(order.totalUSD)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              order.status === "Delivered"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400"
                                : order.status === "In Transit"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-400"
                                  : order.status === "Processing"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400"
                                    : "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-400"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <select
                              value={order.status}
                              onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                              className="bg-stone-100 dark:bg-neutral-950 border border-neutral-300 dark:border-white/10 rounded-lg px-2 py-1 text-[11px] font-medium text-neutral-800 dark:text-neutral-200 cursor-pointer"
                            >
                              <option value="Processing">Processing</option>
                              <option value="In Transit">In Transit</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Pending">Pending</option>
                            </select>
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="p-1 text-neutral-400 hover:text-rose-500 cursor-pointer"
                              title="Delete Order"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 3: DATA & BACKUP SETTINGS */}
          {/* ======================================================= */}
          {activeTab === "settings" && (
            <div className="p-6 space-y-8 max-w-3xl">
              
              <div>
                <h3 className="text-lg font-bold text-neutral-950 dark:text-white">Store Database & Catalog Controls</h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Export complete store catalog data for backup, or restore to original factory database.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Export Card */}
                <div className="p-5 rounded-2xl bg-stone-50 dark:bg-neutral-950 border border-neutral-200 dark:border-white/10 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit mb-3">
                      <Download className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-neutral-950 dark:text-white">Export Catalog JSON</h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      Download a JSON file containing all {productsList.length} products including custom added items.
                    </p>
                  </div>
                  <button
                    onClick={handleExportJSON}
                    className="w-full py-2.5 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                {/* Reset Card */}
                <div className="p-5 rounded-2xl bg-stone-50 dark:bg-neutral-950 border border-neutral-200 dark:border-white/10 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 w-fit mb-3">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-neutral-950 dark:text-white">Reset to Factory Catalog</h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      Restore the original store catalog and clear custom additions.
                    </p>
                  </div>
                  <button
                    onClick={handleResetCatalog}
                    className="w-full py-2.5 rounded-xl border border-rose-300 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Restore Factory Catalog</span>
                  </button>
                </div>

              </div>

              {/* Admin Session Card */}
              <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticated Administrator Session</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  You are logged in with Super Admin authorization. All CRUD changes to products and inventory are immediately live across the entire website (Shop, Product Details, Home banners, and Cart).
                </p>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* ========================================================= */}
      {/* CREATE / EDIT PRODUCT MODAL (CRUD MODAL) */}
      {/* ========================================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-white/10 shadow-2xl p-6 sm:p-8">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#c2a677]/10 text-[#a8894d] dark:text-[#c2a677]">
                  {modalMode === "create" ? <Plus className="w-5 h-5 stroke-[2.5]" /> : <Edit className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white">
                    {modalMode === "create" ? "Add New Product to Catalog" : `Edit Product #${formData.id}`}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {modalMode === "create" ? "Create a new product with full store attributes" : "Update product information, pricing and stock"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveProduct} className="space-y-4 pt-4">
              
              {/* Product Name */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Minimalist Heavyweight Drop-Shoulder Tee"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                />
              </div>

              {/* Brand & SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Brand / Line
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. VELORA Studio"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. VEL-0109"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Price & Original Price (Sale) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Selling Price ($ USD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    placeholder="e.g. 45.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                  />
                  {formData.price && !isNaN(Number(formData.price)) && (
                    <span className="text-[10px] text-[#a8894d] dark:text-[#c2a677] mt-1 block">
                      ≈ {formatKHR(Number(formData.price))}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Original Price ($ USD) <span className="font-normal text-neutral-400">(for discount tag)</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="e.g. 60.00"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Category & Subcategory */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Primary Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white cursor-pointer"
                  >
                    {STANDARD_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tops, Shirts, Pants, Outerwear"
                    value={formData.subCategory}
                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Stock Quantity & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 50"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                  />
                </div>
                <div className="pt-5">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="w-5 h-5 rounded text-[#c2a677] focus:ring-[#c2a677] cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                      Product In Stock (Available for purchase)
                    </span>
                  </label>
                </div>
              </div>

              {/* Badge & Collection Drop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Store Badge
                  </label>
                  <select
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white cursor-pointer"
                  >
                    <option value="">No Badge</option>
                    <option value="New">New Arrival</option>
                    <option value="Sale">On Sale</option>
                    <option value="Trending">Trending</option>
                    <option value="Exclusive">Exclusive Studio</option>
                    <option value="Best Seller">Best Seller</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Collection / Drop Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DROP 003 — FUNDS PROJECT PAKISTAN"
                    value={formData.drop}
                    onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Image URL & Preview */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Product Image URL or Path
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="/images/products/tee-grey-melange-crewneck.jpg or https://..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 px-4 py-2.5 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                  />
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 dark:border-white/10 flex-shrink-0">
                    <img
                      src={formData.image || "/images/products/tee-grey-melange-crewneck.jpg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/images/products/tee-grey-melange-crewneck.jpg";
                      }}
                    />
                  </div>
                </div>

                {/* Preset Fast Picker */}
                <div className="mt-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  <span className="text-[10px] text-neutral-400 whitespace-nowrap">Presets:</span>
                  {PRESET_IMAGE_OPTIONS.slice(0, 5).map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: preset.url })}
                      className="px-2 py-1 bg-stone-100 dark:bg-neutral-800 text-[10px] rounded-lg whitespace-nowrap hover:bg-[#c2a677] hover:text-neutral-950 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Product Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Detailed product fabric, origin, fit and craftsmanship details..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                />
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-neutral-300 dark:border-white/15 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#c2a677] to-[#9a783e] text-neutral-950 text-xs font-bold shadow-lg hover:brightness-105 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{modalMode === "create" ? "Save New Product" : "Update Product"}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DELETE PRODUCT CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {isDeleteModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-white/10 shadow-2xl p-6 sm:p-7 space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-neutral-950 dark:text-white">Delete Product from Catalog?</h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Are you sure you want to remove <strong>"{selectedProduct.name}"</strong> (ID: {selectedProduct.id})? This action will remove it from the catalog across the entire store.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-neutral-300 dark:border-white/15 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CREATE ORDER MODAL */}
      {/* ========================================================= */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-white/10 shadow-2xl p-6 sm:p-7 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#c2a677]" />
                <h3 className="text-lg font-bold text-neutral-950 dark:text-white">Create New Customer Order</h3>
              </div>
              <button onClick={() => setIsOrderModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddOrder} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Customer Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Visal Chea"
                  value={newOrderData.customer}
                  onChange={(e) => setNewOrderData({ ...newOrderData, customer: e.target.value })}
                  className="w-full px-3.5 py-2 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+855 12 345 678"
                    value={newOrderData.phone}
                    onChange={(e) => setNewOrderData({ ...newOrderData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Delivery Province
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Phnom Penh"
                    value={newOrderData.province}
                    onChange={(e) => setNewOrderData({ ...newOrderData, province: e.target.value })}
                    className="w-full px-3.5 py-2 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Ordered Items Summary
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2x Heavyweight Crewneck Tee (Grey, L)"
                  value={newOrderData.items}
                  onChange={(e) => setNewOrderData({ ...newOrderData, items: e.target.value })}
                  className="w-full px-3.5 py-2 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Total Amount ($ USD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    placeholder="e.g. 100.00"
                    value={newOrderData.totalUSD}
                    onChange={(e) => setNewOrderData({ ...newOrderData, totalUSD: e.target.value })}
                    className="w-full px-3.5 py-2 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={newOrderData.paymentMethod}
                    onChange={(e) => setNewOrderData({ ...newOrderData, paymentMethod: e.target.value })}
                    className="w-full px-3.5 py-2 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-300 dark:border-white/10 text-xs focus:outline-none focus:border-[#c2a677] text-neutral-900 dark:text-white"
                  >
                    <option value="ABA Pay">ABA Pay</option>
                    <option value="Wing">Wing Bank</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Credit Card">Credit Card</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsOrderModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-white/15 text-xs font-semibold hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c2a677] to-[#9a783e] text-neutral-950 text-xs font-bold shadow-md cursor-pointer"
                >
                  Create Order
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
