"use client"

import { useState } from "react"
import Link from "next/link"
import { txidToBlockMap } from "@/data/mockBlocks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { HashFlicker } from "@/components/ui/hash-flicker"
import { MobileHashInput } from "@/components/ui/mobile-hash-input"

type CheckState = 'idle' | 'checking' | 'found' | 'not-found' | 'invalid'

interface SampleTx {
  id: string
  hash: string
  description: string
  type: 'valid' | 'invalid'
  expectedResult?: string
}

const sampleTransactions: SampleTx[] = [
  {
    id: 'valid-1',
    hash: 'd4e5f67890123456789012345678901234567890123456789012345678abcdef',
    description: 'Valid transaction in Block #869999',
    type: 'valid',
    expectedResult: 'Found in Block #869999'
  },
  {
    id: 'valid-2', 
    hash: '7890123456789012345678901234567890123456789012345678901234abcdef',
    description: 'Valid transaction in Block #869998',
    type: 'valid',
    expectedResult: 'Found in Block #869998'
  },
  {
    id: 'valid-3',
    hash: '0123456789012345678901234567890123456789012345678901234567abcdef',
    description: 'Valid transaction in Block #869997',
    type: 'valid', 
    expectedResult: 'Found in Block #869997'
  },
  {
    id: 'invalid-1',
    hash: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    description: 'Non-existent transaction (all F&apos;s)',
    type: 'invalid',
    expectedResult: 'Not found in blockchain'
  },
  {
    id: 'invalid-2',
    hash: '0000000000000000000000000000000000000000000000000000000000000000',
    description: 'Invalid transaction (all zeros)',
    type: 'invalid',
    expectedResult: 'Not found in blockchain'
  },
  {
    id: 'invalid-3',
    hash: 'deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
    description: 'Test transaction (deadbeef pattern)',
    type: 'invalid',
    expectedResult: 'Not found in blockchain'
  }
]

