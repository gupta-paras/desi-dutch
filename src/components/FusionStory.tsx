"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles } from "lucide-react";

export function FusionStory() {
  const fusionPillars = [
    {
      title: "Royal Sandstone & Canal Brick",
      description:
        "The warm, rose-tinted terracotta arches of historic Indian palaces find their twin soul in the weathered 17th-century red bricks of Amsterdam's historic canal belt.",
      indiaAspect: "Royal Sandstone & Ornate Archways",
      amsterdamAspect: "Prinsengracht Stepped Gables",
    },
    {
      title: "Authentic Tandoor & Dutch Comfort",
      description:
        "We marry intense 400°C clay-oven heat and fragrant Indian spice masalas with beloved Dutch comfort foods — creating Butter Chicken Bitterballen and Truffle Gouda Naan.",
      indiaAspect: "Clay Tandoors & Rich Spices",
      amsterdamAspect: "Aged Gouda & Crisp Bitterballen",
    },
    {
      title: "Sacred Hospitality & Dutch Gezelligheid",
      description:
        "India's timeless philosophy of soulful hospitality ('Atithi Devo Bhava') blends effortlessly with the Dutch essence of 'Gezelligheid' — warm, candlelit, joyful togetherness.",
      indiaAspect: "Warm Indian Hospitality",
      amsterdamAspect: "Amsterdam Cozy Gezelligheid",
    },
  ];

  return (
    <section id="story" className="py-20 sm:py-28 bg-amsterdam-canal text-cream relative overflow-hidden">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 opacity-5 pattern-brick-lattice pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/10 text-saffron-gold text-xs sm:text-sm font-medium tracking-widest uppercase mb-4 border border-saffron-gold/30">
            <Compass className="w-4 h-4 text-jaipur-terracotta" />
            <span>The Fusion Story</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream">
            Indian Heritage Meets Amsterdam Canals
          </h2>

          <p className="mt-4 text-base sm:text-lg text-cream-parchment/80 leading-relaxed font-normal">
            Desi Dutch was born from a romantic culinary vision: what happens when thousands of miles of vibrant spice routes converge on a candlelit canal house terrace in Amsterdam?
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fusionPillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative p-7 rounded-3xl bg-cream/5 border border-cream/10 hover:border-jaipur-terracotta/40 backdrop-blur-sm flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                {/* Icon header */}
                <div className="w-12 h-12 rounded-2xl bg-jaipur-terracotta/20 border border-jaipur-terracotta/30 flex items-center justify-center text-saffron-gold mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-jaipur-terracotta" />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream mb-3">
                  {pillar.title}
                </h3>

                <p className="text-sm text-cream-parchment/75 leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              {/* Cultural Harmony Badge */}
              <div className="pt-4 border-t border-cream/10 flex flex-col gap-1.5 text-xs">
                <div className="flex items-center justify-between text-saffron-gold">
                  <span className="font-semibold">India:</span>
                  <span className="text-cream/90">{pillar.indiaAspect}</span>
                </div>
                <div className="flex items-center justify-between text-delft-blue">
                  <span className="font-semibold text-sky-400">Amsterdam:</span>
                  <span className="text-cream/90">{pillar.amsterdamAspect}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Signature Quote Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-jaipur-terracotta/20 via-cream/5 to-peacock/20 border border-cream/15 text-center max-w-4xl mx-auto">
          <p className="font-serif italic text-lg sm:text-xl text-cream-parchment">
            “Food is the swiftest bridge between India and North Holland. At Desi Dutch, you taste centuries of silk and spice with every bite.”
          </p>
          <p className="mt-3 text-xs tracking-widest text-saffron-gold uppercase font-semibold">
            The Amsterdam Culinary Brigade
          </p>
        </div>
      </div>
    </section>
  );
}
