---
name: ApexBITS inline style tag hydration
description: Never use <style> tags in Next.js server components — move all CSS to globals.css.
---

## Rule
Never put `<style>` JSX tags inside Next.js server components (page.tsx, layout.tsx, Footer.tsx, etc.).

**Why:** Next.js server-renders HTML with escaped `&gt;` in CSS selectors (e.g. `.footer-grid > div`), but the browser parses it as `>`. This causes a text content hydration mismatch warning on every page load.

**How to apply:** Move all `@media` queries and responsive class rules to `src/app/globals.css`. Use className-based targeting (e.g. `.hero-grid`, `.stats-grid`, `.two-col`, `.cta-grid`, `.footer-grid`) defined in globals.css rather than inline `<style>` blocks.
