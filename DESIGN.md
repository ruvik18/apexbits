# ApexBITS Design System

## Philosophy
Aptos Network–inspired editorial design system. Clean, bold, trustworthy. Serifs for expression, mono for precision, Dopis Black for impact. No clutter, no ads, no paywalls.

---

## Typography

### Font Stack

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Display / Headline** | **Dopis** | Black (900) | Hero h1, card headings, stats, CTA headings |
| **Display / Italic accent** | **Season Serif** | Regular italic (400i) | Italic word inside Dopis headlines (e.g. *Ecosystem.*) |
| **Body / Subheadings** | **Season Serif** | Regular 400, Medium 500 | Paragraphs, subtitles, card descriptions |
| **UI / Labels / Nav** | **Akkurat Mono** | Regular 400, Medium 500, Bold 700 | Nav links, tags, pill labels, table headers, code, buttons |

### Font Files (public/fonts/)
```
Dopis-Light.woff2
Dopis-Regular.woff2
Dopis-Bold.woff2
Dopis-Black.woff2

SeasonSerif-TRIAL-Light.ttf
SeasonSerif-TRIAL-Regular.ttf
SeasonSerif-TRIAL-Medium.ttf
SeasonSerif-TRIAL-SemiBold.ttf
SeasonSerif-TRIAL-Bold.ttf

AkkuratMono-Regular.woff2
```

### Type Scale

```
Hero display:    Dopis Black, ~108px, lh 0.92, ls -0.03em
Section title:   Dopis Black, 72–80px, lh 0.95, ls -0.03em
Card title:      Dopis Black, 36–48px, lh 0.96, ls -0.025em
Stat number:     Dopis Black, 48–58px, lh 1.0, ls -0.04em
Body large:      Season Serif Regular, 18–19px, lh 1.65
Body base:       Season Serif Regular, 15–16px, lh 1.65
Nav / Labels:    Akkurat Mono 500, 10–11px, uppercase, ls 0.08–0.14em
Button text:     Akkurat Mono 600, 10–11px, uppercase, ls 0.07em
Caption / Tags:  Akkurat Mono 500, 9–10px, uppercase, ls 0.12em
```

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#f9f9f0` | Page background, default surface |
| `--ink` | `#0f0e0b` | Primary text, dark fills, borders |
| `--coal` | `#21201c` | Dark sections (footer, dark cards) |
| `--ash` | `#3d3b34` | Secondary text, secondary borders |
| `--tan` | `#9d937c` | Muted text, placeholders, subtle labels |
| `--mint` | `#d5fad3` | Hero background, accent, positive tier rows |
| `--blue` | `#badbee` | Score-data hero, accent sections |
| `--cream` | `#efecca` | About section backgrounds, warning tints |
| `--border` | `rgba(15,14,11,0.12)` | Default border color |

### Semantic Colors

| Meaning | Color | Usage |
|---------|-------|-------|
| Safe / Positive | `rgba(22,163,74,0.09)` + `#166534` | Safe tier badges |
| Target / Neutral | `rgba(234,179,8,0.09)` + `#854d0e` | Target tier badges |
| Unlikely / Negative | `rgba(220,38,38,0.09)` + `#991b1b` | Unlikely tier badges |

---

## Backgrounds & Patterns

### Grid background (default pages)
```css
background-image:
  linear-gradient(rgba(15,14,11,0.025) 1px, transparent 1px),
  linear-gradient(90deg, rgba(15,14,11,0.025) 1px, transparent 1px);
background-size: 40px 40px;
background-color: #f9f9f0;
```
Applied via `.grid-bg` class.

### Dot grid (hero section)
```css
background-image: radial-gradient(circle, rgba(15,14,11,0.18) 1px, transparent 1px);
background-size: 28px 28px;
```
Used only in the hero section on top of mint background.

---

## Components

### Navbar
- **Height**: 52px fixed pill, floats 14px from top
- **Background**: `rgba(249,249,240,0.92)` → `0.98` on scroll, `blur(20px)` backdrop
- **Border**: `1px solid rgba(15,14,11,0.13)` full pill border
- **Brand left**: [Alphajee logo] "Alphajee" × [ApexBITS logo] "ApexBITS" — clicking ApexBITS goes to `/`
- **Nav links**: Akkurat Mono 500, 10.5px, active state = `rgba(15,14,11,0.07)` pill bg
- **CTA**: Dark pill "Predict →", Akkurat Mono 600, uppercase

### Buttons
Two styles only — no giant circles:

