import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

export default function HomePage() {
  return (
    <div className="relative page-transition-premium">
      {/* Enhanced block stream background */}
      <div className="absolute inset-0 block-stream-premium opacity-40" />
      
      {/* Hero Section */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8 overflow-hidden">
        {/* Floating Bitcoin particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-2 h-2 bg-bitcoin/20 rounded-full
                float-premium opacity-30
              `}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + (i % 3)}s`
              }}
            />
          ))}
        </div>

        <div className="mx-auto max-w-4xl text-center relative z-10">
          <h1 className="mobile-h1 lg:text-7xl font-extrabold tracking-tight text-text-primary mb-8 leading-tight">
            <span className="inline-block hover:scale-105 transition-transform duration-300 cursor-default">
              Don&apos;t trust,
            </span>
            <span className="text-bitcoin block mt-2 hover:drop-shadow-[0_0_20px_rgba(247,147,26,0.6)] transition-all duration-500 cursor-default glow-text-premium">
              verify
            </span>
          </h1>
          
          <p className="mobile-text-lg lg:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore Bitcoin blocks with{" "}
            <span className="text-bitcoin font-semibold relative">
              <span className="relative z-10">STARK proofs</span>
              <span className="absolute inset-0 bg-bitcoin/10 blur-md rounded" />
            </span>{" "}
            for instant, trustless verification using zero-knowledge cryptography.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              asChild 
              className="btn-premium group relative overflow-hidden mobile-button min-w-[200px]"
            >
              <Link href="/explorer">
                <div className="flex items-center relative z-10">
                  <Icons.lock className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-semibold">Explore Blocks</span>
                </div>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              asChild
              className="card-hover-premium border-bitcoin/30 hover:border-bitcoin text-text-primary hover:text-bitcoin mobile-button min-w-[200px] group"
            >
              <Link href="/developers">
                <span>View Documentation</span>
                <Icons.externalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>

          {/* Enhanced stats ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="card-hover-premium p-4 rounded-xl bg-surface/50 border border-slate-700/50 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-bitcoin mb-1">2.4KB</div>
              <div className="text-xs sm:text-sm text-text-secondary">Proof Size</div>
            </div>
            <div className="card-hover-premium p-4 rounded-xl bg-surface/50 border border-slate-700/50 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-success mb-1">&lt;3s</div>
              <div className="text-xs sm:text-sm text-text-secondary">Verify Time</div>
            </div>
            <div className="card-hover-premium p-4 rounded-xl bg-surface/50 border border-slate-700/50 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">128b</div>
              <div className="text-xs sm:text-sm text-text-secondary">Security</div>
            </div>
            <div className="card-hover-premium p-4 rounded-xl bg-surface/50 border border-slate-700/50 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">0</div>
              <div className="text-xs sm:text-sm text-text-secondary">Trust Required</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced Features Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="mobile-h2 font-bold text-text-primary mb-4">
              Powered by{" "}
              <span className="text-bitcoin relative">
                <span className="relative z-10">STARK Technology</span>
                <span className="absolute inset-0 bg-bitcoin/5 blur-xl rounded-lg" />
              </span>
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Experience the next generation of Bitcoin verification with zero-knowledge proofs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-hover-premium text-center space-y-6 p-6 rounded-2xl bg-surface/30 border border-slate-700/50 backdrop-blur-sm group">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-bitcoin/20 to-bitcoin/10 rounded-2xl flex items-center justify-center border border-bitcoin/30 group-hover:scale-110 transition-transform duration-300">
                <Icons.lightning className="h-10 w-10 text-bitcoin drop-shadow-[0_0_10px_rgba(247,147,26,0.5)]" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary group-hover:text-bitcoin transition-colors duration-300">Blazing Fast</h3>
              <p className="text-text-secondary leading-relaxed">
                Sync your Bitcoin node within minutes using STARK proof verification instead of downloading the entire blockchain.
              </p>
            </div>
            
            <div className="card-hover-premium text-center space-y-6 p-6 rounded-2xl bg-surface/30 border border-slate-700/50 backdrop-blur-sm group">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-success/20 to-success/10 rounded-2xl flex items-center justify-center border border-success/30 group-hover:scale-110 transition-transform duration-300 stark-pulse">
                <Icons.lock className="h-10 w-10 text-success drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary group-hover:text-success transition-colors duration-300">Trustless Verification</h3>
              <p className="text-text-secondary leading-relaxed">
                Verify block headers and transaction inclusion without trusting any third party using cryptographic proofs.
              </p>
            </div>
            
            <div className="card-hover-premium text-center space-y-6 p-6 rounded-2xl bg-surface/30 border border-slate-700/50 backdrop-blur-sm group">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                <Icons.verified className="h-10 w-10 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary group-hover:text-purple-400 transition-colors duration-300">Zero-Knowledge</h3>
              <p className="text-text-secondary leading-relaxed">
                Powered by STARK technology, enabling succinct proofs that anyone can verify in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced CTA Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-surface via-surface-alt to-surface overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="block-stream-premium"></div>
        </div>
        
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <div className="mb-8">
            <h2 className="mobile-h2 font-bold text-text-primary mb-4">
              Experience the Future of Bitcoin Verification
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              Try our verification tools to see how STARK proofs can revolutionize Bitcoin light clients.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button 
              size="lg" 
              asChild
              className="btn-premium group mobile-button min-w-[220px]"
            >
              <Link href="/tx-check">
                <div className="flex items-center relative z-10">
                  <Icons.search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold">Verify Transaction</span>
                </div>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              asChild
              className="card-hover-premium border-bitcoin/30 hover:border-bitcoin text-text-primary hover:text-bitcoin mobile-button min-w-[220px] group"
            >
              <Link href="/block-check">
                <div className="flex items-center">
                  <Icons.shield className="mr-2 h-5 w-5 group-hover:rotate-6 transition-transform duration-300" />
                  <span>Verify Block Header</span>
                </div>
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-text-secondary/60 text-sm">
            <div className="flex items-center gap-2">
              <Icons.verified className="h-4 w-4 text-success" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.lock className="h-4 w-4 text-bitcoin" />
              <span>Zero Trust Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.lightning className="h-4 w-4 text-purple-400" />
              <span>Instant Verification</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
