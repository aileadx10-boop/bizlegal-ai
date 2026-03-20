import type { Metadata } from 'next'

import { LegalPageShell } from '@/app/components/LegalPageShell'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Commercial and platform terms for using BizLegal AI websites and products.',
}

const sections = [
  {
    title: 'Scope of service',
    body: [
      'BizLegal AI provides software, templates, intelligence content, workflow tooling, and related commercial materials for informational and operational use.',
      'Access to the site or product surfaces does not create an attorney-client relationship, fiduciary relationship, or legal representation arrangement.',
    ],
  },
  {
    title: 'User responsibilities',
    body: [
      'Users are responsible for reviewing outputs, validating jurisdiction-specific needs, and obtaining qualified professional advice where required.',
      'You must not use the platform in a way that is unlawful, abusive, infringing, or disruptive to the service or other users.',
    ],
    bullets: [
      'Do not submit unlawful or infringing content.',
      'Do not attempt to reverse engineer or disrupt the platform.',
      'Do not rely on templates or intelligence content as a substitute for licensed legal counsel.',
    ],
  },
  {
    title: 'Commercial terms and liability limits',
    body: [
      'Product pricing, subscriptions, and service availability may change over time. Separate commercial terms may apply to paid engagements or custom scopes of work.',
      'To the maximum extent permitted by law, BizLegal AI disclaims indirect, consequential, special, and incidental damages arising from use of the platform or content.',
    ],
  },
] as const

export default function TermsPage() {
  return (
    <LegalPageShell
      eyebrow="Terms of use"
      title="Clear terms for a high-trust SaaS experience."
      description="These terms govern access to the BizLegal AI site, product surfaces, and intelligence content."
      updatedLabel="March 20, 2026"
      sections={sections}
    />
  )
}
