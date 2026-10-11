import { useLayoutEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { projects, services } from "../data/content"
import { Arrow, ProjectCard, ProjectMeta, RevealImage } from "./SiteComponents"

export function HeroCollage() {
  const cells = [
    ["/images/objects.jpg", "Minimal product still life"],
    ["/images/mono.jpg", "Monochrome fashion portrait"],
    ["/images/redline.jpg", "Red fashion editorial"],
    ["/images/axiom.jpg", "Studio portrait"],
    ["/images/form.jpg", "Fashion portrait on geometric steps"],
    ["/images/portal.jpg", "Abstract red architectural detail"],
    ["/images/motion.jpg", "Editorial figure in motion"],
    ["/images/structure.jpg", "Brutalist architectural structure"],
  ]

  return (
    <section className="hero">
      <div className="hero-kicker">
        <span>Bhanu Partap · DZNSTUDEO</span>
        <span>Sheffield, UK</span>
      </div>
      <div className="collage" aria-label="An editorial visual moodboard">
        {cells.map(([src, alt], index) => (
          <div className={`collage-cell cell-${index + 1}`} key={src}>
            <img src={src} alt={alt} loading={index < 4 ? "eager" : "lazy"} />
          </div>
        ))}
        <div className="hero-title">
          <p>Branding · Graphic · Motion · Packaging</p>
          <h1>
            <span>Every design</span>
            <span>has a story.</span>
          </h1>
          <div className="hero-mark">BP® 26</div>
        </div>
        <div className="collage-red">
          Bhanu
          <br />
          Partap
          <br />
          DZN.
        </div>
      </div>
      <div className="scroll-cue">
        Scroll to explore <span>↓</span>
      </div>
    </section>
  )
}

export function EditorialIntro() {
  return (
    <section className="editorial-intro">
      <p className="eyebrow reveal">Bhanu Partap · Designer</p>
      <h2 className="display reveal">
        From pixels
        <br />
        to <em>packaging.</em>
      </h2>
      <div className="intro-copy reveal">
        <p>
          Bhanu moves between branding, graphic design, video, motion, and
          product thinking—making work that can be seen, heard, and felt.
        </p>
        <Link className="text-link" to="/about">
          Meet Bhanu <Arrow />
        </Link>
      </div>
    </section>
  )
}

function HorizontalWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !trackRef.current ||
      window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)")
        .matches
    ) {
      return
    }

    const context = gsap.context(() => {
      const distance = () =>
        Math.max(0, trackRef.current!.scrollWidth - window.innerWidth)
      gsap.to(trackRef.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => context.revert()
  }, [])

  return (
    <section className="horizontal-work" ref={sectionRef}>
      <div className="section-top">
        <p className="eyebrow">Selected stories</p>
        <p>Scroll to browse →</p>
      </div>
      <div className="project-track" ref={trackRef}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            className={`card-${index + 1}`}
          />
        ))}
        <Link className="view-all" to="/work">
          <span>View all</span>
          <Arrow />
        </Link>
      </div>
    </section>
  )
}

function ServicesList() {
  const [activeIndex, setActiveIndex] = useState(0)
  const previewImages = [
    "/images/redline.jpg",
    "/images/concrete.jpg",
    "/images/motion.jpg",
    "/images/objects.jpg",
    "/images/mono.jpg",
  ]

  return (
    <section className="services-block">
      <div className="services-heading">
        <p className="eyebrow reveal">Capabilities</p>
        <h2 className="section-title reveal">What we do.</h2>
      </div>
      <div className="services-layout">
        <div className="service-preview">
          <img src={previewImages[activeIndex]} alt="" />
          <span>{services[activeIndex].number}</span>
        </div>
        <div className="service-list">
          {services.map((service, index) => (
            <Link
              to="/services"
              className="service-row"
              key={service.name}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
            >
              <span>{service.number}</span>
              <h3>{service.name}</h3>
              <p>{service.detail}</p>
              <Arrow />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomeSections() {
  const featuredProject = projects.find(
    (project) => project.slug === "audible-budget",
  )

  if (!featuredProject) {
    throw new Error("The featured Audible Budget project is missing.")
  }

  return (
    <>
      <HeroCollage />
      <EditorialIntro />
      <section className="recognition">
        <div className="recognition-heading">
          <p className="eyebrow reveal">Recognition</p>
          <h2 className="section-title reveal">
            Award on the wall.
            <br />
            Process on the page.
          </h2>
        </div>
        <div className="award-row">
          <span>01</span>
          <strong>Future of Money Design</strong>
          <p>Winner · 2026</p>
        </div>
        <div className="award-row">
          <span>02</span>
          <strong>Pentawards</strong>
          <p>Shortlisted · Student sustainability</p>
        </div>
      </section>
      <HorizontalWork />
      <section className="feature-project">
        <RevealImage
          src="/images/portal.jpg"
          alt="Editorial placeholder for The Audible Budget"
        />
        <div className="feature-copy">
          <ProjectMeta project={featuredProject} />
          <h2>
            Audible
            <br />
            Budget
          </h2>
          <Link className="text-link" to="/work/audible-budget">
            Explore project <Arrow />
          </Link>
        </div>
      </section>
      <ServicesList />
      <section className="philosophy">
        <p className="eyebrow reveal">Design you can feel</p>
        <h2 className="display reveal">
          Seen. Heard.
          <br />
          <em>Felt.</em>
        </h2>
        <div className="philosophy-copy reveal">
          <p>
            Respira turns opening a package into a breathing ritual. The Audible
            Budget turns public numbers into sound. The format changes; the
            story leads.
          </p>
          <span>
            India shaped.
            <br />
            UK sharpened.
          </span>
        </div>
      </section>
    </>
  )
}
