import { site, categories, fullAddress } from "./data/site.mjs";
import { layout, img, crumbs, callStrip, faqBlock, mapBlock, localBusinessLd, faqLd, esc, tel } from "./templates.mjs";

const home = { name: "Home", path: "/" };

export function homePage(images) {
  const cards = categories
    .map(
      (c) => `<li class="card">
        <a href="/${c.slug}/">
          ${img(images, c.hero, `${c.nav} for sale at Appliances 2 U, Bootle`, { sizes: "(min-width: 900px) 20vw, (min-width: 600px) 50vw, 100vw" })}
          <span class="card-body"><strong>${c.nav}</strong><span>View the range →</span></span>
        </a>
      </li>`,
    )
    .join("");
  const brands = site.brands
    .map((b) => `<li>${img(images, `brands/${b}`, `${b[0].toUpperCase()}${b.slice(1)}`, { sizes: "160px" })}</li>`)
    .join("");

  const body = `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow">Bootle · Liverpool · Merseyside</p>
      <h1>New &amp; Graded Appliances in Liverpool at Unbeatable Prices</h1>
      <p class="lead">Washing machines, tumble dryers, fridge freezers, cookers and integrated appliances from top brands. Visit our showroom at ${esc(site.address.street)}, Bootle.</p>
      <p class="actions">
        <a class="btn btn-call" href="tel:${site.phones[0].e164}">Call ${site.phones[0].display}</a>
        <a class="btn btn-ghost" href="#range">Browse the range</a>
      </p>
      <ul class="usp">
        <li>New stock arriving every week</li>
        <li>Up to 70% off RRP on selected graded appliances*</li>
        <li>Open 7 days a week</li>
      </ul>
    </div>
    <div class="hero-media">
      ${img(images, "site/shop-front-bootle", "Appliances 2 U shop front on Strand Road, Bootle", { eager: true, sizes: "(min-width: 900px) 40vw, 100vw" })}
    </div>
  </div>
</section>

<section class="section" id="range">
  <div class="wrap">
    <h2>Our range</h2>
    <p class="section-lead">Quality new and graded home appliances to suit every kitchen and budget.</p>
    <ul class="cards">${cards}</ul>
  </div>
</section>

<section class="section alt">
  <div class="wrap split">
    <div>
      <h2>Your local appliance store in Bootle</h2>
      <p>At ${esc(site.legalName)} we are proud to be a trusted local supplier of high-quality appliances at prices that are hard to beat. With years of experience, we have built our reputation on friendly service and a wide range of products for every home and budget.</p>
      <p>From kitchen essentials to premium appliances, we make buying easy, affordable and hassle-free. Based in the heart of Bootle, we are committed to serving Liverpool and the wider Merseyside community with reliability and value you can count on.</p>
      <p><a class="btn btn-ghost" href="/about/">More about us</a></p>
    </div>
    ${img(images, "site/van-bootle", "Appliances 2 U van in Bootle, Liverpool", { sizes: "(min-width: 900px) 45vw, 100vw", cls: "rounded" })}
  </div>
</section>

<section class="section brands">
  <div class="wrap">
    <h2>Brands we stock</h2>
    <ul class="brand-logos">${brands}</ul>
    <p class="muted">Including ${site.brandNames.join(", ")} and more, subject to availability.</p>
  </div>
</section>

${faqBlock()}
${callStrip()}
<p class="wrap muted small">*Selected graded appliances only. Terms and conditions apply; please ask in store.</p>`;

  return layout({
    path: "/",
    title: "Appliances 2 U | New & Graded Appliances Bootle, Liverpool",
    description:
      "Liverpool's local store for new and graded washing machines, fridge freezers, cookers and tumble dryers at low prices. Visit us at 203 Strand Road, Bootle L20 3HJ.",
    body,
    ld: [localBusinessLd(), faqLd(), { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: `${site.url}/` }],
  });
}

