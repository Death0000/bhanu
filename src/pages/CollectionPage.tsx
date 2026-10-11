import { useState } from "react"
import {
  ContactCTA,
  PageHero,
  PageShell,
  ProjectCard,
} from "../components/SiteComponents"
import { projects } from "../data/content"

const filters = [
  "All",
  "Packaging",
  "Speculative civic design",
  "Creative studio",
]

export default function CollectionPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter)

  return (
    <PageShell>
      <PageHero
        eyebrow="Selected projects"
        title={
          <>
            Every project
            <br />
            starts with a <em>story.</em>
          </>
        }
        intro="Packaging you can feel, public information you can hear, and a studio identity built to hold a growing body of work."
      />
      <section className="work-section">
        <div className="filters" role="group" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              className={activeFilter === filter ? "active" : ""}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              key={filter}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="work-grid">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={projects.indexOf(project)}
              className={`grid-${index + 1}`}
            />
          ))}
        </div>
      </section>
      <ContactCTA />
    </PageShell>
  )
}
