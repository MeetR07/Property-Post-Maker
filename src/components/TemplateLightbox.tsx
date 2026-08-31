import { useEffect } from "react";
import type { PostFields } from "../lib/brand";
import type { TemplateId } from "../lib/templates";
import PropertyCard from "./PropertyCard";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  fields: PostFields;
  templateId: TemplateId;
  customImage?: string | null;
  secondaryImages?: string[];
  imagePos?: { x: number; y: number };
  imageZoom?: number;
  imageFit?: "cover" | "contain";
  gridStyle?: "single" | "split" | "grid" | "quad";
  onDownload: () => void;
  busy: boolean;
};

export default function TemplateLightbox({
  isOpen,
  onClose,
  fields,
  templateId,
  customImage,
  secondaryImages = [],
  imagePos = { x: 0, y: 0 },
  imageZoom = 1,
  imageFit = "contain",
  gridStyle = "single",
  onDownload,
  busy,
}: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-header">
          <div className="lightbox-title">
            <span className="lightbox-dot" />
            Full Screen Creative View
          </div>
          <div className="lightbox-actions">
            <button className="btn btn--primary btn--sm" onClick={onDownload} disabled={busy}>
              {busy ? "Preparing…" : "Download JPG"}
            </button>
            <button className="lightbox-close-btn" onClick={onClose} aria-label="Close modal">
              ✕
            </button>
          </div>
        </div>

        <div className="lightbox-card-wrap">
          <PropertyCard
            fields={fields}
            templateId={templateId}
            customImage={customImage}
            secondaryImages={secondaryImages}
            imagePos={imagePos}
            imageZoom={imageZoom}
            imageFit={imageFit}
            gridStyle={gridStyle}
          />
        </div>
      </div>
    </div>
  );
}
