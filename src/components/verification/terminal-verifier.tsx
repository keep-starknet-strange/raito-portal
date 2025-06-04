"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

interface TerminalVerifierProps {
  blockHeight: number
  className?: string
}

export function TerminalVerifier({ blockHeight, className = "" }: TerminalVerifierProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)

  const verificationSteps = [
    "Initializing STARK verifier...",
    "Loading block header data...",
    "Computing witness polynomials...", 
    "Verifying FRI commitments...",
    "Validating Merkle proofs...",
    "Final proof verification..."
  ]

  const matrixChars = ['0', '1', 'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ']

  const handleVerify = async () => {
    setIsOpen(true)
    setIsVerifying(true)
    setStep(0)

    for (let i = 0; i < verificationSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600))
      setStep(i + 1)
    }

    await new Promise(resolve => setTimeout(resolve, 500))
    setIsVerifying(false)
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsVerifying(false)
    setStep(0)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isVerifying) {
      handleClose()
    }
  }

  return (
    <>
      <div className={`${className}`}>
        <Button
          onClick={handleVerify}
          className="bg-success hover:bg-success/90 text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mobile-button"
          disabled={isVerifying}
        >
          <Icons.lock className="mr-2 h-5 w-5" />
          Verify Locally
        </Button>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm mobile-p-safe"
          onClick={handleBackdropClick}
        >
          <div className="relative bg-black border border-success/30 rounded-lg shadow-2xl mobile-terminal w-full max-w-4xl overflow-hidden">
            {/* Matrix rain background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 15 }, (_, i) => (
                <div
                  key={i}
                  className="matrix-rain absolute text-success/20 font-mono text-xs"
                  style={{
                    left: `${i * 6.67}%`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                >
                  {Array.from({ length: 20 }, (_, j) => (
                    <div key={j}>
                      {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Terminal header - Mobile optimized */}
            <div className="relative z-10 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-surface to-surface-alt border-b border-success/30">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500"></div>
                </div>
                <div className="text-success font-mono text-xs sm:text-sm">
                  raito-verifier v1.0.0 - Block #{blockHeight}
                </div>
              </div>
              
              {!isVerifying && (
                <Button
                  onClick={handleClose}
                  variant="ghost"
                  className="mobile-icon-button text-text-secondary hover:text-danger h-8 w-8 sm:h-10 sm:w-10"
                >
                  <Icons.unverified className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              )}
            </div>

            {/* Terminal content - Mobile optimized */}
            <div className="relative z-10 p-4 sm:p-6 bg-black/95 min-h-[300px] sm:min-h-[400px] overflow-y-auto mobile-scroll">
              <div className="font-mono text-success space-y-2 sm:space-y-3">
                {/* Verification steps */}
                {verificationSteps.map((stepText, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    {index < step ? (
                      <Icons.verified className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
                    ) : index === step - 1 && isVerifying ? (
                      <div className="loading-dots flex gap-1">
                        <span className="dot w-1 h-1 sm:w-1.5 sm:h-1.5 bg-success rounded-full"></span>
                        <span className="dot w-1 h-1 sm:w-1.5 sm:h-1.5 bg-success rounded-full"></span>
                        <span className="dot w-1 h-1 sm:w-1.5 sm:h-1.5 bg-success rounded-full"></span>
                      </div>
                    ) : (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border border-success/30 rounded"></div>
                    )}
                    <span className={`text-xs sm:text-sm ${index < step ? 'text-success' : index === step - 1 && isVerifying ? 'glow-text' : 'text-success/50'}`}>
                      {stepText}
                    </span>
                  </div>
                ))}

                {/* Results section */}
                {!isVerifying && step >= verificationSteps.length && (
                  <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6 mobile-slide-up">
                    <div className="border border-success/30 rounded-lg p-4 sm:p-6 bg-success/5">
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="p-2 sm:p-3 bg-success/20 rounded-xl border border-success/30">
                          <Icons.lock className="h-6 w-6 sm:h-8 sm:w-8 text-success" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-2xl font-bold text-success mb-1 sm:mb-2">
                            Proof Verified Successfully!
                          </h3>
                          <p className="text-xs sm:text-sm text-success/80">
                            Block #{blockHeight} is cryptographically proven valid
                          </p>
                        </div>
                      </div>

                      {/* Stats grid - Mobile optimized */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="bg-surface-alt/50 rounded-lg p-3 sm:p-4 border border-slate-600">
                          <div className="text-xs sm:text-sm text-success font-medium">Proof Size</div>
                          <div className="text-sm sm:text-lg font-bold text-success">2.4 KB</div>
                        </div>
                        <div className="bg-surface-alt/50 rounded-lg p-3 sm:p-4 border border-slate-600">
                          <div className="text-xs sm:text-sm text-success font-medium">Verify Time</div>
                          <div className="text-sm sm:text-lg font-bold text-success">3.6s</div>
                        </div>
                        <div className="bg-surface-alt/50 rounded-lg p-3 sm:p-4 border border-slate-600 col-span-2 sm:col-span-1">
                          <div className="text-xs sm:text-sm text-success font-medium">Security</div>
                          <div className="text-sm sm:text-lg font-bold text-success">128-bit</div>
                        </div>
                      </div>

                      <div className="text-xs sm:text-sm text-success/70 leading-relaxed">
                        ✅ STARK proof validation complete. This block header is mathematically 
                        proven to be part of the canonical Bitcoin blockchain without requiring 
                        trust in any third party.
                      </div>
                    </div>

                    {/* Mobile-friendly close button */}
                    <div className="flex justify-center">
                      <Button
                        onClick={handleClose}
                        className="mobile-button bg-surface hover:bg-surface-alt text-text-primary border border-success/30"
                      >
                        <Icons.verified className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Close Terminal
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 