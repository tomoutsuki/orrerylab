import type { Work } from "./types";

/** Launch placeholders are isolated here for straightforward replacement. */
export const works: Work[] = [
  {
    slug: "iracema",
    title: "Iracema",
    subtitle: "Grand Finals Tiebreaker Composition",
    year: 2026,
    type: "rhythm-game",
    artist: "Orrery Lab",
    emotionalCentre: "A landscape remembered as momentum.",
    shortDescription: "An electronic and orchestral journey shaped by Brazilian landscape, narrative memory and rhythm-game intensity.",
    longDescription: "A launch placeholder for a composition where synthetic movement and orchestral scale suggest entry into an unfamiliar world. Final release information, artwork and credits will replace this editorial study.",
    creativeElements: [
      { label: "Orchestral narrative", description: "A melodic arc that carries the sense of a story in motion." },
      { label: "Brazilian landscape", description: "A sense of place treated as atmosphere, gesture and distance." },
      { label: "Indigenous instrumentation", description: "A conceptual research direction, pending final project verification." },
      { label: "Electronic intensity", description: "Synthetic momentum that sharpens the emotional contour." },
      { label: "Rhythm-game structure", description: "A form that gives changing energy a clear path." }
    ],
    credits: [], artwork: { alt: "Abstract amber composition for Iracema placeholder artwork", mode: "iracema" }, links: [], accent: "#b49a68", featured: true, placeholder: true
  },
  {
    slug: "counterweight", title: "Counterweight", subtitle: "Sketch archive", year: 2025, type: "experiment", artist: "Keyaki",
    emotionalCentre: "Tension becoming a kind of balance.", shortDescription: "A placeholder study in sharp rhythm, measured silence and shifting weight.",
    creativeElements: [{ label: "Pulse", description: "A disciplined rhythmic proposition." }, { label: "Silence", description: "Space that holds the form together." }, { label: "Contrast", description: "Two textures learning to coexist." }],
    credits: [], artwork: { alt: "Abstract steel-blue composition for Counterweight placeholder artwork", mode: "blue" }, links: [], accent: "#657385", placeholder: true
  },
  {
    slug: "soft-machines", title: "Soft Machines", subtitle: "Composition study", year: 2024, type: "original-release", artist: "Rei Tsukigaki",
    emotionalCentre: "Tenderness inside an exact mechanism.", shortDescription: "A placeholder study for cinematic harmony and carefully moving synthetic detail.",
    creativeElements: [{ label: "Harmony", description: "Warm chords with room to decay." }, { label: "Mechanism", description: "Small repetitions that accumulate meaning." }, { label: "Light", description: "A quiet invitation to keep listening." }],
    credits: [], artwork: { alt: "Abstract rust and paper composition for Soft Machines placeholder artwork", mode: "amber" }, links: [], accent: "#a97c5d", placeholder: true
  }
];

export const workTypes = [...new Set(works.map((work) => work.type))];
export const getWork = (slug: string) => works.find((work) => work.slug === slug);
