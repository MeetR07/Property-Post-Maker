import { useRef } from "react";
import { TEMPLATES, type TemplateId } from "../lib/templates";

type Props = {
  selectedId: TemplateId;
  onSelect: (id: TemplateId) => void;
  customImage?: string | null;
  onImageChange?: (image: string | null) => void;
};

export default function TemplatePicker({
  selectedId,
  onSelect,
  customImage,
  onImageChange,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (typeof evt.target?.result === "string" && onImageChange) {
        onImageChange(evt.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="template-picker-section">
      <div className="template-header">
        <label className="field-label">Design Templates</label>
        <span className="template-count">{TEMPLATES.length} Themes</span>
      </div>
      <p className="field-hint">Select a template to switch style live</p>

      <div className="template-sidebar-list">
        {TEMPLATES.map((tmpl) => {
          const isSelected = tmpl.id === selectedId;
          return (
            <button
              key={tmpl.id}
              type="button"
              className={`template-card ${isSelected ? "template-card--active" : ""}`}
              onClick={() => onSelect(tmpl.id)}
            >
              <div
                className="template-preview-bar"
                style={{ background: tmpl.bgGradient }}
              >
                <span
                  className="template-accent-dot"
                  style={{ background: tmpl.accentColor }}
                />
                <span className="template-badge-tag">{tmpl.badge}</span>
              </div>
              <div className="template-info">
                <div className="template-title">
                  {tmpl.name}
                  {isSelected && <span className="template-active-pill">Active</span>}
                </div>
                <div className="template-desc">{tmpl.tagline}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Add Custom Building Image Section */}
      <div className="custom-image-box">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {customImage ? (
          <div className="custom-image-active">
            <div className="custom-image-thumb">
              <img src={customImage} alt="Custom Villa Building" />
            </div>
            <div className="custom-image-info">
              <strong>Custom Image Active</strong>
              <span>Applied to all design templates</span>
            </div>
            <button
              type="button"
              className="custom-image-reset-btn"
              onClick={() => onImageChange && onImageChange(null)}
              title="Remove custom image and revert to template defaults"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="add-image-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="add-image-icon">📷</span>
            <div className="add-image-text">
              <strong>Add Custom Image</strong>
              <span>Upload villa, flat or building photo to apply across templates</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
