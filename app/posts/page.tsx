import type { Metadata } from 'next'
import Link from 'next/link'

import { SiteFooter } from '@/app/components/SiteFooter'
import { SiteHeader } from '@/app/components/SiteHeader'
import { ctaLabels, getPublishedSeoPages, toPagePath } from '@/app/lib/seo-pages'
import {
  productLinks,
  providerChoices,
  seoFactoryFeatureCards,
  seoFactoryFlow,
  seoFactorySchedule,
} from '@/app/lib/site-content'

export const metadata: Metadata = {
  title: 'Auto-SEO Hub | Blog and Posts',
  description:
    'Dynamic legal intelligence pages, built like product entries and scheduled through a premium SEO factory.',
}

export const dynamic = 'force-dynamic'

export default async function PostsPage() {
  const posts = await getPublishedSeoPages(18)

  return (
    <>
      <SiteHeader ctaHref={productLinks.docstack} ctaLabel="Start with DocStack" />
      <main className="page-hero">
        <section className="container page-hero-grid">
          <div>
            <span className="eyebrow">Automatic SEO factory</span>
            <h1>Dynamic legal pages that look like products, not blog inventory.</h1>
            <p>
              This hub is the public face of the SEO engine: three scheduled runs a week, 10 pages per
              batch, and every output wrapped in conversion framing, workflow visuals, and a matched
              product destination.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={productLinks.docstack}>
                Open paid templates
              </a>
              <a className="button button-secondary" href={productLinks.brai}>
                Launch BRAI
              </a>
            </div>
            <div className="hero-proof">
              <span>Dynamic route-backed pages</span>
              <span>Keyword clusters and feature panels</span>
              <span>Claude default, Gemini optional</span>
            </div>
          </div>
          <div className="page-hero__panel">
            <div className="mini-panel">
              <span className="mini-label">Cadence</span>
              <strong>{seoFactorySchedule}</strong>
              <p>Controlled publishing keeps the hub growing without breaking the SaaS product story.</p>
            </div>
            <div className="mini-panel">
              <span className="mini-label">Purpose</span>
              <strong>Research that sells</strong>
              <p>Every post routes into DocStack, BRAI, or TRACR instead of ending as a dead-end article.</p>
            </div>
            <div className="mini-panel">
              <span className="mini-label">Model stance</span>
              <strong>Claude first</strong>
              <p>Gemini stays available for broader expansion, but the default path favors legal precision.</p>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container">
            <div className="section-heading compact-heading">
              <span className="eyebrow">Factory features</span>
              <h2>The hub now behaves like an automatic SEO platform.</h2>
              <p>
                Instead of publishing plain text pages, the system turns each guide into a designed
                product surface with clearer structure, stronger trust signals, and more obvious next steps.
              </p>
            </div>
            <div className="engine-feature-grid">
              {seoFactoryFeatureCards.map((feature) => (
                <article key={feature.title} className="engine-feature-card">
                  <span className="info-card__label">{feature.eyebrow}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </article>
              ))}
            </div>
            <div className="engine-diagram engine-diagram--hub">
              {seoFactoryFlow.map((step, index) => (
                <article key={step.title} className="engine-diagram__step">
                  <span className="engine-step-index">0{index + 1}</span>
                  <strong>{step.step}</strong>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container posts-layout">
            <div className="posts-grid">
              {posts.map((post) => (
                <article key={post.slug} className="post-card">
                  <span className="post-card__eyebrow">{ctaLabels[post.cta_type]}</span>
                  <h3>{post.title}</h3>
                  <p>{post.meta}</p>
                  <div className="card-pills">
                    <span className="card-pill">{post.jurisdiction}</span>
                    <span className="card-pill">{post.reading_time} min read</span>
                  </div>
                  <div className="post-card__footer">
                    <span>Updated {new Date(post.updated_at).toLocaleDateString('en-US')}</span>
                    <Link href={toPagePath(post.slug)}>Read post</Link>
                  </div>
                </article>
              ))}
            </div>
            <aside className="article-rail">
              <div className="info-card">
                <span className="info-card__label">Hub mechanics</span>
                <strong>Dynamic pages, stable product shell</strong>
                <p>
                  Posts are rendered through one premium design layer so the feed feels consistent even as
                  the content set grows automatically.
                </p>
              </div>
              <div className="info-card">
                <span className="info-card__label">Primary CTA</span>
                <strong>Move research into purchase</strong>
                <p>
                  Commercial pages lead to paid templates. Regulatory pages lead to BRAI. Investigation-heavy
                  topics lead into TRACR.
                </p>
              </div>
              <div className="info-card">
                <span className="info-card__label">Need trust context?</span>
                <Link href="/security">Visit the security center</Link>
                <Link href="/faq">Read the FAQ</Link>
                <Link href="/disclaimer">Review the disclaimer</Link>
              </div>
            </aside>
          </div>
        </section>

        <section className="section-shell">
          <div className="container">
            <div className="section-heading compact-heading">
              <span className="eyebrow">Model recommendation</span>
              <h2>Choose Claude for the default lane, keep Gemini as the optional expansion engine.</h2>
              <p>
                The quality bar here is legal, compliance, and conversion-heavy. That makes precision more
                important than raw breadth for the baseline publishing path.
              </p>
            </div>
            <div className="provider-grid">
              {providerChoices.map((provider) => (
                <article key={provider.name} className="provider-card">
                  <span className="info-card__label">Provider</span>
                  <h3>{provider.name}</h3>
                  <p>{provider.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}