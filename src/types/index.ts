// x402 Nexus - Type Definitions
export interface ApiEndpoint {
  id: string;
  name: string;
  description: string;
  category: ApiCategory;
  provider: string;
  providerAddress: string;
  price: string; // USD price per call e.g. "0.001"
  network: SupportedNetwork;
  endpoint: string;
  method: "GET" | "POST";
  status: "live" | "maintenance" | "deprecated";
  badge?: "popular" | "new" | "trending";
  totalCalls: number;
  avgLatency: number; // ms
  successRate: number; // percentage
  rating: number; // 1-5
  icon: string;
  sampleResponse: string;
  createdAt: string;
}

export type ApiCategory =
  | "ai-inference"
  | "data-feeds"
  | "compute"
  | "storage"
  | "blockchain"
  | "media";

export type SupportedNetwork = "base-sepolia" | "base-mainnet" | "solana-devnet";

export interface Transaction {
  id: string;
  apiId: string;
  apiName: string;
  caller: string;
  provider: string;
  amount: string;
  network: SupportedNetwork;
  status: "confirmed" | "pending" | "failed";
  timestamp: number;
  txHash: string;
  blockNumber?: number;
}

export interface WalletState {
  connected: boolean;
  address: string | null;
  balance: string;
  network: SupportedNetwork;
}

export interface UsageStats {
  totalCalls: number;
  totalSpent: string;
  avgCostPerCall: string;
  favoriteApi: string;
  callsToday: number;
  callsThisWeek: number;
  callsThisMonth: number;
}

export interface NetworkInfo {
  id: SupportedNetwork;
  name: string;
  chainId: number;
  currency: string;
  explorerUrl: string;
  color: string;
}

export interface PaymentHeader {
  scheme: "exact";
  price: string;
  network: string;
  payTo: string;
  asset: string;
}

export interface X402Response {
  status: number;
  headers: Record<string, string>;
  data: unknown;
  paymentTx?: string;
}
