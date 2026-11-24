/* ============================================================
   PORTFOLIO CONTENT
   Edit this file to add, remove or reorder work.
   Optimised images live in /assets (originals stay in their folders).
   ============================================================ */

/* Brand names, used for captions across the site. */
const BRANDS = {
  muzzle:    'Muzzle Sleep',
  euzo:      'Euzo Health',
  myp:       'MeetYourPsychic',
  howdy:     'Howdy Snax',
  contours:  'Contours Rx',
  detox:     'Detox Organics',
  vorafi:    'VORAFI',
  pytheas:   'Pytheas Energy',
  cobb:      'COBB',
  sol:       'SOL Nutrition',
  rhn:       'RHN Wagyu',
  beautybox: 'The Beauty Box',
  seamoss:   'Sea Moss Lyfe',
  pearls:    'Black Pearls',
  roxanne:   'Roxanne Rizzo',
  mdj:       'MDJ Catering',
  dash:      'Dash',
};

/* "Brands I've worked with" grid — logos from /BrandsLogo, chromed into /assets/logos. */
const CLIENTS = [
  { brand: 'muzzle',    logo: 'muzzle-sleep' },
  { brand: 'euzo',      logo: 'euzo-health' },
  { brand: 'myp',       logo: 'meetyourpsychic' },
  { brand: 'howdy',     logo: 'howdy-snax' },
  { brand: 'contours',  logo: 'contours-rx' },
  { brand: 'detox',     logo: 'detox-organics' },
  { brand: 'vorafi',    logo: 'vorafi' },
  { brand: 'pytheas',   logo: 'pytheas-energy-inc' },
  { brand: 'cobb',      logo: 'cobb-grill' },
  { brand: 'sol',       logo: 'sol-nutrition' },
  { brand: 'rhn',       logo: 'rhn-wagyu' },
  { brand: 'beautybox', logo: 'the-beauty-box' },
  { brand: 'seamoss',   logo: 'sea-moss-lyfe' },
];

/* Static ads, shown together in this order.
   feature: true = shown large. Keep exactly 1 featured so the grid closes neatly (45 ads + 3). */
