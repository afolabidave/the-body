export type CategoryId =
  | "all"
  | "homestay"
  | "activewear"
  | "streetwear"
  | "evening"
  | "jewelry"
  | "shoes";

export type BodyZoneId =
  | "all"
  | "head-neck"
  | "upper-body"
  | "hands-wrists"
  | "lower-body"
  | "feet";

export type BundleSlot = "top" | "bottom" | "shoes" | "jewelry";

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: Exclude<CategoryId, "all">;
  bodyZone: Exclude<BodyZoneId, "all">;
  bundleSlot: BundleSlot;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  colors: { name: string; hex: string }[];
  sizes: string[];
  material: string;
  fitNotes: string;
  description: string;
  careInstructions: string[];
  image: string;
  secondaryImage: string;
  stock: number;
  sku: string;
}

export interface CategoryMeta {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  countLabel: string;
  heroImage: string;
  accentColor: string;
}

export interface BodyZoneMeta {
  id: BodyZoneId;
  label: string;
  anatomicalPart: string;
  description: string;
  coordinates: { x: number; y: number };
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "all",
    name: "Entire Body Archive",
    tagline: "Crown to Sole",
    description: "Every layer crafted to honor the natural silhouette—from second-skin loungewear to artisanal jewelry and grounded footwear.",
    countLabel: "24 Pieces",
    heroImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
    accentColor: "#B85D3B",
  },
  {
    id: "homestay",
    name: "Homestay Sanctuary",
    tagline: "Soft Architecture for Indoors",
    description: "Unstructured organic waffle knits, breathable raw-edge linen sets, and cloud-weight robes engineered for slow mornings and deep rest.",
    countLabel: "5 Pieces",
    heroImage: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85",
    accentColor: "#C87D55",
  },
  {
    id: "activewear",
    name: "Kinetic Activewear",
    tagline: "Sculpted in Motion",
    description: "Bio-knitted compression sets, moisture-balancing earth-dyed bodysuits, and second-skin layers that move with every muscle fiber.",
    countLabel: "4 Pieces",
    heroImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85",
    accentColor: "#5C6B57",
  },
  {
    id: "streetwear",
    name: "Urban Streetwear",
    tagline: "Elevated Utility & Volume",
    description: "Heavyweight 500gsm brushed cotton hoodies, articulated cargo trousers, and oversized trench silhouettes built for city rhythm.",
    countLabel: "4 Pieces",
    heroImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85",
    accentColor: "#8C583A",
  },
  {
    id: "evening",
    name: "Atelier Resort & Evening",
    tagline: "Fluid Drapery & Tailoring",
    description: "Bias-cut raw silk dresses, unlined linen blazers, and statement monochrome ensembles designed for golden-hour gatherings.",
    countLabel: "3 Pieces",
    heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
    accentColor: "#9E5A3C",
  },
  {
    id: "jewelry",
    name: "Sculptural Jewelry",
    tagline: "Organic Metals & Warm Stones",
    description: "Hand-cast recycled 18k vermeil, hammered bronze cuffs, travertine stone rings, and anatomical collar necklaces.",
    countLabel: "4 Pieces",
    heroImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85",
    accentColor: "#C69249",
  },
  {
    id: "shoes",
    name: "Grounded Footwear",
    tagline: "Anatomical Soles & Supple Hides",
    description: "Vegetable-tanned mules, vibram-soled desert runners, and hand-woven leather slides that anchor the entire posture.",
    countLabel: "4 Pieces",
    heroImage: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85",
    accentColor: "#6E473B",
  },
];