export function categoryPage(c, images) {
  const gallery = images.galleries[c.gallery];
  const trail = [home, { name: c.nav, path: `/${c.slug}/` }];
  const figures = gallery
    .map((g, i) => {
      const stem = g.src.replace(/^assets\/img\//, "").replace(/\.webp$/, "");
      const alt = `${c.nav.replace(/s$/, "")} in stock at Appliances 2 U Bootle – photo ${i + 1}`;
      return `<li><a href="/${g.src}" class="zoom">${img(images, stem, alt, { sizes: "(min-width: 900px) 25vw, 50vw" })}</a></li>`;
    })
    .join("");
  const others = categories
    .filter((o) => o.slug !== c.slug)
    .map((o) => `<li><a href="/${o.slug}/">${o.nav}</a></li>`)
    .join("");

  const body = `
${crumbs(trail)}
<section class="page-head">
  <div class="wrap narrow">
    <h1>${c.h1}</h1>
    ${c.intro.map((p) => `<p>${p}</p>`).join("\n    ")}
    <p class="actions"><a class="btn btn-call" href="tel:${site.phones[0].e164}">Call ${site.phones[0].display} to check stock</a></p>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <h2>Recent stock</h2>
    <p class="section-lead">A selection of ${c.item}s we have had in store. Stock changes regularly, so call for the latest availability and prices.</p>
    <ul class="gallery">${figures}</ul>
  </div>
</section>
${callStrip(`Looking for a ${c.item}?`)}
<section class="section">
  <div class="wrap">
    <h2>Explore more appliances</h2>
    <ul class="pill-links">${others}</ul>
  </div>
</section>`;

  return layout({
    path: `/${c.slug}/`,
    title: c.title,
    description: c.description,
    ogImage: `assets/img/${c.hero}.webp`,
    body,
    breadcrumb: trail,
    ld: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: c.h1,
        description: c.description,
        url: `${site.url}/${c.slug}/`,
        about: { "@id": `${site.url}/#store` },
        primaryImageOfPage: `${site.url}/assets/img/${c.hero}.webp`,
      },
    ],
  });
}

export function aboutPage(images) {
  const trail = [home, { name: "About", path: "/about/" }];
  const body = `
${crumbs(trail)}
<section class="page-head">
  <div class="wrap split">
    <div>
      <h1>About Appliances 2 U</h1>
      <p>${esc(site.name)} (A2U) is your go-to destination in Bootle, Liverpool for high-quality new, nearly new and graded appliances for the home.</p>
      <p>We offer a wide range of appliances, from fridge freezers to washing machines, all at affordable prices. Our team is dedicated to friendly, honest service and to helping you find the right appliance for your needs and your budget.</p>
      <p>Discover the A2U difference and bring home reliable appliances that fit your lifestyle.</p>
      <h2>Why shop with us?</h2>
      <ul class="ticks">
        <li>New and graded stock from leading brands</li>
        <li>Prices well below the high street</li>
        <li>New stock coming in all the time</li>
        <li>Local, independent and open 7 days a week</li>
      </ul>
    </div>
    ${img(images, "site/shop-front-bootle", "Appliances 2 U shop front, 203 Strand Road, Bootle", { sizes: "(min-width: 900px) 40vw, 100vw", cls: "rounded" })}
  </div>
</section>
${callStrip("Talk to our team")}`;
  return layout({
    path: "/about/",
    title: "About Us | Appliances 2 U Bootle, Liverpool",
    description:
      "Appliances 2 U (A2U) is an independent Bootle store selling high-quality new, nearly new and graded home appliances at affordable prices across Liverpool.",
    body,
    breadcrumb: trail,
    ld: [localBusinessLd()],
  });
}

export function contactPage() {
  const trail = [home, { name: "Contact", path: "/contact/" }];
  const hours = site.hours.map((h) => `<li><span>${h.label}</span><span>${h.text}</span></li>`).join("");
  const body = `
${crumbs(trail)}
<section class="page-head">
  <div class="wrap narrow">
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
    </div>
    ${mapBlock()}
  </div>
</section>`;
  return layout({
    path: "/contact/",
    title: "Contact Us | Appliances 2 U, 203 Strand Road, Bootle L20 3HJ",
    description:
      "Contact Appliances 2 U in Bootle, Liverpool. Call 07769 865432 or 07752 241831, or visit us at 203 Strand Road, L20 3HJ. Open 7 days a week.",
    body,
    breadcrumb: trail,
    ld: [localBusinessLd()],
  });
}

export function notFoundPage() {
  const links = categories.map((c) => `<li><a href="/${c.slug}/">${c.nav}</a></li>`).join("");
  return layout({
    path: "/404.html",
    title: "Page not found | Appliances 2 U",
    description: "Sorry, we couldn't find that page.",
    body: `<section class="page-head"><div class="wrap narrow">
  <h1>Page not found</h1>
  <p>Sorry, that page has moved or no longer exists. Try one of these instead:</p>
  <ul class="pill-links">${links}<li><a href="/">Home</a></li></ul>
</div></section>`,
  }).replace('<meta name="robots" content="index, follow, max-image-preview:large">', '<meta name="robots" content="noindex">');
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