const ADS = [
  { src: 'euzo-social-media-black-friday-7',             brand: 'euzo',     title: 'Black Friday — Every drop', feature: true },
  { src: 'bundle-images-7',                              brand: 'muzzle',   title: 'Travel sleep bundle' },
  { src: 'love-or-mercury-retrograde',                   brand: 'myp',      title: 'Is it love, or just Mercury retrograde?' },
  { src: 'creativead-6',                                 brand: 'howdy',    title: 'Sticky, sweet, dangerously addictive' },
  { src: 'vorafi-bfcm-ad-16',                            brand: 'vorafi',   title: 'BFCM — Plans got fresher' },
  { src: 'nov-6-c5-dropper',                             brand: 'euzo',     title: "Capsules not your thing? There's a dropper" },
  { src: 'creativead-16',                                brand: 'pytheas',  title: 'Curious how optimized energy works?' },
  { src: 'detox-organics-scale-up-campaign-5-variant-2', brand: 'detox',    title: 'Who said superfoods have to be green?' },
  { src: 'muzzle-blanket-ad-creatives-5',                brand: 'muzzle',   title: 'One gift. Every night.' },
  { src: 'creativead-20',                                brand: 'myp',      title: "You won't have to guess anymore" },
  { src: 'contours-rx-static-ads-72',                    brand: 'contours', title: 'See the difference — 40% off' },
  { src: 'creativead-7',                                 brand: 'howdy',    title: 'Like carrying a steak in your pocket' },
  { src: 'euzo-social-media-new-chapter',                brand: 'euzo',     title: 'Your next chapter' },
  { src: 'social-media-post-sept-27',                    brand: 'muzzle',   title: 'Noise you ignore is still disrupting your sleep' },
  { src: 'vorafi-pain-point-ad-01',                      brand: 'vorafi',   title: 'Sick of stubborn body odor?' },
  { src: 'ad-4-versatility',                             brand: 'cobb',     title: 'Grill it. Roast it. Bake it.' },
  { src: 'bundle-images-3',                              brand: 'muzzle',   title: 'Deep sleep bundle' },
  { src: 'euzo-social-media-black-friday-1',             brand: 'euzo',     title: 'Black Friday — 25% off sitewide' },
  { src: 'myp-bf40-06-layout-a',                         brand: 'myp',      title: 'BF40 — Will they come back?' },
  { src: 'creativead-12',                                brand: 'detox',    title: 'Scoop. Shake. Sip.' },
  { src: 'kids-landing-page-ad-creatives-7',             brand: 'muzzle',   title: 'Nose breathing vs. mouth breathing' },
  { src: 'creativead-17',                                brand: 'pytheas',  title: "There's a phase operators go through" },
  { src: 'nov-2c3-new-name',                             brand: 'euzo',     title: 'New name. Same team.' },
  { src: 'creativead-11',                                brand: 'sol',      title: 'Help her shine from within' },
  { src: 'creative-2-nov-1-gravity-cozy-reset',          brand: 'muzzle',   title: 'The clocks changed — cozy reset' },
  { src: 'creativead-5',                                 brand: 'howdy',    title: 'Protein the cowboy way' },
  { src: 'euzo-social-media-black-friday-20',            brand: 'euzo',     title: 'Give the gift of feeling good' },
  { src: 'creativead-1',                                 brand: 'contours', title: '4th of July special' },
  { src: 'myp-clean-bf40-06',                            brand: 'myp',      title: 'Ghosted. Again?' },
  { src: '7-signs-ads-4',                                brand: 'muzzle',   title: 'The morning sign that says the night before' },
  { src: 'nad-capsules-ingredient-callout-ad',           brand: 'euzo',     title: 'Three ingredients. One formula.' },
  { src: 'vorafi-pain-point-ad-09',                      brand: 'vorafi',   title: 'Got sensitive skin?' },
  { src: 'creativead-13',                                brand: 'detox',    title: 'Digestion. Energy. Daily greens.' },
  { src: 'creative-4-nasal-strips-slide-4',              brand: 'muzzle',   title: 'Get to know the little lift' },
  { src: 'euzo-social-media-cyber-monday-b',             brand: 'euzo',     title: 'For the days after Cyber Monday' },
  { src: 'creativead-18',                                brand: 'pytheas',  title: 'Trusted by 1000+ investors' },
  { src: 'creativead-19',                                brand: 'myp',      title: "They're not telling you everything" },
  { src: 'muzzle-blanket-ad-creatives-4',                brand: 'muzzle',   title: 'Why buy your winter sleep upgrade?' },
  { src: 'creativead-8',                                 brand: 'howdy',    title: 'Howdy, hunger' },
  { src: 'euzo-social-media-black-friday-12',            brand: 'euzo',     title: 'Black Friday — For the road ahead' },
  { src: '7-signs-ads-8',                                brand: 'muzzle',   title: 'The 5-second bedtime check' },
  { src: 'myp-bf40-14-layout-d',                         brand: 'myp',      title: 'Same home. Different worlds.' },
  { src: 'creativead-10',                                brand: 'muzzle',   title: 'The cutest way to keep your mouth closed' },
  { src: 'creativead-9',                                 brand: 'howdy',    title: 'Taste home again' },
  { src: 'euzo-social-media-thanksgiving',               brand: 'euzo',     title: 'Thanksgiving' },
];

/* Motion — converted from the GIFs in /GifAnimations to small looping MP4s.
   tall = 4 across, square = 3 across. */
const MOTION = [
  { src: 'email-2-header-gif', brand: 'cobb',     title: 'Black Friday email 1/3 — Teaser',   shape: 'tall' },
  { src: 'email-5-header-gif', brand: 'cobb',     title: 'Black Friday email 2/3 — Tomorrow', shape: 'tall' },
  { src: 'email-6-header-gif', brand: 'cobb',     title: 'Black Friday email 3/3 — Live',     shape: 'tall' },
  { src: 'gif5',               brand: 'contours', title: 'The summer event begins early',     shape: 'tall' },
  { src: 'gif-2',              brand: 'muzzle',   title: 'Slept 10 hours. Still cranky?',     shape: 'square' },
  { src: 'gif1',               brand: 'contours', title: '$3000 surgery or $30 strips?',      shape: 'square' },
  { src: 'gif4',               brand: 'howdy',    title: 'Koeksister — The first bite',       shape: 'square' },
  { src: 'gif-4',              brand: 'muzzle',   title: 'Tonight, check one thing',          shape: 'square' },
  { src: 'gif2',               brand: 'contours', title: 'One eye done',                      shape: 'square' },
  { src: 'gif3',               brand: null,       title: 'Jerky — Time for better protein',   shape: 'square' },
  { src: 'gif-1',              brand: 'muzzle',   title: 'Read these 7 signs',                shape: 'square' },
  { src: 'gif6',               brand: 'contours', title: 'Why pay thousands for a lift?',     shape: 'square' },
  { src: 'gif-3',              brand: 'muzzle',   title: '7 signs parents often miss',        shape: 'square' },
];

