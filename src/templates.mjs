import { site, categories, faqs, gradedGuide, fullAddress } from "./data/site.mjs";

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const tel = (p) => `<a href="tel:${p.e164}">${p.display}</a>`;

const mapsQuery = encodeURIComponent(`${site.legalName}, ${fullAddress()}`);
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

// Line icons (24px grid, stroke = currentColor). Decorative: always aria-hidden.
const ICONS = {
  phone: '<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" fill="currentColor" stroke="none"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  washer: '<rect x="4" y="2.5" width="16" height="19" rx="2"/><path d="M4 7h16"/><circle cx="12" cy="14" r="4.5"/><circle cx="7.5" cy="4.8" r=".6" fill="currentColor"/><circle cx="10" cy="4.8" r=".6" fill="currentColor"/>',
  cooker: '<rect x="4" y="2.5" width="16" height="19" rx="2"/><path d="M4 9h16"/><circle cx="8.5" cy="5.8" r="1.4"/><circle cx="15.5" cy="5.8" r="1.4"/><rect x="7" y="12" width="10" height="6.5" rx="1"/>',
  fridge: '<rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M5 10h14M8.5 5.5v2M8.5 13v3"/>',
  dryer: '<rect x="4" y="2.5" width="16" height="19" rx="2"/><path d="M4 7h16"/><circle cx="12" cy="14" r="4.5"/><path d="M10 13.5c1-.8 3-.8 4 0M10 15.5c1-.8 3-.8 4 0"/>',
  integrated: '<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M12 3v18M3 12h18M9.5 7v2M14.5 7v2M9.5 15v2M14.5 15v2"/>',
  tag: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  truck: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  shield: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
  card: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6 15h4"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
};
export const icon = (name, size = 24) =>
  `<svg class="ico" aria-hidden="true" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;

// Responsive <img>: uses the -600 thumbnail when one exists.
export function img(images, stem, alt, { sizes = "(min-width: 900px) 33vw, 100vw", eager = false, cls = "" } = {}) {
  const meta = images.byStem[stem];
  if (!meta) throw new Error(`Unknown image: ${stem}`);
  const srcset = meta.thumb ? ` srcset="/${meta.thumb} 600w, /${meta.src} ${meta.w}w" sizes="${sizes}"` : "";
  const loading = eager ? ` fetchpriority="high"` : ` loading="lazy" decoding="async"`;
  return `<img src="/${meta.src}"${srcset} width="${meta.w}" height="${meta.h}" alt="${esc(alt)}"${loading}${cls ? ` class="${cls}"` : ""}>`;
}

const navLinks = [
  { href: "/", label: "Home" },
  ...categories.map((c) => ({ href: `/${c.slug}/`, label: c.nav })),
  { href: `/${gradedGuide.slug}/`, label: "Graded Guide" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

// Opening hours for the live open/closed badge (read by site.js).
const hoursJson = esc(JSON.stringify(site.hours.map(({ days, opens, closes }) => ({ days, opens, closes }))));

function header(path) {
  const items = navLinks
    .map((l) => `<li><a href="${l.href}"${l.href === path ? ' aria-current="page"' : ""}>${l.label}</a></li>`)
    .join("");
  return `<a class="skip" href="#main">Skip to main content</a>
<div class="topbar">
  <div class="wrap topbar-inner">
    <span class="status" data-hours="${hoursJson}">${icon("clock", 16)}<span class="status-text">Open 7 days a week</span></span>
    <a class="topbar-addr" href="${directionsUrl}" rel="noopener" target="_blank">${icon("pin", 16)}${esc(site.address.street)}, ${esc(site.address.locality)} ${esc(site.address.postcode)}</a>
  </div>
