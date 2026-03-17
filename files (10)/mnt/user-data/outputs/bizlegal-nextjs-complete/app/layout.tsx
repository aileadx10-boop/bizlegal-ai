import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BizLegal AI — Generate Lawyer-Grade Contracts in 60 Seconds',
  description: 'AI legal templates for real estate, Web3 and global deals. Download DOCX + PDF instantly. Built on 20 years of legal practice. From $49.',
  keywords: 'legal templates, real estate contracts, AI legal, JV agreement, NDA, compliance, VARA, MiCA, SEC',
  openGraph: {
    title: 'BizLegal AI — Lawyer-Grade Contracts in 60 Seconds',
    description: 'AI legal templates for real estate and cross-border deals. From $49.',
    url: 'https://www.bizlegal-ai.com',
    siteName: 'BizLegal AI',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Gloock:ital@0;1&family=IBM+Plex+Serif:ital,wght@0,400;0,600;1,600&family=Geist+Mono:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
