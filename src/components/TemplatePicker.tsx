import { useRef } from "react";
import { TEMPLATES, type TemplateId } from "../lib/templates";

type Props = {
  selectedId: TemplateId;
  onSelect: (id: TemplateId) => void;
  customImages: string[];
  onImagesChange: (images: string[]) => void;
  imageZoom: number;
  onZoomChange: (zoom: number) => void;
  imageFit: "cover" | "contain";
  onFitChange: (fit: "cover" | "contain") => void;
  gridStyle: "single" | "split" | "grid" | "quad";
  onGridStyleChange: (style: "single" | "split" | "grid" | "quad") => void;
  activeEditIndex: number;
  onSelectPhotoToEdit: (index: number) => void;
  onResetPos: () => void;
};

export default function TemplatePicker({
  selectedId,
  onSelect,
  customImages,
  onImagesChange,
  imageZoom,
  onZoomChange,
  imageFit,
  onFitChange,
  gridStyle,
  onGridStyleChange,
  activeEditIndex,
  onSelectPhotoToEdit,
  onResetPos,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    const readPromises = fileList.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (evt) => {
            if (typeof evt.target?.result === "string") {
              resolve(evt.target.result);
            }
          };
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readPromises).then((newImages) => {
      const combined = [...customImages, ...newImages];
      onImagesChange(combined);
      if (gridStyle === "single" && combined.length >= 2) {
        onGridStyleChange(combined.length === 2 ? "split" : combined.length === 3 ? "grid" : "quad");
      }
    });
  };

  const handleRemoveImage = (index: number) => {
    const updated = customImages.filter((_, i) => i !== index);
    onImagesChange(updated);
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

      {/* Add Custom Building Images & Multi-Photo Section */}
      <div className="custom-image-box">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          multiple
          onChange={handleFilesChange}
          style={{ display: "none" }}
        />

        {customImages.length > 0 ? (
          <div className="custom-image-active-wrap">
            {/* Multi-Photo Thumbnail Tray */}
            <div className="multi-photo-tray-header">
              <strong>Uploaded Photos ({customImages.length})</strong>
              <button
                type="button"
                className="add-more-photos-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Add more photos to post"
              >
                + Add Photos
              </button>
            </div>

            <p className="field-hint multi-photo-hint">
              Click photo to select &amp; edit position with cursor
            </p>

            <div className="multi-photo-grid">
              {customImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`multi-photo-item ${activeEditIndex === idx ? "multi-photo-item--primary" : ""}`}
                  onClick={() => onSelectPhotoToEdit(idx)}
                  title={`Click to edit Photo ${idx + 1}`}
                >
                  <img src={img} alt={`Upload ${idx + 1}`} />
                  <span className="multi-photo-badge">
                    {idx === 0 ? "⭐ Photo 1" : `Photo ${idx + 1}`}
                  </span>
                  <button
                    type="button"
                    className="multi-photo-remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(idx);
                    }}
                    title="Remove photo"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Post Photo Layout Grid Selector (when 2+ photos uploaded) */}
            {customImages.length >= 2 && (
              <div className="layout-mode-section">
                <label className="zoom-label">Post Layout Mode:</label>
                <div className="layout-mode-row">
                  <button
                    type="button"
                    className={`layout-mode-btn ${gridStyle === "split" ? "layout-mode-btn--active" : ""}`}
                    onClick={() => onGridStyleChange("split")}
                    title="Display 2 photos side-by-side in one post"
                  >
                    🌓 2-Split
                  </button>
                  {customImages.length >= 3 && (
                    <button
                      type="button"
                      className={`layout-mode-btn ${gridStyle === "grid" ? "layout-mode-btn--active" : ""}`}
                      onClick={() => onGridStyleChange("grid")}
                      title="Display 3 photos together in grid collage"
                    >
                      🧱 3-Grid
                    </button>
                  )}
                  {customImages.length >= 4 && (
                    <button
                      type="button"
                      className={`layout-mode-btn ${gridStyle === "quad" ? "layout-mode-btn--active" : ""}`}
                      onClick={() => onGridStyleChange("quad")}
                      title="Display 4 photos together in 2x2 quad grid"
                    >
                      ▦ 4-Quad
                    </button>
                  )}
                  <button
                    type="button"
                    className={`layout-mode-btn ${gridStyle === "single" ? "layout-mode-btn--active" : ""}`}
                    onClick={() => onGridStyleChange("single")}
                    title="Display single hero photo with insets"
                  >
                    🖼️ Single
                  </button>
                </div>
              </div>
            )}

            {/* Interactive Image Editing Controls */}
            <div className="image-edit-toolbar">
              {/* Photo Selector for Editing */}
              {customImages.length > 1 && (
                <div className="edit-photo-selector">
                  <label className="zoom-label">Editing Controls For:</label>
                  <div className="photo-tab-row">
                    {customImages.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`photo-tab-btn ${activeEditIndex === idx ? "photo-tab-btn--active" : ""}`}
                        onClick={() => onSelectPhotoToEdit(idx)}
                      >
                        {idx === 0 ? "⭐ Photo 1" : `Photo ${idx + 1}`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Fit Mode Toggle */}
              <div className="fit-toggle-row">
                <button
                  type="button"
                  className={`fit-toggle-btn ${imageFit === "contain" ? "fit-toggle-btn--active" : ""}`}
                  onClick={() => onFitChange("contain")}
                  title="Show full image without cutting photo"
                >
                  🖼️ Full Photo (No Cut)
                </button>
                <button
                  type="button"
                  className={`fit-toggle-btn ${imageFit === "cover" ? "fit-toggle-btn--active" : ""}`}
                  onClick={() => onFitChange("cover")}
                  title="Fill container box with auto-fit"
                >
                  🔍 Fill Box (Auto-Fit)
                </button>
              </div>

              <div className="zoom-control-row">
                <label className="zoom-label">
                  Photo {activeEditIndex + 1} Zoom: <span>{imageZoom.toFixed(1)}x</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="2.5"
                  step="0.05"
                  value={imageZoom}
                  onChange={(e) => onZoomChange(parseFloat(e.target.value))}
                  className="zoom-range-slider"
                />
              </div>

              <div className="image-edit-actions">
                <button
                  type="button"
                  className="image-edit-btn"
                  onClick={onResetPos}
                  title="Reset active photo position and zoom"
                >
                  🔄 Reset Pos
                </button>
                <button
                  type="button"
                  className="image-edit-btn"
                  onClick={() => onImagesChange([])}
                  title="Clear all photos"
                >
                  🗑️ Clear All
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="add-image-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="add-image-icon">📷</span>
            <div className="add-image-text">
              <strong>Add Custom Images</strong>
              <span>Upload 2, 3 or 4 photos to show together on one post</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
