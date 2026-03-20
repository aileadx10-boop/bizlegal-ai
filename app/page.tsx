import Link from 'next/link'

import { SiteFooter } from '@/app/components/SiteFooter'
import { SiteHeader } from '@/app/components/SiteHeader'
import { HeroSection } from '@/app/components/HeroSection'
import { ProductsSection } from '@/app/components/ProductsSection'
import { LeadCapture } from '@/app/components/LeadCapture'
import { CTASection } from '@/app/components/CTASection'
import { SectionHeading } from '@/app/components/SectionHeading'
import {
  faqItems,
  insightStreams,
  productLinks,
  securityPillars,
  trustMetrics,
} from '@/app/lib/site-content'

export default function HomePage() {
  return (
    <>
      <SiteHeader ctaHref={productLinks.docstack} ctaLabel="Generate Paid Templates" />
      <main>
        <HeroSection />

        <section className="section-shell">
          <div className="container trust-grid">
            <div>
              <SectionHeading
                eyebrow="Why this will convert better"
                title="The site now sells products first, research second, and trust all the way through."
                description="Instead of looking like a disconnected legal brochure, BizLegal AI is positioned as a premium operating system with clear commercial outcomes."
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
                <span className="info-card__label">Design direction</span>
                <strong>Obsidian luxury with editorial typography</strong>
                <p>
                  A premium, layered SaaS shell inspired by polished automation brands rather than a
                  conventional legal-services homepage.
                </p>
              </div>
              <div className="info-card">
                <span className="info-card__label">Conversion strategy</span>
                <strong>Every surface earns the next click</strong>
                <p>
                  Homepage sections move buyers from problem recognition into a product lane, then use
                  trust content to remove friction instead of adding clutter.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ProductsSection />
        
        <LeadCapture />

        <section className="section-shell">
          <div className="container">
            <SectionHeading
              eyebrow="Intelligence hub"
              title="The blog is now a product, not an afterthought."
              description="SEO pages are presented as intelligence assets with jurisdiction framing, matched commercial outcomes, and an obvious blog/posts entry in the top navigation."
            />
            <div className="grid-3">
              {insightStreams.map((stream) => (
                <article key={stream.title} className="workflow-card">
                  <span className="product-card__eyebrow">Intelligence lane</span>
                  <h3>{stream.title}</h3>
                  <p>{stream.body}</p>
                  <Link className="button button-ghost" href="/posts">
                    View posts
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container compare-grid">
            <article className="compare-card">
              <span className="product-card__eyebrow">Traditional experience</span>
              <h3>Static legal brochure</h3>
              <ul className="list-clean">
                <li>Disconnected product messaging and buried trust content.</li>
                <li>No real path from research to purchase.</li>
                <li>SEO pages feel like content inventory, not monetizable assets.</li>
              </ul>
            </article>
            <article className="compare-card">
              <span className="product-card__eyebrow">BizLegal AI now</span>
              <h3>Premium conversion-led SaaS shell</h3>
              <ul className="list-clean">
                <li>Homepage, posts, and guide pages all point into product workflows.</li>
                <li>Security, FAQ, privacy, terms, and disclaimer pages are surfaced visibly.</li>
                <li>SEO factory cadence is visible, credible, and operationally grounded.</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section-shell">
          <div className="container">
            <SectionHeading
              eyebrow="Trust and governance"
              title="Trust pages are part of the experience, not buried legal debris."
              description="The security center, FAQ, privacy, terms, and disclaimer pages are integrated into the navigation and footer so serious buyers can validate the platform quickly."
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
              title="The buying questions are answered before they block revenue."
              description="Commercial clarity and legal clarity now live side-by-side, which helps serious traffic convert faster."
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
