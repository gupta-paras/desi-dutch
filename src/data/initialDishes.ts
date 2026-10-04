import { Dish } from "@/types";

export const INITIAL_DISHES: Dish[] = [
  {
    id: "butter-chicken-bitterballen",
    name: "Butter Chicken Bitterballen",
    category: "street-bites-fusion",
    price: 9.5,
    spiceLevel: 2,
    dietaryTags: ["Halal"],
    isSpecialToday: true,
    isAvailable: true,
    descriptionEn:
      "Crisp golden Dutch bitterballen stuffed with slow-braised pulled tandoori chicken in velvet tomato-makhani gravy, served with Alphonso mango & Groninger mustard dip.",
    descriptionNl:
      "Crisp golden Dutch bitterballen stuffed with slow-braised pulled tandoori chicken in velvet tomato-makhani gravy.",
    pairingDrink: "Damrak Mango Lassi G&T",
    photos: [
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    ],
    createdAt: "2024-01-01T12:00:00.000Z",
  },
  {
    id: "keema-stamppot-croquettes",
    name: "Keema Stamppot Croquettes",
    category: "street-bites-fusion",
    price: 10.5,
    spiceLevel: 2,
    dietaryTags: ["Halal"],
    isSpecialToday: false,
    isAvailable: true,
    descriptionEn:
      "Traditional Dutch kale & potato stamppot blended with spiced minced Dutch lamb, roasted cumin, and garam masala, fried crisp in panko with fresh mint-coriander raita.",
    descriptionNl:
      "Traditional Dutch kale & potato stamppot blended with spiced minced lamb, roasted cumin, and fresh mint raita.",
    pairingDrink: "Heineken Extra Cold or Kingfisher Ultra",
    photos: [
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    ],
    createdAt: "2024-01-02T12:00:00.000Z",
  },
  {
    id: "royal-samosa-chaat",
    name: "Royal Samosa Chaat",
    category: "street-bites-fusion",
    price: 8.5,
    spiceLevel: 2,
    dietaryTags: ["Vegetarian", "Halal"],
    isSpecialToday: false,
    isAvailable: true,
    descriptionEn:
      "Artisanal flaky potato and pea samosa crushed over warm Amritsari chickpea curry, sweetened Dutch farm yogurt, tamarind-date chutney, mint, sev, and pomegranate.",
    descriptionNl:
      "Artisanal flaky potato and pea samosa over warm chickpea curry, farm yogurt, tamarind, mint, and pomegranate.",
    pairingDrink: "Royal Masala Chai",
    photos: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    ],
    createdAt: "2024-01-03T12:00:00.000Z",
  },
  {
    id: "royal-saffron-paneer-tikka",
    name: "Royal Saffron Paneer Tikka",
    category: "tandoor-robata",
    price: 16.5,
    spiceLevel: 2,
    dietaryTags: ["Vegetarian", "Halal", "Gluten-Free"],
    isSpecialToday: false,
    isAvailable: true,
    descriptionEn:
      "House-made fresh paneer steeped in Kashmiri saffron, smoked yellow chili, hung curd, and carom seeds, blistered in clay tandoor with sweet Dutch onions and bell peppers.",
    descriptionNl:
      "Fresh house-made paneer steeped in Kashmiri saffron, yellow chili, and spices, roasted in clay tandoor.",
    pairingDrink: "Delft Blue Viognier White Wine",
    photos: [
      "https://images.unsplash.com/photo-1567184109411-b28f2780e8e6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    ],
    createdAt: "2024-01-04T12:00:00.000Z",
  },
  {
    id: "smoked-malai-prawns",
    name: "Smoked Malai North Sea Prawns",
    category: "tandoor-robata",
    price: 21.5,
    spiceLevel: 1,
    dietaryTags: ["Halal", "Gluten-Free"],
    isSpecialToday: true,
    isAvailable: true,
    descriptionEn:
      "Wild North Sea king prawns enveloped in cardamom, Dutch clotted cream, white pepper, and roasted garlic, char-grilled over embers with burnt lime butter and cumin glaze.",
    descriptionNl:
      "Wild North Sea king prawns enveloped in cardamom, Dutch clotted cream, and garlic, grilled over charcoal.",
    pairingDrink: "Crisp Amsterdam Canal Dry Gin & Tonic",
    photos: [
      "https://images.unsplash.com/photo-1559742811-82286364ceaf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    ],
    createdAt: "2024-01-05T12:00:00.000Z",
  },
  {
    id: "tandoori-bhatti-lamb-chops",
    name: "Tandoori Bhatti Lamb Chops",
    category: "tandoor-robata",
    price: 24.0,
    spiceLevel: 3,
    dietaryTags: ["Halal", "Gluten-Free"],
    isSpecialToday: false,
    isAvailable: true,
    descriptionEn:
      "Dutch pasture-raised lamb chops marinated for 24 hours in papaya, roasted coriander, mace, and charcoal-smoked Indian spices, seared over blazing tandoor embers.",
    descriptionNl:
      "Dutch pasture lamb chops marinated in roasted spices and seared over blazing charcoal embers.",
    pairingDrink: "Full-bodied Syrah / Shiraz",
    photos: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80",
    ],
    createdAt: "2024-01-06T12:00:00.000Z",
  },
  {
    id: "royal-indian-laal-maas",
    name: "Royal Indian Laal Maas",
    category: "heritage-curries",
    price: 22.5,
    spiceLevel: 4,
    dietaryTags: ["Halal", "Gluten-Free"],
    isSpecialToday: true,
    isAvailable: true,
    descriptionEn:
      "The iconic warrior curry: tender slow-braised Dutch lamb simmered in a deep crimson gravy of smoky red chillies, garlic cloves, and aromatic ghee charcoal smoke.",
    descriptionNl:
      "Iconic slow-braised Dutch lamb in a deep crimson gravy of smoky chillies and ghee charcoal smoke.",
    pairingDrink: "Old Amsterdam Aged Gouda Naan & Bold Red Wine",
    photos: [
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545247181-516773ca838b?auto=format&fit=crop&w=800&q=80",
    ],
    createdAt: "2024-01-07T12:00:00.000Z",
  },
  {
    id: "old-delhi-butter-chicken",
    name: "Old Delhi Butter Chicken (Murgh Makhani)",
    category: "heritage-curries",
    price: 19.5,
    spiceLevel: 2,
    dietaryTags: ["Halal", "Gluten-Free"],
    isSpecialToday: false,
    isAvailable: true,
    descriptionEn:
      "Charcoal-roasted boneless chicken simmered in velvety San Marzano tomato sauce, aromatic kasoori methi, blossom honey, and rich Dutch grass-fed meadow butter.",
    descriptionNl:
      "Tandoori roasted chicken in velvet tomato sauce with fenugreek, honey, and Dutch meadow butter.",
    pairingDrink: "Old Amsterdam Truffle Naan",
    photos: [
      "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    ],
    createdAt: "2024-01-08T12:00:00.000Z",
  },
  {
    id: "amsterdam-canal-dal-makhani",
    name: "Amsterdam Canal Dal Makhani",
    category: "heritage-curries",
    price: 15.5,
    spiceLevel: 1,
    dietaryTags: ["Vegetarian", "Halal", "Gluten-Free"],
    isSpecialToday: false,
    isAvailable: true,
    descriptionEn:
      "Whole black urad lentils slow-simmered for 24 hours on gentle embers, enriched with churned Dutch butter, cream, and delicate ginger juliennes.",
    descriptionNl:
      "Black lentils slow-simmered for 24 hours on charcoal with rich meadow butter and fresh ginger.",
    pairingDrink: "Garlic & Flaky Laccha Paratha Duo",
    photos: [
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    ],
    createdAt: "2024-01-09T12:00:00.000Z",
  },
  {
    id: "awadhi-dum-biryani",
    name: "Awadhi Dum Biryani",
    category: "biryani-breads",
    price: 20.5,
    spiceLevel: 2,
    dietaryTags: ["Halal", "Gluten-Free"],
    isSpecialToday: false,
    isAvailable: true,
    descriptionEn:
      "Fragrant aged Dehradun basmati rice layered with spiced marinated chicken, saffron milk, kewra essence, crispy shallots, and mint, slow-steamed under sealed pastry. Served with burani raita.",
    descriptionNl:
      "Aged fragrant basmati rice layered with spiced chicken, saffron, and mint, sealed in clay pot.",
    pairingDrink: "Burani Garlic Raita",
    photos: [
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    ],
    createdAt: "2024-01-10T12:00:00.000Z",
  },
  {
    id: "old-amsterdam-gouda-truffle-naan",
    name: "Old Amsterdam Aged Gouda & Truffle Naan",
    category: "biryani-breads",
    price: 6.5,
    spiceLevel: 1,
    dietaryTags: ["Vegetarian", "Halal"],
    isSpecialToday: true,
    isAvailable: true,
    descriptionEn:
      "Fluffy blistered tandoori flatbread stuffed with 18-month aged Old Amsterdam Gouda cheese, brushed with black winter truffle ghee and toasted nigella seeds.",
    descriptionNl:
      "Tandoori flatbread stuffed with 18-month aged Gouda cheese, brushed with black truffle ghee.",
    pairingDrink: "Royal Indian Laal Maas or Dal Makhani",
    photos: [
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    ],
    createdAt: "2024-01-11T12:00:00.000Z",
  },
  {
    id: "stroopwafel-cardamom-rabri",
    name: "Stroopwafel Cardamom Rabri",
    category: "desserts-drinks",
    price: 8.5,
    spiceLevel: 1,
    dietaryTags: ["Vegetarian", "Halal"],
    isSpecialToday: true,
    isAvailable: true,
    descriptionEn:
      "Warm mini Gouda stroopwafels with caramel, layered under rich slow-reduced saffron and green cardamom milk (rabri), garnished with toasted pistachio slivers.",
    descriptionNl:
      "Warm mini stroopwafels layered under rich saffron and green cardamom reduced milk with pistachios.",
    pairingDrink: "Royal Masala Chai",
    photos: [
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
    ],
    createdAt: "2024-01-13T12:00:00.000Z",
  },
  {
    id: "damrak-mango-lassi-gt",
    name: "Damrak Mango Lassi Gin & Tonic",
    category: "desserts-drinks",
    price: 12.5,
    spiceLevel: 1,
    dietaryTags: ["Gluten-Free"],
    isSpecialToday: false,
    isAvailable: true,
    descriptionEn:
      "Amsterdam Damrak Gin shaken with sweet Alphonso mango puree, clarified yogurt whey, and lime, topped with Fever-Tree Indian Tonic and pink peppercorns.",
    descriptionNl:
      "Damrak Gin shaken with sweet Alphonso mango, clarified yogurt whey, and Fever-Tree tonic.",
    pairingDrink: "Street Bites & Fusion appetizers",
    photos: [
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    ],
    createdAt: "2024-01-15T12:00:00.000Z",
  },
  {
    id: "royal-masala-chai",
    name: "Royal Masala Chai",
    category: "desserts-drinks",
    price: 4.5,
    spiceLevel: 1,
    dietaryTags: ["Vegetarian", "Halal", "Gluten-Free"],
    isSpecialToday: false,
    isAvailable: true,
    descriptionEn:
      "Single-estate Assam black tea slow-brewed with crushed root ginger, green cardamom, cinnamon quills, and creamy Dutch meadow milk in clay kulhad cups.",
    descriptionNl:
      "Single-estate Assam black tea brewed with crushed root ginger, cardamom, and fresh meadow milk.",
    pairingDrink: "Stroopwafel Cardamom Rabri",
    photos: [
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
    ],
    createdAt: "2024-01-16T12:00:00.000Z",
  },
  // Artisanal Merch & Pantry Additions
  {
    id: "artisanal-brass-tiffin-carrier",
    name: "Artisanal Brass Tiffin (Canal Engraved)",
    category: "merch-pantry",
    price: 38.0,
    spiceLevel: 1,
    dietaryTags: ["Merchandise"],
    isSpecialToday: true,
    isAvailable: true,
    descriptionEn:
      "3-tier authentic solid brass lunch tiffin hand-crafted by master metalworkers in India, intricately etched with historic Amsterdam canal house stepped gables.",
    descriptionNl:
      "Traditional 3-tier solid brass lunch tiffin hand-crafted in India, engraved with Amsterdam canal houses.",
    photos: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    ],
    createdAt: "2024-01-17T12:00:00.000Z",
  },
  {
    id: "delft-indian-block-print-apron",
    name: "Delft Blue x Indian Block-Print Apron",
    category: "merch-pantry",
    price: 26.5,
    spiceLevel: 1,
    dietaryTags: ["Merchandise"],
    isSpecialToday: false,
    isAvailable: true,
    descriptionEn:
      "100% organic cotton chef apron hand block-printed in India featuring an exclusive intertwined Dutch tulip and royal lotus motif in cobalt Delft blue.",
    descriptionNl:
      "Organic cotton apron hand block-printed in India featuring Dutch tulip and lotus patterns in cobalt blue.",
    photos: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
    ],
    createdAt: "2024-01-18T12:00:00.000Z",
  },
  {
    id: "desi-dutch-masala-chai-kit",
    name: "Single-Estate Chai Kit & 2 Kulhad Cups",
    category: "merch-pantry",
    price: 19.5,
    spiceLevel: 1,
    dietaryTags: ["Pantry", "Vegetarian"],
    isSpecialToday: false,
    isAvailable: true,
    descriptionEn:
      "Everything for the authentic tea ritual: 200g Assam CTC tea, crushed whole green cardamom and cinnamon tin, plus 2 genuine unglazed Indian terracotta cups.",
    descriptionNl:
      "Complete chai kit with 200g Assam tea, whole spices, and two traditional unglazed terracotta kulhad cups.",
    photos: [
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
    ],
    createdAt: "2024-01-19T12:00:00.000Z",
  },
];

