"use client";

import React, { useState } from "react";
import { RestaurantConfig } from "@/types";
import { MapPin, Phone, Clock, Send, CheckCircle2, MessageCircle } from "lucide-react";

interface ContactSectionProps {
  config: RestaurantConfig;
}

export function ContactSection({ config }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "19:00",
    guests: "2",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-jaipur-terracotta uppercase">
            Reservations & Location
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-amsterdam-canal mt-2">
            Visit Us on Prinsengracht
          </h2>
          <p className="text-sm sm:text-base text-amsterdam-canal/70 mt-3">
            Experience candlelit canal-side dining or book your private royal feast.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info & Opening Hours Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address & Direct Actions */}
            <div className="p-7 rounded-3xl bg-white border border-cream-parchment shadow-sm">
              <h3 className="font-serif text-xl font-bold text-amsterdam-canal mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-jaipur-terracotta" />
                <span>Our Address</span>
              </h3>
              <p className="text-amsterdam-canal/80 text-sm leading-relaxed">
                <strong>{config.restaurant.name}</strong><br />
                {config.contact.address.street}<br />
                {config.contact.address.postal_code} {config.contact.address.city}, {config.contact.address.country}<br />
                <span className="text-xs text-jaipur-terracotta font-medium mt-1 inline-block">
                  {config.contact.address.neighborhood}
                </span>
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <a
                  href={config.contact.address.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cream-warm hover:bg-cream-parchment text-xs font-semibold text-amsterdam-canal border border-cream-parchment transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-jaipur-terracotta" />
                  <span>Google Maps</span>
                </a>

                <a
                  href={`tel:${config.contact.phone}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-jaipur-terracotta hover:bg-jaipur-rose text-xs font-semibold text-white transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{config.contact.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${config.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white transition-colors shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="p-7 rounded-3xl bg-white border border-cream-parchment shadow-sm">
              <h3 className="font-serif text-xl font-bold text-amsterdam-canal mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-saffron-gold" />
                <span>Opening Hours</span>
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-cream-parchment pb-2">
                  <span className="text-amsterdam-canal/70">Monday – Thursday</span>
                  <span className="font-semibold text-amsterdam-canal">{config.hours.monday_thursday}</span>
                </div>
                <div className="flex justify-between border-b border-cream-parchment pb-2">
                  <span className="text-amsterdam-canal/70">Friday – Saturday</span>
                  <span className="font-semibold text-amsterdam-canal">{config.hours.friday_saturday}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-amsterdam-canal/70">Sunday</span>
                  <span className="font-semibold text-amsterdam-canal">{config.hours.sunday}</span>
                </div>
                <p className="text-xs text-jaipur-dark/70 italic pt-2">
                  *{config.hours.note}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Table Reservation Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-cream-parchment shadow-card">
            <h3 className="font-serif text-2xl font-bold text-amsterdam-canal mb-2">
              Reserve a Table
            </h3>
            <p className="text-xs sm:text-sm text-amsterdam-canal/70 mb-6">
              Book your lunch, canal-side terrace seating, or evening tasting menu.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-cream-warm rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-serif text-xl font-bold text-amsterdam-canal">
                  Dank je wel, {formData.name || "Guest"}!
                </h4>
                <p className="text-sm text-amsterdam-canal/70 mt-2 max-w-md mx-auto">
                  We have received your reservation request for <strong>{formData.guests} guests</strong> on{" "}
                  <strong>{formData.date || "your requested date"}</strong> at{" "}
                  <strong>{formData.time}</strong>. We will confirm via WhatsApp or email shortly!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 rounded-full bg-jaipur-terracotta text-white text-xs font-semibold"
                >
                  Make another booking
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sanne van Dijk"
                      className="w-full px-4 py-2.5 rounded-xl bg-cream-warm border border-cream-parchment text-sm text-amsterdam-canal focus:outline-none focus:ring-2 focus:ring-jaipur-terracotta/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+31 6 1234 5678"
                      className="w-full px-4 py-2.5 rounded-xl bg-cream-warm border border-cream-parchment text-sm text-amsterdam-canal focus:outline-none focus:ring-2 focus:ring-jaipur-terracotta/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-cream-warm border border-cream-parchment text-sm text-amsterdam-canal focus:outline-none focus:ring-2 focus:ring-jaipur-terracotta/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                      Time *
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-cream-warm border border-cream-parchment text-sm text-amsterdam-canal focus:outline-none focus:ring-2 focus:ring-jaipur-terracotta/50"
                    >
                      <option value="12:30">12:30 (Lunch)</option>
                      <option value="13:30">13:30 (Lunch)</option>
                      <option value="17:30">17:30 (Early Dinner)</option>
                      <option value="18:30">18:30 (Dinner)</option>
                      <option value="19:30">19:30 (Prime Dinner)</option>
                      <option value="20:30">20:30 (Late Dinner)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                      Guests *
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-cream-warm border border-cream-parchment text-sm text-amsterdam-canal focus:outline-none focus:ring-2 focus:ring-jaipur-terracotta/50"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="7+">7+ (Group booking)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                    Special Requests (Dietary, Canal View, Birthday)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="E.g. We love spicy food, terrace canal seating preferred, vegetarian options."
                    className="w-full px-4 py-2.5 rounded-xl bg-cream-warm border border-cream-parchment text-sm text-amsterdam-canal focus:outline-none focus:ring-2 focus:ring-jaipur-terracotta/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-jaipur-terracotta hover:bg-jaipur-rose text-white font-semibold text-sm shadow-glow transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirm Reservation Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
