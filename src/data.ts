import { Project, ArtistBio, ServiceItem, ClientInquiry } from "./types";

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj_1",
    title: "NEON REVERIE: CYBERNETIC EXISTENCE",
    slug: "neon-reverie",
    category: "Digital Art & 3D Direction",
    coverImage: "/src/assets/images/project_cyber_1781869759581.jpg",
    gallery: [
      "/src/assets/images/project_cyber_1781869759581.jpg",
      "/src/assets/images/hero_background_1781869745518.jpg"
    ],
    description: "An immersive exploration of transhumanist aesthetics in a hyper-digitized sprawl. This project bridges physical material design with interactive neural projections, forming a responsive canvas that reacts to soundwaves.",
    client: "Synthetica Labs",
    year: "2026",
    services: ["3D Art Direction", "Holographic Projection", "Generative Art Design"],
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4", // Safe embedding URL
    featured: true,
    order: 1
  },
  {
    id: "proj_2",
    title: "MONOLITH OF SILENCE",
    slug: "monolith-of-silence",
    category: "Cinematography & Video",
    coverImage: "/src/assets/images/project_monolith_1781869772154.jpg",
    gallery: [
      "/src/assets/images/project_monolith_1781869772154.jpg",
      "/src/assets/images/hero_background_1781869745518.jpg"
    ],
    description: "An award-winning visual short film documenting the dark, silent ridges of isolated mountain ranges under cosmic teal beams. This project contrasts high-shutter atmospheric smoke with long exposure astral phenomena.",
    client: "National Cinematic League",
    year: "2025",
    services: ["Cinematography", "Directing", "Color Grading", "Soundscapes"],
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    featured: true,
    order: 2
  },
  {
    id: "proj_3",
    title: "CHROMATIC SOUL: COUTURE ELEVATED",
    slug: "chromatic-soul",
    category: "Editorial Photography",
    coverImage: "/src/assets/images/project_fashion_1781869784368.jpg",
    gallery: [
      "/src/assets/images/project_fashion_1781869784368.jpg",
      "/src/assets/images/hero_background_1781869745518.jpg"
    ],
    description: "A high-fashion avant-garde physical study. We configured electric neon-teal backlights against dark, high-contrast, moody profiles to capture silhouettes that blend cybernetic and classic apparel details.",
    client: "AETHER Magazine",
    year: "2026",
    services: ["Fashion Editorial Photography", "Studio Lighting Design", "Creative Direction"],
    featured: true,
    order: 3
  }
];

export const INITIAL_BIO: ArtistBio = {
  name: "KAIEN CHEN",
  discipline: "VISUAL DIRECTOR & DIGITAL ARTIST",
  portrait: "/src/assets/images/artist_profile_1781869799881.jpg",
  bioText: "I am a visual storyteller specializing in dark, atmospheric multimedia direction, digital art installations, and futuristic editorial cinematography. Operating at the intersection of material reality and glowing digital synthesis, my mission is to capture awe-inspiring cinematic moments that reveal the sublime.",
  philosophy: "In the absence of infinite light, shadows describe reality with far greater precision. I embrace near-black contrast, smoke-sculpted geometries, and a single electric teal beacon to map the quiet digital future.",
  availability: "Available for Booking",
  cvLink: "#",
  socialLinks: [
    { id: "soc_1", platform: "Instagram", url: "https://instagram.com" },
    { id: "soc_2", platform: "Vimeo", url: "https://vimeo.com" },
    { id: "soc_3", platform: "Behance", url: "https://behance.net" },
    { id: "soc_4", platform: "LinkedIn", url: "https://linkedin.com" }
  ],
  selectedClients: [
    { id: "cl_1", name: "Synthetica Labs" },
    { id: "cl_2", name: "AETHER Magazine" },
    { id: "cl_3", name: "National Cinematic League" },
    { id: "cl_4", name: "NEO-TOKYO Fashion Week" },
    { id: "cl_5", name: "Paradox Sound Co." }
  ]
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "srv_1",
    title: "Cinematography & Short Films",
    description: "Full-scale visual directing, camera work, color correction, and cinematic grade rendering. Optimized for high-fidelity moody releases, music videos, and cinematic brand stories.",
    startingPrice: "$3,500"
  },
  {
    id: "srv_2",
    title: "3D Art & Virtual Direction",
    description: "Photorealistic 3D environment modeling, neon lighting physics simulation, and virtual projection mapping. Perfect for spatial digital art and interactive web graphics.",
    startingPrice: "$2,800"
  },
  {
    id: "srv_3",
    title: "Avant-Garde Portraiture",
    description: "High-contrast editorial photoshoot with specialized backlighting, cybernetic accessories, and dark atmospheric aesthetic details. Perfect for creators, designers, and catalogs.",
    startingPrice: "$1,500"
  },
  {
    id: "srv_4",
    title: "VFX & Compositing",
    description: "Weaving cinematic smoke, custom neon geometries, holographic overlays, and neural noise projection into existing assets. Elevating standard captures into cosmic masterworks.",
    startingPrice: "$2,200"
  }
];

export const INITIAL_INQUIRIES: ClientInquiry[] = [
  {
    id: "inq_1",
    name: "Elena Rostova",
    email: "elena@syntheticalabs.io",
    projectType: "3D Virtual Direction",
    budgetRange: "$10,000 - $25,000",
    message: "Hey Kaien, we loved Neon Reverie and want to commission a physical lobby installation for our new research lab in Zurich. It needs to reflect interactive soundwave projection.",
    createdAt: "2026-06-18T14:32:00.000Z"
  }
];
