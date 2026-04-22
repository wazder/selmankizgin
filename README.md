# Portfolio Template

Portfolio scaffold in the design language surveyed in `/analysis`. All content is **mock/placeholder** — swap `src/data/site.ts` and `src/data/projects.ts` with your own.

## Stack

- **Astro 4** + Solid islands
- **GSAP + ScrollTrigger** (imported, ready to wire)
- **Lenis** — smooth scroll
- **Swup** — page transitions
- **Swiper** — sliders (installed, not yet used)
- Custom cursor (`src/scripts/cursor.ts`)
- Open-source fonts: **Geist** (display) + **Inter** (body)

## Run

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
npm run preview
```

## Structure

```
src/
├── pages/                 routes
│   ├── index.astro        home
│   ├── about.astro
│   ├── projects.astro
│   └── project/[slug].astro
├── layouts/Base.astro     shell (head, Header, main, NextPost, Footer)
├── components/            Hero, Intro, ProjectGrid, Testimonials, Header, Footer, NextPost
├── scripts/               Lenis + cursor + IntersectionObserver reveals + header scroll state
├── styles/                tokens.css (colors, fs, easings), global.css, components.css
└── data/                  site.ts, projects.ts — edit these
public/
├── placeholders/          thumb-0N.svg — swap with real project imagery
└── favicon.svg
analysis/                  reference dossier (tokens, routes, animation patterns)
```

## Customizing

1. **Colours** — `src/styles/tokens.css`, change `--cl-accent` and the dark-mode scale.
2. **Fonts** — swap Geist/Inter in `src/styles/tokens.css` and remove the matching `@fontsource-variable/*` imports in `src/styles/global.css` if you replace them.
3. **Content** — `src/data/site.ts` (bio, socials, nav, awards, stats) and `src/data/projects.ts` (case studies + testimonials + client logos).
4. **Thumbnails** — replace `public/placeholders/thumb-*.svg` with your own `.webp` / `.jpg` and update the `thumbnail` field in `projects.ts`.

## Animation hooks

- `data-reveal` on any element → fade-up when it enters the viewport
- `data-cursor="-pointer"` / `data-cursor-text="..."` → custom cursor variants
- `html.lenis` is auto-applied; nested scroll areas can opt out with `data-lenis-prevent`

## Credits

Design patterns (layout structure, timing values, section conventions) surveyed from `valentincheval.design` for reference — **content, imagery, and identity are original to this template**. See `/analysis/reports/technical-analysis.md`.
