import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://bizlegal-ai.com'),
  title: {
    default: 'BizLegal AI — Legal Intelligence for the Innovation Economy',
    template: '%s | BizLegal AI',
  },
  description: 'Where law meets technology. AI-powered legal intelligence for Web3, real estate and global innovation. Contract templates from $49. Free compliance scanning. Built by lawyers, trusted by founders.',
  keywords: 'legal templates, real estate contracts, AI legal, JV agreement, NDA, compliance, VARA, MiCA, SEC, MAS, DIFC, DFSA, FCA, CSA, FINTRAC, Delaware LLC, blockchain compliance',
  authors: [{ name: 'BizLegal AI' }],
  creator: 'BizLegal AI',
  publisher: 'BizLegal AI',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: 'BizLegal AI — Legal Intelligence for the Innovation Economy',
    description: 'AI-powered legal intelligence for Web3, real estate and global innovation. Compliance scanning, contracts, forensics.',
    url: 'https://bizlegal-ai.com',
    siteName: 'BizLegal AI',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BizLegal AI — Lawyer-Grade Contracts in 60 Seconds',
    description: 'AI legal templates for real estate and cross-border deals. From $49.',
    creator: '@bizlegalai',
  },
  alternates: {
    canonical: 'https://bizlegal-ai.com',
  },
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://bizlegal-ai.com/#org',
      name: 'BizLegal AI',
      url: 'https://bizlegal-ai.com',
      description: 'AI-powered legal platform for contract generation, compliance scanning, and forensic investigation.',
      sameAs: [],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'BizLegal AI Products',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'DocStack — Legal Contract Templates',
            description: 'Lawyer-drafted DOCX + PDF contract templates from $49. Instant download.',
            price: '49',
            priceCurrency: 'USD',
            url: 'https://docstack.bizlegal-ai.com',
          },
          {
            '@type': 'Offer',
            name: 'BRAI — Compliance Scanning',
            description: 'Free AI compliance scan for VARA, MiCA, SEC, MAS regulations.',
            price: '0',
            priceCurrency: 'USD',
            url: 'https://brai.bizlegal-ai.com',
          },
          {
            '@type': 'Offer',
            name: 'TRACR — Forensic Investigation',
            description: 'AI-powered blockchain forensic reports for legal proceedings. $99 per report.',
            price: '99',
            priceCurrency: 'USD',
            url: 'https://tracr.bizlegal-ai.com',
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://bizlegal-ai.com/#website',
      url: 'https://bizlegal-ai.com',
      name: 'BizLegal AI',
      description: 'Legal intelligence hub for real estate, Web3, and global deals.',
      publisher: { '@id': 'https://bizlegal-ai.com/#org' },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://bizlegal-ai.com/guides/{search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much does BizLegal AI cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'DocStack contract templates start from $49 per document. BRAI compliance scanning is free for the first scan, then $49/month for unlimited. TRACR forensic reports are $99 per report.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which jurisdictions are covered?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'BizLegal AI covers UAE (VARA/DFSA/DIFC), European Union (MiCA/ESMA), United States (SEC/CFTC), Singapore (MAS), United Kingdom (FCA), and Canada (CSA/FINTRAC).',
          },
        },
        {
          '@type': 'Question',
          name: 'Are the legal templates legally binding?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. All templates are drafted by a qualified solicitor with LLB + LLM and 20+ years of legal practice covering $100M+ in transactions. They are templates only — not legal advice. Always review with qualified counsel for high-value deals.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Gloock:ital@0;1&family=IBM+Plex+Serif:ital,wght@0,400;0,600;1,600&family=Geist+Mono:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
