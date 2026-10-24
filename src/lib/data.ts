import { ApiEndpoint, Transaction, NetworkInfo } from "@/types";

// Supported Networks
export const NETWORKS: Record<string, NetworkInfo> = {
  "base-sepolia": {
    id: "base-sepolia",
    name: "Base Sepolia",
    chainId: 84532,
    currency: "USDC",
    explorerUrl: "https://sepolia.basescan.org",
    color: "#0052FF",
  },
  "base-mainnet": {
    id: "base-mainnet",
    name: "Base",
    chainId: 8453,
    currency: "USDC",
    explorerUrl: "https://basescan.org",
    color: "#0052FF",
  },
  "solana-devnet": {
    id: "solana-devnet",
    name: "Solana Devnet",
    chainId: 0,
    currency: "USDC",
    explorerUrl: "https://explorer.solana.com",
    color: "#9945FF",
  },
};

// x402 Facilitator URL (testnet)
export const FACILITATOR_URL = "https://x402.org/facilitator";

// USDC Contract Addresses
export const USDC_ADDRESSES: Record<string, string> = {
  "base-sepolia": "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  "base-mainnet": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
};

// Categories with metadata
export const CATEGORIES = [
  {
    id: "ai-inference",
    name: "AI Inference",
    icon: "🧠",
    description: "Machine learning models & AI services",
    color: "#8b5cf6",
  },
  {
    id: "data-feeds",
    name: "Data Feeds",
    icon: "📊",
    description: "Real-time market & analytics data",
    color: "#06d6f2",
  },
  {
    id: "compute",
    name: "Compute",
    icon: "⚡",
    description: "GPU clusters & serverless compute",
    color: "#f59e0b",
  },
  {
    id: "storage",
    name: "Storage",
    icon: "💾",
    description: "Decentralized file & data storage",
    color: "#10b981",
  },
  {
    id: "blockchain",
    name: "Blockchain",
    icon: "🔗",
    description: "On-chain data & indexing services",
    color: "#3b82f6",
  },
  {
    id: "media",
    name: "Media",
    icon: "🎨",
    description: "Image, video & audio processing",
    color: "#f43f5e",
  },
] as const;