export default function TxCheckPage() {
  const [txid, setTxid] = useState('')
  const [state, setState] = useState<CheckState>('idle')
  const [result, setResult] = useState<{ blockHeight?: number; txid?: string } | null>(null)
  
  const validateTxid = (value: string): boolean => {
    return /^[a-fA-F0-9]{64}$/.test(value)
  }
  
  const handleCheck = async () => {
    if (!validateTxid(txid)) {
      setState('invalid')
      return
    }
    
    setState('checking')
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const blockHeight = txidToBlockMap.get(txid)
    
    if (blockHeight) {
      setState('found')
      setResult({ blockHeight, txid })
    } else {
      setState('not-found')
      setResult({ txid })
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCheck()
  }
  
  const handleSampleClick = (hash: string) => {
    setTxid(hash)
    setState('idle')
    setResult(null)
  }
  
  const handleNewCheck = () => {
    setState('idle')
    setResult(null)
    setTxid('')
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
                <Icons.search className="h-6 w-6 sm:h-8 sm:w-8 text-bitcoin" />
              </div>
              <h1 className="mobile-h1 font-bold text-text-primary">
                Transaction Verification
              </h1>
            </div>
            <p className="mobile-text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed px-4">
              Verify Bitcoin transaction inclusion using STARK proofs. 
              <span className="text-bitcoin font-semibold"> Don&apos;t trust, verify.</span>
            </p>
          </div>

          {/* Quick Stats - Mobile optimized grid */}
          <div className="mobile-stats-grid sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
            <div className="bg-surface-alt/50 rounded-lg p-3 sm:p-4 border border-slate-600">
              <div className="text-bitcoin font-semibold text-sm sm:text-lg">Instant Verification</div>
              <div className="text-text-secondary text-xs sm:text-sm">Results in ~1.5 seconds</div>
            </div>
            <div className="bg-surface-alt/50 rounded-lg p-3 sm:p-4 border border-slate-600">
              <div className="text-bitcoin font-semibold text-sm sm:text-lg">STARK Backed</div>
              <div className="text-text-secondary text-xs sm:text-sm">Cryptographically proven</div>
            </div>
            <div className="bg-surface-alt/50 rounded-lg p-3 sm:p-4 border border-slate-600 col-span-2 sm:col-span-1">
              <div className="text-bitcoin font-semibold text-sm sm:text-lg">Trustless</div>
              <div className="text-text-secondary text-xs sm:text-sm">No third parties required</div>
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
                  <Icons.activity className="h-5 w-5 sm:h-6 sm:w-6 text-bitcoin" />
                  Enter Transaction ID
                </CardTitle>
                <p className="text-text-secondary text-sm sm:text-base">
                  Paste a 64-character hexadecimal transaction hash
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <MobileHashInput
                    value={txid}
                    onChange={setTxid}
                    placeholder="d4e5f67890123456789012345678901234567890123456789012345678abcdef"
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
                    disabled={state === 'checking' || !txid.trim()}
                  >
                    {state === 'checking' ? (
                      <>
                        <Icons.spinner className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        Verifying Transaction...
                      </>
                    ) : (
                      <>
                        <Icons.search className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                        Verify Transaction Inclusion
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Enhanced Results - Mobile optimized */}
            {state === 'found' && result && (
              <Card className="border-success/50 bg-gradient-to-r from-success/10 to-success/5 mobile-slide-up">
                <CardContent className="pt-4 sm:pt-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-success/20 rounded-xl border border-success/30 flex-shrink-0">
                      <Icons.verified className="h-6 w-6 sm:h-8 sm:w-8 text-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mobile-h3 font-bold text-success mb-2 sm:mb-3">Transaction Verified!</h3>
                      
                      <div className="space-y-3 sm:space-y-4">
                        <div className="p-3 sm:p-4 bg-surface-alt rounded-lg border border-slate-600">
                          <label className="text-xs sm:text-sm font-medium text-text-secondary block mb-2">Transaction Hash</label>
                          <HashFlicker 
                            hash={result.txid || ''} 
                            className="text-text-primary break-all leading-relaxed text-sm sm:text-base"
                            copyable={true}
                          />
                        </div>
                        
                        <div className="mobile-stats-grid gap-3 sm:gap-4">
                          <div className="p-3 sm:p-4 bg-success/10 rounded-lg border border-success/30">
                            <label className="text-xs sm:text-sm font-medium text-success block mb-1">Block Height</label>
                            <div className="mobile-text-lg sm:text-2xl font-bold text-success">#{result.blockHeight?.toLocaleString()}</div>
                          </div>
                          <div className="p-3 sm:p-4 bg-bitcoin/10 rounded-lg border border-bitcoin/30">
                            <label className="text-xs sm:text-sm font-medium text-bitcoin block mb-1">Proof Status</label>
                            <div className="flex items-center gap-2">
                              <Icons.lock className="h-4 w-4 sm:h-5 sm:w-5 text-bitcoin" />
                              <span className="text-bitcoin font-semibold text-sm sm:text-base">STARK Verified</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                          🎉 This transaction is confirmed and included in the canonical Bitcoin blockchain. 
                          It&apos;s covered by a STARK proof, ensuring mathematical certainty of its inclusion 
                          without requiring trust in third parties.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                          <Button variant="outline" asChild className="mobile-button">
                            <Link href={`/block/${result.blockHeight}`}>
                              <Icons.cube className="mr-2 h-4 w-4" />
                              View Block Details
                            </Link>
                          </Button>
                          <Button variant="ghost" onClick={handleNewCheck} className="mobile-button">
                            <Icons.search className="mr-2 h-4 w-4" />
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
                      <h3 className="mobile-h3 font-bold text-danger mb-2 sm:mb-3">Transaction Not Found</h3>
                      
                      <div className="space-y-3 sm:space-y-4">
                        <div className="p-3 sm:p-4 bg-surface-alt rounded-lg border border-slate-600">
                          <label className="text-xs sm:text-sm font-medium text-text-secondary block mb-2">Searched Hash</label>
                          <HashFlicker 
                            hash={result.txid || ''} 
                            className="text-text-primary break-all leading-relaxed text-sm sm:text-base"
                            copyable={true}
                          />
                        </div>
                        
                        <div className="p-3 sm:p-4 bg-danger/10 rounded-lg border border-danger/30">
                          <h4 className="font-semibold text-danger mb-2 text-sm sm:text-base">Possible Reasons:</h4>
                          <ul className="space-y-1 text-xs sm:text-sm text-text-secondary">
                            <li>• Transaction doesn&apos;t exist or hasn&apos;t been mined yet</li>
                            <li>• Hash might be from a different network (testnet, etc.)</li>
                            <li>• Transaction could be in mempool but not yet confirmed</li>
                            <li>• Not included in our current verified dataset</li>
                          </ul>
                        </div>
                        
                        <Button variant="ghost" onClick={handleNewCheck} className="mobile-button w-full sm:w-auto">
                          <Icons.search className="mr-2 h-4 w-4" />
                          Try Another Transaction
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
                    Valid Transactions
                  </h4>
                  <div className="space-y-2">
                    {sampleTransactions.filter(tx => tx.type === 'valid').map((tx) => (
                      <button
                        key={tx.id}
                        onClick={() => handleSampleClick(tx.hash)}
                        className="w-full text-left p-3 bg-surface-alt hover:bg-surface mobile-hover transition-all duration-300 rounded-lg border border-slate-600 hover:border-success/50 group touch-target"
                      >
                        <div className="font-mono text-xs text-text-primary group-hover:text-success transition-colors mb-1 break-all">
                          {tx.hash.substring(0, 12)}...{tx.hash.substring(52)}
                        </div>
                        <div className="text-xs text-text-secondary">{tx.description}</div>
                        <div className="text-xs text-success font-medium mt-1">{tx.expectedResult}</div>
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
                    {sampleTransactions.filter(tx => tx.type === 'invalid').map((tx) => (
                      <button
                        key={tx.id}
                        onClick={() => handleSampleClick(tx.hash)}
                        className="w-full text-left p-3 bg-surface-alt hover:bg-surface mobile-hover transition-all duration-300 rounded-lg border border-slate-600 hover:border-danger/50 group touch-target"
                      >
                        <div className="font-mono text-xs text-text-primary group-hover:text-danger transition-colors mb-1 break-all">
                          {tx.hash.substring(0, 12)}...{tx.hash.substring(52)}
                        </div>
                        <div className="text-xs text-text-secondary">{tx.description}</div>
                        <div className="text-xs text-danger font-medium mt-1">{tx.expectedResult}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <h4 className="font-semibold text-text-primary mb-2 text-sm sm:text-base">How it Works</h4>
                  <div className="text-xs text-text-secondary space-y-2">
                    <p>1. Enter or select a transaction hash</p>
                    <p>2. System searches verified blockchain data</p>
                    <p>3. STARK proofs ensure trustless verification</p>
                    <p>4. Get instant confirmation of inclusion</p>
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