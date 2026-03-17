// app/guides/[region]/[slug]/page.tsx
// Dynamic guide page with infographics, banners, charts
// Reads from Supabase seo_pages table + generates visual elements

import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import GuideClient from './GuideClient'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function generateMetadata({ params }: {
  params: { region: string; slug: string }
}): Promise<Metadata> {
  const { data } = await sb
    .from('seo_pages')
    .select('title, meta')
    .eq('slug', `${params.region}/${params.slug}`)
    .single()

  return {
    title: data?.title ?? 'BizLegal AI — Legal Guide',
    description: data?.meta ?? '',
  }
}

export default async function GuidePage({ params }: {
  params: { region: string; slug: string }
}) {
  const slug = `${params.region}/${params.slug}`

  const { data: page } = await sb
    .from('seo_pages')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!page) notFound()

  // Determine jurisdiction data for infographics
  const jurisdictionData = getJurisdictionData(params.region)

  return (
    <GuideClient
      page={page}
      jurisdiction={params.region}
      slug={params.slug}
      jurisdictionData={jurisdictionData}
    />
  )
}

// ─── JURISDICTION DATA FOR INFOGRAPHICS ────────────────────
function getJurisdictionData(region: string) {
  const data: Record<string, any> = {
    uae: {
      flag: '🇦🇪',
      name: 'UAE / DIFC',
      regulator: 'VARA / DFSA',
      color: '#fbbf24',
      stats: [
        { label: 'Setup time', value: '4–8 weeks' },
        { label: 'Min capital', value: '$50k' },
        { label: 'Tax rate', value: '0% (DIFC)' },
        { label: 'Enforcement', value: 'Common law' },
      ],
      timeline: [
        { step: 'Entity registration', weeks: 1 },
        { step: 'VARA application', weeks: 3 },
        { step: 'KYC / AML setup', weeks: 2 },
        { step: 'License issued', weeks: 2 },
      ],
    },
    'european-union': {
      flag: '🇪🇺',
      name: 'European Union',
      regulator: 'MiCA / ESMA',
      color: '#60a5fa',
      stats: [
        { label: 'Regime', value: 'MiCA 2024' },
        { label: 'Passport', value: 'EU-wide' },
        { label: 'CASP license', value: 'Required' },
        { label: 'Enforcement', value: 'Civil law' },
      ],
      timeline: [
        { step: 'Legal structure', weeks: 2 },
        { step: 'MiCA filing', weeks: 4 },
        { step: 'Regulator review', weeks: 8 },
        { step: 'Passport issued', weeks: 2 },
      ],
    },
    'united-states': {
      flag: '🇺🇸',
      name: 'United States',
      regulator: 'SEC / CFTC',
      color: '#4ade80',
      stats: [
        { label: 'Framework', value: 'SEC / CFTC' },
        { label: 'Structure', value: 'Delaware LLC' },
        { label: 'Reg D', value: 'Accredited only' },
        { label: 'Enforcement', value: 'Common law' },
      ],
      timeline: [
        { step: 'LLC formation', weeks: 1 },
        { step: 'PPM preparation', weeks: 3 },
        { step: 'Reg D filing', weeks: 1 },
        { step: 'Investor close', weeks: 4 },
      ],
    },
    singapore: {
      flag: '🇸🇬',
      name: 'Singapore',
      regulator: 'MAS',
      color: '#f0abfc',
      stats: [
        { label: 'Regime', value: 'PS Act 2019' },
        { label: 'License', value: 'MAS DPT' },
        { label: 'Capital req.', value: 'SGD 250k' },
        { label: 'Enforcement', value: 'Common law' },
      ],
      timeline: [
        { step: 'Company setup', weeks: 1 },
        { step: 'MAS application', weeks: 4 },
        { step: 'Due diligence', weeks: 6 },
        { step: 'License issued', weeks: 4 },
      ],
    },
    'united-kingdom': {
      flag: '🇬🇧',
      name: 'United Kingdom',
      regulator: 'FCA',
      color: '#38bdf8',
      stats: [
        { label: 'Regulator', value: 'FCA' },
        { label: 'Regime', value: 'Cryptoasset' },
        { label: 'AML reg.', value: 'Required' },
        { label: 'Enforcement', value: 'Common law' },
      ],
      timeline: [
        { step: 'Company reg.', weeks: 1 },
        { step: 'FCA application', weeks: 3 },
        { step: 'Assessment', weeks: 8 },
        { step: 'Registration', weeks: 2 },
      ],
    },
    canada: {
      flag: '🇨🇦',
      name: 'Canada',
      regulator: 'CSA / FINTRAC',
      color: '#fb7185',
      stats: [
        { label: 'Framework', value: 'CSA / FINTRAC' },
        { label: 'Structure', value: 'Provincial' },
        { label: 'MSB reg.', value: 'Required' },
        { label: 'Enforcement', value: 'Common law' },
      ],
      timeline: [
        { step: 'Corp formation', weeks: 1 },
        { step: 'FINTRAC MSB', weeks: 2 },
        { step: 'Provincial filing', weeks: 3 },
        { step: 'Compliant', weeks: 2 },
      ],
    },
  }

  return data[region] ?? data['uae']
}
