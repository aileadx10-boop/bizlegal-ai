import Link from 'next/link'
import { CheckCircle, Mail, Clock, FileText } from 'lucide-react'

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { report?: string }
}) {
  const reportId = searchParams.report || 'TR-XXXX-XXXXX'

  return (
    <main style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>
        {/* Logo */}
        <div style={{ fontFamily: 'var(--mono)', fontSize: 22, letterSpacing: '0.1em', color: 'var(--text-bright)', marginBottom: 40 }}>
          TRA<span style={{ color: 'var(--amber)' }}>C</span>R
        </div>

        {/* Success icon */}
        <div style={{ width: 72, height: 72, background: 'rgba(30,132,73,0.15)', border: '1px solid rgba(30,132,73,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <CheckCircle size={32} style={{ color: 'var(--safe)' }} />
        </div>

        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, color: 'var(--text-bright)', marginBottom: 12 }}>
          Order Confirmed
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.75, marginBottom: 32, maxWidth: 440, margin: '0 auto 32px' }}>
          Your forensic analysis is underway. You&apos;ll receive the court-ready PDF report by email within 24–48 hours.
        </p>

        {/* Report ID */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '3px solid var(--amber)', padding: '20px 24px', marginBottom: 32, textAlign: 'left' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>
            Your Report ID
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 22, color: 'var(--amber)', letterSpacing: '0.05em' }}>
            {reportId}
          </div>
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8, lineHeight: 1.6 }}>
            Save this ID for reference. Your report will be attached to the delivery email.
          </p>
        </div>

        {/* What happens next */}
        <div style={{ textAlign: 'left', marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>
            What happens next
          </div>
          {[
            { icon: Mail,     text: 'Payment confirmation sent to your email immediately.' },
            { icon: FileText, text: 'AI forensic pipeline begins analyzing on-chain data.' },
            { icon: Clock,    text: 'Court-ready PDF generated and emailed within 24–48 hours.' },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={14} style={{ color: 'var(--amber)' }} />
              </div>
              <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6, paddingTop: 4 }}>{text}</p>
            </div>
          ))}
        </div>

        <Link href="/" className="btn-outline" style={{ display: 'inline-flex', padding: '12px 28px', fontSize: 14 }}>
          ← Back to TRACR
        </Link>

        <p style={{ marginTop: 24, fontSize: 11, color: 'var(--muted)', lineHeight: 1.6 }}>
          This report is for informational purposes only and does not constitute legal advice.
        </p>
      </div>
    </main>
  )
}
