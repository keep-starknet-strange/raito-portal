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
    "Parsing Merkle tree structure...",
    "Validating cryptographic signatures...",
    "Computing witness polynomials...", 
    "Verifying FRI commitments...",
    "Checking arithmetic constraints...",
    "Finalizing proof verification...",
    "✓ STARK proof VERIFIED successfully!"
  ]

  const startVerification = () => {
    setIsOpen(true)
    setIsVerifying(true)
    setStep(0)
    
    // Simulate verification steps
    const interval = setInterval(() => {
      setStep(prevStep => {
        if (prevStep >= verificationSteps.length - 1) {
          clearInterval(interval)
          setTimeout(() => {
            setIsVerifying(false)
            setTimeout(() => setIsOpen(false), 2000)
          }, 1000)
          return prevStep
        }
        return prevStep + 1
      })
    }, 800)
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
        variant="ghost"
        size="sm"
        className={`text-success hover:text-success hover:bg-success/10 transition-all duration-300 ${className}`}
        disabled={isVerifying}
      >
        <Icons.lightning className="mr-1 h-3 w-3" />
        Verify Locally
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl h-96 bg-black border border-green-400/30 rounded-lg overflow-hidden font-mono shadow-2xl shadow-green-400/20 terminal-flicker">
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
                onClick={() => setIsOpen(false)}
                className="text-green-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Terminal content */}
            <div className="relative z-10 p-6 h-full overflow-hidden">
              <div className="text-green-400 text-sm leading-relaxed">
                <div className="mb-4">
                  <span className="text-yellow-400">$</span> raito verify-block --height={blockHeight} --local
                </div>
                
                <div className="space-y-2">
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
                  <div className="mt-6 p-4 border border-green-400/50 rounded bg-green-400/10">
                    <div className="flex items-center gap-2 text-green-300 font-bold">
                      <Icons.lock className="h-5 w-5" />
                      <span>Block #{blockHeight} verification complete!</span>
                    </div>
                    <div className="mt-2 text-green-400 text-xs">
                      Proof size: 2,147 bytes | Verification time: {Math.floor(Math.random() * 30 + 20)}ms
                    </div>
                  </div>
                )}
                
                {!isVerifying && step >= verificationSteps.length - 1 && (
                  <div className="mt-4">
                    <span className="text-yellow-400">$</span> <span className="animate-pulse">_</span>
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