import React from "react";
import { ArtistBio } from "../types";
import { Download, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface AboutSectionProps {
  bio: ArtistBio;
  onEnterCta: () => void;
  onLeaveCta: () => void;
}

export default function AboutSection({ bio, onEnterCta, onLeaveCta }: AboutSectionProps) {
  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Create a mock CV data file download to make this fully functional and delightful!
    const cvText = `
=============================================
KAIEN CHEN // VISUALS THAT CAPTURE THE SUBLIME
=============================================
PORTFOLIO: AETHER STUDIOS CINEMATOGRAPHY
EMAIL: kaien.chen@aetherstudios.io
DISCIPLINE: VISUAL DIRECTOR & DIGITAL ARTIST

BIO:
${bio.bioText}

PHILOSOPHY:
${bio.philosophy}

SELECTED CLIENTS:
${bio.selectedClients.map((c) => `- ${c.name}`).join("\n")}

SERVICES OFFERED:
- Cinematography & Drone Short Film Direction
- Photorealistic 3D Spatial Arts Modeling
- Avant-Garde Stark Silhouette Editorial Photoshoots
- Atmospheric Compositing & Soundscapes
=============================================
Downloaded via Cinematic Visual Portfolio Platform [2026]
    `;

    const blob = new Blob([cvText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `KAIEN_CHEN_CV_2026.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="about-profile-section" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Intro separator */}
      <div className="border-b border-white/5 pb-8 mb-16">
        <span className="text-[10px] tracking-[0.3em] text-[#00F5FF] font-mono uppercase block mb-3">
          SEC_02 // INTERNAL DOSSIER
        </span>
        <h2 className="font-display text-5xl md:text-6xl tracking-wider text-white">
          THE ARTIST PROFILE
        </h2>
      </div>

      <div className="grid grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Portrait */}
        <div className="col-span-12 md:col-span-5 relative group">
          <div className="relative border border-white/10 rounded-sm overflow-hidden bg-black aspect-[3/4] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <img
              src={bio.portrait}
              alt={bio.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out"
            />
            {/* Elegant vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 border border-white/5 group-hover:border-[#00F5FF]/20 transition-colors pointer-events-none" />
          </div>

          {/* Quick status badge absolute overlay */}
          <div className="absolute -bottom-4 -right-4 bg-[#0C0C0C] border border-white/10 px-4 py-3 rounded-sm flex items-center space-x-3 shadow-2xl">
            <div className="h-2 w-2 rounded-full bg-[#00F5FF] animate-ping" />
            <div className="h-2 w-2 rounded-full bg-[#00F5FF] absolute left-[12px] top-[18px]" />
            <div className="font-mono text-[9px] tracking-widest text-[#ffffff]/80 uppercase">
              STATUS: {bio.availability}
            </div>
          </div>
        </div>

        {/* Right Column: Bio detailing & Client list */}
        <div className="col-span-12 md:col-span-7 space-y-10">
          
          {/* Headline details */}
          <div className="space-y-4">
            <h3 className="font-display text-4xl text-white uppercase tracking-wider leading-none">
              {bio.name}
            </h3>
            <p className="text-[#00F5FF] font-mono text-xs tracking-[0.3em] uppercase">
              {bio.discipline}
            </p>
            <p className="text-white/70 font-sans font-light text-sm tracking-wide leading-relaxed pt-2 max-w-2xl">
              {bio.bioText}
            </p>
          </div>

          {/* Philosophy spotlight callout box */}
          <div className="border-l-[1.5px] border-[#00F5FF] pl-6 py-2 bg-gradient-to-r from-[#00F5FF]/5 to-transparent rounded-r-md">
            <span className="text-[9px] tracking-[0.25em] text-[#00F5FF] font-mono uppercase block mb-1.5 flex items-center space-x-1">
              <Sparkles size={11} />
              <span>DIRECTOR PHILOSOPHY STATEMENTS</span>
            </span>
            <blockquote className="font-sans italic text-white/90 text-[13px] tracking-wide leading-relaxed font-light">
              "{bio.philosophy}"
            </blockquote>
          </div>

          {/* Selected Client Grid */}
          <div className="space-y-4">
            <span className="text-[9px] tracking-[0.25em] text-[#ffffff]/40 font-mono uppercase block">
              SELECTED CLIENTS LOGOS & CREDITS
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {bio.selectedClients.map((client) => (
                <div
                  key={client.id}
                  className="bg-white/[0.02] border border-white/5 px-4 py-4 rounded-sm text-center flex items-center justify-center hover:bg-white/[0.04] hover:border-white/10 transition-colors"
                >
                  <span className="text-[10px] tracking-widest uppercase font-mono text-[#ffffff]/60 group-hover:text-white select-none">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Curriculum Vitae */}
          <div className="pt-6">
            <button
              onClick={handleDownloadCV}
              onMouseEnter={onEnterCta}
              onMouseLeave={onLeaveCta}
              className="flex items-center space-x-2 border border-white/10 hover:border-[#00F5FF] bg-white/[0.01] hover:bg-[#00F5FF]/5 px-6 py-3 rounded-sm text-xs tracking-widest text-[#ffffff]/80 hover:text-white transition-all uppercase font-mono shadow-md cursor-pointer"
            >
              <Download size={14} className="text-[#00F5FF]" />
              <span>DOWNLOAD CURRICULUM VITAE</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
