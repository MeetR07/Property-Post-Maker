import { useState, useRef, useEffect, type MouseEvent, type TouchEvent } from "react";

export type PhotoTransform = {
  pos: { x: number; y: number };
  zoom: number;
  fit: "cover" | "contain";
};

type Props = {
  src: string;
  alt: string;
  isCustom: boolean;
  secondaryImages?: string[];
  imagePos: { x: number; y: number };
  imageZoom: number;
  imageFit?: "cover" | "contain";
  gridStyle?: "single" | "split" | "grid" | "quad";
  photoTransforms?: Record<number, PhotoTransform>;
  activeEditIndex?: number;
  onSelectPhotoToEdit?: (index: number) => void;
  onImagePosChange: (pos: { x: number; y: number }) => void;
  onPhotoPosChange?: (index: number, pos: { x: number; y: number }) => void;
  onSelectSecondary?: (index: number) => void;
  overlayElement?: React.ReactNode;
};

export default function DraggableHeroImage({
  src,
  alt,
  isCustom,
  secondaryImages = [],
  imagePos,
  imageZoom,
  imageFit = "contain",
  gridStyle = "single",
  photoTransforms = {},
  activeEditIndex = 0,
  onSelectPhotoToEdit,
  onImagePosChange,
  onPhotoPosChange,
  onSelectSecondary,
  overlayElement,
}: Props) {
  // Helper to get transform for image index
  const getTransform = (idx: number): PhotoTransform => {
    if (photoTransforms[idx]) return photoTransforms[idx];
    if (idx === 0) return { pos: imagePos, zoom: imageZoom, fit: imageFit };
    return { pos: { x: 0, y: 0 }, zoom: 1, fit: "cover" };
  };

  const handleCellPosChange = (idx: number, pos: { x: number; y: number }) => {
    if (idx === 0) {
      onImagePosChange(pos);
    }
    if (onPhotoPosChange) {
      onPhotoPosChange(idx, pos);
    }
  };

  const handleCellSelect = (idx: number) => {
    if (onSelectPhotoToEdit) {
      onSelectPhotoToEdit(idx);
    }
  };

  const allImages = [src, ...secondaryImages];

  // -------------------------------------------------------------
  // MULTI-PHOTO SPLIT GRID LAYOUTS (Every photo cell is draggable)
  // -------------------------------------------------------------
  if (isCustom && secondaryImages.length > 0 && gridStyle !== "single") {
    // 2-Photo Split Mode (50/50 Columns)
    if (gridStyle === "split" || (gridStyle === "grid" && secondaryImages.length === 1)) {
      return (
        <div className="pc-hero pc-hero--grid-split">
          {allImages.slice(0, 2).map((img, idx) => (
            <GridCell
              key={idx}
              src={img}
              alt={`Photo ${idx + 1}`}
              index={idx}
              badge={`Photo ${idx + 1}`}
              transform={getTransform(idx)}
              isEditing={activeEditIndex === idx}
              onSelect={() => handleCellSelect(idx)}
              onPosChange={(pos) => handleCellPosChange(idx, pos)}
            />
          ))}
          {overlayElement}
        </div>
      );
    }

    // 3-Photo Grid Mode (1 Large Hero + 2 Stacked Side Photos)
    if (gridStyle === "grid" && secondaryImages.length >= 2) {
      return (
        <div className="pc-hero pc-hero--grid-3">
          <GridCell
            src={allImages[0]}
            alt="Hero Photo 1"
            index={0}
            badge="Photo 1 (Hero)"
            transform={getTransform(0)}
            isEditing={activeEditIndex === 0}
            onSelect={() => handleCellSelect(0)}
            onPosChange={(pos) => handleCellPosChange(0, pos)}
            className="pc-grid-cell--hero"
          />

          <div className="pc-grid-stacked">
            <GridCell
              src={allImages[1]}
              alt="Photo 2"
              index={1}
              badge="Photo 2"
              transform={getTransform(1)}
              isEditing={activeEditIndex === 1}
              onSelect={() => handleCellSelect(1)}
              onPosChange={(pos) => handleCellPosChange(1, pos)}
            />
            <GridCell
              src={allImages[2]}
              alt="Photo 3"
              index={2}
              badge="Photo 3"
              transform={getTransform(2)}
              isEditing={activeEditIndex === 2}
              onSelect={() => handleCellSelect(2)}
              onPosChange={(pos) => handleCellPosChange(2, pos)}
            />
          </div>
          {overlayElement}
        </div>
      );
    }

    // 4-Photo Quad Grid Mode (2x2 Quad Grid)
    if (gridStyle === "quad" && secondaryImages.length >= 3) {
      return (
        <div className="pc-hero pc-hero--grid-4">
          {allImages.slice(0, 4).map((img, idx) => (
            <GridCell
              key={idx}
              src={img}
              alt={`Photo ${idx + 1}`}
              index={idx}
              badge={`Photo ${idx + 1}`}
              transform={getTransform(idx)}
              isEditing={activeEditIndex === idx}
              onSelect={() => handleCellSelect(idx)}
              onPosChange={(pos) => handleCellPosChange(idx, pos)}
            />
          ))}
          {overlayElement}
        </div>
      );
    }
  }

  // Standard Single Photo Mode
  const heroTransform = getTransform(0);
  return (
    <div className="pc-hero-wrapper">
      <GridCell
        src={src}
        alt={alt}
        index={0}
        badge="Main Hero"
        transform={heroTransform}
        isEditing={activeEditIndex === 0}
        onSelect={() => handleCellSelect(0)}
        onPosChange={(pos) => handleCellPosChange(0, pos)}
        isSingleMode
        secondaryImages={secondaryImages}
        onSelectSecondary={onSelectSecondary}
        isCustom={isCustom}
      />
      {overlayElement}
    </div>
  );
}

