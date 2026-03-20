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
    default: 'BizLegal AI | Revenue-focused legal intelligence SaaS',
    template: '%s | BizLegal AI',
  },
  description:
    'Premium legal intelligence workflows for contract generation, compliance research, and high-conversion cross-border deal execution.',
  applicationName: 'BizLegal AI',
  keywords: [
    'legal intelligence platform',
    'AI legal templates',
    'compliance intelligence',
    'cross-border deals',
    'legal SaaS',
    'contract automation',
  ],
  openGraph: {
    title: 'BizLegal AI',
    description:
      'A premium SaaS hub for legal templates, compliance intelligence, and revenue-focused research workflows.',
    url: 'https://www.bizlegal-ai.com',
    siteName: 'BizLegal AI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BizLegal AI',
    description:
      'Luxury legal intelligence SaaS for templates, compliance research, and cross-border execution.',
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
