# Craft CMS 5 Kickstart

A starter project for new Craft CMS 5 websites. Copy it, rename a few things, and you have a working local site with DDEV, Vite, Tailwind CSS and a set of ready-made Twig building blocks.

---

## What's inside

### Stack

| Part | Version / package |
| --- | --- |
| Craft CMS | `craftcms/cms` ^5.9 |
| PHP | 8.4 (via DDEV) |
| Database | MySQL 8.0 (via DDEV) |
| Web server | nginx-fpm (via DDEV) |
| Node | 24 (via DDEV) |
| Asset bundler | Vite 8 + `nystudio107/craft-vite` |
| CSS | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Rich text | CKEditor 5 (`craftcms/ckeditor`) |
| Performance | `web-vitals` 6 (Core Web Vitals measurement) |
| Dev tools | `craftcms/generator`, `yiisoft/yii2-shell`, Prettier |

### Local environment (DDEV)

- Vite runs automatically as a DDEV daemon (`npm install && npm run dev`) on ports `3000` (HTTP) and `3001` (HTTPS). You don't need to start it yourself.
- On every `ddev start`, DDEV runs `composer install` and `./craft up`, which applies migrations and project config.
- DDEV provides the database settings (`CRAFT_DB_*`) itself, so they're commented out in `.env.example`.

### Craft configuration

- **`config/general.php`**:
  - Monday as the week start, no `index.php` in URLs, preloaded singles, user-enumeration protection, no front-end login page, and the Twig sandbox turned on.
  - Dev mode and admin changes are controlled from `.env`.
  - `disallowRobots` defaults to `true`: crawlers are blocked unless `CRAFT_DISALLOW_ROBOTS=false` is set (production only).
- **`config/custom.php`**: project settings read from `.env`, available in Twig as `craft.app.config.custom.<key>`. It currently holds `gtmId` (from `GTM_ID`).
- **`config/vite.php`**: uses the dev server when `CRAFT_ENVIRONMENT=dev`, and the built manifest in `web/dist/` otherwise.
- **`config/app.php`**: the app ID comes from `CRAFT_APP_ID`.
- **`.env.example`**: one template for every environment. Its defaults are for local development, and a table at the top shows which values to change on staging and production. Composer copies it to `.env` when the project is first created.

### Content model (project config)

- **Sites**: two sites in one site group:
  - `Nederlands` (`nl-NL`): the primary site, at `$PRIMARY_SITE_URL`
  - `English` (`en`): at `$PRIMARY_SITE_URL_EN`
- **Sections**:
  - `Homepage`: a single at `__home__`, using the template `_homepage/index.twig`
  - `Pages`: a structure at `{parent ? parent.uri ~ '/'}{slug}` (nested URLs such as `about/team`), using the template `_pages/_entry.twig`
- **Entry type**: `Page`, used by both sections. Its only field besides the title is `pagebuilder`, so every page is built from blocks.
- **Volume**: `Images volume`, served from `$PRIMARY_SITE_UPLOADS_URL` (`web/uploads/`, which git ignores).
- **Shared fields**: reused across blocks. Craft 5 lets you add a field to a layout more than once under a different handle and label (for example `subheading` appears as `caption` and `quoteAuthor`).

  | Handle | Type | Notes |
  | --- | --- | --- |
  | `heading` | Plain Text | Translatable |
  | `subheading` | Plain Text | Translatable |
  | `texteditor` | CKEditor | Full toolbar (see below) |
  | `simpleTexteditor` | CKEditor | Bold, italic, link, lists. For short texts such as CTAs and FAQ answers |
  | `image` | Assets | Max 1, images only |
  | `images` | Assets | Multiple, images only |
  | `button` | Link | Entry, URL, email, phone or asset, with label and "open in new tab". (`link` is a reserved handle in Craft) |
  | `quote` | Plain Text (multi-line) | pbQuote |
  | `imageLeft` | Lightswitch | pbTextImage |
  | `videoUrl` | Link (URL only) | pbVideo, YouTube or Vimeo |
  | `faqItems` | Matrix | pbFaq, nested `faqItem` entries (title = question, `answer` = simpleTexteditor) |

