import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "x402 Nexus — AI Agent API Marketplace",
  description:
    "Discover, call, and pay for AI-powered APIs instantly using USDC on Base. No API keys, no subscriptions — just HTTP 402.",
  keywords: ["x402", "API marketplace", "blockchain", "USDC", "Base", "AI agents", "micropayments"],
  openGraph: {
    title: "x402 Nexus — Pay-Per-Call API Marketplace",
    description: "The AI Agent API Marketplace powered by the x402 payment protocol.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
