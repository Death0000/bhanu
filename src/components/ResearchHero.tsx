import { useLayoutEffect, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { projects, studio } from "../data/content"
import { Arrow } from "./SiteComponents"

const headlineLines = ["Every", "design", "has a", "story."]

const mobileHeadlineLines = [
  ["Every", "design"],
  ["has a"],
  ["story."],
]

export default function ResearchHero() {
  const heroRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const practice = projects.find((project) => project.slug === "dznstudeo")

  if (!practice) {
    throw new Error("The DZNSTUDEO project is missing.")
  }

  useLayoutEffect(() => {
    const hero = heroRef.current
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const context = gsap.context(() => {
      gsap.from(".research-word", {
        yPercent: 115,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.12,
      })
      gsap.from(cardRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.9,
        delay: 0.55,
        ease: "power4.out",
      })
    }, hero)

    const cursor = cursorRef.current
    const moveCursorX = cursor
      ? gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" })
      : null
    const moveCursorY = cursor
      ? gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" })
      : null
    // Give each headline line depth while the card drifts in the opposite direction.
    const moveParallax = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5

      hero.querySelectorAll<HTMLElement>("[data-depth]").forEach((word) => {
        const depth = Number(word.dataset.depth)
        gsap.to(word, {
          x: x * depth * 14,
          y: y * depth * 14,
          duration: 0.65,
          ease: "power3.out",
          overwrite: "auto",
        })
      })
      gsap.to(cardRef.current, {
        x: x * -10,
        y: y * -10,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      })
      moveCursorX?.(event.clientX)
      moveCursorY?.(event.clientY)
    }
    const resetParallax = () => {
      gsap.to(hero.querySelectorAll("[data-depth]"), {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      })
      gsap.to(cardRef.current, { x: 0, y: 0, duration: 0.7 })
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
    <section className="research-hero" ref={heroRef} aria-labelledby="research-title">
      <div className="research-watermark" aria-hidden="true">
        {studio.name}
      </div>
      <div className="research-corner research-corner--top-left">
        <span aria-hidden="true" className="research-spark">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M12 1.5 14.5 9.5 22.5 12 14.5 14.5 12 22.5 9.5 14.5 1.5 12 9.5 9.5 12 1.5Z" />
          </svg>
        </span>
        <span>Selected stories</span>
      </div>
      <p className="research-corner research-corner--top-right">
        The story decides the medium—not the other way around.
      </p>

      <h1 className="research-headline research-headline--desktop" id="research-title">
        {headlineLines.map((word, index) => (
          <span className={`research-line line-${index + 1}`} key={word}>
            <span className="research-word" data-depth={index % 2 ? -0.6 : 0.8}>
              {word}
            </span>
          </span>
        ))}
      </h1>
      <h1 className="research-headline research-headline--mobile" aria-hidden="true">
        {mobileHeadlineLines.map((line, index) => (
          <span className={`research-line mobile-line-${index + 1}`} key={line[0]}>
            {line.map((word) => (
              <span className="research-word" key={word}>
                {word}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <div className="research-card-wrap">
        <div className="research-card" ref={cardRef}>
          <Link className="research-card-logo" to="/" aria-label={`${studio.name} home`}>
            <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false">
              <path d="M1 1h6v6H1zM9 1h6v6H9zM1 9h6v6H1zM9 9h6v6H9z" />
            </svg>
            {studio.name}
          </Link>
          <p className="research-card-lead">{practice.panelHeading}</p>
          <p className="research-card-copy">{practice.panelBody}</p>
          <Link className="research-card-details" to={`/work/${practice.slug}`}>
            Explore project <Arrow />
          </Link>
        </div>
        <Link className="research-build-link" to="/contact">
          <span className="research-bolt" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img">
              <path d="M13.3 1.8 4.9 13h5.5l-.8 9.2L19.1 10h-5.7z" />
            </svg>
          </span>
          <span className="research-build-label">Contact</span>
        </Link>
      </div>

      <div className="research-corner research-corner--bottom-left">
        <strong>Bhanu Partap</strong>
        <span>{studio.location}</span>
        <span>Branding · Graphic · Motion · Packaging</span>
      </div>
      <div className="research-corner research-corner--bottom-right">
        {studio.tagline}
      </div>
      <span className="research-cursor" ref={cursorRef} aria-hidden="true" />
    </section>
  )
}
