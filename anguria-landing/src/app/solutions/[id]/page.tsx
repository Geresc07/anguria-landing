"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Plane, MapPin, Calendar, Clock, Users, TrendingUp, Star,
  Zap, Shield, Smartphone, Globe, Database, ChevronRight, ExternalLink
} from "lucide-react";
import Link from "next/link";

/* ─── Data ─────────────────────────────────────────────────────────────── */
const project = {
  id: "kareba",
  client: "Kareba",
  product: "Kareba App",
  category: "Travel Agency",
  tagline: "Full-stack booking platform for a boutique travel agency.",
  description:
    "Kareba needed to replace a patchwork of spreadsheets, WhatsApp threads, and third-party tools with a single, cohesive system. We designed and shipped a native mobile app for customers, an agent dashboard for the operations team, and an admin panel for management — all connected to a single backend.",
  year: "2024",
  duration: "5 months",
  team: ["Pol", "Oriol", "Gerard"],
  metrics: [
    { label: "Booking time", value: "−72%", icon: Clock, detail: "from avg 18 min to 5 min per booking" },
    { label: "Customer retention", value: "+41%", icon: Star, detail: "measured 6 months post-launch" },
    { label: "Active users", value: "2,800+", icon: Users, detail: "across customer + agent apps" },
    { label: "Revenue growth", value: "+3.2×", icon: TrendingUp, detail: "YoY after platform launch" },
  ],
  stack: [
    { name: "React Native", role: "Mobile app (iOS + Android)", icon: Smartphone },
    { name: "Next.js", role: "Agent & admin dashboard", icon: Globe },
    { name: "Node.js + Fastify", role: "REST API", icon: Zap },
    { name: "PostgreSQL", role: "Primary database", icon: Database },
    { name: "AWS (ECS + RDS)", role: "Infrastructure", icon: Shield },
  ],
  tags: ["React Native", "Next.js", "Node.js", "PostgreSQL", "AWS"],
  screens: [
    { label: "Customer App — Home", color: "from-[#0d1117] to-[#111]", type: "mobile" },
    { label: "Itinerary Builder", color: "from-[#0d1117] to-[#0f0f0f]", type: "desktop" },
    { label: "Agent Dashboard", color: "from-[#0d1117] to-[#111]", type: "desktop" },
  ],
};

