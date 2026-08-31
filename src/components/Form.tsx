import type { PostFields } from "../lib/brand";

type FieldKey = keyof PostFields;

type Props = {
  fields: PostFields;
  onChange: (key: FieldKey, value: string) => void;
};

const CONFIG: {
  key: FieldKey;
  label: string;
  hint: string;
  placeholder: string;
  multiline?: boolean;
  max: number;
}[] = [
  {
    key: "property",
    label: "Property & type",
    hint: "What it is and the project name",
    placeholder: "4 BHK Luxury Villa, Ansal Golf City",
    max: 90,
  },
  {
    key: "location",
    label: "Location",
    hint: "Area and city",
    placeholder: "Sushant Golf City, Lucknow",
    max: 70,
  },
  {
    key: "price",
    label: "Price",
    hint: "Shown in the price band",
    placeholder: "₹2.5 Cr onwards",
    max: 40,
  },
  {
    key: "highlights",
    label: "Highlights",
    hint: "Separate with ·  ,  or  |  — up to 6 chips",
    placeholder: "3000 sq.ft · Corner Plot · Ready to Move",
    multiline: true,
    max: 160,
  },
];

export default function Form({ fields, onChange }: Props) {
  return (
    <div className="form">
      {CONFIG.map((f) => {
        const value = fields[f.key];
        return (
          <div className="field" key={f.key}>
            <div className="field-top">
              <label htmlFor={f.key} className="field-label">
                {f.label}
              </label>
              <span className="field-count">
                {value.length}/{f.max}
              </span>
            </div>
            <p className="field-hint">{f.hint}</p>
            {f.multiline ? (
              <textarea
                id={f.key}
                className="input input--area"
                value={value}
                maxLength={f.max}
                placeholder={f.placeholder}
                onChange={(e) => onChange(f.key, e.target.value)}
                rows={2}
              />
            ) : (
              <input
                id={f.key}
                className="input"
                value={value}
                maxLength={f.max}
                placeholder={f.placeholder}
                onChange={(e) => onChange(f.key, e.target.value)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
