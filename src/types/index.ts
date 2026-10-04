export interface Dish {
  id: string;
  name: string;
  category:
    | 'street-bites-fusion'
    | 'tandoor-robata'
    | 'heritage-curries'
    | 'biryani-breads'
    | 'desserts-drinks'
    | 'merch-pantry';
  price: number; // in EUR
  spiceLevel: 1 | 2 | 3 | 4; // 1: Mild, 2: Medium, 3: Spicy, 4: Fiery Rajasthani
  dietaryTags: string[]; // e.g. ["Vegetarian", "Vegan", "Halal", "Gluten-Free", "Merchandise", "Pantry"]
  isSpecialToday: boolean;
  isAvailable: boolean;
  descriptionEn: string;
  descriptionNl: string;
  pairingDrink?: string;
  photos: string[]; // URLs or base64 data URLs
  createdAt?: string;
  updatedAt?: string;
}

export interface RestaurantConfig {
  restaurant: {
    name: string;
    tagline: string;
    dutch_tagline: string;
    currency: string;
    currency_symbol: string;
  };
  contact: {
    address: {
      street: string;
      postal_code: string;
      city: string;
      country: string;
      neighborhood: string;
      google_maps_url: string;
    };
    phone: string;
    whatsapp: string;
    email: string;
    reservations_email: string;
  };
  hours: {
    monday_thursday: string;
    friday_saturday: string;
    sunday: string;
    note: string;
  };
  admin_users: string[];
  daily_specials: {
    title: string;
    announcement: string;
  };
  social: {
    instagram: string;
    facebook: string;
    tripadvisor: string;
  };
}

export interface MenuCategory {
  id: string;
  nameEn: string;
  nameNl: string;
  descriptionEn: string;
  iconName: string;
}
