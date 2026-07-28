export type ExternalLink = { label: string; href: string };
export type CreativeElement = { label: string; description: string };
export type Credit = { role: string; name?: string };

export type ArtistIdentity = {
  slug: "keyaki" | "rei-tsukigaki";
  name: string;
  role: string;
  statement: string;
  description: string;
  visualMode: "kinetic" | "cinematic";
  links: ExternalLink[];
};

export type Work = {
  slug: string;
  title: string;
  subtitle?: string;
  year: number;
  type: "original-release" | "rhythm-game" | "soundtrack" | "commission" | "collaboration" | "experiment";
  artist: "Keyaki" | "Rei Tsukigaki" | "Orrery Lab";
  emotionalCentre: string;
  shortDescription: string;
  longDescription?: string;
  creativeElements: CreativeElement[];
  credits: Credit[];
  artwork: { alt: string; mode: "iracema" | "amber" | "blue" };
  links: ExternalLink[];
  relatedWorks?: string[];
  accent: string;
  featured?: boolean;
  placeholder?: boolean;
};
