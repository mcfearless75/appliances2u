import { site, categories, faqs, fullAddress } from "./data/site.mjs";

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const tel = (p) => `<a href="tel:${p.e164}">${p.display}</a>`;

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
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

function header(path) {
  const items = navLinks
    .map((l) => `<li><a href="${l.href}"${l.href === path ? ' aria-current="page"' : ""}>${l.label}</a></li>`)
    .join("");
  return `<a class="skip" href="#main">Skip to main content</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="/" aria-label="${site.name} home">
      <img src="/assets/img/brand/logo-96.webp" width="48" height="48" alt="">
      <span><strong>Appliances<span class="two">2</span>U</strong><small>Domestic Appliances · Bootle</small></span>
    </a>
    <a class="btn btn-call header-call" href="tel:${site.phones[0].e164}">
      <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>
      <span>${site.phones[0].display}</span>
    </a>
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
      <h2>Visit us</h2>
      <address>${site.legalName}<br>${site.address.street}<br>${site.address.locality}, ${site.address.city}<br>${site.address.postcode}</address>
      <p>${site.phones.map(tel).join("<br>")}</p>
    </section>
    <section>
      <h2>Opening hours</h2>
      <ul class="hours">${hours}</ul>
    </section>
    <section>
      <h2>Shop</h2>
      <ul class="links">${cats}<li><a href="/about/">About us</a></li><li><a href="/contact/">Contact</a></li></ul>
    </section>
    <section>
      <h2>Payments</h2>
      <p class="pay">
        <img src="/assets/img/brand/visa.png" alt="Visa" width="56" height="36" loading="lazy">
        <img src="/assets/img/brand/mastercard.png" alt="Mastercard" width="56" height="36" loading="lazy">
      </p>
      <p>${site.social.map((s) => `<a href="${s.url}" rel="noopener" target="_blank">Follow us on ${s.name}</a>`).join("")}</p>
    </section>
  </div>
  <p class="wrap legal">© ${year} ${site.legalName}. All rights reserved.</p>
</footer>
<a class="fab-call" href="tel:${site.phones[0].e164}" aria-label="Call ${site.name} on ${site.phones[0].display}">
  <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>
  Call now
</a>`;
}

export function localBusinessLd() {
  const a = site.address;
  return {
    "@context": "https://schema.org",
    "@type": "HomeGoodsStore",
    "@id": `${site.url}/#store`,
    name: site.name,
    legalName: site.legalName,
    alternateName: site.shortName,
    url: `${site.url}/`,
    logo: `${site.url}/assets/img/brand/icon-512.png`,
    image: [`${site.url}/assets/img/site/shop-front-bootle.webp`, `${site.url}/assets/img/site/van-bootle.webp`],
    description: "New and graded washing machines, tumble dryers, fridge freezers, cookers and integrated appliances in Bootle, Liverpool.",
    telephone: site.phones[0].e164,
    contactPoint: site.phones.map((p) => ({ "@type": "ContactPoint", telephone: p.e164, contactType: "sales", areaServed: "GB" })),
    address: { "@type": "PostalAddress", streetAddress: a.street, addressLocality: a.locality, addressRegion: a.region, postalCode: a.postcode, addressCountry: a.country },
    areaServed: ["Bootle", "Liverpool", "Merseyside", "Sefton"],
    openingHoursSpecification: site.hours.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    paymentAccepted: "Visa, Mastercard",
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

export function faqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function layout({ path, title, description, ogImage, body, ld = [], breadcrumb }) {
  const canonical = `${site.url}${path}`;
  const og = `${site.url}/${ogImage || "assets/img/site/shop-front-bootle.webp"}`;
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
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#1b1f8a">
<meta name="geo.region" content="GB-SFT">
<meta name="geo.placename" content="Bootle, Liverpool">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_GB">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/img/brand/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/brand/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/assets/css/site.css">
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
  <div class="wrap">
    <h2>${heading}</h2>
    <p>Stock moves fast. Call us to check availability or to reserve an appliance.</p>
    <p class="actions">${site.phones.map((p) => `<a class="btn btn-light" href="tel:${p.e164}">Call ${p.display}</a>`).join("")}</p>
  </div>
</section>`;
}

export function faqBlock() {
  return `<section class="section faq">
  <div class="wrap narrow">
    <h2>Frequently asked questions</h2>
    ${faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("\n    ")}
  </div>
</section>`;
}

export function mapBlock() {
  const q = encodeURIComponent(`${site.legalName}, ${fullAddress()}`);
  return `<div class="map">
  <iframe title="Map showing ${esc(site.name)} at ${esc(fullAddress())}" src="https://www.google.com/maps?q=${q}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  <p><a href="https://www.google.com/maps/search/?api=1&amp;query=${q}" rel="noopener" target="_blank">Get directions on Google Maps</a></p>
</div>`;
}

export { esc, tel };
