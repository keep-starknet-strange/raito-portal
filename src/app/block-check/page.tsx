"use client"

import { useState } from "react"
import Link from "next/link"
import { hashToBlockMap, MockBlock } from "@/data/mockBlocks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { HashFlicker } from "@/components/ui/hash-flicker"
import { MobileHashInput } from "@/components/ui/mobile-hash-input"
import { formatTimeAgo, formatBTC } from "@/lib/utils"

type CheckState = 'idle' | 'checking' | 'found' | 'not-found' | 'invalid'

interface SampleBlock {
  id: string
  hash: string
  description: string
  type: 'valid' | 'invalid'
  expectedResult?: string
}

const sampleBlocks: SampleBlock[] = [
  {
    id: 'valid-1',
    hash: '00000000000000000002b5d213c78cc70c4b5a446c8d5e1f2c8d8f3a4b5c6d7e',
    description: 'Valid block #869999 (Recent)',
    type: 'valid',
    expectedResult: 'Found at height #869999'
  },
  {
    id: 'valid-2',
    hash: '00000000000000000001a2b3c4d5e6f7890123456789012345678901234567ab',
    description: 'Valid block #869998',
    type: 'valid',
    expectedResult: 'Found at height #869998'
  },
  {
    id: 'valid-3',
    hash: '000000000000000000019a8b7c6d5e4f3210987654321098765432109876543a',
    description: 'Valid block #869997',
    type: 'valid',
    expectedResult: 'Found at height #869997'
  },
  {
    id: 'invalid-1',
    hash: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    description: 'Invalid block hash (all F&apos;s)',
    type: 'invalid',
    expectedResult: 'Not found in canonical chain'
  },
  {
    id: 'invalid-2',
    hash: '0000000000000000000000000000000000000000000000000000000000000000',
    description: 'Genesis placeholder (all zeros)',
    type: 'invalid',
    expectedResult: 'Not found in canonical chain'
  },
  {
    id: 'invalid-3',
    hash: 'cafebabecafebabecafebabecafebabecafebabecafebabecafebabecafebabe',
    description: 'Test block hash (cafebabe pattern)',
    type: 'invalid',
    expectedResult: 'Not found in canonical chain'
  }
]

