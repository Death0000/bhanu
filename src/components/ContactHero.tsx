import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { awards, projects, studio } from "../data/content"
import { Arrow } from "./SiteComponents"

const slides = [
  {
    title: projects[0].title,
    eyebrow: projects[0].panelEyebrow,
    description: projects[0].panelBody,
    image: projects[0].image,
    alt: projects[0].imageAlt,
    href: `/work/${projects[0].slug}`,
    year: projects[0].year,
  },
  {
    title: projects[1].title,
    eyebrow: projects[1].panelEyebrow,
    description: projects[1].panelBody,
    image: projects[1].image,
    alt: projects[1].imageAlt,
    href: `/work/${projects[1].slug}`,
    year: projects[1].year,
  },
  {
    title: projects[2].title,
    eyebrow: projects[2].panelEyebrow,
    description: projects[2].panelBody,
    image: projects[2].image,
    alt: projects[2].imageAlt,
    href: `/work/${projects[2].slug}`,
    year: projects[2].year,
  },
  {
    title: awards[0].title,
    eyebrow: awards[0].detail,
    description: projects[1].panelBody,
    image: projects[1].image,
    alt: projects[1].imageAlt,
    href: `/work/${projects[1].slug}`,
    year: projects[1].year,
  },
  {
    title: awards[1].title,
    eyebrow: awards[1].detail,
    description: projects[0].panelBody,
    image: projects[0].image,
    alt: projects[0].imageAlt,
    href: `/work/${projects[0].slug}`,
    year: projects[0].year,
  },
]

