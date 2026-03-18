import type { Metadata } from 'next'
import './globals.css'
import MarketTicker from '@/components/MarketTicker'

export const metadata: Metadata = {
  metadataBase: new URL('https://bizlegal-ai.com'),
  title: {
    default: 'DOR INNOVATIONS — Regulatory Risk Intelligence for Digital Asset Ventures',
    template: '%s | DOR INNOVATIONS',
  },
  description: 'Boutique AI-driven regulatory risk intelligence for digital asset ventures. Commercial attorney & entrepreneur with UAE/DIFC focus. VARA, MiCA, SEC compliance analysis powered by Claude AI.',
  keywords: 'DOR INNOVATIONS, digital asset regulatory intelligence, VARA compliance, crypto regulation UAE, DIFC legal, MiCA compliance, blockchain risk analysis, digital asset ventures, AI regulatory risk, commercial attorney UAE, crypto lawyer, regulatory intelligence, web3 compliance, token issuance UAE, digital asset lawyer',
  authors: [{ name: 'DOR INNOVATIONS' }],
  creator: 'DOR INNOVATIONS',
  publisher: 'DOR INNOVATIONS',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: 'DOR INNOVATIONS — Regulatory Risk Intelligence for Digital Asset Ventures',
    description: 'AI-driven regulatory risk intelligence. Commercial attorney & entrepreneur. UAE/DIFC focus. VARA, MiCA, SEC compliance. Free risk scan.',
    url: 'https://bizlegal-ai.com',
    siteName: 'DOR INNOVATIONS',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOR INNOVATIONS — AI Regulatory Risk Intelligence',
    description: 'Boutique regulatory intelligence for digital asset ventures. UAE focus. VARA, MiCA, SEC. Free compliance scan.',
    creator: '@dorinnovations',
  },
  alternates: {
    canonical: 'https://bizlegal-ai.com',
    languages: {
      'en': 'https://bizlegal-ai.com',
      'pt': 'https://bizlegal-ai.com?lang=pt',
      'es': 'https://bizlegal-ai.com?lang=es',
    },
  },
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://bizlegal-ai.com/#org',
      name: 'DOR INNOVATIONS',
      url: 'https://bizlegal-ai.com',
      description: 'Boutique regulatory intelligence & AI-driven risk analysis for digital asset ventures operating in complex jurisdictions.',
      sameAs: [],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'DOR INNOVATIONS Products',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'DocStack — Legal Contract Templates',
            description: 'Commercial attorney-drafted DOCX + PDF contract templates from $49. Instant download.',
            price: '49',
            priceCurrency: 'USD',
            url: 'https://docstack.bizlegal-ai.com',
          },
          {
            '@type': 'Offer',
            name: 'BRAI — Regulatory Risk Intelligence',
            description: 'Free AI regulatory scan for VARA, MiCA, SEC, MAS digital asset ventures.',
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
      name: 'DOR INNOVATIONS',
      description: 'Regulatory risk intelligence for digital asset ventures. UAE/DIFC focus.',
      publisher: { '@id': 'https://bizlegal-ai.com/#org' },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://bizlegal-ai.com/guides/{search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://bizlegal-ai.com/#founder',
      name: 'Founder, DOR INNOVATIONS',
      jobTitle: 'Commercial Attorney & Entrepreneur',
      description: 'Commercial attorney, entrepreneur, and founder of DOR INNOVATIONS. Specialises in digital asset regulatory intelligence with UAE/DIFC focus. AI-assisted crypto risk analysis.',
      worksFor: { '@id': 'https://bizlegal-ai.com/#org' },
      knowsAbout: ['Digital Asset Regulation', 'VARA Compliance', 'MiCA', 'Crypto Law UAE', 'Commercial Law', 'Cross-border Regulatory Analysis', 'AI Risk Assessment'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What does DOR INNOVATIONS do?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'DOR INNOVATIONS provides structured regulatory risk intelligence for digital asset ventures operating in complex jurisdictions. We operate at the intersection of commercial legal strategy, cross-border regulatory analysis, and AI-assisted risk assessment. UAE/DIFC primary focus.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which jurisdictions does DOR INNOVATIONS cover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Primary focus: UAE (VARA/DFSA/DIFC). Also covering: European Union (MiCA/ESMA), United States (SEC/CFTC), Singapore (MAS), United Kingdom (FCA), and Canada (CSA/FINTRAC).',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does regulatory risk intelligence cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Free AI risk scan via BRAI. DocStack legal templates from $49. TRACR forensic reports from $99. Full regulatory intelligence engagement available on request.',
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
      <body>
        <MarketTicker />
        {children}
      </body>
    </html>
  )
}
