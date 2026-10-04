import fs from "fs";
import path from "path";
import yaml from "yaml";
import { RestaurantConfig } from "@/types";

const defaultConfig: RestaurantConfig = {
  restaurant: {
    name: "Desi Dutch",
    tagline: "Where the Pink City of Jaipur meets the Canals of Amsterdam",
    dutch_tagline: "Koninklijke Indiase Gastronomie ontmoet Amsterdamse Gezelligheid",
    currency: "EUR",
    currency_symbol: "€",
  },
  contact: {
    address: {
      street: "Prinsengracht 412",
      postal_code: "1016 JA",
      city: "Amsterdam",
      country: "The Netherlands",
      neighborhood: "Nine Streets (De Negen Straatjes)",
      google_maps_url: "https://maps.google.com/?q=Prinsengracht+412,+1016+JA+Amsterdam",
    },
    phone: "+31 20 789 4521",
    whatsapp: "+31 6 1234 5678",
    email: "info@desidutch.nl",
    reservations_email: "reservations@desidutch.nl",
  },
  hours: {
    monday_thursday: "12:00 - 22:30",
    friday_saturday: "12:00 - 23:30",
    sunday: "12:30 - 22:00",
    note: "Kitchen closes 30 minutes before closing time",
  },
  admin_users: [
    "admin@desidutch.nl",
    "paras@desidutch.nl",
    "owner@desidutch.nl",
    "manager@desidutch.nl",
  ],
  daily_specials: {
    title: "Vandaag's Koninklijke Selectie | Chef's Specials Today",
    announcement:
      "From the pink stone tandoors of Jaipur to the tranquil waters of Prinsengracht — today our Head Chef presents crisp Butter Chicken Bitterballen and wood-fired Truffle & Old Amsterdam Naan. Welkom & Padharo!",
  },
  social: {
    instagram: "https://instagram.com/desidutch.amsterdam",
    facebook: "https://facebook.com/desidutch",
    tripadvisor: "https://tripadvisor.com",
  },
};

export function getConfigFilePath(): string {
  return path.join(process.cwd(), "config.yaml");
}

export function getRestaurantConfig(): RestaurantConfig {
  try {
    const filePath = getConfigFilePath();
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const parsed = yaml.parse(fileContent);
      return {
        ...defaultConfig,
        ...parsed,
        restaurant: { ...defaultConfig.restaurant, ...(parsed?.restaurant || {}) },
        contact: {
          ...defaultConfig.contact,
          ...(parsed?.contact || {}),
          address: {
            ...defaultConfig.contact.address,
            ...(parsed?.contact?.address || {}),
          },
        },
        hours: { ...defaultConfig.hours, ...(parsed?.hours || {}) },
        admin_users: Array.isArray(parsed?.admin_users)
          ? parsed.admin_users
          : defaultConfig.admin_users,
        daily_specials: {
          ...defaultConfig.daily_specials,
          ...(parsed?.daily_specials || {}),
        },
        social: { ...defaultConfig.social, ...(parsed?.social || {}) },
      };
    }
  } catch (error) {
    console.error("Error reading config.yaml, using defaults:", error);
  }
  return defaultConfig;
}

export function isWhitelistedAdmin(email?: string | null): boolean {
  if (!email) return false;
  const config = getRestaurantConfig();
  const normalizedEmail = email.trim().toLowerCase();

  // Check from config.yaml
  const inYaml = config.admin_users.some(
    (allowed) => allowed.trim().toLowerCase() === normalizedEmail
  );
  if (inYaml) return true;

  // Also check environment variable override ADMIN_WHITELIST (comma-separated)
  const envWhitelist = process.env.ADMIN_WHITELIST || process.env.ADMIN_EMAILS;
  if (envWhitelist) {
    const list = envWhitelist.split(",").map((e) => e.trim().toLowerCase());
    if (list.includes(normalizedEmail)) return true;
  }

  return false;
}

export function saveRestaurantConfig(updated: Partial<RestaurantConfig>): boolean {
  try {
    const current = getRestaurantConfig();
    const merged = {
      ...current,
      ...updated,
    };
    const filePath = getConfigFilePath();
    const yamlString = yaml.stringify(merged);
    fs.writeFileSync(filePath, yamlString, "utf8");
    return true;
  } catch (error) {
    console.error("Failed to write config.yaml:", error);
    return false;
  }
}
