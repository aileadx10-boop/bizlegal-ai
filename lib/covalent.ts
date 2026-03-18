const COVALENT_BASE = 'https://api.covalenthq.com/v1'

const CHAIN_IDS: Record<string, number> = {
  ethereum:  1,
  bnb:       56,
  polygon:   137,
  avalanche: 43114,
  arbitrum:  42161,
  optimism:  10,
}

export interface Transaction {
  tx_hash: string
  from_address: string
  to_address: string
  value: string
  block_signed_at: string
  successful: boolean
  gas_spent: number
}

export async function getTransactions(
  wallet: string,
  network = 'ethereum'
): Promise<Transaction[]> {
  const chainId = CHAIN_IDS[network.toLowerCase()] || 1
  const url = `${COVALENT_BASE}/${chainId}/address/${wallet}/transactions_v2/?key=${process.env.COVALENT_API_KEY}&page-size=100`

  const res = await fetch(url)
  if (!res.ok) {
    // Fallback to Etherscan on error
    return getTransactionsEtherscan(wallet)
  }

  const data = await res.json()
  return data.data?.items || []
}

async function getTransactionsEtherscan(wallet: string): Promise<Transaction[]> {
  if (!process.env.ETHERSCAN_API_KEY) return []

  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${wallet}&sort=desc&apikey=${process.env.ETHERSCAN_API_KEY}&offset=100`
  const res = await fetch(url)
  if (!res.ok) return []

  const data = await res.json()
  if (data.status !== '1') return []

  return (data.result || []).map((tx: Record<string, string>) => ({
    tx_hash:         tx.hash,
    from_address:    tx.from,
    to_address:      tx.to,
    value:           tx.value,
    block_signed_at: new Date(parseInt(tx.timeStamp) * 1000).toISOString(),
    successful:      tx.isError === '0',
    gas_spent:       parseInt(tx.gasUsed),
  }))
}

export async function getTokenBalances(wallet: string, network = 'ethereum') {
  const chainId = CHAIN_IDS[network.toLowerCase()] || 1
  const url = `${COVALENT_BASE}/${chainId}/address/${wallet}/balances_v2/?key=${process.env.COVALENT_API_KEY}`

  const res = await fetch(url)
  if (!res.ok) return []

  const data = await res.json()
  return data.data?.items || []
}
