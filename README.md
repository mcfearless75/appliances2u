# Appliances 2 U website

Static rebuild of www.appliances2u.com (moved off Wix). No framework and no npm dependencies: a small Node script turns `src/` into plain HTML in `dist/`, and `deploy.sh` publishes that to GitHub Pages.

## Editing

| What | Where |
|------|-------|
| Phone numbers, address, opening hours, page titles and descriptions, category copy, FAQs | `src/data/site.mjs` |
| Page layouts | `src/pages.mjs`, `src/templates.mjs` |
| Styles / JS | `src/assets/css/site.css`, `src/assets/js/site.js` |
| Images | `src/assets/img/` (manifest in `src/data/images.json`) |

```bash
node build.mjs                                   # build to dist/
python -m http.server 8080 --directory dist      # preview at http://localhost:8080
```

To add gallery photos, either drop WebP files into `src/assets/img/<category>/` and add them to `src/data/images.json`, or add the source to `tools/fetch_images.py` and re-run it (needs Pillow).

## SEO built in

- Unique `<title>`, meta description, canonical URL, Open Graph tags on every page
- One `<h1>` per page, breadcrumbs, descriptive alt text on all images
- JSON-LD: `HomeGoodsStore` (address, phones, opening hours), `FAQPage`, `BreadcrumbList`, `CollectionPage`
- `sitemap.xml`, `robots.txt`, custom `404.html`
- WebP images with explicit width/height, responsive `srcset`, lazy loading. No JS framework, so pages load fast.
- Local SEO: geo coordinates, `hasMap`, areas served, offer catalogue, brands, opening hours in JSON-LD; geo meta tags; consistent name/address/phone on every page
- AI search / GEO: `llms.txt` + `llms-full.txt`, robots.txt explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…), a quotable "A2U at a glance" fact sheet, question-led FAQs per category, and a graded-appliances guide (Article schema)
- Image sitemap entries for every product photo; 1200×630 social share card (`tools/og_card.py`)
- Old Wix URLs keep working: `/washing-machines`, `/tumble-dryers`, `/integrated`, `/about`, `/contact` are unchanged; `/copy-of-washing-machines` redirects to `/cookers/` and `/fridge-freeze` to `/fridge-freezers/`

## Deploying (GitHub Pages)

Pages serves the `gh-pages` branch. `deploy.sh` builds and force-pushes `dist/` to it. Commit source changes to `main` as normal.

```bash
BASE_PATH=appliances2u ./deploy.sh   # preview at https://mcfearless75.github.io/appliances2u/
./deploy.sh                          # production build for www.appliances2u.com (adds CNAME)
```

## Going live on www.appliances2u.com

1. At the domain registrar (DNS), replace the Wix records:
   - `www` → `CNAME` → `mcfearless75.github.io`
   - apex `appliances2u.com` → `A` records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
2. Run `./deploy.sh` (no `BASE_PATH`) so the build contains the `CNAME` file.
3. Repo **Settings → Pages**: confirm the custom domain shows `www.appliances2u.com`, then tick **Enforce HTTPS** once the certificate is issued.
4. In Google Search Console, submit `https://www.appliances2u.com/sitemap.xml` and check the old URLs with URL Inspection.
5. Cancel the Wix premium plan only after the new site is live and verified.
