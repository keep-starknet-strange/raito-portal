import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bitcoin Block Explorer | STARK Verified Blockchain Browser",
  description: "Browse recent Bitcoin blocks with STARK proof verification. Explore block headers, transactions, and fees with instant trustless validation. The future of Bitcoin light clients.",
  keywords: [
    "Bitcoin block explorer",
    "STARK verified blocks",
    "Bitcoin blockchain browser",
    "trustless block explorer",
    "Bitcoin light client",
    "zero-knowledge blockchain explorer",
    "Bitcoin block browser",
    "verified Bitcoin blocks",
    "STARK proof explorer"
  ],
  openGraph: {
    title: "Bitcoin Block Explorer | Raito STARK Portal",
    description: "Browse recent Bitcoin blocks with STARK proof verification. Trustless blockchain exploration.",
    url: "https://raito.wtf/explorer",
  },
  twitter: {
    title: "Bitcoin Block Explorer | Raito STARK Portal",
    description: "Browse recent Bitcoin blocks with STARK proof verification. Trustless blockchain exploration.",
  },
  alternates: {
    canonical: "https://raito.wtf/explorer",
  },
}

export default function ExplorerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 