import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bitcoin Block Header Verification | STARK Proof Validation",
  description: "Verify Bitcoin block header inclusion in the canonical chain using STARK proofs. Trustless block validation with cryptographic guarantees. Detect forks and orphaned blocks.",
  keywords: [
    "Bitcoin block verification",
    "block header verification",
    "Bitcoin block validator",
    "STARK proof block validation",
    "canonical chain verification",
    "Bitcoin fork detection",
    "orphaned block detection",
    "trustless block verification",
    "zero-knowledge block proof"
  ],
  openGraph: {
    title: "Bitcoin Block Header Verification | Raito STARK Portal",
    description: "Verify Bitcoin block header inclusion using STARK proofs. Trustless block validation.",
    url: "https://raito.wtf/block-check",
  },
  twitter: {
    title: "Bitcoin Block Header Verification | Raito STARK Portal", 
    description: "Verify Bitcoin block header inclusion using STARK proofs. Trustless block validation.",
  },
  alternates: {
    canonical: "https://raito.wtf/block-check",
  },
}

export default function BlockCheckLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 