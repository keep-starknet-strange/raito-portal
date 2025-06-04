"use client"

import { useState } from "react"
import Link from "next/link"
import { hashToBlockMap, MockBlock } from "@/data/mockBlocks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

type CheckState = 'idle' | 'checking' | 'found' | 'not-found' | 'invalid'

export default function BlockCheckPage() {
  const [hash, setHash] = useState('')
  const [state, setState] = useState<CheckState>('idle')
  const [result, setResult] = useState<{ block?: MockBlock; hash?: string } | null>(null)
  
  const validateHash = (value: string): boolean => {
    // Check if it's a valid 64-character hex string
    return /^[a-fA-F0-9]{64}$/.test(value)
  }
  
  const handleCheck = async () => {
    if (!validateHash(hash)) {
      setState('invalid')
      return
    }
    
    setState('checking')
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
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
  
  const handleNewCheck = () => {
    setState('idle')
    setResult(null)
    setHash('')
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Block Header Verification
        </h1>
        <p className="text-text-secondary text-lg">
          Check if a Bitcoin block hash is part of the canonical chain
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.search className="h-5 w-5" />
            Enter Block Hash
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter 64-character block hash (e.g., 00000000000000000002a23d6df20eecec15b21d32c75833cce28f42c4f3870a)"
                value={hash}
                onChange={(e) => {
                  setHash(e.target.value)
                  if (state === 'invalid') setState('idle')
                }}
                className={`font-mono ${
                  state === 'invalid' 
                    ? 'border-danger focus-visible:ring-danger' 
                    : ''
                }`}
                disabled={state === 'checking'}
              />
              {state === 'invalid' && (
                <p className="text-danger text-sm mt-1">
                  Please enter a valid 64-character block hash
                </p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={state === 'checking' || !hash.trim()}
            >
              {state === 'checking' ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Icons.search className="mr-2 h-4 w-4" />
                  Verify Header
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Results */}
      {state === 'found' && result?.block && (
        <Card className="border-success/30 bg-success/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Icons.verified className="h-6 w-6 text-success mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-success mb-2">Block Found!</h3>
                <p className="text-text-secondary mb-4">
                  Block hash <span className="font-mono text-sm bg-surface-alt px-2 py-1 rounded">
                    {result.hash?.substring(0, 12)}...{result.hash?.substring(52)}
                  </span> is in the canonical chain at height #{result.block.height.toLocaleString()}.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-surface-alt rounded-lg mb-4">
                  <div>
                    <label className="text-xs font-medium text-text-secondary">Block Height</label>
                    <p className="font-mono text-bitcoin font-semibold">#{result.block.height.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-text-secondary">Transactions</label>
                    <p className="font-semibold">{result.block.txCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-text-secondary">STARK Proof</label>
                    <div className="flex items-center gap-1">
                      <Icons.lock className="h-4 w-4 text-success" />
                      <span className="text-success font-medium">Verified</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-text-secondary">Timestamp</label>
                    <p className="text-sm">{new Date(result.block.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/block/${result.block.height}`}>
                      View Block Details
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleNewCheck}>
                    Check Another
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {state === 'not-found' && result && (
        <Card className="border-danger/30 bg-danger/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Icons.unverified className="h-6 w-6 text-danger mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-danger mb-2">Block Not Found</h3>
                <p className="text-text-secondary mb-4">
                  Block hash <span className="font-mono text-sm bg-surface-alt px-2 py-1 rounded">
                    {result.hash?.substring(0, 12)}...{result.hash?.substring(52)}
                  </span> was not found in the canonical blockchain.
                </p>
                <p className="text-sm text-text-secondary mb-4">
                  This could mean the block hash is invalid, from a fork, or not included 
                  in our current dataset of verified blocks.
                </p>
                <Button variant="ghost" size="sm" onClick={handleNewCheck}>
                  Try Another Block Hash
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Help Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">How it works</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-text-secondary space-y-3">
          <p>
            This tool verifies if a given block header hash is part of the main Bitcoin blockchain. 
            Enter a valid block hash to check its inclusion in the canonical chain.
          </p>
          <p>
            <strong className="text-text-primary">For testing:</strong> Try one of these sample block hashes from our mock data:
          </p>
          <ul className="space-y-1 font-mono text-xs bg-surface-alt p-3 rounded">
            <li>00000000000000000002a23d6df20eecec15b21d32c75833cce28f42c4f3870a</li>
            <li>00000000000000000002b5d213c78cc70c4b5a446c8d5e1f2c8d8f3a4b5c6d7e</li>
            <li>00000000000000000001a2b3c4d5e6f7890123456789012345678901234567</li>
          </ul>
          <p>
            <strong className="text-text-primary">Note:</strong> All verified blocks include STARK proofs 
            that allow instant validation without downloading the entire blockchain.
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 