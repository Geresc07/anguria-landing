"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import { getDictionary } from "../i18n/dictionaries";

export default function Home() {
  // Inicializamos el diccionario en español por defecto para esta vista
  // (En el futuro, esto se recibirá vía props desde dynamic routing [lang]/page.tsx)
  const dict = getDictionary('es');

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
      {/* Background Asymmetrical Gradients - Orange Theme */}
      <div className="absolute top-0 right-[-10%] w-[800px] h-[500px] bg-accent-orange/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-accent-orange-dark/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      
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
      <header className="z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen px-4 md:px-8 relative scale-90 sm:scale-95 md:scale-100">
        
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

          <div className="px-6 py-8 md:px-10 md:py-12 flex flex-col items-center justify-center min-h-[400px] text-center">
            
            {/* Badge (Status) - Centered */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 text-[9px] md:text-xs font-mono uppercase tracking-widest text-gray-400 mb-8 border border-white/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange"></span>
              </span>
              {dict.hero.badge}
            </motion.div>
            
            {/* Animated Typeline Container - Centered */}
            <div className="flex items-center justify-center text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter leading-none h-[1.1em] mb-8">
               {renderTypedText()}
               <motion.span 
                 animate={{ opacity: [1, 1, 0, 0, 1] }} 
                 transition={{ repeat: Infinity, duration: 0.8 }}
                 className="text-accent-orange ml-2 md:ml-4 font-light"
               >
                 _
               </motion.span>
            </div>

            {/* Hero Conversion Section embedded inside terminal - Centered */}
            {isSubmitted && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex flex-col items-center gap-8"
                >
                  <div className="max-w-2xl px-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-8 leading-tight tracking-tight">
                      {dict.hero.titleLine1}{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-orange-glow block md:inline">
                        {dict.hero.titleLine2}
                      </span>
                    </h1>
                    <p className="text-gray-400 text-xs md:text-base leading-relaxed font-sans max-w-xl mx-auto">
                      {dict.hero.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-8 w-full sm:w-auto">
                    <Link 
                      href="https://calendly.com" 
                      target="_blank"
                      className="group relative inline-flex items-center justify-center gap-3 bg-accent-orange text-black px-8 md:px-10 py-3.5 md:py-4 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_-10px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_-10px_rgba(249,115,22,0.6)] w-full sm:min-w-[280px] whitespace-nowrap text-sm md:text-base"
                    >
                      <span>{dict.hero.ctaPrimary}</span>
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <Link 
                      href="#solutions"
                      className="inline-flex items-center justify-center gap-2 group py-2 px-6 rounded-lg hover:bg-white/5 transition-all active:scale-[0.98]"
                    >
                      <Terminal className="w-3.5 h-3.5 text-accent-orange-dark group-hover:text-accent-orange transition-colors" />
                      <span className="text-gray-400 text-xs md:text-sm font-medium group-hover:text-white transition-colors">{dict.hero.ctaSecondary}</span>
                    </Link>
                  </div>
                </motion.div>
            )}
          </div>
        </motion.div>
      </header>

      {/* spacer */}
      <div className="h-32 lg:h-48 w-full" />

      {/* Services Section: The Triforce (Awwwards Inspired Bento Grid) */}
      <section id="solutions" className="w-full max-w-screen-2xl mx-auto px-6 mb-40 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
        >
          <div>
            <h2 className="text-accent-orange text-sm font-mono tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-accent-orange"></span> {dict.services.badge}
            </h2>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
              {dict.services.title1} <br /> <span className="text-gray-600">{dict.services.title2}</span>
            </h3>
          </div>
          <p className="text-gray-400 max-w-md text-lg leading-relaxed">
            {dict.services.description}
          </p>
        </motion.div>

        {/* The Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full auto-rows-[400px]">
          
          {/* Card 1: Custom WebApps (Spans 8 columns) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-8 group relative rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-accent-orange/30 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent z-10 pointer-events-none" />
            <div className="absolute -inset-10 bg-accent-orange/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="p-10 h-full flex flex-col justify-between relative z-20">
              <div className="flex justify-between items-start">
                <div className="text-8xl font-black text-white/5 tracking-tighter group-hover:text-accent-orange/10 transition-colors duration-500 line-clamp-1">{dict.services.card1.num}</div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent-orange group-hover:border-accent-orange transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
              
              <div>
                <h4 className="text-3xl font-bold text-white mb-3">{dict.services.card1.title}</h4>
                <p className="text-gray-400 max-w-md">{dict.services.card1.desc}</p>
              </div>
            </div>

            {/* Abstract Tech Graphic */}
            <div className="absolute right-0 bottom-0 w-2/3 h-2/3 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-full h-full border-t border-l border-white/10 rounded-tl-[100px] relative overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-3xl">
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-overlay"></div>
                <div className="w-full h-full grid grid-cols-6 grid-rows-6">
                  {Array.from({length: 36}).map((_, i) => (
                    <div key={i} className="border-r border-b border-white/[0.05] h-full w-full" />
                  ))}
                </div>
                <motion.div 
                   animate={{ left: ["-10%", "110%"] }} 
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className="absolute top-1/2 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-accent-orange to-transparent" 
                />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Mobile Apps (Spans 4 columns) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-4 group relative rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-accent-orange/30 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent z-10 pointer-events-none" />
            
            <div className="p-10 h-full flex flex-col justify-between relative z-20">
              <div className="flex justify-between items-start">
                <div className="text-8xl font-black text-white/5 tracking-tighter group-hover:text-accent-orange/10 transition-colors duration-500">{dict.services.card2.num}</div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent-orange group-hover:border-accent-orange transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
              
              <div>
                <h4 className="text-3xl font-bold text-white mb-3">{dict.services.card2.title}</h4>
                <p className="text-gray-400">{dict.services.card2.desc}</p>
              </div>
            </div>

            {/* Glowing orb decorative */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-orange/20 blur-[60px] rounded-full group-hover:bg-accent-orange/40 transition-colors duration-500" />
          </motion.div>

          {/* Card 3: Client Areas (Spans 5 columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-5 h-full group relative rounded-3xl overflow-hidden bg-accent-orange text-black transition-transform duration-500 hover:scale-[1.01]"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
            
            <div className="p-10 h-full flex flex-col justify-between relative z-20">
              <div className="flex justify-between items-start mb-8">
                <div className="text-6xl font-black text-black/10 tracking-tighter">{dict.services.card3.num}</div>
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center group-hover:bg-white transition-colors duration-300 shadow-xl">
                  <ArrowRight className="w-5 h-5 text-accent-orange group-hover:text-black" />
                </div>
              </div>

              <div>
                <h4 className="text-3xl font-black mb-3 tracking-tight">{dict.services.card3.title}</h4>
                <p className="text-black/80 font-medium">
                  {dict.services.card3.desc}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Conversion-Engine Web Platforms (Spans 7 columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-7 group relative rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-accent-orange/30 transition-colors duration-500"
          >
            <div className="absolute -inset-10 bg-gradient-to-tr from-accent-orange/5 to-transparent blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
            
            <div className="p-10 h-full flex flex-col justify-between relative z-20">
              <div className="flex justify-between items-start">
                <div className="text-8xl font-black text-white/5 tracking-tighter group-hover:text-accent-orange/10 transition-colors duration-500">{dict.services.card4.num}</div>
              </div>
              
              <div className="relative z-30 max-w-xs md:max-w-sm lg:max-w-md pr-4">
                <h4 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">{dict.services.card4.title}</h4>
                <p className="text-gray-400 text-sm md:text-base drop-shadow-md">{dict.services.card4.desc}</p>
              </div>
            </div>

            {/* Cognitive Psychology Visuals - Goal-Gradient & AIDA Funnel */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-[90%] sm:w-[350px] lg:w-[450px] flex flex-col justify-end md:justify-center p-6 sm:p-10 opacity-30 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"
              style={{ maskImage: 'linear-gradient(to right, transparent, black 15%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%)' }}
            >
              <div className="space-y-3 w-full bg-[#111]/95 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl relative translate-y-4 group-hover:-translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1] shadow-[0_0_40px_-15px_rgba(249,115,22,0.2)]">
                
                <div className="w-full flex justify-between text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest">
                  <span>Attention</span> <span className="text-white">100%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-white/20"></div>
                </div>

                <div className="w-full flex justify-between text-[10px] md:text-xs font-mono text-gray-400 uppercase tracking-widest">
                  <span>Desire (Mimetic)</span> <span className="text-accent-orange">68%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-accent-orange/50" initial={{ width: 0 }} whileInView={{ width: "68%" }} transition={{ delay: 0.5, duration: 1 }} />
                </div>

                <div className="w-full flex justify-between text-[10px] md:text-xs font-mono text-accent-orange font-bold uppercase tracking-widest mt-3">
                  <span>Action (Conversion)</span> <span>+300%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                  <motion.div className="h-full bg-accent-orange relative overflow-hidden" initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ delay: 1, duration: 1.5 }}>
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-[200%] animate-[translateX_2s_infinite]" style={{ animation: "slide 2s linear infinite" }} />
                  </motion.div>
                </div>
                
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Social Proof & Metrics Section */}
      <section className="w-full max-w-screen-2xl mx-auto px-6 mb-40 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center text-center mb-20"
        >
          <h2 className="text-accent-orange text-sm font-mono tracking-widest uppercase mb-6 flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-accent-orange"></span> 
            {dict.social.badge}
            <span className="w-8 h-[1px] bg-accent-orange"></span>
          </h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
            {dict.social.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-orange-glow">{dict.social.title2}</span>
          </h3>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 w-full max-w-5xl mx-auto mb-32">
          {dict.social.metrics.map((metric, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center bg-[#0a0a0a] p-12 rounded-3xl border border-white/5 hover:border-accent-orange/30 transition-all duration-500 relative overflow-hidden group hover:-translate-y-2"
            >
              <div className="absolute -inset-10 bg-accent-orange/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay group-hover:opacity-30 transition-opacity duration-700" />
              
              <div className="text-6xl md:text-7xl font-black text-white tracking-tighter mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                {metric.value}
              </div>
              <div className="text-sm font-mono tracking-widest text-accent-orange uppercase relative z-10 text-center">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Raycast-style Terminal Widget incorporated in Social Section */}
        <div className="w-full max-w-4xl mx-auto mb-32 relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-orange/10 to-transparent rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-2xl border border-white/10 bg-[#111]/90 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden relative transition-transform duration-700 hover:scale-[1.01]"
          >
            {/* Mac OS Window Controls */}
            <div className="h-10 px-4 flex items-center gap-2 border-b border-white/5 bg-white/[0.03]">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80" />
              <div className="ml-2 flex items-center text-xs font-mono text-gray-500 gap-2">
                <Terminal className="w-3.5 h-3.5" />
                terminal@anguria-systems:~
              </div>
            </div>

            {/* Raycast pseudo-Input */}
            <div className="px-6 py-5 border-b border-white/5 flex items-center gap-4 bg-white/[0.01]">
              <div className="text-accent-orange font-mono font-bold text-lg">λ</div>
              <div className="text-base font-mono text-gray-400 relative flex items-center w-full">
                <span className="text-white mr-2">deploy</span> --env production --optimize-revenue
                <motion.div 
                  className="h-5 w-[2px] bg-accent-orange ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
            </div>

            {/* Animated Output Lines */}
            <div className="p-6 font-mono text-sm text-gray-400 flex flex-col gap-4 relative bg-black/40 min-h-[200px]">
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent z-10" />

              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <span className="text-white/30">01:05:12</span> 
                <span className="text-accent-orange/70">[sys]</span> 
                Analyzing project constraints... 
                <span className="text-green-500 ml-auto font-bold border border-green-500/30 px-2 py-0.5 rounded text-xs bg-green-500/10">OK</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <span className="text-white/30">01:05:13</span> 
                <span className="text-accent-orange/70">[sys]</span> 
                Bypassing standard templates. Injecting custom structural logic... 
                <span className="text-green-500 ml-auto font-bold border border-green-500/30 px-2 py-0.5 rounded text-xs bg-green-500/10">DONE</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2.1, duration: 0.4 }}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-white/30">01:05:14</span> 
                  <span className="text-accent-orange/70">[build]</span> 
                  Compiling High-Performance Assets...
                </div>
                <div className="text-white/40 pl-[124px]">↳ 60fps animations loaded and optimized.</div>
                <div className="text-white/40 pl-[124px]">↳ DOM payload minimized by 80%.</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 3.2, duration: 0.4 }}
                className="text-accent-orange font-bold mt-4 flex items-center gap-3 bg-accent-orange/10 p-3 rounded-lg border border-accent-orange/20"
              >
                <span className="animate-pulse">✦</span> System deployed successfully. Market dominance protocols engaged.
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Trusted By Infinite Marquee */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full flex flex-col items-center"
        >
          <p className="text-gray-500 font-mono text-sm uppercase tracking-widest mb-10">
            {dict.social.trusted}
          </p>
          <div 
            className="flex w-full overflow-hidden relative"
            style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
          >
             <motion.div 
               animate={{ x: ["0%", "-50%"] }}
               transition={{ duration: 30, ease: "linear", repeat: Infinity }}
               className="flex items-center gap-16 md:gap-32 w-max whitespace-nowrap opacity-40 hover:opacity-100 transition-opacity duration-500"
             >
               {/* Simulating company names. In real-life we would use SVG logos */}
               {[...Array(2)].map((_, i) => (
                 <div key={i} className="flex items-center gap-16 md:gap-32 px-8">
                   <span className="text-3xl font-black tracking-tight text-white/80">WINDER</span>
                   <span className="text-3xl font-black tracking-tight opacity-20 text-accent-orange">/</span>
                   <span className="text-3xl font-black tracking-tight text-white/80">SERVO</span>
                   <span className="text-3xl font-black tracking-tight opacity-20 text-accent-orange">/</span>
                   <span className="text-3xl font-black tracking-tight text-white/80">KAREBAPP</span>
                   <span className="text-3xl font-black tracking-tight opacity-20 text-accent-orange">/</span>
                   <span className="text-3xl font-black tracking-tight text-white/80">SteveJOBS</span>
                   <span className="text-3xl font-black tracking-tight opacity-20 text-accent-orange">/</span>
                   <span className="text-3xl font-black tracking-tight text-white/80">CodecGenius</span>
                   <span className="text-3xl font-black tracking-tight opacity-20 text-accent-orange">/</span>
                   <span className="text-3xl font-black tracking-tight text-white/80">AeroTracker</span>
                 </div>
               ))}
             </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Giant CTA & Minimal Footer */}
      <footer className="w-full relative z-10 border-t border-white/5 bg-[#050505] pt-32 pb-8 overflow-hidden mt-20">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-accent-orange/50 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-orange/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
        
        <div className="max-w-screen-2xl mx-auto px-6 flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-[8rem] font-black tracking-tighter text-center leading-[0.9] mb-8"
          >
            {dict.footer.ctaTitle1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-orange-glow">
              {dict.footer.ctaTitle2}
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-xl text-center text-lg md:text-xl mb-12"
          >
            {dict.footer.ctaDescription}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-32"
          >
            <Link 
              href="https://calendly.com" 
              target="_blank"
              className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-full text-lg font-bold overflow-hidden transition-all hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]"
            >
              <div className="absolute inset-0 bg-accent-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">{dict.footer.ctaButton}</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </motion.div>

          {/* Minimal Bottom section */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-gray-500 text-sm font-medium gap-4">
            <div>{dict.footer.rights}</div>
            <div className="flex items-center gap-6">
              {dict.footer.links.map((link, i) => (
                <Link key={i} href="#" className="hover:text-accent-orange transition-colors">
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
