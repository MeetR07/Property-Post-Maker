import { forwardRef } from "react";
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
};

// Master PropertyCard dispatcher supporting 6 design templates & custom building images
const PropertyCard = forwardRef<HTMLDivElement, Props>(({ fields, templateId = "classic-golf", customImage }, ref) => {
  switch (templateId) {
    case "modern-slate":
      return <ModernSlateCard ref={ref} fields={fields} customImage={customImage} />;
    case "waterfront-bay":
      return <WaterfrontBayCard ref={ref} fields={fields} customImage={customImage} />;
    case "warm-terra":
      return <WarmTerraCard ref={ref} fields={fields} customImage={customImage} />;
    case "minimal-gallery":
      return <MinimalGalleryCard ref={ref} fields={fields} customImage={customImage} />;
    case "metro-dark":
      return <MetroDarkCard ref={ref} fields={fields} customImage={customImage} />;
    case "classic-golf":
    default:
      return <ClassicGolfCard ref={ref} fields={fields} customImage={customImage} />;
  }
});

PropertyCard.displayName = "PropertyCard";
export default PropertyCard;
