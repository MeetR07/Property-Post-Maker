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

export const MetroDarkCard = forwardRef<HTMLDivElement, Props>(
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
    const imageSrc = customImage || "/images/building_metro_skyline.png";

    return (
      <div className="pc pc--metro" ref={ref} aria-label="Generated metropolitan dark creative">
        {/* Metro Header */}
        <header className="md-header">
          <div className="md-brand">
            <div className="md-logo-mark">
              <BuildingIcon />
            </div>
            <div>
              <div className="md-brand-name">
                {BRAND.name} <span>{BRAND.suffix}</span>
              </div>
              <div className="md-brand-tag">Metropolitan Residences</div>
            </div>
          </div>
          <div className="md-badge">Skyline Edition</div>
        </header>

        {/* Draggable Skyline Hero Visual */}
        <DraggableHeroImage
          src={imageSrc}
          alt="Metropolitan Condominium"
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
          overlayElement={<div className="md-hero-overlay" />}
        />

        {/* Glassmorphic Body Container */}
        <div className="md-body">
          <div className="md-glass-panel">
            <div className="md-body-top">
              <span className="md-eyebrow">Ultra High-Rise Penthouse</span>
              <h1 className="md-title">{property || "Your property name"}</h1>
              <p className="md-location">
                <SparklePinIcon />
                <span>{location || "Location, City"}</span>
              </p>

              <div className="md-chips">
                {chips.length > 0 ? (
                  chips.map((c, i) => (
                    <span className="md-chip" key={i}>
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="md-chip md-chip--empty">Add highlights</span>
                )}
              </div>
            </div>

            {/* Golden Metallic Price Card */}
            <div className="md-price-card">
              <div className="md-price-label">Price / Valuation</div>
              <div className="md-price-val">{price || "Price on request"}</div>
            </div>
          </div>
        </div>

        {/* Footer Contact */}
        <footer className="md-footer">
          <div className="md-contact-item">
            <PhoneIcon />
            <span>{BRAND.phone}</span>
          </div>
          <div className="md-footer-divider" />
          <div className="md-contact-item">
            <GlobeIcon />
            <span>{BRAND.website}</span>
          </div>
        </footer>
      </div>
    );
  }
);

MetroDarkCard.displayName = "MetroDarkCard";

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#F5D061" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="9" y1="6" x2="9.01" y2="6" strokeWidth="3" />
      <line x1="15" y1="6" x2="15.01" y2="6" strokeWidth="3" />
      <line x1="9" y1="10" x2="9.01" y2="10" strokeWidth="3" />
      <line x1="15" y1="10" x2="15.01" y2="10" strokeWidth="3" />
      <line x1="9" y1="14" x2="9.01" y2="14" strokeWidth="3" />
      <line x1="15" y1="15" x2="15.01" y2="14" strokeWidth="3" />
      <path d="M10 22v-4h4v4" />
    </svg>
  );
}

function SparklePinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#F5D061" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" fill="#F5D061" opacity="0.4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#F5D061" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#F5D061" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z" />
    </svg>
  );
}
