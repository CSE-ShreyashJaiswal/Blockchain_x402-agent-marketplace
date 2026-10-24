"use client";

import { useState, useEffect, useCallback } from "react";
import { ApiEndpoint, Transaction } from "@/types";
import {
  SAMPLE_APIS,
  CATEGORIES,
  generateMockTransactions,
  formatAddress,
  formatNumber,
  formatUSD,
  timeAgo,
  generateUsageChartData,
} from "@/lib/data";
import {
  simulateX402Flow,
  generateClientCode,
  generateServerCode,
} from "@/lib/x402-client";

// ─── Navbar ────────────────────────────────────────────────
function Navbar() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = () => {
    const mockAddr = `0x${Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("")}`;
    setWalletAddress(mockAddr);
    setWalletConnected(true);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{
      background: "rgba(10, 14, 26, 0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(148, 163, 184, 0.08)",
    }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "linear-gradient(135deg, #06d6f2, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "1.1rem",
          }}>
            N
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              <span className="gradient-text">x402</span>{" "}
              <span className="text-white">Nexus</span>
            </h1>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              AI Agent API Marketplace
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            <a href="#marketplace" className="hover:text-white transition-colors">Marketplace</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#analytics" className="hover:text-white transition-colors">Analytics</a>
            <a href="#docs" className="hover:text-white transition-colors">Docs</a>
          </div>

          {walletConnected ? (
            <div className="flex items-center gap-3">
              <div className="badge badge-live">
                <span className="pulse-dot"></span>
                Base Sepolia
              </div>
              <button className="btn-secondary flex items-center gap-2" style={{ padding: "8px 16px" }}>
                <span className="network-dot network-base"></span>
                {formatAddress(walletAddress)}
              </button>
            </div>
          ) : (
            <button className="btn-glow" onClick={connectWallet} style={{ padding: "10px 24px", fontSize: "0.85rem" }}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

// ─── Hero Section ──────────────────────────────────────────
function HeroSection() {
  const [totalVolume, setTotalVolume] = useState(0);
  const [totalApis, setTotalApis] = useState(0);
  const [totalTxns, setTotalTxns] = useState(0);

  useEffect(() => {
    // Animate counters
    const duration = 2000;
    const steps = 60;
    const targets = { volume: 847250, apis: SAMPLE_APIS.length, txns: 4520000 };
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setTotalVolume(Math.floor(targets.volume * eased));
      setTotalApis(Math.floor(targets.apis * eased));
      setTotalTxns(Math.floor(targets.txns * eased));

      if (step >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-16 px-6">
      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.8}s`,
            background: i % 2 === 0 ? "var(--color-accent-cyan)" : "var(--color-accent-violet)",
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="badge badge-new inline-flex mb-6" style={{ padding: "6px 16px" }}>
          ⚡ Powered by HTTP 402 Protocol
        </div>

        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
          <span className="gradient-text">Pay-Per-Call</span>
          <br />
          <span className="text-white">API Marketplace</span>
        </h2>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10" style={{ color: "var(--color-text-secondary)" }}>
          Discover, call, and pay for AI-powered APIs instantly using{" "}
          <span className="text-white font-semibold">USDC</span> on{" "}
          <span className="text-white font-semibold">Base</span>.
          No API keys. No subscriptions. Just HTTP.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a href="#marketplace" className="btn-glow">
            Explore APIs →
          </a>
          <a href="#how-it-works" className="btn-secondary">
            How x402 Works
          </a>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { label: "Total Volume", value: formatUSD(totalVolume), icon: "💰" },
            { label: "Live APIs", value: totalApis.toString(), icon: "🔌" },
            { label: "Total Transactions", value: formatNumber(totalTxns), icon: "⛓️" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-5 text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="stat-value text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How it Works Section ──────────────────────────────────
function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Client Requests API",
      description: "Your app or AI agent sends a standard HTTP request to any x402-protected endpoint.",
      code: 'fetch("https://api.nexus.x402/sentiment")',
      color: "var(--color-accent-cyan)",
      icon: "📡",
    },
    {
      num: "02",
      title: "Server Returns 402",
      description: "The server responds with HTTP 402 Payment Required, including price & wallet in headers.",
      code: '← 402 { price: "$0.005", payTo: "0x..." }',
      color: "var(--color-accent-blue)",
      icon: "💳",
    },
    {
      num: "03",
      title: "Auto-Sign & Pay",
      description: "The x402 client wrapper signs a USDC transaction and retries the request automatically.",
      code: '→ GET /sentiment + X-PAYMENT: { sig: "0x..." }',
      color: "var(--color-accent-violet)",
      icon: "✍️",
    },
    {
      num: "04",
      title: "Verified & Delivered",
      description: "Payment settles on-chain via the facilitator. You receive the API response instantly.",
      code: '← 200 { sentiment: "positive", conf: 0.94 }',
      color: "var(--color-accent-emerald)",
      icon: "✅",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How <span className="gradient-text">x402</span> Works
          </h3>
          <p style={{ color: "var(--color-text-secondary)" }} className="max-w-lg mx-auto">
            The x402 protocol turns HTTP into a payment rail. Four steps, sub-second settlement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="glass-card p-6 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 text-6xl font-black opacity-5"
                style={{ color: step.color, lineHeight: 1 }}
              >
                {step.num}
              </div>
              <div className="text-3xl mb-4">{step.icon}</div>
              <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
              <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
                {step.description}
              </p>
              <div
                className="text-xs font-mono px-3 py-2 rounded-lg"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  color: step.color,
                  border: `1px solid ${step.color}22`,
                }}
              >
                {step.code}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── API Card Component ────────────────────────────────────
function ApiCard({
  api,
  onSelect,
}: {
  api: ApiEndpoint;
  onSelect: (api: ApiEndpoint) => void;
}) {
  const category = CATEGORIES.find((c) => c.id === api.category);

  return (
    <div className="glass-card p-6 cursor-pointer" onClick={() => onSelect(api)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="text-2xl w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${category?.color}15`, border: `1px solid ${category?.color}30` }}
          >
            {api.icon}
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">{api.name}</h4>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              by {api.provider}
            </p>
          </div>
        </div>
        {api.badge && (
          <span className={`badge badge-${api.badge === "trending" ? "popular" : api.badge}`}>
            <span className="pulse-dot"></span>
            {api.badge}
          </span>
        )}
      </div>

      <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--color-text-secondary)" }}>
        {api.description.length > 120
          ? api.description.slice(0, 120) + "..."
          : api.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <span className="network-dot network-base"></span>
          <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Base Sepolia</span>
        </div>
        <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          ⭐ {api.rating} · {formatNumber(api.totalCalls)} calls
        </div>
      </div>

      <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(148,163,184,0.08)" }}>
        <div>
          <span className="text-xl font-bold gradient-text">{formatUSD(api.price)}</span>
          <span className="text-xs ml-1" style={{ color: "var(--color-text-muted)" }}>/call</span>
        </div>
        <div className="flex items-center gap-3 text-xs" style={{ color: "var(--color-text-muted)" }}>
          <span>⚡ {api.avgLatency}ms</span>
          <span>✓ {api.successRate}%</span>
        </div>
      </div>
    </div>
  );
}

// ─── API Detail Modal ──────────────────────────────────────
function ApiDetailModal({
  api,
  onClose,
}: {
  api: ApiEndpoint;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "client" | "server" | "test">("overview");
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  const [flowSteps, setFlowSteps] = useState<string[]>([]);

  const category = CATEGORIES.find((c) => c.id === api.category);

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    setFlowSteps([]);

    // Capture console logs
    const origLog = console.log;
    const logs: string[] = [];
    console.log = (...args: unknown[]) => {
      const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
      logs.push(msg);
      setFlowSteps([...logs]);
      origLog(...args);
    };

    try {
      const result = await simulateX402Flow(
        api.endpoint,
        api.price,
        api.providerAddress,
        api.network
      );
      setTestResult(JSON.stringify(result, null, 2));
    } catch (err) {
      setTestResult(`Error: ${err}`);
    } finally {
      console.log = origLog;
      setTesting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="glass-card w-full max-w-3xl max-h-[85vh] overflow-y-auto"
        style={{ background: "rgba(17, 24, 39, 0.95)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 flex items-start justify-between" style={{ borderBottom: "1px solid rgba(148,163,184,0.1)" }}>
          <div className="flex items-center gap-4">
            <div
              className="text-3xl w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: `${category?.color}15`, border: `1px solid ${category?.color}30` }}
            >
              {api.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{api.name}</h3>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                by {api.provider} · {category?.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-2xl hover:text-white transition-colors"
            style={{ color: "var(--color-text-muted)" }}
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4" style={{ borderBottom: "1px solid rgba(148,163,184,0.08)" }}>
          {(["overview", "client", "server", "test"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 text-sm font-medium rounded-t-lg transition-colors capitalize"
              style={{
                background: activeTab === tab ? "rgba(6, 214, 242, 0.1)" : "transparent",
                color: activeTab === tab ? "var(--color-accent-cyan)" : "var(--color-text-muted)",
                borderBottom: activeTab === tab ? "2px solid var(--color-accent-cyan)" : "2px solid transparent",
              }}
            >
              {tab === "test" ? "🧪 Try It" : tab === "client" ? "📦 Client SDK" : tab === "server" ? "🔒 Server" : "📋 Overview"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "overview" && (
            <div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-text-secondary)" }}>
                {api.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Price", value: `${formatUSD(api.price)} USDC`, color: "var(--color-accent-cyan)" },
                  { label: "Latency", value: `${api.avgLatency}ms`, color: "var(--color-accent-emerald)" },
                  { label: "Success Rate", value: `${api.successRate}%`, color: "var(--color-accent-blue)" },
                  { label: "Total Calls", value: formatNumber(api.totalCalls), color: "var(--color-accent-violet)" },
                ].map((s) => (
                  <div key={s.label} className="p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.3)" }}>
                    <div className="text-xs mb-1" style={{ color: "var(--color-text-muted)" }}>{s.label}</div>
                    <div className="font-bold" style={{ color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h5 className="text-sm font-semibold text-white mb-3">x402 Payment Configuration</h5>
                <div className="code-block text-xs">
                  <div><span className="comment">{"// HTTP 402 Response Headers"}</span></div>
                  <div>{"{"}</div>
                  <div>{"  "}<span className="string">&quot;scheme&quot;</span>: <span className="string">&quot;exact&quot;</span>,</div>
                  <div>{"  "}<span className="string">&quot;price&quot;</span>: <span className="string">&quot;{api.price}&quot;</span>,</div>
                  <div>{"  "}<span className="string">&quot;network&quot;</span>: <span className="string">&quot;eip155:84532&quot;</span>,</div>
                  <div>{"  "}<span className="string">&quot;payTo&quot;</span>: <span className="string">&quot;{formatAddress(api.providerAddress)}&quot;</span>,</div>
                  <div>{"  "}<span className="string">&quot;asset&quot;</span>: <span className="string">&quot;USDC&quot;</span></div>
                  <div>{"}"}</div>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-white mb-3">Sample Response</h5>
                <div className="code-block text-xs">
                  <pre style={{ whiteSpace: "pre-wrap" }}>{api.sampleResponse}</pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === "client" && (
            <div>
              <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
                Use the <code style={{ color: "var(--color-accent-cyan)" }}>@x402/fetch</code> wrapper to call this endpoint. Payment is handled automatically.
              </p>
              <div className="code-block text-xs">
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  {generateClientCode(api.name, api.endpoint, api.price, api.providerAddress, api.network)}
                </pre>
              </div>
              <div className="mt-4 flex gap-3">
                <span className="badge badge-live">npm install @x402/fetch @x402/evm viem</span>
              </div>
            </div>
          )}

          {activeTab === "server" && (
            <div>
              <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
                Protect your own endpoint with x402 middleware using <code style={{ color: "var(--color-accent-cyan)" }}>@x402/express</code>.
              </p>
              <div className="code-block text-xs">
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  {generateServerCode(api.name, api.endpoint, api.price, api.providerAddress)}
                </pre>
              </div>
              <div className="mt-4 flex gap-3">
                <span className="badge badge-live">npm install @x402/express @x402/core</span>
              </div>
            </div>
          )}

          {activeTab === "test" && (
            <div>
              <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
                Simulate the full x402 payment flow for this endpoint. Watch the protocol in action!
              </p>

              <button
                className="btn-glow mb-6"
                onClick={handleTest}
                disabled={testing}
                style={{ opacity: testing ? 0.7 : 1 }}
              >
                {testing ? "⏳ Processing..." : "🚀 Simulate x402 Call"}
              </button>

              {flowSteps.length > 0 && (
                <div className="mb-6">
                  <h5 className="text-sm font-semibold text-white mb-3">Protocol Flow</h5>
                  <div className="space-y-2">
                    {flowSteps.map((step, i) => (
                      <div
                        key={i}
                        className="tx-enter flex items-center gap-2 text-xs font-mono p-2 rounded-lg"
                        style={{
                          background: "rgba(0,0,0,0.3)",
                          color: step.includes("402")
                            ? "var(--color-accent-amber)"
                            : step.includes("200")
                              ? "var(--color-accent-emerald)"
                              : step.includes("✍️")
                                ? "var(--color-accent-violet)"
                                : "var(--color-accent-cyan)",
                        }}
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {testResult && (
                <div>
                  <h5 className="text-sm font-semibold text-white mb-3">Response</h5>
                  <div className="code-block text-xs">
                    <pre style={{ whiteSpace: "pre-wrap", maxHeight: 300, overflow: "auto" }}>
                      {testResult}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Marketplace Section ───────────────────────────────────
function MarketplaceSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedApi, setSelectedApi] = useState<ApiEndpoint | null>(null);

  const filteredApis = SAMPLE_APIS.filter((api) => {
    if (activeCategory !== "all" && api.category !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        api.name.toLowerCase().includes(q) ||
        api.description.toLowerCase().includes(q) ||
        api.provider.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case "cheapest": return parseFloat(a.price) - parseFloat(b.price);
      case "rating": return b.rating - a.rating;
      case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default: return b.totalCalls - a.totalCalls;
    }
  });

  return (
    <section id="marketplace" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            API <span className="gradient-text">Marketplace</span>
          </h3>
          <p style={{ color: "var(--color-text-secondary)" }} className="max-w-lg mx-auto">
            Browse pay-per-call APIs. Each endpoint is protected by x402 — just call and pay.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search APIs, providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none"
              style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(148,163,184,0.1)",
              }}
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-xl text-sm focus:outline-none cursor-pointer"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(148,163,184,0.1)",
              color: "var(--color-text-secondary)",
            }}
          >
            <option value="popular">🔥 Most Popular</option>
            <option value="cheapest">💰 Cheapest</option>
            <option value="rating">⭐ Highest Rated</option>
            <option value="newest">🆕 Newest</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: activeCategory === "all" ? "linear-gradient(135deg, #06d6f2, #3b82f6)" : "rgba(148,163,184,0.08)",
              color: activeCategory === "all" ? "white" : "var(--color-text-secondary)",
              border: `1px solid ${activeCategory === "all" ? "transparent" : "rgba(148,163,184,0.1)"}`,
            }}
            onClick={() => setActiveCategory("all")}
          >
            All APIs
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: activeCategory === cat.id ? `${cat.color}20` : "rgba(148,163,184,0.08)",
                color: activeCategory === cat.id ? cat.color : "var(--color-text-secondary)",
                border: `1px solid ${activeCategory === cat.id ? `${cat.color}40` : "rgba(148,163,184,0.1)"}`,
              }}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* API Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApis.map((api) => (
            <ApiCard key={api.id} api={api} onSelect={setSelectedApi} />
          ))}
        </div>

        {filteredApis.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg text-white mb-2">No APIs Found</p>
            <p style={{ color: "var(--color-text-muted)" }}>Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Modal */}
        {selectedApi && <ApiDetailModal api={selectedApi} onClose={() => setSelectedApi(null)} />}
      </div>
    </section>
  );
}

// ─── Transaction Feed ──────────────────────────────────────
function TransactionFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setTransactions(generateMockTransactions(20));

    // Simulate live transactions
    const interval = setInterval(() => {
      const newTxs = generateMockTransactions(1);
      setTransactions((prev) => [newTxs[0], ...prev.slice(0, 19)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="analytics" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Feed */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                Live <span className="gradient-text">Transaction Feed</span>
              </h3>
              <div className="badge badge-live">
                <span className="pulse-dot"></span>
                Real-time
              </div>
            </div>

            <div className="glass-card overflow-hidden">
              <div className="p-4" style={{ borderBottom: "1px solid rgba(148,163,184,0.08)" }}>
                <div className="grid grid-cols-5 text-xs font-semibold" style={{ color: "var(--color-text-muted)" }}>
                  <span>API</span>
                  <span>Caller</span>
                  <span>Amount</span>
                  <span>Status</span>
                  <span>Time</span>
                </div>
              </div>

              <div style={{ maxHeight: 480, overflow: "auto" }}>
                {transactions.map((tx, i) => (
                  <div
                    key={tx.id}
                    className={`p-4 grid grid-cols-5 items-center text-xs ${i === 0 ? "tx-enter" : ""}`}
                    style={{
                      borderBottom: "1px solid rgba(148,163,184,0.05)",
                      background: i === 0 ? "rgba(6, 214, 242, 0.03)" : "transparent",
                    }}
                  >
                    <span className="text-white font-medium truncate pr-2">{tx.apiName}</span>
                    <span className="font-mono" style={{ color: "var(--color-text-muted)" }}>
                      {formatAddress(tx.caller)}
                    </span>
                    <span className="gradient-text font-semibold">{formatUSD(tx.amount)}</span>
                    <span>
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                        style={{
                          background: tx.status === "confirmed"
                            ? "rgba(16,185,129,0.15)"
                            : "rgba(245,158,11,0.15)",
                          color: tx.status === "confirmed"
                            ? "var(--color-accent-emerald)"
                            : "var(--color-accent-amber)",
                        }}
                      >
                        {tx.status === "confirmed" ? "✓" : "⏳"} {tx.status}
                      </span>
                    </span>
                    <span style={{ color: "var(--color-text-muted)" }}>{timeAgo(tx.timestamp)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">
              Platform <span className="gradient-text-warm">Stats</span>
            </h3>

            {/* Mini chart area */}
            <div className="glass-card p-5">
              <h4 className="text-sm font-semibold text-white mb-4">7-Day Call Volume</h4>
              <MiniBarChart />
            </div>

            {/* Top APIs */}
            <div className="glass-card p-5">
              <h4 className="text-sm font-semibold text-white mb-4">Top APIs by Volume</h4>
              <div className="space-y-3">
                {SAMPLE_APIS.slice(0, 5).sort((a, b) => b.totalCalls - a.totalCalls).map((api, i) => (
                  <div key={api.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold" style={{
                        color: i === 0 ? "var(--color-accent-amber)" : "var(--color-text-muted)",
                        width: 20,
                      }}>
                        #{i + 1}
                      </span>
                      <span className="text-sm">{api.icon}</span>
                      <span className="text-xs text-white truncate" style={{ maxWidth: 120 }}>{api.name}</span>
                    </div>
                    <span className="text-xs font-mono" style={{ color: "var(--color-accent-cyan)" }}>
                      {formatNumber(api.totalCalls)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Network */}
            <div className="glass-card p-5">
              <h4 className="text-sm font-semibold text-white mb-4">Network</h4>
              <div className="flex items-center gap-3 mb-3">
                <span className="network-dot network-base"></span>
                <div>
                  <div className="text-sm text-white">Base Sepolia</div>
                  <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>Testnet · USDC</div>
                </div>
              </div>
              <div className="text-xs p-3 rounded-lg" style={{
                background: "rgba(0,82,255,0.08)",
                border: "1px solid rgba(0,82,255,0.2)",
                color: "var(--color-text-secondary)",
              }}>
                Settlement via x402 facilitator with sub-second verification on Base L2.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Mini Bar Chart (Pure CSS) ─────────────────────────────
function MiniBarChart() {
  const [data, setData] = useState<ReturnType<typeof generateUsageChartData>>([]);

  useEffect(() => {
    setData(generateUsageChartData(7));
  }, []);

  const maxCalls = data.length > 0 ? Math.max(...data.map((d) => d.calls)) : 1;

  if (data.length === 0) {
    return <div className="flex items-end gap-2 shimmer" style={{ height: 120 }} />;
  }

  return (
    <div className="flex items-end gap-2" style={{ height: 120 }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="text-xs font-mono" style={{ color: "var(--color-accent-cyan)" }}>
            {formatNumber(d.calls)}
          </div>
          <div
            className="w-full rounded-t-md transition-all"
            style={{
              height: `${(d.calls / maxCalls) * 80}px`,
              background: `linear-gradient(to top, var(--color-accent-cyan), var(--color-accent-violet))`,
              opacity: 0.8,
              animation: `count-up 0.5s ease-out ${i * 0.1}s both`,
            }}
          />
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{d.date}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Code Demo Section ─────────────────────────────────────
function CodeDemoSection() {
  return (
    <section id="docs" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start <span className="gradient-text">Building</span>
          </h3>
          <p style={{ color: "var(--color-text-secondary)" }} className="max-w-lg mx-auto">
            Add x402 payments to your API in under 5 minutes. Three lines of middleware.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Client side */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">📦</span>
              <h4 className="text-lg font-bold text-white">Client (Consumer)</h4>
            </div>
            <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
              Wrap your <code style={{ color: "var(--color-accent-cyan)" }}>fetch</code> and payments happen automatically when the server returns HTTP 402.
            </p>
            <div className="code-block text-xs">
              <pre style={{ whiteSpace: "pre-wrap" }}>{`import { wrapFetchWithPaymentFromConfig } from "@x402/fetch";
import { ExactEvmScheme } from "@x402/evm";

const fetchPaid = wrapFetchWithPaymentFromConfig(fetch, {
  schemes: [{
    network: "eip155:84532",
    client: new ExactEvmScheme(walletAccount),
  }],
});

// Just fetch — x402 handles the rest!
const data = await fetchPaid("https://api.example.com/ai/sentiment", {
  method: "POST",
  body: JSON.stringify({ text: "x402 is amazing!" }),
});`}</pre>
            </div>
          </div>

          {/* Server side */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🔒</span>
              <h4 className="text-lg font-bold text-white">Server (Provider)</h4>
            </div>
            <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
              One middleware line turns any Express route into a pay-per-call endpoint.
            </p>
            <div className="code-block text-xs">
              <pre style={{ whiteSpace: "pre-wrap" }}>{`import { paymentMiddlewareFromConfig } from "@x402/express";

const x402 = paymentMiddlewareFromConfig({
  facilitatorClient: new HTTPFacilitatorClient({
    url: "https://x402.org/facilitator",
  }),
  routes: {
    "/api/sentiment": {
      accepts: {
        scheme: "exact",
        price: "$0.005",
        network: "eip155:84532",
        payTo: "0xYourWallet...",
      },
    },
  },
});

app.use("/api/sentiment", x402);
// That's it! Endpoint is now pay-per-call.`}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 px-6 relative z-10" style={{ borderTop: "1px solid rgba(148,163,184,0.08)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #06d6f2, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.8rem",
              }}>
                N
              </div>
              <span className="font-bold text-white">x402 Nexus</span>
            </div>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              The AI Agent API Marketplace powered by the x402 payment protocol.
              Pay-per-call APIs with USDC on Base.
            </p>
          </div>

          {[
            {
              title: "Protocol",
              links: ["x402 Docs", "Specification", "Facilitators", "SDKs"],
            },
            {
              title: "Platform",
              links: ["Marketplace", "Analytics", "For Providers", "For Agents"],
            },
            {
              title: "Community",
              links: ["GitHub", "Discord", "Twitter/X", "Blog"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h5 className="text-sm font-semibold text-white mb-3">{col.title}</h5>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs transition-colors hover:text-white"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="section-divider" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            © 2024 x402 Nexus. Built on the x402 open protocol. All payments settle on Base via USDC.
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: "var(--color-text-muted)" }}>
            <span className="flex items-center gap-1">
              <span className="network-dot network-base"></span>
              Base Sepolia Testnet
            </span>
            <span>Protocol v2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <div className="section-divider max-w-7xl mx-auto" />
      <HowItWorksSection />
      <div className="section-divider max-w-7xl mx-auto" />
      <MarketplaceSection />
      <div className="section-divider max-w-7xl mx-auto" />
      <TransactionFeed />
      <div className="section-divider max-w-7xl mx-auto" />
      <CodeDemoSection />
      <Footer />
    </main>
  );
}
