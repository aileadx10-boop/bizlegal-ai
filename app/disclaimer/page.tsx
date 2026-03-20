import type { Metadata } from 'next'

import { LegalPageShell } from '@/app/components/LegalPageShell'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Important legal and operational boundaries for BizLegal AI content and products.',
}

const sections = [
  {
    title: 'No legal advice',
    body: [
      'BizLegal AI provides templates, automation, workflow support, and informational intelligence. Nothing on the site should be treated as legal advice for your specific matter.',
      'Legal outcomes depend on jurisdiction, deal facts, counterparties, regulators, and qualified professional review.',
    ],
  },
  {
    title: 'No attorney-client relationship',
    body: [
      'Using the site, reading a guide, downloading a template, or submitting an inquiry does not create an attorney-client relationship.',
      'You should consult qualified legal counsel before relying on any template, workflow output, or strategic interpretation in a live matter.',
    ],
  },
  {
    title: 'Use at your own risk',
    body: [
      'BizLegal AI makes no guarantee that any page, template, or workflow is complete for every jurisdiction or factual scenario.',
      'Users are responsible for independent validation, commercial diligence, and legal review before execution or regulatory reliance.',
    ],
  },
] as const

export default function DisclaimerPage() {
  return (
    <LegalPageShell
      eyebrow="Disclaimer"
      title="Strong commercial positioning. Clear legal boundaries."
      description="This disclaimer clarifies what BizLegal AI does, and just as importantly, what it does not do."
      updatedLabel="March 20, 2026"
      sections={sections}
    />
  )
}