export const MENU_CATEGORIES = [
  {
    id: "all",
    nameEn: "All Creations & Merch",
    nameNl: "All",
    descriptionEn: "Complete Indo-Dutch gastronomic journey & artisanal goods",
    iconName: "Sparkles",
  },
  {
    id: "street-bites-fusion",
    nameEn: "Street Bites & Fusion",
    nameNl: "Street Bites & Fusion",
    descriptionEn: "Iconic Dutch bar comfort combined with India's vibrant street chaats",
    iconName: "Utensils",
  },
  {
    id: "tandoor-robata",
    nameEn: "Tandoor & Charcoal",
    nameNl: "Tandoor & Charcoal",
    descriptionEn: "Smoked over glowing acacia charcoal in traditional 400°C clay tandoors",
    iconName: "Flame",
  },
  {
    id: "heritage-curries",
    nameEn: "Heritage Curries",
    nameNl: "Heritage Curries",
    descriptionEn: "Centuries-old royal recipes simmered low and slow with pure ghee",
    iconName: "Crown",
  },
  {
    id: "biryani-breads",
    nameEn: "Biryani & Breads",
    nameNl: "Biryani & Breads",
    descriptionEn: "Dough-sealed handi basmati rice and blistered artisanal Gouda flatbreads",
    iconName: "Wheat",
  },
  {
    id: "desserts-drinks",
    nameEn: "Desserts & Libations",
    nameNl: "Desserts & Libations",
    descriptionEn: "Dutch patisserie meets royal confections, botanical gins, and hand-brewed chai",
    iconName: "Wine",
  },
  {
    id: "merch-pantry",
    nameEn: "Artisanal Merch & Pantry",
    nameNl: "Artisanal Merch & Pantry",
    descriptionEn: "Handcrafted brass tiffins, block-printed aprons, and royal spice blends",
    iconName: "ShoppingBag",
  },
];
