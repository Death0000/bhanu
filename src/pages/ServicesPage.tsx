import { ContactCTA, PageShell } from "../components/SiteComponents"
import ServicesHero from "../components/ServicesHero"
import { services } from "../data/content"

export default function ServicesPage() {
  return (
    <PageShell>
      <ServicesHero />
      <section className="services-page">
        {services.map((service) => (
          <article id={`service-${service.number}`} key={service.name}>
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
