import React, { useState } from "react";
import { ClientInquiry, ArtistBio } from "../types";
import { ArrowUpRight, Send, Flame, Mail, Sparkles, MapPin, CheckCircle, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactSectionProps {
  bio: ArtistBio;
  onAddInquiry: (inquiry: Omit<ClientInquiry, "id" | "createdAt">) => void;
  onEnterCta: () => void;
  onLeaveCta: () => void;
}

export default function ContactSection({
  bio,
  onAddInquiry,
  onEnterCta,
  onLeaveCta
}: ContactSectionProps) {
  
  // State for form controls
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budgetRange, setBudgetRange] = useState("$3,000 - $8,000");
  const [message, setMessage] = useState("");
  
  // Custom states for hud notification and simulated API load
  const [isSending, setIsSending] = useState(false);
  const [transmissionSuccess, setTransmissionSuccess] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const budgetOptions = [
    { label: "Boutique", val: "$1,000 - $3,000" },
    { label: "Standard Studio", val: "$3,000 - $8,000" },
    { label: "Premium Director", val: "$8,000 - $15,000" },
    { label: "Bespoke Scale", val: "$15,000+" }
  ];

  const projectTypes = [
    "Cinematography & Scenic Short Film",
    "3D Virtual Direction & Shader Design",
    "Avant-Garde Silhouettes Portrait Shoot",
    "Experimental Atmospheric VFX Compositing",
    "Bespoke Physical Gallery Exhibition"
  ];

  // Helper clear form helper
  const handleClearForm = () => {
    setName("");
    setEmail("");
    setProjectType("");
    setBudgetRange("$3,000 - $8,000");
    setMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !projectType || !message) return;

    setIsSending(true);
    setLogs(["RESOLVING_DNS_RELAY...", "CONNECTING_RESEND_SERVERS...", "RECEPTOR_PORT_ESTABLISHED."]);

    // Simulated terminal transmission timelines for maximum cyberpunk cinematic design feel
    setTimeout(() => {
      setLogs((prev) => [...prev, "DATA_ENCRYPTED_SHA256.", "TRANSMITTING_METADATA_HEADER..."]);
    }, 700);

    setTimeout(() => {
      // Direct write into global inquiry logs
      onAddInquiry({
        name,
        email,
        projectType,
        budgetRange,
        message
      });

      setLogs((prev) => [...prev, "TELEMETRY_LOGGED_SUCCESSFULLY.", "DISPATCH_THREAD: OK."]);
      setTransmissionSuccess(true);
      setIsSending(false);
      handleClearForm();
    }, 1800);
  };

  return (
    <section id="contact-form-section" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Intro section heading */}
      <div className="border-b border-white/5 pb-8 mb-16">
        <span className="text-[10px] tracking-[0.3em] text-[#00F5FF] font-mono uppercase block mb-3">
          SEC_04 // COMMUNICATOR CHANNELS
        </span>
        <h2 className="font-display text-5xl md:text-6xl tracking-wider text-white col-span-12">
          INQUIRE PRODUCTION
        </h2>
      </div>

      <div className="grid grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Coordinates details & Social parameters */}
        <div className="col-span-12 md:col-span-5 space-y-10">
          
          <div className="space-y-4">
            <span className="text-[9px] tracking-[0.25em] text-[#ffffff]/40 font-mono uppercase block">
              INTAKE INSTRUCTIONS
            </span>
            <p className="text-sm font-sans font-light tracking-wide text-white/75 leading-relaxed max-w-sm">
              Please declare your artistic constraints, timeline bounds, and conceptual outlines. Our intake queue typically resolves within 48 standard business hours.
            </p>
          </div>

          {/* Quick core coordinates blocks */}
          <div className="space-y-6 border-t border-white/5 pt-8 font-mono text-[10px]">
            <div className="flex items-center space-x-3 text-white/50">
              <Mail size={14} className="text-[#00F5FF]" />
              <div>
                <span className="uppercase text-[8px] text-[#ffffff]/35 block leading-none">Primary Server Relay</span>
                <a href="mailto:kaien.chen@aetherstudios.io" className="text-white font-sans hover:text-[#00F5FF] transition-colors">kaien.chen@aetherstudios.io</a>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-white/50">
              <MapPin size={14} className="text-[#00F5FF]" />
              <div>
                <span className="uppercase text-[8px] text-[#ffffff]/35 block leading-none">Studio Coordinates</span>
                <span className="text-white font-sans">Meguro-ku // Tokyo, Japan</span>
              </div>
            </div>
          </div>

          {/* Social Links directory lists */}
          <div className="space-y-4 border-t border-white/5 pt-8">
            <span className="text-[9px] tracking-[0.25em] text-[#ffffff]/40 font-mono uppercase block">
              SOCIAL PLATFORMS
            </span>
            <div className="grid grid-cols-2 gap-3 max-w-sm">
              {bio.socialLinks.map((soc) => (
                <a
                  key={soc.id}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={onEnterCta}
                  onMouseLeave={onLeaveCta}
                  className="flex items-center justify-between border border-white/5 bg-white/[0.01] hover:bg-[#00F5FF]/5 hover:border-[#00F5FF]/20 px-4 py-3 rounded-sm transition-all duration-300 group"
                >
                  <span className="font-mono text-[9px] uppercase text-[#ffffff]/60 group-hover:text-white leading-none">
                    {soc.platform}
                  </span>
                  <ArrowUpRight size={11} className="text-[#ffffff]/40 group-hover:text-[#00F5FF] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Security stamp representing premium details */}
          <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-sm max-w-sm hidden md:block">
            <div className="flex items-center space-x-2 text-emerald-400 mb-1.5 font-mono text-[9px]">
              <Terminal size={11} />
              <span className="uppercase tracking-widest font-black">RESEND RELAY ENGAGED</span>
            </div>
            <p className="text-[10px] text-[#ffffff]/40 leading-relaxed font-sans font-light">
              Secure transmission channel certified active. Incoming logs routed via TLS 1.3 protocol.
            </p>
          </div>

        </div>

        {/* Right Column: Dynamic Form UI */}
        <div className="col-span-12 md:col-span-7 bg-[#101010]/55 border border-white/5 p-8 sm:p-10 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm relative overflow-hidden">
          
          {/* Subtle electric color flare light inside form corner */}
          <div className="absolute -top-12 -right-12 h-24 w-24 bg-[#00F5FF] blur-[60px] opacity-20 pointer-events-none" />

          {/* Senders Transmission Screen Overlay */}
          <AnimatePresence>
            {(isSending || transmissionSuccess) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 bg-black/95 flex flex-col items-center justify-center p-8 select-none text-center"
              >
                {isSending ? (
                  <div className="space-y-6 w-full max-w-md">
                    {/* Glowing status */}
                    <div className="flex justify-center">
                      <Send size={32} className="text-[#00F5FF] animate-pulse" />
                    </div>
                    
                    <h4 className="font-display text-2xl tracking-widest text-white uppercase">
                      TRANSMITTING LOGICAL BINDINGS
                    </h4>

                    {/* Log screen console */}
                    <div className="bg-black border border-white/15 p-4 rounded text-left font-mono text-[9px] text-[#00F5FF] space-y-1 select-text h-32 overflow-y-auto shadow-inner">
                      {logs.map((logStr, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <span className="text-[#ffffff]/25">&gt;</span>
                          <span className="leading-relaxed whitespace-pre-wrap">{logStr}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-[10px] text-white/40 tracking-wider">Please do not sever connection.</p>
                  </div>
                ) : (
                  <div className="space-y-6 max-w-md">
                    <div className="flex justify-center">
                      <CheckCircle size={44} className="text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)] rounded-full" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-display text-3xl tracking-widest text-[#00F5FF] uppercase leading-none">
                        TRANSMISSION LOGGED
                      </h4>
                      <p className="text-[9px] font-mono tracking-widest text-white/50 uppercase">
                        RECEPTOR PORT: 3000 // SUCCESS REGISTERED
                      </p>
                    </div>

                    <p className="text-xs text-[#ffffff]/60 font-sans font-light leading-relaxed">
                      Thank you for the inquiry. Conceptual parameters have been successfully logged, indexed, and made available inside your integrated **CMS CENTRAL** inquiries dashboard!
                    </p>

                    <button
                      onClick={() => setTransmissionSuccess(false)}
                      onMouseEnter={onEnterCta}
                      onMouseLeave={onLeaveCta}
                      className="px-6 py-2 border border-[#00F5FF] hover:bg-[#00F5FF]/5 text-[#00F5FF] rounded-full font-mono text-[9px] tracking-widest uppercase cursor-pointer"
                    >
                      SEND ANOTHER RELAY
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-2 gap-4">
              {/* Name field */}
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-[9px] font-mono tracking-widest uppercase text-[#ffffff]/50 flex items-center space-x-1.5">
                  <span>SENDERS NAME *</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full bg-black/60 border border-white/10 p-3.5 text-xs text-white placeholder-white/20 hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm font-sans"
                />
              </div>

              {/* Email field */}
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-[9px] font-mono tracking-widest uppercase text-[#ffffff]/50">
                  EMAIL ENCRYPTION RELAY *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@syntheticalabs.io"
                  className="w-full bg-black/60 border border-white/10 p-3.5 text-xs text-white placeholder-white/20 hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm font-sans"
                />
              </div>
            </div>

            {/* Production drop-down select option */}
            <div className="space-y-2">
              <label className="text-[9px] font-mono tracking-widest uppercase text-[#ffffff]/50 block">
                PRODUCTION SYSTEM CATEGORY *
              </label>
              <select
                required
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full bg-black/60 border border-white/10 p-3.5 text-xs text-white hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm font-sans uppercase tracking-wider"
              >
                <option value="" disabled className="bg-[#121212] py-2 text-white/50">Select production class...</option>
                {projectTypes.map((t, idx) => (
                  <option key={idx} value={t} className="bg-[#121212] py-2 whitespace-pre text-white">
                    {t.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget range pills cards */}
            <div className="space-y-2">
              <label className="text-[9px] font-mono tracking-widest uppercase text-[#ffffff]/50 block">
                ESTIMATED CONSTRAINTS / BUDGET RANGE *
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {budgetOptions.map((opt) => (
                  <div
                    key={opt.val}
                    onClick={() => setBudgetRange(opt.val)}
                    onMouseEnter={onEnterCta}
                    onMouseLeave={onLeaveCta}
                    className={`border p-3 rounded-sm text-center cursor-pointer transition-all ${
                      budgetRange === opt.val
                        ? "bg-[#00F5FF]/10 border-[#00F5FF] text-[#00F5FF] shadow-[0_0_10px_rgba(0,245,255,0.15)]"
                        : "bg-black/40 border-white/10 hover:border-white/20 text-white/60 hover:text-white"
                    }`}
                  >
                    <div className="text-[8px] font-mono uppercase tracking-[0.15em] text-[#ffffff]/35 mb-1">{opt.label}</div>
                    <div className="text-[10px] font-mono font-semibold">{opt.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message field */}
            <div className="space-y-2">
              <label className="text-[9px] font-mono tracking-widest uppercase text-[#ffffff]/50">
                ATMOSPHERE, REFERENCES & SPECIFICATIONS *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe project details (e.g., moody landscape lighting, holographic 3D layouts, cinematic ratios, expected date frames...)"
                className="w-full bg-black/60 border border-white/10 p-3.5 text-xs text-white placeholder-white/20 hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm font-sans leading-relaxed resize-none"
              />
            </div>

            {/* Transmit action */}
            <div className="pt-2">
              <button
                type="submit"
                onMouseEnter={onEnterCta}
                onMouseLeave={onLeaveCta}
                className="w-full py-4 bg-[#00F5FF] text-black font-mono text-[10px] font-black tracking-[0.25em] hover:bg-white hover:text-black transition-all rounded-sm uppercase flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(0,245,255,0.25)] hover:shadow-[0_0_25px_rgba(0,245,255,0.4)] cursor-pointer"
              >
                <span>TRANSMIT REEL REQUIREMENTS</span>
                <Send size={11} className="-rotate-12 group-hover:rotate-0 transition-transform" />
              </button>
            </div>

          </form>

        </div>

      </div>

    </section>
  );
}
