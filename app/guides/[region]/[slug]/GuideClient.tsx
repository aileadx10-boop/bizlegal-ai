'use client'

// app/guides/[region]/[slug]/GuideClient.tsx
// Full dynamic guide page: banners, timeline, comparison table, infographics, CTA

import { useState, useCallback } from 'react'

async function captureLead(email: string, source: string, product?: string) {
  try {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source, page: window.location.pathname, product }),
    })
  } catch { /* fail silently */ }
}

interface JurisdictionData {
  flag: string
  name: string
  regulator: string
  color: string
  stats: { label: string; value: string }[]
  timeline: { step: string; weeks: number }[]
}

interface PageContent {
  intro?: string
  sections?: { heading: string; body: string }[]
  clauses?: string[]
  faq?: { q: string; a: string }[]
}

interface Props {
  page: {
    title: string
    content: PageContent
    cta_type: string
    cta?: string
    jurisdiction: string
    topic: string
    keywords: string[]
    meta?: string
    meta_desc?: string
  }
  jurisdiction: string
  slug: string
  jurisdictionData: JurisdictionData
}

const CTA_CONFIG = {
  docstack: {
    headline: 'Ready to generate this document?',
    sub: 'Lawyer-drafted template. DOCX + PDF in 60 seconds.',
    btn: 'Generate Contract — $49 →',
    href: 'https://docstack.bizlegal-ai.com',
    color: '#7dd3fc',
    bg: 'rgba(125,211,252,0.06)',
    border: 'rgba(125,211,252,0.2)',
  },
  brai: {
    headline: 'Is your project compliant with this regulation?',
    sub: 'Free AI compliance scan. VARA, MiCA, SEC, MAS covered.',
    btn: 'Run Free Scan →',
    href: 'https://brai.bizlegal-ai.com',
    color: '#a5b4fc',
    bg: 'rgba(165,180,252,0.06)',
    border: 'rgba(165,180,252,0.2)',
  },
  tracr: {
    headline: 'Need a forensic investigation report?',
    sub: 'AI-powered wallet tracing. Court-ready PDF. $99 per report.',
    btn: 'Order TRACR Report →',
    href: 'https://tracr.bizlegal-ai.com',
    color: '#5eead4',
    bg: 'rgba(94,234,212,0.06)',
    border: 'rgba(94,234,212,0.2)',
  },
}

