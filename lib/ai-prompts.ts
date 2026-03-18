import Anthropic from '@anthropic-ai/sdk'
import { RiskResult } from './risk-engine'
import { Transaction } from './covalent'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function simplifyTxs(txs: Transaction[]) {
  return txs.slice(0, 20).map(tx => ({
    hash:     tx.tx_hash?.slice(0, 16) + '…',
    from:     tx.from_address?.slice(0, 10) + '…',
    to:       tx.to_address?.slice(0, 10) + '…',
    valueETH: (parseFloat(tx.value || '0') / 1e18).toFixed(4),
    time:     tx.block_signed_at?.split('T')[0],
  }))
}

async function callClaude(prompt: string, maxTokens: number): Promise<string> {
  const res = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: maxTokens,
    messages: [{ role: 'user', content: prompt }],
  })
  return (res.content[0] as { type: string; text: string }).text
}

function parseJSON<T>(text: string): T {
  const clean = text.replace(/```json|```/g, '').trim()
  const match = clean.match(/\{[\s\S]*\}/)
  if (!match) throw new Error('No JSON found in AI response')
  return JSON.parse(match[0]) as T
}

// STAGE 1: Behavioral pattern extraction
async function extractPatterns(txs: Transaction[], metrics: RiskResult['metrics']): Promise<string> {
  const prompt = `You are a blockchain data analyst. Extract behavioral patterns from this wallet data.

METRICS:
- Total transactions: ${metrics.totalTransactions}
- Unique counterparties: ${metrics.uniqueCounterparties}
- Peak activity: ${metrics.maxTxPerDay} tx/day
- First seen: ${metrics.firstSeen}
- Last seen: ${metrics.lastSeen}
- Avg tx value: ${metrics.avgTxValue} ETH

TRANSACTION SAMPLE:
${JSON.stringify(simplifyTxs(txs), null, 2)}

OUTPUT (JSON only, no markdown):
{
  "transactionBehavior": "description of flow patterns",
  "frequencyPattern": "description of timing",
  "counterpartyPattern": "description of relationships",
  "anomalies": ["anomaly 1", "anomaly 2"],
  "dataQuality": "notes on data completeness"
}`
  return callClaude(prompt, 600)
}

// STAGE 2: Risk classification
async function classifyRisk(patterns: string, risk: RiskResult): Promise<string> {
  const prompt = `You are a blockchain risk analyst. Classify risk based on behavioral analysis.

PATTERN ANALYSIS:
${patterns}

COMPUTED RISK FLAGS:
${risk.flags.map(f => `[${f.severity.toUpperCase()}] ${f.title}: ${f.description}`).join('\n')}

RISK SCORE: ${risk.score}/100 — ${risk.level}

OUTPUT (JSON only, no markdown):
{
  "primaryRisks": ["top risk 1", "top risk 2", "top risk 3"],
  "mitigatingFactors": ["factor 1 if any"],
  "riskJustification": "2-3 sentence explanation of score",
  "complianceConcerns": "AML/KYC implications in plain language"
}`
  return callClaude(prompt, 500)
}

// STAGE 3: Legal framing
async function frameLegally(riskAnalysis: string, score: number): Promise<string> {
  const prompt = `You are a legal analyst specializing in financial compliance and forensic evidence.

RISK ANALYSIS:
${riskAnalysis}

RISK SCORE: ${score}/100

Translate this technical analysis into language suitable for lawyers, judges, and compliance officers.

OUTPUT (JSON only, no markdown):
{
  "legalSummary": "2-3 sentences suitable for court documentation",
  "regulatoryContext": "AML/FATF/sanctions relevance",
  "recommendedActions": ["action 1", "action 2"],
  "limitations": "data limitations and uncertainty boundaries",
  "expertOpinion": "cautious, defensible professional opinion using 'consistent with', 'may indicate', 'warrants further investigation'"
}

IMPORTANT: Never assert criminality. Use only cautious, evidence-based language.`
  return callClaude(prompt, 600)
}

// STAGE 4: Final synthesis
async function synthesizeReport(
  wallet: string,
  patterns: string,
  riskAnalysis: string,
  legalFraming: string,
  risk: RiskResult
): Promise<ReportContent> {
  const prompt = `You are a senior blockchain forensic analyst writing a professional report for legal professionals.

WALLET: ${wallet}
RISK SCORE: ${risk.score}/100 — ${risk.level}

BEHAVIORAL PATTERNS: ${patterns}
RISK ANALYSIS: ${riskAnalysis}
LEGAL FRAMING: ${legalFraming}

Write the complete report content. OUTPUT (JSON only, no markdown):
{
  "executiveSummary": "3-4 sentences — clear, non-technical overview for a lawyer",
  "keyFindings": [
    { "title": "Finding", "detail": "explanation", "implication": "legal/compliance significance" }
  ],
  "behavioralAnalysis": "2-3 paragraphs on transaction patterns and behavioral indicators",
  "riskInterpretation": "What this score means practically for legal use",
  "legalComplianceContext": "Regulatory and legal implications, cautious language",
  "limitations": "Clear statement of data boundaries and methodology limits",
  "conclusion": "2-3 sentences — cautious, defensible, evidence-based final statement"
}

REQUIREMENTS:
- Formal, neutral, professional tone throughout
- Never claim criminality — only risk indicators
- Language suitable for legal review
- 400–700 words total`

  const text = await callClaude(prompt, 1200)
  return parseJSON<ReportContent>(text)
}

export interface ReportContent {
  executiveSummary: string
  keyFindings: { title: string; detail: string; implication: string }[]
  behavioralAnalysis: string
  riskInterpretation: string
  legalComplianceContext: string
  limitations: string
  conclusion: string
}

// MASTER: Full 4-stage pipeline
export async function generateFullReport(
  wallet: string,
  txs: Transaction[],
  risk: RiskResult
): Promise<ReportContent> {
  const patterns     = await extractPatterns(txs, risk.metrics)
  const riskAnalysis = await classifyRisk(patterns, risk)
  const legalFraming = await frameLegally(riskAnalysis, risk.score)
  return synthesizeReport(wallet, patterns, riskAnalysis, legalFraming, risk)
}

// FREE TIER: Single-call preview
export async function generatePreview(wallet: string, risk: RiskResult): Promise<string> {
  const prompt = `You are a blockchain risk analyst. Write a compelling 2-3 sentence preview summary.

Wallet: ${wallet}
Risk Score: ${risk.score}/100 — ${risk.level}
Top Flag: ${risk.flags[0]?.title || 'General risk indicators detected'}

Output 2-3 sentences that:
1. State the risk level clearly
2. Mention the most concerning finding
3. Create urgency to see the full report

Use professional language. Do not fabricate specific entities.`

  return callClaude(prompt, 200)
}
