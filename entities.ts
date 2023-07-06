import { createEntity } from 'https://deno.land/x/robo_arkiver@v0.4.15/mod.ts'

interface IOhlc {
  timestamp: number
  address: string
  res: '1h'
  open: number
  high: number
  low: number
  close: number
  vol: number
}

export const Ohlc = createEntity<IOhlc>('OHLC', {
  timestamp: { type: Number, index: true },
  address: String,
  res: String,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  vol: Number,
})