export default function GuideClient({ page, jurisdiction, jurisdictionData }: Props) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [leadEmail, setLeadEmail] = useState('')
  const [leadSent, setLeadSent] = useState(false)
  const ctaKey = (page.cta_type ?? page.cta ?? 'docstack') as keyof typeof CTA_CONFIG
  const cta = CTA_CONFIG[ctaKey] ?? CTA_CONFIG.docstack
  const metaText = page.meta ?? page.meta_desc ?? ''

  const submitLead = useCallback(async () => {
    if (!leadEmail.includes('@')) return
    setLeadSent(true)
    await captureLead(leadEmail, 'guide_page', ctaKey)
  }, [leadEmail, ctaKey])

  const jd = jurisdictionData
  const totalWeeks = jd.timeline.reduce((a, b) => a + b.weeks, 0)

  // Parse JSONB content structure
  const content: PageContent = typeof page.content === 'string'
    ? JSON.parse(page.content)
    : (page.content ?? {})

  return (
    <div style={{
      background: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: "'Geist Mono', monospace",
      minHeight: '100vh',
    }}>

      {/* ── TOP CTA BANNER (sticky awareness) ── */}
      <div style={{
        background: 'rgba(4,6,14,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${cta.border}`,
        padding: '12px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        position: 'sticky',
        top: '68px',
        zIndex: 100,
      }}>
        <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
          {jd.flag} <strong style={{ color: jd.color }}>{jd.name}</strong> · {page.title.slice(0, 60)}...
        </div>
        <a href={cta.href} style={{
          padding: '8px 20px',
          borderRadius: '7px',
          background: cta.bg,
          border: `1px solid ${cta.border}`,
          color: cta.color,
          fontFamily: "'Geist Mono', monospace",
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
          textDecoration: 'none',
        }}>
          {cta.btn}
        </a>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 40px 120px' }}>

        {/* ── HERO BANNER ── */}
        <div style={{
          background: `linear-gradient(135deg, rgba(4,6,14,0.9) 0%, ${cta.bg} 100%)`,
          border: `1px solid ${cta.border}`,
          borderRadius: '16px',
          padding: '48px',
          marginBottom: '48px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Jurisdiction badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: '100px',
            border: `1px solid ${cta.border}`,
            background: cta.bg,
            fontSize: '11px',
            color: cta.color,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            {jd.flag} {jd.name} · {jd.regulator}
          </div>

          <h1 style={{
            fontFamily: "'Gloock', serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: '#fff',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            marginBottom: '16px',
          }}>
            {page.title}
          </h1>

          <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '600px', marginBottom: '28px' }}>
            {metaText}
          </p>

          {/* Quick stats row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {jd.stats.map(stat => (
              <div key={stat.label} style={{
                padding: '10px 16px',
                borderRadius: '8px',
                background: 'rgba(4,6,14,0.6)',
                border: '1px solid var(--border)',
              }}>
                <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '3px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '15px', color: '#fff', fontWeight: 600 }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TIMELINE INFOGRAPHIC ── */}
        <div style={{
          border: '1px solid var(--border2)',
          borderRadius: '14px',
          padding: '28px',
          marginBottom: '40px',
          background: 'rgba(7,9,26,0.7)',
        }}>
          <div style={{
            fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--muted)', marginBottom: '20px',
          }}>
            Process Timeline · {totalWeeks} weeks total
          </div>
          <div style={{ display: 'flex', gap: '0', overflow: 'hidden', borderRadius: '8px' }}>
            {jd.timeline.map((item, i) => {
              const pct = (item.weeks / totalWeeks) * 100
              return (
                <div key={i} style={{
                  flex: `${pct}`,
                  padding: '14px 12px',
                  background: i % 2 === 0 ? 'rgba(125,211,252,0.07)' : 'rgba(125,211,252,0.03)',
                  borderRight: i < jd.timeline.length - 1 ? '1px solid var(--border)' : 'none',
                  position: 'relative',
                }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: jd.color,
                    fontFamily: "'Gloock', serif",
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}>
                    {item.weeks}w
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: 1.4 }}>
                    {item.step}
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '3px',
                    background: jd.color,
                    opacity: 0.4 + (i * 0.15),
                  }} />
                </div>
              )
            })}
          </div>
        </div>

        {/* ── MAIN CONTENT (JSONB) ── */}
        <div style={{ marginBottom: '40px' }}>

          {/* Intro paragraph */}
          {content.intro && (
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '28px' }}>
              {content.intro}
            </p>
          )}

          {/* Sections */}
          {(content.sections ?? []).map((section, i) => (
            <div key={i}>
              <h2 style={{
                fontFamily: "'Gloock', serif", fontSize: '26px', color: '#fff',
                marginTop: '40px', marginBottom: '14px', letterSpacing: '-0.01em',
              }}>
                {section.heading}
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '16px' }}>
                {section.body}
              </p>

              {/* Mid-content CTA + lead capture after section 1 */}
              {i === 1 && (
                <>
                  <MidCTABanner cta={cta} />
                  <div style={{
                    margin: '24px 0', padding: '24px 28px', borderRadius: '12px',
                    background: 'rgba(94,234,212,0.04)', border: '1px solid rgba(94,234,212,0.2)',
                  }}>
                    <div style={{ fontSize: '13px', color: '#fff', fontWeight: 600, marginBottom: '4px' }}>
                      Get this template + our full {jurisdictionData.name} legal kit free
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '14px' }}>
                      JV checklist · compliance roadmap · jurisdiction guide
                    </div>
                    {!leadSent ? (
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <input
                          type="email" placeholder="your@email.com"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && submitLead()}
                          style={{
                            flex: 1, minWidth: '180px', padding: '10px 14px',
                            borderRadius: '7px', border: '1px solid var(--border2)',
                            background: 'rgba(4,6,14,0.8)', color: '#fff',
                            fontSize: '12px', fontFamily: "'Geist Mono', monospace", outline: 'none',
                          }}
                        />
                        <button onClick={submitLead} style={{
                          padding: '10px 18px', borderRadius: '7px',
                          background: 'rgba(94,234,212,0.1)', border: '1px solid rgba(94,234,212,0.4)',
                          color: 'var(--teal)', fontFamily: "'Geist Mono', monospace",
                          fontSize: '12px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
                        }}>
                          Get Free Kit →
                        </button>
                      </div>
                    ) : (
                      <div style={{
                        padding: '10px 14px', borderRadius: '7px',
                        background: 'rgba(94,234,212,0.07)', border: '1px solid rgba(94,234,212,0.2)',
                        color: 'var(--teal)', fontSize: '12px', textAlign: 'center',
                      }}>
                        ✓ Legal kit sent to your inbox!
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Key clauses list */}
          {(content.clauses ?? []).length > 0 && (
            <div style={{ marginTop: '32px' }}>
              <h2 style={{
                fontFamily: "'Gloock', serif", fontSize: '26px', color: '#fff',
                marginBottom: '14px', letterSpacing: '-0.01em',
              }}>
                Key Clauses
              </h2>
              <ul style={{ listStyle: 'none', marginBottom: '16px' }}>
                {(content.clauses ?? []).map((clause, j) => (
                  <li key={j} style={{
                    fontSize: '14px', color: 'var(--muted)', padding: '8px 0 8px 20px',
                    borderBottom: '1px solid rgba(125,211,252,0.04)', position: 'relative',
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--teal)', fontSize: '12px' }}>→</span>
                    {clause}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ */}
          {(content.faq ?? []).length > 0 && (
            <div style={{ marginTop: '40px' }}>
              <h2 style={{
                fontFamily: "'Gloock', serif", fontSize: '26px', color: '#fff',
                marginBottom: '20px', letterSpacing: '-0.01em',
              }}>
                Frequently Asked Questions
              </h2>
              {(content.faq ?? []).map((item, k) => (
                <div key={k} style={{
                  marginBottom: '16px', padding: '20px 24px', borderRadius: '10px',
                  background: 'rgba(7,9,26,0.6)', border: '1px solid var(--border)',
                }}>
                  <div style={{ fontSize: '14px', color: '#fff', fontWeight: 600, marginBottom: '8px' }}>
                    {item.q}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.75 }}>
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── JURISDICTION COMPARISON INFOGRAPHIC ── */}
        <ComparisonTable jurisdiction={jurisdiction} color={jd.color} />

        {/* ── BOTTOM CTA ── */}
        <div style={{
          borderRadius: '16px',
          padding: '48px',
          background: cta.bg,
          border: `1px solid ${cta.border}`,
          textAlign: 'center',
          marginTop: '48px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            fontFamily: "'Gloock', serif",
            fontSize: '28px',
            color: '#fff',
            marginBottom: '12px',
          }}>
            {cta.headline}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '28px' }}>
            {cta.sub}
          </div>
          <a href={cta.href} style={{
            display: 'inline-block',
            padding: '14px 36px',
            borderRadius: '8px',
            background: cta.bg,
            border: `1px solid ${cta.color}`,
            color: cta.color,
            fontFamily: "'Geist Mono', monospace",
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}>
            {cta.btn}
          </a>
          <div style={{ fontSize: '11px', color: 'var(--dim)', marginTop: '12px' }}>
            Templates only — not legal advice · Always review with qualified counsel
          </div>
        </div>

      </div>
    </div>
  )
}

// ─── MID-PAGE CTA ────────────────────────────────────────────
function MidCTABanner({ cta }: { cta: typeof CTA_CONFIG.docstack }) {
  return (
    <div style={{
      margin: '32px 0',
      padding: '24px 28px',
      borderRadius: '12px',
      background: cta.bg,
      border: `1px solid ${cta.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
    }}>
      <div>
        <div style={{ fontSize: '14px', color: '#fff', fontWeight: 600, marginBottom: '4px' }}>
          {cta.headline}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{cta.sub}</div>
      </div>
      <a href={cta.href} style={{
        padding: '10px 22px',
        borderRadius: '7px',
        background: cta.bg,
        border: `1px solid ${cta.color}`,
        color: cta.color,
        fontFamily: "'Geist Mono', monospace",
        fontSize: '12px',
        fontWeight: 700,
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        flexShrink: 0,
      }}>
        {cta.btn}
      </a>
    </div>
  )
}

// ─── JURISDICTION COMPARISON TABLE ───────────────────────────
function ComparisonTable({ jurisdiction, color }: { jurisdiction: string; color: string }) {
  const rows = [
    { feature: 'Regulatory framework', uae: 'VARA / DFSA', eu: 'MiCA', us: 'SEC / CFTC', sg: 'MAS / PS Act' },
    { feature: 'Time to license', uae: '6–10 weeks', eu: '3–6 months', us: 'Variable', sg: '3–5 months' },
    { feature: 'Minimum capital', uae: '$50k+', eu: '€150k', us: 'None (Reg D)', sg: 'SGD 250k' },
    { feature: 'Tax advantage', uae: '0% (DIFC)', eu: 'Varies', us: 'None', sg: '17% corp' },
    { feature: 'Common/Civil law', uae: 'Common', eu: 'Civil', us: 'Common', sg: 'Common' },
    { feature: 'English legal system', uae: '✓ DIFC', eu: '~', us: '✓', sg: '✓' },
  ]

  const cols = ['uae', 'eu', 'us', 'sg'] as const
  const colLabels = { uae: '🇦🇪 UAE', eu: '🇪🇺 EU', us: '🇺🇸 USA', sg: '🇸🇬 SGP' }

  return (
    <div style={{
      border: '1px solid var(--border2)',
      borderRadius: '14px',
      overflow: 'hidden',
      marginTop: '40px',
      marginBottom: '40px',
    }}>
      <div style={{
        padding: '16px 24px',
        background: 'rgba(4,6,14,0.8)',
        borderBottom: '1px solid var(--border)',
        fontSize: '11px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
      }}>
        Jurisdiction Comparison
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ background: 'rgba(7,9,26,0.8)' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--muted)', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>
                Feature
              </th>
              {cols.map(col => (
                <th key={col} style={{
                  padding: '12px 16px',
                  textAlign: 'center',
                  color: col === jurisdiction.replace('-', '') || (jurisdiction === 'united-states' && col === 'us') ? color : 'var(--muted)',
                  fontWeight: col === jurisdiction.replace('-', '') ? 700 : 400,
                  borderBottom: '1px solid var(--border)',
                  background: col === jurisdiction.replace('-', '') ? `${color}10` : 'transparent',
                }}>
                  {colLabels[col]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(125,211,252,0.04)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--text)' }}>{row.feature}</td>
                {cols.map(col => (
                  <td key={col} style={{
                    padding: '12px 16px',
                    textAlign: 'center',
                    color: 'var(--muted)',
                    background: col === jurisdiction.replace('-', '') ? `${color}08` : 'transparent',
                  }}>
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

