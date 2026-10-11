import { ContactCTA, PageHero, PageShell } from "../components/SiteComponents"
import { services } from "../data/content"

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Disciplines & craft"
        title={
          <>
            From pixels
            <br />
            to <em>packaging.</em>
          </>
        }
        intro="A multidisciplinary practice connecting identity, image, movement, and form. The story decides the medium—not the other way around."
      />
      <section className="services-page">
        {services.map((service) => (
          <article key={service.name}>
            <span>{service.number}</span>
            <h2>{service.name}</h2>
            <p>{service.detail}.</p>
          </article>
        ))}
      </section>
      <ContactCTA />
    </PageShell>
  )
}
