import { notFound } from "next/navigation"
import Link from "next/link"
import { mockBlocks } from "@/data/mockBlocks"
import { formatTimeAgo, formatBTC } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HashFlicker } from "@/components/ui/hash-flicker"
import VerificationSimulator from "@/components/verification/verification-simulator"

interface BlockPageProps {
  params: Promise<{
    height: string
  }>
}

const MINING_POOLS = [
  { name: "F2Pool", color: "text-blue-400", icon: "🏊" },
  { name: "AntPool", color: "text-green-400", icon: "🐜" },
  { name: "SpiderPool", color: "text-yellow-400", icon: "🕷️" },
  { name: "ULTIMUSPOOL", color: "text-purple-400", icon: "⚡" },
  { name: "ViaBTC", color: "text-red-400", icon: "🚀" },
  { name: "SBI Crypto", color: "text-indigo-400", icon: "💎" },
]

const getFeeRateRange = (totalFees: number, txCount: number) => {
  const avgFeePerTx = totalFees / txCount
  const avgSatPerVB = Math.floor(avgFeePerTx / 250)
  
  if (avgSatPerVB <= 1) return { range: "~1 sat/vB", color: "text-green-400", priority: "No Priority" }
  if (avgSatPerVB <= 5) return { range: `1-${avgSatPerVB} sat/vB`, color: "text-yellow-400", priority: "Low Priority" }
  if (avgSatPerVB <= 20) return { range: `${Math.floor(avgSatPerVB/2)}-${avgSatPerVB} sat/vB`, color: "text-orange-400", priority: "Medium Priority" }
  return { range: `${Math.floor(avgSatPerVB/2)}-${avgSatPerVB} sat/vB`, color: "text-red-400", priority: "High Priority" }
}

