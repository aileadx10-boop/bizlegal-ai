import type { Metadata } from 'next'
import Link from 'next/link'

import { SiteFooter } from '@/app/components/SiteFooter'
import { SiteHeader } from '@/app/components/SiteHeader'
import { ctaLabels, getPublishedSeoPages, toPagePath } from '@/app/lib/seo-pages'
import { productLinks, seoFactorySchedule } from '@/app/lib/site-content'

export const metadata: Metadata = {
  title: 'Intelligence Hub | Blog and Posts',
  description:
    'Browse productized legal intelligence posts designed to convert into templates, compliance workflows, and premium investigations.',
}

export default async function PostsPage() {
  const posts = await getPublishedSeoPages(18)

  return (
    <>
      <SiteHeader ctaHref={productLinks.docstack} ctaLabel="Start with DocStack" />
      <main className="page-hero">
        <section className="container page-hero-grid">
          <div>
            <span className="eyebrow">Blog, posts, and research hub</span>
            <h1>Every post is designed like a product entry point.</h1>
            <p>
              The SEO factory feeds this hub three times a week, publishing 10 productized pages per
              run. Each article is paired to a commercial next step so search traffic compounds into
              revenue instead of drifting away.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={productLinks.docstack}>
                Open paid templates
              </a>
              <a className="button button-secondary" href={productLinks.brai}>
                Launch BRAI
              </a>
            </div>
          </div>
          <div className="page-hero__panel">
            <div className="mini-panel">
              <span className="mini-label">Cadence</span>
              <strong>{seoFactorySchedule}</strong>
              <p>Scheduled publishing keeps the intelligence hub growing without breaking the product story.</p>
            </div>
            <div className="mini-panel">
              <span className="mini-label">Purpose</span>
              <strong>Research that sells</strong>
              <p>Every post routes into DocStack, BRAI, or TRACR instead of ending as a dead-end blog page.</p>
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
                <strong>10 fresh pages per run</strong>
                <p>
                  Publishing batches are automated, idempotent, and routed through a single intelligence
                  design system so the feed feels premium at scale.
                </p>
              </div>
              <div className="info-card">
                <span className="info-card__label">Primary CTA</span>
                <strong>Move research into purchase</strong>
                <p>
                  The most commercial pages lead to paid templates. Regulatory pages lead to BRAI.
                  Investigation-heavy topics can lead into TRACR.
                </p>
              </div>
              <div className="info-card">
                <span className="info-card__label">Need trust context?</span>
                <Link href="/security">Visit the security center</Link>
                <Link href="/faq">Read the FAQ</Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
