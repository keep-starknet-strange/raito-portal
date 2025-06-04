import { mockBlocks } from "@/data/mockBlocks"
import { formatBTC } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BlockCube from "@/components/explorer/block-cube"

export default function ExplorerPage() {
  const totalBlocks = mockBlocks.length
  const totalTxs = mockBlocks.reduce((sum, block) => sum + block.txCount, 0)
  const totalFees = mockBlocks.reduce((sum, block) => sum + block.totalFees, 0)
  const avgBlockTime = 10 // minutes
  const verifiedBlocks = mockBlocks.filter(block => block.verified).length
  
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Hero Section with Block Stream */}
      <div className="relative bg-gradient-to-r from-surface via-surface-alt to-surface border-b border-slate-700">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-1 h-full">
            {Array.from({ length: 120 }).map((_, i) => (
              <div 
                key={i} 
                className={`
                  w-full bg-bitcoin rounded-sm animate-pulse
                  ${i % 3 === 0 ? 'animate-pulse' : ''}
                  ${i % 5 === 0 ? 'opacity-70' : 'opacity-30'}
                `}
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  height: `${Math.random() * 40 + 10}%`,
                  marginTop: `${Math.random() * 60}%`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-text-primary mb-4">
              Bitcoin Block Explorer
            </h1>
            <p className="text-xl text-text-secondary">
              Recent blocks verified with <span className="text-bitcoin font-semibold">STARK proofs</span>
            </p>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-bitcoin">{totalBlocks}</div>
              <div className="text-sm text-text-secondary">Latest Blocks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">{totalTxs.toLocaleString()}</div>
              <div className="text-sm text-text-secondary">Total Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">{formatBTC(totalFees)}</div>
              <div className="text-sm text-text-secondary">Total Fees</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{verifiedBlocks}/{totalBlocks}</div>
              <div className="text-sm text-text-secondary">STARK Verified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Block Cubes Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-primary mb-2 flex items-center gap-2">
            <Icons.cube className="h-6 w-6 text-bitcoin" />
            Recent Blocks
          </h2>
          <p className="text-text-secondary">
            Hover over any block to see details, click to explore
          </p>
        </div>
        
        {/* Horizontal Scrolling Block Container */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth">
            {mockBlocks.map((block, index) => (
              <BlockCube key={block.height} block={block} index={index} />
            ))}
          </div>
          
          {/* Scroll Indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {mockBlocks.map((_, index) => (
              <div 
                key={index} 
                className="w-2 h-2 rounded-full bg-slate-600 opacity-50" 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Network Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.activity className="h-5 w-5 text-success" />
                Network Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Avg Block Time</span>
                <span className="text-text-primary font-semibold">~{avgBlockTime} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Network Hashrate</span>
                <span className="text-text-primary font-semibold">423 EH/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Difficulty</span>
                <span className="text-text-primary font-semibold">62.46 T</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">STARK Verification</span>
                <div className="flex items-center gap-1">
                  <Icons.verified className="h-4 w-4 text-success" />
                  <span className="text-success font-semibold">Active</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fee Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.trendingUp className="h-5 w-5 text-bitcoin" />
                Fee Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">High Priority</span>
                <span className="text-orange-400 font-semibold">25+ sat/vB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Medium Priority</span>
                <span className="text-yellow-400 font-semibold">10-25 sat/vB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Low Priority</span>
                <span className="text-green-400 font-semibold">1-10 sat/vB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">No Priority</span>
                <span className="text-green-400 font-semibold">~1 sat/vB</span>
              </div>
            </CardContent>
          </Card>

          {/* STARK Proofs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.shield className="h-5 w-5 text-bitcoin" />
                STARK Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Blocks Verified</span>
                <span className="text-success font-semibold">{verifiedBlocks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Verification Rate</span>
                <span className="text-success font-semibold">100%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Proof Size</span>
                <span className="text-text-primary font-semibold">~2.1 KB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Verification Time</span>
                <span className="text-text-primary font-semibold">&lt;50ms</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-gradient-to-r from-bitcoin/10 via-bitcoin/5 to-bitcoin/10 rounded-xl p-8 border border-bitcoin/20">
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Don&apos;t trust, verify
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Every block shown above has been verified using STARK proofs, ensuring mathematical 
            certainty without requiring trust in third parties. Experience the future of Bitcoin verification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/tx-check"
              className="inline-flex items-center justify-center px-6 py-3 bg-bitcoin text-black font-semibold rounded-lg hover:bg-bitcoin-dark transition-colors"
            >
              <Icons.search className="mr-2 h-5 w-5" />
              Verify Transaction
            </a>
            <a 
              href="/block-check"
              className="inline-flex items-center justify-center px-6 py-3 bg-surface-alt text-text-primary font-semibold rounded-lg hover:bg-slate-700 transition-colors border border-slate-600"
            >
              <Icons.shield className="mr-2 h-5 w-5" />
              Verify Block Header
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 