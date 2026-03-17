'use client'

// app/guides/[region]/[slug]/GuideClient.tsx
// Full dynamic guide page: banners, timeline, comparison table, infographics, CTA

import { useState } from 'react'

interface JurisdictionData {
  flag: string
  name: string
  regulator: string
  color: string
  stats: { label: string; value: string }[]
  timeline: { step: string; weeks: number }[]
}

interface Props {
  page: {
    title: string
    content: string
    cta_type: string
    jurisdiction: string
    topic: string
    keywords: string[]
    meta: string
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
  const cta = CTA_CONFIG[page.cta_type as keyof typeof CTA_CONFIG] ?? CTA_CONFIG.docstack
  const jd = jurisdictionData
  const totalWeeks = jd.timeline.reduce((a, b) => a + b.weeks, 0)

  // Parse content into sections
  const sections = parseContent(page.content)

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
            {page.meta}
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

        {/* ── MAIN CONTENT ── */}
        <div style={{ marginBottom: '40px' }}>
          {sections.map((section, i) => (
            <div key={i}>
              {section.type === 'h2' && (
                <h2 style={{
                  fontFamily: "'Gloock', serif",
                  fontSize: '26px',
                  color: '#fff',
                  marginTop: '40px',
                  marginBottom: '14px',
                  letterSpacing: '-0.01em',
                }}>
                  {section.content}
                </h2>
              )}
              {section.type === 'h3' && (
                <h3 style={{
                  fontSize: '16px',
                  color: 'var(--sky)',
                  marginTop: '28px',
                  marginBottom: '10px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  fontFamily: "'Geist Mono', monospace",
                }}>
                  {section.content}
                </h3>
              )}
              {section.type === 'p' && (
                <p style={{
                  fontSize: '15px',
                  color: 'var(--muted)',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                }}>
                  {section.content}
                </p>
              )}
              {section.type === 'ul' && (
                <ul style={{ listStyle: 'none', marginBottom: '16px' }}>
                  {section.items?.map((item, j) => (
                    <li key={j} style={{
                      fontSize: '14px',
                      color: 'var(--muted)',
                      padding: '6px 0 6px 20px',
                      borderBottom: '1px solid rgba(125,211,252,0.04)',
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute', left: 0,
                        color: 'var(--teal)', fontSize: '12px',
                      }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* ── MID-PAGE CTA BANNER (after section 2) ── */}
              {i === 2 && (
                <MidCTABanner cta={cta} />
              )}
            </div>
          ))}
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

// ─── CONTENT PARSER ──────────────────────────────────────────
function parseContent(html: string) {
  const sections: any[] = []
  const div = html
    .replace(/<h2>/gi, '\n[H2]')
    .replace(/<\/h2>/gi, '[/H2]\n')
    .replace(/<h3>/gi, '\n[H3]')
    .replace(/<\/h3>/gi, '[/H3]\n')
    .replace(/<p>/gi, '\n[P]')
    .replace(/<\/p>/gi, '[/P]\n')
    .replace(/<li>/gi, '\n[LI]')
    .replace(/<\/li>/gi, '[/LI]\n')
    .replace(/<\/?[^>]+>/gi, '')

  const lines = div.split('\n').filter(l => l.trim())

  for (const line of lines) {
    const h2 = line.match(/\[H2\](.*?)\[\/H2\]/)
    const h3 = line.match(/\[H3\](.*?)\[\/H3\]/)
    const p  = line.match(/\[P\](.*?)\[\/P\]/)
    const li = line.match(/\[LI\](.*?)\[\/LI\]/)

    if (h2) sections.push({ type: 'h2', content: h2[1] })
    else if (h3) sections.push({ type: 'h3', content: h3[1] })
    else if (p && p[1].trim()) sections.push({ type: 'p', content: p[1] })
    else if (li) {
      const last = sections[sections.length - 1]
      if (last?.type === 'ul') last.items.push(li[1])
      else sections.push({ type: 'ul', items: [li[1]] })
    }
  }

  return sections
}
