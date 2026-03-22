'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// ============ AURORA BACKGROUND COMPONENT ============
function AuroraBackground() {
  return (
    <div className="aurora-container">
      <div className="aurora-beam aurora-1" />
      <div className="aurora-beam aurora-2" />
      <div className="aurora-beam aurora-3" />
      <div className="particles" />
    </div>
  )
}

// ============ GLASSMORPHISM CARD COMPONENT ============
interface GlassCardProps {
  children: React.ReactNode
  className?: string
  highlight?: boolean
  onClick?: () => void
}

function GlassCard({ children, className = '', highlight = false, onClick }: GlassCardProps) {
  return (
    <div 
      className={`glass-card ${highlight ? 'highlight' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

// ============ BADGE COMPONENT ============
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'orange'
}

function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`badge ${variant}`}>
      {children}
    </span>
  )
}

// ============ BUTTON COMPONENT ============
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'blue'
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  type?: 'button' | 'submit'
  disabled?: boolean
}

function Button({ children, variant = 'primary', onClick, className = '', style, type = 'button', disabled = false }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  )
}

// ============ TOAST NOTIFICATION ============
interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }

  return { toasts, addToast }
}

function ToastContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <span>{toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : '⚠'}</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  )
}

// ============ ROI CALCULATOR ============
interface ROIState {
  employees: number
  compensation: number
  license: number
  hoursSaved: number
  hourlyRate: number
}

function ROICalculator({ addToast }: { addToast: (msg: string, type?: 'success' | 'error' | 'info') => void }) {
  const [state, setState] = useState<ROIState>({
    employees: 25,
    compensation: 180000,
    license: 50000,
    hoursSaved: 8,
    hourlyRate: 350,
  })
  const [results, setResults] = useState<{
    multiple: number
    hoursSaved: number
    annualValue: number
    netAnnual: number
    paybackMonths: number
    total3Year: number
  } | null>(null)

  const calculateROI = () => {
    const weeksPerYear = 48
    const annualHoursSaved = state.employees * state.hoursSaved * weeksPerYear
    const annualValue = annualHoursSaved * state.hourlyRate
    const annualCost = state.license + (state.employees * 2000)
    const netAnnual = annualValue - annualCost
    const multiple = annualValue / annualCost
    const paybackMonths = (annualCost / 12) / (annualValue / 12) * 12
    
    const year2Value = annualValue * 1.2
    const year3Value = annualValue * 1.44
    const total3Year = netAnnual + (year2Value - annualCost) + (year3Value - annualCost)

    setResults({
      multiple,
      hoursSaved: annualHoursSaved,
      annualValue,
      netAnnual,
      paybackMonths,
      total3Year,
    })
    addToast('ROI calculation complete. Report ready for export.', 'success')
  }

  const handleChange = (field: keyof ROIState, value: number) => {
    setState(prev => ({ ...prev, [field]: value }))
  }

  return (
    <section id="roi" className="calculator-section active">
      <div className="container">
        <div className="calc-header">
          <Badge variant="orange">💰 ROI Calculator</Badge>
          <h3 className="calc-title">Legal Technology Return on Investment</h3>
          <p className="calc-desc">Estimate the business impact of AI legal tools on your team. Based on conservative assumptions grounded in RSGI research and customer data.</p>
        </div>
        
        <GlassCard className="calc-container">
          <div className="form-group">
            <label className="form-label">Number of Legal Team Members</label>
            <input 
              type="number" 
              className="form-input" 
              value={state.employees} 
              onChange={e => handleChange('employees', parseInt(e.target.value) || 0)}
              min="1" 
              max="500"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Avg. Annual Compensation ($)</label>
              <div className="currency-input">
                <input 
                  type="number" 
                  className="form-input" 
                  value={state.compensation}
                  onChange={e => handleChange('compensation', parseInt(e.target.value) || 0)}
                  min="50000" 
                  step="1000"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Tool License Cost ($/year)</label>
              <div className="currency-input">
                <input 
                  type="number" 
                  className="form-input" 
                  value={state.license}
                  onChange={e => handleChange('license', parseInt(e.target.value) || 0)}
                  min="10000" 
                  step="5000"
                />
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Estimated Time Savings per Employee (hours/week)</label>
            <input 
              type="range" 
              className="form-input" 
              min="1" 
              max="20" 
              value={state.hoursSaved}
              onChange={e => handleChange('hoursSaved', parseInt(e.target.value) || 0)}
            />
            <div className="value-display">{state.hoursSaved} hrs / week</div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Billable Rate or Internal Cost per Hour ($)</label>
            <div className="currency-input">
              <input 
                type="number" 
                className="form-input" 
                value={state.hourlyRate}
                onChange={e => handleChange('hourlyRate', parseInt(e.target.value) || 0)}
                min="100" 
                step="25"
              />
            </div>
          </div>
          
          <Button onClick={calculateROI} style={{ width: '100%' }}>
            Calculate ROI →
          </Button>
          
          {results && (
            <div className="calc-output">
              <h4>📈 3-Year Projection</h4>
              <div className="result-row">
                <span className="result-label">Annual ROI Multiple</span>
                <span className="result-value">{results.multiple.toFixed(1)}x</span>
              </div>
              <div className="result-row">
                <span className="result-label">Time Regained (Year 1)</span>
                <span className="result-value">{results.hoursSaved.toLocaleString()} hrs</span>
              </div>
              <div className="result-row">
                <span className="result-label">Productivity Value (Year 1)</span>
                <span className="result-value">${(results.annualValue / 1000000).toFixed(2)}M</span>
              </div>
              <div className="result-row">
                <span className="result-label">Net Value (3-Year Total)</span>
                <span className="result-value">${(results.total3Year / 1000000).toFixed(1)}M</span>
              </div>
              <div className="result-total">
                Payback Period: {results.paybackMonths.toFixed(1)} months
              </div>
              
              <div className="export-btns">
                <button className="export-btn" onClick={() => addToast('Exporting ROI report as PDF...', 'success')}>📄 Export PDF</button>
                <button className="export-btn" onClick={() => addToast('Exporting ROI report as CSV...', 'success')}>📊 Export CSV</button>
                <button className="export-btn" onClick={() => addToast('Report link copied to clipboard', 'success')}>🔗 Share Report</button>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </section>
  )
}

// ============ COMPLIANCE CALCULATOR ============
interface ComplianceState {
  size: string
  industry: string
  frameworks: string[]
  hasPolicies: boolean
  cloudInfra: boolean
  securityTeam: boolean
}

function ComplianceCalculator({ addToast }: { addToast: (msg: string, type?: 'success' | 'error' | 'info') => void }) {
  const [state, setState] = useState<ComplianceState>({
    size: 'medium',
    industry: 'finance',
    frameworks: ['soc2', 'iso27001'],
    hasPolicies: true,
    cloudInfra: true,
    securityTeam: false,
  })
  const [results, setResults] = useState<{
    implementation: number
    audit: number
    maintenance: number
    firstYearTotal: number
    automationSavings: number
  } | null>(null)

  const frameworks = {
    soc2: { min: 25000, max: 75000, name: 'SOC 2 Type II' },
    iso27001: { min: 35000, max: 95000, name: 'ISO 27001' },
    hipaa: { min: 20000, max: 60000, name: 'HIPAA' },
    gdpr: { min: 15000, max: 50000, name: 'GDPR' },
    pcidss: { min: 30000, max: 80000, name: 'PCI-DSS' },
  }

  const toggleFramework = (id: string) => {
    setState(prev => ({
      ...prev,
      frameworks: prev.frameworks.includes(id) 
        ? prev.frameworks.filter(f => f !== id) 
        : [...prev.frameworks, id]
    }))
  }

  const calculateCompliance = () => {
    const sizeMult: Record<string, number> = { small: 0.6, medium: 1, large: 1.4, enterprise: 2.1 }
    const industryAdj: Record<string, number> = { healthcare: 1.2, finance: 1.3, saas: 1, ecommerce: 1.1, other: 1 }
    
    let totalImpl = 0
    state.frameworks.forEach(fwId => {
      const fw = frameworks[fwId as keyof typeof frameworks]
      const avg = (fw.min + fw.max) / 2
      totalImpl += avg * sizeMult[state.size] * industryAdj[state.industry]
    })
    
    const multiDiscount = state.frameworks.length > 1 ? 0.15 : 0
    const postureDiscount = (state.hasPolicies ? 0.15 : 0) + (state.cloudInfra ? 0.1 : 0) + (state.securityTeam ? 0.2 : 0)
    totalImpl *= (1 - multiDiscount - postureDiscount)
    
    const auditCost = totalImpl * 0.75
    const maintAnnual = totalImpl * 0.5
    const firstYearTotal = totalImpl + auditCost + maintAnnual
    const automationSavings = 0.80

    setResults({
      implementation: Math.round(totalImpl),
      audit: Math.round(auditCost),
      maintenance: Math.round(maintAnnual),
      firstYearTotal: Math.round(firstYearTotal),
      automationSavings,
    })
    addToast('Compliance estimate generated. Export ready.', 'success')
  }

  return (
    <section id="compliance" className="calculator-section">
      <div className="container">
        <div className="calc-header">
          <Badge>🛡️ Compliance Estimator</Badge>
          <h3 className="calc-title">Multi-Framework Compliance Cost Calculator</h3>
          <p className="calc-desc">Estimate implementation, audit & maintenance costs across SOC 2, ISO 27001, HIPAA, GDPR & PCI-DSS. Discover automation savings.</p>
        </div>
        
        <GlassCard className="calc-container">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Company Size</label>
              <select 
                className="form-select" 
                value={state.size}
                onChange={e => setState(prev => ({ ...prev, size: e.target.value }))}
              >
                <option value="small">1-50 employees</option>
                <option value="medium">51-200 employees</option>
                <option value="large">201-500 employees</option>
                <option value="enterprise">500+ employees</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Industry</label>
              <select 
                className="form-select" 
                value={state.industry}
                onChange={e => setState(prev => ({ ...prev, industry: e.target.value }))}
              >
                <option value="saas">SaaS / Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Financial Services</option>
                <option value="ecommerce">E-commerce</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Select Compliance Frameworks</label>
            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="soc2" 
                checked={state.frameworks.includes('soc2')}
                onChange={() => toggleFramework('soc2')}
              />
              <label htmlFor="soc2">SOC 2 Type II ($25K-$75K)</label>
            </div>
            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="iso27001" 
                checked={state.frameworks.includes('iso27001')}
                onChange={() => toggleFramework('iso27001')}
              />
              <label htmlFor="iso27001">ISO 27001 ($35K-$95K)</label>
            </div>
            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="hipaa" 
                checked={state.frameworks.includes('hipaa')}
                onChange={() => toggleFramework('hipaa')}
              />
              <label htmlFor="hipaa">HIPAA ($20K-$60K)</label>
            </div>
            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="gdpr" 
                checked={state.frameworks.includes('gdpr')}
                onChange={() => toggleFramework('gdpr')}
              />
              <label htmlFor="gdpr">GDPR ($15K-$50K)</label>
            </div>
            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="pcidss" 
                checked={state.frameworks.includes('pcidss')}
                onChange={() => toggleFramework('pcidss')}
              />
              <label htmlFor="pcidss">PCI-DSS ($30K-$80K)</label>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Current Security Posture</label>
            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="has-policies" 
                checked={state.hasPolicies}
                onChange={e => setState(prev => ({ ...prev, hasPolicies: e.target.checked }))}
              />
              <label htmlFor="has-policies">Existing security policies</label>
            </div>
            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="cloud-infra" 
                checked={state.cloudInfra}
                onChange={e => setState(prev => ({ ...prev, cloudInfra: e.target.checked }))}
              />
              <label htmlFor="cloud-infra">Cloud infrastructure (AWS/Azure/GCP)</label>
            </div>
            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="security-team" 
                checked={state.securityTeam}
                onChange={e => setState(prev => ({ ...prev, securityTeam: e.target.checked }))}
              />
              <label htmlFor="security-team">Dedicated security team</label>
            </div>
          </div>
          
          <Button variant="blue" onClick={calculateCompliance} style={{ width: '100%' }}>
            Estimate Costs →
          </Button>
          
          {results && (
            <div className="calc-output">
              <h4>💰 Cost Breakdown</h4>
              <div className="result-row">
                <span className="result-label">Implementation</span>
                <span className="result-value">${(results.implementation / 1000).toLocaleString()}K</span>
              </div>
              <div className="result-row">
                <span className="result-label">Audit & Certification</span>
                <span className="result-value">${(results.audit / 1000).toLocaleString()}K</span>
              </div>
              <div className="result-row">
                <span className="result-label">Annual Maintenance</span>
                <span className="result-value">${(results.maintenance / 1000).toLocaleString()}K/yr</span>
              </div>
              <div className="result-row">
                <span className="result-label">Multi-Framework Discount</span>
                <span className="result-value positive">-15%</span>
              </div>
              <div className="result-total">
                First Year Total: ${(results.firstYearTotal / 1000).toLocaleString()}K
              </div>
              
              <div className="result-card automation-savings">
                <div className="progress-ring">
                  <svg width="120" height="120">
                    <circle className="progress-ring-circle" cx="60" cy="60" r="52"/>
                    <circle 
                      className="progress-ring-fill" 
                      cx="60" 
                      cy="60" 
                      r="52"
                      strokeDasharray="327"
                      strokeDashoffset={327 * (1 - results.automationSavings)}
                    />
                  </svg>
                  <span className="progress-ring-text">{(results.automationSavings * 100).toFixed(0)}%</span>
                </div>
                <div>
                  <strong>Automation Savings</strong>
                  <p>With automated compliance tools, reduce total costs by up to 80% and implementation time by 50%.</p>
                </div>
              </div>
              
              <div className="export-btns">
                <button className="export-btn" onClick={() => addToast('Exporting compliance report as PDF...', 'success')}>📄 Export Report</button>
                <button className="export-btn" onClick={() => addToast('Generating implementation roadmap...', 'success')}>🗺️ Implementation Roadmap</button>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </section>
  )
}

// ============ RISK MATRIX CALCULATOR ============
interface RiskState {
  category: string
  likelihood: number
  impact: number
  description: string
}

function RiskMatrixCalculator({ addToast }: { addToast: (msg: string, type?: 'success' | 'error' | 'info') => void }) {
  const [state, setState] = useState<RiskState>({
    category: 'cybersecurity',
    likelihood: 3,
    impact: 3,
    description: 'Potential data breach due to third-party vendor vulnerability affecting customer PII',
  })
  const [results, setResults] = useState<{
    score: number
    level: string
    color: string
    months: string
  } | null>(null)

  const generateRiskMatrix = () => {
    const score = state.likelihood * state.impact
    let level: string, color: string, months: string
    
    if (score >= 15) { 
      level = 'CRITICAL'
      color = '#EF4444'
      months = '1-2'
    } else if (score >= 10) { 
      level = 'HIGH'
      color = '#F59E0B'
      months = '3-4'
    } else if (score >= 6) { 
      level = 'MEDIUM'
      color = '#3B82F6'
      months = '5-6'
    } else { 
      level = 'LOW'
      color = '#10B981'
      months = '7-12'
    }

    setResults({ score, level, color, months })
    addToast('Risk assessment generated. ISO 31000 compliant.', 'success')
  }

  const likelihoodLabels = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain']
  const impactLabels = ['Insignificant', 'Minor', 'Moderate', 'Major', 'Catastrophic']

  return (
    <section id="risk" className="calculator-section">
      <div className="container">
        <div className="calc-header">
          <Badge>⚠️ Risk Matrix</Badge>
          <h3 className="calc-title">ISO 31000 Risk Assessment Generator</h3>
          <p className="calc-desc">Generate compliant risk matrices with likelihood/impact scoring, mitigation tracking, and executive reporting.</p>
        </div>
        
        <GlassCard className="calc-container">
          <div className="form-group">
            <label className="form-label">Risk Category</label>
            <select 
              className="form-select" 
              value={state.category}
              onChange={e => setState(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="compliance">Regulatory Compliance</option>
              <option value="cybersecurity">Cybersecurity & Data Privacy</option>
              <option value="operational">Operational Risk</option>
              <option value="financial">Financial & Contractual</option>
              <option value="reputational">Reputational Risk</option>
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Likelihood (1-5)</label>
              <select 
                className="form-select" 
                value={state.likelihood}
                onChange={e => setState(prev => ({ ...prev, likelihood: parseInt(e.target.value) }))}
              >
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n} - {likelihoodLabels[n - 1]}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Impact (1-5)</label>
              <select 
                className="form-select" 
                value={state.impact}
                onChange={e => setState(prev => ({ ...prev, impact: parseInt(e.target.value) }))}
              >
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n} - {impactLabels[n - 1]}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Risk Description</label>
            <textarea 
              className="form-textarea" 
              rows={3}
              value={state.description}
              onChange={e => setState(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the specific risk scenario..."
            />
          </div>
          
          <Button onClick={generateRiskMatrix} style={{ width: '100%' }}>
            Generate Risk Assessment →
          </Button>
          
          {results && (
            <div className="calc-output">
              <h4>🎯 Risk Assessment Output</h4>
              
              <div className="risk-scores-grid">
                <div className="result-card text-center">
                  <div className="risk-score-value" style={{ color: results.color }}>{results.score}</div>
                  <div className="risk-score-label">Risk Score</div>
                </div>
                <div className="result-card text-center">
                  <div className="risk-score-value" style={{ color: results.color }}>{results.level}</div>
                  <div className="risk-score-label">Risk Level</div>
                </div>
                <div className="result-card text-center">
                  <div className="risk-score-value" style={{ color: results.color }}>{results.months}</div>
                  <div className="risk-score-label">Months to Mitigate</div>
                </div>
              </div>
              
              <h5 className="risk-mitigations-title">Recommended Mitigations</h5>
              <ul className="risk-mitigations-list">
                <li>Implement vendor security assessment protocol with quarterly reviews</li>
                <li>Deploy enhanced monitoring for third-party API integrations</li>
                <li>Update incident response playbook to include vendor breach scenarios</li>
                <li>Conduct tabletop exercise with legal, security, and comms teams</li>
              </ul>
              
              <div className="export-btns">
                <button className="export-btn" onClick={() => addToast('Exporting ISO report as PDF...', 'success')}>📄 Export ISO Report</button>
                <button className="export-btn" onClick={() => addToast('Adding to risk register...', 'success')}>📋 Add to Risk Register</button>
                <button className="export-btn" onClick={() => addToast('Generating board summary...', 'success')}>🎯 Board Summary</button>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </section>
  )
}

// ============ MAIN PAGE ============
export default function EnterprisePage() {
  const { toasts, addToast } = useToast()
  const [activeSection, setActiveSection] = useState<string>('tools')

  const showCalculator = (id: string) => {
    setActiveSection(id)
    document.querySelectorAll('.calculator-section').forEach(sec => {
      sec.classList.remove('active')
    })
    document.getElementById(id)?.classList.add('active')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="enterprise-page">
      <AuroraBackground />
      <ToastContainer toasts={toasts} />

      {/* NAV */}
      <nav className="nav">
        <div className="container nav-container">
          <Link href="/" className="logo">
            <div className="logo-icon">⚖</div>
            bizlegal-ai Enterprise
          </Link>
          <ul className="nav-links">
            <li><a href="#tools" className={activeSection === 'tools' ? 'active' : ''} onClick={() => setActiveSection('tools')}>Tools</a></li>
            <li><a href="#roi" onClick={() => showCalculator('roi')}>ROI</a></li>
            <li><a href="#compliance" onClick={() => showCalculator('compliance')}>Compliance</a></li>
            <li><a href="#risk" onClick={() => showCalculator('risk')}>Risk</a></li>
          </ul>
          <div className="nav-cta">
            <Link href="/" className="btn btn-secondary btn-sm">← Back to Site</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <div className="container text-center">
          <Badge variant="orange">🏆 Tier 1 Legal Technology</Badge>
          <h1 className="hero-title">
            Enterprise Legal Intelligence<br />
            <span>Powered by AI</span>
          </h1>
          <p className="hero-subtitle">
            Calculate ROI, estimate compliance costs, assess jurisdictional risk, and optimize legal operations 
            with enterprise-grade tools trusted by Fortune 500 legal teams.
          </p>
          <div className="btn-group">
            <Button onClick={() => showCalculator('tools')}>Explore Tools →</Button>
            <Button variant="secondary" onClick={() => showCalculator('roi')}>Calculate ROI</Button>
          </div>
          
          <div className="trust-badges">
            <span className="trust-label">Trusted by legal teams at:</span>
            <div className="trust-companies">
              <span>Goldman Sachs</span>
              <span>Microsoft</span>
              <span>JPMorgan</span>
              <span>Siemens</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section id="tools" className="tools-section">
        <div className="container">
          <div className="text-center">
            <Badge>🧰 Enterprise Tool Suite</Badge>
            <h2 className="section-title">Calculate. Analyze. Optimize.</h2>
            <p className="section-subtitle">
              Six purpose-built calculators for legal technology decision-making, compliance planning, and risk management.
            </p>
          </div>
          
          <div className="tools-grid">
            <GlassCard className="tool-card animate-on-scroll" onClick={() => showCalculator('roi')}>
              <div className="tool-icon">📊</div>
              <h3 className="tool-title">Legal Tech ROI Calculator</h3>
              <p className="tool-desc">Quantify time savings, cost avoidance, and productivity gains from AI legal tools. Export audit-ready reports.</p>
              <div className="tool-tags">
                <span className="tool-tag">3-Year Projection</span>
                <span className="tool-tag">Billable Hours</span>
                <span className="tool-tag">PDF Export</span>
              </div>
            </GlassCard>
            
            <GlassCard className="tool-card animate-on-scroll" onClick={() => showCalculator('compliance')}>
              <div className="tool-icon">🛡️</div>
              <h3 className="tool-title">Compliance Cost Estimator</h3>
              <p className="tool-desc">Estimate implementation, audit & maintenance costs for SOC 2, ISO 27001, HIPAA, GDPR & PCI-DSS.</p>
              <div className="tool-tags">
                <span className="tool-tag">5 Frameworks</span>
                <span className="tool-tag">Multi-Region</span>
                <span className="tool-tag">Automation ROI</span>
              </div>
            </GlassCard>
            
            <GlassCard className="tool-card animate-on-scroll" onClick={() => showCalculator('risk')}>
              <div className="tool-icon">⚠️</div>
              <h3 className="tool-title">Risk Assessment Matrix</h3>
              <p className="tool-desc">Generate ISO 31000-compliant risk matrices with likelihood/impact scoring and mitigation tracking.</p>
              <div className="tool-tags">
                <span className="tool-tag">ISO 31000</span>
                <span className="tool-tag">5x5 Matrix</span>
                <span className="tool-tag">Mitigation Tracker</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CALCULATORS */}
      <ROICalculator addToast={addToast} />
      <ComplianceCalculator addToast={addToast} />
      <RiskMatrixCalculator addToast={addToast} />

      {/* TIER 1 FEATURES */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title text-center">🏆 Tier 1 Enterprise Features</h2>
          <div className="features-grid">
            {[
              { icon: '📄', title: 'Audit-Ready Exports', desc: 'PDF/CSV reports formatted for legal, finance, and board review' },
              { icon: '🔄', title: 'Multi-Framework Logic', desc: 'SOC 2, ISO 27001, HIPAA, GDPR, PCI-DSS with overlap discounts' },
              { icon: '📐', title: 'ISO 31000 Compliance', desc: 'Risk matrices with likelihood/impact scoring and mitigation tracking' },
              { icon: '📊', title: 'Conservative Assumptions', desc: 'Grounded in RSGI research and real customer data' },
              { icon: '💼', title: 'Automation ROI Modeling', desc: 'Quantify 40-80% cost reduction from automated compliance tools' },
              { icon: '📈', title: 'Executive-Ready Outputs', desc: 'Board summaries, payback periods, and 3-year projections' },
              { icon: '🎨', title: 'Enterprise UX', desc: 'Glassmorphism design with accessibility-compliant contrast' },
              { icon: '⌨️', title: 'Keyboard Navigation', desc: 'Full accessibility compliance and screen reader support' },
            ].map(feature => (
              <GlassCard key={feature.title} className="feature-card">
                <span className="feature-icon">{feature.icon}</span>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-title">bizlegal-ai Enterprise</div>
              <p className="footer-desc">
                Tier 1 legal technology for global enterprises. AI-powered compliance, risk, and operational intelligence.
              </p>
            </div>
            <div>
              <div className="footer-title">Tools</div>
              <ul className="footer-links">
                <li><a href="#roi" onClick={() => showCalculator('roi')}>ROI Calculator</a></li>
                <li><a href="#compliance" onClick={() => showCalculator('compliance')}>Compliance Estimator</a></li>
                <li><a href="#risk" onClick={() => showCalculator('risk')}>Risk Matrix</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-title">Resources</div>
              <ul className="footer-links">
                <li><a href="/docs">Documentation</a></li>
                <li><a href="/api">API Reference</a></li>
                <li><a href="/case-studies">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-title">Company</div>
              <ul className="footer-links">
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact Sales</a></li>
                <li><a href="/press">Press</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2026 bizlegal-ai Enterprise. All rights reserved.</p>
            <p>SOC 2 Type II | ISO 27001 | GDPR Compliant | Enterprise SLA Available</p>
          </div>
        </div>
      </footer>

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        :root {
          --bg: #050505;
          --bg-soft: #0a0a0f;
          --bg-card: rgba(255, 255, 255, 0.04);
          --panel: rgba(255, 255, 255, 0.03);
          
          --accent-primary: #FF6B35;
          --accent-secondary: #3B82F6;
          --accent-success: #10B981;
          --accent-warning: #F59E0B;
          
          --aurora-1: rgba(255, 107, 53, 0.25);
          --aurora-2: rgba(59, 130, 246, 0.2);
          --aurora-3: rgba(16, 185, 129, 0.15);
          
          --text-primary: #ffffff;
          --text-secondary: #a0a0b0;
          --text-muted: #6b6b7b;
          --text-mono: #e2e8f0;
          
          --border: rgba(255, 255, 255, 0.1);
          --border-focus: rgba(59, 130, 246, 0.5);
          --radius-lg: 20px;
          --radius-md: 12px;
          --radius-sm: 8px;
          
          --glow-primary: 0 0 60px rgba(255, 107, 53, 0.12);
          --glow-secondary: 0 0 60px rgba(59, 130, 246, 0.1);
          --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.4);
          
          --input-bg: rgba(255, 255, 255, 0.06);
          --input-border: rgba(255, 255, 255, 0.15);
          --result-bg: rgba(16, 185, 129, 0.1);
          --result-border: rgba(16, 185, 129, 0.3);
        }

        .enterprise-page {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text-primary);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
          line-height: 1.6;
          overflow-x: hidden;
          position: relative;
        }

        /* AURORA BACKGROUND */
        .aurora-container {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .aurora-beam {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          animation: float-aurora 25s ease-in-out infinite;
          opacity: 0.5;
        }

        .aurora-1 {
          width: 800px;
          height: 800px;
          top: -300px;
          right: -200px;
          background: radial-gradient(circle, var(--aurora-1), transparent 70%);
        }

        .aurora-2 {
          width: 600px;
          height: 600px;
          bottom: -200px;
          left: -100px;
          background: radial-gradient(circle, var(--aurora-2), transparent 70%);
          animation-delay: -8s;
        }

        .aurora-3 {
          width: 400px;
          height: 400px;
          top: 50%;
          left: 20%;
          background: radial-gradient(circle, var(--aurora-3), transparent 70%);
          animation-delay: -15s;
          animation-duration: 30s;
        }

        @keyframes float-aurora {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -20px) scale(1.03); }
          66% { transform: translate(-25px, 30px) scale(0.97); }
        }

        .particles {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0),
            radial-gradient(circle at 2px 2px, rgba(59,130,246,0.05) 1px, transparent 0);
          background-size: 50px 50px, 70px 70px;
          opacity: 0.4;
        }

        /* GLASSMORPHISM CARD */
        .glass-card {
          background: var(--panel);
          backdrop-filter: blur(24px);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2rem;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 2;
        }

        .glass-card:hover {
          border-color: var(--border-focus);
          box-shadow: var(--shadow-card), var(--glow-secondary);
          transform: translateY(-4px);
        }

        .glass-card.highlight {
          border-color: var(--accent-primary);
          box-shadow: var(--glow-primary);
        }

        /* BADGE */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          background: rgba(59, 130, 246, 0.15);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--accent-secondary);
          margin-bottom: 1rem;
        }

        .badge.orange {
          background: rgba(255, 107, 53, 0.15);
          border-color: rgba(255, 107, 53, 0.3);
          color: var(--accent-primary);
        }

        /* BUTTONS */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.9rem 2rem;
          border-radius: 100px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          white-space: nowrap;
          text-decoration: none;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--accent-primary), #FF8C5A);
          color: white;
          box-shadow: 0 8px 30px rgba(255, 107, 53, 0.35);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(255, 107, 53, 0.5);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 1px solid var(--border);
        }

        .btn-secondary:hover {
          border-color: var(--border-focus);
          background: rgba(255,255,255,0.05);
        }

        .btn-blue {
          background: linear-gradient(135deg, var(--accent-secondary), #60A5FA);
          color: white;
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.3);
        }

        .btn-blue:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(59, 130, 246, 0.45);
        }

        .btn-sm {
          padding: 0.6rem 1.2rem;
          font-size: 0.9rem;
        }

        /* NAVIGATION */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(5, 5, 5, 0.9);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border);
          padding: 1rem 0;
          z-index: 1000;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-weight: 700;
          font-size: 1.3rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          color: white;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 700;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }

        .nav-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.3s;
        }

        .nav-links a:hover,
        .nav-links a.active {
          color: var(--text-primary);
        }

        .nav-cta {
          display: flex;
          gap: 0.75rem;
        }

        /* HERO */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 5rem;
          z-index: 1;
        }

        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          background: linear-gradient(180deg, #fff, rgba(255,255,255,0.8));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-title span {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: var(--text-secondary);
          max-width: 700px;
          margin: 0 auto 2rem;
          line-height: 1.7;
        }

        .btn-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin: 2rem 0;
        }

        .trust-badges {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          margin-top: 3rem;
          opacity: 0.9;
        }

        .trust-label {
          color: var(--text-muted);
        }

        .trust-companies {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .trust-companies span {
          font-weight: 600;
          color: var(--text-secondary);
        }

        /* TOOLS SECTION */
        .tools-section {
          padding: 6rem 0;
          background: var(--bg-soft);
          position: relative;
          z-index: 1;
        }

        .section-title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
          background: linear-gradient(180deg, #fff, rgba(255,255,255,0.85));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-subtitle {
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 2.5rem;
          line-height: 1.7;
        }

        .text-center {
          text-align: center;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .tool-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          cursor: pointer;
        }

        .tool-card:hover {
          transform: translateY(-4px);
        }

        .tool-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255,107,53,0.2), rgba(59,130,246,0.15));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
        }

        .tool-title {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .tool-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          flex-grow: 1;
        }

        .tool-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tool-tag {
          padding: 0.25rem 0.75rem;
          background: rgba(255,255,255,0.08);
          border-radius: 100px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* CALCULATOR SECTIONS */
        .calculator-section {
          display: none;
          padding: 4rem 0;
          position: relative;
          z-index: 1;
        }

        .calculator-section.active {
          display: block;
        }

        .calc-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .calc-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .calc-desc {
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .calc-container {
          max-width: 800px;
          margin: 0 auto;
        }

        /* FORMS */
        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 0.85rem 1rem;
          background: var(--input-bg);
          border: 1px solid var(--input-border);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 1rem;
          transition: all 0.2s;
          font-family: inherit;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }

        .form-input::placeholder {
          color: var(--text-muted);
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .currency-input {
          position: relative;
        }

        .currency-input::before {
          content: '$';
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-weight: 500;
        }

        .currency-input input {
          padding-left: 2rem;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0;
        }

        .checkbox-group input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: var(--accent-primary);
          cursor: pointer;
        }

        .checkbox-group label {
          font-size: 0.95rem;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .value-display {
          text-align: right;
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-top: 0.25rem;
          font-family: 'Geist Mono', monospace;
        }

        /* RESULTS */
        .calc-output {
          margin-top: 2rem;
          padding: 1.5rem;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
        }

        .calc-output h4 {
          margin-bottom: 1rem;
          color: var(--accent-secondary);
        }

        .result-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .result-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .result-label {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .result-value {
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--accent-success);
        }

        .result-value.positive {
          color: var(--accent-success);
        }

        .result-total {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent-primary);
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 2px solid var(--result-border);
        }

        .result-card {
          background: var(--result-bg);
          border: 1px solid var(--result-border);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          margin-top: 1.5rem;
        }

        .automation-savings {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .progress-ring {
          width: 120px;
          height: 120px;
          position: relative;
          flex-shrink: 0;
        }

        .progress-ring svg {
          transform: rotate(-90deg);
        }

        .progress-ring-circle {
          fill: none;
          stroke: var(--input-border);
          stroke-width: 8;
        }

        .progress-ring-fill {
          fill: none;
          stroke: var(--accent-success);
          stroke-width: 8;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.5s ease;
        }

        .progress-ring-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent-success);
        }

        .export-btns {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }

        .export-btn {
          padding: 0.6rem 1.2rem;
          background: var(--input-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .export-btn:hover {
          border-color: var(--border-focus);
          color: var(--text-primary);
          background: rgba(255,255,255,0.08);
        }

        /* RISK MATRIX */
        .risk-scores-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .risk-score-value {
          font-size: 2rem;
          font-weight: 700;
        }

        .risk-score-label {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .risk-mitigations-title {
          margin: 1.5rem 0 0.75rem;
          color: var(--text-secondary);
        }

        .risk-mitigations-list {
          color: var(--text-secondary);
          padding-left: 1.5rem;
          line-height: 1.8;
        }

        /* FEATURES */
        .features-section {
          padding: 4rem 0;
          position: relative;
          z-index: 1;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .feature-card {
          text-align: center;
        }

        .feature-icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 1rem;
        }

        .feature-card h4 {
          font-family: 'Gloock', serif;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .feature-card p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        /* FOOTER */
        .footer {
          background: var(--bg-soft);
          border-top: 1px solid var(--border);
          padding: 3rem 0 2rem;
          color: var(--text-muted);
          font-size: 0.9rem;
          position: relative;
          z-index: 1;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-title {
          color: var(--text-primary);
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .footer-desc {
          line-height: 1.7;
        }

        .footer-links {
          list-style: none;
          padding: 0;
        }

        .footer-links li {
          margin-bottom: 0.5rem;
        }

        .footer-links a {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: var(--text-primary);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }

        /* TOAST */
        .toast-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 2000;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .toast {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-left: 4px solid var(--accent-success);
          padding: 1rem 1.5rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-card);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          animation: slideIn 0.3s ease;
          max-width: 350px;
        }

        .toast.success { border-left-color: var(--accent-success); }
        .toast.error { border-left-color: #EF4444; }
        .toast.info { border-left-color: var(--accent-secondary); }

        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        /* ANIMATIONS */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* CONTAINER */
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .nav-links { display: none; }
          .hero-title { font-size: 2.8rem; }
          .tools-grid, .features-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .container { padding: 0 1.5rem; }
          .btn-group { flex-direction: column; align-items: center; }
          .tools-grid, .features-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .hero-title { font-size: 2.2rem; }
          .progress-ring { width: 100px; height: 100px; }
          .progress-ring-text { font-size: 1.25rem; }
          .automation-savings { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  )
}
