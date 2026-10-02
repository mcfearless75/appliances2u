import { site, categories, gradedGuide, faqs, fullAddress } from "./data/site.mjs";
import { layout, img, icon, crumbs, callStrip, faqBlock, mapBlock, localBusinessLd, faqLd, directionsUrl, esc, tel } from "./templates.mjs";

const home = { name: "Home", path: "/" };
const callBtn = (label = `Call ${site.phones[0].display}`) =>
  `<a class="btn btn-call" href="tel:${site.phones[0].e164}">${icon("phone", 18)}${label}</a>`;

// Plain-language fact sheet: easy for people to scan and for AI assistants to quote.
export function quickFacts() {
  const rows = [
    ["Business", `${site.legalName} (A2U), an independent home appliance store`],
    ["Address", fullAddress()],
    ["Phone", site.phones.map(tel).join(" or ")],
    ["Opening hours", site.hours.map((h) => `${h.label} ${h.text}`).join("; ")],
    ["Sells", "New and graded washing machines, tumble dryers, fridge freezers, cookers, hobs and integrated appliances"],
    ["Brands", `${site.brandNames.join(", ")} and more`],
    ["Payment", "Visa and Mastercard"],
    ["Google rating", `${site.reviews.rating} out of 5 from ${site.reviews.count} reviews`],
    ["Delivery & fitting", `Local delivery, installation and old appliance removal. Areas include ${site.areas.join(", ")}. Call for a price.`],
  ];
  return `<section class="section facts" aria-labelledby="facts-h">
  <div class="wrap narrow reveal">
    <h2 id="facts-h">A2U at a glance</h2>
    <dl>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
  </div>
</section>`;
}

const stars = `<span class="stars" aria-hidden="true">${'<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z"/></svg>'.repeat(5)}</span>`;

export const ratingBadge = (cls = "") =>
  `<a class="rating ${cls}" href="${site.reviews.url}" rel="noopener" target="_blank">${stars}<span><strong>${site.reviews.rating}</strong> from ${site.reviews.count} Google reviews</span></a>`;

function reviewsBlock() {
  return `<section class="section reviews" aria-labelledby="reviews-h">
  <div class="wrap">
    <p class="kicker">Customer reviews</p>
    <h2 id="reviews-h">Rated ${site.reviews.rating} on Google</h2>
    ${ratingBadge("rating-dark")}
    <ul class="quotes">${site.reviews.quotes
      .map((q, i) => `<li class="reveal" style="--i:${i}"><blockquote><p>“${esc(q)}”</p><footer>${stars} Google review</footer></blockquote></li>`)
      .join("")}</ul>
    <p><a class="btn btn-ghost" href="${site.reviews.url}" rel="noopener" target="_blank">Read all reviews on Google ${icon("arrow", 16)}</a></p>
  </div>
</section>`;
}

const trustItems = [
  ["tag", "Up to 70% off RRP", "on selected graded stock*"],
  ["truck", "Delivery & fitting", "plus old appliance removal"],
  ["clock", "Open Mon – Sat", "10am – 4:30pm"],
  ["shield", "Top brands", "Samsung, Bosch, Beko & more"],
];

