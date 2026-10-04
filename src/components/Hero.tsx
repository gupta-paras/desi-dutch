"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, UtensilsCrossed } from "lucide-react";
import { CuspedGableDivider } from "./CuspedGableDivider";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-0 overflow-hidden bg-amsterdam-canal text-cream">
      {/* Background Hero Image with Seamless Vignette Blend */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-fusion.jpg"
          alt="Desi Dutch Indian and Amsterdam fusion fine dining"
          className="w-full h-full object-cover object-center opacity-40 sm:opacity-50 scale-105"
        />
        {/* Soft Radial & Linear Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-amsterdam-canal via-amsterdam-canal/70 to-amsterdam-canal/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-amsterdam-canal/90 via-transparent to-amsterdam-canal/80" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto py-12 flex flex-col items-center text-center">
        {/* Top Tag Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/10 border border-saffron-gold/40 backdrop-blur-md mb-6 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-saffron-gold animate-pulse-slow" />
          <span className="text-xs sm:text-sm font-medium tracking-widest text-saffron-gold uppercase">
            Indian Heritage & Amsterdam Canals
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-cream max-w-4xl leading-[1.15]"
        >
          Royal Indian Flavours,{" "}
          <span className="italic font-normal text-jaipur-terracotta underline decoration-saffron-gold/40 underline-offset-8">
            Amsterdam
          </span>{" "}
          Warmth & Charm.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 text-base sm:text-xl text-cream-parchment/90 max-w-2xl font-normal leading-relaxed"
        >
          Where rich Indian culinary tradition meets beloved Dutch gastronomic icons.
          From crisp Butter Chicken Bitterballen to wood-fired Old Amsterdam Truffle Naan on Prinsengracht.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-jaipur-terracotta hover:bg-jaipur-rose text-white font-semibold text-base shadow-glow hover:scale-105 transition-all duration-300"
          >
            <UtensilsCrossed className="w-5 h-5" />
            <span>Explore The Menu</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <a
            href="#specials"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-cream/15 hover:bg-cream/25 border border-cream/30 text-cream font-semibold text-base backdrop-blur-md transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-saffron-gold" />
            <span>Today's Specials</span>
          </a>
        </motion.div>

        {/* Micro-Features Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12 pt-8 border-t border-cream/10 text-center"
        >
          <div>
            <p className="font-serif text-2xl font-bold text-saffron-gold">100%</p>
            <p className="text-xs text-cream/70 tracking-wide uppercase mt-1">Halal Certified Meats</p>
          </div>
          <div>
            <p className="font-serif text-2xl font-bold text-saffron-gold">Prinsengracht</p>
            <p className="text-xs text-cream/70 tracking-wide uppercase mt-1">Canal-side Terrace</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="font-serif text-2xl font-bold text-saffron-gold">400°C</p>
            <p className="text-xs text-cream/70 tracking-wide uppercase mt-1">Charcoal Clay Tandoor</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Architectural Transition: Cusped Gable Arch Divider */}
      <div className="relative z-10 w-full mt-auto">
        <CuspedGableDivider fillColor="#FDFBF7" />
      </div>
    </section>
  );
}
