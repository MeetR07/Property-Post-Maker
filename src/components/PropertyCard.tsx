import { forwardRef } from "react";
import type { PhotoTransform } from "./DraggableHeroImage";
import type { PostFields } from "../lib/brand";
import type { TemplateId } from "../lib/templates";
import { ClassicGolfCard } from "./templates/ClassicGolfCard";
import { MetroDarkCard } from "./templates/MetroDarkCard";
import { MinimalGalleryCard } from "./templates/MinimalGalleryCard";
import { ModernSlateCard } from "./templates/ModernSlateCard";
import { WaterfrontBayCard } from "./templates/WaterfrontBayCard";
import { WarmTerraCard } from "./templates/WarmTerraCard";

type Props = {
  fields: PostFields;
  templateId?: TemplateId;
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

// Master PropertyCard dispatcher supporting 6 design templates & multi-image custom uploads
const PropertyCard = forwardRef<HTMLDivElement, Props>(
  (
    {
      fields,
      templateId = "classic-golf",
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
    const props = {
      fields,
      customImage,
      secondaryImages,
      imagePos,
      imageZoom,
      imageFit,
      gridStyle,
      photoTransforms,
      activeEditIndex,
      onSelectPhotoToEdit,
      onImagePosChange,
      onPhotoPosChange,
      onSelectSecondary,
    };

    switch (templateId) {
      case "modern-slate":
        return <ModernSlateCard ref={ref} {...props} />;
      case "waterfront-bay":
        return <WaterfrontBayCard ref={ref} {...props} />;
      case "warm-terra":
        return <WarmTerraCard ref={ref} {...props} />;
      case "minimal-gallery":
        return <MinimalGalleryCard ref={ref} {...props} />;
      case "metro-dark":
        return <MetroDarkCard ref={ref} {...props} />;
      case "classic-golf":
      default:
        return <ClassicGolfCard ref={ref} {...props} />;
    }
  }
);

PropertyCard.displayName = "PropertyCard";
export default PropertyCard;
