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

  const currentIndex = projects.indexOf(project)
  const nextProject = getNextProject(project)
  const storyTitle =
    project.slug === "respira"
      ? "A breathing ritual, held in the palm of your hand."
      : project.slug === "audible-budget"
        ? "Making public money possible to hear."
        : "A studio identity built around stories, not software."
  const storyCopy =
    project.slug === "respira"
      ? "Thumb-traced wave ridges guide a slow breath. A magnetic click and herbal scent add sensory cues, while compostable moulded paper pulp gives the case a considered material life."
      : project.slug === "audible-budget"
        ? "Created as an Android design course final submission, the speculative civic object won first place in the FMO competition and was exhibited publicly."
        : "DZNSTUDEO is Bhanu Partap’s creative and design studio. This page remains intentionally concise until its services, clients, and complete story are confirmed."

  return (
    <PageShell>
      <section className="case-hero">
        <ProjectMeta project={project} />
        <h1>{project.title}</h1>
        <RevealImage
          src={project.image}
          alt={`${project.title} hero artwork`}
          eager
        />
      </section>
      <section className="case-intro">
        <p className="eyebrow">Overview</p>
        <h2>{project.summary}</h2>
        <dl>
          <div>
            <dt>Project</dt>
            <dd>{project.title}</dd>
          </div>
          <div>
            <dt>Recognition</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Discipline</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt>Designer</dt>
            <dd>Bhanu Partap</dd>
          </div>
        </dl>
      </section>
      <section className="case-image-pair">
        <RevealImage
          src={project.imageTwo}
          alt={`Editorial placeholder for ${project.title}`}
        />
        <div className={`case-panel ${project.tone}`}>
          <span>
            DZNSTUDEO — STORY {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <strong>
            {project.title.split(" ")[0]}
            <br />
            in form.
          </strong>
        </div>
      </section>
      <section className="case-story">
        <p className="eyebrow">The story</p>
        <h2>{storyTitle}</h2>
        <p>{storyCopy}</p>
      </section>
      <Link className="next-project" to={`/work/${nextProject.slug}`}>
        <span>Next project · {nextProject.category}</span>
        <strong>{nextProject.title} ↗</strong>
      </Link>
    </PageShell>
  )
}