export function homePage(images) {
  const cards = categories
    .map(
      (c, i) => `<li class="card reveal" style="--i:${i}">
        <a href="/${c.slug}/">
          ${img(images, c.hero, `${c.nav} for sale at Appliances 2 U, Bootle`, { sizes: "(min-width: 1000px) 20vw, (min-width: 600px) 33vw, 50vw" })}
          <span class="card-body"><span class="card-ico">${icon(c.icon, 22)}</span><strong>${c.nav}</strong><span class="card-link">View range ${icon("arrow", 16)}</span></span>
        </a>
      </li>`,
    )
    .join("");
  const logos = site.brands
    .map((b) => `<li>${img(images, `brands/${b}`, `${b[0].toUpperCase()}${b.slice(1)}`, { sizes: "160px" })}</li>`)
    .join("")
    // Marquee items start off-screen, where lazy images never load.
    .replace(/ loading="lazy"/g, "");
  const steps = [
    ["Same appliance", "Graded stock is usually new or ex-display. Inside, it is the same machine you would buy on the high street."],
    ["Cosmetic marks only", "A small dent or scratch, often on a side that ends up hidden between units or against a wall."],
    ["Much lower price", "Because it cannot be sold as perfect, you pay far less for the same performance."],
  ];

  const body = `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">${icon("pin", 16)}Strand Road · Bootle · Liverpool</p>
      <h1><span class="display">Big brands.<br><em>Small prices.</em></span> New &amp; graded appliances in Liverpool</h1>
      <p class="lead">Washing machines, tumble dryers, fridge freezers, cookers and integrated appliances from top brands, for a lot less than the high street. Delivery, fitting and old appliance removal available.</p>
      <p class="actions">${callBtn()}<a class="btn btn-outline-light" href="#range">Browse the range</a></p>
      ${ratingBadge()}
    </div>
    <div class="hero-media">
      ${img(images, "site/shop-front-bootle", "Appliances 2 U shop front on Strand Road, Bootle", { eager: true, sizes: "(min-width: 900px) 40vw, 100vw" })}
      <p class="sticker" aria-hidden="true"><span>Up to</span><strong>70%</strong><span>off RRP*</span></p>
    </div>
  </div>
</section>

<section class="trust" aria-label="Why shop with us">
  <ul class="wrap trust-grid">${trustItems
    .map(([ic, t, s]) => `<li>${icon(ic, 26)}<span><strong>${t}</strong><small>${s}</small></span></li>`)
    .join("")}</ul>
</section>

<section class="section" id="range">
  <div class="wrap">
    <p class="kicker">Shop by category</p>
    <h2>Our range</h2>
    <p class="section-lead">Quality new and graded home appliances to suit every kitchen and budget. Stock changes weekly.</p>
    <ul class="cards">${cards}</ul>
  </div>
</section>

<section class="section graded-band">
  <div class="wrap">
    <p class="kicker">Why it's cheaper</p>
    <h2>What “graded” means for you</h2>
    <ol class="steps">${steps.map(([t, d], i) => `<li class="reveal" style="--i:${i}"><span class="step-n">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join("")}</ol>
    <p><a class="btn btn-ghost" href="/${gradedGuide.slug}/">Read the graded appliance guide ${icon("arrow", 16)}</a></p>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div class="reveal">
      <p class="kicker">Local &amp; independent</p>
      <h2>Your local appliance store in Bootle</h2>
      <p>At ${esc(site.legalName)} we are proud to be a trusted local supplier of high-quality appliances at prices that are hard to beat. We have built our reputation on friendly service and a wide range of products for every home and budget.</p>
      <p>From kitchen essentials to premium appliances, we make buying easy, affordable and hassle-free, serving Bootle, Liverpool and the wider Merseyside community.</p>
      <p class="actions"><a class="btn btn-ghost" href="/about/">More about us</a></p>
    </div>
    ${img(images, "site/van-bootle", "Appliances 2 U delivery van in Bootle, Liverpool", { sizes: "(min-width: 900px) 45vw, 100vw", cls: "rounded reveal" })}
  </div>
</section>

<section class="brands" aria-labelledby="brands-h">
  <div class="wrap">
    <h2 id="brands-h" class="kicker">Brands we stock</h2>
  </div>
  <div class="marquee"><ul class="brand-logos">${logos}${logos.replace(/<li>/g, '<li aria-hidden="true">')}</ul></div>
  <p class="wrap muted center">Including ${site.brandNames.join(", ")} and more, subject to availability.</p>
</section>

${reviewsBlock()}
${quickFacts()}
${faqBlock()}
${callStrip()}
<p class="wrap muted small footnote">*Selected graded appliances only. Terms and conditions apply; please ask in store.</p>`;

  return layout({
    path: "/",
    title: "Appliances 2 U | New & Graded Appliances Bootle, Liverpool",
    description:
      "Liverpool's local store for new and graded washing machines, fridge freezers, cookers and tumble dryers at low prices, with local delivery. Visit us at 203 Strand Road, Bootle L20 3HJ.",
    body,
    ld: [
      localBusinessLd(),
      faqLd(),
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        alternateName: site.shortName,
        url: `${site.url}/`,
        inLanguage: "en-GB",
        publisher: { "@id": `${site.url}/#store` },
      },
    ],
  });
}

