import { NextRequest, NextResponse } from 'next/server'

// Cron Job Endpoint for Automated SEO and Tool Generation
// Schedule via vercel.json: SEO Pages every 2 days at 2 AM UTC, Tools every 3 days at 3 AM UTC
// Triggered by Vercel Cron or external cron service

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET || 'dev-secret'
  
  if (authHeader !== `Bearer ${cronSecret}`) {
    // Allow Vercel cron without auth header (Vercel verifies via cron configuration)
    const isVercelCron = request.headers.get('user-agent')?.includes('Vercel Cron')
    if (!isVercelCron) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const { GeminiClient } = await import('@/lib/gemini')

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )

    const gemini = new GeminiClient({
      apiKey: process.env.GOOGLE_API_KEY!,
      model: 'gemini-2.0-flash',
    })

    const results = {
      seo_pages: { created: 0, failed: 0 },
      social_posts: { created: 0, failed: 0 },
      tools: { created: 0, failed: 0 },
      started_at: new Date().toISOString(),
    }

    console.log('🚀 Starting automated cron job...')

    // Check last run times
    const { data: lastRun } = await supabase
      .from('automation_runs')
      .select('completed_at, run_type')
      .order('completed_at', { ascending: false })
      .limit(1)
      .single()

    const now = new Date()
    const lastRunDate = lastRun?.completed_at ? new Date(lastRun.completed_at) : null
    const hoursSinceLastRun = lastRunDate 
      ? (now.getTime() - lastRunDate.getTime()) / (1000 * 60 * 60) 
      : 999

    // SEO Pages: Every 48 hours
    if (hoursSinceLastRun >= 47 || !lastRunDate) {
      console.log('📊 Running SEO page generation...')
      results.seo_pages = await runSEOGeneration(supabase, gemini)
    } else {
      console.log(`⏭️  Skipping SEO: Last run ${Math.round(hoursSinceLastRun)} hours ago`)
    }

    // Tools: Every 72 hours
    if (hoursSinceLastRun >= 71 || !lastRunDate) {
      console.log('🔧 Running tool generation...')
      results.tools = await runToolGeneration(supabase, gemini)
    } else {
      console.log(`⏭️  Skipping Tools: Last run ${Math.round(hoursSinceLastRun)} hours ago`)
    }

    // Social Media: Adapt recent pages
    console.log('📱 Running social media adaptation...')
    results.social_posts = await runSocialMediaAdaptation(supabase, gemini)

    // Log run
    await supabase.from('automation_runs').insert({
      run_type: 'cron',
      seo_pages_created: results.seo_pages.created,
      seo_pages_failed: results.seo_pages.failed,
      social_posts_created: results.social_posts.created,
      social_posts_failed: results.social_posts.failed,
      tools_created: results.tools.created,
      tools_failed: results.tools.failed,
      status: (results.seo_pages.failed + results.tools.failed + results.social_posts.failed) > 0 ? 'partial' : 'success',
      completed_at: new Date().toISOString(),
      metadata: {
        hours_since_last_run: hoursSinceLastRun,
      },
    })

    console.log('✅ Cron job completed')

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results,
    })
  } catch (error) {
    console.error('❌ Cron job failed:', error)
    
    // Log failed run
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!
      )
      
      await supabase.from('automation_runs').insert({
        run_type: 'cron',
        status: 'failed',
        error_message: (error as Error).message,
        completed_at: new Date().toISOString(),
      })
    } catch {}

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}

// ─── GENERATION FUNCTIONS ─────────────────────────────────────

