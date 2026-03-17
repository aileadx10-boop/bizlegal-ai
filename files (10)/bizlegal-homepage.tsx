// app/page.tsx
// BizLegal AI — Homepage Redesign
// Stack: Next.js 14 + Tailwind + shadcn/ui
// Drop this file into your app/page.tsx

import Link from "next/link"

const NAV_LINKS = [
  { label: "Guides", href: "#guides" },
  { label: "DocStack", href: "https://docstack.bizlegal-ai.com" },
  { label: "BRAI", href: "https://brai.bizlegal-ai.com" },
  { label: "TRACR", href: "https://tracr.bizlegal-ai.com" },
]

const STATS = [
  { value: "8", label: "Templates" },
  { value: "6", label: "Jurisdictions" },
  { value: "$49", label: "From" },
  { value: "$2k+", label: "Saved vs lawyer" },
]

const PRODUCTS = [
  {
    tag: "LIVE",
    tagColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
    name: "DocStack",
    description: "8 lawyer-drafted real estate templates. JV, NDA, LOI, Capital Call. DOCX + PDF, instant download.",
    price: "From $49",
    href: "https://docstack.bizlegal-ai.com",
    cta: "Browse templates →",
  },
  {
    tag: "BETA",
    tagColor: "text-blue-400 border-blue-400/30 bg-blue-400/5",
    name: "BRAI",
    description: "Blockchain Regulatory Intelligence. Compliance scanning for VARA, MiCA, SEC, MAS projects.",
    price: "Subscription",
    href: "https://brai.bizlegal-ai.com",
    cta: "Run free scan →",
  },
  {
    tag: "SOON",
    tagColor: "text-amber-400 border-amber-400/30 bg-amber-400/5",
    name: "TRACR",
    description: "AI forensic investigation. Wallet tracing, fraud analysis, court-ready reports for lawyers.",
    price: "$99 / report",
    href: "#",
    cta: "Join waitlist →",
  },
]

const JURISDICTIONS = [
  { code: "UAE", sub: "VARA / DIFC", count: 3 },
  { code: "USA", sub: "SEC / Delaware", count: 3 },
  { code: "EU", sub: "MiCA / GDPR", count: 1 },
  { code: "UK", sub: "FCA / Companies Act", count: 1 },
  { code: "SGP", sub: "MAS / ACRA", count: 1 },
  { code: "CAN", sub: "CSA / FINTRAC", count: 1 },
]

