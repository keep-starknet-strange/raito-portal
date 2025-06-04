import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Developer Tools & APIs | Raito Bitcoin STARK SDK",
  description: "Build on Raito's Bitcoin STARK verification infrastructure. APIs, SDKs, and tools for integrating trustless Bitcoin verification into your applications. Open source and developer-friendly.",
  keywords: [
    "Bitcoin STARK API",
    "Bitcoin verification SDK",
    "STARK proof API",
    "Bitcoin developer tools",
    "trustless Bitcoin API",
    "zero-knowledge Bitcoin SDK",
    "Bitcoin light client API",
    "blockchain verification tools",
    "Bitcoin STARK integration"
  ],
  openGraph: {
    title: "Developer Tools & APIs | Raito Bitcoin STARK SDK",
    description: "Build on Raito's Bitcoin STARK verification infrastructure. APIs and tools for developers.",
    url: "https://raito.wtf/developers",
  },
  twitter: {
    title: "Developer Tools & APIs | Raito Bitcoin STARK SDK",
    description: "Build on Raito's Bitcoin STARK verification infrastructure. APIs and tools for developers.",
  },
  alternates: {
    canonical: "https://raito.wtf/developers",
  },
}

export default function DevelopersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 