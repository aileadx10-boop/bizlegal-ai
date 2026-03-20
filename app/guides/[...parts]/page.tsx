import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { SiteFooter } from '@/app/components/SiteFooter'
import { SiteHeader } from '@/app/components/SiteHeader'
import { buildSeoFactoryExperience } from '@/app/lib/seo-factory-experience'
import {
  buildAbsoluteUrl,
  ctaLabels,
  getRelatedSeoPages,
  getSeoPageBySlug,
  toPagePath,
} from '@/app/lib/seo-pages'
import { productLinks } from '@/app/lib/site-content'

type Block =
  | { type: 'h2' | 'h3' | 'p'; content: string }
  | { type: 'ul'; items: string[] }

const ctaMap = {
  docstack: {
    title: 'Move from guide to paid template',
    body: 'Turn this research into a buyer-ready document flow with DocStack.',
    href: productLinks.docstack,
    label: 'Open DocStack',
  },
  brai: {
    title: 'Turn research into compliance execution',
    body: 'Use BRAI to operationalize the regulatory insight in this guide.',
    href: productLinks.brai,
    label: 'Launch BRAI',
  },
  tracr: {
    title: 'Escalate this into an investigation path',
    body: 'TRACR positions complex disputes and tracing work as a premium next step.',
    href: productLinks.tracr,
    label: 'Explore TRACR',
  },
} as const

function parseContent(html: string): Block[] {
  const normalized = html
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n[H2]$1[/H2]\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n[H3]$1[/H3]\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '\n[P]$1[/P]\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '\n[LI]$1[/LI]\n')
    .replace(/<[^>]+>/g, '')

  const lines = normalized.split('\n').map((line) => line.trim()).filter(Boolean)
  const blocks: Block[] = []

  for (const line of lines) {
    const h2 = line.match(/^\[H2\](.*)\[\/H2\]$/)
    const h3 = line.match(/^\[H3\](.*)\[\/H3\]$/)
    const p = line.match(/^\[P\](.*)\[\/P\]$/)
    const li = line.match(/^\[LI\](.*)\[\/LI\]$/)

    if (h2) {
      blocks.push({ type: 'h2', content: h2[1] })
      continue
    }

    if (h3) {
      blocks.push({ type: 'h3', content: h3[1] })
      continue
    }

    if (p) {
      blocks.push({ type: 'p', content: p[1] })
      continue
    }

    if (li) {
      const last = blocks[blocks.length - 1]
      if (last?.type === 'ul') {
        last.items.push(li[1])
      } else {
        blocks.push({ type: 'ul', items: [li[1]] })
      }
    }
  }

  return blocks
}

function extractFaq(blocks: Block[]) {
  const faq: { question: string; answer: string }[] = []
  let inFaq = false
  let currentQuestion = ''
  let answer: string[] = []

  for (const block of blocks) {
    if (block.type === 'h2' && /frequently asked questions/i.test(block.content)) {
      inFaq = true
      continue
    }

    if (!inFaq) {
      continue
    }

    if (block.type === 'h3') {
      if (currentQuestion && answer.length) {
        faq.push({ question: currentQuestion, answer: answer.join(' ') })
      }
      currentQuestion = block.content
      answer = []
      continue
    }

    if (block.type === 'p') {
      answer.push(block.content)
    }

    if (block.type === 'ul') {
      answer.push(block.items.join(' '))
    }
  }

  if (currentQuestion && answer.length) {
    faq.push({ question: currentQuestion, answer: answer.join(' ') })
  }

  return faq
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { parts: string[] } }): Promise<Metadata> {
  const page = await getSeoPageBySlug(`guides/${params.parts.join('/')}`)

  if (!page) {
    return {
      title: 'Guide not found',
      robots: { index: false, follow: false },
    }
  }

  return {
    title: page.title,
    description: page.meta,
    keywords: page.keywords,
    alternates: { canonical: buildAbsoluteUrl(toPagePath(page.slug)) },
    openGraph: {
      title: page.title,
      description: page.meta,
      url: buildAbsoluteUrl(toPagePath(page.slug)),
      type: 'article',
    },
  }
}