- **Pagebuilder** (`pagebuilder`, Matrix): each block is a nested entry type with a template in `_components/<handle>.twig`:

  | Block | Fields |
  | --- | --- |
  | `pbHero` | heading*, subheading, image, button. As the first block it renders the page's `<h1>`; further down it renders an `<h2>` |
  | `pbText` | heading, texteditor* |
  | `pbTextImage` | heading, texteditor, image*, imageLeft, button |
  | `pbImage` | image*, caption |
  | `pbGallery` | heading, images* |
  | `pbQuote` | quote*, quoteAuthor |
  | `pbCta` | heading*, simpleTexteditor, button |
  | `pbVideo` | videoUrl*, image (poster). With a poster, the player only loads after a click. YouTube videos without a poster use YouTube's thumbnail, so they load on click too. Vimeo videos without a poster embed directly |
  | `pbFaq` | heading, faqItems* |

  \* required
- **Globals**:
  - `Navigation`: `mainNavigation` (header and mobile menu) and `footerNavigation` (footer). Both are entries fields that pick from Pages, in the order you set.
  - `Site settings`: `companyName` (logo text and copyright; falls back to "Kickstart"), `phone`, `email`, `address` (native Addresses field, max 1, output with `|address`) and `footerText` (translatable).
- **Rich text field** `texteditor` (CKEditor):
  - Toolbar: headings H1 to H6, bold, italic, links, bulleted and numbered lists, blockquote, horizontal line, remove formatting, and source editing (admins only). The page's `<h1>` comes from the template (see **Headings** below), so an H1 in the editor is output as `<h2 data-h1>`, styled like an H1.
  - `config/ckeditor/editor.css` (the field's "CSS file") styles H1 to H6 inside the editor in the control panel. Without it, headings fall back to the CP's own UI styles, where H3 is body size and H6 isn't styled. It uses the same heading scale as the `rich-text` utility, so keep the two in sync.
  - `config/ckeditor/default.json` holds the CKEditor options: an "Open in a new tab" checkbox on links (adds `target="_blank" rel="noopener noreferrer"`), `https://` as the default link protocol, and a start number for numbered lists. To give another field its own setup, add a JSON file next to it and choose it in that field's settings.
  - `config/htmlpurifier/Default.json` cleans the saved HTML. It allows `rel="noopener noreferrer nofollow"`, strips inline `style` attributes, and only allows YouTube and Vimeo iframes.
  - Output it with `{{ entry.texteditor }}`. The value is already purified, so `|raw` isn't needed.
  - Wrap it in `class="rich-text"` (defined with `@utility` in `src/css/app.css`) for headings, lists, links and blockquotes. Add `rich-text-invert` on dark backgrounds. The kickstart doesn't use `@tailwindcss/typography`.

### Templates

```
templates/
├── 404.twig                         # "Page not found" page (uses the layout, noindex)
├── 503.twig                         # Maintenance / system offline page (standalone: no layout, DB queries or Vite)
├── _layouts/_layout.twig            # Base HTML: <head> (GTM, SEO partials, SEOMate hook, Vite), skip link, header, <main>, footer
├── _partials/header.twig            # Site header, main nav (Globals → Navigation), language switcher, mobile nav toggle
├── _partials/footer.twig            # Site footer: company name, footer text, contact details, footer nav (template-cached per site)
├── _partials/seo-head.twig          # Fallback <title>, description, canonical, hreflang, Open Graph/Twitter (skipped when SEOmatic/SEOMate is enabled)
├── _partials/schema.twig            # JSON-LD: Organization + WebSite on the homepage, BreadcrumbList on pages (skipped when SEOmatic is enabled)
├── _partials/language-switcher.twig # NL / EN switcher that links to the same entry on the other site (full language name for screen readers)
├── _partials/pagebuilder.twig       # Renders an entry's pagebuilder blocks (with eager loading)
├── _partials/button.twig            # Button from a Link field (primary / secondary / light), announces "opens in new tab"
├── _components/                     # One template per pagebuilder block (pbHero, pbText, pbTextImage, …)
├── _pages/_entry.twig               # Page template
├── _macros/picture.twig             # Responsive, multi-format <picture> macro
├── _macros/picture-HOW-TO.twig      # Examples for the picture macro (full width, 2 and 3 columns)
├── _emails/                         # Custom system emails (base layout + reset password)
├── _samples/                        # Optional files to copy in per project (e.g. per plugin)
│   └── seomate/robots.txt.twig      # robots.txt for projects using SEOMate
└── _homepage/index.twig             # Homepage template
```

Folders starting with `_` can't be opened directly as URLs.

**Pagebuilder:** both page templates just include the pagebuilder partial:

```twig
{% include '_partials/pagebuilder.twig' with { entry: entry ?? null } only %}
```

It eager-loads `image`, `images` and `faqItems`, and includes `_components/<block type handle>.twig` for each block with `block` and `isFirst`. The first block uses `isFirst` to load its image eagerly, since it's usually the LCP image. 

**Headings:** every page gets exactly one `<h1>`. When the first block is a `pbHero`, its heading is the `<h1>`. Otherwise `pagebuilder.twig` outputs a visually hidden `<h1>` with the entry title (the site name on the homepage). A `pbHero` further down the page renders an `<h2>`. In `pbText` and `pbTextImage`, H1s from the editor are output as `<h2 data-h1>`, styled like an H1 by the `rich-text` utility. Block headings are `<h2>`.

To add a block: create a nested entry type, add it to the `pagebuilder` field, and add a template with the same handle in `_components/`.

**Meta description and Open Graph:** the description (`<meta name="description">` and `og:description`) and the 1200×630 `og:image` come from the page's first `pbHero` block (its subheading and image). Without a hero subheading, the description falls back to the plain text of the first `pbText` or `pbTextImage` block, cut at a word boundary to at most 160 characters. Pages without either get no description, and pages without a hero image get no share image. `seo-head.twig` also outputs `og:site_name` (Site settings → company name, or the system name), `og:locale` with `og:locale:alternate` for the other sites, and `twitter:card`.

**Page title:** while no SEO plugin is installed, `seo-head.twig` outputs "Entry title | System name". The homepage shows just the system name, which you set under **Settings → General → System Name**. Templates without an entry can set `{% set pageTitle = '…' %}` (see `404.twig`).

**Structured data:** `schema.twig` outputs JSON-LD. On the homepage it outputs `Organization` (company name, phone, email and address from Site settings; empty fields are left out) and `WebSite`. On other pages it outputs a `BreadcrumbList` (Home → parent pages → current page). SEOMate doesn't output JSON-LD, so this stays on with SEOMate. It's skipped with SEOmatic, which has its own.

**noindex:** a template can set `{% set noindex = true %}` to add `<meta name="robots" content="noindex">` and skip canonical, hreflang, `og:url` and JSON-LD.

**Error pages:**
- `404.twig` uses the normal layout and is set to noindex.
- `503.twig` is shown when the system is offline (**Settings → General → System Status**) or while Craft is updating. It's deliberately standalone: no layout, globals or queries, because the database may be unavailable, and inline CSS because the Vite assets might not be reachable.
- With dev mode on, Craft shows its debug error page instead. To check the designs, open `/404` and `/503` directly (they return status 200 there), or set `CRAFT_DEV_MODE=false`.

### Accessibility

- **Skip link:** a "Skip to content" link appears on the first Tab press and jumps to `<main id="main">`.
- **Focus outline:** `src/css/app.css` gives every link, button and form field a `:focus-visible` outline. On dark backgrounds, set `[--focus-color:var(--color-white)]` on a wrapper (see `pbCta.twig`).
- **Sticky header:** `<html>` has `scroll-pt-20`, so anchor targets and focused elements aren't hidden under the header.
- **Reduced motion:** when the visitor has turned on "reduce motion", smooth scrolling, transitions and animations are off, and the hover transforms use `motion-safe:`.
- **Mobile menu:** Escape closes it and moves focus back to the toggle. It also closes when the window grows to desktop width.
- **Video:** after the play button is clicked, focus moves to the player. The player's title is the poster's alt text, or "Video: page title".
- **New tabs:** `button.twig` adds visually hidden "(opens in new tab)" text to links with `target="_blank"`.
- **Contrast:** keep small text at `zinc-500` or darker on white and `zinc-50`, and at `zinc-600` on `zinc-100` (WCAG AA 4.5:1).
- **Tap targets:** the language switcher and footer links are at least 24px tall (WCAG 2.5.8 / Lighthouse `target-size`).
- **Your job in the CMS:** don't skip heading levels in the rich text (start at H2 or H3 under a block heading), and fill in alt text on images.

### Translations

Static translations live in `translations/<language>/site.php`:

- `translations/en/site.php`: English
- `translations/nl/site.php`: Dutch (also used for the `nl-NL` site)

Use them in Twig with the `t` filter: `{{ 'Read more'|t }}`. Add each new key to both files.

### Front-end

- **One JS file per task.** `src/js/app.js` is the Vite entry point and only contains imports, with no code of its own:
  - `src/css/app.css`
  - `src/js/web-vitals.js`: Core Web Vitals measurement
  - `src/js/mobile-nav.js`: mobile menu toggle, Escape to close, close on desktop width
  - `src/js/video-player.js`: click-to-play for `pbVideo`

  For new behaviour, add a new file and import it in `app.js`. Templates have no inline JavaScript. The only `<script>` with content is the JSON-LD, which is data, not code. This keeps a strict Content Security Policy possible.
- `src/js/gtm.js` is a separate Vite entry (see `vite.config.js`), loaded only when GTM is on.
- `src/css/app.css` imports Tailwind 4 and scans `templates/**/*.{twig,html}` for classes. Tailwind is configured in this CSS file (`@theme`, `@source`), so there's no `tailwind.config.js`.
- The production build goes to `web/dist/`, which git ignores.
- `src/js/web-vitals.js` measures Core Web Vitals (LCP, INP, CLS, plus FCP and TTFB). On the Vite dev server it logs them to the browser console. In the production build it pushes them to the GTM `dataLayer` as a `web_vitals` event, but only when GTM is loaded. Otherwise nothing is sent.

### Google Tag Manager

GTM is loaded by `src/js/gtm.js`, which `_layouts/_layout.twig` includes with `async` and a `data-gtm-id` attribute. It only loads when `GTM_ID` is set in `.env` (for example `GTM_ID=GTM-XXXXXXX`). Leave it empty to turn GTM off. Usually only production sets it. The value reaches Twig through `config/custom.php`.

To send Web Vitals to GA4: in GTM, create a **Custom Event** trigger on `web_vitals`, plus a GA4 event tag that sends `metric_name`, `metric_value` and `metric_rating` as event parameters.

> For Dutch and EU visitors, GTM and GA need visitor consent before they track anything (GDPR / AVG). Add a cookie banner with Google Consent Mode before setting `GTM_ID` on a live site.

### Editor settings

- `.prettierrc`: Prettier with default settings.
- `.vscode/settings.json` treats `robots.txt.twig` files as plain text, so the Twig formatter doesn't indent their output lines when you save.

---

## robots.txt and sitemap (SEO plugin)

The kickstart doesn't include a robots.txt or a sitemap. Each project gets one of two SEO plugins, SEOmatic or SEOMate, so pick one of the setups below.

Both setups follow the same rule: crawlers are only allowed when `CRAFT_DISALLOW_ROBOTS=false`, which you only set on production. `config/general.php` defaults `disallowRobots` to `true`, so if the variable is missing, crawlers are blocked. When robots are disallowed, Craft also sends an `X-Robots-Tag: none` header on every page.

> Never add a static `web/robots.txt`. The web server serves it before Craft, so the plugin's version would never show up.

> These templates haven't been tested in this kickstart yet. After installing a plugin, compare them with its default template and check `/robots.txt` on dev and production.

### Option A: SEOmatic (`nystudio107/craft-seomatic`)

```sh
ddev composer require nystudio107/craft-seomatic
ddev craft plugin/install seomatic
```

**1. Map Craft's environment to SEOmatic's.** SEOmatic uses its own environment names (`live`, `staging`, `local`), which also decide whether pages get `noindex` meta tags. Create `config/seomatic.php`:

```php
<?php

declare(strict_types=1);

use craft\helpers\App;

return [
    'environment' => match (App::env('CRAFT_ENVIRONMENT')) {
        'production' => 'live',
        'staging' => 'staging',
        default => 'local',
    },
];
```

**2. Replace the robots.txt template.** Paste this into SEOmatic's robots.txt template setting in the control panel:

```twig
{% if not craft.app.config.general.disallowRobots %}
User-agent: *
Disallow: /cpresources/
Disallow: /vendor/
Disallow: /.env

Sitemap: {{ seomatic.helper.sitemapIndexForSiteId() }}
{% for site in craft.app.sites.allSites %}
{% if site.id != currentSite.id %}
Sitemap: {{ seomatic.helper.sitemapIndexForSiteId(site.id) }}
{% endif %}
{% endfor %}
{% else %}
User-agent: *
Disallow: /
{% endif %}
```

SEOmatic's sitemap is at `/sitemaps-1-sitemap.xml`, not `/sitemap.xml`. The helper above outputs the correct URL for each site (NL and EN).

### Option B: SEOMate (`vaersaagod/seomate`)

```sh
ddev composer require vaersaagod/seomate
ddev craft plugin/install seomate
```

SEOMate generates the sitemap, but it doesn't serve a robots.txt. Use a Twig template for robots.txt instead.

**1. Turn on the sitemap.** Create `config/seomate.php`:

```php
<?php

declare(strict_types=1);

return [
    'sitemapEnabled' => true,
    'sitemapName' => 'sitemap', // Served at /sitemap.xml
    'sitemapConfig' => [
        // Add the sections to include, e.g.:
        // 'blogEntries' => ['changefreq' => 'weekly', 'priority' => 0.5],
    ],
];
```

**2. Copy the sample robots.txt template:**

```sh
cp templates/_samples/seomate/robots.txt.twig templates/robots.txt.twig
```

Craft serves it at `/robots.txt` as `text/plain`, because it picks the content type from the `.txt` extension. If you change `sitemapName`, update the `Sitemap:` line to match. `.vscode/settings.json` maps `robots.txt.twig` files to plain text, so the Twig formatter won't indent the output lines on save.

---

## Plugins we normally use

These plugins aren't included in the kickstart, except CKEditor. This list is for reference: install them per project as needed.

| Purpose | Free | Paid |
| --- | --- | --- |
| Mailing | Postmark | – |
| Forms | Contact Form + extensions | Formie, Freeform |
| SEO | SEOMate | SEOmatic |
| Mega menu | – | Navigation |
| Translations | – | Multi Translator |
| Cache | – | Blitz |
| reCAPTCHA | Contact Form reCAPTCHA | – |
| Redirects | Redirect Manager | Retour |
| Cookie banner | – | – |
| Content import | – | Feed Me |
| Text editor | CKEditor (already installed) | – |

For setting up SEOmatic or SEOMate, see [robots.txt and sitemap (SEO plugin)](#robotstxt-and-sitemap-seo-plugin).

---

## Starting a new project from this kickstart

Replace `my-project` with the new project's name (lowercase, no spaces) everywhere below.

### 1. Copy the files

```sh
git clone <kickstart-repo-url> my-project
cd my-project
rm -rf .git
git init
```

### 2. Remove project-specific files

```sh
rm -f config/license.key config/license.key.1   # Every Craft project needs its own license (Craft creates a new one)
rm -rf web/uploads/*                             # Example images
rm -f .env                                       # It's created again in step 4
```

### 3. Rename the project

| File | What to change |
| --- | --- |
| `.ddev/config.yaml` | `name: CraftCMStest` → `name: my-project` |
| `vite.config.js` | `"craftcmstest.ddev.site"` in `allowedHosts` → `"my-project.ddev.site"` |
| `package.json` | `"name": "craftcmstest"` → `"name": "my-project"` |
| `templates/_partials/header.twig` | Logo mark and "Kickstart" name (nav lists the first 5 **Pages** entries) |
| `templates/_partials/footer.twig` | Logo, "Kickstart" name, tagline and copyright |
| Control panel: **Settings → General** | System name (used in the page `<title>`) and the email settings |

### 4. Create the `.env` file

```sh
cp .env.example .env
```

The defaults are already set for local development. Replace `website` in the three site URLs with the project's name:

```dotenv
PRIMARY_SITE_UPLOADS_URL=https://my-project.ddev.site/uploads
PRIMARY_SITE_URL=https://my-project.ddev.site/
PRIMARY_SITE_URL_EN=https://my-project.ddev.site/en/
```

DDEV provides the database settings, so leave them commented out. Leave `GTM_ID` empty locally.

### 5. Start DDEV and install Craft

```sh
ddev start
ddev composer install
ddev craft setup/app-id
ddev craft setup/security-key
ddev craft install
```

`craft install` reads the existing project config, so the sites, volume and other settings are created for you. Answer the prompts for the admin account.

### 6. Open the site

```sh
ddev launch            # Front end
ddev launch /admin     # Control panel
```

Vite runs automatically in the background. If you edit a Twig template or `src/` file, the browser should update. If it doesn't, check the Vite logs with `ddev logs -f`.

### 7. First commit

```sh
git add .
git commit -m "Initial commit from Craft CMS kickstart"
```

---

## Everyday commands

| Task | Command |
| --- | --- |
| Start / stop the project | `ddev start` / `ddev stop` |
| Run a Craft command | `ddev craft <command>` |
| Apply project config changes | `ddev craft up` |
| Build front-end assets for production | `ddev npm run build` |
| Export the database | `ddev export-db --file=db.sql.gz` |
| Import a database | `ddev import-db --file=db.sql.gz` |
| Take a database snapshot (before big changes) | `ddev snapshot --name=<name>` |
| Restore a snapshot | `ddev snapshot restore <name>` |

---

## Deploying

1. Create `.env` on the server from `.env.example`:
   - Set the values for that environment, using the table at the top of the file.
   - Uncomment and fill in the database settings.
   - Fill in the app ID, security key and site URLs.
   - Set `GTM_ID` if the site uses GTM.
2. Run `composer install --no-dev`.
3. Run `npm ci && npm run build`.
4. Run `php craft up`.

Uploads (`web/uploads/`) and the database aren't stored in git. Move them between environments separately.
