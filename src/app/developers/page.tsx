import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

export default function DevelopersPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Developer Resources
        </h1>
        <p className="text-text-secondary text-lg max-w-3xl mx-auto">
          Build on top of Raito&apos;s Bitcoin STARK verification infrastructure. 
          Access APIs, SDKs, and documentation to integrate trustless verification into your applications.
        </p>
      </div>
      
      {/* Coming Soon Banner */}
      <div className="mb-12 p-6 bg-bitcoin/10 border border-bitcoin/30 rounded-xl text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Icons.lightning className="h-6 w-6 text-bitcoin" />
          <h2 className="text-xl font-semibold text-bitcoin">Coming Soon</h2>
        </div>
        <p className="text-text-secondary">
          Full developer tools and APIs are under active development. 
          Follow our progress on GitHub and join the community!
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* API Reference */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.externalLink className="h-5 w-5 text-bitcoin" />
              REST API (Preview)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-text-secondary text-sm">
              Access Bitcoin block data and STARK proofs programmatically
            </p>
            
            <div className="space-y-3">
              <div className="p-3 bg-surface-alt rounded-lg">
                <h4 className="font-mono text-sm font-medium text-success mb-1">GET /api/blocks</h4>
                <p className="text-xs text-text-secondary">Retrieve latest verified blocks</p>
              </div>
              
              <div className="p-3 bg-surface-alt rounded-lg">
                <h4 className="font-mono text-sm font-medium text-success mb-1">GET /api/block/:height</h4>
                <p className="text-xs text-text-secondary">Get detailed block information</p>
              </div>
              
              <div className="p-3 bg-surface-alt rounded-lg">
                <h4 className="font-mono text-sm font-medium text-success mb-1">GET /api/proof/:height</h4>
                <p className="text-xs text-text-secondary">Download STARK proof for block</p>
              </div>
              
              <div className="p-3 bg-surface-alt rounded-lg">
                <h4 className="font-mono text-sm font-medium text-success mb-1">POST /api/verify</h4>
                <p className="text-xs text-text-secondary">Verify transaction inclusion</p>
              </div>
            </div>
            
            <Button variant="outline" className="w-full" disabled>
              <Icons.externalLink className="mr-2 h-4 w-4" />
              View Full API Docs
            </Button>
          </CardContent>
        </Card>
        
        {/* JavaScript SDK */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.download className="h-5 w-5 text-bitcoin" />
              JavaScript SDK (Preview)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-text-secondary text-sm">
              Integrate Raito verification into your web applications
            </p>
            
            <div className="p-4 bg-bg-base rounded-lg border border-slate-700">
              <pre className="font-mono text-sm text-text-primary overflow-x-auto">
                <code>{`npm install @raito/sdk

import { RaitoClient } from '@raito/sdk'

const client = new RaitoClient()

// Verify a block
const block = await client.getBlock(870000)
const isValid = await client.verifyProof(
  block.proof
)

// Check transaction inclusion
const included = await client.checkTxInclusion(
  'a1b2c3d4e5f6...'
)`}</code>
              </pre>
            </div>
            
            <Button variant="outline" className="w-full" disabled>
              <Icons.download className="mr-2 h-4 w-4" />
              Download SDK
            </Button>
          </CardContent>
        </Card>
        
        {/* CLI Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.search className="h-5 w-5 text-bitcoin" />
              Command Line Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-text-secondary text-sm">
              Verify proofs and interact with Bitcoin data from the terminal
            </p>
            
            <div className="p-4 bg-bg-base rounded-lg border border-slate-700">
              <pre className="font-mono text-sm text-text-primary overflow-x-auto">
                <code>{`# Install Raito CLI
curl -sSL raito.wtf/install.sh | sh

# Verify a block proof
raito verify block_870000.proof

# Check transaction inclusion
raito check-tx a1b2c3d4e5f6...

# Sync with STARK proofs
raito sync --height 870000`}</code>
              </pre>
            </div>
            
            <Button variant="outline" className="w-full" disabled>
              <Icons.download className="mr-2 h-4 w-4" />
              Download CLI
            </Button>
          </CardContent>
        </Card>
        
        {/* Node Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.verified className="h-5 w-5 text-bitcoin" />
              Bitcoin Node Plugin
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-text-secondary text-sm">
              Add STARK verification capabilities to your Bitcoin node
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-surface-alt rounded-lg">
                <Icons.lightning className="h-5 w-5 text-bitcoin" />
                <div>
                  <h4 className="font-medium text-text-primary">Fast IBD</h4>
                  <p className="text-xs text-text-secondary">Initial Block Download in minutes</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-surface-alt rounded-lg">
                <Icons.lock className="h-5 w-5 text-success" />
                <div>
                  <h4 className="font-medium text-text-primary">Trustless Sync</h4>
                  <p className="text-xs text-text-secondary">Verify without trusting peers</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-surface-alt rounded-lg">
                <Icons.verified className="h-5 w-5 text-bitcoin" />
                <div>
                  <h4 className="font-medium text-text-primary">STARK Proofs</h4>
                  <p className="text-xs text-text-secondary">Cryptographic verification</p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full" disabled>
              <Icons.download className="mr-2 h-4 w-4" />
              Get Plugin
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Community & Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Open Source</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary text-sm mb-4">
              Raito is fully open source. Contribute, report issues, or build your own implementations.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="https://github.com/keep-starknet-strange/raito" target="_blank">
                <Icons.github className="mr-2 h-4 w-4" />
                View on GitHub
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary text-sm mb-4">
              Learn about STARK proofs, Bitcoin verification, and the ZeroSync protocol.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="https://zerosync.org" target="_blank">
                <Icons.externalLink className="mr-2 h-4 w-4" />
                Read Docs
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Community</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary text-sm mb-4">
              Join the discussion, get help, and stay updated on the latest developments.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="https://twitter.com/StarknetFdn" target="_blank">
                <Icons.twitter className="mr-2 h-4 w-4" />
                Follow Updates
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 