#!/usr/bin/env npx tsx
/**
 * Social Media Content Adapter for Dor Innovations
 * Adapts each SEO post for 7 social media platforms
 * 
 * Platforms:
 * - Facebook: https://www.facebook.com/DorInnovations/
 * - Instagram: https://www.instagram.com/dorinnovations/
 * - Twitter/X: https://x.com/DorInnovations
 * - Pinterest: https://www.pinterest.com/DorInnovations/
 * - LinkedIn: https://www.linkedin.com/company/DorInnovations
 * - YouTube: https://www.youtube.com/@DorInnovations
 * - Substack: dorinnovations
 * 
 * Usage: npx tsx scripts/social-media-adapter.ts [--all] [--slug=specific-slug]
 */

import { createClient } from '@supabase/supabase-js'
import { GeminiClient } from '../lib/gemini'
import { DOR_INNOVATIONS_SOCIALS, PLATFORM_CONFIG } from '../lib/social-accounts'

// ─── CONFIGURATION ────────────────────────────────────────────
const PLATFORMS = DOR_INNOVATIONS_SOCIALS.map(account => ({
  id: account.platform,
  name: PLATFORM_CONFIG[account.platform]?.displayName || account.platform,
  charLimit: PLATFORM_CONFIG[account.platform]?.maxChars || 500,
  url: account.url,
  handle: account.handle,
}))

// ─── HELPER FUNCTIONS ─────────────────────────────────────────
function required(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}

function extractPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 3000)
}

// ─── MAIN ADAPTATION LOGIC ────────────────────────────────────
async function adaptForSocialMedia(
  gemini: GeminiClient,
  page: { slug: string; title: string; content: string; topic: string }
) {
  const plainText = extractPlainText(page.content)
  
  const socialPosts = await gemini.generateSocialPosts(page.title, plainText)
  
  if (socialPosts.length === 0) {
    throw new Error('No social posts generated')
  }

  // Map posts to platforms
  const postsByPlatform: Record<string, { content: string; hashtags: string[]; scheduled_at?: string }> = {}
  
  socialPosts.forEach(post => {
    postsByPlatform[post.platform] = {
      content: post.content,
      hashtags: post.hashtags,
      scheduled_at: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Schedule within 7 days
    }
  })

  return {
    slug: page.slug,
    title: page.title,
    platforms: postsByPlatform,
    created_at: new Date().toISOString(),
  }
}

async function main() {
  const args = process.argv.slice(2)
  const allFlag = args.includes('--all')
  const slugArg = args.find(a => a.startsWith('--slug='))
  const specificSlug = slugArg?.split('=')[1]

  console.log('🚀 Starting social media content adaptation...')

  const gemini = new GeminiClient({
    apiKey: required('GOOGLE_API_KEY'),
    model: 'gemini-2.0-flash',
  })

  const supabase = createClient(required('NEXT_PUBLIC_SUPABASE_URL'), required('SUPABASE_SERVICE_KEY'))

  // Fetch pages
  let query = supabase
    .from('seo_pages')
    .select('slug, title, content, topic')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(allFlag ? 100 : 10)

  if (specificSlug) {
    query = query.eq('slug', specificSlug)
  }

  const { data: pages, error } = await query

  if (error) {
    console.error(`❌ Failed to fetch pages: ${error.message}`)
    process.exitCode = 1
    return
  }

  if (!pages || pages.length === 0) {
    console.log('ℹ️  No pages found to adapt')
    return
  }

  console.log(`📊 Adapting ${pages.length} pages for ${PLATFORMS.length} platforms`)

  let adapted = 0
  let failed = 0
  const results: Array<{ slug: string; platforms: number; status: string }> = []

  for (const page of pages) {
    process.stdout.write(`📱 Adapting "${page.title}"... `)
    
    try {
      const socialContent = await adaptForSocialMedia(gemini, page)
      
      // Insert into social_media_posts table
      const { error: insertError } = await supabase
        .from('social_media_posts')
        .insert({
          page_slug: page.slug,
          title: page.title,
          platforms: socialContent.platforms,
          status: 'scheduled',
          created_at: socialContent.created_at,
        })

      if (insertError) {
        failed++
        console.log(`❌ ${insertError.message}`)
        results.push({ slug: page.slug, platforms: 0, status: `Error: ${insertError.message}` })
      } else {
        adapted++
        const platformCount = Object.keys(socialContent.platforms).length
        console.log(`✅ ${platformCount} platforms`)
        results.push({ slug: page.slug, platforms: platformCount, status: 'Adapted' })
      }
    } catch (error) {
      failed++
      console.log(`❌ ${(error as Error).message}`)
      results.push({ slug: page.slug, platforms: 0, status: `Error: ${(error as Error).message}` })
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1500))
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📱 SOCIAL MEDIA ADAPTATION SUMMARY')
  console.log('='.repeat(60))
  console.log(`✅ Adapted: ${adapted}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`📊 Total posts created: ${adapted * PLATFORMS.length}`)
  
  if (results.length > 0) {
    console.log('\n📋 RESULTS:')
    results.forEach(r => {
      console.log(`  ${r.status === 'Adapted' ? '✅' : '❌'} ${r.slug} (${r.platforms} platforms)`)
    })
  }

  if (failed > 0) process.exitCode = 1
}

main().catch(error => {
  console.error('💥 Fatal error:', error)
  process.exitCode = 1
})
