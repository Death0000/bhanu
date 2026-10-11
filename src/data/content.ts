export const studio = {
  name: "DZNSTUDEO",
  location: "Sheffield, UK",
  tagline: "Every design has a story.",
  linkedin: "https://linkedin.com/in/bhanu-partap-041b55277",
}

export type ProjectSection = {
  eyebrow: string
  title: string
  body: string
}

export type ProjectFact = {
  label: string
  value: string
}

export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  slug: string
  title: string
  subtitle: string
  category: string
  year: string
  recognition: string
  image: string
  imageAlt: string
  imageTwo: string
  imageTwoAlt: string
  panelEyebrow: string
  panelHeading: string
  panelBody: string
  tone: string
  summary: string
  facts: ProjectFact[]
  sections: ProjectSection[]
  links: ProjectLink[]
}

export const projects: Project[] = [
  {
    slug: "respira",
    title: "Respira",
    subtitle: "Beyond Package — Design Lab Synthesis and Manifesto",
    category: "Packaging",
    year: "Shortlist · 2026",
    recognition: "Pentawards Shortlist 2026",
    image: "/images/respira-poster.jpeg",
    imageAlt: "Respira packaging concept and product experience poster",
    imageTwo: "/images/respira-poster.jpeg",
    imageTwoAlt:
      "Respira concept image showing a person holding the pebble-shaped case",
    panelEyebrow: "Beyond Package · Design Lab Manifesto",
    panelHeading: "A quieter moment in a busy day.",
    panelBody:
      "Respira explores how a tactile package can make the moment of use part of the product experience.",
    tone: "light",
    summary:
      "A design-lab exploration of packaging beyond its role as a container, bringing product, form and experience into one considered story.",
    facts: [
      { label: "Project", value: "Respira" },
      { label: "Manifesto", value: "Beyond Package" },
      { label: "Discipline", value: "Graphic Design" },
      { label: "Designer", value: "Bhanu Partap" },
      { label: "Student ID", value: "34045166" },
      { label: "Recognition", value: "Pentawards Shortlist · 2026" },
    ],
    sections: [
      {
        eyebrow: "Design lab synthesis",
        title: "Beyond the package as a container.",
        body: "Beyond Package is a design-lab synthesis and manifesto by Bhanu Partap. It looks at packaging as part of the wider product experience: a place where identity, material, form and the moment of use can work together rather than ending at the box.",
      },
      {
        eyebrow: "The Respira concept",
        title: "A small pause, designed into the experience.",
        body: "Respira explores a tactile, pebble-shaped case for herbs and medicine. Its form and gentle, wave-like details invite a more deliberate interaction, turning the act of opening a package into a moment of calm.",
      },
      {
        eyebrow: "Recognition",
        title: "Shortlisted by Pentawards in 2026.",
        body: "Respira was shortlisted for the 2026 Pentawards. The recognition places the student concept among work being considered by an international packaging-design programme.",
      },
    ],
    links: [
      {
        label: "View the 2026 Pentawards shortlist",
        href: "https://pentawards.com/live/en/page/pentawards-shortlist-2026",
      },
    ],
  },
  {
    slug: "audible-budget",
    title: "The Audible Budget",
    subtitle: "Making Public Money Visible, Tangible and Audible",
    category: "Speculative civic design",
    year: "Winner · 2026",
    recognition: "Future of Money Design Awards 2026",
    image: "/images/audible-budget-final.jpg",
    imageAlt:
      "The Audible Budget poster showing a red briefcase as a civic sound interface",
    imageTwo: "/images/audible-budget-poster.jpeg",
    imageTwoAlt:
      "Alternate Audible Budget concept poster presenting public finance as an audible civic experience",
    panelEyebrow: "Future of Money Design Awards · Winner 2026",
    panelHeading: "Make public money audible.",
    panelBody:
      "A speculative civic installation imagines translating public budgets into sound and visual data.",
    tone: "red",
    summary:
      "A speculative design project asking: what if the public could hear where government money goes?",
    facts: [
      { label: "Project", value: "The Audible Budget" },
      { label: "Recognition", value: "Winner · 2026" },
      { label: "Presented at", value: "Pay360 · ExCeL London" },
      {
        label: "Disciplines",
        value:
          "Speculative design · Sound · Data visualisation · Civic engagement",
      },
      { label: "Sound exploration", value: "Max 9 · Max/MSP" },
      { label: "Designer", value: "Bhanu Partap" },
    ],
    sections: [
      {
        eyebrow: "The question",
        title: "What if we could hear where public money goes?",
        body: "Budgets are usually communicated through figures, charts and reports, even though the decisions behind them shape healthcare, education, infrastructure and other public services. The Audible Budget explores sound as another way to encounter this information—not as a replacement for the data, but as an invitation to engage with it.",
      },
      {
        eyebrow: "From data to sound",
        title: "A budget imagined as an evolving soundscape.",
        body: "Using Max 9 in the Max/MSP environment, I explored how spending categories such as healthcare, education, infrastructure, defence and welfare might be given distinct sonic identities. The concept combines a steadier governmental sound layer with a public interaction layer, bringing institutional structures and public participation into tension.",
      },
      {
        eyebrow: "A civic experience",
        title: "Designed to be encountered together.",
        body: "The concept is imagined as a participatory civic installation. Visitors could explore a soundscape while an accompanying screen visualises the figures behind it, connecting what they hear to its source and opening space for shared interpretation.",
      },
      {
        eyebrow: "Access and responsibility",
        title: "Sound can invite engagement, but it must not obscure the data.",
        body: "Audio could offer another point of entry into dense financial information, including for blind and partially sighted audiences. That possibility still requires clear sonic distinctions, meaningful explanations, user testing and complementary access to the underlying figures. The concept does not claim that a larger allocation is automatically better or that music alone can judge public spending.",
      },
      {
        eyebrow: "Recognition and next steps",
        title: "An award-winning concept, with questions still to test.",
        body: "The Audible Budget won the Future of Money Design Awards 2026 and was presented at Pay360 at ExCeL London. Future development would investigate suitable datasets, transparent rules for translating figures into sound, and whether listeners can interpret those sounds accurately without being misled.",
      },
    ],
    links: [
      {
        label: "Future of Money Design Awards",
        href: "https://www.futuremoneyaward.com/",
      },
      {
        label: "Event participation and awards archive",
        href: "https://share.google/QI6jqgkvkVyUzmnOs",
      },
    ],
  },
  {
    slug: "dznstudeo",
    title: "DZNSTUDEO",
    subtitle: "A creative practice built around stories",
    category: "Creative studio",
    year: "Ongoing",
    recognition: "Independent creative practice",
    image: "/images/bhanu-reading-studio.jpeg",
    imageAlt:
      "Bhanu Partap sitting in a studio library and reading a design book",
    imageTwo: "",
    imageTwoAlt: "",
    panelEyebrow: "DZNSTUDEO · Sheffield, UK",
    panelHeading: "Design starts with a story.",
    panelBody:
      "An independent practice across branding, graphic design, moving image, packaging and speculative design.",
    tone: "dark",
    summary:
      "Bhanu Partap’s creative practice across branding, graphic design, moving image, packaging and speculative design.",
    facts: [
      { label: "Project", value: "DZNSTUDEO" },
      { label: "Practice", value: "Ongoing" },
      { label: "Location", value: "Sheffield, UK" },
      { label: "Designer", value: "Bhanu Partap" },
    ],
    sections: [
      {
        eyebrow: "The practice",
        title: "Design that starts with a story.",
        body: "DZNSTUDEO is Bhanu Partap’s independent creative practice. It brings together branding, graphic design, moving image, packaging and speculative design, choosing the form that best serves each story.",
      },
    ],
    links: [],
  },
]

