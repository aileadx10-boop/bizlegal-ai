import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { GeminiClient } from '@/lib/gemini'

// ─── CONFIGURATION ────────────────────────────────────────────
const CONFIG = {
  seoPagesPerRun: 10,
  seoRunIntervalDays: 2,
  toolRunIntervalDays: 3,
}

// ─── HELPER FUNCTIONS ─────────────────────────────────────────
function required(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function wordCount(html: string): number {
  return html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length
}

// ─── SEO TOPIC POOL ───────────────────────────────────────────
const SEO_TOPIC_POOL = [
  { region: 'uae', topics: ['VARA License', 'DIFC Setup', 'ADGM Registration'], cta: 'brai' },
  { region: 'european-union', topics: ['MiCA CASP', 'GDPR Compliance', 'AIFMD Passport'], cta: 'brai' },
  { region: 'united-states', topics: ['Reg D 506c', 'SEC Howey Test', 'Delaware LLC'], cta: 'docstack' },
  { region: 'singapore', topics: ['MAS DPT License', 'VCC Structure', 'Family Office'], cta: 'brai' },
  { region: 'united-kingdom', topics: ['FCA Crypto', 'UK GDPR', 'Companies House'], cta: 'brai' },
  { region: 'global', topics: ['Shareholders Agreement', 'NDA Template', 'AML Compliance'], cta: 'docstack' },
]

// ─── GENERATION FUNCTIONS ─────────────────────────────────────
async function generateSEOContent(
  gemini: GeminiClient,
  topic: string,
  region: string,
  cta: string
) {
  const keywords = [topic.toLowerCase().replace(/\s+/g, ' '), `${topic} ${region}`, `${topic} 2026`]
  
  const result = await gemini.generateContent({
    topic,
    jurisdiction: region,
    keywords,
    wordCount: 1200,
    contentType: 'seo-page',
  })

  const content = result.content || ''
  const wc = wordCount(content)

  return {
    slug: `guides/${region}/${slugify(topic)}`,
    title: result.title || topic,
    meta: result.meta || `Guide to ${topic}`,
    keywords: result.keywords || keywords,
    content,
    cta_type: cta,
    cta,
    page_type: 'guide',
    jurisdiction: region.replace(/-/g, ' '),
    topic,
    published: true,
    word_count: wc,
    reading_time: Math.max(4, Math.ceil(wc / 220)),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

async function generateSocialPosts(
  gemini: GeminiClient,
  title: string,
  content: string
) {
  return await gemini.generateSocialPosts(title, content)
}

// ─── API HANDLER ──────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // Verify authorization
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET || 'dev-secret'}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { type = 'all', count = CONFIG.seoPagesPerRun } = body

    const supabase = createClient(
      required('NEXT_PUBLIC_SUPABASE_URL'),
      required('SUPABASE_SERVICE_KEY')
    )

    const gemini = new GeminiClient({
      apiKey: required('GOOGLE_API_KEY'),
      model: 'gemini-2.0-flash',
    })

    const results: any = {
      seo_pages: { created: 0, failed: 0, items: [] },
      social_posts: { created: 0, failed: 0, items: [] },
      tools: { created: 0, failed: 0, items: [] },
    }

    // Generate SEO Pages
    if (type === 'all' || type === 'seo') {
      console.log(`📊 Generating ${count} SEO pages...`)
      
      // Get existing slugs
      const allTopics = SEO_TOPIC_POOL.flatMap(pool =>
        pool.topics.map(topic => ({
          region: pool.region,
          topic,
          cta: pool.cta,
          slug: `guides/${pool.region}/${slugify(topic)}`,
        }))
      )

      const { data: existing } = await supabase
        .from('seo_pages')
        .select('slug')
        .in('slug', allTopics.map(t => t.slug))

      const existingSlugs = new Set(existing?.map(r => r.slug) || [])
      const pendingTopics = allTopics
        .filter(t => !existingSlugs.has(t.slug))
        .slice(0, count)

      for (const t of pendingTopics) {
        try {
          const page = await generateSEOContent(gemini, t.topic, t.region, t.cta)
          
          const { error } = await supabase.from('seo_pages').insert(page)
          
          if (error) {
            results.seo_pages.failed++
          } else {
            results.seo_pages.created++
            results.seo_pages.items.push({ slug: page.slug, words: page.word_count })
            
            // Generate social posts for this page
            try {
              const socialPosts = await generateSocialPosts(gemini, page.title, page.content)
              
              if (socialPosts.length > 0) {
                const platforms: Record<string, any> = {}
                socialPosts.forEach(post => {
                  platforms[post.platform] = {
                    content: post.content,
                    hashtags: post.hashtags,
                    scheduled_at: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
                  }
                })

                await supabase.from('social_media_posts').insert({
                  page_slug: page.slug,
                  title: page.title,
                  platforms,
                  status: 'scheduled',
                })

                results.social_posts.created += socialPosts.length
              }
            } catch (err) {
              console.error(`Social post generation failed for ${page.slug}:`, err)
            }
          }
        } catch (err) {
          results.seo_pages.failed++
          console.error(`SEO generation failed for ${t.topic}:`, err)
        }

        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    // Generate Tool (every 3rd run)
    if (type === 'all' || type === 'tools') {
      console.log('🔧 Generating new tool...')
      
      const toolCategories = [
        'compliance automation',
        'contract analysis',
        'risk assessment',
        'legal document generation',
        'due diligence',
      ]
      
      const category = toolCategories[Math.floor(Math.random() * toolCategories.length)]
      
      try {
        const toolDesc = await gemini.generateToolIdea(category)
        
        if (toolDesc) {
          const { error } = await supabase.from('auto_generated_tools').insert({
            name: toolDesc.name,
            slug: slugify(toolDesc.name),
            category,
            short_description: toolDesc.shortDescription,
            full_description: toolDesc.fullDescription,
            features: toolDesc.features,
            use_cases: toolDesc.useCases,
            tags: toolDesc.tags,
            status: 'draft',
          })

          if (error) {
            results.tools.failed++
          } else {
            results.tools.created++
            results.tools.items.push({ name: toolDesc.name, category })
          }
        }
      } catch (err) {
        results.tools.failed++
        console.error('Tool generation failed:', err)
      }
    }

    // Log automation run
    await supabase.from('automation_runs').insert({
      run_type: type,
      seo_pages_created: results.seo_pages.created,
      seo_pages_failed: results.seo_pages.failed,
      social_posts_created: results.social_posts.created,
      tools_created: results.tools.created,
      status: results.seo_pages.failed > 0 ? 'partial' : 'success',
      completed_at: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results,
    })
  } catch (error) {
    console.error('Automation API error:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}

// Allow GET to check status
export async function GET() {
  try {
    const supabase = createClient(
      required('NEXT_PUBLIC_SUPABASE_URL'),
      required('SUPABASE_SERVICE_KEY')
    )

    // Get recent automation runs
    const { data: runs } = await supabase
      .from('automation_runs')
      .select('*')
      .order('completed_at', { ascending: false })
      .limit(10)

    // Get stats
    const { count: seoCount } = await supabase
      .from('seo_pages')
      .select('*', { count: 'exact', head: true })

    const { count: socialCount } = await supabase
      .from('social_media_posts')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      status: 'operational',
      lastRuns: runs || [],
      stats: {
        totalSeoPages: seoCount || 0,
        totalSocialPosts: socialCount || 0,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}
