import {
  ContactCTA,
  PageShell,
  RevealImage,
} from "../components/SiteComponents"
import AboutHero from "../components/AboutHero"

export default function AboutPage() {
  return (
    <PageShell>
      <AboutHero />
      <section className="split-copy">
        <p className="eyebrow">From pixels to packaging</p>
        <div>
          <h2>Shaped in India. Sharpened in the UK.</h2>
          <p>
            Bhanu studied Animation and Game Design at RIMT University,
            graduating with an A+, before moving through video, branding, and
            graphic design roles. He is currently completing an MA in Graphic
            Design at Sheffield Hallam University.
          </p>
        </div>
      </section>
      <section className="principles">
        <div>
          <span>Now</span>
          <h3>MA Graphic Design · Sheffield Hallam University · 2025—26</h3>
        </div>
        <div>
          <span>2025</span>
          <h3>Graphic Designer · theDigit.in</h3>
        </div>
        <div>
          <span>2024</span>
          <h3>Video & Graphic Designer · 42Works</h3>
        </div>
        <div>
          <span>2024</span>
          <h3>B.Sc Animation & Game Design · RIMT University · A+</h3>
        </div>
      </section>
      <ContactCTA />
    </PageShell>
  )
}
