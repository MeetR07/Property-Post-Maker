import { useCallback, useEffect, useRef, useState } from "react";
import Form from "./components/Form";
import PropertyCard from "./components/PropertyCard";
import ShareModal from "./components/ShareModal";
import TemplateLightbox from "./components/TemplateLightbox";
import TemplatePicker from "./components/TemplatePicker";
import { BRAND, DEFAULTS, type PostFields } from "./lib/brand";
import { downloadCreative, shareCreativeImage } from "./lib/download";
import type { TemplateId } from "./lib/templates";

const CARD_W = 1080;
const CARD_H = 1350;

export default function App() {
  const [fields, setFields] = useState<PostFields>(DEFAULTS);
  const [templateId, setTemplateId] = useState<TemplateId>("classic-golf");
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [scale, setScale] = useState(0.4);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const update = useCallback((key: keyof PostFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setFields(DEFAULTS);
    setTemplateId("classic-golf");
    setCustomImage(null);
  }, []);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current || busy) return;
    setBusy(true);
    try {
      const slug =
        (fields.property || "property")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
          .slice(0, 40) || "property";
      await downloadCreative(cardRef.current, `urbannest-${templateId}-${slug}.jpg`);
    } catch (err) {
      console.error(err);
      alert("Could not export the image. Please try again.");
    } finally {
      setBusy(false);
    }
  }, [busy, fields.property, templateId]);

  const handleNativeShare = useCallback(async () => {
    if (!cardRef.current || busy) return;
    setBusy(true);
    try {
      const summary = `🏡 ${fields.property}\n📍 ${fields.location}\n💰 ${fields.price}\n✨ ${fields.highlights}`;
      await shareCreativeImage(cardRef.current, fields.property, summary);
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(false);
    }
  }, [busy, fields]);

  // Fit the fixed 1080x1350 creative into whatever width the stage has.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const avail = el.clientWidth;
      setScale(Math.min(avail / CARD_W, 1));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="app">
      <div className="shell">
        {/* ----- Column 1 (Left): Form Controls ----- */}
        <section className="panel" aria-label="Post details">
          <div className="masthead">
            <div className="masthead-mark">
              <span>UN</span>
            </div>
            <div>
              <h1 className="masthead-title">Property Post Maker</h1>
              <p className="masthead-sub">
                {BRAND.name}
                {BRAND.suffix} · marketing studio
              </p>
            </div>
          </div>

          <p className="lede">
            Fill in four details below. Pick a design template or upload your custom villa photo on the right.
          </p>

          <Form fields={fields} onChange={update} />

          <div className="actions">
            <button
              className="btn btn--primary"
              onClick={handleDownload}
              disabled={busy}
            >
              {busy ? "Preparing…" : "Download"}
            </button>
            <button
              className="btn btn--share"
              onClick={() => setIsShareModalOpen(true)}
              disabled={busy}
              title="Share listing to messaging apps"
            >
              📤 Share
            </button>
            <button className="btn btn--ghost" onClick={reset} disabled={busy}>
              Reset
            </button>
          </div>

          <p className="fineprint">
            Exports a 1080 × 1350 JPG · 4:5 · ready for Instagram &amp; WhatsApp
          </p>
        </section>

        {/* ----- Column 2 (Middle): Live Preview Stage ----- */}
        <section className="preview" aria-label="Live preview">
          <div className="stage-panel">
            <div className="preview-bar">
              <div className="preview-bar-left">
                <span className="preview-dot" />
                Live preview
              </div>
              <button
                type="button"
                className="preview-expand-btn"
                onClick={() => setIsLightboxOpen(true)}
                title="Click to view big size"
              >
                🔍 Enlarge View
              </button>
            </div>

            <div className="stage" ref={stageRef}>
              <div
                className="stage-scaler"
                style={{
                  width: CARD_W * scale,
                  height: CARD_H * scale,
                }}
              >
                <div
                  className="stage-canvas"
                  style={{ transform: `scale(${scale})` }}
                  onClick={() => setIsLightboxOpen(true)}
                  title="Click to open big size view"
                >
                  <PropertyCard
                    ref={cardRef}
                    fields={fields}
                    templateId={templateId}
                    customImage={customImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----- Column 3 (Far Right): Design Templates Sidebar ----- */}
        <aside className="templates-sidebar" aria-label="Design templates">
          <div className="sidebar-panel">
            <TemplatePicker
              selectedId={templateId}
              onSelect={setTemplateId}
              customImage={customImage}
              onImageChange={setCustomImage}
            />
          </div>
        </aside>
      </div>

      {/* Full-Screen Big Size Lightbox Modal */}
      <TemplateLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        fields={fields}
        templateId={templateId}
        customImage={customImage}
        onDownload={handleDownload}
        busy={busy}
      />

      {/* Share Options Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        fields={fields}
        onNativeShare={handleNativeShare}
        busy={busy}
      />

      <footer className="credit">
        Built by <strong>Meet</strong> · demo branding for {BRAND.name}
        {BRAND.suffix}
      </footer>
    </div>
  );
}
