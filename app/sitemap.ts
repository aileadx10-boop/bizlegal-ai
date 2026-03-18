// app/sitemap.ts
// Auto-generated sitemap pulled from Supabase seo_pages table
// Next.js reads this at build time (or ISR) and serves /sitemap.xml

import { createClient } from '@supabase/supabase-js'
import type { MetadataRoute } from 'next'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export const revalidate = 3600 // refresh sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bizlegal-ai.com'

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  // Dynamic guide pages from Supabase
  const { data: pages } = await sb
    .from('seo_pages')
    .select('slug, created_at, updated_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  // slug already contains 'guides/region/page-name' prefix from DB
  const guideRoutes: MetadataRoute.Sitemap = (pages ?? []).map(page => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(page.updated_at ?? page.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticRoutes, ...guideRoutes]
}
