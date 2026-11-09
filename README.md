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
| Dev tools | `craftcms/generator`, `yiisoft/yii2-shell`, Prettier |

### Local environment (DDEV)

- Vite runs automatically as a DDEV daemon (`npm install && npm run dev`) on ports `3000` (HTTP) and `3001` (HTTPS). You don't need to start it yourself.
- On every `ddev start`, DDEV runs `composer install` and `./craft up`, which applies migrations and project config.

### Craft configuration

- **`config/general.php`**: Monday as the week start, no `index.php` in URLs, preloaded singles, user-enumeration protection, no front-end login page, and the Twig sandbox turned on. Dev mode and admin changes are controlled from `.env`.
- **`config/vite.php`**: uses the dev server when `CRAFT_ENVIRONMENT=dev`, and the built manifest in `web/dist/` otherwise.
- **`config/app.php`**: the app ID comes from `CRAFT_APP_ID`.
- **Sites**: two sites in one site group:
  - `Nederlands` (`nl-NL`): the primary site, at `$PRIMARY_SITE_URL`
  - `English` (`en`): at `$PRIMARY_SITE_URL_EN`
- **Volume**: `Images volume`, served from `$PRIMARY_SITE_UPLOADS_URL` (`web/uploads/`).
- **Tag group**: `Blog tags`.
- **Environment templates**: `.env.example.dev`, `.env.example.staging` and `.env.example.production`. Composer copies `.env.example.dev` to `.env` when the project is first created.

### Templates

```
templates/
├── _layouts/_layout.twig            # Base HTML layout: header, nav, footer, hreflang tags, Vite script
├── _partials/language-switcher.twig # NL / EN switcher that links to the same entry on the other site
├── _components/                     # Page-builder blocks (pbContent, pbQuote)
├── _macros/picture.twig             # Responsive, multi-format <picture> macro
├── _macros/picture-HOW-TO.twig      # Examples for the picture macro (full width, 2 and 3 columns)
├── _emails/                         # Custom system emails (base layout + reset password)
├── _blogs/                          # Example blog overview and blog entry templates
└── homepage/index.twig              # Example homepage with page-builder loop
```

Page-builder blocks are rendered by entry type handle:

```twig
{% for block in entry.pagebuilder.all() %}
  {% include '_components/' ~ block.type.handle ignore missing with { block: block } only %}
{% endfor %}
```

### Front-end

- `src/js/app.js` is the Vite entry point. It imports `src/css/app.css`.
- `src/css/app.css` imports Tailwind and scans `templates/**/*.{twig,html}` for classes.
- The production build goes to `web/dist/`, which git ignores.

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
rm -f config/license.key config/license.key.1   # Every Craft project needs its own license
rm -rf web/uploads/*                             # Example images
rm -f .env                                       # It's created again in step 4
```

### 3. Rename the project

| File | What to change |
| --- | --- |
| `.ddev/config.yaml` | `name: CraftCMStest` → `name: my-project` |
| `vite.config.js` | `"craftcmstest.ddev.site"` in the allowed hosts → `"my-project.ddev.site"` |
| `package.json` | `"name": "craftcmstest"` → `"name": "my-project"` |
| `templates/_layouts/_layout.twig` | Site name, logo, navigation, footer text, social links and email address |

### 4. Create the `.env` file

```sh
cp .env.example.dev .env
```

Add the site URLs to `.env`. DDEV already provides the database settings.

```dotenv
PRIMARY_SITE_URL=https://my-project.ddev.site
PRIMARY_SITE_URL_EN=https://my-project.ddev.site/en
PRIMARY_SITE_UPLOADS_URL=https://my-project.ddev.site/uploads
```

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

---

## Deploying

1. Create `.env` on the server from `.env.example.staging` or `.env.example.production`, and fill in the database settings, app ID, security key and site URLs.
2. Run `composer install --no-dev`.
3. Run `npm ci && npm run build`.
4. Run `php craft up`.

Uploads (`web/uploads/`) and the database aren't stored in git. Move them between environments separately.
