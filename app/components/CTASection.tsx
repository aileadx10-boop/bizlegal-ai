import Link from 'next/link'
import { productLinks, specializationAreas } from '@/app/lib/site-content'

export function CTASection() {
  return (
    <section className="section-shell">
      <div className="container trust-grid">
        <div className="hero-copy">
          <span className="eyebrow">Move with clarity</span>
          <h1>Identify regulatory exposure before it becomes structural liability.</h1>
          <p>
            Built for founders and operators who need premium legaltech execution, not generic
            compliance theater. Start with a structured risk view, then move into the right product path.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={productLinks.brai}>
              Start BRAI Scan
            </a>
            <Link className="button button-secondary" href="/about">
              Read Founder Profile
            </Link>
          </div>
        </div>
        <div className="trust-panel">
          <div className="info-card">
            <span className="info-card__label">Primary specialization</span>
            <strong>{specializationAreas[0].title}</strong>
            <p>
              {specializationAreas[0].body}
            </p>
          </div>
          <div className="info-card">
            <span className="info-card__label">UAE depth</span>
            <strong>{specializationAreas[1].title}</strong>
            <p>
              {specializationAreas[1].body}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