export const BODY_ZONES: BodyZoneMeta[] = [
  {
    id: "all",
    label: "Full Silhouette",
    anatomicalPart: "Crown to Sole",
    description: "Explore all anatomical zones across the body.",
    coordinates: { x: 50, y: 50 },
  },
  {
    id: "head-neck",
    label: "Neck & Collar",
    anatomicalPart: "Cervical & Clavicle Zone",
    description: "Earrings, sculptural chokers, and pendant chains that frame the face and collarbone.",
    coordinates: { x: 50, y: 18 },
  },
  {
    id: "upper-body",
    label: "Torso & Core",
    anatomicalPart: "Thoracic & Shoulder Zone",
    description: "Draped tops, oversized hoodies, compression bras, robes, and tailored outerwear.",
    coordinates: { x: 50, y: 36 },
  },
  {
    id: "hands-wrists",
    label: "Wrists & Hands",
    anatomicalPart: "Carpal & Phalange Zone",
    description: "Hammered cuffs, signet rings, and tactile wrist adornments.",
    coordinates: { x: 24, y: 50 },
  },
  {
    id: "lower-body",
    label: "Legs & Stride",
    anatomicalPart: "Pelvic & Femoral Zone",
    description: "Relaxed lounge pants, sculpted leggings, wide-leg cargo trousers, and silk skirts.",
    coordinates: { x: 50, y: 66 },
  },
  {
    id: "feet",
    label: "Foundation & Sole",
    anatomicalPart: "Plantar & Ankle Zone",
    description: "Architectural leather mules, technical runners, and cushioned recovery slides.",
    coordinates: { x: 50, y: 90 },
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  // ================= HOMESTAY =================
  {
    id: "tb-home-01",
    name: "Cloud-Waffle Sanctuary Robe",
    subtitle: "Organic Turkish Cotton Wrap",
    category: "homestay",
    bodyZone: "upper-body",
    bundleSlot: "top",
    price: 168,
    originalPrice: 195,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Hero Piece",
    isBestseller: true,
    colors: [
      { name: "Oat Milk", hex: "#EAE0D5" },
      { name: "Baked Terracotta", hex: "#B85D3B" },
      { name: "Dried Sage", hex: "#7A8471" },
    ],
    sizes: ["XS/S", "M/L", "XL/XXL"],
    material: "100% GOTS-Certified Organic Turkish Honeycomb Cotton (420 GSM)",
    fitNotes: "Generous dropped-shoulder drape with deep patch pockets and weighted collar.",
    description:
      "Designed to feel like a warm exhale at the end of the day. Our signature sanctuary robe is loomed with a three-dimensional honeycomb weave that traps warmth while remaining cloud-light against bare skin.",
    careInstructions: [
      "Gentle machine wash cold with plant-based detergent",
      "Tumble dry low or lay flat on cedar rack",
      "Do not bleach; steam to restore waffle loft",
    ],
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    stock: 28,
    sku: "TB-HM-001",
  },
  {
    id: "tb-home-02",
    name: "Haven Raw-Linen Lounge Trousers",
    subtitle: "Wide-Leg Drawstring Pant",
    category: "homestay",
    bodyZone: "lower-body",
    bundleSlot: "bottom",
    price: 128,
    rating: 4.8,
    reviewsCount: 98,
    badge: "Organic Flax",
    isBestseller: true,
    colors: [
      { name: "Flax Sand", hex: "#D8C8B8" },
      { name: "Espresso Bean", hex: "#3D2B24" },
      { name: "Sienna Clay", hex: "#A8573B" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "100% Belgian Enzyme-Washed Linen",
    fitNotes: "High-rise elastic waistband with braided cotton drawcord and fluid wide-leg hem.",
    description:
      "Pre-softened with volcanic stones and organic enzymes for a lived-in drape from day one. Equally effortless for barefoot mornings at home or stepping out for Sunday market flowers.",
    careInstructions: [
      "Cold wash on delicate cycle",
      "Line dry in shade to preserve natural linen slub",
    ],
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
    stock: 41,
    sku: "TB-HM-002",
  },
  {
    id: "tb-home-03",
    name: "Cocoon Ribbed Cashmere Henley",
    subtitle: "Second-Skin Lounge Knit",
    category: "homestay",
    bodyZone: "upper-body",
    bundleSlot: "top",
    price: 185,
    rating: 4.9,
    reviewsCount: 76,
    isNew: true,
    badge: "New Arrival",
    colors: [
      { name: "Warm Almond", hex: "#DFCBB5" },
      { name: "Charcoal Bark", hex: "#373432" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "70% Recycled Mongolian Cashmere, 30% Tencel Lyocell",
    fitNotes: "Skims the torso with micro-rib stretch and mother-of-pearl buttons.",
    description:
      "Featherlight warmth meets breathable botanical fibers. Knitted seamlessly in the round so there are zero side seams to irritate your skin while lounging or sleeping.",
    careInstructions: [
      "Hand wash cold with wool wash",
      "Dry flat on a towel away from direct heat",
    ],
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85",
    stock: 19,
    sku: "TB-HM-003",
  },
  {
    id: "tb-home-04",
    name: "Solstice Bouclé Knit Shorts",
    subtitle: "High-Waist Plush Lounge Short",
    category: "homestay",
    bodyZone: "lower-body",
    bundleSlot: "bottom",
    price: 88,
    rating: 4.7,
    reviewsCount: 64,
    colors: [
      { name: "Cream Whip", hex: "#F4EFE6" },
      { name: "Cinnamon Dust", hex: "#AD6A4C" },
    ],
    sizes: ["XS", "S", "M", "L"],
    material: "82% Organic Combed Cotton, 18% Recycled Polyamide Bouclé",
    fitNotes: "Relaxed mid-thigh cut with wide rib-knit waistband that never digs in.",
    description:
      "Textural looped bouclé yarn delivers tactile comfort without overheating. Pair with the Cloud-Waffle Sanctuary Robe for the ultimate indoor uniform.",
    careInstructions: ["Machine wash cold inside mesh bag", "Lay flat to dry"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
    stock: 34,
    sku: "TB-HM-004",
  },
  {
    id: "tb-home-05",
    name: "Siesta Gauze Sleep & Lounge Set",
    subtitle: "Double-Layer Muslin Shirt & Pant",
    category: "homestay",
    bodyZone: "upper-body",
    bundleSlot: "top",
    price: 154,
    rating: 4.8,
    reviewsCount: 112,
    badge: "Complete Set",
    colors: [
      { name: "Terracotta Blush", hex: "#C87D55" },
      { name: "Unbleached Ecru", hex: "#EFE8DC" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "100% Double-Crinkle Organic Cotton Gauze",
    fitNotes: "Breezy boxy button-down paired with ankle-grazing pull-on trousers.",
    description:
      "Airy, thermoregulating double gauze that gets softer with every wash. Naturally crinkled texture means it never needs ironing—built for slow living and long weekends.",
    careInstructions: ["Machine wash cold", "Tumble dry low to enhance crinkle texture"],
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=85",
    stock: 22,
    sku: "TB-HM-005",
  },

  // ================= ACTIVEWEAR =================
  {
    id: "tb-act-01",
    name: "Kinetic Sculpt Compression Tank",
    subtitle: "Built-In Support Movement Top",
    category: "activewear",
    bodyZone: "upper-body",
    bundleSlot: "top",
    price: 94,
    rating: 4.9,
    reviewsCount: 184,
    badge: "Bestseller",
    isBestseller: true,
    colors: [
      { name: "Olive Moss", hex: "#5C6B57" },
      { name: "Red Clay", hex: "#A94E34" },
      { name: "Obsidian Earth", hex: "#262322" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "78% ECONYL® Regenerated Nylon, 22% Lycra® Sport Elastane",
    fitNotes: "Four-way anatomical compression with square neckline and racerback mobility.",
    description:
      "Engineered to contour the upper torso with medium-impact support and a butter-matte finish. Botanical mineral dyes give each piece a rich, grounded earth palette.",
    careInstructions: ["Wash cold with technical garments", "Do not use fabric softener", "Hang dry"],
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=85",
    stock: 52,
    sku: "TB-AC-001",
  },
  {
    id: "tb-act-02",
    name: "secondSkin Contour High-Rise Legging",
    subtitle: "Zero-Seam Ankle Length Tight",
    category: "activewear",
    bodyZone: "lower-body",
    bundleSlot: "bottom",
    price: 118,
    rating: 4.9,
    reviewsCount: 230,
    badge: "Studio Favorite",
    isBestseller: true,
    colors: [
      { name: "Olive Moss", hex: "#5C6B57" },
      { name: "Red Clay", hex: "#A94E34" },
      { name: "Cocoa Husk", hex: "#4E3A31" },
    ],
    sizes: ["XXS", "XS", "S", "M", "L", "XL"],
    material: "78% ECONYL® Regenerated Nylon, 22% Lycra® Sport Elastane",
    fitNotes: "Double-layered sculpting core band with laser-cut raw ankle hem.",
    description:
      "Moves like a second epidermis from Pilates reformer sessions to mountain trails. Features an invisible lumbar pocket and squat-proof matte density.",
    careInstructions: ["Cold wash inside out", "Air dry only"],
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",
    stock: 64,
    sku: "TB-AC-002",
  },
  {
    id: "tb-act-03",
    name: "Pulse Seamless Bamboo Bodysuit",
    subtitle: "Full-Torso Studio Unitard",
    category: "activewear",
    bodyZone: "upper-body",
    bundleSlot: "top",
    price: 142,
    rating: 4.8,
    reviewsCount: 89,
    isNew: true,
    badge: "3D Bio-Knit",
    colors: [
      { name: "Dune Taupe", hex: "#B6A18E" },
      { name: "Deep Espresso", hex: "#2F241F" },
    ],
    sizes: ["XS", "S", "M", "L"],
    material: "65% Bamboo Charcoal Viscose, 25% Polyamide, 10% Elastane",
    fitNotes: "6-inch inseam one-piece with targeted rib ventilation zones along the spine.",
    description:
      "One continuous garment that hugs the torso and upper thighs in unison. Naturally antimicrobial bamboo charcoal fibers keep the body cool during high-output training.",
    careInstructions: ["Machine wash cold gentle", "Lay flat to dry"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=900&q=85",
    stock: 25,
    sku: "TB-AC-003",
  },
  {
    id: "tb-act-04",
    name: "Aero-Merino Track Windbreaker",
    subtitle: "Ultralight Running Shell",
    category: "activewear",
    bodyZone: "upper-body",
    bundleSlot: "top",
    price: 195,
    rating: 4.7,
    reviewsCount: 54,
    colors: [
      { name: "Sandstone Mist", hex: "#D6C9B8" },
      { name: "Forest Lichen", hex: "#4D5847" },
    ],
    sizes: ["S", "M", "L", "XL"],
    material: "Ripstop Recycled Nylon Outer with Ultrafine Merino Mesh Lining",
    fitNotes: "Articulated elbow darts with adjustable cinch hem and packable chest pouch.",
    description:
      "Bridges the gap between outdoor endurance and architectural fashion. Water-repellent plant-wax coating shields against sudden rain while merino mesh regulates core heat.",
    careInstructions: ["Wipe clean or cold gentle wash", "Hang dry"],
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",
    stock: 17,
    sku: "TB-AC-004",
  },

  // ================= STREETWEAR =================
  {
    id: "tb-str-01",
    name: "Monolith 500GSM Boxy Hoodie",
    subtitle: "Sun-Faded Heavyweight Fleece",
    category: "streetwear",
    bodyZone: "upper-body",
    bundleSlot: "top",
    price: 175,
    originalPrice: 210,
    rating: 4.9,
    reviewsCount: 215,
    badge: "Cult Classic",
    isBestseller: true,
    colors: [
      { name: "Washed Rust", hex: "#9E533C" },
      { name: "Concrete Bone", hex: "#DCD5C9" },
      { name: "Vintage Peat", hex: "#332E2C" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "100% Organic Ring-Spun Cotton Terry (500 GSM)",
    fitNotes: "Cropped boxy torso with oversized double-lined structured hood and no drawcord.",
    description:
      "Architectural volume for the streets. Custom-milled 500gsm fleece holds its sculptural silhouette around the shoulders while pigment-dyed seams age uniquely to your body.",
    careInstructions: ["Turn inside out, cold wash separately", "Lay flat to maintain structure"],
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=900&q=85",
    stock: 38,
    sku: "TB-ST-001",
  },
  {
    id: "tb-str-02",
    name: "Nomad Articulated Cargo Parachute Pant",
    subtitle: "Organic Cotton Ripstop Trouser",
    category: "streetwear",
    bodyZone: "lower-body",
    bundleSlot: "bottom",
    price: 164,
    rating: 4.8,
    reviewsCount: 132,
    badge: "Street Essential",
    colors: [
      { name: "Khaki Earth", hex: "#8F7A62" },
      { name: "Burnt Umber", hex: "#593A2E" },
      { name: "Slate Coal", hex: "#2A2B2A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "100% Organic Cotton Ripstop with Brass Toggle Cuffs",
    fitNotes: "Relaxed wide-leg volume with 3D pleated knee darts and adjustable ankle toggles.",
    description:
      "Built for unrestricted movement across concrete canyons. Six gusseted utility pockets sit flush against the thigh until expanded, giving you clean lines or full cargo capacity.",
    careInstructions: ["Machine wash cold", "Line dry"],
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
    stock: 45,
    sku: "TB-ST-002",
  },
  {
    id: "tb-str-03",
    name: "Terra Oversized Canvas Chore Jacket",
    subtitle: "Blanket-Lined Workwear Coat",
    category: "streetwear",
    bodyZone: "upper-body",
    bundleSlot: "top",
    price: 245,
    rating: 4.9,
    reviewsCount: 87,
    isNew: true,
    badge: "Limited Batch",
    colors: [
      { name: "Saddle Ochre", hex: "#B5733D" },
      { name: "Raw Canvas", hex: "#E4DACB" },
    ],
    sizes: ["S", "M", "L", "XL"],
    material: "14oz Organic Duck Canvas with Brushed Flannel Lining & Horn Buttons",
    fitNotes: "Generous outer-layer cut designed to layer easily over heavyweight hoodies.",
    description:
      "Inspired by ceramicists' studio coats and urban utilitarian outerwear. Triple-needle topstitching and a corduroy-trimmed collar make this an heirloom street layer.",
    careInstructions: ["Spot clean or dry clean only"],
    image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
    stock: 14,
    sku: "TB-ST-003",
  },
  {
    id: "tb-str-04",
    name: "Axis Pleated Wide-Leg Denim",
    subtitle: "Unbleached Selvedge Ecru Jean",
    category: "streetwear",
    bodyZone: "lower-body",
    bundleSlot: "bottom",
    price: 188,
    rating: 4.8,
    reviewsCount: 95,
    colors: [
      { name: "Natural Seed Ecru", hex: "#ECE4D5" },
      { name: "Clay Wash Indigo", hex: "#5C6873" },
    ],
    sizes: ["26", "28", "30", "32", "34", "36"],
    material: "13.5oz Japanese Shuttle-Loomed Organic Selvedge Denim",
    fitNotes: "Mid-high waist with single front trouser pleat and full pooling leg.",
    description:
      "Tailored trouser sophistication fused with raw streetwear posture. Undyed cotton flecks remain visible in the weave for authentic organic character.",
    careInstructions: ["Wash infrequently in cold water", "Hang dry by waistband loops"],
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=900&q=85",
    stock: 31,
    sku: "TB-ST-004",
  },

  // ================= EVENING & RESORT =================
  {
    id: "tb-eve-01",
    name: "Sienna Bias-Cut Raw Silk Slip Dress",
    subtitle: "Open-Back Cowl Midi Silhouette",
    category: "evening",
    bodyZone: "upper-body",
    bundleSlot: "top",
    price: 290,
    rating: 5.0,
    reviewsCount: 68,
    badge: "Atelier Icon",
    isBestseller: true,
    colors: [
      { name: "Burnt Terracotta", hex: "#B85D3B" },
      { name: "Champagne Pearl", hex: "#EBDCCB" },
      { name: "Bronzed Olive", hex: "#6B634B" },
    ],
    sizes: ["XS", "S", "M", "L"],
    material: "100% Peace Silk (Ahimsa Mulberry Charmeuse, 22 Momme)",
    fitNotes: "Cut on a 45-degree bias to mold effortlessly to every curve without zippers.",
    description:
      "Liquid warmth in motion. Harvested without harm to silkworms and dyed with madder root and pomegranate rind, this evening slip cascades down the body with luminous matte sheen.",
    careInstructions: ["Eco dry clean or cold hand soak with silk wash"],
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    stock: 16,
    sku: "TB-EV-001",
  },
  {
    id: "tb-eve-02",
    name: "Solano Unstructured Linen Atelier Blazer",
    subtitle: "Relaxed Double-Breasted Jacket",
    category: "evening",
    bodyZone: "upper-body",
    bundleSlot: "top",
    price: 265,
    rating: 4.9,
    reviewsCount: 51,
    colors: [
      { name: "Warm Travertine", hex: "#DBCBB8" },
      { name: "Spiced Clove", hex: "#613D30" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "100% Heavyweight Italian Herringbone Linen",
    fitNotes: "Softly padded natural shoulders with elongated lapel and breathable unlined back.",
    description:
      "Tailoring stripped of stiffness. Wear draped over bare skin with sculptural gold jewelry or paired with wide-leg trousers for sunset gallery openings.",
    careInstructions: ["Steam to refresh", "Professional green dry clean"],
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
    stock: 21,
    sku: "TB-EV-002",
  },
  {
    id: "tb-eve-03",
    name: "Mirage Plissé Draped Column Skirt",
    subtitle: "Floor-Grazing Micro-Pleat Skirt",
    category: "evening",
    bodyZone: "lower-body",
    bundleSlot: "bottom",
    price: 198,
    rating: 4.8,
    reviewsCount: 44,
    isNew: true,
    colors: [
      { name: "Gilded Sand", hex: "#D9C3A8" },
      { name: "Dark Fig", hex: "#432F32" },
    ],
    sizes: ["XS", "S", "M", "L"],
    material: "100% Naia™ Renew Cellulosic Satin Pleat",
    fitNotes: "High-waist invisible comfort band with organic Fortuny-inspired micro-pleats.",
    description:
      "Expands and contracts with every step like living sculpture. Packs into a travel pouch without ever losing its permanent botanical pleating.",
    careInstructions: ["Hand wash cold", "Dry flat without wringing"],
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
    stock: 18,
    sku: "TB-EV-003",
  },

  // ================= JEWELRY =================
  {
    id: "tb-jwl-01",
    name: "Clavicle Molten Bronze Collar",
    subtitle: "Hand-Cast Anatomical Neck Sculpture",
    category: "jewelry",
    bodyZone: "head-neck",
    bundleSlot: "jewelry",
    price: 210,
    rating: 5.0,
    reviewsCount: 119,
    badge: "Signature Metal",
    isBestseller: true,
    colors: [
      { name: "18k Recycled Gold Vermeil", hex: "#D4AF37" },
      { name: "Patina Bronze", hex: "#9A744C" },
    ],
    sizes: ["One Size (Adjustable Open Back)"],
    material: "2.5-Micron 18k Recycled Gold over Sterling Silver",
    fitNotes: "Ergonomically curved to rest directly along the natural hollow of the collarbones.",
    description:
      "Lost-wax cast by hand so it mirrors the organic asymmetry of human bone structure. Warm to the touch and substantial without feeling heavy.",
    careInstructions: ["Polish with dry chamois cloth", "Store in included organic linen pouch"],
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
    stock: 27,
    sku: "TB-JW-001",
  },
  {
    id: "tb-jwl-02",
    name: "Terra Hammered Cuff Bracelet",
    subtitle: "Sculpted Wrist Armor",
    category: "jewelry",
    bodyZone: "hands-wrists",
    bundleSlot: "jewelry",
    price: 145,
    rating: 4.9,
    reviewsCount: 92,
    colors: [
      { name: "Warm Gold Vermeil", hex: "#D4AF37" },
      { name: "Brushed Silver", hex: "#C8C6C4" },
    ],
    sizes: ["S/M", "M/L"],
    material: "Recycled Artisanal Brass with 18k Gold Plating",
    fitNotes: "Malleable open cuff tapers around the wrist bone for a custom fit.",
    description:
      "Every facet is hand-planished with a rounded silversmith hammer, catching golden-hour light with soft, ripples rather than harsh reflections.",
    careInstructions: ["Avoid direct perfume spray", "Buff gently after wear"],
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
    stock: 35,
    sku: "TB-JW-002",
  },
  {
    id: "tb-jwl-03",
    name: "Solis Travertine & Gold Drop Earrings",
    subtitle: "Carved Stone & Vermeil Mobile",
    category: "jewelry",
    bodyZone: "head-neck",
    bundleSlot: "jewelry",
    price: 125,
    rating: 4.8,
    reviewsCount: 74,
    isNew: true,
    badge: "Natural Stone",
    colors: [
      { name: "Roman Travertine / Gold", hex: "#D6C5B3" },
      { name: "Red Jasper / Gold", hex: "#9E4733" },
    ],
    sizes: ["One Size"],
    material: "Hand-Carved Italian Travertine Stone & 14k Solid Gold Posts",
    fitNotes: "Featherweight hollow-core stone drops designed for all-day lobe comfort.",
    description:
      "Pairs porous architectural stone with warm satin-finished gold. Framing the jawline with kinetic balance, each pair showcases one-of-a-kind mineral veining.",
    careInstructions: ["Wipe stone with damp cloth", "Keep in separate compartment"],
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
    stock: 23,
    sku: "TB-JW-003",
  },
  {
    id: "tb-jwl-04",
    name: "Vessel Organic Signet Ring Trio",
    subtitle: "Stackable Tactile Finger Bands",
    category: "jewelry",
    bodyZone: "hands-wrists",
    bundleSlot: "jewelry",
    price: 138,
    rating: 4.9,
    reviewsCount: 108,
    colors: [
      { name: "18k Gold Vermeil", hex: "#D4AF37" },
    ],
    sizes: ["Size 6", "Size 7", "Size 8", "Size 9"],
    material: "Recycled 925 Sterling Silver with 18k Gold Vermeil & Tiger's Eye Inlay",
    fitNotes: "Three nesting wave-contour rings that can be worn stacked or across three fingers.",
    description:
      "Designed to celebrate the expressive movement of the hands. Smooth interior comfort-fit curves feel like river-worn pebbles between the fingers.",
    careInstructions: ["Remove before swimming or heavy lifting"],
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
    stock: 42,
    sku: "TB-JW-004",
  },

  // ================= SHOES =================
  {
    id: "tb-sho-01",
    name: "Terra-Form Anatomical Leather Mule",
    subtitle: "Cork-Footbed Artisanal Sabot",
    category: "shoes",
    bodyZone: "feet",
    bundleSlot: "shoes",
    price: 225,
    rating: 4.9,
    reviewsCount: 164,
    badge: "Most Loved",
    isBestseller: true,
    colors: [
      { name: "Saddle Terracotta", hex: "#A8573B" },
      { name: "Raw Crème Suede", hex: "#E3D6C6" },
      { name: "Espresso Calf", hex: "#382821" },
    ],
    sizes: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42", "EU 43"],
    material: "Vegetable-Tanned Tuscan Suede & Molded Natural Oak Cork Footbed",
    fitNotes: "Wide anatomical toe box allows natural toe splay; deep heel cup aligns posture.",
    description:
      "The foundation of THE BODY wardrobe. Built on a podiatrist-informed cork and natural crepe rubber sole that molds to your exact footprint within 10 wears.",
    careInstructions: ["Brush with suede crêpe brush", "Protect with non-silicone water shield"],
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=85",
    stock: 33,
    sku: "TB-SH-001",
  },
  {
    id: "tb-sho-02",
    name: "Nomad Vibram® Desert Runner",
    subtitle: "Suede & Hemp Technical Sneaker",
    category: "shoes",
    bodyZone: "feet",
    bundleSlot: "shoes",
    price: 240,
    rating: 4.9,
    reviewsCount: 141,
    badge: "All-Terrain",
    isBestseller: true,
    colors: [
      { name: "Dune / Clay", hex: "#C89D7C" },
      { name: "Sage / Bone", hex: "#7F8B75" },
    ],
    sizes: ["EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44"],
    material: "Woven Organic Hemp Mesh, Nubuck Overlays & Vibram® EcoStep Outsole",
    fitNotes: "True to size with gusseted tongue and sugarcane-EVA responsive midsole.",
    description:
      "Equally at home paired with activewear leggings or wide-leg streetwear cargos. Engineered with 30% recycled Vibram rubber and breathable hemp mesh uppers.",
    careInstructions: ["Spot clean with mild soap and cold water", "Air dry away from sun"],
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    stock: 47,
    sku: "TB-SH-002",
  },
  {
    id: "tb-sho-03",
    name: "Cloud-Step Recovery House & Street Slide",
    subtitle: "Bio-Foam Sculpted Sandal",
    category: "shoes",
    bodyZone: "feet",
    bundleSlot: "shoes",
    price: 98,
    rating: 4.8,
    reviewsCount: 196,
    colors: [
      { name: "Warm Clay", hex: "#C27A58" },
      { name: "Alabaster Oat", hex: "#EDE5D8" },
      { name: "Olive Bark", hex: "#505746" },
    ],
    sizes: ["EU 36/37", "EU 38/39", "EU 40/41", "EU 42/43", "EU 44/45"],
    material: "100% Algae-Blended Bloom™ Closed-Cell Bio-Foam",
    fitNotes: "Rocker-bottom geometry decompresses ankle and knee joints after workouts.",
    description:
      "Monolithic organic curves meet weightless cushioning. Seamless single-mold construction transitions effortlessly from indoor homestay floors to poolside terraces.",
    careInstructions: ["Rinse with cool water", "Do not leave in extreme direct heat"],
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
    stock: 58,
    sku: "TB-SH-003",
  },
  {
    id: "tb-sho-04",
    name: "Solstice Hand-Woven Huarache Loafer",
    subtitle: "Artisanal Braided Leather Flat",
    category: "shoes",
    bodyZone: "feet",
    bundleSlot: "shoes",
    price: 215,
    rating: 4.9,
    reviewsCount: 63,
    isNew: true,
    badge: "Handwoven",
    colors: [
      { name: "Cognac Terracotta", hex: "#9E5333" },
      { name: "Raw Sand", hex: "#D7C0A7" },
    ],
    sizes: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42"],
    material: "Full-Grain Vegetable-Tanned Leather Strips & Stacked Leather Heel",
    fitNotes: "Collapsible heel counter lets you wear it as a structured loafer or slide-on mule.",
    description:
      "Each pair takes 6 hours of hand-braiding using zero synthetic glues. Open-weave leather adapts to your foot's temperature while grounding evening or resort looks.",
    careInstructions: ["Condition with natural beeswax balm twice a year"],
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
    stock: 20,
    sku: "TB-SH-004",
  },
];

export interface CuratedPresetLook {
  id: string;
  title: string;
  vibe: string;
  description: string;
  topId: string;
  bottomId: string;
  shoesId: string;
  jewelryId: string;
}

export const CURATED_LOOK_PRESETS: CuratedPresetLook[] = [
  {
    id: "look-sanctuary",
    title: "01 / Sunday Sanctuary Ritual",
    vibe: "Homestay & Grounded Calm",
    description: "Organic Turkish waffle cotton draped over Belgian linen trousers, anchored by bio-foam slides and a hammered golden cuff.",
    topId: "tb-home-01",
    bottomId: "tb-home-02",
    shoesId: "tb-sho-03",
    jewelryId: "tb-jwl-02",
  },
  {
    id: "look-kinetic",
    title: "02 / Reformer to Café Flow",
    vibe: "Kinetic Active & Sculpted Metal",
    description: "Four-way compression tank and zero-seam high-rise leggings paired with Vibram® desert runners and travertine stone drops.",
    topId: "tb-act-01",
    bottomId: "tb-act-02",
    shoesId: "tb-sho-02",
    jewelryId: "tb-jwl-03",
  },
  {
    id: "look-urban",
    title: "03 / Monolith Concrete Rhythm",
    vibe: "Elevated Streetwear & Architecture",
    description: "500GSM sun-faded boxy hoodie and articulated ripstop cargo trousers styled with anatomical suede mules and our molten bronze collar.",
    topId: "tb-str-01",
    bottomId: "tb-str-02",
    shoesId: "tb-sho-01",
    jewelryId: "tb-jwl-01",
  },
  {
    id: "look-golden-hour",
    title: "04 / Golden Hour Vernissage",
    vibe: "Atelier Evening & Warm Stones",
    description: "Unstructured herringbone linen blazer and Fortuny-pleated column skirt finished with handwoven huarache loafers and the molten collar.",
    topId: "tb-eve-02",
    bottomId: "tb-eve-03",
    shoesId: "tb-sho-04",
    jewelryId: "tb-jwl-01",
  },
];
