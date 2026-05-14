---
description: Project context, design decisions, and constraints for the Happy Green World Foundation website rebuild.
---

# Happy Green World — Project Context

## Organisation
Happy Green World Foundation (Stichting Happy Green World) is a Dutch not-for-profit that creates localised environmental education materials for children aged 6–16. Founder: Marlou Jongejan-Bessem (Perth, Australia). Contact: info@happygreenworld.org. Domain: happygreenworld.org.

## Tech Stack
- **Framework:** Astro 6 (TypeScript strict)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` (NOT the old `@astrojs/tailwind` integration — that only supports Astro ≤5)
- **CSS Custom Properties:** Defined in `src/styles/global.css` using `@theme {}` block (Tailwind v4 syntax)
- **Tailwind typography plugin:** Use `@plugin "@tailwindcss/typography"` in CSS (not `@import` — Tailwind v4 syntax)
- **Deployment:** Netlify (auto-deploy from GitHub, domain DNS pointed to Netlify)
- **Forms:** Netlify Forms (`data-netlify="true"`, honeypot spam protection via `netlify-bot-field`)
- **Content:** Astro Content Collections (`src/content/`) with TypeScript schemas in `src/content.config.ts` (Astro 6 moved config from `src/content/config.ts` to `src/content.config.ts`)
- **Fonts:** Fraunces (headings) + Plus Jakarta Sans (body), loaded from Google Fonts in `BaseLayout.astro`

## Colour Tokens (in `src/styles/global.css` `@theme` block)
- `--color-primary`: #2D6A4F (deep forest green)
- `--color-secondary`: #52B788 (sage green)
- `--color-accent`: #F4A261 (warm amber)
- `--color-accent-light`: #FFD166 (golden yellow)
- `--color-bg`: #F9F7F2 (warm off-white)
- `--color-surface`: #FFFFFF
- `--color-text`: #1A2E1A
- `--color-text-muted`: #6B7B6B
- `--color-border`: #E0EAE0

## Typography
- `--font-display`: Fraunces, Georgia, serif — used for h1, h2, h3, h4, pull quotes
- `--font-body`: Plus Jakarta Sans — all body text, nav, buttons
- Body font-size: 1.125rem (18px) — deliberately large for global/multilingual accessibility

## Site Map
```
/                   Home
/about              About Us (team, mission, philosophy, founding story)
/programmes         Programmes overview
/programmes/waste   Waste & Recycling Education (dynamic slug route)
/programmes/water   Water & Conservation Education
/programmes/energy  Energy & Climate Education
/impact             Impact & Countries (merged Partners + Countries pages)
/resources          Resources (Downloads + Videos, merged)
/partner-with-us    ★ PRIMARY new page — inquiry pathway for organisations
/donate             Donate (IBAN bank transfer details)
/contact            Contact (simple form + email/social)
/thank-you          Post-form-submission confirmation
```

## Key Pages
- `/partner-with-us` — THE most important page. Inquiry pathway for schools, NGOs, foundations, sponsors. Contains a Netlify Form that emails info@happygreenworld.org. Every design decision on this page should serve one goal: form submission.
- `/programmes/[slug].astro` — dynamic route from Astro Content Collections
- `/impact` — merges the old Partners + Countries pages
- `/resources` — merges old Downloads + Videos pages
- `/thank-you` — redirect destination for all Netlify Forms

## Content Collections (`src/content/`)
- `team/` — team member bios (marlou, petra, anja, karin)
- `countries/` — one file per country partner (12 countries)
- `programmes/` — waste, water, energy programme details
- `downloads/` — metadata for each PDF (9 files, actual PDFs in `public/downloads/`)

## Assets
- Images: `public/images/` — extracted from original site at happygreenworld.org
  - `logo-happy-green-world.jpg` — the real HGW logo
  - `team-marlou.jpg`, `team-petra.jpg`, `team-karin.jpg` — team portraits
  - `hero-children-strip.jpg`, `country-tanzania-children.jpg` — hero images
  - `about-team-group-photo.jpg`, `about-girl-waste-game.png` — about page
  - `countries-world-map.jpg` — world map for impact page
  - `download-colorsheet-hgw.png`, `download-coloring-sheet-animals.png` — download thumbnails
  - `partners-collage.jpg`, `partners-header-logos.png` — partner images
- Favicons: `public/favicon.png`, `public/favicon.ico`
- PDFs: `public/downloads/` (to be populated with actual PDF files)

## Component Architecture
```
src/layouts/
  BaseLayout.astro      — HTML shell, meta, Google Fonts, global CSS import
  PageLayout.astro      — BaseLayout + Nav + Footer

