import { useState, type ReactNode } from "react"
import { Link, NavLink } from "react-router-dom"
import { projects, studio, type Project } from "../data/content"

export function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function Wordmark() {
  return (
    <Link className="wordmark" to="/" aria-label="DZNSTUDEO home">
      DZN<span>STUDEO</span>
    </Link>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigation = [
    ["/work", "Collection"],
    ["/about", "About"],
    ["/services", "Services"],
    ["/contact", "Contact"],
  ]

  return (
    <header className="site-header">
      <Wordmark />
      <button
        className="menu-toggle"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-expanded={isMenuOpen}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? "Close" : "Menu"}
      </button>
      <nav
        className={isMenuOpen ? "nav open" : "nav"}
        aria-label="Primary navigation"
      >
        {navigation.map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <Wordmark />
        <p>{studio.tagline}</p>
      </div>
      <div className="footer-links">
        <span>Bhanu Partap</span>
        <span>{studio.location}</span>
      </div>
      <div className="footer-links">
        <a href={studio.linkedin} target="_blank" rel="noreferrer">
          LinkedIn <Arrow />
        </a>
      </div>
      <div className="footer-end">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Back to top ↑
        </button>
        <span>© {new Date().getFullYear()} DZNSTUDEO</span>
      </div>
    </footer>
  )
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export function RevealImage({
  src,
  alt,
  eager = false,
}: {
  src: string
  alt: string
  eager?: boolean
}) {
  return (
    <div className="image-reveal">
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} />
    </div>
  )
}

export function ProjectMeta({
  project,
  index,
}: {
  project: Project
  index?: number
}) {
  return (
    <div className="project-meta">
      <span>
        {index !== undefined
          ? String(index + 1).padStart(2, "0")
          : project.category}
      </span>
      <span>{index !== undefined ? project.category : project.year}</span>
      {index !== undefined && <span>{project.year}</span>}
    </div>
  )
}

export function ProjectCard({
  project,
  index,
  className = "",
}: {
  project: Project
  index: number
  className?: string
}) {
  return (
    <Link className={`project-card ${className}`} to={`/work/${project.slug}`}>
      <RevealImage
        src={project.image}
        alt={`Editorial placeholder for ${project.title}`}
      />
      <ProjectMeta project={project} index={index} />
      <h3>{project.title}</h3>
    </Link>
  )
}

export function ContactCTA() {
  return (
    <section className="contact-cta">
      <p className="eyebrow reveal">Have a good idea?</p>
      <Link to="/contact" className="cta-title reveal">
        Let’s make
        <br />
        <em>something.</em> <Arrow />
      </Link>
    </section>
  )
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: ReactNode
  intro: string
}) {
  return (
    <section className="page-hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-intro">{intro}</p>
    </section>
  )
}

export function getNextProject(project: Project) {
  const currentIndex = projects.indexOf(project)
  return projects[(currentIndex + 1) % projects.length]
}
