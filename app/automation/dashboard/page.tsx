'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface AutomationStats {
  totalCronRuns: number
  totalManualRuns: number
  totalSeoPages: number
  totalSocialPosts: number
  totalTools: number
  successfulRuns: number
  failedRuns: number
  lastRunAt: string
}

interface AutomationRun {
  id: string
  run_type: string
  seo_pages_created: number
  social_posts_created: number
  tools_created: number
  status: string
  completed_at: string
}

export default function AutomationDashboard() {
  const [stats, setStats] = useState<AutomationStats | null>(null)
  const [runs, setRuns] = useState<AutomationRun[]>([])
  const [loading, setLoading] = useState(true)
  const [triggering, setTriggering] = useState(false)

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/automation/run')
      const data = await res.json()
      
      if (data.lastRuns) {
        setRuns(data.lastRuns)
      }
      if (data.stats) {
        setStats({
          totalCronRuns: data.lastRuns?.filter((r: any) => r.run_type === 'cron').length || 0,
          totalManualRuns: data.lastRuns?.filter((r: any) => r.run_type === 'manual').length || 0,
          totalSeoPages: data.stats.totalSeoPages || 0,
          totalSocialPosts: data.stats.totalSocialPosts || 0,
          totalTools: 0,
          successfulRuns: data.lastRuns?.filter((r: any) => r.status === 'success').length || 0,
          failedRuns: data.lastRuns?.filter((r: any) => r.status === 'failed').length || 0,
          lastRunAt: data.lastRuns?.[0]?.completed_at || '',
        })
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const triggerAutomation = async (type: 'all' | 'seo' | 'tools' | 'social') => {
    setTriggering(true)
    try {
      const res = await fetch('/api/automation/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || 'dev-secret'}`,
        },
        body: JSON.stringify({ type, count: 10 }),
      })

      const data = await res.json()
      
      if (data.success) {
        alert('✅ Automation triggered successfully!')
        fetchStats()
      } else {
        alert('❌ Failed: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      alert('❌ Error: ' + (error as Error).message)
    } finally {
      setTriggering(false)
    }
  }

  return (
    <div className="automation-dashboard">
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <Link href="/" style={{ color: 'var(--sky)', textDecoration: 'none' }}>
              &larr; Back to Site
            </Link>
            <span style={{ color: 'var(--dim)' }}>|</span>
            <Link href="/automation/social" style={{ color: 'var(--sky)', textDecoration: 'none' }}>
              📱 Social Accounts
            </Link>
          </div>
          <h1 style={{ fontFamily: 'Gloock, serif', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            🤖 SEO Automation Dashboard
          </h1>
          <p style={{ color: 'var(--muted)' }}>
            Automated content generation powered by Gemini AI
          </p>
        </div>

        <div className="stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          <StatCard icon="📊" label="SEO Pages" value={stats?.totalSeoPages || 0} color="#3B82F6" />
          <StatCard icon="📱" label="Social Posts" value={stats?.totalSocialPosts || 0} color="#10B981" />
          <StatCard icon="🔧" label="Tools Generated" value={stats?.totalTools || 0} color="#F59E0B" />
          <StatCard icon="✅" label="Success Rate" value={stats ? `${Math.round((stats.successfulRuns / (stats.successfulRuns + stats.failedRuns || 1)) * 100)}%` : '0%'} color="#10B981" />
        </div>

        <div className="actions-section" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '1.5rem', marginBottom: '1rem' }}>Manual Triggers</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => triggerAutomation('all')} disabled={triggering} style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #FF6B35, #FF8C5A)', border: 'none', borderRadius: '100px', color: 'white', fontWeight: 600, cursor: triggering ? 'not-allowed' : 'pointer', opacity: triggering ? 0.7 : 1 }}>
              {triggering ? '⏳ Running...' : '🚀 Run Full Automation'}
            </button>
            <button onClick={() => triggerAutomation('seo')} disabled={triggering} style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '100px', color: 'var(--text)', fontWeight: 600, cursor: triggering ? 'not-allowed' : 'pointer' }}>📊 Generate SEO Pages</button>
            <button onClick={() => triggerAutomation('tools')} disabled={triggering} style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '100px', color: 'var(--text)', fontWeight: 600, cursor: triggering ? 'not-allowed' : 'pointer' }}>🔧 Generate Tool</button>
            <button onClick={() => triggerAutomation('social')} disabled={triggering} style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '100px', color: 'var(--text)', fontWeight: 600, cursor: triggering ? 'not-allowed' : 'pointer' }}>📱 Adapt Social Posts</button>
          </div>
        </div>

        <div className="schedule-info" style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '16px', padding: '1.5rem', marginBottom: '3rem' }}>
          <h3 style={{ fontFamily: 'Gloock, serif', fontSize: '1.25rem', marginBottom: '1rem' }}>📅 Automated Schedule</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <ScheduleItem task="SEO Pages (10 pages)" frequency="Every 2 days" time="2:00 AM UTC" />
            <ScheduleItem task="New Tool" frequency="Every 3 days" time="3:00 AM UTC" />
            <ScheduleItem task="Social Media Adaptation" frequency="With each SEO run" time="7 platforms per post" />
          </div>
        </div>

        <div className="recent-runs">
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '1.5rem', marginBottom: '1rem' }}>Recent Automation Runs</h2>
          {loading ? (
            <p style={{ color: 'var(--muted)' }}>Loading...</p>
          ) : runs.length === 0 ? (
            <p style={{ color: 'var(--muted)' }}>No runs yet. Trigger your first automation!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {runs.map(run => (
                <div key={run.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{run.status === 'success' ? '✅' : run.status === 'failed' ? '❌' : '⚠️'}</span>
                    <div>
                      <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{run.run_type} Run</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>📊 {run.seo_pages_created} SEO | 📱 {run.social_posts_created} Social | 🔧 {run.tools_created} Tools</div>
                    </div>
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{new Date(run.completed_at).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="integration-guide" style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}>
          <h3 style={{ fontFamily: 'Gloock, serif', fontSize: '1.25rem', marginBottom: '1rem' }}>🔧 Setup Instructions</h3>
          <ol style={{ lineHeight: 2, color: 'var(--text-secondary)' }}>
            <li>Run the database migration in Supabase SQL Editor</li>
            <li>Add CRON_SECRET to your environment variables</li>
            <li>Deploy to Vercel for automatic cron scheduling</li>
            <li>Or trigger manually using the buttons above</li>
          </ol>
        </div>
      </div>

      <style jsx>{`
        .automation-dashboard {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          padding: 4rem 0;
        }
      `}</style>
    </div>
  )
}

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: number | string; color: string }) {
  return (
    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', textAlign: 'center' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{ fontSize: '2rem', fontWeight: 700, color }}>{value}</div>
      <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{label}</div>
    </div>
  )
}

function ScheduleItem({ task, frequency, time }: { task: string; frequency: string; time: string }) {
  return (
    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}>
      <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{task}</div>
      <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>🕐 {frequency} at {time}</div>
    </div>
  )
}
