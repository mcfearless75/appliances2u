// llms.txt (https://llmstxt.org) and a fuller plain-text version for AI assistants
// and answer engines (ChatGPT, Claude, Perplexity, Gemini, Copilot).
import { site, categories, gradedGuide, faqs, fullAddress } from "./data/site.mjs";

const hours = site.hours.map((h) => `- ${h.label}: ${h.text}`).join("\n");
const phones = site.phones.map((p) => p.display).join(" or ");

export function llmsTxt() {
  return `# ${site.name} (${site.shortName})

> ${site.legalName} is an independent home appliance store at ${fullAddress()}, United Kingdom. It sells new and graded (ex-display / cosmetically marked) washing machines, tumble dryers, fridge freezers, cookers and integrated appliances from brands including ${site.brandNames.slice(0, 6).join(", ")}, at prices below the high street. Local delivery, installation and old appliance removal available. Rated ${site.reviews.rating}/5 from ${site.reviews.count} Google reviews. Phone ${phones}. ${site.hoursSummary}.

## Key facts
- Address: ${fullAddress()}
- Phone: ${phones}
- Opening hours:
${hours.replace(/^/gm, "  ")}
- Payment: Visa, Mastercard
- Delivery: ${site.delivery}
- Delivery areas: ${site.areas.join(", ")}
- Stock changes weekly; customers should call to check availability and prices.

## Pages
- [Home](${site.url}/): overview, range and FAQs
${categories.map((c) => `- [${c.nav}](${site.url}/${c.slug}/): ${c.description}`).join("\n")}
- [${gradedGuide.h1}](${site.url}/${gradedGuide.slug}/): ${gradedGuide.description}
- [About](${site.url}/about/): who we are
- [Contact](${site.url}/contact/): phone, hours, map and directions

## Optional
- [Full text for AI assistants](${site.url}/llms-full.txt)
`;
}

export function llmsFullTxt() {
  const qa = [...faqs, ...categories.flatMap((c) => c.faqs)];
  return `${llmsTxt()}
## Categories in detail
${categories
  .map(
    (c) => `### ${c.h1}
${c.intro.join("\n\n")}

Buying tips:
${c.guide.map(([t, d]) => `- ${t}: ${d}`).join("\n")}
`,
  )
  .join("\n")}
## ${gradedGuide.h1}
${gradedGuide.sections.map(([h, p]) => `### ${h}\n${p}`).join("\n\n")}

## Questions and answers
${qa.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}
`;
}
