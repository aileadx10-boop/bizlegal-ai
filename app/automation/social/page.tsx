'use client'

import Link from 'next/link'

const SOCIAL_ACCOUNTS = [
  {
    platform: 'Facebook',
    handle: 'DorInnovations',
    url: 'https://www.facebook.com/DorInnovations/',
    icon: '📘',
    color: '#1877F2',
  },
  {
    platform: 'Instagram',
    handle: '@dorinnovations',
    url: 'https://www.instagram.com/dorinnovations/',
    icon: '📷',
    color: '#E4405F',
  },
  {
    platform: 'Twitter/X',
    handle: '@DorInnovations',
    url: 'https://x.com/DorInnovations',
    icon: '𝕏',
    color: '#000000',
  },
  {
    platform: 'Pinterest',
    handle: 'DorInnovations',
    url: 'https://www.pinterest.com/DorInnovations/',
    icon: '📌',
    color: '#E60023',
  },
  {
    platform: 'LinkedIn',
    handle: 'Dor Innovations',
    url: 'https://www.linkedin.com/company/DorInnovations',
    icon: '💼',
    color: '#0A66C2',
  },
  {
    platform: 'YouTube',
    handle: '@DorInnovations',
    url: 'https://www.youtube.com/@DorInnovations',
    icon: '📺',
    color: '#FF0000',
  },
  {
    platform: 'Substack',
    handle: 'dorinnovations',
    url: 'https://substack.com/@Downloads/dor innovations.png',
    icon: '📧',
    color: '#FF6719',
  },
]

export default function SocialMediaAccounts() {
  return (
    <div className="social-accounts-page">
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/automation/dashboard" style={{ color: 'var(--sky)', textDecoration: 'none', marginBottom: '1rem', display: 'block' }}>
            &larr; Back to Automation Dashboard
          </Link>
          <h1 style={{ fontFamily: 'Gloock, serif', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            📱 Dor Innovations Social Media Accounts
          </h1>
          <p style={{ color: 'var(--muted)' }}>
            7 connected platforms for automated publishing
          </p>
        </div>

        {/* Business Info */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '1.5rem', marginBottom: '1rem' }}>
            Business Information
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Business Name</div>
              <div style={{ fontWeight: 600 }}>Dor Innovations</div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Email</div>
              <div style={{ fontWeight: 600 }}>ai.leadx10@gmail.com</div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Total Platforms</div>
              <div style={{ fontWeight: 600 }}>7 Active</div>
            </div>
          </div>
        </div>

        {/* Social Accounts Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {SOCIAL_ACCOUNTS.map(account => (
            <a
              key={account.platform}
              href={account.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.5rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = account.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              }}
            >
              <div style={{
                fontSize: '2.5rem',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: account.color + '20',
                borderRadius: '12px',
              }}>
                {account.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{account.platform}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{account.handle}</div>
              </div>
              <div style={{ fontSize: '1.5rem', color: 'var(--muted)' }}>↗</div>
            </a>
          ))}
        </div>

        {/* Automation Status */}
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
        }}>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '1.5rem', marginBottom: '1rem' }}>
            ✅ Automation Status
          </h2>
          <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            All 7 platforms are configured for automated posting. When new SEO content is generated, 
            it will be automatically adapted and scheduled for each platform based on their optimal posting times.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
          }}>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Auto-Posting</div>
              <div style={{ fontWeight: 600, color: '#10B981' }}>✓ Enabled</div>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Content Adaptation</div>
              <div style={{ fontWeight: 600, color: '#10B981' }}>✓ AI-Powered</div>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Scheduling</div>
              <div style={{ fontWeight: 600, color: '#10B981' }}>✓ Platform-Optimized</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .social-accounts-page {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          padding: 4rem 0;
        }
      `}</style>
    </div>
  )
}