src/components/global/
  Nav.astro             — Responsive nav, mobile hamburger (inline JS island)
  Footer.astro          — 3-column footer, social links, copyright
  Button.astro          — Reusable button (props: variant, size, href, external)
  Badge.astro           — Topic pill (waste/water/energy/general)

src/components/sections/  — Home page section components
  HeroSection.astro
  ImpactBar.astro
  ProgrammePreviews.astro
  MissionStatement.astro
  PartnerCallout.astro
  DonateCallout.astro

src/components/about/
  TeamCard.astro
  TeamGrid.astro

src/components/programmes/
  ProgrammeCard.astro

src/components/impact/
  CountryCard.astro
  CountryGrid.astro

src/components/resources/
  DownloadCard.astro
  VideoEmbed.astro

src/components/partner/
  WhoWeWorkWith.astro
  HowItWorks.astro
  PartnerForm.astro     — Netlify inquiry form with full field set

src/components/forms/
  ContactForm.astro
  FormField.astro       — Reusable input/textarea/select
```

## Netlify Forms Setup
Forms use HTML `data-netlify="true"` attribute + a `netlify-bot-field` honeypot. No JavaScript or API keys needed. Netlify detects at build time.

```html
<form name="partner-inquiry" method="POST" data-netlify="true" action="/thank-you">
  <input type="hidden" name="form-name" value="partner-inquiry" />
  <p class="hidden"><label>Bot field: <input name="bot-field" /></label></p>
  <!-- form fields -->
</form>
```

Configure Netlify dashboard to forward submissions to info@happygreenworld.org.

## Design Principles
- **Warm-professional** — not corporate-cold, not chaotically playful. Closest reference: NGOs that speak to adult decision-makers but work with children.
- **Photography-first** — large images of children engaged in activities.
- **Generous whitespace** — sections breathe, 5rem vertical padding standard.
- **Rounded corners** — `border-radius: 12–16px` on cards; 10px on buttons; `border-radius: 99px` on badges/pills.
- **No drop shadows** — use background colour variation and `border: 1px solid var(--color-border)` instead.
- **Body text 18px** — `font-size: 1.125rem` base — larger than convention for accessibility + global audience.
- Inline styles over Tailwind classes where the full design token system is in CSS custom properties.

## Brand Voice
- Second person ("you", "your community"), short sentences, no NGO-jargon.
- Always connect actions to outcomes for children.
- The tagline: *"If you want to go fast, go alone. If you want to go far, go together."*
- The mission quote: *"We do not inherit the earth from our ancestors, we borrow it from our children."*

## Bank / Donation Details (Donate page)
- **Legal name:** Stichting Happy Green World
- **IBAN:** NL63 TRIO 0197 6009 99
- **SWIFT/BIC:** TRIONL2U

## Astro 6 API Changes (vs Astro 4/5)
- Content config location: `src/content.config.ts` (not `src/content/config.ts`)
- Collections require a `loader` in Astro 6: use `glob({ pattern: '**/*.md', base: './src/content/<name>' })` from `astro/loaders`
- Rendering markdown entries: use `import { render } from 'astro:content'` then `const { Content } = await render(entry)` — NOT `entry.render()`

## Important Do Nots
- Do NOT use `@astrojs/tailwind` — it doesn't support Astro 6. Use `@tailwindcss/vite` instead.
- Do NOT change substantive content without checking with the user.
- Do NOT remove any existing page content — improve presentation, not cut information.
- Do NOT use reCAPTCHA — use Netlify's honeypot `netlify-bot-field` instead.
- Do NOT use Next.js or React — Astro is the deliberate choice for zero-JS static output.
- Do NOT add `import tailwindcss from '@tailwindcss/vite'` to a file that already has it in `astro.config.mjs`.
