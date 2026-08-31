// Predefined brand identity — added automatically to every generated post.
// The user never edits these.
export const BRAND = {
  name: "UrbanNest",
  suffix: "Realty",
  tagline: "Premium Listings",
  phone: "+91 98765 43210",
  website: "www.urbannestrealty.com",
} as const;

export type PostFields = {
  property: string;
  location: string;
  price: string;
  highlights: string;
};

export const DEFAULTS: PostFields = {
  property: "4 BHK Luxury Villa, Ansal Golf City",
  location: "Sushant Golf City, Lucknow",
  price: "₹2.5 Cr onwards",
  highlights: "3000 sq.ft · Corner Plot · Ready to Move",
};

// Split highlights on common separators into clean chips.
export function parseHighlights(raw: string): string[] {
  return raw
    .split(/[·•|,\n;]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 6);
}
