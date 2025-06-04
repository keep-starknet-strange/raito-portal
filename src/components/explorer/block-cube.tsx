import Link from "next/link"
import { MockBlock } from "@/data/mockBlocks"
import { formatTimeAgo, formatBTC } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"

interface BlockCubeProps {
  block: MockBlock
  index: number
}

const MINING_POOLS = [
  { name: "F2Pool", color: "text-blue-400" },
  { name: "AntPool", color: "text-green-400" },
  { name: "SpiderPool", color: "text-yellow-400" },
  { name: "ULTIMUSPOOL", color: "text-purple-400" },
  { name: "ViaBTC", color: "text-red-400" },
  { name: "SBI Crypto", color: "text-indigo-400" },
]

const getFeeRateRange = (totalFees: number, txCount: number) => {
  const avgFeePerTx = totalFees / txCount
  const avgSatPerVB = Math.floor(avgFeePerTx / 250) // Rough estimate: 250 bytes per tx
  
  if (avgSatPerVB <= 1) return { range: "~1 sat/vB", color: "text-green-400" }
  if (avgSatPerVB <= 5) return { range: `1 - ${avgSatPerVB} sat/vB`, color: "text-yellow-400" }
  if (avgSatPerVB <= 20) return { range: `${Math.floor(avgSatPerVB/2)} - ${avgSatPerVB} sat/vB`, color: "text-orange-400" }
  return { range: `${Math.floor(avgSatPerVB/2)} - ${avgSatPerVB} sat/vB`, color: "text-red-400" }
}

const getBlockColor = (totalFees: number) => {
  if (totalFees < 7000000) return "bg-gradient-to-br from-green-600 to-green-700"
  if (totalFees < 10000000) return "bg-gradient-to-br from-blue-600 to-blue-700"
  if (totalFees < 13000000) return "bg-gradient-to-br from-purple-600 to-purple-700"
  return "bg-gradient-to-br from-orange-600 to-orange-700"
}

export default function BlockCube({ block, index }: BlockCubeProps) {
  const feeRate = getFeeRateRange(block.totalFees, block.txCount)
  const blockColor = getBlockColor(block.totalFees)
  const miningPool = MINING_POOLS[index % MINING_POOLS.length]
  const timeAgo = formatTimeAgo(block.timestamp)
  
  const isRecent = Date.now() - block.timestamp < 900000 // Less than 15 minutes
  
  return (
    <Link href={`/block/${block.height}`}>
      <div className={`
        relative min-w-[280px] h-[160px] rounded-lg border border-slate-600 
        ${blockColor} 
        hover:scale-105 hover:border-bitcoin transition-all duration-300 
        cursor-pointer group shadow-lg hover:shadow-xl
        ${isRecent ? 'ring-2 ring-bitcoin/50 animate-pulse' : ''}
      `}>
        {/* Verification Badge */}
        <div className="absolute top-2 right-2">
          {block.verified ? (
            <div className="flex items-center gap-1 bg-black/30 rounded-full px-2 py-1">
              <Icons.lock className="h-3 w-3 text-green-400" />
              <span className="text-xs text-green-400 font-medium">STARK</span>
            </div>
          ) : (
            <Icons.unlock className="h-4 w-4 text-red-400" />
          )}
        </div>

        {/* Block Content */}
        <div className="p-4 h-full flex flex-col justify-between text-white">
          {/* Header */}
          <div>
            <div className="text-lg font-bold text-bitcoin mb-1">
              {block.height.toLocaleString()}
            </div>
            <div className={`text-sm font-medium ${feeRate.color} mb-2`}>
              {feeRate.range}
            </div>
          </div>

          {/* Main Info */}
          <div className="space-y-1">
            <div className="text-xl font-bold">
              {formatBTC(block.totalFees)}
            </div>
            <div className="text-sm opacity-90">
              {block.txCount.toLocaleString()} transactions
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs">
            <div className="opacity-75">
              {isRecent ? (
                <span className="text-bitcoin font-medium">In ~{Math.ceil((block.timestamp + 600000 - Date.now()) / 60000)} min</span>
              ) : (
                timeAgo
              )}
            </div>
            <div className={`font-medium ${miningPool.color}`}>
              {miningPool.name}
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-lg bg-bitcoin/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </Link>
  )
} 