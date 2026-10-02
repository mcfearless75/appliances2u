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
  // Postcode centroid for L20 3HJ (postcodes.io)
  geo: { lat: 53.452792, lng: -2.989356 },
  // Nearby areas for local relevance. Describes reach, not a delivery promise.
  areas: ["Bootle", "Litherland", "Seaforth", "Orrell", "Netherton", "Kirkdale", "Walton", "Waterloo", "Crosby", "Aintree", "Everton", "Anfield", "Liverpool city centre"],
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
    title: "Washing Machines Liverpool | New & Graded | A2U Bootle",
    description:
      "New and graded washing machines at low prices from Appliances 2 U on Strand Road, Bootle. Top brands including Samsung, Beko, Hotpoint and Bosch. Call 07769 865432.",
    h1: "Washing Machines in Liverpool",
    item: "washing machine",
    intro: [
      "Looking for a reliable washing machine without paying full retail price? Our Bootle showroom stocks freestanding and integrated washing machines from leading brands, in new, ex-display and graded condition.",
      "Graded machines are typically brand new units with minor cosmetic marks from transit or display, so you get the same performance for considerably less. Stock changes every week, so call ahead to check what is in today.",
    ],
    icon: "washer",
    guide: [
      ["Drum size", "7kg suits one or two people, 8–9kg a family, and 10kg+ larger households or bulky bedding."],
      ["Spin speed", "1400rpm leaves clothes drier than 1200rpm, so they dry faster on the line or in a dryer."],
      ["Fit", "Most freestanding machines are 60cm wide and about 85cm tall. Measure your gap before you visit."],
    ],
    faqs: [
      { q: "Where can I buy a cheap washing machine in Liverpool?", a: "Appliances 2 U at 203 Strand Road, Bootle (L20 3HJ) sells new and graded washing machines from brands like Samsung, Beko, Hotpoint and Bosch, usually well below high-street prices. Call 07769 865432 to check today's stock." },
      { q: "Are graded washing machines reliable?", a: "Graded washing machines are typically new or ex-display machines with cosmetic marks only. The drum, motor and electronics are the same as a perfect-condition unit." },
    ],
    hero: "washing-machines/washing-machines-liverpool-01",
  },
  {
    slug: "cookers",
    gallery: "cookers",
    nav: "Cookers",
    title: "Cookers & Gas Hobs Liverpool | New & Graded | A2U Bootle",
    description:
      "Electric and gas cookers, ovens and hobs at affordable prices from Appliances 2 U in Bootle, Liverpool. Beko, Hotpoint and more, new and graded. Call 07769 865432.",
    h1: "Cookers & Gas Hobs in Liverpool",
    item: "cooker",
    intro: [
      "From compact 50cm electric cookers to 60cm gas and dual-fuel models, we carry a changing range of cookers, ovens and hobs to suit every kitchen and budget.",
      "Every appliance is checked before it goes on the shop floor. Pop in to see the current range at 203 Strand Road, or give us a call and we will tell you what is available.",
    ],
    icon: "cooker",
    guide: [
      ["Width", "Freestanding cookers come in 50cm, 55cm and 60cm widths. Measure the gap between your units."],
      ["Fuel type", "Choose electric, gas or dual fuel (gas hob with electric oven) to match the supply in your kitchen."],
      ["Installation", "In the UK, gas cookers must be fitted by a Gas Safe registered engineer."],
    ],
    faqs: [
      { q: "Where can I buy a cooker in Bootle?", a: "Appliances 2 U on Strand Road, Bootle stocks electric, gas and dual-fuel cookers, ovens and hobs, new and graded. Call 07769 865432 for current stock." },
      { q: "Can I fit a gas cooker myself?", a: "No. UK law requires gas cookers and hobs to be installed by a Gas Safe registered engineer." },
    ],
    hero: "cookers/cookers-liverpool-06",
    oldPaths: ["copy-of-washing-machines"],
  },
  {
    slug: "fridge-freezers",
    gallery: "fridge-freezers",
    nav: "Fridge Freezers",
    title: "Fridge Freezers Liverpool | New & Graded | A2U Bootle",
    description:
      "Fridge freezers, fridges and freezers at great prices in Bootle, Liverpool. American-style, 50/50, 70/30 and under-counter models, new and graded. Call 07769 865432.",
    h1: "Fridge Freezers in Liverpool",
    item: "fridge freezer",
    intro: [
      "Keep food fresh for less. We stock tall fridge freezers, American-style side-by-side models, under-counter fridges and freezers from well-known brands.",
      "Many of our cold appliances are graded stock: new units with small cosmetic blemishes, priced well below the high street. New stock arrives regularly.",
    ],
    icon: "fridge",
    guide: [
      ["Split", "50/50 gives equal fridge and freezer space; 70/30 gives more fridge space for fresh food."],
      ["Frost free", "Frost-free models stop ice building up, so you never need to defrost the freezer."],
      ["Getting it home", "Leave a fridge freezer standing upright for a few hours before switching on, and longer if it travelled on its side."],
    ],
    faqs: [
      { q: "Where can I get a cheap fridge freezer in Liverpool?", a: "Appliances 2 U in Bootle sells new and graded fridge freezers, including American-style, 50/50 and 70/30 models, at prices well below the high street. Visit 203 Strand Road, L20 3HJ or call 07769 865432." },
      { q: "Do you sell American-style fridge freezers?", a: "Yes, when in stock. American-style side-by-side fridge freezers come in regularly; call to check what is available today." },
    ],
    hero: "fridge-freezers/fridge-freezers-liverpool-01",
    oldPaths: ["fridge-freeze"],
  },
  {
    slug: "tumble-dryers",
    gallery: "tumble-dryers",
    nav: "Tumble Dryers",
    title: "Tumble Dryers Liverpool | New & Graded | A2U Bootle",
    description:
      "Condenser, heat pump and vented tumble dryers at low prices from Appliances 2 U in Bootle, Liverpool. New and graded stock from top brands. Call 07769 865432.",
    h1: "Tumble Dryers in Liverpool",
    item: "tumble dryer",
    intro: [
      "Condenser, heat pump and vented tumble dryers from trusted brands, available new and graded at our Bootle store.",
      "Not sure which type suits your home? Our team can talk you through the options, from energy-saving heat pump models to budget-friendly vented dryers.",
    ],
    icon: "dryer",
    guide: [
      ["Heat pump", "The most energy-efficient type. Higher upfront cost but much cheaper to run."],
      ["Condenser", "Collects water in a tank or drains it, so no vent hose is needed. Fits almost anywhere."],
      ["Vented", "The cheapest option to buy, but needs a hose through a window or wall vent."],
    ],
    faqs: [
      { q: "Which type of tumble dryer is cheapest to run?", a: "Heat pump tumble dryers use the least electricity, followed by condenser and then vented dryers." },
      { q: "Where can I buy a tumble dryer in Bootle?", a: "Appliances 2 U at 203 Strand Road, Bootle sells new and graded heat pump, condenser and vented tumble dryers. Call 07769 865432 for today's stock." },
    ],
    hero: "tumble-dryers/tumble-dryers-liverpool-01",
  },
  {
    slug: "integrated",
    gallery: "integrated",
    nav: "Integrated",
    title: "Integrated Appliances Liverpool | Built-in | A2U Bootle",
    description:
      "Integrated and built-in appliances in Bootle, Liverpool: ovens, hobs, dishwashers, washing machines and fridge freezers. New and graded at low prices. Call 07769 865432.",
    h1: "Integrated Appliances in Liverpool",
    item: "integrated appliance",
    intro: [
      "Fitting or updating a kitchen? We stock built-in ovens, hobs, extractor hoods, integrated dishwashers, washing machines and fridge freezers that sit neatly behind your kitchen doors.",
      "Graded integrated appliances are an easy way to cut the cost of a new kitchen. Ask us about current stock and sizes.",
    ],
    icon: "integrated",
    guide: [
      ["Measure the housing", "Check the height, width and depth of the cabinet space, not just the old appliance."],
      ["Hinge type", "Integrated fridges use sliding or door-on-door hinges. Match the type your kitchen is built for."],
      ["Built-in ovens", "Single ovens fit tall housings or under the worktop; double ovens normally need a tall housing."],
    ],
    faqs: [
      { q: "Do you sell integrated appliances in Liverpool?", a: "Yes. Appliances 2 U in Bootle stocks built-in ovens, hobs, hoods, integrated dishwashers, washing machines and fridge freezers, new and graded." },
      { q: "Will an integrated appliance fit my kitchen?", a: "Most integrated appliances are made for standard 60cm units. Bring your housing measurements and we will help you find one that fits." },
    ],
    hero: "integrated/integrated-liverpool-01",
  },
];