export function categoryPage(c, images) {
  const gallery = images.galleries[c.gallery];
  const trail = [home, { name: c.nav, path: `/${c.slug}/` }];
  const single = c.nav.replace(/s$/, "");
  const figures = gallery
    .map((g, i) => {
      const stem = g.src.replace(/^assets\/img\//, "").replace(/\.webp$/, "");
      return `<li><a href="/${g.src}" class="zoom">${img(images, stem, `${single} in stock at Appliances 2 U Bootle – photo ${i + 1}`, { sizes: "(min-width: 900px) 25vw, 50vw" })}</a></li>`;
    })
    .join("");
  const others = categories
    .filter((o) => o.slug !== c.slug)
    .map((o) => `<li><a href="/${o.slug}/">${icon(o.icon, 18)}${o.nav}</a></li>`)
    .join("");
  const allFaqs = [...c.faqs, faqs[0]];

  const body = `
<section class="page-hero">
  ${crumbs(trail)}
  <div class="wrap page-hero-grid">
    <div>
      <span class="page-ico">${icon(c.icon, 34)}</span>
      <h1>${c.h1}</h1>
      ${c.intro.map((p) => `<p>${p}</p>`).join("\n      ")}
      <p class="actions">${callBtn(`Call ${site.phones[0].display} to check stock`)}</p>
      <p class="delivery-note">${icon("truck", 20)}Local delivery, fitting &amp; old appliance removal</p>
    </div>
    ${img(images, c.hero, `${c.nav} at Appliances 2 U, Bootle`, { eager: true, sizes: "(min-width: 900px) 35vw, 100vw", cls: "page-hero-img" })}
  </div>
</section>
<section class="section tips">
  <div class="wrap">
    <p class="kicker">Buying tips</p>
    <h2>Choosing a ${c.item}</h2>
    <ul class="tip-grid">${c.guide.map(([t, d], i) => `<li class="reveal" style="--i:${i}"><h3>${t}</h3><p>${d}</p></li>`).join("")}</ul>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <p class="kicker">In store</p>
    <h2>Recent ${c.nav.toLowerCase()} stock</h2>
    <p class="section-lead">A selection of ${c.item}s we have had in store. Stock changes regularly, so call for the latest availability and prices.</p>
    <ul class="gallery">${figures}</ul>
  </div>
</section>
${faqBlock(allFaqs, `${c.nav}: common questions`)}
${callStrip(`Looking for a ${c.item}?`)}
<section class="section">
  <div class="wrap">
    <h2>Explore more appliances</h2>
    <ul class="pill-links">${others}<li><a href="/${gradedGuide.slug}/">${icon("tag", 18)}What is graded?</a></li></ul>
  </div>
</section>`;

  return layout({
    path: `/${c.slug}/`,
    title: c.title,
    description: c.description,
    body,
    breadcrumb: trail,
    ld: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: c.h1,
        description: c.description,
        url: `${site.url}/${c.slug}/`,
        inLanguage: "en-GB",
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#store` },
        primaryImageOfPage: `${site.url}/assets/img/${c.hero}.webp`,
        image: gallery.map((g) => `${site.url}/${g.src}`),
      },
      faqLd(allFaqs),
    ],
  });
}

export function gradedPage(images) {
  const g = gradedGuide;
  const trail = [home, { name: g.nav, path: `/${g.slug}/` }];
  const guideFaqs = [faqs[0], ...categories.map((c) => c.faqs[1]).filter((f) => /graded|reliable/i.test(f.q))];
  const body = `
<section class="page-hero">
  ${crumbs(trail)}
  <div class="wrap narrow">
    <p class="kicker">Buyer's guide</p>
    <h1>${g.h1}</h1>
    <p class="lead">Save money on big-brand appliances without buying second-hand. Here is what graded really means and what to check.</p>
  </div>
</section>
<article class="section prose">
  <div class="wrap narrow">
    ${g.sections.map(([h, p]) => `<h2>${h}</h2>\n    <p>${p}</p>`).join("\n    ")}
    <figure>${img(images, "site/shop-front-bootle", "Graded appliances on sale at Appliances 2 U, Bootle", { sizes: "(min-width: 800px) 760px, 100vw", cls: "rounded" })}
      <figcaption>Our showroom at ${esc(fullAddress())}.</figcaption></figure>
    <h2>Shop graded appliances in Liverpool</h2>
    <ul class="pill-links">${categories.map((c) => `<li><a href="/${c.slug}/">${icon(c.icon, 18)}${c.nav}</a></li>`).join("")}</ul>
  </div>
</article>
${faqBlock(guideFaqs)}
${callStrip("Want to see graded stock in person?")}`;
  return layout({
    path: `/${g.slug}/`,
    title: g.title,
    description: g.description,
    body,
    breadcrumb: trail,
    ld: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: g.h1,
        description: g.description,
        inLanguage: "en-GB",
        mainEntityOfPage: `${site.url}/${g.slug}/`,
        image: `${site.url}/assets/img/site/og-card.jpg`,
        author: { "@id": `${site.url}/#store` },
        publisher: { "@id": `${site.url}/#store` },
        datePublished: "2026-10-02",
        dateModified: new Date().toISOString().slice(0, 10),
      },
      faqLd(guideFaqs),
    ],
  });
}

