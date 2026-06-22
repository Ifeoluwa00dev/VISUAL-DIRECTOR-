import { useEffect, useState } from "react";
import { ArrowDown, Play, Video } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  name: string;
  discipline: string;
  coverImage: string;
  onExploreClick: () => void;
  onEnterCta: () => void;
  onLeaveCta: () => void;
}

export default function Hero({
  name,
  discipline,
  coverImage,
  onExploreClick,
  onEnterCta,
  onLeaveCta
}: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      if (mediaQuery.matches) return;
      // Map mouse coordinates to percentage shifts around center
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate parallax multipliers
  const bgTransform = prefersReduced
    ? "none"
    : `scale(1.08) translate(${mousePos.x * -12}px, ${mousePos.y * -12}px)`;

  const textTransform = prefersReduced
    ? "none"
    : `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`;

  return (
    <div
      id="hero-section"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black select-none"
    >
      {/* Background Image with Parallax & Dark Overlay */}
      <div
        style={{
          backgroundImage: `url('${coverImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: bgTransform,
          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
        className="absolute inset-0 w-full h-full opacity-65 scale-105 pointer-events-none"
        referrerPolicy="no-referrer"
      />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-[#0C0C0C]/80 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-black/35 pointer-events-none z-10" />
      
      {/* Dynamic scan line effect to look like premium digital film monitor */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] z-20" />

      {/* Hero Content Area */}
      <div 
        style={{ transform: textTransform, transition: "transform 0.3s ease-out" }}
        className="relative z-20 text-center px-6 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Accent Ribbon */}
          <div className="flex items-center space-x-3 mb-6 bg-black/60 border border-[#00F5FF]/20 px-3 py-1.5 rounded-full select-none backdrop-blur-md">
            <Video size={12} className="text-[#00F5FF] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#00F5FF] font-mono leading-none">
              AETHER STUDIOS // PRESENTS
            </span>
          </div>

          {/* Huge Bebas Title */}
          <h1 className="font-display text-7xl sm:text-9xl md:text-[11rem] leading-none tracking-[0.01em] text-white font-black drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            {name}
          </h1>

          {/* Subtitle / Discipline */}
          <p className="mt-4 text-sm sm:text-lg md:text-xl font-light tracking-[0.45em] text-[#ffffff]/80 uppercase font-sans select-none max-w-2xl px-6">
            {discipline}
          </p>

          <p className="mt-3 text-[10px] tracking-[0.3em] font-mono text-[#ffffff]/40 uppercase select-none border-t border-white/10 pt-3 max-w-md">
            Synthesizing Material Reality & Digital Light
          </p>

          {/* Action CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={onExploreClick}
              onMouseEnter={onEnterCta}
              onMouseLeave={onLeaveCta}
              className="px-8 py-3.5 glass text-white/90 hover:border-[#00F5FF] hover:text-[#00F5FF] hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all duration-300 rounded-sm font-mono text-xs tracking-widest relative overflow-hidden group uppercase"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                PROJECTS PORTFOLIO
                <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-[#00F5FF] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out opacity-10" />
            </button>

            <button
              onClick={() => {
                // Focus inquiry
                const inquiryBtn = document.getElementById("app-nav-header");
                if (inquiryBtn) {
                  // Dispatch navigate click
                  onExploreClick();
                }
              }}
              onMouseEnter={onEnterCta}
              onMouseLeave={onLeaveCta}
              className="flex items-center space-x-2 text-xs tracking-[0.25em] font-mono text-[#00F5FF] hover:text-white transition-colors duration-300 uppercase py-2"
            >
              <Play size={12} className="fill-[#00F5FF]" />
              <span>DIRECTOR'S REEL</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Cinematic Bottom Bounds Coordinates Indicator */}
      <div className="absolute bottom-10 left-10 hidden lg:block z-20 font-mono text-[9px] text-[#ffffff]/20 tracking-widest leading-relaxed">
        <div>SYS_REEL_BOOT: ACTIVE [2026]</div>
        <div>COORDINATES: 35.6762° N, 139.6503° E</div>
      </div>

      <div className="absolute bottom-10 right-10 hidden lg:block z-20 font-mono text-[9px] text-[#ffffff]/20 tracking-widest leading-relaxed text-right">
        <div>FPS_MONITOR: 60.0_REFRESH</div>
        <div className="text-[#00F5FF] font-bold">● REC_STBY</div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer hidden sm:flex flex-col items-center"
        onClick={onExploreClick}
      >
        <span className="text-[9px] font-mono tracking-[0.25em] text-[#ffffff]/40 uppercase mb-2">SCROLL TO FILE</span>
        <div className="w-[1.5px] h-12 bg-gradient-to-b from-[#00F5FF] to-transparent" />
      </motion.div>
    </div>
  );
}