const GUIDES = [
  {
    jurisdiction: "UAE / DIFC",
    items: [
      { title: "Joint Venture Agreement for Real Estate in UAE", href: "/guides/uae/joint-venture-agreement-real-estate-uae" },
      { title: "VARA Token Distribution Agreement UAE", href: "/guides/uae/vara-token-distribution-agreement-uae" },
      { title: "NDA for Real Estate Investment in UAE", href: "/guides/uae/nda-real-estate-investment-uae" },
    ]
  },
  {
    jurisdiction: "United States",
    items: [
      { title: "Real Estate LLC Operating Agreement Guide", href: "/guides/united-states/operating-agreement-llc-real-estate" },
      { title: "Capital Call Agreement Real Estate: US Legal Guide", href: "/guides/united-states/capital-call-agreement-real-estate" },
      { title: "Real Estate Joint Venture Agreement Template & Guide", href: "/guides/united-states/joint-venture-agreement-real-estate-us" },
    ]
  },
  {
    jurisdiction: "European Union",
    items: [
      { title: "MiCA Token Sale Agreement Template EU", href: "/guides/european-union/mica-token-sale-agreement-template" },
    ]
  },
  {
    jurisdiction: "United Kingdom",
    items: [
      { title: "Commercial Real Estate LOI Template UK", href: "/guides/united-kingdom/loi-commercial-real-estate-uk" },
    ]
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8] font-sans">
      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* NAV */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/[0.06] max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-white font-mono">
            BizLegal<span className="text-emerald-400">AI</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[12px] font-mono text-[#666] hover:text-white transition-colors tracking-wide"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link
          href="https://docstack.bizlegal-ai.com"
          className="text-[11px] font-mono font-bold tracking-widest uppercase px-4 py-2 bg-white text-black rounded hover:bg-emerald-400 transition-colors"
        >
          Get templates
        </Link>
      </nav>

      {/* HERO */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-emerald-400" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-emerald-400 uppercase">
            Lawyer-drafted · AI-refined · Multi-jurisdiction
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black leading-[1.0] tracking-tight mb-8 max-w-4xl">
          Legal documents
          <br />
          <span className="text-[#333]">for global</span>
          <br />
          <em className="not-italic text-emerald-400">real estate</em>
          <br />
          <span className="text-[#333]">and investment</span>
        </h1>

        <p className="text-[15px] text-[#555] max-w-xl mb-10 leading-relaxed font-mono">
          JV agreements, NDAs, LOIs, capital call agreements — structured for US, UAE, EU, UK,
          Singapore and Canada. Download, fill in, sign.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <Link
            href="https://docstack.bizlegal-ai.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-400 text-black font-mono font-bold text-[13px] tracking-wide rounded hover:bg-emerald-300 transition-colors"
          >
            Browse templates from $49
          </Link>
          <Link
            href="#guides"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-[#888] font-mono text-[13px] tracking-wide rounded hover:border-white/30 hover:text-white transition-colors"
          >
            Read free guides
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.05] rounded-xl overflow-hidden border border-white/[0.05]">
          {STATS.map((s) => (
            <div key={s.label} className="bg-[#0d0d0d] px-6 py-5">
              <div className="text-2xl font-black text-white mb-1">{s.value}</div>
              <div className="text-[11px] font-mono text-[#444] tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-white/[0.05]">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-8 bg-white/20" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#444] uppercase">Products</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {PRODUCTS.map((p) => (
            <div
              key={p.name}
              className="group relative bg-[#0d0d0d] border border-white/[0.06] rounded-xl p-6 hover:border-white/20 transition-all duration-300"
            >
              {/* Tag */}
              <span className={`inline-block text-[10px] font-mono font-bold tracking-[0.2em] px-2 py-0.5 rounded border mb-4 ${p.tagColor}`}>
                {p.tag}
              </span>

              <h3 className="text-xl font-black text-white mb-3">{p.name}</h3>
              <p className="text-[13px] text-[#555] leading-relaxed mb-6 font-mono">{p.description}</p>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-[12px] font-mono text-[#333]">{p.price}</span>
                <Link
                  href={p.href}
                  className="text-[12px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {p.cta}
                </Link>
              </div>

              {/* Hover line */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-emerald-400/0 group-hover:bg-emerald-400/30 transition-all duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* JURISDICTIONS */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-white/[0.05]">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-8 bg-white/20" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#444] uppercase">Jurisdictions</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {JURISDICTIONS.map((j) => (
            <div
              key={j.code}
              className="flex items-center justify-between bg-[#0d0d0d] border border-white/[0.06] rounded-lg px-5 py-4 hover:border-white/15 transition-colors"
            >
              <div>
                <div className="text-[15px] font-black text-white font-mono">{j.code}</div>
                <div className="text-[11px] text-[#444] font-mono mt-0.5">{j.sub}</div>
              </div>
              <div className="text-[11px] font-mono text-[#333]">{j.count} docs</div>
            </div>
          ))}
        </div>
      </section>

      {/* GUIDES */}
      <section id="guides" className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-white/[0.05]">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-8 bg-white/20" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#444] uppercase">Free legal guides</span>
        </div>

        <div className="space-y-10">
          {GUIDES.map((group) => (
            <div key={group.jurisdiction}>
              <div className="text-[11px] font-mono tracking-[0.15em] text-emerald-400/70 uppercase mb-4">
                {group.jurisdiction}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between group py-3 px-4 rounded-lg hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/[0.06]"
                  >
                    <span className="text-[13px] text-[#666] group-hover:text-white transition-colors font-mono">
                      {item.title}
                    </span>
                    <span className="text-[#333] group-hover:text-emerald-400 transition-colors text-[13px] font-mono ml-4 flex-shrink-0">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.05] max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#333] uppercase">
            BizLegal<span className="text-emerald-400">AI</span>
          </span>
          <div className="flex items-center gap-6">
            {["DocStack", "BRAI", "TRACR"].map((name, i) => (
              <Link
                key={name}
                href={
                  i === 0
                    ? "https://docstack.bizlegal-ai.com"
                    : i === 1
                    ? "https://brai.bizlegal-ai.com"
                    : "https://tracr.bizlegal-ai.com"
                }
                className="text-[11px] font-mono text-[#333] hover:text-white transition-colors tracking-wide"
              >
                {name}
              </Link>
            ))}
          </div>
          <span className="text-[11px] font-mono text-[#2a2a2a]">© 2025 BizLegal AI</span>
        </div>
        <p className="text-[10px] font-mono text-[#222] mt-6 leading-relaxed max-w-xl">
          Templates only — not legal advice. No attorney-client relationship is created. Always have qualified counsel review before execution.
        </p>
      </footer>
    </div>
  )
}
