import { useState } from "react"
import {
  ContactCTA,
  PageShell,
  ProjectCard,
} from "../components/SiteComponents"
import { projects } from "../data/content"
import ResearchHero from "../components/ResearchHero"

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
      <ResearchHero />
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
