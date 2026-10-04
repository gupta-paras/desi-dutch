"use client";

import React, { useState, useMemo } from "react";
import { Dish } from "@/types";
import { MENU_CATEGORIES } from "@/data/initialDishes";
import { DishCard } from "./DishCard";
import { Search, Sparkles, X, Utensils, Flame, Crown, Wheat, Wine, ShoppingBag } from "lucide-react";

interface MenuSectionProps {
  dishes: Dish[];
  onOpenLightbox?: (images: string[], index: number, title: string) => void;
  whatsappNumber?: string;
}

export function MenuSection({ dishes, onOpenLightbox, whatsappNumber }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [specialsOnly, setSpecialsOnly] = useState<boolean>(false);
  const [maxSpice, setMaxSpice] = useState<number>(4);

  // Available dietary & merch tags
  const dietaryOptions = ["Vegetarian", "Vegan", "Halal", "Gluten-Free", "Merchandise", "Pantry"];

  const toggleDietary = (tag: string) => {
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Filtered Dishes
  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      // Category filter
      if (selectedCategory !== "all" && dish.category !== selectedCategory) {
        return false;
      }
      // Specials filter
      if (specialsOnly && !dish.isSpecialToday) {
        return false;
      }
      // Spice level filter
      if (dish.spiceLevel > maxSpice) {
        return false;
      }
      // Dietary filter (must have all selected tags)
      if (selectedDietary.length > 0) {
        const matchesAll = selectedDietary.every((tag) =>
          dish.dietaryTags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
        );
        if (!matchesAll) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inName = dish.name.toLowerCase().includes(query);
        const inEn = dish.descriptionEn.toLowerCase().includes(query);
        const inNl = dish.descriptionNl?.toLowerCase().includes(query) || false;
        const inDrink = dish.pairingDrink?.toLowerCase().includes(query) || false;
        if (!inName && !inEn && !inNl && !inDrink) return false;
      }
      return true;
    });
  }, [dishes, selectedCategory, specialsOnly, maxSpice, selectedDietary, searchQuery]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Flame":
        return <Flame className="w-4 h-4" />;
      case "Crown":
        return <Crown className="w-4 h-4" />;
      case "Wheat":
        return <Wheat className="w-4 h-4" />;
      case "Wine":
        return <Wine className="w-4 h-4" />;
      case "ShoppingBag":
        return <ShoppingBag className="w-4 h-4" />;
      case "Sparkles":
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Utensils className="w-4 h-4" />;
    }
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-cream-warm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-jaipur-terracotta uppercase">
            Artisanal Dining & Boutique Merch
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-amsterdam-canal mt-2">
            The Desi Dutch Catalog
          </h2>
          <p className="text-sm sm:text-base text-amsterdam-canal/70 mt-3">
            Click 'Order' on any creation to message our kitchen or boutique staff directly via WhatsApp.
          </p>
        </div>

        {/* Category Tabs (Desktop & Mobile Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 mb-8 no-scrollbar scroll-smooth">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? "bg-jaipur-terracotta text-white shadow-glow"
                    : "bg-white text-amsterdam-canal/80 hover:bg-cream-parchment border border-cream-parchment"
                }`}
              >
                {getCategoryIcon(cat.iconName)}
                <span>{cat.nameEn}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Dietary Filters Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 mb-10 border border-cream-parchment shadow-sm">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-amsterdam-canal/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, bitterballen, naan, tiffin, aprons..."
                className="w-full pl-11 pr-9 py-2.5 rounded-2xl bg-cream-warm text-sm text-amsterdam-canal focus:outline-none focus:ring-2 focus:ring-jaipur-terracotta/50 border border-cream-parchment"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-amsterdam-canal/40 hover:text-amsterdam-canal"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary Tags & Specials Filter */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Special Today Toggle */}
              <button
                onClick={() => setSpecialsOnly(!specialsOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  specialsOnly
                    ? "bg-saffron-gold text-amsterdam-canal shadow-sm"
                    : "bg-cream-parchment text-amsterdam-canal/70 hover:bg-cream"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Today's Specials</span>
              </button>

              {/* Dietary Options */}
              {dietaryOptions.map((tag) => {
                const active = selectedDietary.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleDietary(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      active
                        ? "bg-peacock text-white shadow-sm"
                        : "bg-cream-parchment text-amsterdam-canal/70 hover:bg-cream"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Counter & Clear Filter */}
        <div className="flex items-center justify-between mb-6 text-xs text-amsterdam-canal/60">
          <span>Showing <strong>{filteredDishes.length}</strong> catalog items</span>
          {(selectedCategory !== "all" || specialsOnly || selectedDietary.length > 0 || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSpecialsOnly(false);
                setSelectedDietary([]);
                setSearchQuery("");
              }}
              className="text-jaipur-rose hover:underline font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onOpenLightbox={onOpenLightbox}
                whatsappNumber={whatsappNumber}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-cream-parchment p-8">
            <Utensils className="w-10 h-10 mx-auto text-amsterdam-canal/30 mb-3" />
            <h3 className="font-serif text-xl font-bold text-amsterdam-canal mb-1">
              No creations found
            </h3>
            <p className="text-sm text-amsterdam-canal/70 max-w-sm mx-auto">
              Try adjusting your search or filtering options to explore more dishes.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
