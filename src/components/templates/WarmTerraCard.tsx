import { forwardRef } from "react";
import { BRAND, parseHighlights, type PostFields } from "../../lib/brand";

type Props = { fields: PostFields; customImage?: string | null };

export const WarmTerraCard = forwardRef<HTMLDivElement, Props>(({ fields, customImage }, ref) => {
  const property = fields.property.trim();
  const location = fields.location.trim();
  const price = fields.price.trim();
  const chips = parseHighlights(fields.highlights);
  const imageSrc = customImage || "/images/building_mediterranean_villa.png";

  return (
    <div className="pc pc--terra" ref={ref} aria-label="Generated warm terra creative">
      {/* Terracotta Header */}
      <header className="wt-header">
        <div className="wt-brand">
          <div className="wt-logo-mark">
            <SunIcon />
          </div>
          <div>
            <div className="wt-brand-name">
              {BRAND.name} <span>{BRAND.suffix}</span>
            </div>
            <div className="wt-brand-tag">Mediterranean &amp; Villa Collection</div>
          </div>
        </div>
        <div className="wt-badge">Sunset Collection</div>
      </header>

      {/* Sunset Arch Visual */}
      <div className="wt-hero">
        <img
          src={imageSrc}
          alt="Sunset Villa"
          className="pc-scene-img"
        />
        <div className="wt-hero-overlay" />
      </div>

      {/* Body Details */}
      <div className="wt-body">
        <div className="wt-body-top">
          <span className="wt-eyebrow">Private Villa Sanctuary</span>
          <h1 className="wt-title">{property || "Your property name"}</h1>
          <p className="wt-location">
            <MapPinIcon />
            <span>{location || "Location, City"}</span>
          </p>

          <div className="wt-chips">
            {chips.length > 0 ? (
              chips.map((c, i) => (
                <span className="wt-chip" key={i}>
                  {c}
                </span>
              ))
            ) : (
              <span className="wt-chip wt-chip--empty">Add highlights</span>
            )}
          </div>
        </div>

        {/* Price Card */}
        <div className="wt-price-card">
          <div className="wt-price-label">Starting Price</div>
          <div className="wt-price-val">{price || "Price on request"}</div>
        </div>
      </div>

      {/* Footer Contact */}
      <footer className="wt-footer">
        <div className="wt-contact-item">
          <PhoneIcon />
          <span>{BRAND.phone}</span>
        </div>
        <div className="wt-footer-divider" />
        <div className="wt-contact-item">
          <GlobeIcon />
          <span>{BRAND.website}</span>
        </div>
      </footer>
    </div>
  );
});

WarmTerraCard.displayName = "WarmTerraCard";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#D9826C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#B2533E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#D9826C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#D9826C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
