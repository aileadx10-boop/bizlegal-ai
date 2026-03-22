import Link from 'next/link'
import type { Metadata } from 'next'

import { CTASection } from '@/app/components/CTASection'
import { SectionHeading } from '@/app/components/SectionHeading'
import { SiteFooter } from '@/app/components/SiteFooter'
import { SiteHeader } from '@/app/components/SiteHeader'
import {
  companyIntersections,
  companyProfile,
  founderProfile,
  painPoints,
  productLinks,
  specializationAreas,
  trustMetrics,
} from '@/app/lib/site-content'

export const metadata: Metadata = {
  title: 'About BizLegal - Regulatory Risk Intelligence for Digital Asset Ventures',
  description:
    'Founder of BizLegal. Commercial attorney and entrepreneur focused on UAE digital asset ventures, AI-assisted regulatory risk intelligence, and structured exposure analysis.',
}

const proofPoints = [
  'Founder of BizLegal',
  'UAE digital asset focus',
  'AI-assisted risk analysis',
] as const

export default function AboutPage() {
  return (
    <>
      <SiteHeader ctaHref={productLinks.brai} ctaLabel="Start BRAI Scan" />
      <main>
        <section className="page-hero">
          <div className="container page-hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Founder - BizLegal</span>
              <h1>Commercial attorney. Entrepreneur. Digital asset regulatory intelligence.</h1>
              <p>
                {founderProfile.founderAbout} {companyProfile.summary} {companyProfile.detail}
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href={productLinks.brai}>
                  Start BRAI Scan
                </a>
                <Link className="button button-secondary" href="/posts">
                  Open Intelligence Hub
                </Link>
              </div>
              <div className="hero-proof">
                {proofPoints.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="page-hero__panel">
              <div className="info-card">
                <span className="info-card__label">Short bio</span>
                <strong>{founderProfile.shortLabel}</strong>
                <ul className="list-clean">
                  {founderProfile.shortBio.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="info-card">
                <span className="info-card__label">Founder note</span>
                <strong>Structured intelligence before structural liability.</strong>
                <p>
                  BizLegal is designed for founders and operators who need clearer regulatory
                  visibility without losing execution speed.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container">
            <SectionHeading
              eyebrow="Company bio"
              title={companyProfile.name}
              description={`${companyProfile.title}. ${companyProfile.summary}`}
            />
            <div className="trust-ribbon">
              {trustMetrics.map((metric) => (
                <div key={metric.label} className="metric-tile">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container">
            <SectionHeading
              eyebrow="Operating model"
              title="BizLegal operates where legal strategy, founder execution, and AI-assisted analysis meet."
              description="The platform is built to give digital asset ventures a more structured view of exposure while keeping the interface commercially useful and decision-oriented."
            />
            <div className="grid-4">
              {companyIntersections.map((item) => (
                <article key={item.title} className="security-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container">
            <SectionHeading
              eyebrow="Pain points"
              title="The work is designed around the real friction digital asset founders face."
              description="That includes launch uncertainty, jurisdiction confusion, cross-border complexity, and the cost of slow legal workflows."
            />
            <div className="grid-4">
              {painPoints.map((item) => (
                <article key={item.title} className="workflow-card">
                  <span className="product-card__eyebrow">Founder pain</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container">
            <SectionHeading
              eyebrow="Specialization"
              title="UAE-focused digital asset regulatory intelligence."
              description="Specialization stays narrow enough to be credible and deep enough to help founders make better jurisdiction decisions."
            />
            <div className="faq-grid">
              {specializationAreas.map((item) => (
                <article key={item.title} className="faq-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <SiteFooter />
    </>
  )
}