```
Primary (dark fill):
  background: #0f0e0b  |  color: #f9f9f0
  border: 1.5px solid #0f0e0b
  height: 50px (hero), 36–40px (nav/UI)
  padding: 0 28px
  border-radius: 9999px (pill)
  font: Akkurat Mono 600, 11px, uppercase, ls 0.07em

Secondary (outlined):
  background: transparent  |  color: #0f0e0b
  border: 1.5px solid rgba(15,14,11,0.4)
  Same sizing as primary
  hover: border-color tightens to rgba(15,14,11,0.7)
```

### Cards (Feature cards)
- Dark card (`#21201c`): College Predictor — on mint/default backgrounds
- Light card (`#badbee`): Score Data — sits naturally with dark text
- Border: `1px solid #3d3b34` (dark) / `rgba(15,14,11,0.12)` (light)
- Padding: `clamp(28px, 4vw, 52px)`
- No border-radius (sharp corners = editorial look)
- Minimum height: `clamp(320px, 38vw, 440px)`

### Pill Labels / Tags
```
padding: 4px 10px
border-radius: 9999px
background: rgba(tint, 0.08–0.15)
border: 1px solid rgba(tint, 0.14–0.25)
font: Akkurat Mono 600, 10px, uppercase, ls 0.1em
```

### Tier Badges (Predictor)
```
Safe:     bg rgba(22,163,74,0.09)   | color #166534 | border rgba(22,163,74,0.25)
Target:   bg rgba(234,179,8,0.09)  | color #854d0e | border rgba(234,179,8,0.25)
Unlikely: bg rgba(220,38,38,0.09)  | color #991b1b | border rgba(220,38,38,0.25)
```

---

## Animations

### SVG Draw (BITS Pilani sketch)
- Pure CSS `stroke-dasharray` / `stroke-dashoffset` animation
- Keyframe: `drawStroke` — `to { stroke-dashoffset: 0 }`
- Classes `.draw`, `.draw-d2` through `.draw-d20` with staggered delays
- Short elements use `.draw-short` (200 dasharray, 0.9s duration)

### Fade Up (page load)
- `.fade-up` with `.fade-up-1` through `.fade-up-5` delay classes
- Duration: 0.7s ease, opacity 0→1, translateY 22px→0

### Ticker
- `animate-ticker` — `translateX(0 → -50%)` over 36s linear infinite
- Pauses on hover

### Float (decorative squares)
- `.float` / `.float-slow` — 4–6s ease-in-out infinite, translateY 0→-6px→0

---

## Layout Grid

- **Max width**: 1360px centered, padding `clamp(20px, 4vw, 60px)`
- **Hero**: 2-column grid — text left, sketch right (`1fr 1fr`)
- **Features**: 2-column grid (`1fr 1fr`)
- **Stats**: 4-column grid below hero
- **About / CTA**: 2-column grid

### Breakpoints
```
< 768px  — Hero collapses to 1 column; stats 2×2; feature cards stack
< 640px  — Footer grid collapses; brand row spans full width
< 480px  — Extra padding reduction
```

---

## Spacing

Based on 8px base unit. Key values:
```
4px   — gap between label dot and text
8px   — logo/text gap in brand
12px  — button gap, mobile panel gaps
16px  — card inner spacing
20px  — label margin-bottom
24px  — hero subtitle margin-bottom
28px  — eyebrow margin-bottom
32px  — section element gaps
40px  — hero grid gap
56–80px — section vertical padding (clamp)
```

---

## Page-specific Backgrounds

| Page | Hero bg | Section bg |
|------|---------|-----------|
| Home `/` | `#d5fad3` (mint) + dot grid | `#efecca` (cream), `#f9f9f0`, `#0f0e0b` |
| Predictor `/predictor` | `#d5fad3` (mint) + line grid | `#f9f9f0` grid-bg |
| Score Data `/score-data` | `#badbee` (blue) + line grid | `#f9f9f0` grid-bg |

---

## Icon/Illustration System

- BITS Pilani architectural **SVG sketch** — animated with CSS stroke-draw
- Geodesic circles — used as decorative accents in dark sections
- Bar chart SVG — used as card decoration on score-data card
- Dot grid arrays — used as texture in corner areas
- Floating small squares — opacity 0.30–0.35, animated with float keyframe

---

## Accessibility

- All interactive elements have `aria-label`
- Nav has `aria-expanded` on hamburger
- SVG sketch has `role="img"` and `aria-label`
- Charts have `role="img"` with descriptive `aria-label`
- Color contrast: all text on backgrounds meets AA minimum
- Focus styles preserved on all interactive elements
