import { useEffect, useState } from "react";
import { Project, ArtistBio, ClientInquiry, ServiceItem } from "./types";
import { 
  INITIAL_PROJECTS, INITIAL_BIO, INITIAL_SERVICES, INITIAL_INQUIRIES 
} from "./data";

// Component imports
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import ProjectDetail from "./components/ProjectDetail";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import AdminPortal from "./components/AdminPortal";

// Animation and styling utilities
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // 1. Storage & Core Database States
  const [projects, setProjects] = useState<Project[]>(() => {
    const cached = localStorage.getItem("aether_projects");
    return cached ? JSON.parse(cached) : INITIAL_PROJECTS;
  });

  const [bio, setBio] = useState<ArtistBio>(() => {
    const cached = localStorage.getItem("aether_bio");
    return cached ? JSON.parse(cached) : INITIAL_BIO;
  });

  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);

  const [inquiries, setInquiries] = useState<ClientInquiry[]>(() => {
    const cached = localStorage.getItem("aether_inquiries");
    return cached ? JSON.parse(cached) : INITIAL_INQUIRIES;
  });

  // Write changes to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem("aether_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("aether_bio", JSON.stringify(bio));
  }, [bio]);

  useEffect(() => {
    localStorage.setItem("aether_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  // 2. Navigation & Modal States
  const [activeTab, setActiveTab] = useState<string>("hero");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isAdminActive, setIsAdminActive] = useState(false);

  // 3. Custom Cursor States
  const [cursorType, setCursorType] = useState<"default" | "project" | "cta">("default");
  const [cursorText, setCursorText] = useState("VIEW");

  // Hover Helpers
  const handleEnterProject = (title: string) => {
    setCursorType("project");
    setCursorText("VIEW");
  };

  const handleLeaveProject = () => {
    setCursorType("default");
  };

  const handleEnterCta = () => {
    setCursorType("cta");
  };

  const handleLeaveCta = () => {
    setCursorType("default");
  };

  // Add inquiry log handler
  const handleAddInquiry = (newInq: Omit<ClientInquiry, "id" | "createdAt">) => {
    const inq: ClientInquiry = {
      id: `inq_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...newInq
    };
    setInquiries((prev) => [inq, ...prev]);
  };

  // Handle CTA scrolling & navigation switches
  const handleExploreClick = () => {
    setActiveTab("work");
    // Scroll smoothly to work segment
    setTimeout(() => {
      const workEl = document.getElementById("work-grid-section");
      if (workEl) {
        workEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-[#0C0C0C] text-white overflow-x-hidden selection:bg-[#00F5FF]/30 selection:text-white">
      
      {/* Immersive UI Background Ambient Glows */}
      <div className="absolute top-[15vh] left-[-200px] w-[600px] h-[600px] bg-[#00F5FF]/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[120vh] right-[-300px] w-[700px] h-[700px] bg-[#00F5FF]/4 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[80vh] left-[-250px] w-[650px] h-[650px] bg-[#00F5FF]/3 rounded-full blur-[140px] pointer-events-none z-0" />
      
      {/* 1. Custom Interactive Magnetic Cursor */}
      <CustomCursor cursorType={cursorType} hoverText={cursorText} />

      {/* 2. Top Navigation header navbar */}
      <Header
        activeTab={isAdminActive ? "admin" : activeTab}
        setActiveTab={(tab) => {
          setIsAdminActive(false);
          setActiveTab(tab);
          if (tab === "hero") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            setTimeout(() => {
              const el = document.getElementById(`${tab}-section`) || document.getElementById(`${tab}-grid-section`) || document.getElementById(`about-profile-section`) || document.getElementById(`services-grid-section`) || document.getElementById(`contact-form-section`);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }, 100);
          }
        }}
        availability={bio.availability}
        onEnterCta={handleEnterCta}
        onLeaveCta={handleLeaveCta}
        onOpenAdmin={() => {
          setIsAdminActive(!isAdminActive);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        isAdminActive={isAdminActive}
      />

      {/* 3. Core Displays Switcher */}
      <AnimatePresence mode="wait">
        {isAdminActive ? (
          /* ==================== DISPLAY A: CMS ADMIN CONFIGURATOR ==================== */
          <motion.div
            key="admin-overlay"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <AdminPortal
              projects={projects}
              setProjects={setProjects}
              bio={bio}
              setBio={setBio}
              inquiries={inquiries}
              setInquiries={setInquiries}
              onClose={() => {
                setIsAdminActive(false);
                setActiveTab("work");
              }}
              onEnterCta={handleEnterCta}
              onLeaveCta={handleLeaveCta}
            />
          </motion.div>
        ) : (
          /* ==================== DISPLAY B: MAIN PORTFOLIO SECTIONS ==================== */
          <motion.div
            key="portfolio-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Fullscreen Hero Splash Intro */}
            <Hero
              name={bio.name}
              discipline={bio.discipline}
              coverImage="/src/assets/images/hero_background_1781869745518.jpg"
              onExploreClick={handleExploreClick}
              onEnterCta={handleEnterCta}
              onLeaveCta={handleLeaveCta}
            />

            {/* Portfolio Grid segment */}
            <div id="work-grid" className="scroll-mt-20">
              <ProjectsSection
                projects={projects}
                onProjectClick={(proj) => {
                  setActiveProject(proj);
                  handleLeaveProject();
                }}
                onEnterProject={handleEnterProject}
                onLeaveProject={handleLeaveProject}
                onEnterCta={handleEnterCta}
                onLeaveCta={handleLeaveCta}
              />
            </div>

            {/* Profile biography info split */}
            <div id="about-section" className="border-t border-white/5 bg-[#0a0a0a]/40">
              <AboutSection
                bio={bio}
                onEnterCta={handleEnterCta}
                onLeaveCta={handleLeaveCta}
              />
            </div>

            {/* Creative Services pricing list */}
            <div id="services-section" className="border-t border-white/5 bg-black">
              <ServicesSection
                services={services}
                onEnterCta={handleEnterCta}
                onLeaveCta={handleLeaveCta}
              />
            </div>

            {/* Contact Inquiry form */}
            <div id="contact-section" className="border-t border-white/5 bg-[#0a0a0a]/85">
              <ContactSection
                bio={bio}
                onAddInquiry={handleAddInquiry}
                onEnterCta={handleEnterCta}
                onLeaveCta={handleLeaveCta}
              />
            </div>

            {/* Professional Cinematic Footer */}
            <footer className="border-t border-white/5 bg-black py-16 px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center text-white/40 text-xs font-mono">
                <div className="col-span-12 md:col-span-4 space-y-2 select-none">
                  <div className="font-display text-lg tracking-[0.2em] text-white leading-none">
                    KAIEN CHEN<span className="text-[#00F5FF]">.</span>
                  </div>
                  <div>© 2026 AETHER STUDIOS CINEMA. ALL RIGHTS RESERVED.</div>
                  <div className="text-[10px] text-[#ffffff]/20">CALIBRATED REC.709 SYSTEM MATRIX</div>
                </div>

                <div className="col-span-12 md:col-span-4 flex justify-start md:justify-center space-x-6">
                  {bio.socialLinks.slice(0, 3).map((soc) => (
                    <a
                      key={soc.id}
                      href={soc.url}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={handleEnterCta}
                      onMouseLeave={handleLeaveCta}
                      className="hover:text-white transition-colors"
                    >
                      {soc.platform.toUpperCase()}
                    </a>
                  ))}
                </div>

                <div className="col-span-12 md:col-span-4 text-left md:text-right space-y-2">
                  <div>REGIONAL RECEPTOR LOC_東京 // MEGUR_JP</div>
                  <div className="flex items-center md:justify-end gap-1.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>SYSTEM ONLINE // VER_3.12_PRO</span>
                  </div>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Overlay Project Detail Fullscreen View */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetail
            project={activeProject}
            allProjects={projects}
            onNavigate={(nextProj) => setActiveProject(nextProj)}
            onClose={() => setActiveProject(null)}
            onEnterCta={handleEnterCta}
            onLeaveCta={handleLeaveCta}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
