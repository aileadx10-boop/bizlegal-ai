import Link from 'next/link'
import { productLinks } from '@/app/lib/site-content'

export function CTASection() {
  return (
    <section className="section-shell">
      <div className="container trust-grid">
        <div className="hero-copy">
          <span className="eyebrow">Final call to action</span>
          <h1>Build the intelligence layer. Capture the revenue. Keep the trust visible.</h1>
          <p>
            The redesigned BizLegal AI experience is ready to sell paid templates, compliance
            workflows, and investigation services through a single, polished SaaS narrative.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={productLinks.docstack}>
              Start with DocStack
            </a>
            <Link className="button button-secondary" href="/posts">
              Browse Posts
            </Link>
          </div>
        </div>
        <div className="trust-panel">
          <div className="info-card">
            <span className="info-card__label">Ready now</span>
            <strong>Homepage, posts hub, guide pages, and trust content aligned</strong>
            <p>
              You can deploy manually to Vercel after reviewing the repo. The site structure is now
              oriented around conversion, research depth, and premium positioning.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