export default async function GuidePage({ params }: { params: { parts: string[] } }) {
  const page = await getSeoPageBySlug(`guides/${params.parts.join('/')}`)

  if (!page) {
    notFound()
  }

  const blocks = parseContent(page.content)
  const faq = extractFaq(blocks)
  const cta = ctaMap[page.cta_type] ?? ctaMap.docstack
  const related = await getRelatedSeoPages(page.slug, page.jurisdiction, 3)
  const takeaways = blocks.find((block) => block.type === 'ul')?.items.slice(0, 4) ?? []
  const experience = buildSeoFactoryExperience(page)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.meta,
    url: buildAbsoluteUrl(toPagePath(page.slug)),
    datePublished: page.created_at,
    dateModified: page.updated_at,
    author: { '@type': 'Organization', name: 'BizLegal AI' },
    publisher: { '@type': 'Organization', name: 'BizLegal AI' },
  }

  const faqSchema = faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null

  return (
    <>
      <SiteHeader ctaHref={cta.href} ctaLabel={cta.label} />
      <main className="article-page">
        <div className="container article-layout">
          <article className="article-shell">
            <div className="article-hero">
              <span className="eyebrow">{ctaLabels[page.cta_type]}</span>
              <h1>{page.title}</h1>
              <p>{page.meta}</p>
              <div className="article-meta">
                <span>{page.jurisdiction}</span>
                <span>{page.reading_time} min read</span>
                <span>Updated {formatDate(page.updated_at)}</span>
              </div>
              <div className="keyword-cloud">
                {experience.keywordChips.map((keyword) => (
                  <span key={keyword} className="keyword-chip">
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="engine-metrics">
                {experience.signalMetrics.map((metric) => (
                  <div key={metric.label} className="engine-metric">
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
              </div>
              <div className="article-actions">
                <a className="button button-primary" href={cta.href}>
                  {cta.label}
                </a>
                <Link className="button button-ghost" href="/posts">
                  Back to posts
                </Link>
              </div>
            </div>
            <div className="article-content-shell">
              <section className="engine-overview">
                <div className="section-heading compact-heading">
                  <span className="eyebrow">Dynamic SEO profile</span>
                  <h2>Designed like an auto-SEO product page.</h2>
                  <p>{experience.intro}</p>
                </div>
                <div className="engine-feature-grid">
                  {experience.featurePanels.map((panel) => (
                    <article key={panel.title} className="engine-feature-card">
                      <span className="info-card__label">{panel.eyebrow}</span>
                      <h3>{panel.title}</h3>
                      <p>{panel.body}</p>
                    </article>
                  ))}
                </div>
                <div className="engine-diagram">
                  {experience.diagramSteps.map((step) => (
                    <article key={step.label} className="engine-diagram__step">
                      <span className="engine-step-index">{step.label}</span>
                      <strong>{step.title}</strong>
                      <p>{step.body}</p>
                    </article>
                  ))}
                </div>
              </section>
              <div className="rich-content">
                {blocks.map((block, index) => (
                  <div key={`${block.type}-${index}`}>
                    {block.type === 'h2' ? <h2>{block.content}</h2> : null}
                    {block.type === 'h3' ? <h3>{block.content}</h3> : null}
                    {block.type === 'p' ? <p>{block.content}</p> : null}
                    {block.type === 'ul' ? (
                      <ul>
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    {index === 4 ? (
                      <div className="inline-cta">
                        <span className="info-card__label">Matched workflow</span>
                        <h3>{cta.title}</h3>
                        <p>{cta.body}</p>
                        <a className="button button-secondary" href={cta.href}>
                          {cta.label}
                        </a>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              {related.length ? (
                <section>
                  <div className="section-heading">
                    <span className="eyebrow">Related intelligence</span>
                    <h2>Keep the buyer in flow.</h2>
                    <p>Related posts reinforce jurisdiction depth and keep the commercial journey moving.</p>
                  </div>
                  <div className="related-grid">
                    {related.map((item) => (
                      <article key={item.slug} className="related-card">
                        <span>{item.jurisdiction}</span>
                        <strong>{item.title}</strong>
                        <p>{item.meta}</p>
                        <Link href={toPagePath(item.slug)}>Read post</Link>
                      </article>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </article>
          <aside className="article-rail">
            <div className="article-summary">
              <span className="info-card__label">What this page does</span>
              <h3>{experience.outcomeLabel}</h3>
              <p>{experience.intro}</p>
            </div>
            <div className="info-card">
              <span className="info-card__label">Best matched buyer</span>
              <strong>{experience.buyerLabel}</strong>
              <p>The page is tuned to move serious operators toward a clearer paid or high-value next step.</p>
            </div>
            <div className="info-card">
              <span className="info-card__label">Quick takeaways</span>
              <ul className="list-clean">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="info-card">
              <span className="info-card__label">Keyword cluster</span>
              <div className="keyword-cloud keyword-cloud--compact">
                {experience.keywordChips.map((keyword) => (
                  <span key={keyword} className="keyword-chip">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div className="info-card">
              <span className="info-card__label">Trust links</span>
              <Link href="/security">Security center</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/disclaimer">Disclaimer</Link>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}
    </>
  )
}
