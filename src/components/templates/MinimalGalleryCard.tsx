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

export const MinimalGalleryCard = forwardRef<HTMLDivElement, Props>(
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
    const imageSrc = customImage || "/images/building_minimal_mansion.png";

    return (
      <div className="pc pc--minimal" ref={ref} aria-label="Generated minimal gallery creative">
        {/* Minimal Header */}
        <header className="mg-header">
          <div className="mg-brand">
            <div className="mg-logo-mark">UN</div>
            <div>
              <div className="mg-brand-name">
                {BRAND.name} <span>{BRAND.suffix}</span>
              </div>
              <div className="mg-brand-tag">{BRAND.tagline}</div>
            </div>
          </div>
          <div className="mg-badge">Exclusive Listing</div>
        </header>

        {/* Draggable Hero Visual */}
        <DraggableHeroImage
          src={imageSrc}
          alt="Minimalist Mansion"
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
        />

        {/* Body Content */}
        <div className="mg-body">
          <div className="mg-body-top">
            <span className="mg-eyebrow">Architectural Collection</span>
            <h1 className="mg-title">{property || "Your property name"}</h1>
            <p className="mg-location">
              <PinIcon />
              <span>{location || "Location, City"}</span>
            </p>

            <div className="mg-chips">
              {chips.length > 0 ? (
                chips.map((c, i) => (
                  <span className="mg-chip" key={i}>
                    {c}
                  </span>
                ))
              ) : (
                <span className="mg-chip mg-chip--empty">Add highlights</span>
              )}
            </div>
          </div>

          {/* Price Card */}
          <div className="mg-price-card">
            <div className="mg-price-label">Price Guide</div>
            <div className="mg-price-val">{price || "Price on request"}</div>
          </div>
        </div>

        {/* Footer Contact */}
        <footer className="mg-footer">
          <div className="mg-contact-item">
            <PhoneIcon />
            <span>{BRAND.phone}</span>
          </div>
          <div className="mg-footer-divider" />
          <div className="mg-contact-item">
            <GlobeIcon />
            <span>{BRAND.website}</span>
          </div>
        </footer>
      </div>
    );
  }
);

MinimalGalleryCard.displayName = "MinimalGalleryCard";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
