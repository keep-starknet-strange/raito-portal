"use client"

interface HashFlickerProps {
  hash: string
  className?: string
  truncate?: { start: number; end: number }
}

export function HashFlicker({ hash, className = "", truncate }: HashFlickerProps) {
  const displayHash = truncate 
    ? `${hash.slice(0, truncate.start)}...${hash.slice(-truncate.end)}`
    : hash

  const renderChar = (char: string, index: number) => {
    if (char === '.' || char === ' ') {
      return <span key={index}>{char}</span>
    }
    
    return (
      <span 
        key={index}
        className="inline-block"
        style={{ '--char-index': index } as React.CSSProperties}
      >
        {char}
      </span>
    )
  }

  return (
    <span className={`hash-flicker font-mono ${className}`}>
      <span className="hash-chars">
        {displayHash.split('').map(renderChar)}
      </span>
    </span>
  )
} 