export function aboutPage(images) {
  const trail = [home, { name: "About", path: "/about/" }];
  const body = `
<section class="page-hero">
  ${crumbs(trail)}
  <div class="wrap split">
    <div>
      <p class="kicker">About A2U</p>
      <h1>About Appliances 2 U</h1>
      <p>${esc(site.name)} (A2U) is your go-to destination in Bootle, Liverpool for high-quality new, nearly new and graded appliances for the home.</p>
      <p>We offer a wide range of appliances, from fridge freezers to washing machines, all at affordable prices. Our team is dedicated to friendly, honest service and to helping you find the right appliance for your needs and your budget.</p>
      <ul class="ticks">
        <li>New and graded stock from leading brands</li>
        <li>Prices well below the high street</li>
        <li>New stock coming in all the time</li>
        <li>Local delivery, installation and old appliance removal</li>
        <li>Local, independent and rated ${site.reviews.rating} on Google</li>
      </ul>
    </div>
    ${img(images, "site/shop-front-bootle", "Appliances 2 U shop front, 203 Strand Road, Bootle", { eager: true, sizes: "(min-width: 900px) 40vw, 100vw", cls: "rounded" })}
  </div>
</section>
${quickFacts()}
${callStrip("Talk to our team")}`;
  return layout({
    path: "/about/",
    title: "About Us | Appliances 2 U Bootle, Liverpool",
    description:
      "Appliances 2 U (A2U) is an independent Bootle store selling high-quality new, nearly new and graded home appliances at affordable prices across Liverpool.",
    body,
    breadcrumb: trail,
    ld: [localBusinessLd(), { "@context": "https://schema.org", "@type": "AboutPage", url: `${site.url}/about/`, about: { "@id": `${site.url}/#store` } }],
  });
}

export function contactPage() {
  const trail = [home, { name: "Contact", path: "/contact/" }];
  const hours = site.hours.map((h) => `<li><span>${h.label}</span><span>${h.text}</span></li>`).join("");
  const body = `
<section class="page-hero">
  ${crumbs(trail)}
  <div class="wrap narrow">
    <p class="kicker">Get in touch</p>
    <h1>Contact Appliances 2 U</h1>
    <p>Have a question or want to check stock? Give us a call or visit the showroom. We are happy to help.</p>
  </div>
</section>
<section class="section">
  <div class="wrap contact-grid">
    <div class="panel">
      <h2>Call us</h2>
      <p class="big-phones">${site.phones.map(tel).join("<br>")}</p>
      <h2>Opening hours</h2>
      <ul class="hours">${hours}</ul>
      <h2>Address</h2>
      <address>${site.legalName}<br>${esc(fullAddress())}</address>
      <h2>Finding us</h2>
      <p>On Strand Road in Bootle, easy to reach from ${site.areas.slice(1, -1).join(", ")} and ${site.areas.at(-1)}.</p>
      <h2>Delivery</h2>
      <p>${site.delivery}</p>
    </div>
    ${mapBlock()}
  </div>
</section>`;
  return layout({
    path: "/contact/",
    title: "Contact Us | Appliances 2 U, 203 Strand Road, Bootle L20 3HJ",
    description:
      "Contact Appliances 2 U in Bootle, Liverpool. Call 07769 865432 or 07752 241831, or visit us at 203 Strand Road, L20 3HJ. Open Monday to Saturday, 10am–4:30pm.",
    body,
    breadcrumb: trail,
    ld: [localBusinessLd(), { "@context": "https://schema.org", "@type": "ContactPage", url: `${site.url}/contact/`, about: { "@id": `${site.url}/#store` } }],
  });
}

export function notFoundPage() {
  const links = categories.map((c) => `<li><a href="/${c.slug}/">${icon(c.icon, 18)}${c.nav}</a></li>`).join("");
  return layout({
    path: "/404.html",
    title: "Page not found | Appliances 2 U",
    description: "Sorry, we couldn't find that page.",
    body: `<section class="page-hero"><div class="wrap narrow">
  <h1>Page not found</h1>
  <p>Sorry, that page has moved or no longer exists. Try one of these instead:</p>
  <ul class="pill-links">${links}<li><a href="/">Home</a></li></ul>
</div></section>`,
  }).replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex">');
}

// Old Wix URLs → new pages. GitHub Pages has no server-side 301s; an instant
// meta refresh plus canonical is treated by Google as a permanent redirect.
export function redirectPage(to) {
  const url = `${site.url}${to}`;
  return `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8">
<title>Moved</title>
<link rel="canonical" href="${url}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace(${JSON.stringify(to)} + location.search + location.hash)</script>
</head><body><p>This page has moved to <a href="${to}">${url}</a>.</p></body></html>
`;
}

export { directionsUrl };
