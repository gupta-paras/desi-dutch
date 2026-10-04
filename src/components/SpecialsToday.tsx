"use client";

import React from "react";
import { Dish, RestaurantConfig } from "@/types";
import { Sparkles } from "lucide-react";
import { DishCard } from "./DishCard";
import { motion } from "framer-motion";

interface SpecialsTodayProps {
  specials: Dish[];
  config: RestaurantConfig;
  onOpenLightbox?: (images: string[], index: number, title: string) => void;
}

export function SpecialsToday({
  specials,
  config,
  onOpenLightbox,
}: SpecialsTodayProps) {
  if (specials.length === 0) return null;

  return (
    <section id="specials" className="py-16 sm:py-24 bg-cream relative overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-10 right-0 w-96 h-96 rounded-full bg-saffron/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 rounded-full bg-jaipur-terracotta/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading & Daily Quote Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-gold/20 text-jaipur-dark font-medium text-xs sm:text-sm tracking-widest uppercase mb-4 border border-saffron-gold/40">
            <Sparkles className="w-4 h-4 text-jaipur-rose" />
            <span>{config.daily_specials?.title || "Vandaag's Specialiteit"}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-amsterdam-canal tracking-tight">
            Today's Royal Feature
          </h2>

          {/* Daily Chef's Announcement Quote */}
          {config.daily_specials?.announcement && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 p-5 sm:p-6 rounded-2xl bg-cream-warm border border-saffron-gold/30 shadow-sm relative"
            >
              <div className="font-serif italic text-amsterdam-canal/80 text-sm sm:text-base leading-relaxed">
                “{config.daily_specials.announcement}”
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-jaipur-terracotta uppercase tracking-wider">
                <span>Chef's Daily Selection</span>
                <span>•</span>
                <span>Order directly via WhatsApp</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Featured Specials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {specials.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onOpenLightbox={onOpenLightbox}
              whatsappNumber={config.contact.whatsapp}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
