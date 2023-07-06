import { formatUnits, numberToHex } from 'npm:viem'
import { type EventHandlerFor } from 'https://deno.land/x/robo_arkiver@v0.4.15/mod.ts'
import erc20 from './erc20.ts'
import { OhlcUtil } from './ohlcUtil.ts'
import { JoesV2LpAbi } from './joesv2LpAbi.ts'


const toNumber =(n: bigint, decimals: number) => {
  return parseFloat(formatUnits(n, decimals))
}

const split256to128s = (n: bigint, leftDecimals: number, rightDecimals: number) => {
  const mask = (1n << 128n) - 1n
  return [
    toNumber(n >> 128n, leftDecimals), 
    toNumber(n & mask, rightDecimals)
  ]
}

// deno-lint-ignore require-await
export const onSwap: EventHandlerFor<typeof JoesV2LpAbi, 'Swap'> = async (
  { client, store, event },
) => {
  const { amountsIn, amountsOut, id, protocolFees, sender, to, totalFees, volatilityAccumulator } = event.args
  const [amountIn0, amountIn1] = split256to128s(BigInt(amountsIn), 6, 18)
  const [amountOut0, amountOut1] = split256to128s(BigInt(amountsOut), 6, 18)
  const price = amountIn0 === 0 ? 
    amountOut0 / amountIn1 :
    amountIn0 / amountOut1
  const vol = amountIn0 || amountOut0
  const block = await client.getBlock({ blockNumber: event.blockNumber })
  const ohlc = await OhlcUtil.get(client, store, Number(block.timestamp), event.address, price)

  if (ohlc.high < price) ohlc.high = price
  if (price < ohlc.low) ohlc.low = price
  ohlc.close = price
  ohlc.vol += vol
  await ohlc.save()
}


