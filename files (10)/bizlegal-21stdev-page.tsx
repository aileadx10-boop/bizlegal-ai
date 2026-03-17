// ============================================================
// BIZLEGAL AI — Homepage with 21st.dev components
// app/page.tsx
// ============================================================
//
// STEP 1 — Install these components first (run in terminal):
//
// npx shadcn@latest add "https://21st.dev/r/ibelick/background-gradient-animation"
// npx shadcn@latest add "https://21st.dev/r/aceternity/navbar-menu"
// npx shadcn@latest add "https://21st.dev/r/magicui/animated-gradient-text"
// npx shadcn@latest add "https://21st.dev/r/magicui/number-ticker"
// npx shadcn@latest add "https://21st.dev/r/aceternity/card-hover-effect"
// npx shadcn@latest add "https://21st.dev/r/magicui/shine-border"
// npx shadcn@latest add "https://21st.dev/r/magicui/word-rotate"
// npx shadcn@latest add "https://21st.dev/r/aceternity/text-generate-effect"
//
// STEP 2 — Drop this file into app/page.tsx
// ============================================================

"use client"

import Link from "next/link"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { NumberTicker } from "@/components/ui/number-ticker"
import { HoverEffect } from "@/components/ui/card-hover-effect"
import { ShineBorder } from "@/components/ui/shine-border"
import { WordRotate } from "@/components/ui/word-rotate"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

// ─── DATA ────────────────────────────────────────────────────

const PRODUCTS = [
  {
    title: "DocStack",
    description:
      "8 lawyer-drafted real estate templates. JV, NDA, LOI, Capital Call. DOCX + PDF, instant download.",
    link: "https://docstack.bizlegal-ai.com",
    tag: "LIVE · From $49",
  },
  {
    title: "BRAI",
    description:
      "Blockchain Regulatory Intelligence. Compliance scanning for VARA, MiCA, SEC, MAS projects instantly.",
    link: "https://brai.bizlegal-ai.com",
    tag: "BETA · Subscription",
  },
  {
    title: "TRACR",
    description:
      "AI forensic investigation. Wallet tracing, fraud analysis, court-ready reports for lawyers.",
    link: "https://tracr.bizlegal-ai.com",
    tag: "SOON · $99/report",
  },
]

const STATS = [
  { value: 8,    suffix: "",    label: "Templates" },
  { value: 6,    suffix: "",    label: "Jurisdictions" },
  { value: 49,   suffix: "$",   label: "Starting price" },
  { value: 2000, suffix: "$",   label: "Saved vs lawyer" },
]

const GUIDES = [
  {
    region: "UAE / DIFC",
    items: [
      { title: "Joint Venture Agreement for Real Estate in UAE", href: "/guides/uae/joint-venture-agreement-real-estate-uae" },
      { title: "VARA Token Distribution Agreement UAE", href: "/guides/uae/vara-token-distribution-agreement-uae" },
      { title: "NDA for Real Estate Investment in UAE", href: "/guides/uae/nda-real-estate-investment-uae" },
    ],
  },
  {
    region: "United States",
    items: [
      { title: "Real Estate LLC Operating Agreement Guide", href: "/guides/united-states/operating-agreement-llc-real-estate" },
      { title: "Capital Call Agreement Real Estate: US Legal Guide", href: "/guides/united-states/capital-call-agreement-real-estate" },
      { title: "Real Estate JV Agreement Template", href: "/guides/united-states/joint-venture-agreement-real-estate-us" },
    ],
  },
  {
    region: "European Union",
    items: [
      { title: "MiCA Token Sale Agreement Template EU", href: "/guides/european-union/mica-token-sale-agreement-template" },
    ],
  },
  {
    region: "United Kingdom",
    items: [
      { title: "Commercial Real Estate LOI Template UK", href: "/guides/united-kingdom/loi-commercial-real-estate-uk" },
    ],
  },
  {
    region: "Singapore / MAS",
    items: [
      { title: "Capital Call Agreement Singapore", href: "/guides/singapore/capital-call-agreement-singapore" },
    ],
  },
  {
    region: "Canada",
    items: [
      { title: "Joint Venture Agreement Real Estate Canada", href: "/guides/canada/joint-venture-agreement-real-estate-canada" },
    ],
  },
]

