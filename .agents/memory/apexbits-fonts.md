---
name: ApexBITS font system
description: Three-font hierarchy for ApexBITS — Dopis Black headlines, Season Serif italic body, Akkurat Mono UI labels.
---

## Rule
Always use all three fonts in the correct role:
- **Dopis Black (900)** — Hero h1, section titles, stat numbers, card headings. CSS: `font-family: 'Dopis', system-ui, sans-serif; font-weight: 900`
- **Season Serif italic (400i)** — Italic accent word inside Dopis headlines (e.g. *Ecosystem.*, *Predictor.*), paragraphs, body copy. CSS: `font-family: 'Season Serif', Georgia, serif; font-style: italic`
- **Akkurat Mono (400/500/600)** — Nav links, pill labels, buttons, tags, mono data. CSS: `font-family: 'Akkurat Mono', monospace`

**Why:** The contrast between Dopis Black (compressed, powerful) and Season Serif italic (flowing, elegant) creates the Aptos-inspired editorial look the user wants. Akkurat Mono keeps UI elements crisp and technical.

**How to apply:** Every headline follows the pattern: Dopis Black for the main words + Season Serif italic for the final/accent word. Example: `<h1>BITS College <em style="font-family: Season Serif; font-style: italic; font-weight: 400">Predictor.</em></h1>`

## Font Files (public/fonts/)
```
Dopis-Light.woff2      — 300
Dopis-Regular.woff2    — 400
Dopis-Bold.woff2       — 700
Dopis-Black.woff2      — 900  ← primary headline weight
SeasonSerif-TRIAL-*.ttf (Light/Regular/Medium/SemiBold/Bold)
AkkuratMono-Regular.woff2
```
