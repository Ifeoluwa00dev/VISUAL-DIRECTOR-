import { useState, useEffect } from "react";
import { Project } from "../types";
import { motion } from "motion/react";
import { Film, Eye, FolderPlus } from "lucide-react";

interface ProjectsSectionProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onEnterProject: (title: string) => void;
  onLeaveProject: () => void;
  onEnterCta: () => void;
  onLeaveCta: () => void;
}

export default function ProjectsSection({
  projects,
  onProjectClick,
  onEnterProject,
  onLeaveProject,
  onEnterCta,
  onLeaveCta
}: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);
  }, []);

  // Filter categories dynamically from list
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  // Sorting based on original order
  const sortedProjects = [...filteredProjects].sort((a, b) => a.order - b.order);

  // Form staggering containers for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <section id="work-grid-section" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Editorial Category Separator navbar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/5 pb-8">
        <div>
          <span className="text-[10px] tracking-[0.3em] text-[#00F5FF] font-mono uppercase block mb-3">
            PORTFOLIO CLASSIFIED
          </span>
          <h2 className="font-display text-5xl md:text-6xl tracking-wider text-white">
            SELECTED PROJECTS
          </h2>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-3 mt-6 md:mt-0 font-mono text-[10px] tracking-widest uppercase">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              onMouseEnter={onEnterCta}
              onMouseLeave={onLeaveCta}
              className={`px-4 py-2 border rounded-full transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-[#00F5FF]/15 border-[#00F5FF] text-[#00F5FF] shadow-[0_0_10px_rgba(0,245,255,0.15)]"
                  : "bg-transparent border-white/10 text-white/50 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Masonry List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-12 gap-8 md:gap-12"
      >
        {sortedProjects.map((project, index) => {
          // Compute asymmetric column configurations based on index
          // This gives standard, highly elegant visual rhythm variations:
          // Index 0: spans 12 column (full) or spans 7. We alternate spans to look custom!
          let gridClass = "col-span-12";
          if (index % 3 === 0) {
            gridClass = "col-span-12 md:col-span-7";
          } else if (index % 3 === 1) {
            gridClass = "col-span-12 md:col-span-5";
          } else {
            gridClass = "col-span-12 md:col-span-12 lg:col-span-12 mt-4";
          }

          // Let some covers have portrait formats, others landscape to follow content boundaries
          const isLandscape = index % 3 !== 2;

          return (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`${gridClass} group`}
            >
              <div
                onClick={() => onProjectClick(project)}
                onMouseEnter={() => onEnterProject(project.title)}
                onMouseLeave={onLeaveProject}
                className="relative overflow-hidden cursor-pointer bg-[#141414] border border-white/5 group rounded-sm shadow-2xl"
              >
                {/* Image Wrapper */}
                <div
                  className={`relative w-full ${
                    isLandscape ? "aspect-[16/10]" : "aspect-[21/9]"
                  } overflow-hidden`}
                >
                  {/* Subtle electric teal lens flare gradient backing on project hover */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

                  <img
                    src={project.coverImage || "https://picsum.photos/seed/visual/800/450"}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 pointer-events-none filter brightness-95 group-hover:brightness-100"
                  />

                  {/* Dark mask overlay on rest, lightens up on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 opacity-70 group-hover:opacity-50 transition-opacity duration-300" />

                  {/* Project overlay icon */}
                  {project.videoUrl && (
                    <div className="absolute top-4 right-4 bg-black/60 border border-white/10 px-2 py-1 rounded text-[8px] font-mono tracking-widest text-emerald-400 flex items-center space-x-1 backdrop-blur-sm z-20">
                      <Film size={10} />
                      <span className="uppercase">MOTION SHORT</span>
                    </div>
                  )}

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="text-[9px] font-mono tracking-widest uppercase bg-black/55 backdrop-blur-sm px-3 py-1.5 border border-white/5 rounded-full text-white/70">
                      {project.category}
                    </span>
                  </div>

                  {/* Elegant Text Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 z-20 flex flex-col justify-end">
                    <div className="overflow-hidden mb-1">
                      <p className="text-[10px] tracking-[0.3em] text-[#00F5FF] font-mono uppercase translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        {project.client} &bull; {project.year}
                      </p>
                    </div>

                    <h3 className="font-display text-2xl sm:text-4xl tracking-wider text-white uppercase leading-none">
                      {project.title}
                    </h3>

                    {/* Secondary details revealed only on hover */}
                    <div className="max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-700 ease-in-out">
                      <p className="text-xs text-[#ffffff]/60 font-sans mt-3 tracking-wide leading-relaxed font-light max-w-xl line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.services.slice(0, 3).map((srv, idx) => (
                          <span
                            key={idx}
                            className="text-[8px] font-mono bg-white/5 px-2 py-0.5 border border-white/5 text-white/50 rounded-sm"
                          >
                            {srv}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Grid Empty Fallback */}
      {sortedProjects.length === 0 && (
        <div className="text-center py-20 border border-white/5 rounded-md bg-[#0e0e0e]/50 my-10">
          <FolderPlus size={32} className="mx-auto text-white/20 mb-4 animate-bounce" />
          <h3 className="text-lg font-display tracking-widest text-white/80">NO FILES DETECTED</h3>
          <p className="text-xs text-white/40 font-mono mt-1">THE DIRECTORY CONTAINS NO PROJECTS UNDER THIS CATEGORY</p>
        </div>
      )}
    </section>
  );
}
