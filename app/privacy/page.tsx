import type { Metadata } from 'next'

import { LegalPageShell } from '@/app/components/LegalPageShell'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How BizLegal AI handles website, product, and operational data.',
}

const sections = [
  {
    title: 'What we collect',
    body: [
      'BizLegal AI may collect contact details, usage data, inquiry content, and workflow inputs that are required to operate the website and product surfaces.',
      'We only keep the information needed to deliver the relevant service, maintain the platform, improve product performance, and respond to commercial or support requests.',
    ],
    bullets: [
      'Contact and account information you submit directly.',
      'Operational usage data tied to website visits and workflow actions.',
      'Communications, support requests, and product feedback.',
    ],
  },
  {
    title: 'How we use information',
    body: [
      'Information is used to deliver services, improve the user experience, operate the publishing workflow, secure the platform, and communicate about product usage or support.',
      'We do not frame this site as a law firm intake portal, and users should avoid submitting confidential legal matter details unless a specific engagement requires it.',
    ],
  },
  {
    title: 'Data sharing and retention',
    body: [
      'Data may be processed through infrastructure and service providers that support hosting, analytics, publishing, and platform delivery.',
      'We retain information for as long as reasonably necessary to operate the platform, comply with legal obligations, resolve disputes, or protect the business.',
    ],
  },
] as const

export default function PrivacyPage() {
  return (
    <LegalPageShell
      eyebrow="Privacy policy"
      title="Privacy built for a productized legal platform."
      description="This policy explains how BizLegal AI collects, uses, and protects website and platform data."
      updatedLabel="March 20, 2026"
      sections={sections}
    />
  )
}
