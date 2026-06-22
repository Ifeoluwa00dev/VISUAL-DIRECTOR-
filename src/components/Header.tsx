import { useState } from "react";
import { Menu, X, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  availability: "Available for Booking" | "Fully Booked";
  onEnterCta: () => void;
  onLeaveCta: () => void;
  onOpenAdmin: () => void;
  isAdminActive: boolean;
}

export default function Header({
  activeTab,
  setActiveTab,
  availability,
  onEnterCta,
  onLeaveCta,
  onOpenAdmin,
  isAdminActive
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "hero", label: "Intro" },
    { id: "work", label: "Work" },
    { id: "about", label: "Profile" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Inquire" }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const isAvailable = availability === "Available for Booking";

  return (
    <>
      <header
        id="app-nav-header"
        className="glass border-x-0 border-t-0 fixed top-0 left-0 w-full z-50 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div
            className="flex flex-col cursor-pointer select-none"
            onClick={() => handleNavClick("hero")}
            onMouseEnter={onEnterCta}
            onMouseLeave={onLeaveCta}
          >
            <span className="font-display text-2xl tracking-[0.15em] text-white">
              KAIEN<span className="text-[#00F5FF]">.</span>CHEN
            </span>
            <span className="text-[8px] tracking-[0.3em] text-[#ffffff]/40 font-mono -mt-1 uppercase">
              Visual Director
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={onEnterCta}
                onMouseLeave={onLeaveCta}
                className={`relative font-sans text-xs tracking-widest text-[#ffffff]/60 hover:text-white transition-colors duration-300 py-2 uppercase ${
                  activeTab === item.id ? "text-white" : ""
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#00F5FF]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Section: Availability + Admin Trigger */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Availability light */}
            <div className="flex items-center space-x-2 border border-[#ffffff]/10 px-3 py-1.5 rounded-full bg-black/40">
              <span className={`relative flex h-2 w-2`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAvailable ? 'bg-[#00F5FF]' : 'bg-red-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isAvailable ? 'bg-[#00F5FF]' : 'bg-red-500'}`}></span>
              </span>
              <span className="text-[10px] tracking-wider text-[#ffffff]/70 uppercase font-mono">
                {availability}
              </span>
            </div>

            {/* Admin control panel link */}
            <button
              onClick={onOpenAdmin}
              onMouseEnter={onEnterCta}
              onMouseLeave={onLeaveCta}
              className={`flex items-center space-x-1.5 px-4 py-1.5 border rounded-md text-[10px] font-mono tracking-widest transition-all duration-300 ${
                isAdminActive
                  ? "bg-[#00F5FF] text-black border-[#00F5FF]"
                  : "bg-transparent text-[#ffffff]/60 border-white/20 hover:border-[#00F5FF] hover:text-[#00F5FF]"
              }`}
            >
              <ShieldAlert size={11} />
              <span>CMS CENTRAL</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <button
              onClick={onOpenAdmin}
              className={`p-1.5 border rounded-md transition-all ${
                isAdminActive
                  ? "bg-[#00F5FF]/20 text-[#00F5FF] border-[#00F5FF]"
                  : "bg-transparent text-white/50 border-white/10"
              }`}
            >
              <ShieldAlert size={15} />
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-white hover:text-[#00F5FF] transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 w-full z-40 bg-[#0C0C0C]/95 backdrop-blur-lg border-b border-white/10 md:hidden block py-8 px-6"
          >
            <div className="flex flex-col space-y-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left font-display text-4xl tracking-wider uppercase transition-colors ${
                    activeTab === item.id ? "text-[#00F5FF]" : "text-white/60"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="h-[1px] bg-white/10 my-4" />

              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <span className={`relative flex h-2.5 w-2.5`}>
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAvailable ? 'bg-[#00F5FF]' : 'bg-red-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isAvailable ? 'bg-[#00F5FF]' : 'bg-red-500'}`}></span>
                  </span>
                  <span className="text-xs tracking-widest text-[#ffffff]/80 font-mono uppercase">
                    {availability}
                  </span>
                </div>

                <button
                  onClick={() => {
                    onOpenAdmin();
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-3 flex items-center justify-center space-x-2 border rounded-md font-mono text-xs tracking-widest uppercase transition-all ${
                    isAdminActive
                      ? "bg-[#00F5FF] text-black border-[#00F5FF]"
                      : "bg-transparent text-[#ffffff]/60 border-white/10"
                  }`}
                >
                  <ShieldAlert size={14} />
                  <span>PROJECTS CMS PANEL</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
