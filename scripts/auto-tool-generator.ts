#!/usr/bin/env npx tsx
/**
 * Automated Tool Generator
 * Runs every 3 days to create new legal tech tools
 * 
 * Usage: npx tsx scripts/auto-tool-generator.ts [--force]
 */

import { GeminiClient } from '../lib/gemini'

// ─── CONFIGURATION ────────────────────────────────────────────
const CONFIG = {
  runIntervalDays: 3,
  toolCategories: [
    'compliance automation',
    'contract analysis',
    'regulatory intelligence',
    'risk assessment',
    'legal document generation',
    'due diligence automation',
    'entity management',
    'cap table management',
    'IP portfolio tracking',
    'litigation support',
    'e-discovery',
    'legal billing',
    'client intake',
    'matter management',
    'legal research',
  ],
}

// ─── TOOL TEMPLATE ────────────────────────────────────────────
const TOOL_TEMPLATE = (tool: {
  name: string
  shortDescription: string
  fullDescription: string
  features: string[]
  useCases: string[]
  tags: string[]
  icon: string
  color: string
}) => `
'use client'

import Link from 'next/link'

export default function ${tool.name.replace(/[^a-zA-Z]/g, '')}Tool() {
  return (
    <div className="tool-page">
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <Link href="/tools" style={{ color: 'var(--sky)', textDecoration: 'none', marginBottom: '1rem', display: 'block' }}>
          ← Back to Tools
        </Link>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '64px', display: 'block', marginBottom: '1rem' }}>{${JSON.stringify(tool.icon)}}</span>
          <h1 style={{ fontFamily: 'Gloock, serif', fontSize: '2.5rem', marginBottom: '1rem' }}>{${JSON.stringify(tool.name)}}</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--muted)' }}>{${JSON.stringify(tool.shortDescription)}}</p>
        </div>

        <div style={{ background: 'rgba(125,211,252,0.05)', border: '1px solid rgba(125,211,252,0.1)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '1.5rem', marginBottom: '1rem' }}>Overview</h2>
          <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)' }}>{${JSON.stringify(tool.fullDescription)}}</p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '1.5rem', marginBottom: '1rem' }}>Key Features</h2>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)' }}>
            ${tool.features.map(f => `<li>${f}</li>`).join('\n            ')}
          </ul>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '1.5rem', marginBottom: '1rem' }}>Use Cases</h2>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)' }}>
            ${tool.useCases.map(u => `<li>${u}</li>`).join('\n            ')}
          </ul>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>🚧 This tool is under development</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--dim)' }}>Expected launch: Q2 2026</p>
        </div>
      </div>

      <style jsx>{\`
        .tool-page {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          padding: 4rem 0;
        }
      \`}</style>
    </div>
  )
}
`

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

function getRandomIcon(): string {
  const icons = ['🔍', '🛡️', '📊', '⚖️', '📋', '🔒', '📈', '🎯', '💼', '📝', '🔗', '📁', '🧠', '💡', '🚀']
  return icons[Math.floor(Math.random() * icons.length)]
}

function getRandomColor(): string {
  const colors = ['sky', 'teal', 'indigo', 'violet', 'fuchsia', 'rose', 'amber', 'emerald']
  return colors[Math.floor(Math.random() * colors.length)]
}

function getLastRunDate(key: string): Date | null {
  try {
    const data = localStorage.getItem(key)
    return data ? new Date(data) : null
  } catch {
    return null
  }
}

function setLastRunDate(key: string, date: Date): void {
  try {
    localStorage.setItem(key, date.toISOString())
  } catch {
    // Ignore storage errors
  }
}

function shouldRun(key: string, intervalDays: number): boolean {
  const lastRun = getLastRunDate(key)
  if (!lastRun) return true
  
  const now = new Date()
  const diffMs = now.getTime() - lastRun.getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  
  return diffDays >= intervalDays
}

// ─── MAIN GENERATION LOGIC ────────────────────────────────────
async function generateTool(gemini: GeminiClient, category: string) {
  const toolDesc = await gemini.generateToolIdea(category)
  
  if (!toolDesc) {
    throw new Error('Failed to generate tool description')
  }

  return {
    ...toolDesc,
    icon: getRandomIcon(),
    color: getRandomColor(),
    slug: slugify(toolDesc.name),
  }
}

async function main() {
  const args = process.argv.slice(2)
  const force = args.includes('--force')

  const RUN_KEY = 'tool-auto-generator-last-run'
  
  if (!force && !shouldRun(RUN_KEY, CONFIG.runIntervalDays)) {
    const lastRun = getLastRunDate(RUN_KEY)
    const daysUntil = Math.ceil(CONFIG.runIntervalDays - (new Date().getTime() - lastRun!.getTime()) / (1000 * 60 * 60 * 24))
    console.log(`⏭️  Skipped: Last run was ${lastRun?.toLocaleDateString()}. Next run in ${daysUntil} days`)
    console.log('   Use --force to run anyway')
    return
  }

  console.log('🚀 Starting automated tool generation...')
  console.log(`📊 Generating 1 new tool using Gemini API`)

  const gemini = new GeminiClient({
    apiKey: required('GOOGLE_API_KEY'),
    model: 'gemini-2.0-flash',
  })

  // Select random category
  const category = CONFIG.toolCategories[Math.floor(Math.random() * CONFIG.toolCategories.length)]
  console.log(`📁 Category: ${category}`)

  try {
    const tool = await generateTool(gemini, category)
    
    console.log(`\n✨ Generated Tool:`)
    console.log(`   Name: ${tool.name}`)
    console.log(`   Slug: ${tool.slug}`)
    console.log(`   Icon: ${tool.icon}`)
    console.log(`   Color: ${tool.color}`)
    console.log(`   Features: ${tool.features.length}`)
    console.log(`   Use Cases: ${tool.useCases.length}`)

    // Generate tool page content
    const pageContent = TOOL_TEMPLATE(tool)
    
    console.log(`\n📄 Tool page generated (${pageContent.length} characters)`)
    
    // Note: In production, this would write to app/tools/[slug]/page.tsx
    // For now, we'll log the output
    console.log(`\n💾 To deploy: Save to app/tools/${tool.slug}/page.tsx`)
    
    // Update last run timestamp
    setLastRunDate(RUN_KEY, new Date())

    console.log(`\n✅ Tool generation complete!`)
    console.log(`📅 Next run: ${new Date(Date.now() + CONFIG.runIntervalDays * 24 * 60 * 60 * 1000).toLocaleDateString()}`)

  } catch (error) {
    console.error(`❌ Error: ${(error as Error).message}`)
    process.exitCode = 1
  }
}

main().catch(error => {
  console.error('💥 Fatal error:', error)
  process.exitCode = 1
})