// Sample API Endpoints
export const SAMPLE_APIS: ApiEndpoint[] = [
  {
    id: "api-001",
    name: "GPT Sentiment Analyzer",
    description:
      "Advanced NLP sentiment analysis powered by fine-tuned transformer models. Supports 40+ languages with confidence scoring.",
    category: "ai-inference",
    provider: "NeuralLabs",
    providerAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18",
    price: "0.005",
    network: "base-sepolia",
    endpoint: "/api/v1/sentiment",
    method: "POST",
    status: "live",
    badge: "popular",
    totalCalls: 284750,
    avgLatency: 120,
    successRate: 99.7,
    rating: 4.9,
    icon: "🧠",
    sampleResponse: '{"sentiment": "positive", "confidence": 0.94, "aspects": [...]}',
    createdAt: "2024-08-15",
  },
  {
    id: "api-002",
    name: "Real-Time Crypto Oracle",
    description:
      "Sub-second cryptocurrency price feeds aggregated from 50+ CEX/DEX sources with TWAP and VWAP calculations.",
    category: "data-feeds",
    provider: "DataStream",
    providerAddress: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    price: "0.001",
    network: "base-sepolia",
    endpoint: "/api/v1/prices",
    method: "GET",
    status: "live",
    badge: "popular",
    totalCalls: 1250000,
    avgLatency: 45,
    successRate: 99.95,
    rating: 4.8,
    icon: "📊",
    sampleResponse: '{"BTC": {"price": 67423.50, "24h_change": 2.3}, ...}',
    createdAt: "2024-06-01",
  },
  {
    id: "api-003",
    name: "GPU Inference Cluster",
    description:
      "On-demand A100 GPU compute for ML model inference. Pay per millisecond of compute time with auto-scaling.",
    category: "compute",
    provider: "CloudForge",
    providerAddress: "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
    price: "0.05",
    network: "base-sepolia",
    endpoint: "/api/v1/compute",
    method: "POST",
    status: "live",
    totalCalls: 45200,
    avgLatency: 2500,
    successRate: 99.2,
    rating: 4.6,
    icon: "⚡",
    sampleResponse: '{"result": {...}, "compute_ms": 1240, "gpu": "A100-80GB"}',
    createdAt: "2024-09-20",
  },
  {
    id: "api-004",
    name: "IPFS Pin & Retrieve",
    description:
      "Pin files to IPFS with guaranteed persistence. CID-based retrieval with CDN-backed gateway for instant access.",
    category: "storage",
    provider: "PinGuard",
    providerAddress: "0xDE0B295669a9FD93d5F28D9Ec85E40f4cb697BAe",
    price: "0.002",
    network: "base-sepolia",
    endpoint: "/api/v1/pin",
    method: "POST",
    status: "live",
    badge: "new",
    totalCalls: 78400,
    avgLatency: 800,
    successRate: 99.5,
    rating: 4.7,
    icon: "💾",
    sampleResponse: '{"cid": "Qm...", "size": 1024, "gateway_url": "https://..."}',
    createdAt: "2024-11-01",
  },
  {
    id: "api-005",
    name: "EVM Transaction Decoder",
    description:
      "Decode and analyze EVM transactions including internal calls, event logs, and gas profiling across 15+ chains.",
    category: "blockchain",
    provider: "ChainScope",
    providerAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    price: "0.003",
    network: "base-sepolia",
    endpoint: "/api/v1/decode",
    method: "POST",
    status: "live",
    totalCalls: 156300,
    avgLatency: 200,
    successRate: 99.8,
    rating: 4.8,
    icon: "🔗",
    sampleResponse: '{"decoded": {...}, "events": [...], "gas_profile": {...}}',
    createdAt: "2024-07-10",
  },
  {
    id: "api-006",
    name: "AI Image Upscaler 4x",
    description:
      "Neural network-powered image upscaling with 4x resolution enhancement. Supports JPEG, PNG, WebP up to 10MB.",
    category: "media",
    provider: "PixelForge AI",
    providerAddress: "0xAb5801a7D398351b8bE11C439e05C5b3259aEC9B",
    price: "0.01",
    network: "base-sepolia",
    endpoint: "/api/v1/upscale",
    method: "POST",
    status: "live",
    badge: "trending" as ApiEndpoint["badge"],
    totalCalls: 92100,
    avgLatency: 3200,
    successRate: 98.9,
    rating: 4.5,
    icon: "🎨",
    sampleResponse: '{"url": "https://...", "original_size": "512x512", "upscaled_size": "2048x2048"}',
    createdAt: "2024-10-05",
  },
  {
    id: "api-007",
    name: "Code Review Agent",
    description:
      "AI-powered code review with security vulnerability detection, performance optimization suggestions, and style analysis.",
    category: "ai-inference",
    provider: "DevForge AI",
    providerAddress: "0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB",
    price: "0.008",
    network: "base-sepolia",
    endpoint: "/api/v1/review",
    method: "POST",
    status: "live",
    badge: "new",
    totalCalls: 34500,
    avgLatency: 4500,
    successRate: 99.1,
    rating: 4.7,
    icon: "🤖",
    sampleResponse: '{"issues": [...], "score": 87, "suggestions": [...]}',
    createdAt: "2024-11-15",
  },
  {
    id: "api-008",
    name: "Multi-Chain Gas Tracker",
    description:
      "Real-time gas prices and fee estimates across 20+ EVM chains with historical trends and prediction models.",
    category: "data-feeds",
    provider: "GasWatch",
    providerAddress: "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
    price: "0.0005",
    network: "base-sepolia",
    endpoint: "/api/v1/gas",
    method: "GET",
    status: "live",
    totalCalls: 2100000,
    avgLatency: 30,
    successRate: 99.99,
    rating: 4.9,
    icon: "⛽",
    sampleResponse: '{"ethereum": {"fast": 25, "standard": 18, "slow": 12}, ...}',
    createdAt: "2024-05-20",
  },
  {
    id: "api-009",
    name: "Text-to-Speech Neural",
    description:
      "Ultra-realistic text-to-speech with 200+ voices, emotional expression control, and SSML support. 30+ languages.",
    category: "media",
    provider: "VocalAI",
    providerAddress: "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
    price: "0.004",
    network: "base-sepolia",
    endpoint: "/api/v1/tts",
    method: "POST",
    status: "live",
    totalCalls: 189000,
    avgLatency: 1800,
    successRate: 99.4,
    rating: 4.6,
    icon: "🗣️",
    sampleResponse: '{"audio_url": "https://...", "duration_ms": 4200, "format": "mp3"}',
    createdAt: "2024-08-01",
  },
];

// Generate mock transactions
export function generateMockTransactions(count: number): Transaction[] {
  const txs: Transaction[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const api = SAMPLE_APIS[Math.floor(Math.random() * SAMPLE_APIS.length)];
    txs.push({
      id: `tx-${i}-${Math.random().toString(36).substr(2, 9)}`,
      apiId: api.id,
      apiName: api.name,
      caller: `0x${Math.random().toString(16).substr(2, 40)}`,
      provider: api.providerAddress,
      amount: api.price,
      network: api.network,
      status: Math.random() > 0.05 ? "confirmed" : "pending",
      timestamp: now - Math.floor(Math.random() * 86400000),
      txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      blockNumber: 10000000 + Math.floor(Math.random() * 1000000),
    });
  }

  return txs.sort((a, b) => b.timestamp - a.timestamp);
}

// Format helpers
export function formatAddress(addr: string): string {
  if (!addr || addr.length < 10) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function formatUSD(amount: string | number): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (num < 0.01) return `$${num.toFixed(4)}`;
  if (num < 1) return `$${num.toFixed(3)}`;
  return `$${num.toFixed(2)}`;
}

export function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

// Chart data generators
export function generateUsageChartData(days: number = 7) {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString("en-US", { weekday: "short" }),
      calls: Math.floor(Math.random() * 5000) + 1000,
      revenue: parseFloat((Math.random() * 50 + 10).toFixed(2)),
    });
  }
  return data;
}

export function generateCategoryDistribution() {
  return CATEGORIES.map((cat) => ({
    name: cat.name,
    value: Math.floor(Math.random() * 40) + 10,
    color: cat.color,
  }));
}
