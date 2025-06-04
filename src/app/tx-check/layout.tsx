import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bitcoin Transaction Verification | STARK Proof Inclusion Check",
  description: "Verify Bitcoin transaction inclusion in the blockchain using STARK proofs. Instant, trustless verification of transaction IDs with cryptographic guarantees. Don't trust, verify.",
  keywords: [
    "Bitcoin transaction verification",
    "TXID verification", 
    "transaction inclusion proof",
    "STARK proof verification",
    "Bitcoin blockchain verification",
    "trustless transaction check",
    "zero-knowledge transaction proof",
    "Bitcoin transaction validator"
  ],
  openGraph: {
    title: "Bitcoin Transaction Verification | Raito STARK Portal",
    description: "Verify Bitcoin transaction inclusion using STARK proofs. Instant, trustless verification.",
    url: "https://raito.wtf/tx-check",
  },
  twitter: {
    title: "Bitcoin Transaction Verification | Raito STARK Portal",
    description: "Verify Bitcoin transaction inclusion using STARK proofs. Instant, trustless verification.",
  },
  alternates: {
    canonical: "https://raito.wtf/tx-check",
  },
}

export default function TxCheckLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 