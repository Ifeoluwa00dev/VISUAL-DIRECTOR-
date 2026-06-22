import { useEffect, useState } from "react";
import { Project } from "../types";
import { X, Calendar, User, Briefcase, ChevronLeft, ChevronRight, Play, Film } from "lucide-react";
import { motion } from "motion/react";

interface ProjectDetailProps {
  project: Project;
  allProjects: Project[];
  onNavigate: (proj: Project) => void;
  onClose: () => void;
  onEnterCta: () => void;
  onLeaveCta: () => void;
}

export default function ProjectDetail({
  project,
  allProjects,
  onNavigate,
  onClose,
  onEnterCta,
  onLeaveCta
}: ProjectDetailProps) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Scroll back to top on load/navigate
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveMediaIndex(0);
    
    // Lock body scrolling while open to preserve cinematic feel
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [project]);

  // Find previous and next projects for navigation slider
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[currentIndex === 0 ? allProjects.length - 1 : currentIndex - 1];
  const nextProject = allProjects[currentIndex === allProjects.length - 1 ? 0 : currentIndex + 1];

  const galleryImages = [project.coverImage, ...(project.gallery || [])].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 w-full h-full bg-[#0C0C0C] z-[100] overflow-y-auto"
    >
      {/* Top action bar */}
      <div className="fixed top-0 left-0 w-full z-50 h-20 bg-gradient-to-b from-[#0C0C0C]/90 to-transparent px-6 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#ffffff]/40 uppercase">
            FILE_ID // {project.slug}
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          onMouseEnter={onEnterCta}
          onMouseLeave={onLeaveCta}
          className="pointer-events-auto flex items-center space-x-2 px-5 py-2.5 border border-white/10 hover:border-[#00F5FF] bg-black/60 hover:text-[#00F5FF] hover:shadow-[0_0_15px_rgba(0,245,255,0.2)] text-white/80 transition-all rounded-full font-mono text-[9px] tracking-widest uppercase cursor-pointer backdrop-blur-md"
        >
          <X size={12} />
          <span>CLOSE WORK</span>
        </button>
      </div>

      {/* Main content slider bounds */}
      <div className="pt-24 pb-32 max-w-7xl mx-auto px-6 grid grid-cols-12 gap-12">
        {/* Left column: Expanded media view & slideshow thumb lists */}
        <div className="col-span-12 lg:col-span-8 flex flex-col space-y-6">
          
          {/* Main Visual Display (Video or Cover Image) */}
          {project.videoUrl && activeMediaIndex === 0 ? (
            <div className="relative aspect-video w-full rounded-sm overflow-hidden border border-white/5 bg-black shadow-2xl">
              <iframe
                src={project.videoUrl}
                title={project.title}
                className="w-full h-full absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="no-referrer animate-fade-in"
              />
            </div>
          ) : (
            <div className="relative w-full aspect-[16/10] rounded-sm overflow-hidden border border-white/5 bg-[#141414] shadow-2xl">
              <img
                src={galleryImages[activeMediaIndex]}
                alt={`${project.title} slide`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            </div>
          )}

          {/* Gallery Thumbnail Selector Row */}
          {galleryImages.length > 1 && (
            <div className="flex flex-wrap gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  onMouseEnter={onEnterCta}
                  onMouseLeave={onLeaveCta}
                  className={`relative aspect-[16/10] w-24 rounded-sm border overflow-hidden bg-black transition-all ${
                    idx === activeMediaIndex
                      ? "border-[#00F5FF] scale-95 shadow-[0_0_10px_rgba(0,245,255,0.3)]"
                      : "border-white/10 opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt="thumb"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {idx === 0 && project.videoUrl && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play size={12} className="text-white fill-[#00F5FF]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Editorial metadata fields details */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-between space-y-8">
          
          <div className="space-y-6">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#00F5FF] font-mono uppercase block mb-1">
                {project.category}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl tracking-wide text-white uppercase leading-tight font-black">
                {project.title}
              </h1>
            </div>

            {/* Quick spec checklist */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-6 font-mono text-[10px]">
              <div className="flex items-center space-x-2 text-white/50">
                <User size={13} className="text-[#00F5FF]" />
                <span className="uppercase text-[9px] text-[#ffffff]/35">Client:</span>
                <span className="text-white font-sans">{project.client}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/50">
                <Calendar size={13} className="text-[#00F5FF]" />
                <span className="uppercase text-[9px] text-[#ffffff]/35">Year:</span>
                <span className="text-white font-sans">{project.year}</span>
              </div>
            </div>

            {/* Detailed description */}
            <div className="space-y-4">
              <span className="text-[9px] tracking-[0.25em] text-[#ffffff]/40 font-mono uppercase block">
                PROJECT REVIEW
              </span>
              <p className="text-[#ffffff]/80 font-sans font-light text-sm tracking-wide leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Services Rendered List */}
            <div className="space-y-3">
              <span className="text-[9px] tracking-[0.25em] text-[#ffffff]/40 font-mono uppercase block">
                SERVICES RENDERED
              </span>
              <div className="flex flex-wrap gap-2">
                {project.services.map((srv, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono bg-[#00F5FF]/5 border border-[#00F5FF]/20 text-[#00F5FF] px-3 py-1 rounded-full uppercase"
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Prompt warning representation */}
          <div className="bg-white/5 border border-white/5 p-4 rounded-sm">
            <div className="flex items-center space-x-2 mb-1.5">
              <Film size={12} className="text-[#00F5FF]" />
              <span className="text-[9px] font-mono text-white/80 uppercase tracking-widest leading-none">Aesthetic Guarantee</span>
            </div>
            <p className="text-[10px] text-white/40 leading-relaxed font-sans font-light">
              This short was color-calibrated under Rec.709 D65 matrices. Optimized for ultra-deep OLED monitors.
            </p>
          </div>
        </div>
      </div>

      {/* Persistent Previous and Next Project Slider Navigation footer */}
      <div className="fixed bottom-0 left-0 w-full z-45 bg-black/95 border-t border-white/5 h-24">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          
          {/* Previous item CTA */}
          <button
            onClick={() => onNavigate(prevProject)}
            onMouseEnter={onEnterCta}
            onMouseLeave={onLeaveCta}
            className="flex items-center space-x-4 hover:text-[#00F5FF] transition-colors text-left max-w-[45%]"
          >
            <div className="p-2 border border-white/10 rounded-full bg-white/5 group-hover:border-[#00F5FF] transition-colors">
              <ChevronLeft size={16} />
            </div>
            <div className="hidden sm:block">
              <span className="text-[8px] font-mono tracking-widest text-[#ffffff]/40 uppercase block">PREVIOUS WORK</span>
              <span className="font-display text-lg tracking-wider text-white line-clamp-1 uppercase hover:text-[#00F5FF]">{prevProject.title}</span>
            </div>
          </button>

          {/* Current index fraction */}
          <div className="font-mono text-xs text-[#ffffff]/30 text-center tracking-[0.2em] hidden md:block">
            FILE {currentIndex + 1} OF {allProjects.length}
          </div>

          {/* Next item CTA */}
          <button
            onClick={() => onNavigate(nextProject)}
            onMouseEnter={onEnterCta}
            onMouseLeave={onLeaveCta}
            className="flex items-center space-x-4 hover:text-[#00F5FF] transition-colors text-right max-w-[45%]"
          >
            <div className="hidden sm:block">
              <span className="text-[8px] font-mono tracking-widest text-[#ffffff]/40 uppercase block">NEXT WORK</span>
              <span className="font-display text-lg tracking-wider text-white line-clamp-1 uppercase hover:text-[#00F5FF]">{nextProject.title}</span>
            </div>
            <div className="p-2 border border-white/10 rounded-full bg-white/5 group-hover:border-[#00F5FF] transition-colors">
              <ChevronRight size={16} />
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
