import { NextRequest, NextResponse } from "next/server";
import { SAMPLE_APIS } from "@/lib/data";

/**
 * POST /api/call/[id]
 * 
 * Simulates calling a paid API endpoint using the x402 protocol.
 * 
 * Real x402 flow:
 * 1. Client hits this endpoint
 * 2. Server checks for X-PAYMENT header
 * 3. If missing → return 402 with payment requirements
 * 4. If present → verify with facilitator → settle on-chain → return data
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const api = SAMPLE_APIS.find((a) => a.id === id);

  if (!api) {
    return NextResponse.json(
      { error: "API endpoint not found" },
      { status: 404 }
    );
  }

  // Check for x402 payment header
  const paymentHeader = request.headers.get("x-payment");

  if (!paymentHeader) {
    // Return HTTP 402 Payment Required with payment specifications
    // This is the core of the x402 protocol!
    return NextResponse.json(
      {
        error: "Payment Required",
        message: `This endpoint requires a payment of ${api.price} USDC to access.`,
        protocol: "x402/v2",
        paymentRequirements: {
          scheme: "exact",
          price: api.price,
          currency: "USDC",
          network: "eip155:84532", // Base Sepolia
          payTo: api.providerAddress,
          facilitator: "https://x402.org/facilitator",
          description: api.name,
        },
      },
      {
        status: 402,
        headers: {
          "X-PAYMENT": JSON.stringify({
            scheme: "exact",
            price: api.price,
            network: "eip155:84532",
            payTo: api.providerAddress,
            asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
          }),
        },
      }
    );
  }

  // Simulate payment verification via facilitator
  // In production: HTTPFacilitatorClient.verify(paymentHeader)
  let paymentData;
  try {
    paymentData = JSON.parse(paymentHeader);
  } catch {
    return NextResponse.json(
      { error: "Invalid payment header format" },
      { status: 400 }
    );
  }

  // Simulate verification delay (facilitator would verify on-chain)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Generate mock transaction hash
  const txHash = `0x${Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("")}`;

  // Return the API response with payment confirmation
  return NextResponse.json(
    {
      success: true,
      apiId: api.id,
      apiName: api.name,
      data: {
        message: `Response from ${api.name}`,
        result: JSON.parse(api.sampleResponse),
        timestamp: Date.now(),
      },
      payment: {
        verified: true,
        txHash,
        amount: api.price,
        currency: "USDC",
        network: "Base Sepolia",
        settledAt: new Date().toISOString(),
      },
    },
    {
      headers: {
        "X-PAYMENT-RESPONSE": JSON.stringify({
          success: true,
          txHash,
          settledAmount: api.price,
        }),
      },
    }
  );
}

/**
 * GET /api/call/[id]
 * Returns endpoint details and pricing information
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const api = SAMPLE_APIS.find((a) => a.id === id);

  if (!api) {
    return NextResponse.json(
      { error: "API endpoint not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ...api,
    x402Config: {
      scheme: "exact",
      price: api.price,
      currency: "USDC",
      network: "eip155:84532",
      payTo: api.providerAddress,
      facilitator: "https://x402.org/facilitator",
    },
  });
}
