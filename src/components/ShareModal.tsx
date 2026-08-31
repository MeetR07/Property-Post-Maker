import { useState } from "react";
import type { PostFields } from "../lib/brand";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  fields: PostFields;
  onNativeShare: () => void;
  busy: boolean;
};

export default function ShareModal({
  isOpen,
  onClose,
  fields,
  onNativeShare,
  busy,
}: Props) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const propertyText = `🏡 ${fields.property || "Luxury Property"}\n📍 ${
    fields.location || "Prime Location"
  }\n💰 ${fields.price || "Price on Request"}\n✨ Highlights: ${
    fields.highlights || "Contact for details"
  }\n📞 Contact: +91 98765 43210 | www.urbannestrealty.com`;

  const handleCopy = () => {
    navigator.clipboard.writeText(propertyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="share-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="share-modal-header">
          <div className="share-modal-title">
            <span className="share-icon-badge">📤</span>
            Share Property Creative
          </div>
          <button className="lightbox-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <p className="share-modal-sub">
          Share your high-resolution property post image or copy formatted details.
        </p>

        {/* Native Web Share API option */}
        {"share" in navigator && (
          <button
            type="button"
            className="share-native-btn"
            onClick={onNativeShare}
            disabled={busy}
          >
            <span className="share-native-icon">✨</span>
            <div className="share-native-text">
              <strong>{busy ? "Preparing Image..." : "Share Image via Device App"}</strong>
              <span>Open native share menu to send image file directly</span>
            </div>
          </button>
        )}

        {/* Copy details box */}
        <div className="share-copy-box">
          <pre className="share-preview-text">{propertyText}</pre>
          <button type="button" className="share-copy-btn" onClick={handleCopy}>
            {copied ? "✓ Copied!" : "📋 Copy Details"}
          </button>
        </div>
      </div>
    </div>
  );
}
