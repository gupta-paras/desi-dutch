"use client";

import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  title?: string;
}

export function ImageLightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
  title,
}: LightboxProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % images.length);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-amsterdam-canal/90 backdrop-blur-md p-4"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-3 rounded-full bg-cream/10 text-cream hover:bg-cream/25 hover:text-white transition-all z-50"
          aria-label="Close image viewer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div
          className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="mb-3 text-center">
              <h3 className="font-serif text-xl sm:text-2xl text-cream font-semibold tracking-wide">
                {title}
              </h3>
              <p className="text-saffron-gold text-xs sm:text-sm mt-1">
                Photo {currentIndex + 1} of {images.length}
              </p>
            </div>
          )}

          <div className="relative w-full h-[60vh] max-h-[600px] flex items-center justify-center overflow-hidden rounded-2xl border border-cream/20 shadow-2xl bg-black/40">
            {/* Main Image */}
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={images[currentIndex]}
              alt={title || "Dish photo"}
              className="max-h-full max-w-full object-contain rounded-xl"
            />

            {/* Left Nav */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((currentIndex - 1 + images.length) % images.length);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white hover:bg-jaipur-terracotta transition-colors shadow-lg"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Right Nav */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((currentIndex + 1) % images.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white hover:bg-jaipur-terracotta transition-colors shadow-lg"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto max-w-full py-1 px-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(idx);
                  }}
                  className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    idx === currentIndex
                      ? "border-jaipur-terracotta scale-105 shadow-glow"
                      : "border-cream/30 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
