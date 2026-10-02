// Static site build: node build.mjs  ->  dist/
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { site, categories } from "./src/data/site.mjs";
import { homePage, categoryPage, gradedPage, deliveryPage, aboutPage, contactPage, notFoundPage, redirectPage } from "./src/pages.mjs";
import { llmsTxt, llmsFullTxt } from "./src/llms.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, "src");
const out = join(root, "dist");
// Set BASE_PATH=appliances2u to preview at <user>.github.io/appliances2u/ before the domain moves.
// (No leading slash: Git Bash on Windows rewrites "/x" env values into file paths.)
const basePath = (process.env.BASE_PATH || "").replace(/^\/+|\/+$/g, "");
const BASE = basePath ? `/${basePath}` : "";

const rebase = (html) =>
  !BASE
    ? html
    : html
        .replace(/(href|src|srcset)="\/(?!\/)/g, `$1="${BASE}/`)
        .replace(/, \/assets\//g, `, ${BASE}/assets/`)
        .replace(/url=\//g, `url=${BASE}/`)
        .replace(/location\.replace\("\//g, `location.replace("${BASE}/`);

function loadImages() {
  const manifest = JSON.parse(readFileSync(join(src, "data", "images.json"), "utf8"));
  const byStem = {};
  const add = (m) => {
    const stem = m.src.replace(/^assets\/img\//, "").replace(/\.(webp|png)$/, "");
    const thumb = `assets/img/${stem}-600.webp`;
    byStem[stem] = { ...m, thumb: existsSync(join(src, thumb)) ? thumb : null };
  };
  Object.values(manifest.galleries).flat().forEach(add);
  Object.values(manifest.singles).forEach(add);
  return { galleries: manifest.galleries, byStem };
}

function write(path, content) {
  const file = join(out, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, path.endsWith(".html") ? rebase(content) : content);
}

const images = loadImages();
rmSync(out, { recursive: true, force: true });
cpSync(join(src, "assets"), join(out, "assets"), { recursive: true });

const pages = [
  ["/", homePage(images)],
  ...categories.map((c) => [`/${c.slug}/`, categoryPage(c, images)]),
  ["/graded-appliances/", gradedPage(images)],
  ["/delivery/", deliveryPage(images)],
  ["/about/", aboutPage(images)],
  ["/contact/", contactPage()],
];
for (const [path, html] of pages) write(`${path}index.html`, html);
write("404.html", notFoundPage());

// Redirect stubs for renamed Wix URLs
const redirects = [
  ...categories.flatMap((c) => (c.oldPaths || []).map((p) => [p, `/${c.slug}/`])),
  // Other URLs from the old Wix sitemap (template/placeholder pages)
  ["shipping-and-returns", "/delivery/"],
  ["terms-and-conditions", "/contact/"],
  ["help-center", "/"],
  ["coming-soon-01", "/"],
];
for (const [from, to] of redirects) {
  write(`${from}/index.html`, redirectPage(to));
  write(`${from}.html`, redirectPage(to));
}

const today = new Date().toISOString().slice(0, 10);
// Sitemap with image entries (helps Google Images / local pack pick up stock photos)
const sitemapUrl = ([p, html]) => {
  const imgs = [...new Set([...html.matchAll(/<img src="\/(assets\/img\/[^"]+\.(?:webp|jpg))"/g)].map((m) => m[1]))];
  const imageTags = imgs.map((i) => `\n    <image:image><image:loc>${site.url}/${i}</image:loc></image:image>`).join("");
  return `  <url><loc>${site.url}${p}</loc><lastmod>${today}</lastmod>${imageTags}\n  </url>`;
};
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.map(sitemapUrl).join("\n")}
</urlset>
`,
);

// Search engines and AI answer engines are all explicitly welcome.
const aiBots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot", "DuckAssistBot", "Amazonbot", "CCBot", "meta-externalagent", "MistralAI-User"];
write(
  "robots.txt",
  `User-agent: *\nAllow: /\n\n${aiBots.map((b) => `User-agent: ${b}`).join("\n")}\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
);
write("llms.txt", llmsTxt());
write("llms-full.txt", llmsFullTxt());
if (!BASE) write("CNAME", `${new URL(site.url).host}\n`);
write(".nojekyll", "");
write(
  "site.webmanifest",
  JSON.stringify(
    {
      name: site.name,
      short_name: site.shortName,
      start_url: `${BASE}/`,
      display: "browser",
      theme_color: "#1b1f8a",
      background_color: "#ffffff",
      icons: [
        { src: `${BASE}/assets/img/brand/icon-192.png`, sizes: "192x192", type: "image/png" },
        { src: `${BASE}/assets/img/brand/icon-512.png`, sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2,
  ),
);

console.log(`Built ${pages.length} pages, ${redirects.length} redirects -> dist/`);
