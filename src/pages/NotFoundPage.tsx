import { Link } from "react-router-dom"
import { PageShell } from "../components/SiteComponents"

export default function NotFoundPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <p className="eyebrow">404 · Page not found</p>
        <h1>
          This story
          <br />
          isn’t <em>here.</em>
        </h1>
        <p className="page-intro">
          The page may have moved, or the address may be incorrect.
        </p>
        <Link className="text-link" to="/">
          Return home <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </PageShell>
  )
}
