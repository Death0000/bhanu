import { useLayoutEffect, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { projects, services, studio } from "../data/content"
import { Arrow } from "./SiteComponents"

export default function ServicesHero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } })
      timeline
        .from(".services-hero-nav a", {
          x: -16,
          opacity: 0,
          duration: 0.55,
          stagger: 0.07,
        })
        .from(
          titleRef.current?.querySelector("span"),
          {
            yPercent: 105,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.2",
        )
        .from(
          portraitRef.current,
          {
            clipPath: "inset(0 0 100% 0)",
            scale: 1.04,
            duration: 1.1,
            ease: "power3.inOut",
          },
          "-=0.65",
        )
        .from(
          [".services-hero-bio", ".services-hero-projects", ".services-hero-social"],
          {
            y: 18,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.55",
        )
        .from(
          blockRef.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.8,
            ease: "power3.inOut",
          },
          0.3,
        )
        .from(
          ".services-hero-vertical",
          { opacity: 0, duration: 0.5 },
          "-=0.35",
        )
    }, hero)

    const moveParallax = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      const bounds = hero.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      gsap.to(titleRef.current, {
        x: x * -6,
        y: y * -4,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto",
      })
      gsap.to(portraitRef.current, {
        x: x * 10,
        y: y * 8,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      })
      gsap.to(blockRef.current, {
        x: x * -4,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto",
      })
    }
    const resetParallax = () => {
      gsap.to(
        [titleRef.current, portraitRef.current, blockRef.current],
        { x: 0, y: 0, duration: 0.7, ease: "power3.out", overwrite: "auto" },
      )
    }

    hero.addEventListener("pointermove", moveParallax)
    hero.addEventListener("pointerleave", resetParallax)
    return () => {
      hero.removeEventListener("pointermove", moveParallax)
      hero.removeEventListener("pointerleave", resetParallax)
      context.revert()
    }
  }, [])

  return (
    <section className="services-editorial-hero" ref={heroRef}>
      <nav className="services-hero-nav" aria-label="Services">
        {services.map((service, index) => (
          <a
            className={index === 0 ? "active" : ""}
            href={`#service-${service.number}`}
            key={service.number}
          >
            {service.name}
          </a>
        ))}
      </nav>
      <div className="services-hero-name" aria-hidden="true" ref={titleRef}>
        <span>{studio.name}</span>
      </div>
      <div className="services-hero-bio">
        <span className="services-hero-bio-rule" />
        <p>
          Bhanu Partap is a multidisciplinary designer working across branding,
          graphic design, moving image, packaging, and speculative design.
        </p>
      </div>
      <div className="services-hero-projects">
        <span className="services-hero-project-label">Selected projects</span>
        <ul>
          {projects.map((project) => (
            <li key={project.slug}>
              <Link to={`/work/${project.slug}`}>
                {project.year}, {project.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link className="services-hero-see-all" to="/work">
          See all work <Arrow />
        </Link>
      </div>
      <figure className="services-hero-portrait" ref={portraitRef}>
        <img
          src="/images/bhanu-portrait.jpeg"
          alt="Bhanu Partap at his Respira design exhibition"
        />
        <span className="services-hero-photo-wash" aria-hidden="true" />
        <figcaption>Bhanu Partap · Sheffield, UK</figcaption>
      </figure>
      <div className="services-hero-vertical" aria-hidden="true">
        {studio.tagline}
      </div>
      <div className="services-hero-block" ref={blockRef} aria-hidden="true" />
      <Link className="services-hero-social" to="/contact">
        Contact <Arrow />
      </Link>
    </section>
  )
}
