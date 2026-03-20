import Link from 'next/link'
import { productCards } from '@/app/lib/site-content'
import { SectionHeading } from '@/app/components/SectionHeading'

export function ProductsSection() {
  return (
    <section id="products" className="section-shell">
      <div className="container">
        <SectionHeading
          eyebrow="Product stack"
          title="Four revenue surfaces, one coherent platform story."
          description="Each offer is framed like a premium SaaS module with a clear buyer, a measurable outcome, and a direct path from intelligence content into conversion."
        />
        <div className="grid-4">
          {productCards.map((card) => {
            const internal = card.href.startsWith('/')

            return (
              <article key={card.name} className="product-card">
                <span className="product-card__eyebrow">{card.eyebrow}</span>
                <h3>{card.name}</h3>
                <p>{card.description}</p>
                <ul className="list-clean">
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {internal ? (
                  <Link className="button button-secondary" href={card.href}>
                    {card.ctaLabel}
                  </Link>
                ) : (
                  <a className="button button-secondary" href={card.href}>
                    {card.ctaLabel}
                  </a>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
