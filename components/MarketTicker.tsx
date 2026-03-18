'use client'
import { useEffect, useState, useRef } from 'react'

interface MarketItem {
  symbol: string
  name: string
  price: number
  change: number
  type: 'crypto' | 'stock'
}

function fmt(price: number, type: 'crypto' | 'stock'): string {
  if (price >= 10000) return '$' + price.toLocaleString('en-US', { maximumFractionDigits: 0 })
  if (price >= 100) return '$' + price.toLocaleString('en-US', { maximumFractionDigits: 2 })
  if (price >= 1) return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return '$' + price.toFixed(4)
}

function TickerItem({ item }: { item: MarketItem }) {
  const pos = item.change >= 0
  return (
    <span className="ticker-item">
      <span className="ticker-type">{item.type === 'crypto' ? '◆' : '▲'}</span>
      <span className="ticker-sym">{item.symbol}</span>
      <span className="ticker-price">{fmt(item.price, item.type)}</span>
      <span className={pos ? 'ticker-up' : 'ticker-dn'}>
        {pos ? '▲' : '▼'} {Math.abs(item.change).toFixed(2)}%
      </span>
    </span>
  )
}

export default function MarketTicker() {
  const [data, setData] = useState<{ crypto: MarketItem[]; stocks: MarketItem[] } | null>(null)
  const [error, setError] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  async function load() {
    try {
      const res = await fetch('/api/markets')
      if (!res.ok) throw new Error('Failed')
      const json = await res.json()
      setData(json)
      setError(false)
    } catch {
      setError(true)
    }
  }

  useEffect(() => {
    load()
    intervalRef.current = setInterval(load, 60_000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const items = data ? [...(data.stocks ?? []), ...(data.crypto ?? [])] : []

  if (error && !data) return null

  return (
    <div className="market-ticker" aria-label="Live market prices">
      <span className="ticker-label">
        <span className="ticker-live-dot" />
        LIVE
      </span>
      <div className="ticker-track-wrap">
        <div className="ticker-track">
          {[...items, ...items].map((item, i) => (
            <TickerItem key={`${item.symbol}-${i}`} item={item} />
          ))}
        </div>
      </div>
      <span className="ticker-delay">15m delay</span>
    </div>
  )
}
