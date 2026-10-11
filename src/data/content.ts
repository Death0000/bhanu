export const studio = {
  name: "DZNSTUDEO",
  location: "Sheffield, UK",
  tagline: "Every design has a story.",
  linkedin: "https://linkedin.com/in/bhanu-partap-041b55277",
}

export type Project = {
  slug: string
  title: string
  category: string
  year: string
  image: string
  imageTwo: string
  tone: string
  summary: string
}

export const projects: Project[] = [
  {
    slug: "respira",
    title: "Respira",
    category: "Packaging",
    year: "Pentawards shortlist",
    image: "/images/objects.jpg",
    imageTwo: "/images/structure.jpg",
    tone: "light",
    summary:
      "A pebble-shaped case for herbs and medicine, designed around a breathing ritual rather than a simple lid.",
  },
  {
    slug: "audible-budget",
    title: "The Audible Budget",
    category: "Speculative civic design",
    year: "2026",
    image: "/images/portal.jpg",
    imageTwo: "/images/night.jpg",
    tone: "red",
    summary:
      "A red briefcase with a gold speaker that turns government budget allocations into a soundscape people can hear.",
  },
  {
    slug: "dznstudeo",
    title: "DZNSTUDEO",
    category: "Creative studio",
    year: "Ongoing",
    image: "/images/axiom.jpg",
    imageTwo: "/images/concrete.jpg",
    tone: "dark",
    summary:
      "Bhanu Partap’s creative and design studio, built around one belief: every design has a story.",
  },
]

export const services = [
  {
    number: "01",
    name: "Branding",
    detail: "Identity, visual language, graphic design",
  },
  {
    number: "02",
    name: "Graphic design",
    detail: "Editorial, communication, digital",
  },
  {
    number: "03",
    name: "Video & motion",
    detail: "Scripting, editing, motion design",
  },
  {
    number: "04",
    name: "Packaging & product",
    detail: "Concept, form, sensory experience",
  },
  {
    number: "05",
    name: "Photography",
    detail: "Portraits, image-making, Lightroom",
  },
]
