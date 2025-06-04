import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

export default function HomePage() {
  return (
    <div className="relative">
      {/* Block stream background */}
      <div className="absolute inset-0 block-stream-bg" />
      
      {/* Hero Section */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary mb-8">
            Don&apos;t trust, 
            <span className="text-bitcoin block mt-2">verify</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore Bitcoin blocks with <span className="text-bitcoin font-semibold">STARK proofs</span> for instant, 
            trustless verification using zero-knowledge cryptography.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" asChild className="shadow-glow">
              <Link href="/explorer">
                <Icons.lock className="mr-2 h-5 w-5" />
                Explore Blocks
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link href="/developers">
                View Documentation
                <Icons.externalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-surface rounded-xl flex items-center justify-center border border-slate-700">
                <Icons.lightning className="h-8 w-8 text-bitcoin" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary">Blazing Fast</h3>
              <p className="text-text-secondary">
                Sync your Bitcoin node within minutes using STARK proof verification instead of downloading the entire blockchain.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-surface rounded-xl flex items-center justify-center border border-slate-700">
                <Icons.lock className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary">Trustless Verification</h3>
              <p className="text-text-secondary">
                Verify block headers and transaction inclusion without trusting any third party using cryptographic proofs.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-surface rounded-xl flex items-center justify-center border border-slate-700">
                <Icons.verified className="h-8 w-8 text-bitcoin" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary">Zero-Knowledge</h3>
              <p className="text-text-secondary">
                Powered by STARK technology, enabling succinct proofs that anyone can verify in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-surface to-surface-alt">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-8">
            Experience the Future of Bitcoin Verification
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Try our verification tools to see how STARK proofs can revolutionize Bitcoin light clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/tx-check">
                <Icons.search className="mr-2 h-5 w-5" />
                Verify Transaction
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/block-check">
                Verify Block Header
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
