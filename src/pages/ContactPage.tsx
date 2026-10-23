import { useState, type FormEvent } from "react"
import {
  Arrow,
  ContactCTA,
  PageShell,
} from "../components/SiteComponents"
import ContactHero from "../components/ContactHero"
import { services, studio } from "../data/content"

export default function ContactPage() {
  const [status, setStatus] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    if (!form.checkValidity()) {
      setStatus("Please complete the required fields.")
      form.reportValidity()
      return
    }

    setStatus(
      "Form delivery is not configured yet. Please contact Bhanu through LinkedIn.",
    )
  }

  return (
    <PageShell>
      <ContactHero />
      <section className="contact-layout">
        <aside>
          <p className="eyebrow">Connect</p>
          <a href={studio.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <Arrow />
          </a>
          <span>{studio.location}</span>
        </aside>
        <form id="contact-form" onSubmit={handleSubmit} noValidate>
          <label>
            Name *
            <input name="name" required autoComplete="name" />
          </label>
          <label>
            Email *
            <input type="email" name="email" required autoComplete="email" />
          </label>
          <label>
            Company / organisation
            <input name="company" autoComplete="organization" />
          </label>
          <label>
            Project type
            <select name="type" defaultValue="">
              <option value="" disabled>
                Select a discipline
              </option>
              {services.map((service) => (
                <option key={service.name}>{service.name}</option>
              ))}
            </select>
          </label>
          <label>
            Estimated budget
            <select name="budget" defaultValue="">
              <option value="" disabled>
                Select a range (optional)
              </option>
              <option>Under £10k</option>
              <option>£10k—£25k</option>
              <option>£25k—£50k</option>
              <option>£50k+</option>
            </select>
          </label>
          <label className="full">
            Project description *
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Context, ambition, timing..."
            />
          </label>
          <div className="form-end">
            <button type="submit">
              Start a project <Arrow />
            </button>
            <p role="status">{status}</p>
          </div>
        </form>
      </section>
      <ContactCTA />
    </PageShell>
  )
}
