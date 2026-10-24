/**
 * x402 Protocol Client Library
 * 
 * Implements the x402 HTTP 402 Payment Required flow:
 * 1. Client sends request to protected endpoint
 * 2. Server responds with HTTP 402 + payment requirements in headers
 * 3. Client signs a blockchain payment transaction  
 * 4. Client retries with PAYMENT-SIGNATURE header
 * 5. Server verifies payment, settles on-chain, returns data
 */

import { PaymentHeader, X402Response, SupportedNetwork } from "@/types";
import { FACILITATOR_URL, USDC_ADDRESSES, NETWORKS } from "./data";

// Parse x402 payment requirements from HTTP 402 response headers
export function parsePaymentRequirements(headers: Record<string, string>): PaymentHeader | null {
  const paymentRequired = headers["x-payment"] || headers["payment-required"];
  if (!paymentRequired) return null;

  try {
    return JSON.parse(paymentRequired) as PaymentHeader;
  } catch {
    return null;
  }
}

// Build the payment authorization header after signing
export function buildPaymentHeader(
  signature: string,
  paymentPayload: object
): Record<string, string> {
  return {
    "X-PAYMENT": JSON.stringify({
      ...paymentPayload,
      signature,
    }),
  };
}

// Simulate the full x402 payment flow
export async function simulateX402Flow(
  endpointUrl: string,
  price: string,
  providerAddress: string,
  network: SupportedNetwork
): Promise<X402Response> {
  // Step 1: Initial request - would normally hit the real endpoint
  console.log(`[x402] → GET ${endpointUrl}`);

  // Step 2: Simulate receiving HTTP 402 with payment requirements
  const paymentRequirements: PaymentHeader = {
    scheme: "exact",
    price: price,
    network: network === "base-sepolia" ? "eip155:84532" : "eip155:8453",
    payTo: providerAddress,
    asset: USDC_ADDRESSES[network] || USDC_ADDRESSES["base-sepolia"],
  };

  console.log(`[x402] ← 402 Payment Required`, paymentRequirements);

  // Step 3: Simulate wallet signing
  await new Promise((resolve) => setTimeout(resolve, 800));
  const mockSignature = `0x${Array.from({ length: 130 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("")}`;

  console.log(`[x402] ✍️ Signed payment: ${mockSignature.slice(0, 20)}...`);

  // Step 4: Retry with payment header
  const paymentHeaders = buildPaymentHeader(mockSignature, paymentRequirements);
  console.log(`[x402] → GET ${endpointUrl} [with X-PAYMENT header]`);

  // Step 5: Simulate server verification and response
  await new Promise((resolve) => setTimeout(resolve, 600));

  const mockTxHash = `0x${Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("")}`;

  console.log(`[x402] ← 200 OK | Payment settled: ${mockTxHash.slice(0, 20)}...`);

  return {
    status: 200,
    headers: {
      "X-PAYMENT-RESPONSE": JSON.stringify({
        success: true,
        txHash: mockTxHash,
        settledAmount: price,
        network: paymentRequirements.network,
      }),
      ...paymentHeaders,
    },
    data: {
      message: "Payment verified! Here is your data.",
      timestamp: Date.now(),
    },
    paymentTx: mockTxHash,
  };
}

// Generate code snippet for using x402 with an API
export function generateClientCode(
  apiName: string,
  endpoint: string,
  price: string,
  providerAddress: string,
  network: string
): string {
  return `import { wrapFetchWithPaymentFromConfig } from "@x402/fetch";
import { ExactEvmScheme } from "@x402/evm";
import { privateKeyToAccount } from "viem/accounts";

// Initialize wallet
const account = privateKeyToAccount(process.env.PRIVATE_KEY);

// Wrap fetch with x402 payment handling
const fetchWithPayment = wrapFetchWithPaymentFromConfig(fetch, {
  schemes: [{
    network: "${network === "base-sepolia" ? "eip155:84532" : "eip155:8453"}",
    client: new ExactEvmScheme(account),
  }],
});

// Call ${apiName} — payment happens automatically!
const response = await fetchWithPayment(
  "https://nexus.x402.org${endpoint}",
  { method: "POST", body: JSON.stringify({ input: "your data" }) }
);

// If server returns 402, the wrapper:
// 1. Parses payment requirements (${price} USDC → ${providerAddress.slice(0, 10)}...)
// 2. Signs the USDC transfer
// 3. Retries with X-PAYMENT header
// 4. Returns the final response

const data = await response.json();
console.log("Result:", data);`;
}

// Generate server middleware code
export function generateServerCode(
  apiName: string,
  endpoint: string,
  price: string,
  providerAddress: string
): string {
  return `import express from "express";
import { paymentMiddlewareFromConfig } from "@x402/express";

const app = express();

// x402 payment middleware configuration
const protectWithX402 = paymentMiddlewareFromConfig({
  facilitatorClient: new HTTPFacilitatorClient({
    url: "${FACILITATOR_URL}",
  }),
  routes: {
    "${endpoint}": {
      accepts: {
        scheme: "exact",
        price: "${price}",
        network: "eip155:84532",
        payTo: "${providerAddress}",
      },
      description: "${apiName} — Pay-per-call API",
    },
  },
});

// Protected endpoint
app.use("${endpoint}", protectWithX402);

app.post("${endpoint}", (req, res) => {
  // Payment verified by middleware!
  // Process the request and return data
  res.json({
    result: "...",
    paymentVerified: true,
  });
});`;
}

// Facilitator URL getter
export function getFacilitatorUrl(): string {
  return FACILITATOR_URL;
}

// Network chain ID mapping for x402
export function getChainIdentifier(network: SupportedNetwork): string {
  const map: Record<SupportedNetwork, string> = {
    "base-sepolia": "eip155:84532",
    "base-mainnet": "eip155:8453",
    "solana-devnet": "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
  };
  return map[network];
}
