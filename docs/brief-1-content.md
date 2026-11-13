# Project brief 1: Content & structure

> **Project:** _name_
> **Client:** _name_
> **Brief version / date:** _v1, YYYY-MM-DD_
> **Status:** Draft | Ready for build | Built

This brief describes everything about the **content model and behaviour** of a new project built on the kickstart: general settings, sites, fields, sections, entry types, taxonomies, globals, routes, listings and new pagebuilder blocks.

Styling is **not** part of this brief. That comes afterwards in [brief-2-style.md](brief-2-style.md).

---

## How to use this brief

**For the person filling it in**

- Fill in the sections you need and leave out or mark the rest as `n/a`. An empty section means "keep the kickstart default".
- Each section has a collapsed **Example**. Copy from it, but examples themselves are never built.
- Prefer reusing the [existing fields](#3-field-library) over new ones. Name a reused field with a different label/handle in a layout when it needs one (for example `subheading` used as `caption`).

**For Claude (build instructions)**

1. Read `README.md` first: it documents the current content model, templates and conventions. This brief only describes **changes** on top of that.
2. Before building, check the brief for gaps or contradictions and ask about them in one batch. Record each answer in [Decisions log](#12-decisions-log).
3. Build in the order of this brief: general → sites → fields → taxonomies → sections & entry types → globals → routes → templates & listings → new pagebuilder blocks.
4. All content-model changes must end up in `config/project/`. Each element gets a fresh UUID. Apply with `ddev craft project-config/apply` and check that `ddev craft project-config/diff` is clean afterwards.
5. Follow the kickstart conventions: new blocks are `pb*` entry types with a template in `templates/_components/<handle>.twig`, one JS file per task (no inline JS), eager loading on every listing, `only` on includes, the `picture` macro for images, new static strings in both `translations/nl/site.php` and `translations/en/site.php`.
6. Don't touch assets, volumes or filesystems unless this brief says so. The existing `Images volume` is used for every Assets field.
7. Update `README.md` (content model, templates) to match what was built, and set **Status** above to `Built`.

---

## 1. General

| Setting                                                       | Kickstart default      | This project |
| ------------------------------------------------------------- | ---------------------- | ------------ |
| System name (**Settings → General**, used in `<title>`)       | `Craft Test CMS`       |              |
| Company name (Globals → Site settings, logo text & copyright) | `Kickstart` (fallback) |              |
| Time zone                                                     | `Europe/Amsterdam`     |              |
| Email "from" name                                             | `kickstart`            |              |
| Email "from" address                                          | `admin@wakkr.com`      |              |
| Site group name                                               | `kickstart`            |              |

**Plugins** (see "Plugins we normally use" in the README). Tick what this project needs:

- [ ] SEO: SEOMate / SEOmatic _(pick one)_
- [ ] Forms: Contact Form / Formie / Freeform _(pick one)_
- [ ] Redirects: Redirect Manager / Retour
- [ ] Navigation (mega menu)
- [ ] Blitz (cache)
- [ ] Other:

---

## 2. Sites

The kickstart has two sites in one group: **Nederlands** (`nl-NL`, primary) and **English** (`en`).

| Question                                                   | Answer                                                  |
| ---------------------------------------------------------- | ------------------------------------------------------- |
| Keep the site names `Nederlands` and `English`?            | yes / no → new names:                                   |
| Is this project multilingual (NL + EN) or single-language? | multilingual / NL only / EN only                        |
| If single-language: disable the other site, or delete it?  | disable / delete                                        |
| Primary site                                               | Nederlands / English                                    |
| Extra sites or languages?                                  | none / _language, locale, base URL env var_             |
| URL structure for EN                                       | `$PRIMARY_SITE_URL_EN` (default) / _other, e.g. `/en/`_ |

> With a single language, the language switcher, `hreflang` tags and `og:locale:alternate` should disappear on their own. Claude checks that they do.

---

## 3. Field library

### 3.1 Existing reusable fields

Reuse these wherever they fit. In a layout, a field can get its own label and handle (e.g. `subheading` → `intro`).

| Handle                      | Type                                 | Good for                                               |
| --------------------------- | ------------------------------------ | ------------------------------------------------------ |
| `heading`                   | Plain Text                           | Titles, block headings                                 |
| `subheading`                | Plain Text                           | Intros, captions, author names, short single-line text |
| `texteditor`                | CKEditor (full)                      | Body text                                              |
| `simpleTexteditor`          | CKEditor (bold, italic, link, lists) | Short formatted text, excerpts, answers                |
| `image`                     | Assets (max 1, images)               | Single image, featured image, poster                   |
| `images`                    | Assets (multiple, images)            | Galleries, sliders                                     |
| `button`                    | Link                                 | CTAs, any single link                                  |
| `quote`                     | Plain Text (multi-line)              | Quotes, multi-line plain text                          |
| `imageLeft`                 | Lightswitch                          | Layout toggles                                         |
| `videoUrl`                  | Link (URL)                           | YouTube / Vimeo                                        |
| `pagebuilder`               | Matrix                               | Flexible page content                                  |
| `phone`, `email`, `address` | Plain Text, Email, Addresses         | Contact details                                        |

### 3.2 New fields

Only for content that doesn't fit an existing field. Fields that are only used in one entry type are fine, but name them generically when they could be reused (`date`, not `blogDate`).

| Name | Handle | Type | Settings | Translatable | Used in |
| ---- | ------ | ---- | -------- | ------------ | ------- |
|      |        |      |          |              |         |

<details>
<summary>Example</summary>

| Name            | Handle           | Type    | Settings                       | Translatable | Used in     |
| --------------- | ---------------- | ------- | ------------------------------ | ------------ | ----------- |
| Date            | `date`           | Date    | Date only, no time             | no           | Blog, Event |
| Read time       | `readTime`       | Number  | Min 1, suffix "min"            | no           | Blog        |
| Categories      | `categories`     | Entries | Source: Blog categories, max 3 | no           | Blog        |
| Related entries | `relatedEntries` | Entries | Source: Blogs, max 3           | no           | Blog        |

Common types: Plain Text, CKEditor, Assets, Entries, Link, Lightswitch, Dropdown, Radio Buttons, Checkboxes, Date, Time, Number, Money, Email, Color, Table, Matrix, Addresses, Icon, Country.

</details>

---

## 4. Taxonomies (categories & tags)

In Craft 5, categories and tags can be built as classic **category/tag groups**, or as a **structure/channel section** linked with an Entries field. Entries are Craft's recommendation and the default here, unless you choose otherwise.

| Name | Handle | Kind           | Build as                  | Nested?  | Has own page? | URI format (NL / EN) | Fields besides title |
| ---- | ------ | -------------- | ------------------------- | -------- | ------------- | -------------------- | -------------------- |
|      |        | category / tag | entries (default) / group | yes / no | yes / no      |                      |                      |

<details>
<summary>Example</summary>

| Name            | Handle           | Kind     | Build as | Nested? | Has own page? | URI format (NL / EN)                             | Fields besides title                  |
| --------------- | ---------------- | -------- | -------- | ------- | ------------- | ------------------------------------------------ | ------------------------------------- |
| Blog categories | `blogCategories` | category | entries  | no      | yes           | `blog/categorie/{slug}` / `blog/category/{slug}` | `simpleTexteditor` (as `description`) |
| Tags            | `tags`           | tag      | group    | no      | no            | –                                                | –                                     |

</details>

---

## 5. Sections & entry types

### 5.1 Sections overview

| Section  | Handle     | Type                         | Entry type(s) | URI format (NL / EN) | Template               | In navigation fields? |
| -------- | ---------- | ---------------------------- | ------------- | -------------------- | ---------------------- | --------------------- |
| Homepage | `homepage` | single                       | Page          | `__home__`           | `_homepage/index.twig` | –                     |
| Pages    | `pages`    | structure                    | Page          | `{parent…}{slug}`    | `_pages/_entry.twig`   | yes                   |
|          |            | single / channel / structure |               |                      |                        | yes / no              |

Defaults for every new section unless noted: propagation **all sites**, enabled by default on all sites, versioning on, preview target `{url}`, new entries at the end.

<details>
<summary>Example</summary>

| Section       | Handle         | Type    | Entry type(s) | URI format (NL / EN)          | Template             | In navigation fields? |
| ------------- | -------------- | ------- | ------------- | ----------------------------- | -------------------- | --------------------- |
| Blogs         | `blogs`        | channel | Blog          | `blog/{slug}` / `blog/{slug}` | `_blogs/_entry.twig` | no                    |
| Blog overview | `blogOverview` | single  | Page          | `blog` / `blog`               | `_blogs/index.twig`  | yes                   |
| Team          | `team`         | channel | Team member   | no URLs                       | –                    | no                    |

</details>

### 5.2 Entry types

Use `Page` when an entry is just a title + pagebuilder. Add a block per new entry type below.

#### Entry type: _Name_ (`handle`)

- **Used in sections:** _…_
- **Title field:** shown / hidden with format `{…}` · label: _Title_
- **Icon / colour (CP):** _optional_

| Tab     | Field (label) | Handle in layout | Reuses | Required | Instructions for editors |
| ------- | ------------- | ---------------- | ------ | -------- | ------------------------ |
| Content |               |                  |        |          |                          |

<details>
<summary>Example</summary>

#### Entry type: Blog (`blog`)

- **Used in sections:** Blogs
- **Title field:** shown · label: _Title_
- **Icon / colour (CP):** `newspaper`, blue

| Tab     | Field (label)  | Handle in layout | Reuses                 | Required | Instructions for editors                                |
| ------- | -------------- | ---------------- | ---------------------- | -------- | ------------------------------------------------------- |
| Content | Featured image | `image`          | `image`                | yes      | Shown in the overview and as the share image            |
| Content | Intro          | `intro`          | `simpleTexteditor`     | yes      | 1–2 sentences, shown on the card                        |
| Content | Date           | `date`           | `date` (new)           | yes      |                                                         |
| Content | Categories     | `categories`     | `categories` (new)     | no       |                                                         |
| Content | Content        | `pagebuilder`    | `pagebuilder`          | no       |                                                         |
| Related | Related posts  | `relatedEntries` | `relatedEntries` (new) | no       | Leave empty to show the 3 latest from the same category |

</details>

---

## 6. Globals

Existing: **Navigation** (`mainNavigation`, `footerNavigation`) and **Site settings** (`companyName`, `phone`, `email`, `address`, `footerText`).

| Global set | Handle | New / change | Fields (label → handle, reuses) |
| ---------- | ------ | ------------ | ------------------------------- |
|            |        |              |                                 |

<details>
<summary>Example</summary>

| Global set    | Handle         | New / change | Fields (label → handle, reuses)                                                      |
| ------------- | -------------- | ------------ | ------------------------------------------------------------------------------------ |
| Site settings | `siteSettings` | change       | + Socials → `socials` (new Matrix: platform dropdown + `button`)                     |
| Navigation    | `navigation`   | change       | `mainNavigation` source: + Blog overview                                             |
| Newsletter    | `newsletter`   | new          | Heading → `heading`, Text → `simpleTexteditor`, Form ID → `formId` (new, Plain Text) |

</details>

---

## 7. Routes

Only for URLs that don't come from an entry's URI format, such as pagination, filters in the path, archives or a custom search page. Filters through query strings (`?category=…`) don't need a route.

| URL pattern (NL / EN) | Template | Purpose |
| --------------------- | -------- | ------- |
|                       |          |         |

<details>
<summary>Example</summary>

| URL pattern (NL / EN)                                     | Template              | Purpose             |
| --------------------------------------------------------- | --------------------- | ------------------- |
| `blog/archief/<year:\d{4}>` / `blog/archive/<year:\d{4}>` | `_blogs/archive.twig` | Posts per year      |
| `zoeken` / `search`                                       | `_search/index.twig`  | Site search results |

Routes go in `config/routes.php` (per site when NL and EN differ).

</details>

---

## 8. Listings & detail pages (front-end behaviour)

Per section that needs more than "render the pagebuilder". Layout and visual design are for the style brief: describe **what** is shown and **how it behaves** here.

#### Section: _Name_

**Listing / overview**

| Question                          | Answer                                                                        |
| --------------------------------- | ----------------------------------------------------------------------------- |
| Where does the listing live?      | own single / Page entry with a listing block / route / homepage block         |
| What's on each card?              | _e.g. image, title, date, intro, categories, read-more_                       |
| Default order                     | newest first / oldest first / title A–Z / structure order / custom field      |
| Ordering options for the visitor? | none / _list_                                                                 |
| Filters                           | none / _by category, tag, year, …_ · single or multiple select                |
| Filter behaviour                  | plain GET form (no JS) / auto-submit on change (JS) / instant (JS, no reload) |
| Search within listing?            | yes / no                                                                      |
| Items per page                    |                                                                               |
| Pagination                        | numbered / prev-next / "load more" button / none                              |
| Empty state text                  |                                                                               |
| Featured / pinned items?          | none / _how_                                                                  |

**Detail page**

| Question                      | Answer                                                    |
| ----------------------------- | --------------------------------------------------------- |
| Content above the pagebuilder | _e.g. title, date, categories, featured image, intro_     |
| Below the pagebuilder         | _e.g. related items, prev/next, share links, CTA_         |
| Related items logic           | manual / same category / latest / manual with fallback    |
| Breadcrumb                    | Home → Overview → Entry / default                         |
| Structured data               | none / `Article` / `BlogPosting` / `Event` / `Person` / … |

<details>
<summary>Example</summary>

#### Section: Blogs

**Listing / overview**

| Question                          | Answer                                                                             |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| Where does the listing live?      | Blog overview single (`/blog`), pagebuilder above the list                         |
| What's on each card?              | image, date, title, intro, first category                                          |
| Default order                     | newest first by `date`                                                             |
| Ordering options for the visitor? | newest / oldest                                                                    |
| Filters                           | by category, single select, shown as pills                                         |
| Filter behaviour                  | plain GET form, auto-submit on change (JS enhances it, works without)              |
| Search within listing?            | no                                                                                 |
| Items per page                    | 9                                                                                  |
| Pagination                        | numbered, keeps the filter in the URL                                              |
| Empty state text                  | "Er zijn nog geen berichten in deze categorie." / "No posts in this category yet." |
| Featured / pinned items?          | Newest post shown large at the top of page 1                                       |

**Detail page**

| Question                      | Answer                                                         |
| ----------------------------- | -------------------------------------------------------------- |
| Content above the pagebuilder | title (h1), date, read time, categories, featured image, intro |
| Below the pagebuilder         | 3 related posts, then the newsletter global                    |
| Related items logic           | manual, fallback to latest from the same category              |
| Breadcrumb                    | Home → Blog → Post                                             |
| Structured data               | `BlogPosting`                                                  |

</details>

---

## 9. New pagebuilder blocks

Each block becomes a `pb*` entry type in the `pagebuilder` field with a template in `templates/_components/`.

#### Block: _Name_ (`pbHandle`)

- **Purpose:** _what it's for, one or two sentences_
- **Available in:** pagebuilder / _other Matrix field_
- **Behaviour / JS:** none / _describe (gets its own file in `src/js/`)_
- **Reference:** _Figma link, screenshot in `docs/brief-assets/`, or live example_

| Field (label) | Handle in layout | Reuses | Required | Notes |
| ------------- | ---------------- | ------ | -------- | ----- |
|               |                  |        |          |       |

<details>
<summary>Example</summary>

#### Block: Latest posts (`pbLatestPosts`)

- **Purpose:** shows the newest blog posts as cards, with a link to the overview
- **Available in:** pagebuilder
- **Behaviour / JS:** none
- **Reference:** Figma frame "Home / Latest news"

| Field (label)   | Handle in layout | Reuses                    | Required | Notes                         |
| --------------- | ---------------- | ------------------------- | -------- | ----------------------------- |
| Heading         | `heading`        | `heading`                 | no       |                               |
| Number of posts | `limit`          | `limit` (new, Number 1–6) | yes      | Default 3                     |
| Category        | `category`       | `categories` (max 1)      | no       | Empty = all categories        |
| Button          | `button`         | `button`                  | no       | Usually links to the overview |

</details>

### 9.1 Changes to existing blocks

| Block | Change                                                                                    |
| ----- | ----------------------------------------------------------------------------------------- |
|       | _e.g. pbHero: add a "small" variant lightswitch · pbGallery: remove from the pagebuilder_ |

---
