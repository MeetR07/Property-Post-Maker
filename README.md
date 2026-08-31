# Property Post Maker · UrbanNest Realty

Generate professional, ready-to-share real-estate marketing creatives in
seconds. Fill in four details and a branded 1080 × 1350 (4:5) post updates live;
export it as a high-quality PNG.

Built by **Meet**.

## Features
- Exactly four inputs: **Property & type · Location · Price · Highlights**
- Live preview that updates on every keystroke
- Brand strip, logo, contact info added automatically (never entered by hand)
- **Download post** → high-quality PNG (2160 × 2700, 4:5)
- **Reset** restores the default example
- Responsive (desktop + mobile), long text clamps cleanly, empty inputs show
  graceful placeholders

## Stack
Vite · React 18 · TypeScript · html2canvas

## Run
```bash
npm install
npm run dev        # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

The `dist/` folder is static and deployment-ready (Netlify, Vercel, GitHub
Pages, any static host).

## Where things live
- `src/lib/brand.ts` — brand identity, defaults, highlight parsing
- `src/components/PropertyCard.tsx` — the exported creative (fixed 1080 × 1350)
- `src/components/Form.tsx` — the four-field input form
- `src/lib/download.ts` — PNG export
- `src/index.css` — full design system