/* ─── Mock screens ──────────────────────────────────────────────────────── */
function MobileScreen() {
  return (
    <div className="w-36 h-64 rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden flex flex-col mx-auto shadow-2xl">
      <div className="h-5 bg-[#111] flex items-center justify-between px-3 shrink-0">
        <div className="w-6 h-1 rounded-full bg-white/15" />
        <div className="w-2 h-1 rounded-full bg-accent-orange/50" />
      </div>
      <div className="px-3 pt-3 pb-2 shrink-0">
        <div className="flex items-center gap-1.5 mb-3">
          <Plane className="w-3 h-3 text-accent-orange" />
          <div className="h-1.5 w-14 rounded-full bg-accent-orange/40" />
        </div>
        <div className="h-8 w-full rounded-xl bg-white/[0.04] border border-white/[0.06] mb-2 flex items-center px-2">
          <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
        </div>
      </div>
      <div className="mx-3 rounded-xl bg-accent-orange/12 border border-accent-orange/20 p-2.5 shrink-0">
        <div className="flex items-center gap-1 mb-2">
          <MapPin className="w-2 h-2 text-accent-orange" />
          <div className="h-1 w-16 rounded-full bg-accent-orange/40" />
        </div>
        <div className="h-1 w-full rounded-full bg-white/8 mb-1" />
        <div className="h-1 w-3/4 rounded-full bg-white/[0.05]" />
      </div>
      <div className="flex-1 px-3 py-2 space-y-2">
        {[0.8, 0.6, 0.9].map((w, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-lg bg-white/[0.05] shrink-0" />
            <div className="flex-1 space-y-1">
              <div className="h-1 rounded-full bg-white/8" style={{ width: `${w * 100}%` }} />
              <div className="h-1 rounded-full bg-white/[0.04]" style={{ width: `${w * 55}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mx-3 mb-3 h-7 rounded-xl bg-accent-orange flex items-center justify-center shrink-0">
        <div className="h-1.5 w-14 rounded-full bg-black/25" />
      </div>
    </div>
  );
}

function DesktopScreen({ type }: { type: "agent" | "builder" }) {
  return (
    <div className="w-full h-48 rounded-xl border border-white/8 bg-[#0a0a0a] overflow-hidden flex flex-col shadow-xl">
      <div className="h-8 px-3 flex items-center gap-1.5 border-b border-white/[0.05] bg-[#111] shrink-0">
        <div className="w-2 h-2 rounded-full bg-[#FF5F56]/60" />
        <div className="w-2 h-2 rounded-full bg-[#FFBD2E]/60" />
        <div className="w-2 h-2 rounded-full bg-[#27C93F]/60" />
        <div className="ml-3 h-1.5 w-32 rounded-full bg-white/8" />
        <div className="ml-auto flex gap-1.5">
          <div className="h-5 w-16 rounded-md bg-white/[0.05]" />
          <div className="h-5 w-20 rounded-md bg-accent-orange/20 border border-accent-orange/20" />
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {type === "agent" && (
          <>
            <div className="w-44 border-r border-white/[0.05] p-2.5 flex flex-col gap-1.5 shrink-0">
              {[0.9, 0.6, 1, 0.7, 0.8, 0.5].map((w, i) => (
                <div key={i} className={`h-6 rounded-lg flex items-center px-2 gap-2 ${i === 0 ? "bg-accent-orange/10 border border-accent-orange/20" : "bg-white/[0.03]"}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-orange/40 shrink-0" />
                  <div className="h-1 rounded-full bg-white/10 flex-1" style={{ width: `${w * 100}%` }} />
                </div>
              ))}
            </div>
            <div className="flex-1 p-3 space-y-2">
              <div className="flex gap-2 mb-3">
                {["Pending", "Confirmed", "Completed"].map((s, i) => (
                  <div key={s} className={`px-2.5 py-1 rounded-lg text-[9px] font-mono border ${i === 0 ? "border-accent-orange/30 bg-accent-orange/10 text-accent-orange/70" : "border-white/[0.06] text-white/20"}`}>{s}</div>
                ))}
              </div>
              {[1, 0.85, 0.7].map((op, i) => (
                <div key={i} className="h-9 rounded-lg bg-white/[0.03] border border-white/[0.04] flex items-center px-3 gap-3">
                  <div className="w-5 h-5 rounded-md bg-accent-orange/15 border border-accent-orange/20 shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="h-1 rounded-full bg-white/10" style={{ width: `${op * 70}%` }} />
                    <div className="h-1 rounded-full bg-white/[0.05]" style={{ width: `${op * 45}%` }} />
                  </div>
                  <div className="h-5 w-14 rounded-md bg-white/[0.04] shrink-0" />
                </div>
              ))}
            </div>
          </>
        )}
        {type === "builder" && (
          <>
            <div className="w-52 border-r border-white/[0.05] p-3 flex flex-col gap-2 shrink-0">
              <div className="h-1.5 w-20 rounded-full bg-white/20 mb-1" />
              {[
                { w: "100%", c: "bg-accent-orange/60" },
                { w: "60%", c: "bg-white/10" },
                { w: "80%", c: "bg-accent-orange/30" },
                { w: "50%", c: "bg-white/10" },
              ].map((bar, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`h-5 rounded-lg ${bar.c}`} style={{ width: bar.w }} />
                </div>
              ))}
            </div>
            <div className="flex-1 p-3">
              <div className="h-full rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="flex-1 h-7 rounded bg-white/[0.05] border border-white/[0.04]" />
                  <div className="flex-1 h-7 rounded bg-white/[0.05] border border-white/[0.04]" />
                </div>
                <div className="flex-1 rounded bg-white/[0.03] border border-white/[0.04]" />
                <div className="h-6 w-24 rounded bg-accent-orange/70 ml-auto" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
const tabs = ["Overview", "Tech Stack", "Results"] as const;
type Tab = typeof tabs[number];

export default function CaseStudyPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <main className="bg-black min-h-screen text-white">

      {/* Top bar */}
      <div className="w-full border-b border-white/[0.06] px-8 py-4 flex items-center gap-4">
        <Link href="/solutions" className="flex items-center gap-2 text-sm font-mono text-white/30 hover:text-white transition-colors duration-200">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="text-xl font-black tracking-tighter flex items-center">
            <span className="text-accent-orange text-[1.5em] font-light leading-none inline-block -translate-y-[2px] mr-[2px] scale-y-[1.2]">/</span>
            ANGURIA
            <span className="text-accent-orange ml-[2px]">_</span>
          </span>
        </Link>
        <div className="h-4 w-px bg-white/10" />
        <Link href="/solutions" className="text-sm font-mono text-white/20 hover:text-white/50 transition-colors">Custom Solutions</Link>
        <ChevronRight className="w-3 h-3 text-white/10" />
        <span className="text-sm font-mono text-white/40">{project.product}</span>
      </div>

      {/* Hero row — Raycast style */}
      <div className="max-w-screen-xl mx-auto px-8 pt-14 pb-10">
        <div className="flex items-start justify-between gap-8">
          <div className="flex items-start gap-6">
            {/* Icon */}
            <div className="w-20 h-20 rounded-2xl bg-[#0d0d0d] border border-white/10 flex items-center justify-center shrink-0 shadow-xl">
              <Plane className="w-8 h-8 text-accent-orange" />
            </div>
            {/* Meta */}
            <div className="pt-1">
              <h1 className="text-2xl font-black tracking-tight leading-none mb-1.5">{project.product}</h1>
              <p className="text-white/40 text-sm max-w-xl leading-relaxed mb-3">{project.tagline}</p>
              <div className="flex items-center gap-4 text-[12px] font-mono text-white/25">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-md bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center">
                    <Plane className="w-2.5 h-2.5 text-accent-orange" />
                  </div>
                  {project.client}
                </div>
                <span className="text-white/10">|</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {project.year} · {project.duration}
                </div>
                <span className="text-white/10">|</span>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3 h-3" />
                  {project.team.length} engineers
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-2 shrink-0 pt-1">
            <Link
              href="/#contact"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-all duration-200"
            >
              Request similar
              <ExternalLink className="w-3.5 h-3.5" />
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
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-white"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-8 py-10">
        <div className="flex gap-10">

          {/* Main column */}
          <div className="flex-1 min-w-0">

            {activeTab === "Overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                {/* Screenshot gallery */}
                <div className="flex gap-4 overflow-x-auto pb-4 mb-10 -mx-2 px-2">
                  {/* Screen 1: Mobile app */}
                  <div className="shrink-0 w-52 rounded-2xl bg-gradient-to-b from-[#0d1117] to-[#0d0d0d] border border-white/[0.07] overflow-hidden p-6 flex flex-col gap-3">
                    <p className="text-[10px] font-mono text-white/25 uppercase tracking-wider">Customer App</p>
                    <MobileScreen />
                  </div>

                  {/* Screen 2: Agent dashboard */}
                  <div className="shrink-0 w-[520px] rounded-2xl bg-gradient-to-b from-[#0d1117] to-[#0d0d0d] border border-white/[0.07] overflow-hidden p-6 flex flex-col gap-3">
                    <p className="text-[10px] font-mono text-white/25 uppercase tracking-wider">Agent Dashboard</p>
                    <DesktopScreen type="agent" />
                  </div>

                  {/* Screen 3: Itinerary builder */}
                  <div className="shrink-0 w-[480px] rounded-2xl bg-gradient-to-b from-[#0d1117] to-[#0d0d0d] border border-white/[0.07] overflow-hidden p-6 flex flex-col gap-3">
                    <p className="text-[10px] font-mono text-white/25 uppercase tracking-wider">Itinerary Builder</p>
                    <DesktopScreen type="builder" />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4 text-white/40 text-sm leading-relaxed max-w-2xl">
                  <p>{project.description}</p>
                  <p>
                    The mobile app (iOS + Android) handles the customer journey end-to-end: browse destinations,
                    configure trips, book and pay, track status in real time. The agent dashboard gives the ops team
                    a single view of all active bookings, with tools to build itineraries, assign guides, and manage availability.
                  </p>
                  <p>
                    We built the entire system in 5 months — from zero to production. Architecture decisions
                    were made to minimize ops overhead: a single Fastify API, a managed RDS instance on AWS,
                    and ECS for containerized deploys with zero downtime.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "Tech Stack" && (
              <motion.div
                key="tech"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-3"
              >
                {project.stack.map(({ name, role, icon: Icon }) => (
                  <div
                    key={name}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#0d0d0d] border border-white/[0.07] hover:border-white/[0.12] transition-colors duration-200"
                  >
                    <div className="w-9 h-9 rounded-lg bg-accent-orange/8 border border-accent-orange/15 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-accent-orange/70" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-white">{name}</div>
                      <div className="text-xs font-mono text-white/25 mt-0.5">{role}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "Results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-2 gap-4"
              >
                {project.metrics.map(({ label, value, icon: Icon, detail }) => (
                  <div
                    key={label}
                    className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/[0.07] flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-accent-orange/8 border border-accent-orange/15 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-accent-orange/70" />
                      </div>
                      <span className="text-xs font-mono text-white/30 uppercase tracking-wider">{label}</span>
                    </div>
                    <div className="text-4xl font-black text-white tracking-tight">{value}</div>
                    <p className="text-xs font-mono text-white/20 leading-relaxed">{detail}</p>
                  </div>
                ))}
              </motion.div>
            )}

          </div>

          {/* Sidebar */}
          <div className="w-56 shrink-0 space-y-6">

            {/* Team */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-white/25 uppercase tracking-wider">Team</span>
                <span className="text-xs font-mono text-white/15">{project.team.length}</span>
              </div>
              <div className="space-y-2">
                {project.team.map((name) => (
                  <div key={name} className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-[10px] font-black text-white/40">
                      {name[0]}
                    </div>
                    <span className="text-sm text-white/40 font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* Project info */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-white/25 uppercase tracking-wider mb-3">Details</div>
              {[
                { label: "Client", value: project.client },
                { label: "Year", value: project.year },
                { label: "Duration", value: project.duration },
                { label: "Category", value: project.category },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-[10px] font-mono text-white/20 mb-0.5">{label}</div>
                  <div className="text-sm text-white/50 font-medium">{value}</div>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* Tags */}
            <div>
              <div className="text-xs font-mono text-white/25 uppercase tracking-wider mb-3">Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.05] text-[10px] font-mono text-white/25">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

    </main>
  );
}
