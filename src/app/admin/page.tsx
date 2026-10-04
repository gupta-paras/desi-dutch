"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dish, RestaurantConfig } from "@/types";
import {
  Utensils,
  Plus,
  Sparkles,
  Settings,
  LogOut,
  Upload,
  X,
  Check,
  Trash2,
  Edit,
  Flame,
  Image as ImageIcon,
  AlertCircle,
  Eye,
  RefreshCw,
  Save,
  UserCheck,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"dishes" | "specials" | "config">("dishes");
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [config, setConfig] = useState<RestaurantConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Form State for creating/editing a dish
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDishId, setEditingDishId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "street-bites-fusion" as Dish["category"],
    price: 12.5,
    spiceLevel: 2 as Dish["spiceLevel"],
    dietaryTags: ["Halal"] as string[],
    isSpecialToday: false,
    isAvailable: true,
    descriptionEn: "",
    descriptionNl: "",
    pairingDrink: "",
    photos: [] as string[],
  });

  // Photo upload state
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [customPhotoUrl, setCustomPhotoUrl] = useState("");

  // Settings form state (synced with config.yaml)
  const [configForm, setConfigForm] = useState<RestaurantConfig | null>(null);
  const [newAdminEmail, setNewAdminEmail] = useState("");

  // Check auth
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Load Dishes and Config
  const loadData = async () => {
    setLoading(true);
    try {
      const [dishesRes, configRes] = await Promise.all([
        fetch("/api/dishes"),
        fetch("/api/config"),
      ]);
      const dishesData = await dishesRes.json();
      const configData = await configRes.json();

      if (dishesData.success) {
        setDishes(dishesData.dishes);
      }
      if (configData.success) {
        setConfig(configData.config);
        setConfigForm(configData.config);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      loadData();
    }
  }, [status]);

  // Reset dish form
  const resetForm = () => {
    setFormData({
      name: "",
      category: "street-bites-fusion",
      price: 12.5,
      spiceLevel: 2,
      dietaryTags: ["Halal"],
      isSpecialToday: false,
      isAvailable: true,
      descriptionEn: "",
      descriptionNl: "",
      pairingDrink: "",
      photos: [],
    });
    setEditingDishId(null);
    setCustomPhotoUrl("");
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleOpenEdit = (dish: Dish) => {
    setEditingDishId(dish.id);
    setFormData({
      name: dish.name,
      category: dish.category,
      price: dish.price,
      spiceLevel: dish.spiceLevel,
      dietaryTags: dish.dietaryTags,
      isSpecialToday: dish.isSpecialToday,
      isAvailable: dish.isAvailable,
      descriptionEn: dish.descriptionEn,
      descriptionNl: dish.descriptionNl || "",
      pairingDrink: dish.pairingDrink || "",
      photos: dish.photos || [],
    });
    setIsFormOpen(true);
  };

  // Upload any number of photos!
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingPhotos(true);
    try {
      const uploadFormData = new FormData();
      for (let i = 0; i < files.length; i++) {
        uploadFormData.append("files", files[i]);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });
      const data = await res.json();

      if (data.success && Array.isArray(data.urls)) {
        setFormData((prev) => ({
          ...prev,
          photos: [...prev.photos, ...data.urls],
        }));
      } else {
        alert("Upload error: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      alert("Failed to upload: " + err.message);
    } finally {
      setUploadingPhotos(false);
      e.target.value = "";
    }
  };

  const handleAddPhotoUrl = () => {
    if (!customPhotoUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, customPhotoUrl.trim()],
    }));
    setCustomPhotoUrl("");
  };

  const handleRemovePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, idx) => idx !== index),
    }));
  };

  // Save Dish (Create or Update)
  const handleSaveDish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    try {
      const res = await fetch("/api/dishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          id: editingDishId || undefined,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setIsFormOpen(false);
        resetForm();
        loadData();
        setSaveStatus("Dish saved successfully!");
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        alert("Failed to save dish: " + data.error);
      }
    } catch (err: any) {
      alert("Error saving dish: " + err.message);
    }
  };

  // Delete Dish
  const handleDeleteDish = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/dishes/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setDishes((prev) => prev.filter((d) => d.id !== id));
      }
    } catch (err) {
      alert("Failed to delete dish");
    }
  };

  // Toggle Special Today
  const handleToggleSpecial = async (id: string) => {
    try {
      const res = await fetch(`/api/dishes/${id}/special`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setDishes((prev) =>
          prev.map((d) => (d.id === id ? { ...d, isSpecialToday: !d.isSpecialToday } : d))
        );
      }
    } catch (err) {
      alert("Failed to toggle special");
    }
  };

  // Save Config.yaml
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!configForm) return;

    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(configForm),
      });
      const data = await res.json();
      if (data.success) {
        setConfig(data.config);
        setSaveStatus("Configuration & Whitelist updated in config.yaml!");
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        alert("Failed to update config: " + data.error);
      }
    } catch (err: any) {
      alert("Failed to save config: " + err.message);
    }
  };

  // Add Whitelisted Admin User
  const handleAddAdminEmail = () => {
    if (!newAdminEmail.trim() || !configForm) return;
    const email = newAdminEmail.trim().toLowerCase();
    if (configForm.admin_users.includes(email)) return;

    setConfigForm({
      ...configForm,
      admin_users: [...configForm.admin_users, email],
    });
    setNewAdminEmail("");
  };

  const handleRemoveAdminEmail = (emailToRemove: string) => {
    if (!configForm) return;
    setConfigForm({
      ...configForm,
      admin_users: configForm.admin_users.filter((e) => e !== emailToRemove),
    });
  };

  const dietaryChoices = ["Vegetarian", "Vegan", "Halal", "Gluten-Free", "Merchandise", "Pantry"];

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-jaipur-terracotta border-t-transparent rounded-full animate-spin" />
          <p className="font-serif text-sm text-amsterdam-canal font-semibold">
            Loading Desi Dutch Kitchen Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-amsterdam-canal flex flex-col">
      {/* Top Admin Navbar */}
      <header className="bg-white border-b border-cream-parchment sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-jaipur-terracotta text-white flex items-center justify-center font-serif font-bold text-sm shadow-glow">
                DD
              </div>
              <span className="font-serif font-bold text-lg text-amsterdam-canal hidden sm:inline">
                Desi Dutch Admin
              </span>
            </Link>
            <span className="px-2.5 py-0.5 rounded-full bg-saffron-gold/20 text-jaipur-dark text-[11px] font-semibold uppercase tracking-wider">
              Management Portal
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Logged in User info */}
            <div className="hidden md:flex items-center gap-2 text-xs bg-cream-warm px-3 py-1.5 rounded-full border border-cream-parchment">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-medium text-amsterdam-canal">{session?.user?.email}</span>
            </div>

            {/* View live site button */}
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-amsterdam-canal/80 hover:text-jaipur-terracotta hover:bg-cream-parchment transition-colors"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Sign Out */}
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="p-2 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
              title="Sign out of Admin"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 sm:gap-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("dishes")}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap flex items-center gap-2 transition-colors ${
              activeTab === "dishes"
                ? "border-jaipur-terracotta text-jaipur-terracotta"
                : "border-transparent text-amsterdam-canal/70 hover:text-amsterdam-canal"
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Dishes & Photos ({dishes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("specials")}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap flex items-center gap-2 transition-colors ${
              activeTab === "specials"
                ? "border-jaipur-terracotta text-jaipur-terracotta"
                : "border-transparent text-amsterdam-canal/70 hover:text-amsterdam-canal"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>What's Special Today ({dishes.filter((d) => d.isSpecialToday).length})</span>
          </button>

          <button
            onClick={() => setActiveTab("config")}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap flex items-center gap-2 transition-colors ${
              activeTab === "config"
                ? "border-jaipur-terracotta text-jaipur-terracotta"
                : "border-transparent text-amsterdam-canal/70 hover:text-amsterdam-canal"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Config.yaml & Whitelist</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Toast Save Alert */}
        <AnimatePresence>
          {saveStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-sm"
            >
              <Check className="w-5 h-5 text-emerald-600" />
              <span>{saveStatus}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ======================================================== */}
        {/* TAB 1: DISHES & MULTI-PHOTO MANAGEMENT                   */}
        {/* ======================================================== */}
        {activeTab === "dishes" && (
          <div className="space-y-6">
            {/* Header with Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-cream-parchment shadow-sm">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amsterdam-canal">
                  Dishes & Multi-Photo Management
                </h1>
                <p className="text-xs sm:text-sm text-amsterdam-canal/70 mt-1">
                  Configure dish names, descriptions, categories, pricing, and upload any number of photos.
                </p>
              </div>

              <button
                onClick={handleOpenCreate}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-jaipur-terracotta hover:bg-jaipur-rose text-white text-sm font-semibold shadow-glow transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Dish</span>
              </button>
            </div>

            {/* Dishes List / Cards Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dishes.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-white rounded-3xl overflow-hidden border border-cream-parchment shadow-sm flex flex-col justify-between hover:shadow-card transition-all"
                >
                  {/* Photo Thumbnail Strip */}
                  <div className="relative aspect-[16/9] bg-cream-warm overflow-hidden">
                    <img
                      src={dish.photos[0] || "/images/hero-fusion.jpg"}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Photos Count Badge */}
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>{dish.photos.length} photo{dish.photos.length === 1 ? "" : "s"}</span>
                    </div>

                    {/* Price Pill */}
                    <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-saffron-gold text-amsterdam-canal text-xs font-bold font-serif">
                      €{dish.price.toFixed(2)}
                    </div>

                    {/* Special Today Tag */}
                    {dish.isSpecialToday && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-jaipur-rose text-white text-[10px] font-bold uppercase tracking-wider">
                        Special Today
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif font-bold text-base text-amsterdam-canal">
                          {dish.name}
                        </h3>
                        <div className="flex items-center gap-0.5 pt-0.5">
                          {[1, 2, 3, 4].map((l) => (
                            <Flame
                              key={l}
                              className={`w-3 h-3 ${
                                l <= dish.spiceLevel ? "text-jaipur-rose fill-jaipur-rose" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-amsterdam-canal/70 mt-1 line-clamp-2">
                        {dish.descriptionEn}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-3">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-cream-parchment font-medium">
                          {dish.category}
                        </span>
                        {dish.dietaryTags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-cream-parchment font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-cream-parchment flex items-center justify-between">
                      <button
                        onClick={() => handleToggleSpecial(dish.id)}
                        className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                          dish.isSpecialToday
                            ? "bg-saffron-gold/30 text-jaipur-dark"
                            : "bg-cream-parchment text-amsterdam-canal/60 hover:text-amsterdam-canal"
                        }`}
                      >
                        {dish.isSpecialToday ? "★ Featured Special" : "Mark as Special"}
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(dish)}
                          className="p-1.5 rounded-lg text-amsterdam-canal/70 hover:text-jaipur-terracotta hover:bg-cream-parchment transition-colors"
                          title="Edit dish"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDish(dish.id, dish.name)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete dish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: WHAT'S SPECIAL TODAY QUICK TOGGLE DASHBOARD       */}
        {/* ======================================================== */}
        {activeTab === "specials" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-cream-parchment shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-amsterdam-canal">
                "What's Special Today" Showcase Controls
              </h2>
              <p className="text-xs sm:text-sm text-amsterdam-canal/70 mt-1">
                Toggle which creations are highlighted on the homepage banner and top recommendation carousel.
              </p>
            </div>

            {/* Quick Toggle Grid */}
            <div className="bg-white p-6 rounded-3xl border border-cream-parchment shadow-sm divide-y divide-cream-parchment">
              {dishes.map((dish) => (
                <div
                  key={dish.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={dish.photos[0] || "/images/hero-fusion.jpg"}
                      alt={dish.name}
                      className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-base text-amsterdam-canal">
                          {dish.name}
                        </h4>
                        <span className="font-semibold text-xs text-jaipur-terracotta">
                          €{dish.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-amsterdam-canal/60 mt-0.5 line-clamp-1">
                        {dish.descriptionEn}
                      </p>
                      <p className="text-[11px] text-jaipur-dark/70 italic mt-0.5">
                        Category: {dish.category}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleSpecial(dish.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                      dish.isSpecialToday
                        ? "bg-saffron-gold text-amsterdam-canal hover:bg-amber-400 scale-105"
                        : "bg-cream-parchment text-amsterdam-canal/70 hover:bg-cream-warm"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{dish.isSpecialToday ? "Special Today (Active)" : "Set as Special Today"}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CONFIG.YAML & GOOGLE WHITELIST SETTINGS           */}
        {/* ======================================================== */}
        {activeTab === "config" && configForm && (
          <form onSubmit={handleSaveConfig} className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-parchment shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-cream-parchment">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-amsterdam-canal">
                    Configuration & Admin Whitelist (`config.yaml`)
                  </h2>
                  <p className="text-xs sm:text-sm text-amsterdam-canal/70 mt-1">
                    Updates address, phone number, hours, and whitelisted Google accounts saved directly into config.yaml.
                  </p>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-jaipur-terracotta hover:bg-jaipur-rose text-white text-xs sm:text-sm font-semibold shadow-glow transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes to config.yaml</span>
                </button>
              </div>

              {/* Section: Whitelisted Google Users */}
              <div className="mb-8 p-6 rounded-2xl bg-cream-warm border border-saffron-gold/30">
                <h3 className="font-serif text-lg font-bold text-amsterdam-canal mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-jaipur-terracotta" />
                  <span>Whitelisted Google Users (Admin Access)</span>
                </h3>
                <p className="text-xs text-amsterdam-canal/70 mb-4">
                  Only users signing in with these Google email accounts can access this /admin portal.
                </p>

                {/* Whitelist Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {configForm.admin_users.map((email) => (
                    <span
                      key={email}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-cream-parchment text-xs font-mono font-semibold text-amsterdam-canal shadow-sm"
                    >
                      <span>{email}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAdminEmail(email)}
                        className="text-gray-400 hover:text-red-500"
                        title="Remove email"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add new email input */}
                <div className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    placeholder="add.google.user@gmail.com"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-cream-parchment text-xs text-amsterdam-canal focus:outline-none focus:ring-2 focus:ring-jaipur-terracotta/50"
                  />
                  <button
                    type="button"
                    onClick={handleAddAdminEmail}
                    className="px-4 py-2 rounded-xl bg-amsterdam-canal hover:bg-jaipur-dark text-white text-xs font-semibold"
                  >
                    Add Email
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-serif text-base font-bold text-amsterdam-canal mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-jaipur-terracotta" />
                    <span>Restaurant Address</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={configForm.contact.address.street}
                        onChange={(e) =>
                          setConfigForm({
                            ...configForm,
                            contact: {
                              ...configForm.contact,
                              address: { ...configForm.contact.address, street: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-cream-warm border border-cream-parchment text-xs text-amsterdam-canal"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          value={configForm.contact.address.postal_code}
                          onChange={(e) =>
                            setConfigForm({
                              ...configForm,
                              contact: {
                                ...configForm.contact,
                                address: { ...configForm.contact.address, postal_code: e.target.value },
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-cream-warm border border-cream-parchment text-xs text-amsterdam-canal"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={configForm.contact.address.city}
                          onChange={(e) =>
                            setConfigForm({
                              ...configForm,
                              contact: {
                                ...configForm.contact,
                                address: { ...configForm.contact.address, city: e.target.value },
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-cream-warm border border-cream-parchment text-xs text-amsterdam-canal"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone & Communications */}
                <div>
                  <h3 className="font-serif text-base font-bold text-amsterdam-canal mb-4 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-jaipur-terracotta" />
                    <span>Phone & Contact</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={configForm.contact.phone}
                        onChange={(e) =>
                          setConfigForm({
                            ...configForm,
                            contact: { ...configForm.contact, phone: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-cream-warm border border-cream-parchment text-xs text-amsterdam-canal"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        type="text"
                        value={configForm.contact.whatsapp}
                        onChange={(e) =>
                          setConfigForm({
                            ...configForm,
                            contact: { ...configForm.contact, whatsapp: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-cream-warm border border-cream-parchment text-xs text-amsterdam-canal"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={configForm.contact.email}
                        onChange={(e) =>
                          setConfigForm({
                            ...configForm,
                            contact: { ...configForm.contact, email: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-cream-warm border border-cream-parchment text-xs text-amsterdam-canal"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours & Daily Specials Banner */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-cream-parchment">
                <div>
                  <h3 className="font-serif text-base font-bold text-amsterdam-canal mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-saffron-gold" />
                    <span>Opening Hours</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                        Mon – Thu
                      </label>
                      <input
                        type="text"
                        value={configForm.hours.monday_thursday}
                        onChange={(e) =>
                          setConfigForm({
                            ...configForm,
                            hours: { ...configForm.hours, monday_thursday: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-cream-warm border border-cream-parchment text-xs text-amsterdam-canal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                        Fri – Sat
                      </label>
                      <input
                        type="text"
                        value={configForm.hours.friday_saturday}
                        onChange={(e) =>
                          setConfigForm({
                            ...configForm,
                            hours: { ...configForm.hours, friday_saturday: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-cream-warm border border-cream-parchment text-xs text-amsterdam-canal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                        Sunday
                      </label>
                      <input
                        type="text"
                        value={configForm.hours.sunday}
                        onChange={(e) =>
                          setConfigForm({
                            ...configForm,
                            hours: { ...configForm.hours, sunday: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-cream-warm border border-cream-parchment text-xs text-amsterdam-canal"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-base font-bold text-amsterdam-canal mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-jaipur-rose" />
                    <span>Today's Specials Announcement Quote</span>
                  </h3>
                  <div>
                    <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                      Chef's Daily Notice
                    </label>
                    <textarea
                      rows={5}
                      value={configForm.daily_specials.announcement}
                      onChange={(e) =>
                        setConfigForm({
                          ...configForm,
                          daily_specials: {
                            ...configForm.daily_specials,
                            announcement: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream-warm border border-cream-parchment text-xs text-amsterdam-canal leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-cream-parchment flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-jaipur-terracotta hover:bg-jaipur-rose text-white text-sm font-semibold shadow-glow transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes to config.yaml</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </main>

      {/* ======================================================== */}
      {/* MODAL: CREATE / EDIT DISH WITH ANY NUMBER OF PHOTOS      */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 bg-amsterdam-canal/70 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-cream-parchment overflow-hidden z-10 my-8"
            >
              {/* Header */}
              <div className="p-6 border-b border-cream-parchment bg-cream-warm flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-amsterdam-canal">
                    {editingDishId ? "Edit Dish" : "Create New Creation"}
                  </h3>
                  <p className="text-xs text-amsterdam-canal/70 mt-0.5">
                    Configure dish details and upload any number of high-res photos.
                  </p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 rounded-full hover:bg-cream-parchment text-amsterdam-canal/60"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSaveDish} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                {/* Dish Name */}
                <div>
                  <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                    Dish Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Butter Chicken Bitterballen"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream-warm border border-cream-parchment text-sm text-amsterdam-canal focus:outline-none focus:ring-2 focus:ring-jaipur-terracotta/50"
                  />
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as Dish["category"] })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream-warm border border-cream-parchment text-sm text-amsterdam-canal focus:outline-none focus:ring-2 focus:ring-jaipur-terracotta/50"
                    >
                      <option value="street-bites-fusion">Street Bites & Fusion</option>
                      <option value="tandoor-robata">Tandoor & Robata</option>
                      <option value="heritage-curries">Heritage Curries</option>
                      <option value="biryani-breads">Biryani & Breads</option>
                      <option value="desserts-drinks">Desserts & Drinks</option>
                      <option value="merch-pantry">Artisanal Merch & Pantry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                      Price (€ EUR) *
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      required
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream-warm border border-cream-parchment text-sm text-amsterdam-canal focus:outline-none focus:ring-2 focus:ring-jaipur-terracotta/50"
                    />
                  </div>
                </div>

                {/* Spice Level & Special Today */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                      Spice Level (1 Mild – 4 Fiery)
                    </label>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 4].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, spiceLevel: level as Dish["spiceLevel"] })
                          }
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                            formData.spiceLevel === level
                              ? "bg-jaipur-rose text-white border-jaipur-rose shadow-sm"
                              : "bg-cream-warm text-amsterdam-canal/70 border-cream-parchment"
                          }`}
                        >
                          <Flame className="w-3.5 h-3.5" />
                          <span>{level}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isSpecialToday}
                        onChange={(e) =>
                          setFormData({ ...formData, isSpecialToday: e.target.checked })
                        }
                        className="w-4 h-4 text-jaipur-terracotta rounded focus:ring-jaipur-terracotta"
                      />
                      <span className="text-xs font-bold text-amsterdam-canal">
                        Featured in "What's Special Today"
                      </span>
                    </label>
                  </div>
                </div>

                {/* Dietary Tags */}
                <div>
                  <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                    Dietary Designations
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {dietaryChoices.map((diet) => {
                      const selected = formData.dietaryTags.includes(diet);
                      return (
                        <button
                          key={diet}
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              dietaryTags: selected
                                ? formData.dietaryTags.filter((t) => t !== diet)
                                : [...formData.dietaryTags, diet],
                            });
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                            selected
                              ? "bg-peacock text-white shadow-sm"
                              : "bg-cream-warm text-amsterdam-canal/70 border border-cream-parchment"
                          }`}
                        >
                          {diet}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Multi-Photo Upload Area (Upload any number of photos!) */}
                <div className="p-4 rounded-2xl bg-cream-warm border border-dashed border-jaipur-terracotta/40">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-amsterdam-canal uppercase">
                      Dish Photos ({formData.photos.length} uploaded)
                    </label>
                    <span className="text-[11px] text-jaipur-dark">
                      Upload any number of photos
                    </span>
                  </div>

                  {/* Photo Thumbnails Gallery */}
                  {formData.photos.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
                      {formData.photos.map((photo, idx) => (
                        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-cream-parchment shadow-sm">
                          <img src={photo} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(idx)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove photo"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Controls */}
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                    <label className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-cream-parchment hover:border-jaipur-terracotta text-xs font-semibold text-amsterdam-canal cursor-pointer shadow-sm hover:shadow transition-all">
                      <Upload className="w-4 h-4 text-jaipur-terracotta" />
                      <span>{uploadingPhotos ? "Uploading photos..." : "Choose & Upload Photos"}</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        disabled={uploadingPhotos}
                      />
                    </label>

                    <div className="flex gap-1.5 flex-1">
                      <input
                        type="url"
                        value={customPhotoUrl}
                        onChange={(e) => setCustomPhotoUrl(e.target.value)}
                        placeholder="Or paste photo URL..."
                        className="flex-1 px-3 py-2 rounded-xl bg-white border border-cream-parchment text-xs text-amsterdam-canal"
                      />
                      <button
                        type="button"
                        onClick={handleAddPhotoUrl}
                        className="px-3 py-2 rounded-xl bg-cream-parchment hover:bg-cream text-xs font-semibold text-amsterdam-canal"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* English Description */}
                <div>
                  <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                    English Culinary Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.descriptionEn}
                    onChange={(e) =>
                      setFormData({ ...formData, descriptionEn: e.target.value })
                    }
                    placeholder="Crisp golden Dutch bitterballen stuffed with slow-braised pulled tandoori chicken..."
                    className="w-full px-3.5 py-2 rounded-xl bg-cream-warm border border-cream-parchment text-xs text-amsterdam-canal leading-relaxed"
                  />
                </div>

                {/* Dutch Description */}
                <div>
                  <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                    Dutch Description (Nederlandse Beschrijving)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.descriptionNl}
                    onChange={(e) =>
                      setFormData({ ...formData, descriptionNl: e.target.value })
                    }
                    placeholder="Krokante gouden bitterballen gevuld met pulled butter chicken..."
                    className="w-full px-3.5 py-2 rounded-xl bg-cream-warm border border-cream-parchment text-xs text-amsterdam-canal leading-relaxed"
                  />
                </div>

                {/* Recommended Drink Pairing */}
                <div>
                  <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                    Recommended Drink Pairing
                  </label>
                  <input
                    type="text"
                    value={formData.pairingDrink}
                    onChange={(e) =>
                      setFormData({ ...formData, pairingDrink: e.target.value })
                    }
                    placeholder="e.g. Damrak Mango Lassi G&T, or Delft Blue White Wine"
                    className="w-full px-3.5 py-2 rounded-xl bg-cream-warm border border-cream-parchment text-xs text-amsterdam-canal"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="pt-4 border-t border-cream-parchment flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold text-amsterdam-canal/70 hover:bg-cream-warm"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-jaipur-terracotta hover:bg-jaipur-rose text-white text-xs font-semibold shadow-glow transition-all"
                  >
                    {editingDishId ? "Update Dish" : "Create Dish"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
