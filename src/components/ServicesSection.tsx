import { ServiceItem } from "../types";
import { CircleCheck, FileCode, Gem, Sparkle } from "lucide-react";
import { motion } from "motion/react";

interface ServicesSectionProps {
  services: ServiceItem[];
  onEnterCta: () => void;
  onLeaveCta: () => void;
}

export default function ServicesSection({ services, onEnterCta, onLeaveCta }: ServicesSectionProps) {
  
  // Custom toolkits & deliverables mapping based on services to enrich visual realism
  const getServiceAddons = (id: string) => {
    switch (id) {
      case "srv_1":
        return {
          deliverables: ["4K Master ProRes Export", "Multi-cam capture setups", "Full drone landscape flyovers", "Premium audio dub soundtrack blending"],
          tools: "RED Raptor 8K, DJI Inspire 3 Cine, DaVinci Resolve Studio"
        };
      case "srv_2":
        return {
          deliverables: ["Source .blend/.fbx files", "High-res neon shader designs", "Spatial projection diagrams", "Dynamic web gl assets"],
          tools: "Blender 4.2, Unreal Engine 5.5, Adobe Substance Painter"
        };
      case "srv_3":
        return {
          deliverables: ["15 edited high-contrast TIFF files", "Raw negative assets included", "Commercial publication release contract", "Custom makeup direction sheets"],
          tools: "Hasselblad H6D-100c, Profoto neon flashes, Capture One Pro"
        };
      default:
        return {
          deliverables: ["Final masked master file matching log templates", "VFX project layers", "Dynamic camera tracking presets", "Simulated smoke arrays"],
          tools: "Adobe After Effects, Houdini VFX, Nuke Studio"
        };
    }
  };

  return (
    <section id="services-grid-section" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Intro section */}
      <div className="border-b border-white/5 pb-8 mb-16">
        <span className="text-[10px] tracking-[0.3em] text-[#00F5FF] font-mono uppercase block mb-3">
          SEC_03 // STUDIO COMPETENCIES
        </span>
        <h2 className="font-display text-5xl md:text-6xl tracking-wider text-white">
          OFFERED CAPABILITIES & SERVICES
        </h2>
      </div>

      <div className="grid grid-cols-12 gap-8 md:gap-12">
        {services.map((item) => {
          const addOn = getServiceAddons(item.id);

          return (
            <div
              key={item.id}
              className="col-span-12 md:col-span-6 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#00F5FF]/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] p-8 sm:p-10 rounded-sm transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle inner spotlight blur badge */}
              <div className="absolute top-0 right-0 h-24 w-24 bg-[radial-gradient(ellipse_at_top_right,rgba(0,245,255,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="space-y-6">
                
                {/* Header title */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-widest text-[#00F5FF]/60 bg-[#00F5FF]/5 border border-[#00F5FF]/10 px-2.5 py-1 rounded">
                      CAPABILITY_{item.id.toUpperCase()}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wider uppercase mt-3">
                      {item.title}
                    </h3>
                  </div>

                  {/* Starting rate */}
                  {item.startingPrice && (
                    <div className="text-right">
                      <span className="text-[8px] font-mono tracking-widest text-[#ffffff]/30 uppercase block">Starting rate</span>
                      <span className="text-[#00F5FF] font-mono text-sm tracking-widest font-semibold">{item.startingPrice}</span>
                    </div>
                  )}
                </div>

                {/* Main description details */}
                <p className="text-xs text-[#ffffff]/60 font-sans tracking-wide leading-relaxed font-light">
                  {item.description}
                </p>

                {/* Deliverable points checklists */}
                <div className="space-y-2 border-t border-white/5 pt-4">
                  <div className="text-[9px] font-mono tracking-widest uppercase text-white/40">DELIVERABLES INCLUDED //</div>
                  <ul className="space-y-1.5">
                    {addOn.deliverables.map((del, index) => (
                      <li key={index} className="flex items-center space-x-2 text-[10px] text-white/70 font-sans font-light">
                        <CircleCheck size={11} className="text-[#00F5FF] flex-shrink-0" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tools row footer */}
              <div className="border-t border-white/5 pt-4 mt-6">
                <span className="text-[8px] font-mono tracking-widest uppercase text-[#ffffff]/25 block">TOOLKIT UTILITIES</span>
                <span className="text-[9px] font-mono text-white/50">{addOn.tools}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking prompt */}
      <div className="mt-16 bg-gradient-to-r from-white/[0.01] to-white/[0.02] border border-white/5 rounded-sm p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <h4 className="font-display text-2xl text-white tracking-wider">HAVE A CUSTOM PRODUCTION REQUIREMENT?</h4>
          <p className="text-xs text-white/50 font-sans leading-relaxed">
            I specialize in developing tailored multi-disciplinary installations and bespoke visuals for magazines, exhibitions, and musical releases. Let's configure a plan suited to your budget parameters.
          </p>
        </div>
        
        <button
          onClick={() => {
            const contactSection = document.getElementById("contact-form-section");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          onMouseEnter={onEnterCta}
          onMouseLeave={onLeaveCta}
          className="px-6 py-3.5 bg-[#00F5FF] text-black font-mono text-[10px] font-bold tracking-widest hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all rounded-sm uppercase whitespace-nowrap cursor-pointer"
        >
          INQUIRE ABOUT BOOKINGS
        </button>
      </div>

    </section>
  );
}
