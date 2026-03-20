import Link from 'next/link'

import { navigationLinks, productLinks, seoFactorySchedule } from '@/app/lib/site-content'

type SiteHeaderProps = {
  ctaHref?: string
  ctaLabel?: string
}

export function SiteHeader({
  ctaHref = productLinks.docstack,
  ctaLabel = 'Launch DocStack',
}: SiteHeaderProps) {
  const isExternal = ctaHref.startsWith('http')

  return (
    <header className="site-header">
      <div className="promo-bar">
        <div className="container promo-bar__inner">
          <p>SEO Factory is scheduled for 10 new pages every {seoFactorySchedule}.</p>
          <Link href="/posts">Open blog and posts</Link>
        </div>
      </div>
      <div className="container nav-shell">
        <Link className="brand-mark" href="/">
          <span className="brand-mark__eyebrow">Luxury legal intelligence SaaS</span>
          <span className="brand-mark__title">BizLegal AI</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {navigationLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link className="button button-ghost" href="/posts">
            Blog / Posts
          </Link>
          {isExternal ? (
            <a className="button button-primary" href={ctaHref}>
              {ctaLabel}
            </a>
          ) : (
            <Link className="button button-primary" href={ctaHref}>
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
