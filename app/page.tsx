import Link from 'next/link'

import { CTASection } from '@/app/components/CTASection'
import { HeroSection } from '@/app/components/HeroSection'
import { LeadCapture } from '@/app/components/LeadCapture'
import { ProductsSection } from '@/app/components/ProductsSection'
import { SectionHeading } from '@/app/components/SectionHeading'
import { SiteFooter } from '@/app/components/SiteFooter'
import { SiteHeader } from '@/app/components/SiteHeader'
import {
  companyIntersections,
  companyProfile,
  faqItems,
  founderProfile,
  insightStreams,
  painPoints,
  productLinks,
  securityPillars,
  specializationAreas,
  trustMetrics,
} from '@/app/lib/site-content'

export default function HomePage() {
  return (
    <>
      <SiteHeader ctaHref={productLinks.brai} ctaLabel="Start BRAI Scan" />
      <main>
        <HeroSection />

        <section className="section-shell">
          <div className="container trust-grid">
            <div>
              <SectionHeading
                eyebrow="Short bio"
                title="Commercial attorney. Entrepreneur. Founder of DOR INNOVATIONS."
                description="AI-driven regulatory risk intelligence for digital asset ventures."
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
            <div className="trust-panel">
              <div className="info-card">
                <span className="info-card__label">{founderProfile.shortLabel}</span>
                <strong>{founderProfile.heroSummary}</strong>
                <ul className="list-clean">
                  {founderProfile.shortBio.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="info-card">
                <span className="info-card__label">{companyProfile.name}</span>
                <strong>{companyProfile.title}</strong>
                <p>{companyProfile.summary}</p>
                <p>{companyProfile.detail}</p>
                <Link className="button button-ghost" href="/about">
                  Read founder profile
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ProductsSection />

        <LeadCapture />

        <section className="section-shell">
          <div className="container">
            <SectionHeading
              eyebrow="Company bio"
              title={companyProfile.title}
              description={`${companyProfile.summary} ${companyProfile.detail}`}
            />
            <div className="grid-4">
              {companyIntersections.map((item) => (
                <article key={item.title} className="security-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <div className="faq-grid" style={{ marginTop: '1.1rem' }}>
              {specializationAreas.map((item) => (
                <article key={item.title} className="faq-card">
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
              eyebrow="Problems we solve"
              title="Legaltech designed around founder pain, not generic compliance theater."
              description="Built for pre-launch structuring, fundraising pressure, and UAE expansion where uncertainty can turn into structural liability."
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
              eyebrow="Intelligence hub"
              title="Research that reduces uncertainty before it becomes operational drag."
              description="Founder notes, regulatory briefings, and dynamic pages built to qualify serious traffic and route it into the right BizLegal product."
            />
            <div className="grid-3">
              {insightStreams.map((stream) => (
                <article key={stream.title} className="workflow-card">
                  <span className="product-card__eyebrow">Intelligence lane</span>
                  <h3>{stream.title}</h3>
                  <p>{stream.body}</p>
                  <Link className="button button-ghost" href="/posts">
                    Open intelligence hub
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container">
            <SectionHeading
              eyebrow="Trust and governance"
              title="Credibility is visible across the experience, not hidden in the footer."
              description="Security, privacy, disclaimers, and operating boundaries are surfaced to support real diligence by founders, counterparties, and sophisticated buyers."
            />
            <div className="grid-4">
              {securityPillars.map((pillar) => (
                <article key={pillar.title} className="security-card">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container">
            <SectionHeading
              eyebrow="FAQ preview"
              title="Answers built for launch, fundraising, and UAE expansion decisions."
              description="Key questions are handled early so serious visitors can move from curiosity into action with less friction."
            />
            <div className="faq-grid">
              {faqItems.slice(0, 4).map((item) => (
                <article key={item.question} className="faq-card">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
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
