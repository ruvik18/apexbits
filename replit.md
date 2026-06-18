# ApexBITS — Next.js App

BITSAT 2026 tools — free college predictor and score data analysis for BITS Pilani, Goa, and Hyderabad. Aptos Network-inspired design with Season Serif + Akkurat Mono typography.

## Stack
- **Framework**: Next.js 14.2.29 (App Router, TypeScript)
- **Styling**: Tailwind CSS v3.4 + inline styles (hybrid for design tokens)
- **Fonts**: Season Serif (Light/Regular/Medium/SemiBold/Bold .ttf) + Akkurat Mono (.woff2) — loaded via @font-face in globals.css
- **Animation**: CSS animations (no framer-motion on critical path)
- **Data**: CSV (predictor cutoffs) + JSON (score buckets) fetched client-side from /public/assets/data/

## Routes
- `/` — Homepage with animated BITS Pilani sketch hero, stats, feature cards
- `/predictor` — BITSAT college predictor (Phodu Club, MathonGo, Canvas Classes models)
- `/score-data` — Score distribution chart with Phodu Club and ApexBITS datasets

## Dev
```
npm run dev   # port 5000
npm run build
npm run start # port 5000
```

## Public Assets
```
public/fonts/          — Season Serif TTFs + Akkurat Mono WOFF2
public/assets/data/    — predictor-cutoffs.csv, phodu-scores.json, scores.json
public/assets/images/  — logo-square.png
```

## Design System (Aptos-inspired)
- Colors: `#f9f9f0` (bg), `#d5fad3` (mint), `#badbee` (blue), `#0f0e0b` (ink), `#21201c` (coal), `#9d937c` (tan)
- Grid background: 36px × 36px dot grid on all pages
- Typography: Season Serif for display/body, Akkurat Mono for labels/mono
- Buttons: pill-shaped, dark fill CTA or outlined

## User preferences
- No auth, no databases — static data from CSV/JSON files
- All tools free, no signup walls
- Aptos Network design language as reference
