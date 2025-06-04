import { notFound } from "next/navigation"
import Link from "next/link"
import { mockBlocks } from "@/data/mockBlocks"
import { truncateHash, formatTimeAgo, formatBTC } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import VerificationSimulator from "@/components/verification/verification-simulator"

interface BlockPageProps {
  params: Promise<{
    height: string
  }>
}

export default async function BlockPage({ params }: BlockPageProps) {
  const { height } = await params
  const blockHeight = parseInt(height)
  const block = mockBlocks.find(b => b.height === blockHeight)
  
  if (!block) {
    notFound()
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/explorer" 
          className="inline-flex items-center text-text-secondary hover:text-bitcoin transition-colors mb-4"
        >
          <Icons.arrowLeft className="mr-2 h-4 w-4" />
          Back to Explorer
        </Link>
        
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          Block #{block.height.toLocaleString()}
        </h1>
        <p className="text-text-secondary">
          Detailed information and STARK proof verification
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Block Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Block Information
                {block.verified && (
                  <Icons.lock className="h-5 w-5 text-success" aria-label="Verified" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary">Height</label>
                  <p className="font-mono text-bitcoin font-semibold">
                    #{block.height.toLocaleString()}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-text-secondary">Timestamp</label>
                  <p className="text-text-primary">
                    {new Date(block.timestamp).toLocaleString()}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {formatTimeAgo(block.timestamp)}
                  </p>
                </div>
                
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-text-secondary">Block Hash</label>
                  <p className="font-mono text-sm break-all text-text-primary bg-surface-alt rounded p-2 mt-1">
                    {block.hash}
                  </p>
                </div>
                
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-text-secondary">Previous Hash</label>
                  <p className="font-mono text-sm break-all text-text-primary bg-surface-alt rounded p-2 mt-1">
                    {block.prevHash}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-text-secondary">Transactions</label>
                  <p className="text-text-primary font-semibold">
                    {block.txCount.toLocaleString()}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-text-secondary">Total Fees</label>
                  <p className="text-text-primary font-semibold">
                    {formatBTC(block.totalFees)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Transaction List (sample) */}
          <Card>
            <CardHeader>
              <CardTitle>Sample Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {block.txids.slice(0, 3).map((txid, index) => (
                  <div key={txid} className="flex items-center justify-between p-3 bg-surface-alt rounded-lg">
                    <div>
                      <p className="font-mono text-sm text-text-primary">
                        {truncateHash(txid, 12, 12)}
                      </p>
                      <p className="text-xs text-text-secondary">
                        Transaction {index + 1} of {block.txCount.toLocaleString()}
                      </p>
                    </div>
                    <Icons.verified className="h-4 w-4 text-success" aria-label="Included in block" />
                  </div>
                ))}
                {block.txCount > 3 && (
                  <p className="text-center text-text-secondary text-sm pt-2">
                    ... and {(block.txCount - 3).toLocaleString()} more transactions
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Verification Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.lock className="h-5 w-5 text-success" />
                STARK Proof
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icons.verified className="h-5 w-5 text-success" />
                  <span className="font-semibold text-success">Proof Verified</span>
                </div>
                <p className="text-sm text-text-secondary">
                  This block has been verified using a STARK proof, ensuring its integrity 
                  without requiring trust in third parties.
                </p>
              </div>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full" asChild>
                  <a 
                    href={`/proofs/block_${block.height}_proof.json`} 
                    download
                    className="inline-flex items-center justify-center"
                  >
                    <Icons.download className="mr-2 h-4 w-4" />
                    Download Proof
                  </a>
                </Button>
                
                <VerificationSimulator blockHeight={block.height} />
              </div>
              
              <div className="pt-4 border-t border-slate-700">
                <h4 className="font-semibold text-text-primary mb-2">What is this?</h4>
                <p className="text-sm text-text-secondary">
                  STARK proofs allow you to verify this block&apos;s validity instantly, 
                  without downloading the entire blockchain or trusting external sources.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 