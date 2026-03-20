import type { Metadata } from 'next'
import Link from 'next/link'

import { SiteFooter } from '@/app/components/SiteFooter'
import { SiteHeader } from '@/app/components/SiteHeader'
import { productLinks, securityPillars } from '@/app/lib/site-content'

export const metadata: Metadata = {
  title: 'Security Center',
  description: 'Platform trust, publishing controls, and legal-operational guardrails for BizLegal AI.',
}

export default function SecurityPage() {
  return (
    <>
      <SiteHeader ctaHref={productLinks.brai} ctaLabel="Launch BRAI" />
      <main className="page-hero">
        <section className="container security-layout">
          <div>
            <div className="section-heading">
              <span className="eyebrow">Security center</span>
              <h2>Trust is visible because trust converts.</h2>
              <p>
                BizLegal AI now pairs hardened technical defaults with clear trust communication. The
                site shell, publishing workflow, and legal pages all reinforce the same operating model.
              </p>
            </div>
            <div className="grid-4">
              {securityPillars.map((pillar) => (
                <article key={pillar.title} className="security-card">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>
          <aside className="article-rail">
            <div className="info-card">
              <span className="info-card__label">Technical posture</span>
              <strong>Server-rendered Next.js with controlled Supabase publishing</strong>
              <p>
                Content retrieval is centralized, guide rendering is unified, and unnecessary client-side
                complexity has been stripped back from the public experience.
              </p>
            </div>
            <div className="info-card">
              <span className="info-card__label">Publishing controls</span>
              <strong>Scheduled, batch-based SEO generation</strong>
              <p>
                The workflow creates only missing pages in controlled batches so the hub expands without
                producing duplicate or chaotic output.
              </p>
            </div>
            <div className="info-card">
              <span className="info-card__label">Trust library</span>
              <Link href="/faq">FAQ</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/disclaimer">Disclaimer</Link>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
