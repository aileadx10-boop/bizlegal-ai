import Link from 'next/link'

import { featuredGuides, legalLinks, productLinks } from '@/app/lib/site-content'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="brand-mark__eyebrow">Revenue-focused legal intelligence</span>
          <h2>BizLegal AI</h2>
          <p>
            Productized legal templates, compliance workflows, and intelligence-led conversion pages
            for operators moving across jurisdictions.
          </p>
        </div>
        <div>
          <h3>Products</h3>
          <a href={productLinks.docstack}>DocStack</a>
          <a href={productLinks.brai}>BRAI</a>
          <a href={productLinks.tracr}>TRACR</a>
          <Link href="/posts">Intelligence Hub</Link>
        </div>
        <div>
          <h3>Featured posts</h3>
          {featuredGuides.slice(0, 4).map((guide) => (
            <Link key={guide.href} href={guide.href}>
              {guide.title}
            </Link>
          ))}
        </div>
        <div>
          <h3>Trust</h3>
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <p>Templates, compliance workflows, and intelligence assets only. Not legal advice.</p>
        <p>Manual Vercel deployment supported. GitHub-ready publishing workflow included.</p>
      </div>
    </footer>
  )
}