export default async function BlockPage({ params }: BlockPageProps) {
  const { height } = await params
  const blockHeight = parseInt(height)
  const block = mockBlocks.find(b => b.height === blockHeight)
  
  if (!block) {
    notFound()
  }

  const feeRate = getFeeRateRange(block.totalFees, block.txCount)
  const miningPool = MINING_POOLS[blockHeight % MINING_POOLS.length]
  const avgFeePerTx = block.totalFees / block.txCount
  const isRecent = Date.now() - block.timestamp < 900000 // Less than 15 minutes
  
  return (
    <div className="min-h-screen bg-background page-transition">
      {/* Enhanced Header with Gradient Background */}
      <div className="relative border-b border-slate-700 bg-gradient-to-r from-surface via-surface-alt to-surface">
        <div className="absolute inset-0 bg-bitcoin/5 opacity-50" />
        <div className="relative z-10 container mx-auto container-padding py-8">
          <div className="mb-6">
            <Link 
              href="/explorer" 
              className="inline-flex items-center text-text-secondary hover:text-bitcoin transition-all duration-300 mb-6 group"
            >
              <Icons.arrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Explorer
            </Link>
            
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-5xl font-bold text-text-primary mb-3 flex items-center gap-4">
                  Block #<HashFlicker hash={block.height.toString()} className="text-bitcoin" />
                  {block.verified && (
                    <div className="flex items-center gap-2 bg-success/20 rounded-full px-4 py-2 border border-success/30">
                      <Icons.lock className="h-5 w-5 text-success animate-pulse" />
                      <span className="text-success font-medium text-lg">STARK Verified</span>
                    </div>
                  )}
                </h1>
                <p className="text-xl text-text-secondary mb-4">
                  Mined {formatTimeAgo(block.timestamp)} • {feeRate.priority}
                </p>
                
                {/* Quick Stats Row */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Icons.activity className="h-4 w-4 text-bitcoin" />
                    <span className="text-text-secondary">Transactions:</span>
                    <span className="font-semibold text-text-primary">{block.txCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.trendingUp className="h-4 w-4 text-bitcoin" />
                    <span className="text-text-secondary">Total Fees:</span>
                    <span className="font-semibold text-bitcoin">{formatBTC(block.totalFees)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{miningPool.icon}</span>
                    <span className="text-text-secondary">Mined by:</span>
                    <span className={`font-semibold ${miningPool.color}`}>{miningPool.name}</span>
                  </div>
                </div>
              </div>
              
              {isRecent && (
                <div className="bg-bitcoin/20 border border-bitcoin/50 rounded-lg px-4 py-2 glow-pulse">
                  <div className="text-bitcoin font-semibold text-sm">Recent Block</div>
                  <div className="text-xs text-text-secondary">Mined within 15 minutes</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto container-padding py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Block Information */}
          <div className="xl:col-span-3 space-y-6">
            {/* Block Details Card */}
            <Card className="theme-transition hover:shadow-xl hover:border-bitcoin/30 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icons.cube className="h-6 w-6 text-bitcoin" />
                  Block Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-text-secondary">Height</label>
                    <p className="font-mono text-2xl font-bold text-bitcoin">
                      #{block.height.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-text-secondary">Timestamp</label>
                    <p className="text-text-primary font-semibold">
                      {new Date(block.timestamp).toLocaleString()}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {formatTimeAgo(block.timestamp)}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-text-secondary">Fee Rate</label>
                    <p className={`font-semibold ${feeRate.color}`}>
                      {feeRate.range}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {feeRate.priority}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-text-secondary">Transactions</label>
                    <p className="text-text-primary font-semibold text-xl">
                      {block.txCount.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-text-secondary">Total Fees</label>
                    <p className="text-bitcoin font-semibold text-xl">
                      {formatBTC(block.totalFees)}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-text-secondary">Avg Fee/TX</label>
                    <p className="text-text-primary font-semibold">
                      {formatBTC(avgFeePerTx)}
                    </p>
                  </div>
                </div>
                
                {/* Hash Information */}
                <div className="mt-8 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-2 block">Block Hash</label>
                    <div className="bg-surface-alt rounded-lg p-4 border border-slate-600">
                      <HashFlicker 
                        hash={block.hash} 
                        className="text-text-primary break-all leading-relaxed"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-2 block">Previous Hash</label>
                    <div className="bg-surface-alt rounded-lg p-4 border border-slate-600">
                      <HashFlicker 
                        hash={block.prevHash} 
                        className="text-text-primary break-all leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Transaction List */}
            <Card className="theme-transition hover:shadow-xl hover:border-bitcoin/30 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icons.activity className="h-6 w-6 text-bitcoin" />
                  Transaction Sample
                  <span className="text-sm font-normal text-text-secondary">
                    ({block.txids.length} of {block.txCount.toLocaleString()} shown)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {block.txids.map((txid, index) => (
                    <div 
                      key={txid} 
                      className="group flex items-center justify-between p-4 bg-surface-alt hover:bg-surface transition-all duration-300 rounded-lg border border-slate-600 hover:border-bitcoin/30"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs bg-bitcoin/20 text-bitcoin px-2 py-1 rounded font-mono">
                            TX #{index + 1}
                          </span>
                          <HashFlicker 
                            hash={txid}
                            truncate={{ start: 8, end: 8 }}
                            className="text-text-primary group-hover:text-bitcoin transition-colors"
                          />
                        </div>
                        <div className="flex items-center gap-4 text-sm text-text-secondary">
                          <span>Fee: ~{formatBTC(avgFeePerTx)}</span>
                          <span>Size: ~250 bytes</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icons.verified className="h-5 w-5 text-success" aria-label="Included in block" />
                        <span className="text-xs text-success font-medium">Verified</span>
                      </div>
                    </div>
                  ))}
                  {block.txCount > block.txids.length && (
                    <div className="text-center py-4 border-t border-slate-600">
                      <p className="text-text-secondary">
                        ... and <span className="text-bitcoin font-semibold">{(block.txCount - block.txids.length).toLocaleString()}</span> more transactions
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Enhanced Verification Panel */}
          <div className="space-y-6">
            {/* STARK Proof Card */}
            <Card className="theme-transition hover:shadow-xl hover:border-bitcoin/30 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icons.shield className="h-6 w-6 text-bitcoin animate-pulse" />
                  STARK Proof
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-success/10 border border-success/30 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-success/5 to-transparent" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <Icons.verified className="h-6 w-6 text-success" />
                      <span className="font-bold text-success text-lg">Proof Verified</span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      This block has been cryptographically verified using a STARK proof, 
                      ensuring mathematical certainty without requiring trust.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full group" asChild>
                    <a 
                      href={`/proofs/block_${block.height}_proof.json`} 
                      download
                      className="inline-flex items-center justify-center hover:border-bitcoin/50 transition-all duration-300"
                    >
                      <Icons.download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                      Download Proof File
                      <span className="ml-2 text-xs text-text-secondary">(~2.1 KB)</span>
                    </a>
                  </Button>
                  
                  <VerificationSimulator blockHeight={block.height} />
                </div>
                
                <div className="pt-4 border-t border-slate-700">
                  <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <Icons.lightning className="h-4 w-4 text-bitcoin" />
                    Why STARK Proofs?
                  </h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-bitcoin rounded-full mt-2 flex-shrink-0" />
                      <span><strong>Instant:</strong> Verify in &lt;50ms</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-bitcoin rounded-full mt-2 flex-shrink-0" />
                      <span><strong>Trustless:</strong> No third parties needed</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-bitcoin rounded-full mt-2 flex-shrink-0" />
                      <span><strong>Compact:</strong> Tiny proof size (~2KB)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Block Navigation */}
            <Card className="theme-transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.cube className="h-5 w-5 text-bitcoin" />
                  Navigate Blocks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/block/${block.height - 1}`}>
                      <Icons.arrowLeft className="mr-1 h-3 w-3" />
                      Previous
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/block/${block.height + 1}`}>
                      Next
                      <Icons.arrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link href="/explorer">
                    <Icons.cube className="mr-2 h-4 w-4" />
                    View All Blocks
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 