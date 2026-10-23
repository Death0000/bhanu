import { useLayoutEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { awards, projects, services } from "../data/content"
import { Arrow, ProjectCard, ProjectMeta, RevealImage } from "./SiteComponents"
import SculptureHero from "./ui/liquid-sculpture-hero"

export function HeroCollage() {
  const cells = [
    {
      kind: "type",
      tone: "clay",
      eyebrow: "Respira",
      title: "Beyond Package",
    },
    {
      kind: "type",
      tone: "paper",
      eyebrow: "The Audible Budget",
      title: "Making public money audible",
    },
    {
      kind: "type",
      tone: "red",
      eyebrow: "DZNSTUDEO",
      title: "Every design has a story",
    },
    {
      kind: "type",
      tone: "stone",
      eyebrow: "Practice",
      title: "Branding & graphic design",
    },
    {
      kind: "image",
      src: "/images/bhanu-school-visit.png",
      alt: "Bhanu meeting students at Akshar School",
    },
    {
      kind: "image",
      src: "/images/bhanu-innovation-stage.jpeg",
      alt: "Bhanu speaking at an innovation event",
    },
    {
      kind: "pair",
      items: [
        { eyebrow: "Moving image", title: "Video & motion" },
        { eyebrow: "Speculative design", title: "Civic experience" },
      ],
    },
  ] as const

  return (
    <section className="hero">
      <div className="hero-kicker">
        <span>Bhanu Partap · DZNSTUDEO</span>
        <span>Sheffield, UK</span>
      </div>
      <div className="collage" aria-label="An editorial visual moodboard">
        {cells.map((cell, index) => (
          <div
            className={`collage-cell cell-${index + 1}`}
            key={cell.kind === "image" ? cell.src : `hero-cell-${index + 1}`}
          >
            {cell.kind === "image" && (
              <img src={cell.src} alt={cell.alt} loading="eager" />
            )}
            {cell.kind === "type" && (
              <div className={`collage-type collage-type--${cell.tone}`}>
                <span>{cell.eyebrow}</span>
                <strong>{cell.title}</strong>
              </div>
            )}
            {cell.kind === "pair" && (
              <div className="collage-type-pair">
                {cell.items.map((item) => (
                  <div
                    className="collage-type collage-type--ink"
                    key={item.eyebrow}
                  >
                    <span>{item.eyebrow}</span>
                    <strong>{item.title}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="hero-title">
          <p>Branding · Graphic · Motion · Packaging</p>
          <h1>
            <span>One practice.</span>
            <span>Many forms.</span>
          </h1>
          <div className="hero-mark">Bhanu Partap · 2026</div>
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
      <p className="eyebrow reveal">A little about me</p>
      <h2 className="display reveal">
        From pixels
        <br />
        to <em>packaging.</em>
      </h2>
      <div className="intro-copy reveal">
        <p>
          I’m Bhanu, a multidisciplinary designer shaped by a move from
          Chandigarh to Sheffield. My path through animation, video and graphic
          design taught me to look for the story before choosing the medium.
        </p>
        <Link className="text-link" to="/about">
          More about me <Arrow />
        </Link>
      </div>
    </section>
  )
}

function StoryAndPrinciples() {
  const principles = [
    {
      number: "01",
      title: "Start with a better question.",
      detail:
        "Research the context and listen closely before deciding what the work should look like.",
    },
    {
      number: "02",
      title: "Make ideas tangible.",
      detail:
        "Use image, sound, material and interaction to turn an abstract thought into something people can experience.",
    },
    {
      number: "03",
      title: "Design for people, not the portfolio.",
      detail:
        "Make room for different perspectives, clear communication and the people who will encounter the work.",
    },
  ]

  return (
    <section className="story-principles">
      <div className="story-intro reveal">
        <p className="eyebrow">The short version</p>
        <h2>
          Two places.
          <br />
          One evolving <em>practice.</em>
        </h2>
        <p>
          I began with Animation and Game Design in India, then worked across
          video, branding and graphic design before moving to the UK for an MA
          in Graphic Design at Sheffield Hallam University. Today, I bring
          those disciplines together to explore how design can make complex
          ideas feel human.
        </p>
        <Link className="text-link" to="/about">
          Read my story <Arrow />
        </Link>
      </div>
      <div className="principles-list">
        <p className="eyebrow reveal">A few principles I return to</p>
        {principles.map((principle) => (
          <article className="principle-row reveal" key={principle.number}>
            <span>{principle.number}</span>
            <h3>{principle.title}</h3>
            <p>{principle.detail}</p>
          </article>
        ))}
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
    <section className="horizontal-work" id="selected-work" ref={sectionRef}>
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

  return (
    <section className="services-block">
      <div className="services-heading">
        <p className="eyebrow reveal">Capabilities</p>
        <h2 className="section-title reveal">What I do.</h2>
      </div>
      <div className="services-layout">
        <div className="service-preview">
          <img
            src={services[activeIndex].image}
            alt={services[activeIndex].imageAlt}
          />
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
      <SculptureHero
        brand="BP"
        src="/images/bhanu-reading-studio.jpeg"
        mobileSrc="/images/bhanu-portrait.jpeg"
        imageAlt="Bhanu Partap exploring a design book in a studio library"
        eyebrow="Bhanu Partap · Multidisciplinary designer · Sheffield, UK"
        headline={"Every design\nhas a story."}
        headlineAccent="has a story."
        body="I work across branding, graphic design, moving image, packaging, and speculative design—choosing the form that best serves each story."
        primaryCta={{ label: "Explore selected work", href: "#selected-work" }}
        secondaryCta={{ label: "About me", href: "/about" }}
        showNav={false}
        themeToggle={false}
        showCredit={false}
        loadFonts={false}
        preserveImage
        className="sh-root--brand"
        backdropText="DZNSTUDEO"
        background="#111111"
        darkBackground="#111111"
        imageBackground="#EAE7E1"
        textColor="#F5F5F5"
        accentColor="#FF3028"
        height="100svh"
      />
      <HeroCollage />
      <EditorialIntro />
      <StoryAndPrinciples />
      <section className="recognition">
        <div className="recognition-heading">
          <p className="eyebrow reveal">Recognition</p>
          <h2 className="section-title reveal">
            Award on the wall.
            <br />
            Process on the page.
          </h2>
        </div>
        {awards.map((award) => (
          <div className="award-row" key={award.title}>
            <span>{award.number}</span>
            <strong>
              <a href={award.href} target="_blank" rel="noreferrer">
                {award.title}
              </a>
            </strong>
            <p>{award.detail}</p>
          </div>
        ))}
        <div
          className="achievement-gallery"
          aria-label="Achievement and community moments"
        >
          <figure className="achievement-card">
            <img
              src="/images/bhanu-tie-mentorship.jpeg"
              alt="Bhanu Partap with Mr. Murgli Bukkapatnam, chairman of TiE Global"
              loading="lazy"
            />
            <figcaption>Mentorship · TiE Global</figcaption>
          </figure>
          <figure className="achievement-card">
            <img
              src="/images/bhanu-innovation-stage.jpeg"
              alt="Bhanu speaking on the Innovation Stage"
              loading="lazy"
            />
            <figcaption>Speaking · Innovation Stage</figcaption>
          </figure>
          <figure className="achievement-card achievement-card--poster">
            <img
              src="/images/bhanu-leadership-chandigarh.jpeg"
              alt="Leadership Talent Office of Chandigarh poster featuring Bhanu Partap"
              loading="lazy"
            />
            <figcaption>Leadership · Chandigarh</figcaption>
          </figure>
          <figure className="achievement-card achievement-card--poster">
            <img
              src="/images/bhanu-entrepreneurship-awards.png"
              alt="TiE Chandigarh 2025 awards poster featuring Bhanu and Rishi Verma"
              loading="lazy"
            />
            <figcaption>TiE Chandigarh · 2025</figcaption>
          </figure>
          <figure className="achievement-card achievement-card--poster">
            <img
              src="/images/bhanu-leaders-conclave.png"
              alt="Samagam Leaders Conclave 2025 poster"
              loading="lazy"
            />
            <figcaption>Leaders Conclave · 2025</figcaption>
          </figure>
          <figure className="achievement-card achievement-card--poster">
            <img
              src="/images/bhanu-leadership-network.png"
              alt="Leadership networking poster featuring Bhanu and Sumeer Walia"
              loading="lazy"
            />
            <figcaption>Leadership network</figcaption>
          </figure>
          <figure className="achievement-card">
            <img
              src="/images/bhanu-school-visit.png"
              alt="Bhanu spending time with students at Akshar School"
              loading="lazy"
            />
            <figcaption>School visit · Akshar School</figcaption>
          </figure>
          <figure className="achievement-card">
            <img
              src="/images/turban-lens-community.png"
              alt="Turban Lens Community Cinema team"
              loading="lazy"
            />
            <figcaption>Community · Turban Lens</figcaption>
          </figure>
        </div>
      </section>
      <HorizontalWork />
      <section className="feature-project">
        <RevealImage
          src={featuredProject.image}
          alt="The Audible Budget poster and red briefcase translating public finance into sound"
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
            Respira explores how packaging can shape a moment of calm. The
            Audible Budget asks what public spending might sound like. The
            format changes; the story leads.
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
