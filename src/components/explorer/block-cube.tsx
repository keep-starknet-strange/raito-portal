import Link from "next/link"
import { MockBlock } from "@/data/mockBlocks"
import { formatTimeAgo, formatBTC } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { HashFlicker } from "@/components/ui/hash-flicker"

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
        block-cube ripple min-w-[280px] h-[160px] rounded-lg border border-slate-600 
        ${blockColor} 
        cursor-pointer group shadow-lg theme-transition
        ${isRecent ? 'ring-2 ring-bitcoin/50 glow-pulse float-animation' : ''}
      `}>
        {/* Verification Badge */}
        <div className="absolute top-2 right-2 z-10">
          {block.verified ? (
            <div className="flex items-center gap-1 bg-black/30 rounded-full px-2 py-1 backdrop-blur-sm">
              <Icons.lock className="h-3 w-3 text-green-400" />
              <span className="text-xs text-green-400 font-medium">STARK</span>
            </div>
          ) : (
            <Icons.unlock className="h-4 w-4 text-red-400" />
          )}
        </div>

        {/* Block Content */}
        <div className="p-4 h-full flex flex-col justify-between text-white relative z-10">
          {/* Header */}
          <div>
            <div className="text-lg font-bold text-bitcoin mb-1 group-hover:text-orange-300 transition-colors">
              <HashFlicker 
                hash={block.height.toString()}
                className="text-lg font-bold"
              />
            </div>
            <div className={`text-sm font-medium ${feeRate.color} mb-2 transition-all duration-300`}>
              {feeRate.range}
            </div>
          </div>

          {/* Main Info */}
          <div className="space-y-1">
            <div className="text-xl font-bold group-hover:scale-105 transition-transform duration-300">
              {formatBTC(block.totalFees)}
            </div>
            <div className="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
              {block.txCount.toLocaleString()} transactions
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs">
            <div className="opacity-75 group-hover:opacity-100 transition-opacity">
              {isRecent ? (
                <span className="text-bitcoin font-medium animate-pulse">
                  In ~{Math.ceil((block.timestamp + 600000 - Date.now()) / 60000)} min
                </span>
              ) : (
                <span className="transition-colors group-hover:text-orange-300">
                  {timeAgo}
                </span>
              )}
            </div>
            <div className={`font-medium ${miningPool.color} transition-all duration-300 group-hover:scale-110`}>
              {miningPool.name}
            </div>
          </div>
        </div>

        {/* Enhanced Hover Effects */}
        <div className="absolute inset-0 rounded-lg bg-bitcoin/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Subtle Border Glow */}
        <div className="absolute inset-0 rounded-lg border border-bitcoin/0 group-hover:border-bitcoin/30 transition-all duration-300 pointer-events-none" />
      </div>
    </Link>
  )
} 