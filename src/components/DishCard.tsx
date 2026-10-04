"use client";

import React, { useState } from "react";
import { Dish } from "@/types";
import { Flame, Sparkles, MessageCircle, Eye, ChevronLeft, ChevronRight, GlassWater } from "lucide-react";
import { motion } from "framer-motion";

interface DishCardProps {
  dish: Dish;
  onOpenLightbox?: (images: string[], index: number, title: string) => void;
  whatsappNumber?: string;
}

export function DishCard({ dish, onOpenLightbox, whatsappNumber = "+31 6 1234 5678" }: DishCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);

  const photos = dish.photos && dish.photos.length > 0
    ? dish.photos
    : ["https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80"];

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Direct WhatsApp order link
  const handleOrderWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
    const message = `Hallo Desi Dutch! 👋\nI would like to order:\n• ${dish.name} (€${dish.price.toFixed(2)})\n\nIs it available for pickup / delivery today? Dank je wel!`;
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-cream-parchment/60 hover:border-jaipur-terracotta/40 shadow-sm hover:shadow-card transition-all duration-300"
    >
      {/* Top Image Section with Jaipur Arch Frame & Soft Gradient Blend */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-cream-warm">
        {/* The Blended Dish Image */}
        <img
          src={photos[photoIndex]}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Seamless Blend Vignette & Gradient into Card Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

        {/* Special Today Gold Badge */}
        {dish.isSpecialToday && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-gold text-amsterdam-canal font-medium text-xs shadow-md tracking-wider uppercase backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amsterdam-canal fill-current animate-pulse-slow" />
            <span>Special Today</span>
          </div>
        )}

        {/* Multi-Photo Carousel Controls if more than 1 image */}
        {photos.length > 1 && (
          <>
            <button
              onClick={handlePrevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-jaipur-terracotta text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-jaipur-terracotta text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-black/40 backdrop-blur-sm">
              {photos.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === photoIndex ? "w-3 bg-saffron-gold" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Quick View / Lightbox Icon Button */}
        {onOpenLightbox && (
          <button
            onClick={() => onOpenLightbox(photos, photoIndex, dish.name)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-jaipur-terracotta text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-all shadow-sm"
            title="Inspect photos in detail"
            aria-label="View photo in lightbox"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}

        {/* Price Floating Pill */}
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-amsterdam-canal/80 backdrop-blur-md text-saffron-gold font-serif font-bold text-base shadow-sm">
          €{dish.price.toFixed(2)}
        </div>
      </div>

      {/* Card Content Section */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Header Row: Title & Spice Meter */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-serif font-bold text-lg text-amsterdam-canal group-hover:text-jaipur-terracotta transition-colors leading-snug">
              {dish.name}
            </h3>

            {/* Spice Meter */}
            <div
              className="flex items-center gap-0.5 flex-shrink-0 pt-1"
              title={`Spice Level: ${dish.spiceLevel} of 4`}
            >
              {[1, 2, 3, 4].map((level) => (
                <Flame
                  key={level}
                  className={`w-3.5 h-3.5 ${
                    level <= dish.spiceLevel
                      ? "text-jaipur-rose fill-jaipur-rose"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Dutch Description */}
          {dish.descriptionNl && (
            <p className="text-xs text-jaipur-dark/80 italic font-serif mb-1 line-clamp-2">
              "{dish.descriptionNl}"
            </p>
          )}

          {/* English Description */}
          <p className="text-sm text-amsterdam-canal/75 leading-relaxed line-clamp-3 mb-4">
            {dish.descriptionEn}
          </p>

          {/* Pairing Drink Note if available */}
          {dish.pairingDrink && (
            <div className="flex items-center gap-1.5 text-xs text-peacock-light mb-3 bg-delft-ice/70 px-2.5 py-1 rounded-md">
              <GlassWater className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">Pair with: <strong className="text-peacock">{dish.pairingDrink}</strong></span>
            </div>
          )}
        </div>

        {/* Footer Row: Dietary Tags & WhatsApp Order Action */}
        <div className="pt-3 border-t border-cream-parchment/70 flex items-center justify-between gap-2">
          {/* Dietary Badges */}
          <div className="flex flex-wrap gap-1">
            {dish.dietaryTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-cream-parchment text-amsterdam-canal/80 border border-cream-parchment"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Direct WhatsApp Order Button */}
          <button
            onClick={handleOrderWhatsApp}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow transition-all duration-200"
            title="Order this creation via WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Order</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
