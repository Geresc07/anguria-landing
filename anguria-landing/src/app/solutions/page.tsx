"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Plane, Calendar, Users, TrendingUp, Clock, Star } from "lucide-react";
import Link from "next/link";

function KarebaVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#0d1117] to-[#0a0a0a]">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(249,115,22,1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Route line SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 260" preserveAspectRatio="none">
        <path
          d="M 40 200 Q 120 80 200 130 Q 280 175 360 60"
          stroke="rgba(249,115,22,0.3)"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          fill="none"
        />
        <circle cx="40" cy="200" r="4" fill="#f97316" opacity="0.9" />
        <circle cx="360" cy="60" r="4" fill="#f97316" opacity="0.9" />
        <circle cx="40" cy="200" r="10" fill="#f97316" opacity="0.15" />
        <circle cx="360" cy="60" r="10" fill="#f97316" opacity="0.15" />
      </svg>

      {/* Phone mockup */}
      <div className="relative w-32 h-56 rounded-[22px] border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] flex flex-col z-10">
        <div className="h-6 bg-[#111] flex items-center justify-between px-3 shrink-0">
          <div className="w-8 h-1 rounded-full bg-white/15" />
          <div className="w-3 h-1 rounded-full bg-accent-orange/50" />
        </div>
        <div className="px-3 py-2.5 shrink-0">
          <div className="flex items-center gap-1.5 mb-2">
            <Plane className="w-3 h-3 text-accent-orange" />
            <div className="h-1.5 w-12 rounded-full bg-accent-orange/40" />
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/8 mb-1" />
          <div className="h-1.5 w-3/4 rounded-full bg-white/[0.05]" />
        </div>
        <div className="mx-2.5 rounded-lg bg-accent-orange/12 border border-accent-orange/20 p-2 shrink-0">
          <div className="flex items-center gap-1 mb-1.5">
            <MapPin className="w-2 h-2 text-accent-orange" />
            <div className="h-1 w-14 rounded-full bg-accent-orange/35" />
          </div>
          <div className="h-1 w-full rounded-full bg-white/8 mb-1" />
          <div className="h-1 w-2/3 rounded-full bg-white/[0.05]" />
        </div>
        <div className="flex-1 px-2.5 py-2 space-y-2 overflow-hidden">
          {[0.75, 0.55, 0.85].map((op, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-white/[0.05] shrink-0 flex items-center justify-center">
                <Calendar className="w-2.5 h-2.5 text-white/15" />
              </div>
              <div className="flex-1">
                <div className="h-1 rounded-full bg-white/8 mb-0.5" style={{ width: `${op * 100}%` }} />
                <div className="h-1 rounded-full bg-white/[0.04]" style={{ width: `${op * 55}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mx-2.5 mb-2.5 h-6 rounded-xl bg-accent-orange flex items-center justify-center shrink-0">
          <div className="h-1.5 w-14 rounded-full bg-black/25" />
        </div>
      </div>

      {/* Floating stat bubbles */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 right-10 bg-[#111] border border-white/8 rounded-2xl px-3.5 py-2.5 z-20 shadow-xl"
      >
        <div className="text-[9px] font-mono text-white/30 mb-0.5 uppercase tracking-wider">bookings / day</div>
        <div className="text-2xl font-black text-accent-orange leading-none">340</div>
      </motion.div>

      <motion.div
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute bottom-10 left-8 bg-[#111] border border-white/8 rounded-2xl px-3.5 py-2.5 z-20 shadow-xl"
      >
        <div className="text-[9px] font-mono text-white/30 mb-0.5 uppercase tracking-wider">avg. rating</div>
        <div className="flex items-center gap-1.5">
          <div className="text-2xl font-black text-white leading-none">4.9</div>
          <Star className="w-3.5 h-3.5 text-accent-orange fill-accent-orange" />
        </div>
      </motion.div>
    </div>
  );
}

const cases = [
  {
    id: "kareba",
    client: "Kareba",
    product: "Kareba App",
    category: "Travel Agency · Mobile + Web",
    description:
      "End-to-end booking platform — itinerary builder, agent dashboard, and customer-facing app.",
    metrics: [
      { label: "Booking time", value: "−72%", icon: Clock },
      { label: "Retention", value: "+41%", icon: Star },
      { label: "Active users", value: "2,800+", icon: Users },
      { label: "Revenue", value: "+3.2×", icon: TrendingUp },
    ],
    tags: ["React Native", "Node.js", "PostgreSQL", "AWS"],
    Visual: KarebaVisual,
  },
];

export default function SolutionsPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Top bar */}
      <div className="w-full border-b border-white/[0.06] px-8 py-4 flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-mono text-white/30 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="text-xl font-black tracking-tighter flex items-center">
            <span className="text-accent-orange text-[1.5em] font-light leading-none inline-block -translate-y-[2px] mr-[2px] scale-y-[1.2]">/</span>
            ANGURIA
            <span className="text-accent-orange ml-[2px]">_</span>
          </span>
        </Link>
        <div className="h-4 w-px bg-white/10" />
        <span className="text-sm font-mono text-white/20">Custom Solutions</span>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-8 py-12">
        {/* Section label */}
        <div className="flex items-center justify-between mb-8">
          <p className="font-mono text-xs text-white/25 tracking-[0.2em] uppercase">
            {cases.length} case {cases.length === 1 ? "study" : "studies"}
          </p>
        </div>

        {/* Cards grid — Raycast style */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {cases.map((item, i) => (
            <motion.a
              key={item.id}
              href={`/solutions/${item.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl overflow-hidden bg-[#0d0d0d] border border-white/[0.07] hover:border-accent-orange/25 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Card header — exactly like Raycast */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-accent-orange/10 border border-accent-orange/15 flex items-center justify-center shrink-0">
                    <Plane className="w-5 h-5 text-accent-orange" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-[15px] leading-tight">{item.product}</div>
                    <div className="text-[11px] font-mono text-white/25 mt-0.5">{item.client}</div>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-lg border border-white/[0.08] flex items-center justify-center group-hover:border-accent-orange/25 group-hover:bg-accent-orange/5 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-white/25 group-hover:text-accent-orange group-hover:translate-x-0.5 transition-all duration-300" />
                </div>
              </div>

              {/* Description */}
              <div className="px-5 pb-4">
                <p className="text-sm text-white/35 leading-relaxed">{item.description}</p>
              </div>

              {/* Divider */}
              <div className="mx-5 h-px bg-white/[0.05]" />

              {/* Visual */}
              <div className="h-64 relative overflow-hidden">
                <item.Visual />
              </div>

              {/* Metrics row */}
              <div className="grid grid-cols-4 divide-x divide-white/[0.05] border-t border-white/[0.05]">
                {item.metrics.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex flex-col items-center justify-center py-4 px-2 text-center">
                    <Icon className="w-3 h-3 text-accent-orange/40 mb-1.5" />
                    <div className="text-sm font-black text-white leading-none mb-0.5">{value}</div>
                    <div className="text-[9px] font-mono text-white/20 leading-tight">{label}</div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="px-5 py-3 flex flex-wrap gap-1.5 border-t border-white/[0.05]">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.05] text-[10px] font-mono text-white/25"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}

          {/* Placeholder card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: cases.length * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-dashed border-white/[0.06] flex flex-col items-center justify-center p-10 text-center min-h-[480px]"
          >
            <div className="w-11 h-11 rounded-xl border border-white/8 flex items-center justify-center mb-5">
              <span className="text-white/15 text-2xl font-light leading-none">+</span>
            </div>
            <p className="font-bold text-white/15 text-base tracking-tight mb-1.5">Your project</p>
            <p className="text-[12px] font-mono text-white/10 mb-7 leading-relaxed max-w-[160px]">
              Could be the next case study here.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/8 hover:border-accent-orange/25 hover:bg-accent-orange/5 text-xs font-mono text-white/20 hover:text-accent-orange transition-all duration-200"
            >
              Start a project
              <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
