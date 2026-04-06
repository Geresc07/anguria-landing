"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Github, ChevronRight, ExternalLink, Terminal,
  Shield, Lock, Key, Zap, GitBranch, Package, Download,
  ArrowRight, Star, Code2, Database
} from "lucide-react";
import Link from "next/link";

/* ─── Terminal mock screens ─────────────────────────────────────────────── */

function TerminalBlock({ lines }: { lines: { type: "cmd" | "out" | "success" | "warn" | "blank"; text: string }[] }) {
  return (
    <div className="rounded-xl bg-black border border-white/[0.07] overflow-hidden font-mono text-xs">
      <div className="h-8 px-4 flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/60" />
        <span className="ml-2 text-white/20 text-[10px]">envy — zsh</span>
      </div>
      <div className="p-4 space-y-1.5 text-[11px]">
        {lines.map((line, i) => (
          <div key={i} className={
            line.type === "cmd" ? "flex gap-2" :
            line.type === "success" ? "text-green-400/70 pl-4" :
            line.type === "warn" ? "text-yellow-400/60 pl-4" :
            line.type === "blank" ? "h-2" :
            "text-white/30 pl-4"
          }>
            {line.type === "cmd" && <><span className="text-accent-orange shrink-0">$</span><span className="text-white/70">{line.text}</span></>}
            {line.type !== "cmd" && line.type !== "blank" && line.text}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────────── */

const features = [
  {
    icon: Lock,
    title: "AES-256-GCM encryption",
    desc: "Every secret encrypted with a fresh nonce before touching the database. Master key lives in your OS Keychain — never on disk.",
  },
  {
    icon: Shield,
    title: "Zero-trust storage",
    desc: "Secrets are decrypted in RAM only. Memory is zeroed on drop. No plaintext ever reaches the filesystem.",
  },
  {
    icon: GitBranch,
    title: "GitOps-native",
    desc: "Produces a single sealed envy.enc file (pure ciphertext) you can safely commit publicly.",
  },
  {
    icon: Key,
    title: "Multi-team access",
    desc: "Separate passphrases per environment. Partial access never triggers errors — junior devs get dev keys, prod stays restricted.",
  },
  {
    icon: Zap,
    title: "CI/CD ready",
    desc: "Headless mode via ENVY_PASSPHRASE_<ENV> env var. Works with GitHub Actions, GitLab CI, any pipeline.",
  },
  {
    icon: Code2,
    title: "Built in Rust",
    desc: "Memory-safe by design. Argon2id key derivation. Constant-time base64. No unsafe dependencies.",
  },
];

const install = [
  { label: "Homebrew", cmd: "brew install anguriatech/tap/envy" },
  { label: "npm", cmd: "npm install -g @anguriatech/envy" },
  { label: "curl", cmd: "curl --proto '=https' --tlsv1.2 -LsSf \\\n  https://github.com/anguriatech/envy/releases/latest/download/envy-installer.sh | sh" },
];

const commands = [
  { cmd: "envy init", desc: "Create envy.toml and register project" },
  { cmd: "envy set KEY=VALUE", desc: "Store or update a secret" },
  { cmd: "envy get KEY", desc: "Print decrypted value" },
  { cmd: "envy run -- CMD", desc: "Inject secrets into child process" },
  { cmd: "envy encrypt", desc: "Seal vault into envy.enc" },
  { cmd: "envy decrypt", desc: "Unseal envy.enc" },
  { cmd: "envy diff", desc: "Compare vault vs sealed artifact" },
  { cmd: "envy migrate FILE", desc: "Import from .env file" },
];

const tabs = ["Overview", "Commands", "Install"] as const;
type Tab = typeof tabs[number];

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function EnvyPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <main className="bg-black min-h-screen text-white">

      {/* Top bar */}
      <div className="w-full border-b border-white/[0.06] px-8 py-4 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-mono text-white/30 hover:text-white transition-colors duration-200">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="text-xl font-black tracking-tighter flex items-center">
            <span className="text-accent-orange text-[1.5em] font-light leading-none inline-block -translate-y-[2px] mr-[2px] scale-y-[1.2]">/</span>
            ANGURIA
            <span className="text-accent-orange ml-[2px]">_</span>
          </span>
        </Link>
        <div className="h-4 w-px bg-white/10 hidden sm:block" />
        <span className="text-sm font-mono text-white/20 hidden sm:inline">Open Source</span>
        <ChevronRight className="w-3 h-3 text-white/10 hidden sm:block" />
        <span className="text-sm font-mono text-white/40 hidden sm:inline">Envy</span>
      </div>

      {/* Hero */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 pt-10 md:pt-14 pb-8 md:pb-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex items-start gap-4 md:gap-6">
            {/* Icon */}
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-[#0d0d0d] border border-white/10 flex items-center justify-center shrink-0 shadow-xl">
              <Terminal className="w-6 h-6 md:w-8 md:h-8 text-accent-orange" />
            </div>
            {/* Meta */}
            <div className="pt-0.5 md:pt-1 flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-black tracking-tight leading-none mb-1.5">Envy</h1>
              <p className="text-white/40 text-sm leading-relaxed mb-3">
                Zero-trust, encrypted secret management CLI built in Rust. No SaaS, no internet, no plaintext.
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-white/25">
                <div className="flex items-center gap-1"><Code2 className="w-3 h-3" />Rust</div>
                <span className="text-white/10 hidden sm:inline">|</span>
                <div className="flex items-center gap-1"><Star className="w-3 h-3" />MIT</div>
                <span className="text-white/10 hidden sm:inline">|</span>
                <div className="flex items-center gap-1"><Database className="w-3 h-3" />AES-256-GCM</div>
                <div className="flex items-center gap-1">Argon2id</div>
                <div className="flex items-center gap-1">SQLCipher</div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-2 md:shrink-0 md:pt-1">
            <Link
              href="https://github.com/anguriatech/envy"
              target="_blank"
              className="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-all duration-200"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">View on </span>GitHub
            </Link>
            <Link
              href="https://github.com/anguriatech/envy/releases/latest"
              target="_blank"
              className="flex items-center gap-2 px-3 md:px-4 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-medium hover:border-white/20 hover:text-white transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab ? "text-white" : "text-white/30 hover:text-white/60"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="envy-tab" className="absolute bottom-0 left-0 right-0 h-px bg-white" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 pt-6 pb-10">
        <div className={`flex md:flex-row gap-8 md:gap-10 ${activeTab === "Overview" ? "flex-col" : "flex-col-reverse"}`}>

          {/* Main */}
          <div className="flex-1 min-w-0">

            {activeTab === "Overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

                {/* Terminal gallery */}
                <div className="flex flex-col md:flex-row gap-3 mb-8 mt-6">
                  <div className="flex-1 min-w-0 rounded-xl bg-[#0d0d0d] border border-white/[0.07] p-4 flex flex-col gap-2.5">
                    <p className="text-[10px] font-mono text-white/25 uppercase tracking-wider">Quickstart</p>
                    <TerminalBlock lines={[
                      { type: "cmd", text: "envy init" },
                      { type: "success", text: "✓ Initialized vault (local-first)" },
                      { type: "blank", text: "" },
                      { type: "cmd", text: "envy set DATABASE_URL=postgres://localhost/app" },
                      { type: "success", text: "✓ DATABASE_URL stored" },
                      { type: "cmd", text: "envy set API_KEY=sk_live_abc123" },
                      { type: "success", text: "✓ API_KEY stored" },
                      { type: "blank", text: "" },
                      { type: "cmd", text: "envy run -- npm run dev" },
                      { type: "out", text: "↳ Injecting 2 secrets..." },
                      { type: "success", text: "✓ Server running on :3000" },
                    ]} />
                  </div>
                  <div className="flex-1 min-w-0 rounded-xl bg-[#0d0d0d] border border-white/[0.07] p-4 flex flex-col gap-2.5">
                    <p className="text-[10px] font-mono text-white/25 uppercase tracking-wider">GitOps workflow</p>
                    <TerminalBlock lines={[
                      { type: "cmd", text: "envy diff" },
                      { type: "out", text: "+ API_KEY" },
                      { type: "out", text: "+ DATABASE_URL" },
                      { type: "out", text: "2 changes pending seal" },
                      { type: "blank", text: "" },
                      { type: "cmd", text: "envy encrypt" },
                      { type: "out", text: "Passphrase: ········" },
                      { type: "success", text: "✓ Sealed → envy.enc" },
                      { type: "blank", text: "" },
                      { type: "cmd", text: "git add envy.enc && git commit -m 'secrets'" },
                      { type: "success", text: "✓ Safe to push publicly" },
                    ]} />
                  </div>
                  <div className="flex-1 min-w-0 rounded-xl bg-[#0d0d0d] border border-white/[0.07] p-4 flex flex-col gap-2.5">
                    <p className="text-[10px] font-mono text-white/25 uppercase tracking-wider">CI/CD — GitHub Actions</p>
                    <TerminalBlock lines={[
                      { type: "cmd", text: "envy decrypt" },
                      { type: "success", text: "✓ production  (6 secrets upserted)" },
                      { type: "warn", text: "⚠ staging skipped — different passphrase" },
                      { type: "blank", text: "" },
                      { type: "cmd", text: "envy diff -e production" },
                      { type: "success", text: "✓ Artifact matches vault · exit 0" },
                      { type: "blank", text: "" },
                      { type: "cmd", text: "envy run -e production -- ./deploy.sh" },
                      { type: "success", text: "✓ Deploy complete" },
                    ]} />
                  </div>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {features.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="p-5 rounded-2xl bg-[#0d0d0d] border border-white/[0.07] flex flex-col gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-orange/8 border border-accent-orange/15 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-accent-orange/70" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-white mb-1">{title}</div>
                        <p className="text-xs text-white/30 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </motion.div>
            )}

            {activeTab === "Commands" && (
              <motion.div key="commands" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-2">
                {commands.map(({ cmd, desc }) => (
                  <div key={cmd} className="flex items-center gap-4 p-4 rounded-xl bg-[#0d0d0d] border border-white/[0.07] hover:border-white/[0.12] transition-colors duration-200">
                    <code className="text-accent-orange font-mono text-sm shrink-0 w-48">{cmd}</code>
                    <span className="text-white/30 text-sm">{desc}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "Install" && (
              <motion.div key="install" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4 max-w-2xl">
                {install.map(({ label, cmd }, idx) => (
                  <div key={label} className="rounded-xl bg-[#0d0d0d] border border-white/[0.07] overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.05]">
                      <span className="text-xs font-mono text-white/30 uppercase tracking-wider">{label}</span>
                      <button
                        onClick={() => copy(cmd, idx)}
                        className="text-[10px] font-mono text-white/20 hover:text-accent-orange transition-colors duration-200"
                      >
                        {copiedIdx === idx ? "copied!" : "copy"}
                      </button>
                    </div>
                    <pre className="p-4 text-sm font-mono text-accent-orange/80 whitespace-pre-wrap">{cmd}</pre>
                  </div>
                ))}

                <div className="mt-6 p-5 rounded-2xl bg-accent-orange/5 border border-accent-orange/15">
                  <p className="text-xs font-mono text-white/40 mb-3">Requires Rust 1.85+ to build from source</p>
                  <div className="rounded-xl bg-black border border-white/[0.07] overflow-hidden">
                    <pre className="p-4 text-sm font-mono text-accent-orange/80 whitespace-pre-wrap">{`git clone https://github.com/anguriatech/envy.git\ncd envy && cargo install --path .`}</pre>
                  </div>
                </div>
              </motion.div>
            )}

          </div>

          {/* Sidebar */}
          <div className="w-full md:w-56 md:shrink-0 md:self-start md:sticky md:top-8">
            <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d0d] overflow-hidden">

              {/* GitHub CTA */}
              <Link
                href="https://github.com/anguriatech/envy"
                target="_blank"
                className="flex items-center justify-between w-full p-4 border-b border-white/[0.06] hover:bg-accent-orange/5 transition-all duration-200 group"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-white/40 group-hover:text-accent-orange transition-colors" />
                  <span className="text-sm font-medium text-white/40 group-hover:text-white transition-colors">anguriatech/envy</span>
                </div>
                <ExternalLink className="w-3 h-3 text-white/15 group-hover:text-accent-orange transition-colors shrink-0" />
              </Link>

              {/* Details */}
              <div className="p-4 space-y-3 border-b border-white/[0.06]">
                <div className="text-[10px] font-mono text-white/20 uppercase tracking-wider">Details</div>
                {[
                  { label: "Language", value: "Rust 1.85+" },
                  { label: "License", value: "MIT" },
                  { label: "Encryption", value: "AES-256-GCM" },
                  { label: "KDF", value: "Argon2id" },
                  { label: "Storage", value: "SQLCipher" },
                  { label: "Status", value: "Active" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-white/20">{label}</span>
                    <span className="text-[11px] text-white/50 font-medium">{value}</span>
                  </div>
                ))}
              </div>

              {/* Install quick links */}
              <div className="p-4 space-y-1">
                <div className="text-[10px] font-mono text-white/20 uppercase tracking-wider mb-3">Install</div>
                {[
                  { label: "Homebrew", icon: Package },
                  { label: "npm / npx", icon: Code2 },
                  { label: "Releases", icon: Download },
                ].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => setActiveTab("Install")}
                    className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-sm text-white/30 hover:text-white/70 hover:bg-white/[0.04] transition-all duration-200"
                  >
                    <Icon className="w-3.5 h-3.5 text-white/20 shrink-0" />
                    {label}
                  </button>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
