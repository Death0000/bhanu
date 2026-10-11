import { ContactCTA, PageShell } from "../components/SiteComponents"
import { HomeSections } from "../components/HomeSections"

export default function HomePage() {
  return (
    <PageShell>
      <HomeSections />
      <ContactCTA />
    </PageShell>
  )
}
