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
    <div className="min-h-screen bg-background page-transition">
      {/* Streamlined Header */}
      <div className="border-b border-slate-700 bg-surface/50">
        <div className="container mx-auto container-padding py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-text-primary mb-2 flex items-center gap-3">
                <Icons.cube className="h-8 w-8 text-bitcoin animate-pulse" />
                Recent Blocks
              </h1>
              <p className="text-lg text-text-secondary">
                Bitcoin blocks verified with <span className="text-bitcoin font-semibold">STARK proofs</span>
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{verifiedBlocks}/{totalBlocks}</div>
                <div className="text-sm text-text-secondary">Verified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary">{totalTxs.toLocaleString()}</div>
                <div className="text-sm text-text-secondary">Transactions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-bitcoin">{formatBTC(totalFees)}</div>
                <div className="text-sm text-text-secondary">Total Fees</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Block Cubes Section */}
      <div className="container mx-auto container-padding py-8">        
        {/* Enhanced Horizontal Scrolling Block Container */}
        <div className="relative mb-12">
          <div className="flex gap-6 overflow-x-auto pb-6 scroll-smooth">
            {mockBlocks.map((block, index) => (
              <div
                key={block.height}
                className="flex-shrink-0"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: `pageSlideIn 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <BlockCube block={block} index={index} />
              </div>
            ))}
          </div>
          
          {/* Enhanced Scroll Indicators */}
          <div className="flex justify-center mt-6 gap-3">
            {mockBlocks.map((_, index) => (
              <div 
                key={index} 
                className="w-3 h-3 rounded-full bg-slate-600/50 hover:bg-bitcoin/70 transition-colors cursor-pointer" 
                style={{ animationDelay: `${index * 0.05}s` }}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Network Status */}
          <Card className="theme-transition hover:shadow-xl hover:border-bitcoin/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Icons.activity className="h-6 w-6 text-success animate-pulse" />
                Network Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Avg Block Time", value: `~${avgBlockTime} min` },
                { label: "Network Hashrate", value: "423 EH/s" },
                { label: "Difficulty", value: "62.46 T" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center group">
                  <span className="text-text-secondary group-hover:text-text-primary transition-colors">{item.label}</span>
                  <span className="text-text-primary font-semibold group-hover:text-bitcoin transition-colors">{item.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center group">
                <span className="text-text-secondary group-hover:text-text-primary transition-colors">STARK Verification</span>
                <div className="flex items-center gap-2">
                  <Icons.verified className="h-5 w-5 text-success animate-pulse" />
                  <span className="text-success font-semibold">Active</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fee Analysis */}
          <Card className="theme-transition hover:shadow-xl hover:border-bitcoin/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Icons.trendingUp className="h-6 w-6 text-bitcoin" />
                Fee Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "High Priority", value: "25+ sat/vB", color: "text-orange-400" },
                { label: "Medium Priority", value: "10-25 sat/vB", color: "text-yellow-400" },
                { label: "Low Priority", value: "1-10 sat/vB", color: "text-green-400" },
                { label: "No Priority", value: "~1 sat/vB", color: "text-green-400" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center group">
                  <span className="text-text-secondary group-hover:text-text-primary transition-colors">{item.label}</span>
                  <span className={`${item.color} font-semibold group-hover:scale-105 transition-transform`}>{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* STARK Proofs */}
          <Card className="theme-transition hover:shadow-xl hover:border-bitcoin/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Icons.shield className="h-6 w-6 text-bitcoin animate-pulse" />
                STARK Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Blocks Verified", value: verifiedBlocks.toString() },
                { label: "Verification Rate", value: "100%" },
                { label: "Proof Size", value: "~2.1 KB" },
                { label: "Verification Time", value: "<50ms" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center group">
                  <span className="text-text-secondary group-hover:text-text-primary transition-colors">{item.label}</span>
                  <span className="text-success font-semibold group-hover:scale-105 transition-transform">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Call to Action */}
      <div className="border-t border-slate-700 bg-surface/30">
        <div className="container mx-auto container-padding py-12 text-center">
          <div className="bg-gradient-to-r from-bitcoin/10 via-bitcoin/5 to-bitcoin/10 rounded-2xl p-8 border border-bitcoin/20 theme-transition hover:border-bitcoin/40 transition-all duration-500">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Don&apos;t trust, verify
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Every block above has been verified using STARK proofs. Experience instant, trustless verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/tx-check"
                className="ripple inline-flex items-center justify-center px-6 py-3 bg-bitcoin text-black font-semibold rounded-lg hover:bg-bitcoin-dark transition-all duration-300 hover:scale-105"
              >
                <Icons.search className="mr-2 h-5 w-5" />
                Verify Transaction
              </a>
              <a 
                href="/block-check"
                className="ripple inline-flex items-center justify-center px-6 py-3 bg-surface-alt text-text-primary font-semibold rounded-lg hover:bg-slate-700 transition-all duration-300 border border-slate-600 hover:border-bitcoin/50 hover:scale-105"
              >
                <Icons.shield className="mr-2 h-5 w-5" />
                Verify Block Header
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 