/* Banners — one desktop + one mobile per campaign. */
const BANNERS = [
  { brand: 'pearls',  title: 'Luxury scent that lasts',              kind: 'Collection banner',
    desktop: 'black-pearls-candle-collection-banner-desktop', mobile: 'black-pearls-candle-collection-banner-mobile' },
  { brand: 'roxanne', title: 'Your summer glow starts here',         kind: 'Campaign banner',
    desktop: 'roxanne-rizzo-glow-edit-banner-desktop', mobile: 'roxanne-rizzo-glow-edit-banner-mobile' },
  { brand: 'muzzle',  title: 'Find the Muzzle that fits your night', kind: 'Homepage banner',
    desktop: 'muzzle-replacement-banner-desktop', mobile: 'muzzle-replacement-banner-mobile' },
  { brand: null,      title: 'Find your perfect cut',                kind: 'Collection page banner',
    desktop: 'collection-page-banner-desktop', mobile: 'collection-page-banner-mobile' },
  { brand: 'detox',   title: 'Get back on track',                    kind: 'Homepage banner',
    desktop: 'website-banner-desktop', mobile: 'website-banner-mobile' },
  { brand: null,      title: 'Memorial Day beauty bash',             kind: 'Promotional banner',
    desktop: 'memorial-day-banner-1800x600-desktop', mobile: 'memorial-day-banner-1080x1680-mobile' },
];

/* Web / UI projects. */
const WEB = [
  { brand: 'rhn', title: 'RHN Wagyu', type: 'Shopify · About page', img: 'rhnwagyuweb',
    desc: 'A Shopify storytelling page that walks visitors through the company story and builds trust in the brand.',
    tools: ['Shopify', 'Figma', 'Branding'], url: 'https://rhnwagyu.myshopify.com/pages/about-us' },
  { brand: 'contours', title: 'Contours Rx', type: 'Landing page', img: 'contours-landingpage',
    desc: 'A landing page concept that leads with product positioning and moves visitors toward conversion.',
    tools: ['Figma', 'UI Design', 'Prototyping'], url: 'https://www.figma.com/proto/y130movbfBq2TSB2BdJzxN/ContoursRX---Chloe?node-id=54-5&t=ZAnmRtNNFhG4EeCM-0&scaling=min-zoom&content-scaling=fixed&page-id=54%3A2' },
  { brand: 'muzzle', title: 'Muzzle Gravity', type: 'Product detail page', img: 'muzzle-gravity-pdp',
    desc: 'A product detail page built around product education, visual storytelling and a smooth path to purchase.',
    tools: ['E-commerce', 'Figma', 'UX Writing'], url: 'https://muzzlesleep.com/products/muzzle-weighted-blanket' },
  { brand: 'muzzle', title: 'Muzzle Nasal Strips', type: 'Product detail page', img: 'nasal-strip-pdp',
    desc: 'A conversion-focused product page that puts key benefits and product details in a clear order.',
    tools: ['E-commerce', 'UI', 'Motion'], url: 'https://muzzlesleep.com/products/adult-nasal-strips' },
  { brand: 'mdj', title: 'MDJ Catering', type: 'Brand website', img: 'mdj-catering-web',
    desc: 'A brand website concept for event and catering clients that feels welcoming, premium and easy to navigate.',
    tools: ['Figma', 'Branding', 'Web UI'], url: 'https://www.figma.com/proto/jvd7le8VtMSxM5wu7Ndm2A/Untitled?node-id=1-3&t=rBogqQKW92IT1Fff-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=51%3A404' },
  { brand: 'dash', title: 'Dash', type: 'Dashboard UI', img: 'dash-web',
    desc: 'A dashboard interface built on clear structure and visual hierarchy.',
    tools: ['Figma', 'Dashboard', 'UI Systems'], url: 'https://www.figma.com/proto/RfMtYOQQrCbAudJuD2dSKH/Dash-web?node-id=30-261&p=f&t=pijdtuA1NSNBMtxA-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=5%3A3' },
];
