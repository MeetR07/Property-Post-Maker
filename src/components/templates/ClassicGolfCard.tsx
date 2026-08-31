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

export const ClassicGolfCard = forwardRef<HTMLDivElement, Props>(
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
    const imageSrc = customImage || "/images/building_golf_estate.png";

    return (
      <div className="pc pc--classic" ref={ref} aria-label="Generated property creative">
        {/* Brand strip */}
        <header className="pc-brand">
          <div className="pc-brand-id">
            <LogoMark />
            <div className="pc-brand-text">
              <span className="pc-brand-name">
                {BRAND.name}
                <span className="pc-brand-suffix">{BRAND.suffix}</span>
              </span>
              <span className="pc-brand-tag">{BRAND.tagline}</span>
            </div>
          </div>
          <span className="pc-brand-eyebrow">Featured Estate</span>
        </header>

        {/* Hero visual */}
        <DraggableHeroImage
          src={imageSrc}
          alt="Luxury Property Building"
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
          overlayElement={<div className="pc-hero-grade" />}
        />
        <Seal />

        {/* Details */}
        <div className="pc-body">
          <div className="pc-body-top">
            <div className="pc-headline">
              <span className="pc-eyebrow">Now Presenting</span>
              <h1 className="pc-title">{property || "Your property name"}</h1>
              <p className="pc-location">
                <PinIcon />
                <span>{location || "Location, City"}</span>
              </p>
            </div>

            <div className="pc-chips">
              {chips.length > 0 ? (
                chips.map((c, i) => (
                  <span className="pc-chip" key={i}>
                    {c}
                  </span>
                ))
              ) : (
                <span className="pc-chip pc-chip--empty">Add highlights</span>
              )}
            </div>
          </div>

          <div className="pc-price">
            <span className="pc-price-label">Starting Price</span>
            <span className="pc-price-value">{price || "Price on request"}</span>
          </div>
        </div>

        {/* Contact strip */}
        <footer className="pc-contact">
          <span className="pc-contact-item">
            <PhoneIcon />
            {BRAND.phone}
          </span>
          <span className="pc-contact-divider" />
          <span className="pc-contact-item">
            <GlobeIcon />
            {BRAND.website}
          </span>
        </footer>
      </div>
    );
  }
);

ClassicGolfCard.displayName = "ClassicGolfCard";

function LogoMark() {
  return (
    <svg className="pc-logo" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#C9A24B" />
      <path
        d="M13 26.5 24 16l11 10.5"
        stroke="#0F3325"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 25v8.5h16V25"
        stroke="#0F3325"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="22" y="28.5" width="4" height="5" rx="1" fill="#0F3325" />
    </svg>
  );
}

function Seal() {
  return (
    <div className="pc-seal" aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <defs>
          <path id="sealArc" d="M 60, 18 A 42,42 0 1,1 59.99,18" />
        </defs>
        <circle cx="60" cy="60" r="56" fill="#0F3325" />
        <circle cx="60" cy="60" r="52" fill="none" stroke="#C9A24B" strokeWidth="1.4" />
        <text className="pc-seal-text" fill="#E7D9B4">
          <textPath href="#sealArc" startOffset="50%" textAnchor="middle">
            · URBANNEST REALTY · PREMIUM ESTATE
          </textPath>
        </text>
        <g transform="translate(60 60)">
          <path
            d="M0 -20 L5.9 -6.2 L20 -6.2 L8.5 2.4 L13 16 L0 7.6 L-13 16 L-8.5 2.4 L-20 -6.2 L-5.9 -6.2 Z"
            fill="#C9A24B"
          />
        </g>
      </svg>
    </div>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17M12 3.5c-2.5 2.6-2.5 14.4 0 17"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}
