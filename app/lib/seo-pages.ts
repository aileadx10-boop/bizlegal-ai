import { createClient } from '@supabase/supabase-js'

import type { CtaType } from '@/app/lib/site-content'
import { baseUrl, featuredGuides } from '@/app/lib/site-content'

export type SeoPageSummary = {
  slug: string
  title: string
  meta: string
  jurisdiction: string
  cta_type: CtaType
  reading_time: number
  updated_at: string
  topic?: string
}

export type SeoPageRecord = SeoPageSummary & {
  content: string
  keywords: string[]
  created_at?: string
  word_count?: number
}

export const ctaLabels: Record<CtaType, string> = {
  docstack: 'DocStack template',
  brai: 'BRAI compliance path',
  tracr: 'TRACR investigation path',
}

const fallbackSummaries: SeoPageSummary[] = featuredGuides.map((guide, index) => ({
  slug: guide.href.replace(/^\//, ''),
  title: guide.title,
  meta: guide.summary,
  jurisdiction: guide.region,
  cta_type: guide.ctaType,
  reading_time: 6 + index,
  updated_at: new Date().toISOString(),
  topic: guide.title,
}))

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY

  if (!url || !key) {
    return null
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

function normalizeSlug(slug: string) {
  const clean = slug.replace(/^\/+/, '')
  return clean.startsWith('guides/') ? clean : `guides/${clean.replace(/^guides\//, '')}`
}

function toSummary(record: any): SeoPageSummary {
  return {
    slug: normalizeSlug(record.slug),
    title: record.title,
    meta: record.meta,
    jurisdiction: record.jurisdiction || 'Global',
    cta_type: (record.cta_type || 'docstack') as CtaType,
    reading_time: Number(record.reading_time || 6),
    updated_at: record.updated_at || record.created_at || new Date().toISOString(),
    topic: record.topic || record.title,
  }
}

export function toPagePath(slug: string) {
  return `/${normalizeSlug(slug)}`
}

export function buildAbsoluteUrl(path: string) {
  return new URL(path, baseUrl).toString()
}

export async function getPublishedSeoPages(limit = 24): Promise<SeoPageSummary[]> {
  const client = getSupabaseClient()

  if (!client) {
    return fallbackSummaries.slice(0, limit)
  }

  try {
    const { data, error } = await client
      .from('seo_pages')
      .select('slug,title,meta,jurisdiction,cta_type,reading_time,updated_at,created_at,topic')
      .eq('published', true)
      .order('updated_at', { ascending: false })
      .limit(limit)

    if (error || !data?.length) {
      return fallbackSummaries.slice(0, limit)
    }

    return data.map(toSummary)
  } catch {
    return fallbackSummaries.slice(0, limit)
  }
}

export async function getSeoPageBySlug(slug: string): Promise<SeoPageRecord | null> {
  const client = getSupabaseClient()

  if (!client) {
    return null
  }

  try {
    const { data, error } = await client
      .from('seo_pages')
      .select('*')
      .eq('slug', normalizeSlug(slug))
      .eq('published', true)
      .maybeSingle()

    if (error || !data) {
      return null
    }

    return {
      ...toSummary(data),
      content: data.content || '',
      keywords: Array.isArray(data.keywords) ? data.keywords : [],
      created_at: data.created_at,
      word_count: data.word_count,
    }
  } catch {
    return null
  }
}

export async function getRelatedSeoPages(slug: string, jurisdiction?: string, limit = 3) {
  const client = getSupabaseClient()

  if (!client) {
    return fallbackSummaries
      .filter((page) => page.slug !== normalizeSlug(slug))
      .slice(0, limit)
  }

  try {
    let query = client
      .from('seo_pages')
      .select('slug,title,meta,jurisdiction,cta_type,reading_time,updated_at,created_at,topic')
      .eq('published', true)
      .neq('slug', normalizeSlug(slug))
      .limit(limit)

    if (jurisdiction) {
      query = query.eq('jurisdiction', jurisdiction)
    }

    const { data, error } = await query.order('updated_at', { ascending: false })

    if (error || !data?.length) {
      return fallbackSummaries
        .filter((page) => page.slug !== normalizeSlug(slug))
        .slice(0, limit)
    }

    return data.map(toSummary)
  } catch {
    return fallbackSummaries
      .filter((page) => page.slug !== normalizeSlug(slug))
      .slice(0, limit)
  }
}
