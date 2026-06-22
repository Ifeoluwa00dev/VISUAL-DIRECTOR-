import React, { useState } from "react";
import { Project, ArtistBio, ClientInquiry } from "../types";
import { 
  Plus, Edit2, Trash2, ArrowUp, ArrowDown, Settings, 
  User, Sparkles, MessageCircle, ArrowLeft, Check, AlertCircle, RefreshCw
} from "lucide-react";
import { motion } from "motion/react";

interface AdminPortalProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  bio: ArtistBio;
  setBio: React.Dispatch<React.SetStateAction<ArtistBio>>;
  inquiries: ClientInquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<ClientInquiry[]>>;
  onClose: () => void;
  onEnterCta: () => void;
  onLeaveCta: () => void;
}

export default function AdminPortal({
  projects,
  setProjects,
  bio,
  setBio,
  inquiries,
  setInquiries,
  onClose,
  onEnterCta,
  onLeaveCta
}: AdminPortalProps) {
  
  // Selection Tabs inside CMS
  const [activeSubTab, setActiveSubTab] = useState<"projects" | "bio" | "inquiries">("projects");

  // Project Adding/Editing Form State
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formCoverImage, setFormCoverImage] = useState("");
  const [formGalleryText, setFormGalleryText] = useState(""); // Comma split list or mock
  const [formDescription, setFormDescription] = useState("");
  const [formClient, setFormClient] = useState("");
  const [formYear, setFormYear] = useState("");
  const [formServicesText, setFormServicesText] = useState(""); // Comma separated list
  const [formVideoUrl, setFormVideoUrl] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Biography Form State
  const [bioName, setBioName] = useState(bio.name);
  const [bioDiscipline, setBioDiscipline] = useState(bio.discipline);
  const [bioPortrait, setBioPortrait] = useState(bio.portrait);
  const [bioText, setBioText] = useState(bio.bioText);
  const [bioPhilosophy, setBioPhilosophy] = useState(bio.philosophy);
  const [bioAvailability, setBioAvailability] = useState(bio.availability);
  const [bioSuccess, setBioSuccess] = useState(false);

  // Reorder list handler
  const handleMoveProject = (index: number, direction: "up" | "down") => {
    const updatedProjects = [...projects].sort((a, b) => a.order - b.order);
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    
    if (targetIdx < 0 || targetIdx >= updatedProjects.length) return;
    
    // Swap original order properties
    const temp = updatedProjects[index].order;
    updatedProjects[index].order = updatedProjects[targetIdx].order;
    updatedProjects[targetIdx].order = temp;

    setProjects(updatedProjects.sort((a, b) => a.order - b.order));
  };

  // Populate form for editing
  const handleEditProjectClick = (proj: Project) => {
    setEditingProjectId(proj.id);
    setFormTitle(proj.title);
    setFormCategory(proj.category);
    setFormCoverImage(proj.coverImage);
    setFormGalleryText((proj.gallery || []).join(", "));
    setFormDescription(proj.description);
    setFormClient(proj.client);
    setFormYear(proj.year);
    setFormServicesText(proj.services.join(", "));
    setFormVideoUrl(proj.videoUrl || "");
    setFormError("");
    setFormSuccess("");
  };

  // Trigger empty draft for adding projects
  const handleCreateNewClick = () => {
    setEditingProjectId(null);
    setFormTitle("");
    setFormCategory("Digital Art & 3D Direction");
    setFormCoverImage("/src/assets/images/project_cyber_1781869759581.jpg");
    setFormGalleryText("");
    setFormDescription("");
    setFormClient("Independent Production");
    setFormYear("2026");
    setFormServicesText("Direction, Post-Processing");
    setFormVideoUrl("");
    setFormError("");
    setFormSuccess("");
  };

  // Delete project
  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project? This cannot be undone.")) {
      const remaining = projects.filter((p) => p.id !== id);
      // Recalculate orders to prevent gaps
      const reordered = remaining.map((p, idx) => ({ ...p, order: idx + 1 }));
      setProjects(reordered);
    }
  };

  // Save Project Handler
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formCategory || !formCoverImage || !formDescription || !formClient) {
      setFormError("All starred fields (*) are strictly required.");
      return;
    }

    const services = formServicesText.split(",").map((s) => s.trim()).filter(Boolean);
    const gallery = formGalleryText.split(",").map((s) => s.trim()).filter(Boolean);

    if (editingProjectId) {
      // Editing
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProjectId
            ? {
                ...p,
                title: formTitle.toUpperCase(),
                category: formCategory,
                coverImage: formCoverImage,
                gallery,
                description: formDescription,
                client: formClient,
                year: formYear,
                services,
                videoUrl: formVideoUrl || undefined
              }
            : p
        )
      );
      setFormSuccess("Project configurations updated successfully.");
    } else {
      // Adding new
      const newOrder = projects.length > 0 ? Math.max(...projects.map((p) => p.order)) + 1 : 1;
      const newProj: Project = {
        id: `proj_${Date.now()}`,
        title: formTitle.toUpperCase(),
        slug: formTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: formCategory,
        coverImage: formCoverImage,
        gallery,
        description: formDescription,
        client: formClient,
        year: formYear,
        services,
        videoUrl: formVideoUrl || undefined,
        featured: true,
        order: newOrder
      };
      setProjects((prev) => [...prev, newProj]);
      setFormSuccess("New project logged and prioritized.");
      handleCreateNewClick();
    }
  };

  // Save Bio Handler
  const handleSaveBio = (e: React.FormEvent) => {
    e.preventDefault();
    setBio({
      ...bio,
      name: bioName.toUpperCase(),
      discipline: bioDiscipline.toUpperCase(),
      portrait: bioPortrait,
      bioText,
      philosophy: bioPhilosophy,
      availability: bioAvailability
    });
    setBioSuccess(true);
    setTimeout(() => setBioSuccess(false), 3000);
  };

  // Clear single inquiry
  const handleDeleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white pt-24 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              onMouseEnter={onEnterCta}
              onMouseLeave={onLeaveCta}
              className="p-2 border border-white/10 hover:border-[#00F5FF] bg-white/[0.01] hover:text-[#00F5FF] transition-colors rounded-full"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <span className="text-[10px] tracking-[0.3em] text-[#00F5FF] font-mono uppercase block mb-1">
                PORTFOLIO CENTRAL CONTROL
              </span>
              <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-white">
                CMS DASHBOARD
              </h2>
            </div>
          </div>

          {/* Quick tab switch buttons */}
          <div className="flex gap-2 mt-6 md:mt-0 bg-[#121212] border border-white/5 p-1 rounded font-mono text-[10px] tracking-widest uppercase">
            <button
              onClick={() => setActiveSubTab("projects")}
              className={`px-4 py-2 rounded-sm transition-all ${
                activeSubTab === "projects" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
              }`}
            >
              Project Files
            </button>
            <button
              onClick={() => setActiveSubTab("bio")}
              className={`px-4 py-2 rounded-sm transition-all ${
                activeSubTab === "bio" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
              }`}
            >
              Artist Studio Bio
            </button>
            <button
              onClick={() => setActiveSubTab("inquiries")}
              className={`px-4 py-2 rounded-sm transition-all relative ${
                activeSubTab === "inquiries" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
              }`}
            >
              Client Queries
              {inquiries.length > 0 && (
                <span className="absolute -top-1 px-1.5 py-0.5 text-[8px] bg-[#00F5FF] text-black font-bold rounded-full ml-1">
                  {inquiries.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ==================== SUB-TAB 1: PROJECTS FILE MANAGEMENT ==================== */}
        {activeSubTab === "projects" && (
          <div className="grid grid-cols-12 gap-8 items-start">
            
            {/* Left Side: Current Projects Inventory List */}
            <div className="col-span-12 lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#ffffff]/35 uppercase block">
                  DIRECTORY INDEX ({projects.length} Files)
                </span>
                <button
                  onClick={handleCreateNewClick}
                  onMouseEnter={onEnterCta}
                  onMouseLeave={onLeaveCta}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#00F5FF]/10 border border-[#00F5FF]/20 text-[#00F5FF] hover:bg-[#00F5FF] hover:text-black hover:border-[#00F5FF] text-[9px] font-mono rounded transition-colors uppercase leading-none"
                >
                  <Plus size={12} />
                  <span>DRAFT NEW FILE</span>
                </button>
              </div>

              <div className="divide-y divide-white/5 border border-white/5 bg-[#101010]/55 p-2 rounded-sm">
                {projects
                  .sort((a, b) => a.order - b.order)
                  .map((p, idx) => (
                    <div
                      key={p.id}
                      className="p-4 flex items-center justify-between gap-4 group hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        {/* Artwork thumb snapshot */}
                        <div className="aspect-[4/3] w-14 bg-black border border-white/10 rounded-sm overflow-hidden flex-shrink-0">
                          <img
                            src={p.coverImage}
                            alt={p.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-[9px] text-[#00F5FF] bg-[#00F5FF]/5 border border-[#00F5FF]/10 px-1.5 py-0.5 rounded leading-none">
                              #{p.order}
                            </span>
                            <span className="text-[9px] font-mono text-[#ffffff]/45 uppercase">{p.category}</span>
                          </div>
                          <h4 className="font-display font-medium text-lg leading-relaxed text-white uppercase tracking-wider group-hover:text-[#00F5FF] transition-colors line-clamp-1 mt-0.5">
                            {p.title}
                          </h4>
                        </div>
                      </div>

                      {/* Controls toolbar */}
                      <div className="flex items-center space-x-2">
                        {/* Reordering buttons */}
                        <button
                          onClick={() => handleMoveProject(idx, "up")}
                          disabled={idx === 0}
                          className="p-1.5 border border-white/5 rounded hover:border-[#00F5FF]/45 text-white/50 hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-colors"
                          title="Move project order up"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button
                          onClick={() => handleMoveProject(idx, "down")}
                          disabled={idx === projects.length - 1}
                          className="p-1.5 border border-white/5 rounded hover:border-[#00F5FF]/45 text-white/50 hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-colors"
                          title="Move project order down"
                        >
                          <ArrowDown size={12} />
                        </button>

                        <div className="h-5 w-[1.5px] bg-white/5 mx-1" />

                        {/* Edit and Delete */}
                        <button
                          onClick={() => handleEditProjectClick(p)}
                          className="p-1.5 border border-white/5 rounded hover:border-[#00F5FF] hover:text-[#00F5FF] text-white/50 transition-colors"
                          title="Modify project content"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1.5 border border-white/5 rounded hover:border-red-500 hover:text-red-500 text-white/50 transition-colors"
                          title="Remove project"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}

                {projects.length === 0 && (
                  <div className="text-center py-12 text-white/30 font-mono text-[10px]">
                    NO DATA SPECIFIED IN ACTIVE CACHE
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Add / Modify Form */}
            <div className="col-span-12 lg:col-span-5 bg-[#121212] border border-white/5 p-6 rounded-sm space-y-6">
              <div>
                <span className="text-[9px] font-mono text-[#00F5FF]/60 tracking-widest uppercase block mb-1">
                  {editingProjectId ? "MODIFY FILE SPECIFICATIONS" : "INITIALIZE NEW WORK DETAILS"}
                </span>
                <h3 className="font-display text-2xl tracking-wider text-white">
                  {editingProjectId ? "EDIT PROJECT BUFFER" : "LOG DESIGN FILE"}
                </h3>
              </div>

              {formError && (
                <div className="p-3.5 bg-red-500/5 border border-red-500/15 text-red-400 text-[10px] font-mono rounded flex items-center space-x-2">
                  <AlertCircle size={14} className="flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess && (
                <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/15 text-emerald-400 text-[10px] font-mono rounded flex items-center space-x-2">
                  <Check size={14} className="flex-shrink-0" />
                  <span>{formSuccess}</span>
                </div>
              )}

              <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-mono">
                
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[9px] text-[#ffffff]/35 uppercase">PROJECT TITLE *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. SKYLINE CHOREOGRAPHY"
                    className="w-full bg-black/60 border border-white/10 p-2.5 text-white hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm"
                  />
                </div>

                {/* Category & Client */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-[#ffffff]/35 uppercase">CATEGORY *</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 p-2.5 text-white hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm uppercase tracking-wider text-[10px]"
                    >
                      <option value="Digital Art & 3D Direction">DIGITAL ART & 3D</option>
                      <option value="Cinematography & Video">CINEMATOGRAPHY & VIDEO</option>
                      <option value="Editorial Photography">EDITORIAL PHOTOGRAPHY</option>
                      <option value="Interactive Virtual Reality">VIRTUAL EXPERIENCES</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] text-[#ffffff]/35 uppercase">CLIENT NAME *</label>
                    <input
                      type="text"
                      required
                      value={formClient}
                      onChange={(e) => setFormClient(e.target.value)}
                      placeholder="e.g. National Cinematic League"
                      className="w-full bg-black/60 border border-white/10 p-2.5 text-white hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm"
                    />
                  </div>
                </div>

                {/* Year & Cover Image */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[9px] text-[#ffffff]/35 uppercase">YEAR *</label>
                    <input
                      type="text"
                      required
                      value={formYear}
                      onChange={(e) => setFormYear(e.target.value)}
                      placeholder="2026"
                      className="w-full bg-black/60 border border-white/10 p-2.5 text-white hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm text-center"
                    />
                  </div>

                  <div className="space-y-1.5 col-span-2">
                    <label className="text-[9px] text-[#ffffff]/35 uppercase">COVER COVERIMAGE *</label>
                    <input
                      type="text"
                      required
                      value={formCoverImage}
                      onChange={(e) => setFormCoverImage(e.target.value)}
                      placeholder="Image absolute file path"
                      className="w-full bg-black/60 border border-white/10 p-2.5 text-white hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm text-[10px]"
                    />
                  </div>
                </div>

                {/* Services Rendered (comma separated) */}
                <div className="space-y-1.5">
                  <label className="text-[9px] text-[#ffffff]/35 uppercase">SERVICES RENDERED (comma separate)</label>
                  <input
                    type="text"
                    value={formServicesText}
                    onChange={(e) => setFormServicesText(e.target.value)}
                    placeholder="e.g. Drone Piloting, High-shutter Capture, Color Grading"
                    className="w-full bg-black/60 border border-white/10 p-2.5 text-white hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm"
                  />
                </div>

                {/* Video URL (Optional) */}
                <div className="space-y-1.5">
                  <label className="text-[9px] text-[#ffffff]/35 uppercase">MOTION SHORT VIDEO LINK (optional Youtube Embed)</label>
                  <input
                    type="text"
                    value={formVideoUrl}
                    onChange={(e) => setFormVideoUrl(e.target.value)}
                    placeholder="e.g. https://www.youtube.com/embed/ScMzIvxBSi4"
                    className="w-full bg-black/60 border border-white/10 p-2.5 text-white hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm"
                  />
                </div>

                {/* Sub Gallery list (optional comma separated) */}
                <div className="space-y-1.5">
                  <label className="text-[9px] text-[#ffffff]/35 uppercase">GALLERY SLIDES COVERS (comma separate absolute paths)</label>
                  <textarea
                    rows={2}
                    value={formGalleryText}
                    onChange={(e) => setFormGalleryText(e.target.value)}
                    placeholder="e.g. /src/assets/images/project_cyber_1781869759581.jpg, /src/assets/images/project_monolith_1781869772154.jpg"
                    className="w-full bg-black/60 border border-white/10 p-2.5 text-white hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm resize-none text-[9px]"
                  />
                </div>

                {/* Detailed description */}
                <div className="space-y-1.5">
                  <label className="text-[9px] text-[#ffffff]/35 uppercase">DETAILED PROJECT SPECIFICATION DESCRIPTION *</label>
                  <textarea
                    required
                    rows={4}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="A scenic drone documentary study documenting near-black mountain ranges..."
                    className="w-full bg-black/60 border border-white/10 p-2.5 text-white hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm resize-none font-sans"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={handleCreateNewClick}
                      className="px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 rounded transition-colors uppercase leading-none"
                    >
                      DRAFT NEW
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#00F5FF] hover:bg-white text-black font-semibold rounded transition-colors uppercase leading-none flex items-center justify-center space-x-1.5"
                  >
                    <span>{editingProjectId ? "UPDATE ARCHIVE FILE" : "PRIORITIZE DESIGN FILE"}</span>
                  </button>
                </div>

              </form>
            </div>

          </div>
        )}

        {/* ==================== SUB-TAB 2: ARTIST BIOGRAPHY ==================== */}
        {activeSubTab === "bio" && (
          <div className="max-w-4xl mx-auto bg-[#121212] border border-white/5 p-8 sm:p-10 rounded-sm">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <span className="text-[9px] font-mono text-[#00F5FF] tracking-widest uppercase block mb-1">
                  SEC_02_A // METADATA & PROFILE DOSSIER
                </span>
                <h3 className="font-display text-2xl tracking-wider text-white uppercase">
                  EDIT STUDIO BIO PARAMETERS
                </h3>
              </div>
              <div className="flex items-center space-x-2 border border-white/10 px-3 py-1.5 rounded bg-black">
                <span className={`h-2 w-2 rounded-full animate-pulse ${bioAvailability === "Available for Booking" ? "bg-[#00F5FF]" : "bg-red-400"}`} />
                <span className="text-[9px] tracking-widest font-mono text-white/50 uppercase leading-none">{bioAvailability}</span>
              </div>
            </div>

            {bioSuccess && (
              <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/15 text-emerald-400 text-[10px] font-mono rounded flex items-center space-x-2 mb-6">
                <Check size={14} />
                <span>Biography configurations saved and live on main tabs.</span>
              </div>
            )}

            <form onSubmit={handleSaveBio} className="space-y-6 text-xs font-mono">
              
              <div className="grid grid-cols-2 gap-4">
                {/* Artist Name */}
                <div className="space-y-1.5">
                  <label className="text-[9px] text-[#ffffff]/35 uppercase">DISPLAY NAME *</label>
                  <input
                    type="text"
                    required
                    value={bioName}
                    onChange={(e) => setBioName(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 p-2.5 text-white hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm uppercase tracking-wide"
                  />
                </div>

                {/* Primary discipline */}
                <div className="space-y-1.5">
                  <label className="text-[9px] text-[#ffffff]/35 uppercase">PRIMARY DISCIPLINE *</label>
                  <input
                    type="text"
                    required
                    value={bioDiscipline}
                    onChange={(e) => setBioDiscipline(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 p-2.5 text-white hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm uppercase tracking-wide"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                {/* Portrait URL */}
                <div className="space-y-1.5 col-span-12 sm:col-span-8">
                  <label className="text-[9px] text-[#ffffff]/35 uppercase">OFFICIAL PORTRAIT ABSOLUTE PATH *</label>
                  <input
                    type="text"
                    required
                    value={bioPortrait}
                    onChange={(e) => setBioPortrait(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 p-2.5 text-white hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm"
                  />
                </div>

                {/* Availability status dropdown */}
                <div className="space-y-1.5 col-span-12 sm:col-span-4">
                  <label className="text-[9px] text-[#ffffff]/35 uppercase">BOOKING STATUS *</label>
                  <select
                    value={bioAvailability}
                    onChange={(e) => setBioAvailability(e.target.value as any)}
                    className="w-full bg-black/60 border border-white/10 p-2.5 text-white focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm uppercase text-[10px]"
                  >
                    <option value="Available for Booking">AVAILABLE FOR BOOKING</option>
                    <option value="Fully Booked">FULLY BOOKED / ON SET</option>
                  </select>
                </div>
              </div>

              {/* Biography text */}
              <div className="space-y-1.5">
                <label className="text-[9px] text-[#ffffff]/35 uppercase">PROFILE GRAPHIC DETAILS BIOGRAPHY *</label>
                <textarea
                  required
                  rows={4}
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 p-2.5 text-white hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm font-sans text-xs grayscale-[30%] text-white/80 leading-relaxed"
                />
              </div>

              {/* Creed / Philosophy */}
              <div className="space-y-1.5">
                <label className="text-[9px] text-[#ffffff]/35 uppercase">CREATIVE CREED & ARTWORK PHILOSOPHY *</label>
                <textarea
                  required
                  rows={3}
                  value={bioPhilosophy}
                  onChange={(e) => setBioPhilosophy(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 p-2.5 text-white hover:border-white/20 focus:border-[#00F5FF] focus:outline-none transition-all rounded-sm font-sans italic"
                />
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#00F5FF] text-black font-semibold rounded hover:bg-white transition-colors uppercase leading-none"
                >
                  SAVE BIOGRAPHY
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ==================== SUB-TAB 3: CLIENT INQUIRIES LOGS ==================== */}
        {activeSubTab === "inquiries" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-[#00F5FF] tracking-widest uppercase block mb-1">
                  SEC_04_A // INTAKE TRANSACTIONS
                </span>
                <h3 className="font-display text-2xl tracking-wider text-white uppercase">
                  CLIENT COMMUNICATIONS LOG
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#ffffff]/30 bg-white/5 border border-white/5 px-2.5 py-1.5 rounded">
                TOTAL TRANSMISSIONS: {inquiries.length}
              </span>
            </div>

            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="border border-white/5 bg-[#101010]/55 p-6 sm:p-8 rounded-sm space-y-4 hover:border-[#00F5FF]/20 transition-all relative overflow-hidden group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-2xl uppercase tracking-wider text-white">{inq.name}</span>
                        <div className="h-2 w-[1px] bg-white/10" />
                        <span className="text-xs text-[#00F5FF] font-mono select-all font-semibold">{inq.email}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase mt-1">
                        <span className="text-white/40">class:</span>
                        <span className="text-white bg-white/5 px-1.5 py-0.5 rounded leading-none">{inq.projectType}</span>
                        <span className="text-white/40 ml-2">bounds:</span>
                        <span className="text-white bg-white/5 px-1.5 py-0.5 rounded leading-none">{inq.budgetRange}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 flex-shrink-0">
                      {/* Timestamp log */}
                      <span className="text-[8px] font-mono text-white/30 hidden sm:block">
                        {new Date(inq.createdAt).toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="p-1.5 border border-white/5 rounded-full hover:border-red-500/50 hover:text-red-500 text-white/35 transition-colors cursor-pointer"
                        title="Delete inquiry record"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Senders message block */}
                  <div className="bg-black/40 border border-white/5 p-4 rounded-sm">
                    <p className="text-xs text-[#ffffff]/75 font-sans font-light leading-relaxed whitespace-pre-wrap">
                      "{inq.message}"
                    </p>
                  </div>
                </div>
              ))}

              {inquiries.length === 0 && (
                <div className="text-center py-24 border border-white/5 rounded bg-[#101010]/30 select-none">
                  <MessageCircle size={36} className="mx-auto text-white/10 mb-4 animate-pulse" />
                  <h4 className="text-sm font-display tracking-widest text-[#ffffff]/50">NO TRANSACTIONS ACTIVE</h4>
                  <p className="text-[10px] text-white/30 font-mono mt-1 uppercase">AETHER INTAKE QUEUE IS CURRENTLY EMPTY</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