export default function ContactHero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const startX = useRef<number | null>(null)
  const lastAnimatedIndex = useRef(activeIndex)
  const slide = slides[activeIndex]

  useLayoutEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } })
      timeline
        .from(".contact-slider-top > *", {
          y: -12,
          opacity: 0,
          duration: 0.55,
          stagger: 0.08,
        })
        .from(
          panelRef.current,
          {
            clipPath: "inset(0 0 0 100%)",
            duration: 0.9,
            ease: "power3.inOut",
          },
          "-=0.15",
        )
        .from(
          imageRef.current,
          { scale: 1.15, duration: 1.15, ease: "power3.out" },
          "-=0.5",
        )
        .from(
          ".contact-grid-lines span",
          { scaleY: 0, transformOrigin: "top", duration: 0.55, stagger: 0.1 },
          "-=0.8",
        )
        .from(
          [".contact-slide-meta", ".contact-slide-copy", ".contact-slider-next-title"],
          { y: 18, opacity: 0, duration: 0.65, stagger: 0.1 },
          "-=0.4",
        )
        .from(
          [".contact-slider-controls button", ".contact-slider-dots button", ".contact-slider-bottom > *"],
          { y: 12, opacity: 0, duration: 0.45, stagger: 0.06 },
          "-=0.45",
        )
    }, hero)
    return () => context.revert()
  }, [])

  useEffect(() => {
    if (
      activeIndex === lastAnimatedIndex.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }
    lastAnimatedIndex.current = activeIndex
    const words = titleRef.current?.querySelectorAll(".contact-slide-word") ?? []
    const eyebrow = panelRef.current?.querySelector(".contact-slide-copy > span")
    const description = panelRef.current?.querySelector(".contact-slide-copy > p")
    const link = panelRef.current?.querySelector(".contact-slide-link")
    gsap.fromTo(
      panelRef.current,
      { xPercent: 2, opacity: 0.65 },
      { xPercent: 0, opacity: 1, duration: 0.55, ease: "power3.inOut" },
    )
    gsap.fromTo(
      imageRef.current,
      { scale: 1.08 },
      { scale: 1, duration: 0.9, ease: "power3.out" },
    )
    gsap.fromTo(
      words,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power4.out" },
    )
    gsap.fromTo(
      [eyebrow, description, link],
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.07, delay: 0.12 },
    )
  }, [activeIndex])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const moveParallax = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      const bounds = hero.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      gsap.to(imageRef.current, {
        x: x * -12,
        y: y * -8,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      })
      gsap.to(titleRef.current, {
        x: x * 6,
        y: y * 4,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto",
      })
      gsap.to(panelRef.current, {
        x: x * 4,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto",
      })
    }
    const resetParallax = () => {
      gsap.to(
        [imageRef.current, titleRef.current, panelRef.current],
        { x: 0, y: 0, duration: 0.7, ease: "power3.out", overwrite: "auto" },
      )
    }

    hero.addEventListener("pointermove", moveParallax)
    hero.addEventListener("pointerleave", resetParallax)
    return () => {
      hero.removeEventListener("pointermove", moveParallax)
      hero.removeEventListener("pointerleave", resetParallax)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(target.tagName))
      ) {
        return
      }
      if (event.key === "ArrowRight") setActiveIndex((index) => (index + 1) % slides.length)
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => (index - 1 + slides.length) % slides.length)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  function moveSlide(direction: number) {
    setActiveIndex((index) => (index + direction + slides.length) % slides.length)
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLElement>) {
    if (startX.current === null) return
    const distance = event.clientX - startX.current
    if (Math.abs(distance) > 50) moveSlide(distance < 0 ? 1 : -1)
    startX.current = null
  }

  return (
    <section
      className="contact-editorial-hero"
      ref={heroRef}
      onPointerDown={(event) => {
        startX.current = event.clientX
      }}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        startX.current = null
      }}
      aria-label="Selected projects"
    >
      <div className="contact-grid-lines" aria-hidden="true">
        {[3.5, 13, 47, 86, 96].map((position) => (
          <span key={position} style={{ left: `${position}%` }} />
        ))}
      </div>
      <div className="contact-slider-top">
        <Link to="/" className="contact-slider-logo">
          {studio.name}
        </Link>
        <Link className="contact-slider-projects" to="/work">
          <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false">
            <path d="M1 1h6v6H1zM9 1h6v6H9zM1 9h6v6H1zM9 9h6v6H9z" />
          </svg>
          Research &amp; work
        </Link>
        <Link to="/contact" className="contact-slider-menu">
          Contact
        </Link>
      </div>

      <div className="contact-slider-panel" ref={panelRef}>
        <img src={slide.image} alt={slide.alt} ref={imageRef} />
        <div className="contact-slider-wash" aria-hidden="true" />
        <div className="contact-slide-meta">
          <span>{slide.year}</span>
          <span>
            {String(activeIndex + 1).padStart(2, "0")} of{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
        <div className="contact-slide-copy">
          <span>{slide.eyebrow}</span>
          <h1 ref={titleRef}>
            {slide.title.split(" ").map((word, index) => (
              <span className="contact-slide-word" key={`${word}-${index}`}>
                {word}{" "}
              </span>
            ))}
          </h1>
          <p>{slide.description}</p>
          <Link to={slide.href} className="contact-slide-link">
            <span /> Explore project <Arrow />
          </Link>
        </div>
        <div className="contact-slider-next-title" aria-hidden="true">
          {slides[(activeIndex + 1) % slides.length].title}
        </div>
      </div>

      <div className="contact-slider-controls" aria-label="Slide controls">
        <button onClick={() => moveSlide(1)} aria-label="Next selected project">
          ›
        </button>
        <button onClick={() => moveSlide(-1)} aria-label="Previous selected project">
          ‹
        </button>
      </div>
      <div className="contact-slider-dots" aria-label="Choose a slide">
        {slides.map((item, index) => (
          <button
            aria-label={`Show ${item.title}`}
            aria-pressed={index === activeIndex}
            className={index === activeIndex ? "active" : ""}
            key={`${item.title}-${index}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <div className="contact-slider-bottom">
        <a href="#contact-form">
          Scroll
          <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false">
            <path
              d="M8 2v11M3.5 9.5 8 14l4.5-4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        </a>
        <span>{studio.location}</span>
        <a href={studio.linkedin} target="_blank" rel="noreferrer">
          LinkedIn <Arrow />
        </a>
      </div>
    </section>
  )
}
