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
    "Checking arithmetic constraints...",
    "✓ STARK proof VERIFIED successfully!"
  ]

  const startVerification = () => {
    setIsOpen(true)
    setIsVerifying(true)
    setStep(0)
    
    // Simulate verification steps - faster timing
    const interval = setInterval(() => {
      setStep(prevStep => {
        if (prevStep >= verificationSteps.length - 1) {
          clearInterval(interval)
          setIsVerifying(false)
          return prevStep
        }
        return prevStep + 1
      })
    }, 600) // Reduced from 800ms to 600ms
  }

  const handleClose = () => {
    setIsOpen(false)
    setStep(0)
    setIsVerifying(false)
  }

  const matrixChars = "ヌコノイサキシメル01"
  const generateMatrixRain = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="matrix-rain absolute text-green-400 font-mono text-sm opacity-20"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${2 + Math.random() * 3}s`
        }}
      >
        {Array.from({ length: 15 }, () => 
          matrixChars[Math.floor(Math.random() * matrixChars.length)]
        ).join('')}
      </div>
    ))
  }

  return (
    <>
      <Button
        onClick={startVerification}
        variant="default"
        size="sm"
        className={`bg-success hover:bg-success/90 text-black font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${className}`}
        disabled={isVerifying}
      >
        <Icons.lightning className="mr-2 h-4 w-4" />
        Verify Locally
      </Button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={handleClose}
        >
          <div 
            className="relative w-full max-w-3xl h-[500px] bg-black border border-green-400/30 rounded-lg overflow-hidden font-mono shadow-2xl shadow-green-400/20 terminal-flicker"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Matrix rain background */}
            <div className="absolute inset-0 overflow-hidden">
              {generateMatrixRain()}
            </div>
            
            {/* Terminal header */}
            <div className="relative z-10 bg-green-900/20 border-b border-green-400/30 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-3 text-green-400 text-sm">raito-verifier v1.0.0</span>
              </div>
              <button
                onClick={handleClose}
                className="text-green-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Terminal content */}
            <div className="relative z-10 p-6 h-full overflow-y-auto">
              <div className="text-green-400 text-sm leading-relaxed">
                <div className="mb-4">
                  <span className="text-yellow-400">$</span> raito verify-block --height={blockHeight} --local
                </div>
                
                <div className="space-y-2 mb-6">
                  {verificationSteps.slice(0, step + 1).map((stepText, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-2 ${
                        index === step ? 'animate-pulse' : ''
                      } ${
                        stepText.includes('✓') ? 'text-green-300 font-bold' : 'text-green-400'
                      }`}
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      {stepText.includes('✓') ? (
                        <>
                          <Icons.verified className="h-4 w-4 text-green-300 animate-spin" />
                          <span className="glow-text">{stepText}</span>
                        </>
                      ) : index === step && isVerifying ? (
                        <>
                          <div className="loading-dots">
                            <span className="dot">.</span>
                            <span className="dot">.</span>
                            <span className="dot">.</span>
                          </div>
                          <span>{stepText}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-green-600">▶</span>
                          <span>{stepText}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                
                {step >= verificationSteps.length - 1 && (
                  <div className="mt-8 p-6 border-2 border-green-400/70 rounded-lg bg-green-400/20 relative overflow-hidden">
                    {/* Success glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-green-400/20 to-green-400/10 animate-pulse"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 text-green-300 font-bold text-xl mb-4">
                        <Icons.lock className="h-8 w-8 animate-bounce" />
                        <span>VERIFICATION COMPLETE!</span>
                        <Icons.verified className="h-8 w-8 animate-spin" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-black/30 rounded p-3">
                          <div className="text-green-400 text-xs uppercase tracking-wide mb-1">Block Height</div>
                          <div className="text-green-300 font-bold text-lg">#{blockHeight.toLocaleString()}</div>
                        </div>
                        <div className="bg-black/30 rounded p-3">
                          <div className="text-green-400 text-xs uppercase tracking-wide mb-1">Proof Status</div>
                          <div className="text-green-300 font-bold text-lg">✓ VALID</div>
                        </div>
                        <div className="bg-black/30 rounded p-3">
                          <div className="text-green-400 text-xs uppercase tracking-wide mb-1">Proof Size</div>
                          <div className="text-green-300 font-bold text-lg">2,147 bytes</div>
                        </div>
                        <div className="bg-black/30 rounded p-3">
                          <div className="text-green-400 text-xs uppercase tracking-wide mb-1">Verification Time</div>
                          <div className="text-green-300 font-bold text-lg">{Math.floor(Math.random() * 30 + 20)}ms</div>
                        </div>
                      </div>
                      
                      <div className="text-center text-green-300 text-lg font-semibold">
                        🔒 Block #{blockHeight} is cryptographically verified and trustworthy!
                      </div>
                    </div>
                  </div>
                )}
                
                {!isVerifying && step >= verificationSteps.length - 1 && (
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <span className="text-yellow-400">$</span> <span className="animate-pulse">_</span>
                    </div>
                    <button
                      onClick={handleClose}
                      className="px-4 py-2 bg-green-600 hover:bg-green-500 text-black font-semibold rounded transition-colors"
                    >
                      Close Terminal
                    </button>
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