// ─── PAGE ────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase">
            BizLegal<span className="text-emerald-400">AI</span>
          </span>
          <div className="hidden items-center gap-8 md:flex">
            {["Guides", "DocStack", "BRAI", "TRACR"].map((item, i) => (
              <Link
                key={item}
                href={
                  i === 0 ? "#guides"
                  : i === 1 ? "https://docstack.bizlegal-ai.com"
                  : i === 2 ? "https://brai.bizlegal-ai.com"
                  : "https://tracr.bizlegal-ai.com"
                }
                className="font-mono text-[11px] text-zinc-500 transition-colors hover:text-white"
              >
                {item}
              </Link>
            ))}
          </div>
          <Link
            href="https://docstack.bizlegal-ai.com"
            className="rounded bg-white px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-emerald-400"
          >
            Get templates
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      {/* BackgroundGradientAnimation wraps the hero for ambient effect */}
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(0,0,0)"
        gradientBackgroundEnd="rgb(5,10,5)"
        firstColor="18, 200, 80"
        secondColor="0, 80, 30"
        thirdColor="0, 0, 0"
        fourthColor="10, 40, 20"
        fifthColor="0, 0, 0"
        pointerColor="20, 180, 70"
        size="80%"
        blendingValue="hard-light"
        className="min-h-[85vh]"
      >
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-24">
          {/* Eyebrow — AnimatedGradientText from 21st.dev */}
          <div className="mb-8">
            <AnimatedGradientText>
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase">
                Lawyer-drafted · AI-refined · Multi-jurisdiction
              </span>
            </AnimatedGradientText>
          </div>

          {/* Headline — WordRotate on the key noun */}
          <h1 className="mb-6 max-w-4xl text-5xl font-black leading-[1.0] tracking-tight md:text-7xl">
            Legal documents
            <br />
            <span className="text-zinc-700">for global</span>
            <br />
            <WordRotate
              className="text-emerald-400 italic"
              words={["real estate", "investment", "Web3 deals", "cross-border"]}
            />
            <br />
            <span className="text-zinc-700">and beyond</span>
          </h1>

          {/* Subtext — TextGenerateEffect for impact */}
          <div className="mb-10 max-w-xl">
            <TextGenerateEffect
              words="JV agreements, NDAs, LOIs, capital call agreements — structured for US, UAE, EU, UK, Singapore and Canada. Download, fill in, sign."
              className="font-mono text-sm text-zinc-500"
            />
          </div>

          {/* CTAs */}
          <div className="mb-20 flex flex-wrap gap-4">
            <Link
              href="https://docstack.bizlegal-ai.com"
              className="rounded bg-emerald-400 px-6 py-3 font-mono text-[13px] font-bold text-black transition-colors hover:bg-emerald-300"
            >
              Browse templates from $49
            </Link>
            <Link
              href="#guides"
              className="rounded border border-white/10 px-6 py-3 font-mono text-[13px] text-zinc-500 transition-all hover:border-white/30 hover:text-white"
            >
              Read free guides
            </Link>
          </div>

          {/* Stats — NumberTicker from 21st.dev */}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.03] md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-black/80 px-6 py-5 backdrop-blur">
                <div className="mb-1 text-2xl font-black text-white">
                  {s.suffix}
                  <NumberTicker value={s.value} />
                  {s.value === 2000 ? "+" : ""}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-700">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </BackgroundGradientAnimation>

      {/* ── PRODUCTS ── */}
      {/* HoverEffect cards from aceternity via 21st.dev */}
      <section className="border-t border-white/[0.05] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex items-center gap-3">
            <div className="h-px w-8 bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-700">
              Products
            </span>
          </div>
          {/* HoverEffect renders cards with animated spotlight */}
          <HoverEffect items={PRODUCTS} />
        </div>
      </section>

      {/* ── JURISDICTIONS — ShineBorder cards ── */}
      <section className="border-t border-white/[0.05] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex items-center gap-3">
            <div className="h-px w-8 bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-700">
              Jurisdictions
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              { code: "UAE", sub: "VARA / DIFC",         count: 3 },
              { code: "USA", sub: "SEC / Delaware",       count: 3 },
              { code: "EU",  sub: "MiCA / GDPR",          count: 1 },
              { code: "UK",  sub: "FCA / Companies Act",  count: 1 },
              { code: "SGP", sub: "MAS / ACRA",           count: 1 },
              { code: "CAN", sub: "CSA / FINTRAC",        count: 1 },
            ].map((j) => (
              // ShineBorder adds animated gradient border on hover
              <ShineBorder
                key={j.code}
                className="flex items-center justify-between rounded-xl bg-zinc-950 p-5"
                color={["#4ade80", "#22c55e", "#16a34a"]}
                borderWidth={1}
              >
                <div>
                  <div className="font-mono text-[15px] font-black text-white">
                    {j.code}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-zinc-700">
                    {j.sub}
                  </div>
                </div>
                <div className="font-mono text-[10px] text-zinc-800">
                  {j.count} doc{j.count > 1 ? "s" : ""}
                </div>
              </ShineBorder>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUIDES ── */}
      <section id="guides" className="border-t border-white/[0.05] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex items-center gap-3">
            <div className="h-px w-8 bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-700">
              Free legal guides
            </span>
          </div>
          <div className="space-y-10">
            {GUIDES.map((group) => (
              <div key={group.region}>
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400/60">
                  {group.region}
                </div>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-center justify-between rounded-lg border border-transparent px-4 py-3 transition-all hover:border-white/[0.06] hover:bg-white/[0.02]"
                    >
                      <span className="font-mono text-[12px] text-zinc-600 transition-colors group-hover:text-white">
                        {item.title}
                      </span>
                      <span className="ml-4 flex-shrink-0 font-mono text-[12px] text-zinc-800 transition-colors group-hover:text-emerald-400">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.05] py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-6">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-800">
              BizLegal<span className="text-emerald-400">AI</span>
            </span>
            <div className="flex gap-6">
              {[
                ["DocStack", "https://docstack.bizlegal-ai.com"],
                ["BRAI",     "https://brai.bizlegal-ai.com"],
                ["TRACR",    "https://tracr.bizlegal-ai.com"],
              ].map(([name, href]) => (
                <Link
                  key={name}
                  href={href}
                  className="font-mono text-[11px] text-zinc-800 transition-colors hover:text-white"
                >
                  {name}
                </Link>
              ))}
            </div>
            <span className="font-mono text-[11px] text-zinc-900">© 2025 BizLegal AI</span>
          </div>
          <p className="font-mono text-[10px] leading-relaxed text-zinc-900">
            Templates only — not legal advice. No attorney-client relationship is created.
            Always have qualified counsel review before execution.
          </p>
        </div>
      </footer>

    </div>
  )
}
