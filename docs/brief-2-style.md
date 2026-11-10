# Project brief 2: Style & design

> **Project:** _name_
> **Design source:** _Figma link / PDF / screenshots_
> **Brief version / date:** _v1, YYYY-MM-DD_
> **Status:** Draft | Ready for build | Built

This brief describes the **visual design** of the project: brand, design tokens, layout, global parts and the look of each block and page. It's built **after** [brief-1-content.md](brief-1-content.md), so the fields, sections and blocks it refers to already exist.

---

## How to use this brief

**For the person filling it in**

- Fill in what's decided. Anything empty keeps the kickstart's current look.
- Put screenshots, exports and images in `docs/brief-assets/` and reference them by file name (e.g. `brief-assets/hero-desktop.png`). With a Figma file, a link to the frame is enough.
- Each section has a collapsed **Example**. Copy from it, but examples themselves are never built.

**For Claude (build instructions)**

1. Read `README.md` and `brief-1-content.md` first. The content model is fixed at this point. If the design needs a field or block change, ask before changing it and log it in brief 1.
2. Ask about gaps or contradictions in one batch before building, and record the answers in [Decisions log](#10-decisions-log).
3. With a Figma link, read the design through the Figma tools (variables, frames) instead of guessing values.
4. Design tokens go in `@theme` in `src/css/app.css` (Tailwind 4, CSS-first, no `tailwind.config.js`). Use the tokens in templates instead of arbitrary values.
5. When the heading scale changes, update both the `rich-text` utility in `src/css/app.css` and `config/ckeditor/editor.css`.
6. Keep the accessibility rules from the README: WCAG AA contrast, visible focus (`--focus-color` on dark backgrounds), reduced motion, 24px minimum tap targets, one `<h1>` per page.
7. Static images used by the theme (logo, icons, patterns) go through Vite from `src/`, not in `web/uploads/`. Content images stay in the CMS.
8. Interactive behaviour gets its own JS file in `src/js/`, imported from `app.js`.
9. Check the build against [Quality targets](#9-quality-targets-seo-lighthouse-wcag) before signing off.
10. Update `README.md` where the design changes conventions (tokens, button variants, new utilities), and set **Status** above to `Built`.

---

## 1. References

| What                     | Link / file           | Notes                         |
| ------------------------ | --------------------- | ----------------------------- |
| Design file              |                       | _pages/frames that are final_ |
| Style guide / brand book |                       |                               |
| Inspiration sites        |                       | _what to take from each_      |
| Screenshots              | `docs/brief-assets/…` |                               |

---

## 2. Brand assets

| Asset                              | File                     | Notes                               |
| ---------------------------------- | ------------------------ | ----------------------------------- |
| Logo (full)                        | `docs/brief-assets/…svg` | SVG preferred                       |
| Logo (compact / mark)              |                          | e.g. mobile header                  |
| Logo on dark                       |                          |                                     |
| Favicon / app icon                 |                          | SVG + 512×512 PNG                   |
| Default share image (OG, 1200×630) |                          | used when a page has no hero image  |
| Decorative images / patterns       |                          |                                     |
| Icon set                           |                          | e.g. Heroicons, Lucide, custom SVGs |

---

## 3. Design tokens

### 3.1 Colours

| Token (`--color-…`) | Hex | Used for                                |
| ------------------- | --- | --------------------------------------- |
| `primary`           |     | buttons, links, accents                 |
| `primary-dark`      |     | hover                                   |
| `secondary`         |     |                                         |
| `text`              |     | body text                               |
| `heading`           |     | headings                                |
| `muted`             |     | meta text, captions (check AA contrast) |
| `surface`           |     | page background                         |
| `surface-alt`       |     | alternate section background            |
| `border`            |     |                                         |
| `dark`              |     | dark sections, footer                   |
| `success` / `error` |     | forms                                   |

<details>
<summary>Example</summary>

| Token (`--color-…`) | Hex       | Used for                    |
| ------------------- | --------- | --------------------------- |
| `primary`           | `#0F5FDC` | buttons, links, focus       |
| `primary-dark`      | `#0B47A6` | hover                       |
| `text`              | `#3F3F46` | body text                   |
| `heading`           | `#18181B` | headings                    |
| `surface-alt`       | `#F4F6FA` | every second section, cards |
| `dark`              | `#0B1B33` | CTA block, footer           |

</details>

### 3.2 Typography

| Role              | Font family | Weights | Source                                                                      |
| ----------------- | ----------- | ------- | --------------------------------------------------------------------------- |
| Headings          |             |         | Google Fonts / Adobe / self-hosted (`.woff2` in `docs/brief-assets/fonts/`) |
| Body              |             |         |                                                                             |
| Accent (optional) |             |         |                                                                             |

**Type scale** (mobile → desktop)

| Element      | Size | Line height | Weight | Letter spacing | Other                   |
| ------------ | ---- | ----------- | ------ | -------------- | ----------------------- |
| H1 / hero    |      |             |        |                | _uppercase? max width?_ |
| H2           |      |             |        |                |                         |
| H3           |      |             |        |                |                         |
| H4           |      |             |        |                |                         |
| H5 / H6      |      |             |        |                |                         |
| Intro / lead |      |             |        |                |                         |
| Body         |      |             |        |                |                         |
| Small / meta |      |             |        |                |                         |

### 3.3 Layout & spacing

| Setting                                          | Value                        |
| ------------------------------------------------ | ---------------------------- |
| Container max width                              |                              |
| Side padding (mobile / desktop)                  |                              |
| Text column max width                            |                              |
| Vertical space between blocks (mobile / desktop) |                              |
| Grid columns & gap                               |                              |
| Breakpoints                                      | Tailwind defaults / _custom_ |

### 3.4 Shape & depth

| Setting                                  | Value |
| ---------------------------------------- | ----- |
| Border radius (buttons / cards / images) |       |
| Shadows                                  |       |
| Borders / dividers                       |       |

---

## 4. Base elements

| Element                                            | Design                                      |
| -------------------------------------------------- | ------------------------------------------- |
| Links in text                                      | _colour, underline, hover_                  |
| Buttons: primary                                   | _fill, text, radius, padding, hover, icon?_ |
| Buttons: secondary                                 |                                             |
| Buttons: light (on dark)                           |                                             |
| Rich text: lists, blockquote, hr                   |                                             |
| Form fields (input, select, checkbox, error state) |                                             |
| Images                                             | _radius, aspect ratios, captions_           |
| Focus style                                        | default outline / _custom_                  |

---

## 5. Global parts

| Part             | Design & behaviour                                             |
| ---------------- | -------------------------------------------------------------- |
| Header (desktop) | _logo position, nav, CTA button, language switcher_            |
| Header behaviour | static / sticky / hides on scroll down / transparent over hero |
| Mobile menu      | _full screen / drawer / dropdown, breakpoint_                  |
| Footer           | _columns, contents, dark/light_                                |
| Breadcrumbs      | none / _where, style_                                          |
| Cookie banner    |                                                                |

---

## 6. Pagebuilder blocks

One row per block, including the new ones from brief 1. Describe variants, background options, and how it looks on mobile versus desktop.

| Block         | Reference | Design notes                |
| ------------- | --------- | --------------------------- |
| `pbHero`      |           |                             |
| `pbText`      |           |                             |
| `pbTextImage` |           |                             |
| `pbImage`     |           |                             |
| `pbGallery`   |           | _grid / slider / lightbox?_ |
| `pbQuote`     |           |                             |
| `pbCta`       |           |                             |
| `pbVideo`     |           |                             |
| `pbFaq`       |           |                             |
| _new blocks…_ |           |                             |

<details>
<summary>Example</summary>

| Block       | Reference               | Design notes                                                                                         |
| ----------- | ----------------------- | ---------------------------------------------------------------------------------------------------- |
| `pbHero`    | `brief-assets/hero.png` | Full-bleed image with dark overlay (40%), text bottom-left, white. Height 80vh desktop, 60vh mobile. |
| `pbCta`     | Figma "CTA"             | `dark` background, centred, light button.                                                            |
| `pbGallery` | Figma "Gallery"         | 3-column masonry desktop, 2 columns mobile. Click opens a lightbox (new `src/js/lightbox.js`).       |

</details>

---

## 7. Page templates & listings

Look of the pages and listings from brief 1 (section 8).

| Template                     | Reference | Design notes                               |
| ---------------------------- | --------- | ------------------------------------------ |
| Homepage                     |           |                                            |
| Standard page                |           |                                            |
| _Overview (e.g. Blog)_       |           | _card design, filter UI, pagination style_ |
| _Detail (e.g. Blog post)_    |           | _header area, meta, related items_         |
| 404                          |           |                                            |
| 503 (standalone, inline CSS) |           |                                            |
| System emails (`_emails/`)   |           | _logo, colours_                            |

---

## 8. Motion & interaction

| Topic                        | Answer                                             |
| ---------------------------- | -------------------------------------------------- |
| Hover effects                | _cards, buttons, images_                           |
| Scroll / entrance animations | none / _describe_ (always off with reduced motion) |
| Sliders / carousels          | none / _where, autoplay? (prefer no)_              |
| Page transitions             | none                                               |

---

## 9. Quality targets (SEO, Lighthouse, WCAG)

The kickstart already handles the technical basics: meta tags, canonical/hreflang, JSON-LD, the skip link, focus styles, reduced motion, tap targets and one `<h1>` per page. This section sets the **targets** for this project and the **design choices** that affect them.

### 9.1 Targets

| Target                                     | Kickstart default                             | This project |
| ------------------------------------------ | --------------------------------------------- | ------------ |
| WCAG level                                 | 2.2 AA                                        |              |
| Lighthouse Performance (mobile)            | ≥ 90                                          |              |
| Lighthouse Accessibility / Best practices / SEO (mobile) | ≥ 95                              |              |
| Core Web Vitals                            | LCP < 2.5 s · INP < 200 ms · CLS < 0.1        |              |
| Pages to test                              | homepage, standard page, one overview, one detail |          |

### 9.2 Design choices that affect the scores

| Topic                         | Kickstart default                                            | This project |
| ----------------------------- | ------------------------------------------------------------ | ------------ |
| Fonts                         | max 2 families, max 4 weight files in total, `woff2`, `font-display: swap`, the main heading/body font preloaded | |
| Font source                   | self-hosted (faster, no third-party request, GDPR-friendly)  |              |
| Hero / LCP image              | fixed aspect ratio per breakpoint, loaded eagerly with high priority (first block) | |
| Hero as video or slider       | no, unless agreed (hurts LCP and accessibility)              |              |
| Text over images              | dark/light overlay so text passes 4.5:1 (3:1 for large text) |              |
| Brand colours that fail contrast | used for decoration only, with an accessible alternative for text and buttons | _which colours, which alternative_ |
| Images and embeds             | `width`/`height` or `aspect-ratio` on every image, video and iframe (no layout shift) | |
| Autoplay, sliders, animations | no autoplay. Anything that moves for more than 5 s gets a pause button. Off with reduced motion | |
| Third-party scripts / embeds  | only GTM (with consent) and click-to-load video              | _chat widgets, maps, reviews…_ |

### 9.3 Sign-off check (for Claude)

Before setting **Status** to `Built`:

1. Run Lighthouse (mobile) on each test page against the production build (`ddev npm run build`, with `CRAFT_ENVIRONMENT` other than `dev` so the Vite dev server isn't used).
2. Do a keyboard pass: tab through header, mobile menu, each block and the footer, checking focus is visible and the order makes sense.
3. Check contrast of every text/background combination in the design tokens and blocks.
4. Write down the scores and anything below target, with the reason.
