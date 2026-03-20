import type { MetadataRoute } from 'next'

import { getPublishedSeoPages, toPagePath } from '@/app/lib/seo-pages'
import { baseUrl } from '@/app/lib/site-content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ['', '/posts', '/security', '/faq', '/privacy', '/terms', '/disclaimer'] as const
  const posts = await getPublishedSeoPages(500)

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }))

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}${toPagePath(post.slug)}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'monthly',
    priority: 0.72,
  }))

  return [...staticEntries, ...postEntries]
}
