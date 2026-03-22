import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enterprise Tool Suite — ROI Calculator, Compliance & Risk Matrix | DOR INNOVATIONS',
  description: 'Enterprise-grade AI tools: ROI Calculator with 3-year projections, Multi-Framework Compliance Estimator (SOC 2, ISO 27001, HIPAA, GDPR), ISO 31000 Risk Matrix.',
}

export default function EnterpriseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
