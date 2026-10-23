import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { projects, studio } from "../data/content"
import { Arrow } from "./SiteComponents"

const slideDuration = 6000

export default function ProjectShowcaseHero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const lastAnimatedIndex = useRef(activeIndex)
  const pointerStart = useRef<number | null>(null)
  const activeProject = projects[activeIndex]

  useLayoutEffect(() => {
    const hero = heroRef.current
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".project-showcase-nav > *", {
          y: -12,
          opacity: 0,
          duration: 0.55,
          stagger: 0.08,
        })
        .from(
          ".project-showcase-menu > *",
          { x: 30, opacity: 0, duration: 0.6, stagger: 0.08 },
          "-=0.25",
        )
        .from(
          ".project-showcase-image",
          { clipPath: "inset(0 0 100% 0)", duration: 0.95, ease: "power3.inOut" },
          "-=0.35",
        )
        .from(
          ".project-showcase-title-line",
          { yPercent: 110, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power4.out" },
          "-=0.45",
        )
        .from(
          ".project-showcase-meta, .project-showcase-bottom",
          { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 },
          "-=0.25",
        )
    }, hero)
    const moveParallax = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      const bounds = hero.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      gsap.to(imageRef.current, {
        x: x * 10,
        y: y * 8,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto",
      })
      gsap.to(titleRef.current, {
        x: x * -5,
        y: y * -4,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      })
    }
    const resetParallax = () => {
      gsap.to([imageRef.current, titleRef.current], {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto",
      })
    }

    hero.addEventListener("pointermove", moveParallax)
    hero.addEventListener("pointerleave", resetParallax)
    return () => {
      hero.removeEventListener("pointermove", moveParallax)
      hero.removeEventListener("pointerleave", resetParallax)
      context.revert()
    }
  }, [])

  useEffect(() => {
    if (
      activeIndex === lastAnimatedIndex.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }
    lastAnimatedIndex.current = activeIndex

    gsap.fromTo(
      imageRef.current,
      { opacity: 0.2, scale: 1.08 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
    )
    gsap.fromTo(
      titleRef.current?.querySelectorAll(".project-showcase-title-word") ?? [],
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power4.out" },
    )
  }, [activeIndex])

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }
    const timer = window.setTimeout(
      () => setActiveIndex((index) => (index + 1) % projects.length),
      slideDuration,
    )
    return () => window.clearTimeout(timer)
  }, [activeIndex, isPaused])

  function selectProject(index: number) {
    setActiveIndex((index + projects.length) % projects.length)
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLElement>) {
    if (pointerStart.current === null) return
    const distance = event.clientX - pointerStart.current
    if (Math.abs(distance) > 48) {
      selectProject(activeIndex + (distance < 0 ? 1 : -1))
    }
    pointerStart.current = null
  }

  return (
    <section
      className="project-showcase"
      ref={heroRef}
      aria-label="Selected design projects"
      onPointerDown={(event) => {
        pointerStart.current = event.clientX
      }}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        pointerStart.current = null
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="project-showcase-nav">
        <Link className="project-showcase-mark" to="/" aria-label={`${studio.name} home`}>
          BP
        </Link>
        <Link to="/work">Projects</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Practice</Link>
      </div>
      <div className="project-showcase-image-wrap">
        <img
          className="project-showcase-image"
          key={activeProject.slug}
          src={activeProject.image}
          alt={activeProject.imageAlt}
          ref={imageRef}
        />
        <span className="project-showcase-shade" aria-hidden="true" />
        <span className="project-showcase-grain" aria-hidden="true" />
      </div>

      <div className="project-showcase-copy">
        <p className="project-showcase-meta">
          <span>{activeProject.category}</span>
          <span>{activeProject.year}</span>
        </p>
        <h2
          className={`project-showcase-title project-showcase-title--${activeProject.slug}`}
          ref={titleRef}
        >
          {activeProject.title.split(" ").map((word, index) => (
            <span
              className="project-showcase-title-line"
              key={`${activeProject.slug}-${word}-${index}`}
            >
              <span className="project-showcase-title-word">{word}</span>
            </span>
          ))}
        </h2>
        <p className="project-showcase-description">{activeProject.summary}</p>
        <Link
          className="project-showcase-open"
          to={`/work/${activeProject.slug}`}
        >
          Explore project <Arrow />
        </Link>
      </div>

      <aside className="project-showcase-menu" aria-label="Selected projects">
        <span className="project-showcase-menu-label">Selected projects</span>
        {projects.map((project, index) => (
          <button
            className={index === activeIndex ? "active" : ""}
            aria-pressed={index === activeIndex}
            key={project.slug}
            onClick={() => setActiveIndex(index)}
          >
            {project.title}
          </button>
        ))}
        <Link
          className="project-showcase-thumbnail"
          to={`/work/${activeProject.slug}`}
          aria-label={`Open ${activeProject.title}`}
        >
          <img src={activeProject.image} alt="" />
          <span>{activeProject.title}</span>
          <span className="project-showcase-progress">
            <span
              key={`${activeProject.slug}-${isPaused}`}
              className={isPaused ? "paused" : ""}
            />
          </span>
        </Link>
      </aside>

      <div className="project-showcase-mobile-dots" aria-label="Choose a project">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            className={index === activeIndex ? "active" : ""}
            aria-label={`Show ${project.title}`}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
      <div className="project-showcase-bottom">
        <div>
          <Link to="/work">Research &amp; work</Link>
          <Link to="/about">About me</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <button
          className="project-showcase-scroll"
          aria-label="Scroll to explore more"
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false">
            <path
              d="M8 2v11M3.5 9.5 8 14l4.5-4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        </button>
        <span>{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
      </div>
    </section>
  )
}
