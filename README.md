# Appliances 2 U website

Static rebuild of www.appliances2u.com (moved off Wix). No framework and no npm dependencies: a small Node script turns `src/` into plain HTML in `dist/`, and GitHub Actions publishes that to GitHub Pages.

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
- Old Wix URLs keep working: `/washing-machines`, `/tumble-dryers`, `/integrated`, `/about`, `/contact` are unchanged; `/copy-of-washing-machines` redirects to `/cookers/` and `/fridge-freeze` to `/fridge-freezers/`

## Going live (GitHub Pages)

1. Push this repo to GitHub (branch `main`).
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. **Settings → Pages → Custom domain:** `www.appliances2u.com`, then tick **Enforce HTTPS** once the certificate is issued.
4. At the domain registrar (DNS), replace the Wix records:
   - `www` → `CNAME` → `<your-github-username>.github.io`
   - apex `appliances2u.com` → `A` records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
5. In Google Search Console, submit `https://www.appliances2u.com/sitemap.xml` and check the old URLs with URL Inspection.
6. Cancel the Wix premium plan only after the new site is live and verified.