export const awards = [
  {
    number: "01",
    title: "Future of Money Design Awards",
    detail: "The Audible Budget · Winner · 2026 · Pay360, ExCeL London",
    href: "https://www.futuremoneyaward.com/",
  },
  {
    number: "02",
    title: "Pentawards",
    detail: "Respira · Shortlist · 2026",
    href: "https://pentawards.com/live/en/page/pentawards-shortlist-2026",
  },
]

export const services = [
  {
    number: "01",
    name: "Branding",
    detail: "Identity, visual language, graphic design",
    image: "/images/stock-branding.jpg",
    imageAlt: "Brand and web design shown on a laptop in a studio",
  },
  {
    number: "02",
    name: "Graphic design",
    detail: "Editorial, communication, digital",
    image: "/images/stock-graphic-design.jpg",
    imageAlt: "Graphic designer working with a tablet and stylus",
  },
  {
    number: "03",
    name: "Video & motion",
    detail: "Scripting, editing, motion design",
    image: "/images/stock-video-motion.jpg",
    imageAlt: "Video editing timeline open on a workstation monitor",
  },
  {
    number: "04",
    name: "Packaging & product",
    detail: "Concept, form, sensory experience",
    image: "/images/stock-packaging.jpg",
    imageAlt: "Amber product bottle photographed as a packaging study",
  },
  {
    number: "05",
    name: "Photography",
    detail: "Portraits, image-making, Lightroom",
    image: "/images/stock-photography.jpg",
    imageAlt: "Camera and lenses arranged for a photography shoot",
  },
]
