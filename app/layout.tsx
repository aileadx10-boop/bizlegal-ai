import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TRACR — Blockchain Forensic Intelligence',
  description: '48-hour on-chain evidence for legal proceedings. Attorney-ready, court-formatted forensic reports. No blockchain expertise required.',
  keywords: 'blockchain forensics, crypto wallet tracing, on-chain investigation, crypto litigation, AML analysis',
  openGraph: {
    title: 'TRACR — Blockchain Forensic Intelligence',
    description: '48-hour on-chain evidence for legal proceedings. Attorney-ready, court-formatted forensic reports.',
    type: 'website',
    url: 'https://tracr.bizlegal-ai.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
