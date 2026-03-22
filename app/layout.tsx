import type { Metadata } from 'next'
import { Cormorant_Garamond, IBM_Plex_Mono, Manrope } from 'next/font/google'

import './globals.css'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
})

const sans = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bizlegal-ai.com'),
  title: {
    default: 'BizLegal | Boutique Regulatory Intelligence & AI-Driven Risk Analysis',
    template: '%s | BizLegal',
  },
  description:
    'Commercial attorney | Entrepreneur | Digital asset regulatory intelligence. Founder of DOR INNOVATIONS. AI-assisted crypto risk analysis with UAE focus.',
  applicationName: 'BizLegal',
  keywords: [
    'digital asset regulatory intelligence',
    'UAE crypto regulatory risk intelligence',
    'VARA exposure analysis',
    'ADGM exposure analysis',
    'AI-assisted risk assessment',
    'commercial attorney digital assets',
  ],
  openGraph: {
    title: 'BizLegal',
    description:
      'Boutique regulatory intelligence and AI-driven risk analysis for digital asset ventures operating in complex jurisdictions.',
    url: 'https://www.bizlegal-ai.com',
    siteName: 'BizLegal',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BizLegal',
    description:
      'Commercial attorney and entrepreneur. AI-assisted crypto risk analysis with UAE focus.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
