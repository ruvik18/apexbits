---
name: Tailwind + Next.js version pinning
description: Next.js 14 requires Tailwind CSS v3; v4 uses a different PostCSS plugin and CSS-first config.
---

## Rule
Pin `tailwindcss` to `^3.4.x` when using Next.js 14. Do NOT use `tailwindcss@4.x` with Next.js 14.

**Why:** Tailwind CSS v4 replaced `tailwindcss` PostCSS plugin with `@tailwindcss/postcss`, dropped `tailwind.config.ts` JS format in favor of CSS `@theme` directives, and changed `@tailwind` directives to `@import "tailwindcss"`. Next.js 14 was built against Tailwind v3 conventions. The mismatch silently breaks all utility classes.

**How to apply:** On any new Next.js 14 project, explicitly install `tailwindcss@^3.4` and verify with `node -e "console.log(require('./node_modules/tailwindcss/package.json').version)"` before building.
