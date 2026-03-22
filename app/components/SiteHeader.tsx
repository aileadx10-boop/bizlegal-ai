import Link from 'next/link'

import { founderProfile, navigationLinks, productLinks } from '@/app/lib/site-content'

type SiteHeaderProps = {
  ctaHref?: string
  ctaLabel?: string
}

export function SiteHeader({
  ctaHref = productLinks.brai,
  ctaLabel = 'Start BRAI Scan',
}: SiteHeaderProps) {
  const isExternal = ctaHref.startsWith('http')

  return (
    <header className="site-header">
      <div className="promo-bar">
        <div className="container promo-bar__inner">
          <p>{founderProfile.heroSummary}</p>
          <Link href="/about">View founder profile</Link>
        </div>
      </div>
      <div className="container nav-shell">
        <Link className="brand-mark" href="/">
          <span className="brand-mark__eyebrow">{founderProfile.name}</span>
          <span className="brand-mark__title">BizLegal</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {navigationLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link className="button button-ghost" href="/about">
            About Founder
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
