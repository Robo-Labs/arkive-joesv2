import { Manifest } from 'https://deno.land/x/robo_arkiver@v0.4.15/mod.ts'
import { Ohlc } from './entities.ts'
import { onDeposit, onSwap } from './handlers.ts'
import { JoesV2LpAbi } from './joesv2LpAbi.ts'

const WETHUSDC_LP = '0xD446eb1660F766d533BeCeEf890Df7A69d26f7d1' as const

const manifest = new Manifest('joes-candles')

manifest
  .addEntities([Ohlc])
  .addChain('avalanche', { blockRange: 200n })
  .addContract('JoesV2LP', JoesV2LpAbi)
  .addSources({ [WETHUSDC_LP]: 28371400n })
  .addEventHandlers({ 'Swap': onSwap })
  .addEventHandlers({ 'DepositedToBins': onDeposit })

export default manifest.build()