</div>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="/" aria-label="${site.name} home">
      <img src="/assets/img/brand/logo-96.webp" width="52" height="52" alt="">
      <span><strong>Appliances<span class="two">2</span>U</strong><small>New &amp; graded appliances · Bootle</small></span>
    </a>
    <a class="btn btn-call header-call" href="tel:${site.phones[0].e164}">${icon("phone", 18)}<span>${site.phones[0].display}</span></a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">
      <span class="sr-only">Menu</span><span class="bars" aria-hidden="true"></span>
    </button>
  </div>
  <nav id="site-nav" class="site-nav" aria-label="Main">
    <ul class="wrap">${items}</ul>
  </nav>
</header>`;
}

function footer() {
  const hours = site.hours.map((h) => `<li><span>${h.label}</span><span>${h.text}</span></li>`).join("");
  const cats = categories.map((c) => `<li><a href="/${c.slug}/">${c.nav}</a></li>`).join("");
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <section>
      <img class="footer-logo" src="/assets/img/brand/logo-240.webp" width="120" height="120" alt="Appliances 2 U logo" loading="lazy">
      <address>${site.legalName}<br>${site.address.street}<br>${site.address.locality}, ${site.address.city}<br>${site.address.postcode}</address>
      <p>${site.phones.map(tel).join("<br>")}</p>
    </section>
    <section>
      <h2>Opening hours</h2>
      <ul class="hours">${hours}</ul>
    </section>
    <section>
      <h2>Shop</h2>
      <ul class="links">${cats}<li><a href="/${gradedGuide.slug}/">What is graded?</a></li><li><a href="/about/">About us</a></li><li><a href="/contact/">Contact</a></li></ul>
    </section>
    <section>
      <h2>Payments</h2>
      <p class="pay">
        <img src="/assets/img/brand/visa.png" alt="Visa" width="56" height="36" loading="lazy">
        <img src="/assets/img/brand/mastercard.png" alt="Mastercard" width="56" height="36" loading="lazy">
      </p>
      <p>${site.social.map((s) => `<a href="${s.url}" rel="noopener" target="_blank">Follow us on ${s.name}</a>`).join("")}</p>
      <p class="areas">Serving ${site.areas.slice(0, -1).join(", ")} and ${site.areas.at(-1)}.</p>
    </section>
  </div>
  <p class="wrap legal">© ${year} ${site.legalName}. All rights reserved.</p>
</footer>
<nav class="action-bar" aria-label="Quick actions">
  <a href="tel:${site.phones[0].e164}">${icon("phone", 20)}Call</a>
  <a href="${directionsUrl}" rel="noopener" target="_blank">${icon("pin", 20)}Directions</a>
</nav>`;
}

export function localBusinessLd() {
  const a = site.address;
  return {
    "@context": "https://schema.org",
    "@type": "HomeGoodsStore",
    "@id": `${site.url}/#store`,
    name: site.name,
    legalName: site.legalName,
    alternateName: [site.shortName, "Appliances2U", "A2U Liverpool"],
    url: `${site.url}/`,
    logo: `${site.url}/assets/img/brand/icon-512.png`,
    image: [`${site.url}/assets/img/site/shop-front-bootle.webp`, `${site.url}/assets/img/site/og-card.jpg`, `${site.url}/assets/img/site/van-bootle.webp`],
    description:
      "Independent appliance store in Bootle, Liverpool selling new and graded washing machines, tumble dryers, fridge freezers, cookers and integrated appliances at prices below the high street.",
    slogan: "Quality new and graded appliances at unbeatable prices",
    telephone: site.phones[0].e164,
    contactPoint: site.phones.map((p) => ({ "@type": "ContactPoint", telephone: p.e164, contactType: "sales", areaServed: "GB", availableLanguage: "en-GB" })),
    address: { "@type": "PostalAddress", streetAddress: a.street, addressLocality: a.locality, addressRegion: a.region, postalCode: a.postcode, addressCountry: a.country },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
    areaServed: site.areas.map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: site.hours.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    paymentAccepted: "Visa, Mastercard",
    currenciesAccepted: "GBP",
    brand: site.brandNames.map((name) => ({ "@type": "Brand", name })),
    knowsAbout: ["Graded appliances", "Ex-display appliances", "Washing machines", "Tumble dryers", "Fridge freezers", "Cookers", "Integrated appliances"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Home appliances",
      itemListElement: categories.map((c) => ({
        "@type": "OfferCatalog",
        name: c.nav,
        url: `${site.url}/${c.slug}/`,
        description: c.description,
      })),
    },
    sameAs: site.social.map((s) => s.url),
  };
}