// -------------------------------------------------------------
// REUSABLE INTERACTIVE PHOTO CELL (Window Dragging & Zooming)
// -------------------------------------------------------------
type CellProps = {
  src: string;
  alt: string;
  index: number;
  badge: string;
  transform: PhotoTransform;
  isEditing: boolean;
  onSelect: () => void;
  onPosChange: (pos: { x: number; y: number }) => void;
  className?: string;
  isSingleMode?: boolean;
  secondaryImages?: string[];
  onSelectSecondary?: (index: number) => void;
  isCustom?: boolean;
};

function GridCell({
  src,
  alt,
  badge,
  transform,
  isEditing,
  onSelect,
  onPosChange,
  className = "",
  isSingleMode = false,
  secondaryImages = [],
  onSelectSecondary,
  isCustom = true,
}: CellProps) {
  const [isDraggingState, setIsDraggingState] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef(transform.pos);

  // Keep currentPosRef updated when transform.pos changes outside of drag
  useEffect(() => {
    if (!isDraggingRef.current) {
      currentPosRef.current = transform.pos;
    }
  }, [transform.pos]);

  const activeFit = isCustom ? transform.fit : "cover";
  const activePos = isCustom ? currentPosRef.current : { x: 0, y: 0 };
  const activeZoom = isCustom ? transform.zoom : 1;

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!isCustom) return;
    e.preventDefault();
    e.stopPropagation();

    onSelect();

    isDraggingRef.current = true;
    setIsDraggingState(true);
    dragStartRef.current = {
      x: e.clientX - currentPosRef.current.x,
      y: e.clientY - currentPosRef.current.y,
    };

    const handleWindowMouseMove = (moveEvent: globalThis.MouseEvent) => {
      if (!isDraggingRef.current) return;
      const newPos = {
        x: moveEvent.clientX - dragStartRef.current.x,
        y: moveEvent.clientY - dragStartRef.current.y,
      };
      currentPosRef.current = newPos;
      onPosChange(newPos);
    };

    const handleWindowMouseUp = () => {
      isDraggingRef.current = false;
      setIsDraggingState(false);
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!isCustom || e.touches.length !== 1) return;
    onSelect();

    isDraggingRef.current = true;
    setIsDraggingState(true);
    dragStartRef.current = {
      x: e.touches[0].clientX - currentPosRef.current.x,
      y: e.touches[0].clientY - currentPosRef.current.y,
    };

    const handleWindowTouchMove = (touchEvent: globalThis.TouchEvent) => {
      if (!isDraggingRef.current || touchEvent.touches.length !== 1) return;
      const newPos = {
        x: touchEvent.touches[0].clientX - dragStartRef.current.x,
        y: touchEvent.touches[0].clientY - dragStartRef.current.y,
      };
      currentPosRef.current = newPos;
      onPosChange(newPos);
    };

    const handleWindowTouchEnd = () => {
      isDraggingRef.current = false;
      setIsDraggingState(false);
      window.removeEventListener("touchmove", handleWindowTouchMove);
      window.removeEventListener("touchend", handleWindowTouchEnd);
    };

    window.addEventListener("touchmove", handleWindowTouchMove);
    window.addEventListener("touchend", handleWindowTouchEnd);
  };

  return (
    <div
      className={`pc-grid-cell ${isEditing ? "pc-grid-cell--editing" : ""} ${
        isSingleMode ? `pc-hero ${isCustom ? "pc-hero--draggable" : ""}` : "pc-hero--draggable"
      } ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        cursor: isCustom ? (isDraggingState ? "grabbing" : "grab") : "default",
      }}
    >
      {/* Ambient Blurred Background ONLY for user-uploaded custom images in contain fit mode */}
      {isCustom && activeFit === "contain" && (
        <img
          src={src}
          alt=""
          className="pc-scene-blur-bg"
          aria-hidden="true"
        />
      )}

      {/* Building Photo */}
      <img
        src={src}
        alt={alt}
        className={`pc-scene-img ${activeFit === "contain" ? "pc-scene-img--contain" : "pc-scene-img--cover"}`}
        style={{
          transform: isCustom
            ? `translate(${activePos.x}px, ${activePos.y}px) scale(${activeZoom})`
            : "none",
          transformOrigin: "center center",
          transition: isDraggingState ? "none" : "transform 0.1s ease-out",
        }}
        draggable={false}
      />

      <span className="pc-grid-badge">
        {isEditing ? `✏️ ${badge}` : badge}
      </span>

      {/* Secondary Photo Gallery Insets in single mode */}
      {isSingleMode && isCustom && secondaryImages.length > 0 && (
        <div className="pc-multi-image-strip">
          {secondaryImages.map((img, idx) => (
            <div
              key={idx}
              className="pc-inset-thumb"
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectSecondary) onSelectSecondary(idx + 1);
              }}
              title={`Click to set Photo ${idx + 2} as main hero`}
            >
              <img src={img} alt={`Additional view ${idx + 2}`} />
              <span className="pc-thumb-badge">Photo {idx + 2}</span>
            </div>
          ))}
        </div>
      )}

      {isCustom && (
        <div className="custom-image-drag-hint">
          {isDraggingState ? "✊ Panning photo..." : "✋ Click & drag with cursor"}
        </div>
      )}
    </div>
  );
}
