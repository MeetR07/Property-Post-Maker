export type TemplateId =
  | "classic-golf"
  | "modern-slate"
  | "waterfront-bay"
  | "warm-terra"
  | "minimal-gallery"
  | "metro-dark";

export type TemplateMeta = {
  id: TemplateId;
  name: string;
  tagline: string;
  accentColor: string;
  bgGradient: string;
  badge: string;
  image: string;
};

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "classic-golf",
    name: "Pine & Gold Estate",
    tagline: "Luxury golf villa & green estate",
    accentColor: "#C9A24B",
    bgGradient: "linear-gradient(135deg, #0F3325, #175639)",
    badge: "Featured Estate",
    image: "/images/building_golf_estate.png",
  },
  {
    id: "modern-slate",
    name: "Dark Charcoal & Gold",
    tagline: "Sleek obsidian penthouses & towers",
    accentColor: "#D4AF37",
    bgGradient: "linear-gradient(135deg, #121417, #1E2229)",
    badge: "Penthouse Suite",
    image: "/images/building_modern_penthouse.png",
  },
  {
    id: "waterfront-bay",
    name: "Azure Waterfront",
    tagline: "Coastal ocean bay & resort villas",
    accentColor: "#00D4FF",
    bgGradient: "linear-gradient(135deg, #0A2540, #14436E)",
    badge: "Waterfront View",
    image: "/images/building_waterfront_villa.png",
  },
  {
    id: "warm-terra",
    name: "Warm Terracotta",
    tagline: "Mediterranean sunset villas",
    accentColor: "#D9826C",
    bgGradient: "linear-gradient(135deg, #8C4A32, #B26245)",
    badge: "Sunset Collection",
    image: "/images/building_mediterranean_villa.png",
  },
  {
    id: "minimal-gallery",
    name: "Ultra Minimal White",
    tagline: "Modern architectural glass mansion",
    accentColor: "#111111",
    bgGradient: "linear-gradient(135deg, #F8F9FA, #E9ECEF)",
    badge: "Exclusive Listing",
    image: "/images/building_minimal_mansion.png",
  },
  {
    id: "metro-dark",
    name: "Metropolitan Gold",
    tagline: "High-rise city skyscraper tower",
    accentColor: "#F5D061",
    bgGradient: "linear-gradient(135deg, #0B0E14, #182030)",
    badge: "Skyline Edition",
    image: "/images/building_metro_skyline.png",
  },
];
