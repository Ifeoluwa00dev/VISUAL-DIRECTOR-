export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  gallery: string[];
  description: string;
  client: string;
  year: string;
  services: string[];
  videoUrl?: string; // Optional YouTube / Vimeo or actual video URL
  featured?: boolean;
  order: number;
}

export interface ArtistBio {
  name: string;
  discipline: string;
  portrait: string;
  bioText: string;
  philosophy: string;
  availability: "Available for Booking" | "Fully Booked";
  cvLink?: string;
  socialLinks: {
    id: string;
    platform: string;
    url: string;
  }[];
  selectedClients: {
    id: string;
    name: string;
  }[];
}

export interface ClientInquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  message: string;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  duration?: string;
  startingPrice?: string;
}
