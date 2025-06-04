"use client"

import { useState } from "react"
import Link from "next/link"
import { txidToBlockMap } from "@/data/mockBlocks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

type CheckState = 'idle' | 'checking' | 'found' | 'not-found' | 'invalid'

export default function TxCheckPage() {
  const [txid, setTxid] = useState('')
  const [state, setState] = useState<CheckState>('idle')
  const [result, setResult] = useState<{ blockHeight?: number; txid?: string } | null>(null)
  
  const validateTxid = (value: string): boolean => {
    // Check if it's a valid 64-character hex string
    return /^[a-fA-F0-9]{64}$/.test(value)
  }
  
  const handleCheck = async () => {
    if (!validateTxid(txid)) {
      setState('invalid')
      return
    }
    
    setState('checking')
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
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
  
  const handleNewCheck = () => {
    setState('idle')
    setResult(null)
    setTxid('')
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Transaction Inclusion Verification
        </h1>
        <p className="text-text-secondary text-lg">
          Check if a Bitcoin transaction is included in the verified blockchain
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.search className="h-5 w-5" />
            Enter Transaction ID
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter 64-character transaction hash (e.g., a1b2c3d4e5f6789012345678901234567890123456789012345678901234abcd)"
                value={txid}
                onChange={(e) => {
                  setTxid(e.target.value)
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
                  Please enter a valid 64-character transaction hash
                </p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={state === 'checking' || !txid.trim()}
            >
              {state === 'checking' ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Icons.search className="mr-2 h-4 w-4" />
                  Check Inclusion
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Results */}
      {state === 'found' && result && (
        <Card className="border-success/30 bg-success/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Icons.verified className="h-6 w-6 text-success mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-success mb-2">Transaction Found!</h3>
                <p className="text-text-secondary mb-4">
                  Transaction <span className="font-mono text-sm bg-surface-alt px-2 py-1 rounded">
                    {result.txid?.substring(0, 8)}...{result.txid?.substring(56)}
                  </span> is included in Block #{result.blockHeight?.toLocaleString()}.
                </p>
                <p className="text-sm text-text-secondary mb-4">
                  This means the transaction is part of the canonical chain and covered by a STARK proof.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/block/${result.blockHeight}`}>
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
                <h3 className="font-semibold text-danger mb-2">Transaction Not Found</h3>
                <p className="text-text-secondary mb-4">
                  Transaction <span className="font-mono text-sm bg-surface-alt px-2 py-1 rounded">
                    {result.txid?.substring(0, 8)}...{result.txid?.substring(56)}
                  </span> was not found in the canonical blockchain.
                </p>
                <p className="text-sm text-text-secondary mb-4">
                  This could mean the transaction doesn&apos;t exist, hasn&apos;t been confirmed yet, 
                  or isn&apos;t included in our current dataset.
                </p>
                <Button variant="ghost" size="sm" onClick={handleNewCheck}>
                  Try Another Transaction
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
            This tool checks if a Bitcoin transaction is included in our verified blockchain data. 
            Enter a valid transaction ID (TXID) to verify its inclusion.
          </p>
          <p>
            <strong className="text-text-primary">For testing:</strong> Try one of these sample TXIDs from our mock data:
          </p>
          <ul className="space-y-1 font-mono text-xs bg-surface-alt p-3 rounded">
            <li>a1b2c3d4e5f6789012345678901234567890123456789012345678901234abcd</li>
            <li>d4e5f678901234567890123456789012345678901234567890123456789abcdef</li>
            <li>789012345678901234567890123456789012345678901234567890123abcdef0</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
} 