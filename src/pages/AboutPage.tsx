import {
  ContactCTA,
  PageHero,
  PageShell,
  RevealImage,
} from "../components/SiteComponents"

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Bhanu Partap · He / him"
        title={
          <>
            Two cities.
            <br />
            One <em>eye.</em>
          </>
        }
        intro="Bhanu Partap is a multidisciplinary designer working across branding, graphic design, moving image, packaging, and speculative design. After building his practice in Chandigarh and Mohali, he moved to Sheffield for an MA in Graphic Design. His work has been recognised by the Future of Money Design Awards and shortlisted by Pentawards in 2026."
      />
      <section className="about-image">
        <RevealImage
          src="/images/bhanu-portrait.jpeg"
          alt="Bhanu Partap standing beside his Respira design exhibition"
        />
      </section>
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
