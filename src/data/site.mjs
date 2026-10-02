// Single source of truth for business details and page copy.
// Edit here, then run `node build.mjs`.

export const site = {
  url: "https://www.appliances2u.com",
  name: "Appliances 2 U",
  legalName: "Appliances 2 U Ltd",
  shortName: "A2U",
  tagline: "New & graded domestic appliances in Bootle, Liverpool",
  phones: [
    { display: "07769 865432", e164: "+447769865432" },
    { display: "07752 241831", e164: "+447752241831" },
  ],
  address: {
    street: "203 Strand Road",
    locality: "Bootle",
    region: "Merseyside",
    city: "Liverpool",
    postcode: "L20 3HJ",
    country: "GB",
  },
  // Days use schema.org names; times are 24h local.
  hours: [
    { label: "Monday – Friday", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:00", text: "9am – 7pm" },
    { label: "Saturday", days: ["Saturday"], opens: "10:00", closes: "18:00", text: "10am – 6pm" },
    { label: "Sunday", days: ["Sunday"], opens: "10:00", closes: "19:00", text: "10am – 7pm" },
  ],
  social: [{ name: "TikTok", url: "https://www.tiktok.com/@jay.j183" }],
  brands: ["candy", "hoover", "beko", "samsung"],
  brandNames: ["Samsung", "Bosch", "Beko", "Hotpoint", "Hoover", "Candy", "Haier", "Kenwood", "Willow"],
};

export const fullAddress = (a = site.address) =>
  `${a.street}, ${a.locality}, ${a.city} ${a.postcode}`;

export const categories = [
  {
    slug: "washing-machines",
    gallery: "washing-machines",
    nav: "Washing Machines",
    title: "Washing Machines Liverpool | New & Graded | Appliances 2 U Bootle",
    description:
      "New and graded washing machines at low prices from Appliances 2 U on Strand Road, Bootle. Top brands including Samsung, Beko, Hotpoint and Bosch. Call 07769 865432.",
    h1: "Washing Machines in Liverpool",
    item: "washing machine",
    intro: [
      "Looking for a reliable washing machine without paying full retail price? Our Bootle showroom stocks freestanding and integrated washing machines from leading brands, in new, ex-display and graded condition.",
      "Graded machines are typically brand new units with minor cosmetic marks from transit or display, so you get the same performance for considerably less. Stock changes every week, so call ahead to check what is in today.",
    ],
    hero: "washing-machines/washing-machines-liverpool-01",
  },
  {
    slug: "cookers",
    gallery: "cookers",
    nav: "Cookers",
    title: "Cookers & Gas Hobs Liverpool | New & Graded | Appliances 2 U Bootle",
    description:
      "Electric and gas cookers, ovens and hobs at affordable prices from Appliances 2 U in Bootle, Liverpool. Beko, Hotpoint and more, new and graded. Call 07769 865432.",
    h1: "Cookers & Gas Hobs in Liverpool",
    item: "cooker",
    intro: [
      "From compact 50cm electric cookers to 60cm gas and dual-fuel models, we carry a changing range of cookers, ovens and hobs to suit every kitchen and budget.",
      "Every appliance is checked before it goes on the shop floor. Pop in to see the current range at 203 Strand Road, or give us a call and we will tell you what is available.",
    ],
    hero: "cookers/cookers-liverpool-06",
    oldPaths: ["copy-of-washing-machines"],
  },
  {
    slug: "fridge-freezers",
    gallery: "fridge-freezers",
    nav: "Fridge Freezers",
    title: "Fridge Freezers Liverpool | New & Graded | Appliances 2 U Bootle",
    description:
      "Fridge freezers, fridges and freezers at great prices in Bootle, Liverpool. American-style, 50/50, 70/30 and under-counter models, new and graded. Call 07769 865432.",
    h1: "Fridge Freezers in Liverpool",
    item: "fridge freezer",
    intro: [
      "Keep food fresh for less. We stock tall fridge freezers, American-style side-by-side models, under-counter fridges and freezers from well-known brands.",
      "Many of our cold appliances are graded stock: new units with small cosmetic blemishes, priced well below the high street. New stock arrives regularly.",
    ],
    hero: "fridge-freezers/fridge-freezers-liverpool-01",
    oldPaths: ["fridge-freeze"],
  },
  {
    slug: "tumble-dryers",
    gallery: "tumble-dryers",
    nav: "Tumble Dryers",
    title: "Tumble Dryers Liverpool | New & Graded | Appliances 2 U Bootle",
    description:
      "Condenser, heat pump and vented tumble dryers at low prices from Appliances 2 U in Bootle, Liverpool. New and graded stock from top brands. Call 07769 865432.",
    h1: "Tumble Dryers in Liverpool",
    item: "tumble dryer",
    intro: [
      "Condenser, heat pump and vented tumble dryers from trusted brands, available new and graded at our Bootle store.",
      "Not sure which type suits your home? Our team can talk you through the options, from energy-saving heat pump models to budget-friendly vented dryers.",
    ],
    hero: "tumble-dryers/tumble-dryers-liverpool-01",
  },
  {
    slug: "integrated",
    gallery: "integrated",
    nav: "Integrated",
    title: "Integrated Appliances Liverpool | Built-in Ovens, Hobs & More | A2U",
    description:
      "Integrated and built-in appliances in Bootle, Liverpool: ovens, hobs, dishwashers, washing machines and fridge freezers. New and graded at low prices. Call 07769 865432.",
    h1: "Integrated Appliances in Liverpool",
    item: "integrated appliance",
    intro: [
      "Fitting or updating a kitchen? We stock built-in ovens, hobs, extractor hoods, integrated dishwashers, washing machines and fridge freezers that sit neatly behind your kitchen doors.",
      "Graded integrated appliances are an easy way to cut the cost of a new kitchen. Ask us about current stock and sizes.",
    ],
    hero: "integrated/integrated-liverpool-01",
  },
];

export const faqs = [
  {
    q: "What does “graded” mean?",
    a: "Graded appliances are usually new or ex-display units with minor cosmetic marks such as small dents or scratches, often from transit or showroom display. They work like new but cost less.",
  },
  {
    q: "Where is your shop?",
    a: `You can find us at ${fullAddress()}, on Strand Road in Bootle.`,
  },
  {
    q: "Do you sell new appliances as well as graded?",
    a: "Yes. We sell both brand new and graded appliances, including washing machines, tumble dryers, fridge freezers, cookers and integrated appliances.",
  },
  {
    q: "How can I check what is in stock?",
    a: `Stock changes all the time, so the quickest way is to call us on ${site.phones[0].display} or ${site.phones[1].display}, or visit the store during opening hours.`,
  },
  {
    q: "How can I pay?",
    a: "We accept Visa and Mastercard debit and credit cards.",
  },
];
