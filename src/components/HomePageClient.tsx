"use client";

import React, { useState } from "react";
import { Dish, RestaurantConfig } from "@/types";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { SpecialsToday } from "./SpecialsToday";
import { MenuSection } from "./MenuSection";
import { FusionStory } from "./FusionStory";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";
import { ImageLightbox } from "./ImageLightbox";

interface HomePageClientProps {
  initialDishes: Dish[];
  config: RestaurantConfig;
}

export function HomePageClient({ initialDishes, config }: HomePageClientProps) {
  const [dishes] = useState<Dish[]>(initialDishes);

  // Lightbox State
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: string[];
    currentIndex: number;
    title: string;
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: "",
  });

  const handleOpenLightbox = (images: string[], index: number, title: string) => {
    setLightbox({
      isOpen: true,
      images,
      currentIndex: index,
      title,
    });
  };

  const handleCloseLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const handleNavigateLightbox = (index: number) => {
    setLightbox((prev) => ({ ...prev, currentIndex: index }));
  };

  const specials = dishes.filter((d) => d.isSpecialToday && d.isAvailable);

  return (
    <div className="min-h-screen flex flex-col bg-cream text-amsterdam-canal selection:bg-jaipur-terracotta selection:text-white">
      {/* Navigation with Direct WhatsApp CTA */}
      <Navbar whatsappNumber={config.contact.whatsapp} />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero />

        {/* What's Special Today Showcase */}
        <SpecialsToday
          specials={specials}
          config={config}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Full Interactive Menu & Merch Catalog with Direct WhatsApp Order */}
        <MenuSection
          dishes={dishes}
          onOpenLightbox={handleOpenLightbox}
          whatsappNumber={config.contact.whatsapp}
        />

        {/* Cultural & Architectural Fusion Story */}
        <FusionStory />

        {/* Contact, Address, Hours & Table Booking */}
        <ContactSection config={config} />
      </main>

      {/* Footer */}
      <Footer config={config} />

      {/* Full-Screen Multi-Photo Lightbox */}
      <ImageLightbox
        isOpen={lightbox.isOpen}
        images={lightbox.images}
        currentIndex={lightbox.currentIndex}
        title={lightbox.title}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigateLightbox}
      />
    </div>
  );
}
