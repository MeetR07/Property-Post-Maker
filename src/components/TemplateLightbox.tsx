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
  onDownload: () => void;
  busy: boolean;
};

export default function TemplateLightbox({
  isOpen,
  onClose,
  fields,
  templateId,
  customImage,
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
          <PropertyCard fields={fields} templateId={templateId} customImage={customImage} />
        </div>
      </div>
    </div>
  );
}
