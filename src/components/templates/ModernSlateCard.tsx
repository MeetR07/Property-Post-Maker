import { forwardRef } from "react";
import { BRAND, parseHighlights, type PostFields } from "../../lib/brand";
import DraggableHeroImage, { type PhotoTransform } from "../DraggableHeroImage";

type Props = {
  fields: PostFields;
  customImage?: string | null;
  secondaryImages?: string[];
  imagePos?: { x: number; y: number };
  imageZoom?: number;
  imageFit?: "cover" | "contain";
  gridStyle?: "single" | "split" | "grid" | "quad";
  photoTransforms?: Record<number, PhotoTransform>;
  activeEditIndex?: number;
  onSelectPhotoToEdit?: (index: number) => void;
  onImagePosChange?: (pos: { x: number; y: number }) => void;
  onPhotoPosChange?: (index: number, pos: { x: number; y: number }) => void;
  onSelectSecondary?: (index: number) => void;
};

export const ModernSlateCard = forwardRef<HTMLDivElement, Props>(
  (
    {
      fields,
      customImage,
      secondaryImages = [],
      imagePos = { x: 0, y: 0 },
      imageZoom = 1,
      imageFit = "contain",
      gridStyle = "single",
      photoTransforms = {},
      activeEditIndex = 0,
      onSelectPhotoToEdit = () => {},
      onImagePosChange = () => {},
      onPhotoPosChange = () => {},
      onSelectSecondary = () => {},
    },
    ref
  ) => {
    const property = fields.property.trim();
    const location = fields.location.trim();
    const price = fields.price.trim();
    const chips = parseHighlights(fields.highlights);
    const imageSrc = customImage || "/images/building_modern_penthouse.png";

    return (
      <div className="pc pc--slate" ref={ref} aria-label="Generated modern slate creative">
        {/* Brand Header */}
        <header className="slate-header">
          <div className="slate-brand">
            <div className="slate-logo-mark">UN</div>
            <div>
              <div className="slate-brand-name">
                {BRAND.name} <span>{BRAND.suffix}</span>
              </div>
              <div className="slate-brand-tag">{BRAND.tagline}</div>
            </div>
          </div>
          <div className="slate-badge">Penthouse Suite</div>
        </header>

        {/* Draggable Hero Visual */}
        <DraggableHeroImage
          src={imageSrc}
          alt="Luxury Building"
          isCustom={Boolean(customImage)}
          secondaryImages={secondaryImages}
          imagePos={imagePos}
          imageZoom={imageZoom}
          imageFit={imageFit}
          gridStyle={gridStyle}
          photoTransforms={photoTransforms}
          activeEditIndex={activeEditIndex}
          onSelectPhotoToEdit={onSelectPhotoToEdit}
          onImagePosChange={onImagePosChange}
          onPhotoPosChange={onPhotoPosChange}
          onSelectSecondary={onSelectSecondary}
          overlayElement={<div className="slate-hero-overlay" />}
        />

        {/* Body Details */}
        <div className="slate-body">
          <div className="slate-body-top">
            <span className="slate-eyebrow">Luxury Residence</span>
            <h1 className="slate-title">{property || "Your property name"}</h1>
            <p className="slate-location">
              <LocationPinIcon />
              <span>{location || "Location, City"}</span>
            </p>

            <div className="slate-chips">
              {chips.length > 0 ? (
                chips.map((c, i) => (
                  <span className="slate-chip" key={i}>
                    {c}
                  </span>
                ))
              ) : (
                <span className="slate-chip slate-chip--empty">Add highlights</span>
              )}
            </div>
          </div>

          {/* Price Card */}
          <div className="slate-price-card">
            <div className="slate-price-label">Investment Quote</div>
            <div className="slate-price-val">{price || "Price on request"}</div>
          </div>
        </div>

        {/* Contact Footer */}
        <footer className="slate-footer">
          <div className="slate-contact-item">
            <PhoneIcon />
            <span>{BRAND.phone}</span>
          </div>
          <div className="slate-footer-divider" />
          <div className="slate-contact-item">
            <GlobeIcon />
            <span>{BRAND.website}</span>
          </div>
        </footer>
      </div>
    );
  }
);

ModernSlateCard.displayName = "ModernSlateCard";

function LocationPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z" />
    </svg>
  );
}
