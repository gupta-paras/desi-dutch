"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ShieldCheck, Menu as MenuIcon, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  whatsappNumber?: string;
}

export function Navbar({ whatsappNumber = "+31 6 1234 5678" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cleanWhatsApp = whatsappNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
    "Hallo Desi Dutch! 👋 I would like to inquire about ordering / reserving from your catalog."
  )}`;

  const navLinks = [
    { name: "Catalog & Merch", href: "#menu" },
    { name: "Today's Specials", href: "#specials" },
    { name: "Our Fusion Story", href: "#story" },
    { name: "Contact & Location", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-cream-parchment"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Tagline */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-jaipur-terracotta to-jaipur-rose flex items-center justify-center shadow-glow text-white font-serif font-bold text-lg sm:text-xl border border-white/40">
              <span className="tracking-tighter">DD</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-black text-amsterdam-canal tracking-wide group-hover:text-jaipur-terracotta transition-colors">
                  Desi Dutch
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-saffron-gold inline-block" />
              </div>
              <p className="text-[10px] sm:text-xs text-jaipur-dark/80 font-medium tracking-wider uppercase hidden sm:block">
                Indian Cuisine & Amsterdam Canals
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-amsterdam-canal/80 hover:text-jaipur-terracotta transition-colors relative py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Direct WhatsApp Order CTA Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp</span>
            </a>

            {/* Admin Portal Link */}
            <Link
              href="/admin"
              className="p-2.5 rounded-full text-amsterdam-canal/70 hover:text-jaipur-terracotta hover:bg-cream-parchment transition-all"
              title="Admin Portal"
            >
              <ShieldCheck className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-amsterdam-canal hover:bg-cream-parchment"
              aria-label="Open mobile navigation"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-amsterdam-canal/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-cream p-6 shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-cream-parchment">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-jaipur-terracotta text-white flex items-center justify-center font-serif font-bold text-sm">
                      DD
                    </div>
                    <span className="font-serif font-bold text-lg text-amsterdam-canal">
                      Desi Dutch
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-cream-parchment text-amsterdam-canal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav Links */}
                <div className="mt-8 flex flex-col gap-5">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif text-lg text-amsterdam-canal hover:text-jaipur-terracotta transition-colors py-1"
                    >
                      {link.name}
                    </a>
                  ))}
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 font-serif text-lg text-amsterdam-canal/80 hover:text-jaipur-terracotta transition-colors py-1"
                  >
                    <ShieldCheck className="w-5 h-5 text-jaipur-terracotta" />
                    <span>Admin Portal</span>
                  </Link>
                </div>
              </div>

              {/* Bottom Quick Contact */}
              <div className="pt-6 border-t border-cream-parchment space-y-2">
                <p className="text-xs text-amsterdam-canal/60">Prinsengracht 412, Amsterdam</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-emerald-600 text-white font-semibold text-sm shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
