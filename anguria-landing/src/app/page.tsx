"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Monitor, Smartphone, Github, BarChart3, Zap, Database } from "lucide-react";
import Link from "next/link";
import { getDictionary } from "../i18n/dictionaries";
import { Waves } from "@/components/ui/wave-background";
import { Typewriter } from "@/components/ui/typewriter";

export default function Home() {
  // Inicializamos el diccionario en español por defecto para esta vista
  // (En el futuro, esto se recibirá vía props desde dynamic routing [lang]/page.tsx)
  const dict = getDictionary('en');

  // Form state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormStatus("sent");
      } else {
        setFormStatus("idle");
        alert("Something went wrong. Try again.");
      }
    } catch {
      setFormStatus("idle");
      alert("Something went wrong. Try again.");
    }
  };

  // Logic for the Hero typing layout
  const [typedText, setTypedText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fullText = "/ANGURIA";

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const startDelay = 500; // wait briefly antes de teclear
    const typeDelay = 80; // velocidad mecánica

    const typeLetter = (index: number) => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        timeout = setTimeout(() => typeLetter(index + 1), typeDelay);
      } else {
        timeout = setTimeout(() => setIsSubmitted(true), 200); // Wait tras escribir antes de desplazar
      }
    };

    timeout = setTimeout(() => typeLetter(1), startDelay);
    return () => clearTimeout(timeout);
  }, []);

  const renderTypedText = () => {
    const hasSlash = typedText.startsWith('/');
    const restOfText = hasSlash ? typedText.slice(1) : typedText;
    
    return (
      <>
        {hasSlash && <span className="text-accent-orange font-light mr-2 md:mr-4 scale-y-[1.15] -translate-y-1 md:-translate-y-2 inline-block">/</span>}
        <span className="text-white">{restOfText}</span>
      </>
    );
  };

  return (
    <main className="bg-background relative flex flex-col items-center overflow-hidden min-h-screen">
      {/* Wave Background — Hero + Bento zone */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-0" style={{ height: '260vh' }}>
        <Waves
          strokeColor="rgba(255,255,255,0.18)"
          backgroundColor="#000000"
          pointerSize={0.4}
        />
        {/* Glow naranja */}
        <div className="absolute top-0 right-[-10%] w-[800px] h-[500px] bg-accent-orange/8 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[40%] left-[-10%] w-[700px] h-[700px] bg-accent-orange-dark/6 blur-[180px] rounded-full pointer-events-none" />
        {/* Fade al final */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
      
      {/* Navbar Minimal */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-50 max-w-screen-2xl mx-auto">
        <div className="text-xl font-black tracking-tighter flex items-center">
          <span className="text-accent-orange text-[1.6em] font-light leading-none inline-block -translate-y-[2px] mr-[2px] scale-y-[1.25]">/</span>
          ANGURIA
          <span className="text-accent-orange ml-[2px]">_</span>
        </div>
        <Link 
          href="https://calendly.com" 
          target="_blank" 
          className="glass px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white/10 hover:border-white/20 transition-all border-accent-orange/20"
        >
          {dict.nav.bookCall}
        </Link>
      </nav>

      {/* Hero Layout: Sleek Terminal Window */}
      <header className="z-10 w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-screen px-4 md:px-6 relative">
        
        {/* Terminal Window Block */}
        <motion.div 
           initial={{ opacity: 0, y: 30, scale: 0.98 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="w-full rounded-3xl border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-3xl shadow-[0_0_80px_-20px_rgba(249,115,22,0.15)] flex flex-col mb-10 overflow-hidden relative"
        >
          {/* Mac OS Window Controls */}
          <div className="h-10 md:h-12 px-5 flex items-center gap-2 border-b border-white/5 bg-white/[0.02] shadow-sm">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56]/80" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E]/80" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F]/80" />
            <div className="flex-1 flex justify-center items-center text-[10px] md:text-xs font-mono text-gray-400 pr-12 gap-2 opacity-60">
               <Terminal className="w-3 h-3 md:w-3.5 md:h-3.5" /> 
               root@anguria-sys:~
            </div>
          </div>

          <div className="px-6 py-7 md:px-8 md:py-8 flex flex-col items-center justify-center text-center">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 text-[9px] font-mono uppercase tracking-widest text-gray-400 mb-6 border border-white/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange" />
              </span>
              {dict.hero.badge}
            </motion.div>

            {/* Typeline */}
            <div className="flex items-center justify-center text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-none h-[1.1em] mb-6">
              {renderTypedText()}
              <motion.span
                animate={{ opacity: [1, 1, 0, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="text-accent-orange ml-2 font-light"
              >_</motion.span>
            </div>

            {/* Expanded content */}
            {isSubmitted && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center gap-5"
              >
                <div>
                  <h1 className="text-xl md:text-2xl font-black text-white mb-3 leading-tight tracking-tight">
                    {dict.hero.titleLine1}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-orange-glow">
                      {dict.hero.titleLine2}
                    </span>
                  </h1>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-sm mx-auto">
                    {dict.hero.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full justify-center">
                  <Link
                    href="https://calendly.com"
                    target="_blank"
                    className="group inline-flex items-center gap-2 bg-accent-orange text-black px-5 py-2.5 rounded-lg font-bold text-sm transition-all hover:brightness-110 active:scale-[0.98] shadow-[0_0_20px_-8px_rgba(249,115,22,0.5)]"
                  >
                    <span>{dict.hero.ctaPrimary}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <Link
                    href="#solutions"
                    className="inline-flex items-center gap-2 group px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-sm"
                  >
                    <Terminal className="w-3.5 h-3.5 text-accent-orange/70" />
                    <span className="text-gray-400 text-sm font-medium group-hover:text-white transition-colors">{dict.hero.ctaSecondary}</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </header>

      {/* spacer */}
      <div className="h-32 lg:h-48 w-full" />

      {/* Bento Hub — The Three Pillars */}
      <section id="solutions" className="w-full max-w-screen-xl mx-auto px-6 mb-40 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-accent-orange tracking-[0.2em] uppercase mb-5 flex items-center gap-3">
            <span className="w-6 h-px bg-accent-orange inline-block" />
            // the pillars
          </p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
            Three ways <br />
            <span className="text-white/15">we build.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="flex flex-col gap-4">

          {/* Row 1: Custom Solutions + Products */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Card 1: Custom Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-7 h-[420px] group relative rounded-2xl overflow-hidden bg-black/70 backdrop-blur-sm border border-white/[0.06] hover:bg-accent-orange hover:border-transparent transition-all duration-300"
            >
              {/* Text content */}
              <div className="absolute left-0 top-0 bottom-0 w-[52%] p-8 flex flex-col justify-between relative z-20">
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <Monitor className="w-3.5 h-3.5 text-accent-orange/60 group-hover:text-black/50 transition-colors duration-300" />
                    <p className="font-mono text-[10px] text-accent-orange/70 group-hover:text-black/60 tracking-[0.25em] uppercase transition-colors duration-300">// for clients</p>
                  </div>
                  <h3 className="text-3xl font-black text-white group-hover:text-black tracking-tight mb-3 leading-none transition-colors duration-300">Custom<br />Solutions</h3>
                  <p className="text-gray-500 group-hover:text-black/70 text-sm leading-relaxed transition-colors duration-300">
                    ERPs, CRMs, and internal tools engineered to eliminate friction and automate growth.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-white/25 group-hover:text-black/60 transition-colors duration-300">
                  <span>Start a Project</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Window mockup */}
              <div className="absolute right-0 top-0 bottom-0 w-[52%] p-6 flex items-center justify-center opacity-40 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none">
                <div className="w-full rounded-xl border border-white/10 group-hover:border-black/20 bg-[#111]/80 group-hover:bg-black/15 overflow-hidden shadow-2xl transition-all duration-300">
                  {/* Titlebar */}
                  <div className="h-7 px-3 flex items-center gap-1.5 border-b border-white/[0.06] group-hover:border-black/10 bg-white/[0.03] transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F56]/70" />
                    <div className="w-2 h-2 rounded-full bg-[#FFBD2E]/70" />
                    <div className="w-2 h-2 rounded-full bg-[#27C93F]/70" />
                    <div className="ml-auto w-20 h-2 rounded bg-white/[0.05] group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  {/* App layout */}
                  <div className="flex h-36">
                    {/* Sidebar */}
                    <div className="w-1/3 border-r border-white/[0.05] group-hover:border-black/10 p-2.5 flex flex-col gap-2 transition-colors duration-300">
                      <div className="h-2 w-full rounded bg-white/60 group-hover:bg-black/40 transition-colors duration-300" />
                      <div className="h-2 w-3/4 rounded bg-white/10 group-hover:bg-black/15 transition-colors duration-300" />
                      <div className="h-2 w-full rounded bg-white/40 group-hover:bg-black/30 transition-colors duration-300" />
                      <div className="h-2 w-2/3 rounded bg-white/10 group-hover:bg-black/15 transition-colors duration-300" />
                      <div className="h-2 w-full rounded bg-white/[0.06] group-hover:bg-black/10 transition-colors duration-300" />
                      <div className="h-2 w-3/4 rounded bg-white/30 group-hover:bg-black/25 transition-colors duration-300" />
                    </div>
                    {/* Content */}
                    <div className="flex-1 p-3 flex flex-col gap-2">
                      <div className="flex gap-2 mb-1">
                        <div className="h-5 w-12 rounded bg-white/70 group-hover:bg-black/50 flex items-center justify-center transition-colors duration-300">
                          <div className="h-1.5 w-6 rounded bg-black/20 group-hover:bg-white/40 transition-colors duration-300" />
                        </div>
                        <div className="h-5 w-16 rounded bg-white/[0.06] group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                      <div className="h-2 w-full rounded bg-white/[0.06] group-hover:bg-black/10 transition-colors duration-300" />
                      <div className="h-2 w-5/6 rounded bg-white/[0.04] group-hover:bg-black/[0.08] transition-colors duration-300" />
                      <div className="h-8 w-full rounded bg-white/[0.04] group-hover:bg-black/[0.08] mt-1 transition-colors duration-300" />
                      <div className="h-2 w-4/5 rounded bg-white/[0.04] group-hover:bg-black/[0.08] transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-5 h-[420px] group relative rounded-2xl overflow-hidden bg-black/70 backdrop-blur-sm border border-white/[0.06] hover:bg-accent-orange hover:border-transparent transition-all duration-300"
            >
              <div className="p-8 h-full flex flex-col justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <BarChart3 className="w-3.5 h-3.5 text-accent-orange/60 group-hover:text-black/50 transition-colors duration-300" />
                    <p className="font-mono text-[10px] text-accent-orange/70 group-hover:text-black/60 tracking-[0.25em] uppercase transition-colors duration-300">// our platforms</p>
                  </div>
                  <h3 className="text-3xl font-black text-white group-hover:text-black tracking-tight mb-3 leading-none transition-colors duration-300">Products</h3>
                  <p className="text-gray-500 group-hover:text-black/70 text-sm leading-relaxed transition-colors duration-300">
                    B2B software designed to solve real operational problems. Owned, deployed, monetized.
                  </p>
                </div>

                {/* Phone mockup with stats */}
                <div className="relative flex items-end gap-3">
                  {/* Mini phone */}
                  <div className="w-20 h-32 rounded-xl border border-white/10 group-hover:border-black/20 bg-[#111]/80 group-hover:bg-black/15 overflow-hidden flex flex-col shrink-0 opacity-60 group-hover:opacity-100 transition-all duration-300">
                    <div className="h-4 flex items-center justify-center border-b border-white/[0.06] group-hover:border-black/10 transition-colors duration-300">
                      <div className="w-6 h-1 rounded-full bg-white/20 group-hover:bg-black/30 transition-colors duration-300" />
                    </div>
                    <div className="flex-1 p-1.5 flex flex-col gap-1">
                      <div className="h-1.5 w-full rounded bg-white/50 group-hover:bg-black/40 transition-colors duration-300" />
                      <div className="h-1.5 w-3/4 rounded bg-white/10 group-hover:bg-black/15 transition-colors duration-300" />
                      <div className="flex-1 rounded bg-white/[0.04] group-hover:bg-black/[0.08] mt-1 transition-colors duration-300" />
                      <div className="h-4 w-full rounded bg-white/60 group-hover:bg-black/50 mt-auto transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Metric bars */}
                  <div className="flex-1 space-y-2.5">
                    {[
                      { label: "Retention", w: "82%", icon: Zap },
                      { label: "Revenue", w: "94%", icon: Database },
                      { label: "Time-to-Value", w: "71%", icon: BarChart3 },
                    ].map(({ label, w, icon: Icon }) => (
                      <div key={label}>
                        <div className="flex justify-between text-[10px] font-mono text-white/30 group-hover:text-black/60 mb-1 transition-colors duration-300">
                          <span className="flex items-center gap-1">
                            <Icon className="w-2.5 h-2.5 text-accent-orange/50 group-hover:text-black/40 transition-colors duration-300" />
                            {label}
                          </span>
                          <span className="text-accent-orange/70 group-hover:text-black font-semibold transition-colors duration-300">{w}</span>
                        </div>
                        <div className="h-[3px] bg-white/[0.05] group-hover:bg-black/20 rounded-full overflow-hidden transition-colors duration-300">
                          <motion.div
                            className="h-full bg-accent-orange/60 group-hover:bg-black/50 rounded-full transition-colors duration-300"
                            initial={{ width: 0 }}
                            whileInView={{ width: w }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Row 2: Open Source — Envy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-[260px] group relative rounded-2xl overflow-hidden bg-black/70 backdrop-blur-sm border border-white/[0.06] hover:bg-accent-orange hover:border-transparent transition-all duration-300"
          >
            <div className="p-8 h-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">

              {/* Left: text */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Github className="w-3.5 h-3.5 text-accent-orange/60 group-hover:text-black/50 transition-colors duration-300" />
                  <p className="font-mono text-[10px] text-accent-orange/70 group-hover:text-black/60 tracking-[0.25em] uppercase transition-colors duration-300">// for the community</p>
                </div>
                <h3 className="text-4xl font-black text-white group-hover:text-black tracking-tight mb-3 leading-none transition-colors duration-300">Open Source</h3>
                <p className="text-gray-500 group-hover:text-black/70 text-sm leading-relaxed mb-5 transition-colors duration-300">
                  Tools built in public. Featuring{" "}
                  <span className="text-white group-hover:text-black font-semibold transition-colors duration-300">Envy</span>{" "}
                  — local-first secret management for developers who care about security.
                </p>
                <Link
                  href="https://github.com/anguria-tech"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-xs font-mono text-white/30 group-hover:text-black/60 transition-colors duration-300 group/link"
                >
                  <span>Explore on GitHub</span>
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right: Envy terminal */}
              <div className="hidden md:flex flex-col rounded-xl bg-black group-hover:bg-black/15 border border-white/[0.07] group-hover:border-black/20 overflow-hidden font-mono text-xs transition-all duration-300">
                <div className="h-8 px-4 flex items-center gap-1.5 border-b border-white/[0.06] group-hover:border-black/10 bg-white/[0.02] shrink-0 transition-colors duration-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/60" />
                  <span className="ml-2 text-white/20 group-hover:text-black/30 text-[10px] transition-colors duration-300">envy — zsh</span>
                </div>
                <div className="p-4 space-y-2 text-[11px]">
                  <div className="flex gap-2">
                    <span className="text-accent-orange group-hover:text-black/70 transition-colors duration-300">$</span>
                    <span className="text-white/60 group-hover:text-black/60 transition-colors duration-300">envy init</span>
                  </div>
                  <div className="text-green-500/60 group-hover:text-black/50 pl-4 transition-colors duration-300">✓ Vault initialized (local-first, encrypted)</div>
                  <div className="flex gap-2">
                    <span className="text-accent-orange group-hover:text-black/70 transition-colors duration-300">$</span>
                    <span className="text-white/60 group-hover:text-black/60 transition-colors duration-300">envy set DATABASE_URL <span className="text-white/25 group-hover:text-black/30 transition-colors duration-300">postgres://...</span></span>
                  </div>
                  <div className="text-green-500/60 group-hover:text-black/50 pl-4 transition-colors duration-300">✓ Secret stored · 0 bytes sent to cloud</div>
                  <div className="flex gap-2">
                    <span className="text-accent-orange group-hover:text-black/70 transition-colors duration-300">$</span>
                    <span className="text-white/60 group-hover:text-black/60 transition-colors duration-300">envy run npm start</span>
                  </div>
                  <div className="text-white/25 group-hover:text-black/40 pl-4 transition-colors duration-300">
                    ↳ Injecting 12 secrets{" "}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                      className="text-accent-orange group-hover:text-black/70 transition-colors duration-300"
                    >_</motion.span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* Tech Stack Marquee */}
      <div className="w-full mb-40 relative z-10 overflow-hidden">
        {/* Fade edges */}
        <div
          className="flex w-full overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            className="flex items-center gap-0 w-max"
          >
            {[...Array(2)].map((_, dupIdx) => (
              <div key={dupIdx} className="flex items-center">
                {[
                  { name: "Rust",       color: "text-[#CE422B]" },
                  { name: "React",      color: "text-[#61DAFB]" },
                  { name: "Next.js",    color: "text-white" },
                  { name: "TypeScript", color: "text-[#3178C6]" },
                  { name: "Node",       color: "text-[#8CC84B]" },
                  { name: "PostgreSQL", color: "text-[#336791]" },
                  { name: "Docker",     color: "text-[#2496ED]" },
                  { name: "AWS",        color: "text-[#FF9900]" },
                  { name: "Tailwind",   color: "text-[#38BDF8]" },
                  { name: "Swift",      color: "text-[#F05138]" },
                  { name: "Kotlin",     color: "text-[#7F52FF]" },
                  { name: "Redis",      color: "text-[#DC382D]" },
                ].map(({ name, color }, i) => (
                  <div key={i} className="flex items-center">
                    <span className={`font-mono text-sm font-semibold tracking-tight whitespace-nowrap px-8 py-5 ${color} opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-default`}>
                      {name}
                    </span>
                    <span className="text-white/[0.06] font-mono text-lg select-none">·</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Divider lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-white/[0.04]" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/[0.04]" />
      </div>


      {/* Footer */}
      <footer id="contact" className="w-full relative z-10 border-t border-white/[0.05] bg-[#000] pt-24 pb-10 overflow-hidden mt-20">
        {/* Top glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-accent-orange/40 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-orange/8 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

        <div className="max-w-screen-xl mx-auto px-6">

          {/* Main CTA + Form grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24 items-start">

            {/* Left: Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-5"
            >
              <p className="font-mono text-[10px] text-accent-orange/70 tracking-[0.25em] uppercase mb-6">
                // start a project
              </p>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.92] mb-6">
                Have a technical<br />
                <span className="text-accent-orange">challenge?</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">
                Tell us what you're building. We'll analyze the structural viability and come back with a direct technical assessment.
              </p>

              {/* Trust signals */}
              <div className="space-y-3">
                {[
                  "Response within 24h",
                  "No NDAs required to start",
                  "Direct line to engineering",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-xs font-mono text-white/30">
                    <span className="w-1 h-1 rounded-full bg-accent-orange/60 inline-block" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/[0.05]">
                <p className="text-xs font-mono text-white/20 mb-2">prefer a call?</p>
                <Link
                  href="https://calendly.com"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-accent-orange transition-colors duration-200 group/cal"
                >
                  <span>Book 15-min technical call</span>
                  <ArrowRight className="w-3 h-3 group-hover/cal:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-7"
            >
              {formStatus === "sent" ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 rounded-2xl border border-white/[0.06] bg-[#0a0a0a]">
                  <div className="w-10 h-10 rounded-full bg-accent-orange/10 border border-accent-orange/30 flex items-center justify-center mb-5">
                    <span className="text-accent-orange text-lg">✓</span>
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">Got it. We'll be in touch.</h3>
                  <p className="text-gray-500 text-sm font-mono">Expect a response within 24 hours.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-8 flex flex-col gap-6"
                >
                  {/* Row: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] text-accent-orange/60 tracking-[0.2em] uppercase">Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Smith"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="bg-transparent border-b border-white/[0.08] focus:border-white/25 outline-none text-white text-sm placeholder:text-white/15 py-2 transition-colors duration-200 font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] text-accent-orange/60 tracking-[0.2em] uppercase">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="bg-transparent border-b border-white/[0.08] focus:border-white/25 outline-none text-white text-sm placeholder:text-white/15 py-2 transition-colors duration-200 font-mono"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-accent-orange/60 tracking-[0.2em] uppercase flex items-center gap-2">
                      <span>What are you building?</span>
                      <span className="text-white/20 normal-case tracking-normal">
                        e.g.{" "}
                        <Typewriter
                          text={[
                            "a custom ERP for 50 users",
                            "an iOS app with 60fps animations",
                            "a client dashboard that sells itself",
                            "a landing page that converts",
                            "internal tooling to replace spreadsheets",
                          ]}
                          speed={38}
                          deleteSpeed={20}
                          waitTime={2500}
                          cursorChar="_"
                          cursorClassName="text-accent-orange/40 ml-0.5"
                          className="text-white/30 font-mono text-[10px]"
                        />
                      </span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your technical challenge, product idea, or the problem you need solved..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="bg-transparent border-b border-white/[0.08] focus:border-white/25 outline-none text-white text-sm placeholder:text-white/15 py-2 transition-colors duration-200 font-mono resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="group relative mt-2 w-full flex items-center justify-center gap-3 bg-accent-orange text-black font-bold text-sm py-4 rounded-xl overflow-hidden transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_30px_-10px_rgba(249,115,22,0.5)]"
                  >
                    {formStatus === "sending" ? (
                      <span className="font-mono text-sm">Sending</span>
                    ) : (
                      <>
                        <span>Send Technical Brief</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/[0.05] text-white/20 text-xs font-mono gap-4">
            <div className="flex items-center gap-2">
              <span className="text-accent-orange font-light text-base leading-none">/ </span>
              <span className="text-white/40 font-black tracking-tighter">ANGURIA</span>
              <span className="text-white/10 ml-2">{dict.footer.rights}</span>
            </div>
            <div className="flex items-center gap-6">
              {dict.footer.links.map((link, i) => (
                <Link key={i} href="#" className="hover:text-white/50 transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </footer>
    </main>
  );
}
