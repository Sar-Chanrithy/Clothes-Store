import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { products, formatKHR } from "../data/products";
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
  ArrowLeft
} from "lucide-react";

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

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, switchAccount, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("orders"); // "orders" | "products" | "settings"
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalUSD, 48250);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.province.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 flex-shrink-0">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  Store Administration
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#c2a677] text-neutral-950 tracking-wider">
                  SUPER ADMIN
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Logged in as <strong>{user?.name || "Admin Rithy"}</strong> ({user?.email || "admin@rithystore.com"})
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                switchAccount("user");
                navigate("/");
              }}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/15 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-2"
              title="Test the website as a regular customer"
            >
              <Users className="w-4 h-4 text-purple-500" />
              <span>Switch to Customer Mode</span>
            </button>

            <Link
              to="/"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#c2a677] to-[#9a783e] text-neutral-950 text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center gap-2"
            >
              <span>View Live Store</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Real-time KPI Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-white/10 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Total Revenue
              </span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-[#a8894d] dark:text-[#c2a677]">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-2">
              ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-[#a8894d] dark:text-[#c2a677] mt-1 font-medium">
              ≈ {formatKHR(totalRevenue)}
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-white/10 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Total Orders
              </span>
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-2">
              1,284
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
              ↑ 94.2% delivery success rate
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-white/10 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Products in Catalog
              </span>
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-2">
              {products.length} Items
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Active across 6 collections
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-white/10 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Cambodia Delivery
              </span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Truck className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-2">
              25 Provinces
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Phnom Penh same-day delivery
            </p>
          </div>
        </div>

        {/* Main Content Card with Navigation Tabs */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/80 dark:border-white/10 shadow-xl overflow-hidden">
          
          {/* Tabs Navigation Header */}
          <div className="flex border-b border-neutral-200 dark:border-white/10 px-6 pt-4 gap-6 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("orders")}
              className={`pb-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                activeTab === "orders"
                  ? "border-[#c2a677] text-[#9a783e] dark:text-[#c2a677]"
                  : "border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
              }`}
            >
              Recent Orders ({filteredOrders.length})
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`pb-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                activeTab === "products"
                  ? "border-[#c2a677] text-[#9a783e] dark:text-[#c2a677]"
                  : "border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
              }`}
            >
              Inventory Management ({products.length})
            </button>
          </div>

          {/* TAB 1: Orders Management */}
          {activeTab === "orders" && (
            <div className="p-6 space-y-6">
              
              {/* Filter and Search controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search by customer, order #, province..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-stone-100 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#c2a677]"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
                  {["All", "Processing", "In Transit", "Delivered", "Pending"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex-shrink-0 ${
                        selectedStatus === status
                          ? "bg-[#c2a677] text-neutral-950 font-bold"
                          : "bg-stone-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 hover:bg-stone-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
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
                        <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 dark:text-white">
                          {order.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-neutral-900 dark:text-white">{order.customer}</p>
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
                          <span className="font-bold text-neutral-900 dark:text-white">
                            ${order.totalUSD.toFixed(2)}
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
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="bg-stone-100 dark:bg-neutral-950 border border-neutral-300 dark:border-white/10 rounded-lg px-2 py-1 text-[11px] font-medium text-neutral-800 dark:text-neutral-200 cursor-pointer"
                          >
                            <option value="Processing">Processing</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Product Catalog & Stock */}
          {activeTab === "products" && (
            <div className="p-6 space-y-4">
              <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-white/10">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price (USD)</th>
                      <th className="py-3 px-4">Price (KHR)</th>
                      <th className="py-3 px-4">Stock Status</th>
                      <th className="py-3 px-4 text-right">View in Store</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-white/10">
                    {products.slice(0, 15).map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50 dark:hover:bg-white/[0.02]">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-12 object-cover rounded-lg bg-neutral-100"
                          />
                          <div>
                            <p className="font-semibold text-neutral-900 dark:text-white truncate max-w-xs">{p.name}</p>
                            <p className="text-[10px] text-neutral-400">SKU: {p.sku || `RITHY-${p.id}`}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-neutral-600 dark:text-neutral-300 font-medium">
                          {p.category}
                        </td>
                        <td className="py-3 px-4 font-bold text-neutral-900 dark:text-white">
                          ${typeof p.price === "number" ? p.price.toFixed(2) : p.price}
                        </td>
                        <td className="py-3 px-4 text-[#a8894d] dark:text-[#c2a677] font-medium">
                          {formatKHR(p.price)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
                            ✓ In Stock (Cambodia)
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            to={`/product/${p.id}`}
                            className="p-2 text-neutral-400 hover:text-purple-600 inline-block"
                            title="Preview Product"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Admin;