// Long-form guide page targeting "graded appliances" searches.
export const gradedGuide = {
  slug: "graded-appliances",
  nav: "What is graded?",
  title: "What Are Graded Appliances? Buyer's Guide | A2U",
  description:
    "Graded appliances explained: what graded and ex-display mean, why they cost less than the high street, and what to check before you buy. From Appliances 2 U, Bootle.",
  h1: "Graded Appliances Explained",
  sections: [
    ["What is a graded appliance?", "A graded appliance is usually a new or ex-display product that cannot be sold as perfect because of a cosmetic issue, such as a dent, a scratch or damaged packaging. Retailers grade these items by the size and position of the mark, then sell them at a discount."],
    ["Why are they cheaper?", "Big retailers cannot sell a machine with a scuffed side panel at full price, so it is sold on. The part you pay for (the motor, drum, compressor or oven) is normally untouched, which is why graded stock can cost far less than the high-street price."],
    ["Graded vs refurbished vs second-hand", "Graded appliances are generally new or display units with cosmetic marks. Refurbished appliances have been used and repaired. Second-hand appliances have been used and sold as seen. Always ask which one you are buying."],
    ["What to check before you buy", "Look at where the mark is: if it will sit against a wall or between units, you will never see it. Check the model number, size and energy rating, and ask what checks have been done. We are happy to show you any appliance in store."],
  ],
};

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