async function runSEOGeneration(supabase: any, gemini: any) {
  const result = { created: 0, failed: 0 }
  
  const topics = [
    { region: 'uae', topic: 'VARA License', cta: 'brai' },
    { region: 'european-union', topic: 'MiCA CASP', cta: 'brai' },
    { region: 'united-states', topic: 'Reg D 506c', cta: 'docstack' },
    { region: 'singapore', topic: 'MAS DPT', cta: 'brai' },
    { region: 'united-kingdom', topic: 'FCA Crypto', cta: 'brai' },
    { region: 'global', topic: 'Shareholders Agreement', cta: 'docstack' },
    { region: 'uae', topic: 'DIFC Setup', cta: 'docstack' },
    { region: 'european-union', topic: 'GDPR Compliance', cta: 'brai' },
    { region: 'united-states', topic: 'Delaware LLC', cta: 'docstack' },
    { region: 'global', topic: 'NDA Template', cta: 'docstack' },
  ]

  // Get existing slugs
  const { data: existing } = await supabase
    .from('seo_pages')
    .select('slug')
    .in('slug', topics.map(t => `guides/${t.region}/${t.topic.toLowerCase().replace(/\s+/g, '-')}`))

  const existingSlugs = new Set(existing?.map((r: any) => r.slug) || [])
  const pendingTopics = topics.filter(t => !existingSlugs.has(`guides/${t.region}/${t.topic.toLowerCase().replace(/\s+/g, '-')}`))

  for (const t of pendingTopics.slice(0, 10)) {
    try {
      const content = await gemini.generateContent({
        topic: t.topic,
        jurisdiction: t.region,
        keywords: [t.topic.toLowerCase(), `${t.topic} ${t.region}`],
        wordCount: 1200,
        contentType: 'seo-page',
      })

      const page = {
        slug: `guides/${t.region}/${t.topic.toLowerCase().replace(/\s+/g, '-')}`,
        title: content.title || t.topic,
        meta: content.meta || `Guide to ${t.topic}`,
        keywords: content.keywords || [],
        content: content.content || '',
        cta_type: t.cta,
        cta: t.cta,
        page_type: 'guide',
        jurisdiction: t.region.replace(/-/g, ' '),
        topic: t.topic,
        published: true,
        word_count: content.content?.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length || 0,
        reading_time: 5,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from('seo_pages').insert(page)
      
      if (error) {
        result.failed++
        console.log(`❌ Failed: ${t.topic}`)
      } else {
        result.created++
        console.log(`✅ Created: ${t.topic} (${page.word_count} words)`)
      }
    } catch (err) {
      result.failed++
      console.log(`❌ Error: ${t.topic} - ${(err as Error).message}`)
    }

    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return result
}

async function runToolGeneration(supabase: any, gemini: any) {
  const result = { created: 0, failed: 0 }
  
  const categories = [
    'compliance automation',
    'contract analysis',
    'risk assessment',
    'legal document generation',
  ]

  const category = categories[Math.floor(Math.random() * categories.length)]

  try {
    const toolDesc = await gemini.generateToolIdea(category)
    
    if (toolDesc) {
      const { error } = await supabase.from('auto_generated_tools').insert({
        name: toolDesc.name,
        slug: toolDesc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category,
        short_description: toolDesc.shortDescription,
        full_description: toolDesc.fullDescription,
        features: toolDesc.features,
        use_cases: toolDesc.useCases,
        tags: toolDesc.tags,
        status: 'draft',
      })

      if (error) {
        result.failed++
      } else {
        result.created++
        console.log(`✅ Tool created: ${toolDesc.name}`)
      }
    }
  } catch (err) {
    result.failed++
    console.log(`❌ Tool generation failed: ${(err as Error).message}`)
  }

  return result
}

async function runSocialMediaAdaptation(supabase: any, gemini: any) {
  const result = { created: 0, failed: 0 }

  // Get recent pages without social posts
  const { data: pages } = await supabase
    .from('seo_pages')
    .select('slug, title, content, topic')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(5)

  if (!pages) return result

  for (const page of pages) {
    // Check if already has social posts
    const { data: existing } = await supabase
      .from('social_media_posts')
      .select('id')
      .eq('page_slug', page.slug)
      .limit(1)
      .single()

    if (existing) continue

    try {
      const plainText = page.content.replace(/<[^>]+>/g, ' ').substring(0, 3000)
      const socialPosts = await gemini.generateSocialPosts(page.title, plainText)

      if (socialPosts.length > 0) {
        const platforms: Record<string, any> = {}
        socialPosts.forEach((post: any) => {
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

        result.created += socialPosts.length
        console.log(`✅ Social posts created for: ${page.title}`)
      }
    } catch (err) {
      result.failed++
      console.log(`❌ Social adaptation failed: ${(err as Error).message}`)
    }

    await new Promise(resolve => setTimeout(resolve, 1500))
  }

  return result
}