function breadcrumbLd(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: `${site.url}${t.path}` })),
  };
}

export function faqLd(list = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function layout({ path, title, description, ogImage, body, ld = [], breadcrumb }) {
  const canonical = `${site.url}${path}`;
  const og = ogImage
    ? { url: `${site.url}/${ogImage}`, w: null, h: null }
    : { url: `${site.url}/assets/img/site/og-card.jpg`, w: 1200, h: 630 };
  const schemas = [...ld, ...(breadcrumb ? [breadcrumbLd(breadcrumb)] : [])]
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`)
    .join("\n");
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en-GB" href="${canonical}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="theme-color" content="#0e1157">
<meta name="geo.region" content="GB-SFT">
<meta name="geo.placename" content="Bootle, Liverpool">
<meta name="geo.position" content="${site.geo.lat};${site.geo.lng}">
<meta name="ICBM" content="${site.geo.lat}, ${site.geo.lng}">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_GB">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og.url}">${og.w ? `\n<meta property="og:image:width" content="${og.w}">\n<meta property="og:image:height" content="${og.h}">` : ""}
<meta property="og:image:alt" content="${esc(site.name)} – new and graded appliances in Bootle, Liverpool">
<meta property="business:contact_data:street_address" content="${esc(site.address.street)}">
<meta property="business:contact_data:locality" content="${esc(site.address.locality)}">
<meta property="business:contact_data:postal_code" content="${esc(site.address.postcode)}">
<meta property="business:contact_data:country_name" content="United Kingdom">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${og.url}">
<link rel="icon" href="/assets/img/brand/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/brand/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/rubik-latin-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css">
<link rel="alternate" type="text/plain" title="LLM summary" href="/llms.txt">
<script>document.documentElement.classList.add("js")</script>
<script src="/assets/js/site.js" defer></script>
${schemas}
</head>
<body>
${header(path)}
<main id="main">
${body}
</main>
${footer()}
</body>
</html>
`;
}

export function crumbs(trail) {
  return `<nav class="crumbs wrap" aria-label="Breadcrumb"><ol>${trail
    .map((t, i) => (i === trail.length - 1 ? `<li aria-current="page">${esc(t.name)}</li>` : `<li><a href="${t.path}">${esc(t.name)}</a></li>`))
    .join("")}</ol></nav>`;
}

export function callStrip(heading = "Seen something you like?") {
  return `<section class="call-strip">
  <div class="wrap call-strip-inner reveal">
    <div>
      <h2>${heading}</h2>
      <p>Stock moves fast. Call us to check availability or reserve an appliance.</p>
    </div>
    <p class="actions">${site.phones.map((p) => `<a class="btn btn-call" href="tel:${p.e164}">${icon("phone", 18)}${p.display}</a>`).join("")}
      <a class="btn btn-outline-light" href="${directionsUrl}" rel="noopener" target="_blank">${icon("pin", 18)}Directions</a></p>
  </div>
</section>`;
}

export function faqBlock(list = faqs, heading = "Frequently asked questions") {
  return `<section class="section faq">
  <div class="wrap narrow">
    <h2>${heading}</h2>
    ${list.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("\n    ")}
  </div>
</section>`;
}

export function mapBlock() {
  return `<div class="map">
  <iframe title="Map showing ${esc(site.name)} at ${esc(fullAddress())}" src="https://www.google.com/maps?q=${mapsQuery}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  <p><a class="btn btn-ghost" href="${directionsUrl}" rel="noopener" target="_blank">${icon("pin", 18)}Get directions</a></p>
</div>`;
}

export { esc, tel };
