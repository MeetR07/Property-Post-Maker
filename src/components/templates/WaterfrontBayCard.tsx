import { forwardRef } from "react";
import { BRAND, parseHighlights, type PostFields } from "../../lib/brand";

type Props = { fields: PostFields; customImage?: string | null };

export const WaterfrontBayCard = forwardRef<HTMLDivElement, Props>(({ fields, customImage }, ref) => {
  const property = fields.property.trim();
  const location = fields.location.trim();
  const price = fields.price.trim();
  const chips = parseHighlights(fields.highlights);
  const imageSrc = customImage || "/images/building_waterfront_villa.png";

  return (
    <div className="pc pc--waterfront" ref={ref} aria-label="Generated waterfront bay creative">
      {/* Ocean Header */}
      <header className="wb-header">
        <div className="wb-brand">
          <div className="wb-logo-mark">
            <AnchorIcon />
          </div>
          <div>
            <div className="wb-brand-name">
              {BRAND.name} <span>{BRAND.suffix}</span>
            </div>
            <div className="wb-brand-tag">Coastal &amp; Waterfront Estates</div>
          </div>
        </div>
        <div className="wb-badge">Waterfront View</div>
      </header>

      {/* Ocean Hero Visual */}
      <div className="wb-hero">
        <img
          src={imageSrc}
          alt="Waterfront Property"
          className="pc-scene-img"
        />
        <div className="wb-hero-overlay" />
      </div>

      {/* Body Content */}
      <div className="wb-body">
        <div className="wb-body-top">
          <span className="wb-eyebrow">Prime Coastal Living</span>
          <h1 className="wb-title">{property || "Your property name"}</h1>
          <p className="wb-location">
            <CompassIcon />
            <span>{location || "Location, City"}</span>
          </p>

          <div className="wb-chips">
            {chips.length > 0 ? (
              chips.map((c, i) => (
                <span className="wb-chip" key={i}>
                  {c}
                </span>
              ))
            ) : (
              <span className="wb-chip wb-chip--empty">Add highlights</span>
            )}
          </div>
        </div>

        {/* Price Card */}
        <div className="wb-price-card">
          <div className="wb-price-label">Offer Price</div>
          <div className="wb-price-val">{price || "Price on request"}</div>
        </div>
      </div>

      {/* Footer Contact */}
      <footer className="wb-footer">
        <div className="wb-contact-item">
          <PhoneIcon />
          <span>{BRAND.phone}</span>
        </div>
        <div className="wb-footer-divider" />
        <div className="wb-contact-item">
          <GlobeIcon />
          <span>{BRAND.website}</span>
        </div>
      </footer>
    </div>
  );
});

WaterfrontBayCard.displayName = "WaterfrontBayCard";

function AnchorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3" />
      <line x1="12" y1="8" x2="12" y2="21" />
      <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#00D4FF" opacity="0.3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