export default function BlockCheckPage() {
  const [hash, setHash] = useState('')
  const [state, setState] = useState<CheckState>('idle')
  const [result, setResult] = useState<{ block?: MockBlock; hash?: string } | null>(null)
  
  const validateHash = (value: string): boolean => {
    return /^[a-fA-F0-9]{64}$/.test(value)
  }
  
  const handleCheck = async () => {
    if (!validateHash(hash)) {
      setState('invalid')
      return
    }
    
    setState('checking')
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const block = hashToBlockMap.get(hash)
    
    if (block) {
      setState('found')
      setResult({ block, hash })
    } else {
      setState('not-found')
      setResult({ hash })
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCheck()
  }
  
  const handleSampleClick = (blockHash: string) => {
    setHash(blockHash)
    setState('idle')
    setResult(null)
  }
  
  const handleNewCheck = () => {
    setState('idle')
    setResult(null)
    setHash('')
  }
  
  return (
    <div className="min-h-screen bg-background page-transition">
      {/* Enhanced Header - Mobile optimized */}
      <div className="relative border-b border-slate-700 bg-gradient-to-r from-surface via-surface-alt to-surface">
        <div className="absolute inset-0 bg-bitcoin/5 opacity-30" />
        <div className="relative z-10 container mx-auto container-padding mobile-spacing">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-bitcoin/20 rounded-xl border border-bitcoin/30">
                <Icons.shield className="h-6 w-6 sm:h-8 sm:w-8 text-bitcoin" />
              </div>
              <h1 className="mobile-h1 font-bold text-text-primary">
                Block Header Verification
              </h1>
            </div>
            <p className="mobile-text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed px-4">
              Verify Bitcoin block header inclusion using STARK proofs. 
              <span className="text-bitcoin font-semibold"> Trustless block validation.</span>
            </p>
          </div>

          {/* Quick Stats - Mobile optimized grid */}
          <div className="mobile-stats-grid sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
            <div className="bg-surface-alt/50 rounded-lg p-3 sm:p-4 border border-slate-600">
              <div className="text-bitcoin font-semibold text-sm sm:text-lg">Header Validation</div>
              <div className="text-text-secondary text-xs sm:text-sm">Verify canonical chain inclusion</div>
            </div>
            <div className="bg-surface-alt/50 rounded-lg p-3 sm:p-4 border border-slate-600">
              <div className="text-bitcoin font-semibold text-sm sm:text-lg">STARK Proofs</div>
              <div className="text-text-secondary text-xs sm:text-sm">Mathematically guaranteed</div>
            </div>
            <div className="bg-surface-alt/50 rounded-lg p-3 sm:p-4 border border-slate-600 col-span-2 sm:col-span-1">
              <div className="text-bitcoin font-semibold text-sm sm:text-lg">Fork Detection</div>
              <div className="text-text-secondary text-xs sm:text-sm">Identify invalid/orphaned blocks</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto container-padding py-6 sm:py-8 max-w-6xl">
        <div className="mobile-grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Verification Panel - Mobile optimized */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Card className="theme-transition hover:shadow-xl hover:border-bitcoin/30 transition-all duration-300">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex items-center gap-2 sm:gap-3 mobile-h3">
                  <Icons.cube className="h-5 w-5 sm:h-6 sm:w-6 text-bitcoin" />
                  Enter Block Hash
                </CardTitle>
                <p className="text-text-secondary text-sm sm:text-base">
                  Paste a 64-character hexadecimal block hash
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <MobileHashInput
                    value={hash}
                    onChange={setHash}
                    placeholder="00000000000000000002b5d213c78cc70c4b5a446c8d5e1f2c8d8f3a4b5c6d7e"
                    disabled={state === 'checking'}
                    isValid={state === 'found'}
                    isInvalid={state === 'invalid'}
                    onPaste={() => {
                      if (state === 'invalid') setState('idle')
                    }}
                  />
                  
                  <Button 
                    type="submit" 
                    className="mobile-button w-full font-semibold" 
                    disabled={state === 'checking' || !hash.trim()}
                  >
                    {state === 'checking' ? (
                      <>
                        <Icons.spinner className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        Verifying Block Header...
                      </>
                    ) : (
                      <>
                        <Icons.shield className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                        Verify Block Header
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Enhanced Results - Mobile optimized */}
            {state === 'found' && result?.block && (
              <Card className="border-success/50 bg-gradient-to-r from-success/10 to-success/5 mobile-slide-up">
                <CardContent className="pt-4 sm:pt-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-success/20 rounded-xl border border-success/30 flex-shrink-0">
                      <Icons.verified className="h-6 w-6 sm:h-8 sm:w-8 text-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mobile-h3 font-bold text-success mb-2 sm:mb-3">Block Header Verified!</h3>
                      
                      <div className="space-y-3 sm:space-y-4">
                        <div className="p-3 sm:p-4 bg-surface-alt rounded-lg border border-slate-600">
                          <label className="text-xs sm:text-sm font-medium text-text-secondary block mb-2">Block Hash</label>
                          <HashFlicker 
                            hash={result.hash || ''} 
                            className="text-text-primary break-all leading-relaxed text-sm sm:text-base"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                          <div className="p-3 sm:p-4 bg-success/10 rounded-lg border border-success/30">
                            <label className="text-xs sm:text-sm font-medium text-success block mb-1">Block Height</label>
                            <div className="mobile-text-lg sm:text-xl font-bold text-success">#{result.block.height.toLocaleString()}</div>
                          </div>
                          <div className="p-3 sm:p-4 bg-bitcoin/10 rounded-lg border border-bitcoin/30">
                            <label className="text-xs sm:text-sm font-medium text-bitcoin block mb-1">Transactions</label>
                            <div className="mobile-text-lg sm:text-xl font-bold text-bitcoin">{result.block.txCount.toLocaleString()}</div>
                          </div>
                          <div className="p-3 sm:p-4 bg-purple-500/10 rounded-lg border border-purple-500/30 col-span-2 sm:col-span-1">
                            <label className="text-xs sm:text-sm font-medium text-purple-400 block mb-1">Total Fees</label>
                            <div className="text-sm sm:text-lg font-bold text-purple-400">{formatBTC(result.block.totalFees)}</div>
                          </div>
                        </div>

                        <div className="mobile-stats-grid gap-3 sm:gap-4">
                          <div className="p-3 sm:p-4 bg-surface-alt rounded-lg border border-slate-600">
                            <label className="text-xs sm:text-sm font-medium text-text-secondary block mb-1">Timestamp</label>
                            <div className="text-text-primary font-semibold text-sm sm:text-base">{new Date(result.block.timestamp).toLocaleDateString()}</div>
                            <div className="text-xs text-text-secondary">{formatTimeAgo(result.block.timestamp)}</div>
                          </div>
                          <div className="p-3 sm:p-4 bg-success/10 rounded-lg border border-success/30">
                            <label className="text-xs sm:text-sm font-medium text-success block mb-1">STARK Proof</label>
                            <div className="flex items-center gap-2">
                              <Icons.lock className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
                              <span className="text-success font-semibold text-sm sm:text-base">Verified</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                          ✅ This block header is confirmed as part of the canonical Bitcoin blockchain. 
                          It&apos;s covered by a STARK proof, providing cryptographic certainty of its validity 
                          and position in the main chain.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                          <Button variant="outline" asChild className="mobile-button">
                            <Link href={`/block/${result.block.height}`}>
                              <Icons.cube className="mr-2 h-4 w-4" />
                              View Block Details
                            </Link>
                          </Button>
                          <Button variant="ghost" onClick={handleNewCheck} className="mobile-button">
                            <Icons.shield className="mr-2 h-4 w-4" />
                            Verify Another
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {state === 'not-found' && result && (
              <Card className="border-danger/50 bg-gradient-to-r from-danger/10 to-danger/5 mobile-slide-up">
                <CardContent className="pt-4 sm:pt-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-danger/20 rounded-xl border border-danger/30 flex-shrink-0">
                      <Icons.unverified className="h-6 w-6 sm:h-8 sm:w-8 text-danger" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mobile-h3 font-bold text-danger mb-2 sm:mb-3">Block Header Not Found</h3>
                      
                      <div className="space-y-3 sm:space-y-4">
                        <div className="p-3 sm:p-4 bg-surface-alt rounded-lg border border-slate-600">
                          <label className="text-xs sm:text-sm font-medium text-text-secondary block mb-2">Searched Hash</label>
                          <HashFlicker 
                            hash={result.hash || ''} 
                            className="text-text-primary break-all leading-relaxed text-sm sm:text-base"
                          />
                        </div>
                        
                        <div className="p-3 sm:p-4 bg-danger/10 rounded-lg border border-danger/30">
                          <h4 className="font-semibold text-danger mb-2 text-sm sm:text-base">Possible Reasons:</h4>
                          <ul className="space-y-1 text-xs sm:text-sm text-text-secondary">
                            <li>• Block hash is invalid or doesn&apos;t exist</li>
                            <li>• Block might be from a fork or orphaned chain</li>
                            <li>• Hash could be from a different network (testnet, etc.)</li>
                            <li>• Not included in our current verified dataset</li>
                            <li>• Block might not have been mined yet (if recent)</li>
                          </ul>
                        </div>
                        
                        <Button variant="ghost" onClick={handleNewCheck} className="mobile-button w-full sm:w-auto">
                          <Icons.shield className="mr-2 h-4 w-4" />
                          Try Another Block Hash
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sample Data Panel - Mobile optimized */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="theme-transition sticky top-4">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Icons.lightning className="h-4 w-4 sm:h-5 sm:w-5 text-bitcoin" />
                  Quick Test Samples
                </CardTitle>
                <p className="text-xs sm:text-sm text-text-secondary">
                  Tap any sample to auto-fill and test verification
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-success mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <Icons.verified className="h-3 w-3 sm:h-4 sm:w-4" />
                    Valid Block Headers
                  </h4>
                  <div className="space-y-2">
                    {sampleBlocks.filter(block => block.type === 'valid').map((block) => (
                      <button
                        key={block.id}
                        onClick={() => handleSampleClick(block.hash)}
                        className="w-full text-left p-3 bg-surface-alt hover:bg-surface mobile-hover transition-all duration-300 rounded-lg border border-slate-600 hover:border-success/50 group touch-target"
                      >
                        <div className="font-mono text-xs text-text-primary group-hover:text-success transition-colors mb-1 break-all">
                          {block.hash.substring(0, 12)}...{block.hash.substring(52)}
                        </div>
                        <div className="text-xs text-text-secondary">{block.description}</div>
                        <div className="text-xs text-success font-medium mt-1">{block.expectedResult}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-danger mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <Icons.unverified className="h-3 w-3 sm:h-4 sm:w-4" />
                    Invalid/Test Cases
                  </h4>
                  <div className="space-y-2">
                    {sampleBlocks.filter(block => block.type === 'invalid').map((block) => (
                      <button
                        key={block.id}
                        onClick={() => handleSampleClick(block.hash)}
                        className="w-full text-left p-3 bg-surface-alt hover:bg-surface mobile-hover transition-all duration-300 rounded-lg border border-slate-600 hover:border-danger/50 group touch-target"
                      >
                        <div className="font-mono text-xs text-text-primary group-hover:text-danger transition-colors mb-1 break-all">
                          {block.hash.substring(0, 12)}...{block.hash.substring(52)}
                        </div>
                        <div className="text-xs text-text-secondary">{block.description}</div>
                        <div className="text-xs text-danger font-medium mt-1">{block.expectedResult}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <h4 className="font-semibold text-text-primary mb-2 text-sm sm:text-base">Block Verification</h4>
                  <div className="text-xs text-text-secondary space-y-2">
                    <p>1. Enter or select a block hash</p>
                    <p>2. System checks canonical chain inclusion</p>
                    <p>3. STARK proofs validate block integrity</p>
                    <p>4. Instant confirmation with full details</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 