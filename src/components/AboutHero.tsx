import { useLayoutEffect, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { studio } from "../data/content"

export default function AboutHero() {
  const heroRef = useRef<HTMLElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const hero = heroRef.current
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const context = gsap.context(() => {
      gsap.from(".about-hero-letter", {
        yPercent: 110,
        opacity: 0,
        duration: 0.85,
        stagger: 0.06,
        ease: "power4.out",
        delay: 0.1,
      })
      gsap.from(blockRef.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.9,
        delay: 0.25,
        ease: "power3.inOut",
      })
      gsap.from(portraitRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.75,
        ease: "power3.out",
      })
      gsap.from(".about-hero-detail", {
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        delay: 0.9,
      })
    }, hero)

    const moveParallax = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5

      gsap.to(titleRef.current, {
        x: x * 6,
        y: y * 4,
        duration: 0.6,
        ease: "power3.out",
      })
      gsap.to(blockRef.current, {
        x: x * -4,
        duration: 0.7,
        ease: "power3.out",
      })
      gsap.to(portraitRef.current, {
        x: x * 10,
        y: y * 8,
        duration: 0.8,
        ease: "power3.out",
      })
    }
    const resetParallax = () => {
      gsap.to([titleRef.current, blockRef.current, portraitRef.current], {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
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

  return (
    <section
      className="about-editorial-hero"
      ref={heroRef}
      aria-labelledby="about-hero-title"
    >
      <div className="about-hero-topline about-hero-detail">
        <span>Bhanu Partap · He / him</span>
        <span>{studio.location}</span>
      </div>
      <h1 className="about-hero-title" id="about-hero-title" ref={titleRef}>
        {"Bhanu.".split("").map((letter, index) => (
          <span className="about-hero-letter" key={`${letter}-${index}`}>
            {letter}
          </span>
        ))}
      </h1>
      <div className="about-hero-block" ref={blockRef} />
      <figure className="about-hero-portrait">
        <img
          src="/images/bhanu-portrait.jpeg"
          alt="Bhanu Partap standing beside his Respira design exhibition"
          ref={portraitRef}
        />
        <figcaption className="about-hero-detail">
          Respira · Design exhibition
        </figcaption>
      </figure>
      <div className="about-hero-columns">
        <div className="about-hero-column about-hero-detail">
          <span>Multidisciplinary designer</span>
          <p>
            Branding, graphic design, moving image, packaging and speculative
            design.
          </p>
        </div>
        <div className="about-hero-column about-hero-detail">
          <span>Shaped in India. Sharpened in the UK.</span>
          <p>
            From Animation and Game Design to an MA in Graphic Design at
            Sheffield Hallam University.
          </p>
        </div>
      </div>
      <div className="about-hero-index about-hero-detail" aria-hidden="true">
        BP
      </div>
      <div className="about-hero-vertical about-hero-detail">
        <span>Bhanu Partap</span>
        <span>Branding · Graphic · Motion · Packaging</span>
      </div>
      <Link
        className="about-hero-cta about-hero-detail"
        to="/work/respira"
        aria-label="Explore the Respira project"
      >
        <span aria-hidden="true">↗</span>
      </Link>
    </section>
  )
}
