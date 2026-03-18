import { Transaction } from './covalent'

export interface RiskResult {
  score: number
  level: 'Low' | 'Moderate' | 'High' | 'Critical'
  flags: RiskFlag[]
  metrics: WalletMetrics
}

export interface RiskFlag {
  severity: 'critical' | 'high' | 'medium' | 'informational'
  title: string
  description: string
  weight: number
}

export interface WalletMetrics {
  totalTransactions: number
  totalVolumeETH: number
  uniqueCounterparties: number
  maxTxPerDay: number
  firstSeen: string
  lastSeen: string
  avgTxValue: string
}

// Known high-risk addresses — extend from OFAC SDN crypto list
const KNOWN_RISKY = new Set([
  '0xd882cfc20f52f2599d84b8e8d58c7fb62cfe344b',
  '0x8576acc5c05d6ce88f4e49bf65bdf0c62f91353c',
])

export function calculateRisk(txs: Transaction[]): RiskResult {
  let score = 0
  const flags: RiskFlag[] = []

  if (txs.length === 0) {
    return {
      score: 0,
      level: 'Low',
      flags: [{
        severity: 'informational',
        title: 'No Transaction History',
        description: 'This wallet has no recorded on-chain transactions.',
        weight: 0,
      }],
      metrics: {
        totalTransactions: 0, totalVolumeETH: 0,
        uniqueCounterparties: 0, maxTxPerDay: 0,
        firstSeen: 'N/A', lastSeen: 'N/A', avgTxValue: '0',
      },
    }
  }

  // ── METRICS ──────────────────────────────────────────────
  const counterparties = new Set<string>()
  txs.forEach(tx => {
    if (tx.to_address)   counterparties.add(tx.to_address.toLowerCase())
    if (tx.from_address) counterparties.add(tx.from_address.toLowerCase())
  })

  const txsByDay: Record<string, number> = {}
  txs.forEach(tx => {
    const day = tx.block_signed_at?.split('T')[0] || 'unknown'
    txsByDay[day] = (txsByDay[day] || 0) + 1
  })
  const maxTxPerDay = Math.max(...Object.values(txsByDay), 0)

  const totalValue = txs.reduce((sum, tx) => sum + parseFloat(tx.value || '0'), 0)
  const avgTxValue = (totalValue / txs.length / 1e18).toFixed(4)

  const sortedTxs = [...txs].sort((a, b) =>
    new Date(a.block_signed_at).getTime() - new Date(b.block_signed_at).getTime()
  )

  const metrics: WalletMetrics = {
    totalTransactions:  txs.length,
    totalVolumeETH:     totalValue / 1e18,
    uniqueCounterparties: counterparties.size,
    maxTxPerDay,
    firstSeen: sortedTxs[0]?.block_signed_at || 'Unknown',
    lastSeen:  sortedTxs[sortedTxs.length - 1]?.block_signed_at || 'Unknown',
    avgTxValue,
  }

  // ── HEURISTICS ───────────────────────────────────────────

  // 1. Transaction volume
  if (txs.length > 500) {
    score += 20
    flags.push({ severity: 'high', weight: 20,
      title: 'Extremely High Transaction Volume',
      description: `${txs.length} transactions recorded — significantly above baseline for retail wallets.` })
  } else if (txs.length > 100) {
    score += 10
    flags.push({ severity: 'medium', weight: 10,
      title: 'Elevated Transaction Volume',
      description: `${txs.length} total transactions indicates high-frequency activity.` })
  }

  // 2. Rapid bursts (layering indicator)
  if (maxTxPerDay > 30) {
    score += 30
    flags.push({ severity: 'high', weight: 30,
      title: 'Rapid Transaction Bursts Detected',
      description: `Up to ${maxTxPerDay} transactions in a single day — consistent with fund layering patterns.` })
  } else if (maxTxPerDay > 15) {
    score += 15
    flags.push({ severity: 'medium', weight: 15,
      title: 'Moderate Transaction Bursting',
      description: `${maxTxPerDay} transactions in one day observed, warranting further review.` })
  }

  // 3. Known risky address interaction
  const riskyTx = txs.find(tx =>
    KNOWN_RISKY.has(tx.to_address?.toLowerCase() || '') ||
    KNOWN_RISKY.has(tx.from_address?.toLowerCase() || '')
  )
  if (riskyTx) {
    score += 40
    flags.push({ severity: 'critical', weight: 40,
      title: 'Interaction with Flagged Address',
      description: 'Direct transaction to/from a flagged high-risk entity identified in this analysis.' })
  }

  // 4. Large single transaction (>10 ETH)
  const largeTx = txs.find(tx => parseFloat(tx.value || '0') > 10e18)
  if (largeTx) {
    score += 20
    flags.push({ severity: 'medium', weight: 20,
      title: 'Large Value Movement',
      description: 'Transaction(s) exceeding 10 ETH detected. Source-of-funds verification may be warranted.' })
  }

  // 5. New wallet + high activity
  const ageDays = (Date.now() - new Date(sortedTxs[0]?.block_signed_at || 0).getTime()) / 86_400_000
  if (ageDays < 30 && txs.length > 50) {
    score += 25
    flags.push({ severity: 'high', weight: 25,
      title: 'New Wallet, High Activity',
      description: `Wallet is less than 30 days old with ${txs.length} transactions — pattern associated with throwaway wallets.` })
  }

  // 6. High counterparty diversity
  if (counterparties.size > 100 && txs.length > 200) {
    score += 15
    flags.push({ severity: 'medium', weight: 15,
      title: 'High Counterparty Diversity',
      description: `${counterparties.size} unique addresses — may indicate commercial operation or deliberate fund dispersal.` })
  }

  flags.push({ severity: 'informational', weight: 0,
    title: 'Analysis Scope',
    description: `Report covers ${txs.length} transactions involving ${counterparties.size} unique addresses.` })

  const finalScore = Math.min(score, 100)
  let level: RiskResult['level'] = 'Low'
  if (finalScore >= 75)      level = 'Critical'
  else if (finalScore >= 50) level = 'High'
  else if (finalScore >= 25) level = 'Moderate'

  return { score: finalScore, level, flags, metrics }
}
