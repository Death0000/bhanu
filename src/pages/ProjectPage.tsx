import { Link, useParams } from "react-router-dom"
import {
  PageShell,
  ProjectMeta,
  RevealImage,
} from "../components/SiteComponents"
import { getNextProject } from "../components/SiteComponents"
import { projects } from "../data/content"
import NotFoundPage from "./NotFoundPage"

export default function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) return <NotFoundPage />

  const nextProject = getNextProject(project)

  return (
    <PageShell>
      <section className="case-hero">
        <ProjectMeta project={project} />
        <h1>{project.title}</h1>
        <p className="case-subtitle">{project.subtitle}</p>
        <RevealImage src={project.image} alt={project.imageAlt} eager />
      </section>
      <section className="case-intro">
        <p className="eyebrow">Overview</p>
        <h2>{project.summary}</h2>
        <dl>
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section
        className={`case-image-pair${
          project.imageTwo ? "" : " case-image-pair--panel-only"
        }`}
      >
        {project.imageTwo && (
          <RevealImage src={project.imageTwo} alt={project.imageTwoAlt} />
        )}
        <div className={`case-panel ${project.tone}`}>
          <span>{project.panelEyebrow}</span>
          <div className="case-panel-copy">
            <strong>{project.panelHeading}</strong>
            <p>{project.panelBody}</p>
          </div>
        </div>
      </section>
      {project.sections.map((section) => (
        <section className="case-story" key={section.eyebrow}>
          <p className="eyebrow">{section.eyebrow}</p>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </section>
      ))}
      {project.links.length > 0 && (
        <section className="case-links" aria-label="Project links">
          {project.links.map((link) => (
            <a
              className="text-link"
              href={link.href}
              target="_blank"
              rel="noreferrer"
              key={link.href}
            >
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </section>
      )}
      <Link className="next-project" to={`/work/${nextProject.slug}`}>
        <span>Next project · {nextProject.category}</span>
        <strong>{nextProject.title} ↗</strong>
      </Link>
    </PageShell>
  )
}
