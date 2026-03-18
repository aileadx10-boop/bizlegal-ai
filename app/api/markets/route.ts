import { NextResponse } from 'next/server'

export const revalidate = 0

interface CoinGeckoPrice {
  usd: number
  usd_24h_change: number
}

interface MarketItem {
  symbol: string
  name: string
  price: number
  change: number
  type: 'crypto' | 'stock'
}

async function getCrypto(): Promise<MarketItem[]> {
  const ids = 'bitcoin,ethereum,solana,binancecoin,ripple,cardano'
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('CoinGecko error')
  const data: Record<string, CoinGeckoPrice> = await res.json()
  const map: Record<string, { symbol: string; name: string }> = {
    bitcoin:     { symbol: 'BTC',  name: 'Bitcoin' },
    ethereum:    { symbol: 'ETH',  name: 'Ethereum' },
    solana:      { symbol: 'SOL',  name: 'Solana' },
    binancecoin: { symbol: 'BNB',  name: 'BNB' },
    ripple:      { symbol: 'XRP',  name: 'XRP' },
    cardano:     { symbol: 'ADA',  name: 'Cardano' },
  }
  return Object.entries(data).map(([id, v]) => ({
    symbol: map[id]?.symbol ?? id.toUpperCase(),
    name:   map[id]?.name ?? id,
    price:  v.usd,
    change: v.usd_24h_change,
    type:   'crypto' as const,
  }))
}

async function getStock(ticker: string, name: string): Promise<MarketItem | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const json = await res.json()
    const meta = json?.chart?.result?.[0]?.meta
    if (!meta) return null
    const price: number = meta.regularMarketPrice ?? 0
    const prev: number  = meta.chartPreviousClose ?? meta.previousClose ?? price
    const change = prev > 0 ? ((price - prev) / prev) * 100 : 0
    return { symbol: ticker, name, price, change, type: 'stock' }
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const [crypto, sp500, nasdaq, apple, msft, tsla] = await Promise.allSettled([
      getCrypto(),
      getStock('SPY',  'S&P 500'),
      getStock('QQQ',  'Nasdaq'),
      getStock('AAPL', 'Apple'),
      getStock('MSFT', 'Microsoft'),
      getStock('TSLA', 'Tesla'),
    ])

    const stocks: MarketItem[] = [sp500, nasdaq, apple, msft, tsla]
      .filter(r => r.status === 'fulfilled' && r.value !== null)
      .map(r => (r as PromiseFulfilledResult<MarketItem>).value)

    const cryptoItems: MarketItem[] = crypto.status === 'fulfilled' ? crypto.value : []

    return NextResponse.json(
      { crypto: cryptoItems, stocks, updatedAt: Date.now() },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } }
    )
  } catch {
    return NextResponse.json({ crypto: [], stocks: [], updatedAt: Date.now() })
  }
}
