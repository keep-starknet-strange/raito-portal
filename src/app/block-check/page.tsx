"use client"

import { useState } from "react"
import Link from "next/link"
import { hashToBlockMap, MockBlock } from "@/data/mockBlocks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { HashFlicker } from "@/components/ui/hash-flicker"
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
      {/* Enhanced Header */}
      <div className="relative border-b border-slate-700 bg-gradient-to-r from-surface via-surface-alt to-surface">
        <div className="absolute inset-0 bg-bitcoin/5 opacity-30" />
        <div className="relative z-10 container mx-auto container-padding py-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-bitcoin/20 rounded-xl border border-bitcoin/30">
                <Icons.shield className="h-8 w-8 text-bitcoin" />
              </div>
              <h1 className="text-5xl font-bold text-text-primary">
                Block Header Verification
              </h1>
            </div>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Verify if a Bitcoin block hash is part of the canonical blockchain using STARK proofs. 
              <span className="text-bitcoin font-semibold"> Trustless block validation.</span>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-surface-alt/50 rounded-lg p-4 border border-slate-600">
              <div className="text-bitcoin font-semibold text-lg">Header Validation</div>
              <div className="text-text-secondary text-sm">Verify canonical chain inclusion</div>
            </div>
            <div className="bg-surface-alt/50 rounded-lg p-4 border border-slate-600">
              <div className="text-bitcoin font-semibold text-lg">STARK Proofs</div>
              <div className="text-text-secondary text-sm">Mathematically guaranteed</div>
            </div>
            <div className="bg-surface-alt/50 rounded-lg p-4 border border-slate-600">
              <div className="text-bitcoin font-semibold text-lg">Fork Detection</div>
              <div className="text-text-secondary text-sm">Identify invalid/orphaned blocks</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto container-padding py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Verification Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="theme-transition hover:shadow-xl hover:border-bitcoin/30 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Icons.cube className="h-6 w-6 text-bitcoin" />
                  Enter Block Hash
                </CardTitle>
                <p className="text-text-secondary">
                  Paste a 64-character hexadecimal block hash to verify its canonical chain inclusion
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="0000000000000000000002b5d213c78cc70c4b5a446c8d5e1f2c8d8f3a4b5c6d7e"
                      value={hash}
                      onChange={(e) => {
                        setHash(e.target.value.toLowerCase())
                        if (state === 'invalid') setState('idle')
                      }}
                      className={`font-mono text-sm h-12 ${
                        state === 'invalid' 
                          ? 'border-danger focus-visible:ring-danger' 
                          : state === 'found'
                          ? 'border-success focus-visible:ring-success'
                          : ''
                      }`}
                      disabled={state === 'checking'}
                    />
                    
                    {state === 'invalid' && (
                      <div className="flex items-center gap-2 text-danger text-sm">
                        <Icons.unverified className="h-4 w-4" />
                        Please enter a valid 64-character hexadecimal block hash
                      </div>
                    )}
                    
                    {hash && validateHash(hash) && (
                      <div className="flex items-center gap-2 text-success text-sm">
                        <Icons.verified className="h-4 w-4" />
                        Valid block hash format
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg font-semibold" 
                    disabled={state === 'checking' || !hash.trim()}
                  >
                    {state === 'checking' ? (
                      <>
                        <Icons.spinner className="mr-3 h-5 w-5 animate-spin" />
                        Verifying Block Header...
                      </>
                    ) : (
                      <>
                        <Icons.shield className="mr-3 h-5 w-5" />
                        Verify Block Header
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Enhanced Results */}
            {state === 'found' && result?.block && (
              <Card className="border-success/50 bg-gradient-to-r from-success/10 to-success/5 animate-in slide-in-from-bottom duration-500">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-success/20 rounded-xl border border-success/30">
                      <Icons.verified className="h-8 w-8 text-success" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-success mb-3">Block Header Verified!</h3>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-surface-alt rounded-lg border border-slate-600">
                          <label className="text-sm font-medium text-text-secondary block mb-2">Block Hash</label>
                          <HashFlicker 
                            hash={result.hash || ''} 
                            className="text-text-primary break-all leading-relaxed"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-success/10 rounded-lg border border-success/30">
                            <label className="text-sm font-medium text-success block mb-1">Block Height</label>
                            <div className="text-xl font-bold text-success">#{result.block.height.toLocaleString()}</div>
                          </div>
                          <div className="p-4 bg-bitcoin/10 rounded-lg border border-bitcoin/30">
                            <label className="text-sm font-medium text-bitcoin block mb-1">Transactions</label>
                            <div className="text-xl font-bold text-bitcoin">{result.block.txCount.toLocaleString()}</div>
                          </div>
                          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                            <label className="text-sm font-medium text-purple-400 block mb-1">Total Fees</label>
                            <div className="text-lg font-bold text-purple-400">{formatBTC(result.block.totalFees)}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-surface-alt rounded-lg border border-slate-600">
                            <label className="text-sm font-medium text-text-secondary block mb-1">Timestamp</label>
                            <div className="text-text-primary font-semibold">{new Date(result.block.timestamp).toLocaleDateString()}</div>
                            <div className="text-sm text-text-secondary">{formatTimeAgo(result.block.timestamp)}</div>
                          </div>
                          <div className="p-4 bg-success/10 rounded-lg border border-success/30">
                            <label className="text-sm font-medium text-success block mb-1">STARK Proof</label>
                            <div className="flex items-center gap-2">
                              <Icons.lock className="h-5 w-5 text-success" />
                              <span className="text-success font-semibold">Verified</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-text-secondary leading-relaxed">
                          ✅ This block header is confirmed as part of the canonical Bitcoin blockchain. 
                          It&apos;s covered by a STARK proof, providing cryptographic certainty of its validity 
                          and position in the main chain.
                        </p>
                        
                        <div className="flex flex-wrap gap-3">
                          <Button variant="outline" asChild>
                            <Link href={`/block/${result.block.height}`}>
                              <Icons.cube className="mr-2 h-4 w-4" />
                              View Block Details
                            </Link>
                          </Button>
                          <Button variant="ghost" onClick={handleNewCheck}>
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
              <Card className="border-danger/50 bg-gradient-to-r from-danger/10 to-danger/5 animate-in slide-in-from-bottom duration-500">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-danger/20 rounded-xl border border-danger/30">
                      <Icons.unverified className="h-8 w-8 text-danger" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-danger mb-3">Block Header Not Found</h3>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-surface-alt rounded-lg border border-slate-600">
                          <label className="text-sm font-medium text-text-secondary block mb-2">Searched Hash</label>
                          <HashFlicker 
                            hash={result.hash || ''} 
                            className="text-text-primary break-all leading-relaxed"
                          />
                        </div>
                        
                        <div className="p-4 bg-danger/10 rounded-lg border border-danger/30">
                          <h4 className="font-semibold text-danger mb-2">Possible Reasons:</h4>
                          <ul className="space-y-1 text-sm text-text-secondary">
                            <li>• Block hash is invalid or doesn&apos;t exist</li>
                            <li>• Block might be from a fork or orphaned chain</li>
                            <li>• Hash could be from a different network (testnet, etc.)</li>
                            <li>• Not included in our current verified dataset</li>
                            <li>• Block might not have been mined yet (if recent)</li>
                          </ul>
                        </div>
                        
                        <Button variant="ghost" onClick={handleNewCheck}>
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

          {/* Sample Data Panel */}
          <div className="space-y-6">
            <Card className="theme-transition sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.lightning className="h-5 w-5 text-bitcoin" />
                  Quick Test Samples
                </CardTitle>
                <p className="text-sm text-text-secondary">
                  Click any sample to auto-fill and test the verification
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-success mb-3 flex items-center gap-2">
                    <Icons.verified className="h-4 w-4" />
                    Valid Block Headers
                  </h4>
                  <div className="space-y-2">
                    {sampleBlocks.filter(block => block.type === 'valid').map((block) => (
                      <button
                        key={block.id}
                        onClick={() => handleSampleClick(block.hash)}
                        className="w-full text-left p-3 bg-surface-alt hover:bg-surface transition-all duration-300 rounded-lg border border-slate-600 hover:border-success/50 group"
                      >
                        <div className="font-mono text-xs text-text-primary group-hover:text-success transition-colors mb-1">
                          {block.hash.substring(0, 12)}...{block.hash.substring(52)}
                        </div>
                        <div className="text-xs text-text-secondary">{block.description}</div>
                        <div className="text-xs text-success font-medium mt-1">{block.expectedResult}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-danger mb-3 flex items-center gap-2">
                    <Icons.unverified className="h-4 w-4" />
                    Invalid/Test Cases
                  </h4>
                  <div className="space-y-2">
                    {sampleBlocks.filter(block => block.type === 'invalid').map((block) => (
                      <button
                        key={block.id}
                        onClick={() => handleSampleClick(block.hash)}
                        className="w-full text-left p-3 bg-surface-alt hover:bg-surface transition-all duration-300 rounded-lg border border-slate-600 hover:border-danger/50 group"
                      >
                        <div className="font-mono text-xs text-text-primary group-hover:text-danger transition-colors mb-1">
                          {block.hash.substring(0, 12)}...{block.hash.substring(52)}
                        </div>
                        <div className="text-xs text-text-secondary">{block.description}</div>
                        <div className="text-xs text-danger font-medium mt-1">{block.expectedResult}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <h4 className="font-semibold text-text-primary mb-2">Block Verification</h4>
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