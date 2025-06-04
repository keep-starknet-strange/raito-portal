import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Raito - Bitcoin STARK Verification Portal",
  description: "Don't trust, verify — with STARK proofs. Explore Bitcoin blocks with instant, trustless verification using zero-knowledge proofs.",
  keywords: ["Bitcoin", "STARK", "zero-knowledge", "proof", "verification", "blockchain", "trustless"],
  authors: [{ name: "Raito Team" }],
  creator: "Raito Team",
  publisher: "Raito Team",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raito.wtf",
    title: "Raito - Bitcoin STARK Verification Portal",
    description: "Don't trust, verify — with STARK proofs. Explore Bitcoin blocks with instant, trustless verification.",
    siteName: "Raito",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raito - Bitcoin STARK Verification Portal",
    description: "Don't trust, verify — with STARK proofs. Explore Bitcoin blocks with instant, trustless verification.",
    creator: "@RaitoTeam",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0D0D" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider defaultTheme="dark" storageKey="raito-theme">
          <div className="min-h-screen bg-background text-foreground theme-transition">
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
