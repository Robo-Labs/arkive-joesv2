import { formatUnits, numberToHex } from 'npm:viem'
import { type EventHandlerFor } from 'https://deno.land/x/robo_arkiver@v0.4.15/mod.ts'
import erc20 from './erc20.ts'
import { OhlcUtil } from './ohlcUtil.ts'
import { JoesV2LpAbi } from './joesv2LpAbi.ts'

// Alternatively, you can pull this from the chain
const TOKEN_DECIMALS = 18

const sqrtPriceX96ToBigInt = (sqrtPrice: bigint, decimals: number) => {
  const numerator1 = sqrtPrice * sqrtPrice
  return parseFloat(formatUnits(numerator1 / (1n << 192n), decimals))
}

const abs = (n: bigint) => Number(n < 0n ? -n : n)

// deno-lint-ignore require-await
export const onSwap: EventHandlerFor<typeof JoesV2LpAbi, 'Swap'> = async (
  { client, store, event },
) => {
  const { amountsIn, amountsOut, id, protocolFees, sender, to, totalFees, volatilityAccumulator } = event.args

  console.log(amountsIn)
  console.log(amountsOut)


  // const a0 = abs(amount0) / 1e6
  // const a1 = abs(amount1) / 1e18
  // const price = Number(a0 / a1)
  // const block = await client.getBlock({ blockNumber: event.blockNumber })
  // const ohlc = await OhlcUtil.get(client, store, Number(block.timestamp), event.address, price)

  // if (ohlc.high < price) ohlc.high = price
  // if (ohlc.low < price) ohlc.low = price
  // ohlc.close = price
  // const volUsd =  abs(amount0) / 1e6
  // ohlc.vol += volUsd
  // await ohlc.save()
}


// deno-lint-ignore require-await
export const onDeposit: EventHandlerFor<typeof JoesV2LpAbi, 'DepositedToBins'> = async (
  { client, store, event },
) => {
  const { amounts } = event.args

  console.log(event.args)


  // const a0 = abs(amount0) / 1e6
  // const a1 = abs(amount1) / 1e18
  // const price = Number(a0 / a1)
  // const block = await client.getBlock({ blockNumber: event.blockNumber })
  // const ohlc = await OhlcUtil.get(client, store, Number(block.timestamp), event.address, price)

  // if (ohlc.high < price) ohlc.high = price
  // if (ohlc.low < price) ohlc.low = price
  // ohlc.close = price
  // const volUsd =  abs(amount0) / 1e6
  // ohlc.vol += volUsd
  // await ohlc.save()
}

