import React from "react";
import Link from "next/link";
import { RestaurantConfig } from "@/types";
import { ShieldCheck, Heart, MapPin, Phone, Mail } from "lucide-react";
import { CuspedGableDivider } from "./CuspedGableDivider";

interface FooterProps {
  config: RestaurantConfig;
}

export function Footer({ config }: FooterProps) {
  return (
    <footer className="bg-amsterdam-canal text-cream relative pt-12 overflow-hidden">
      {/* Top architectural inverted divider */}
      <div className="w-full mb-10">
        <CuspedGableDivider fillColor="#FDFBF7" invert={true} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-jaipur-terracotta flex items-center justify-center font-serif font-bold text-white text-lg shadow-glow">
                DD
              </div>
              <span className="font-serif text-2xl font-bold tracking-wide text-cream">
                {config.restaurant.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-cream-parchment/75 leading-relaxed">
              {config.restaurant.tagline}. An exquisite culinary fusion of India's royal culinary heritage and Dutch hospitality.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-cream tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-cream-parchment/80">
              <li>
                <a href="#menu" className="hover:text-saffron-gold transition-colors">
                  Our Menu & Creations
                </a>
              </li>
              <li>
                <a href="#specials" className="hover:text-saffron-gold transition-colors">
                  Today's Chef Specials
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-saffron-gold transition-colors">
                  The Indian & Amsterdam Tale
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-saffron-gold transition-colors">
                  Table Reservations
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-cream tracking-wide">
              Contact & Hours
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-cream-parchment/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-jaipur-terracotta flex-shrink-0 mt-0.5" />
                <span>{config.contact.address.street}, {config.contact.address.city}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-jaipur-terracotta flex-shrink-0" />
                <a href={`tel:${config.contact.phone}`} className="hover:text-saffron-gold">
                  {config.contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-jaipur-terracotta flex-shrink-0" />
                <a href={`mailto:${config.contact.email}`} className="hover:text-saffron-gold">
                  {config.contact.email}
                </a>
              </p>
              <p className="text-xs text-saffron-gold pt-1">
                Mon–Thu: {config.hours.monday_thursday} | Fri–Sat: {config.hours.friday_saturday}
              </p>
            </div>
          </div>

          {/* Col 4: Admin Portal & Management */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-cream tracking-wide">
              Management Portal
            </h4>
            <p className="text-xs text-cream-parchment/70 leading-relaxed">
              Authorized restaurant staff and whitelisted Google accounts can manage dishes, daily specials, and contact information.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cream/10 hover:bg-jaipur-terracotta text-cream text-xs font-semibold border border-cream/20 transition-all duration-200 mt-2"
            >
              <ShieldCheck className="w-4 h-4 text-saffron-gold" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-parchment/60 gap-4">
          <p>
            © {new Date().getFullYear()} {config.restaurant.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-jaipur-rose fill-current" /> in Amsterdam & India
          </p>
        </div>
      </div>
    </footer>
  );
}
