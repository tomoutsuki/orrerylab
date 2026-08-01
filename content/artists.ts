import type { ArtistIdentity } from "./types";

export const artists: ArtistIdentity[] = [
  {
    slug: "keyaki", name: "Keyaki", role: "Artist identity · kinetic direction", statement: "Rhythm as a material for tension, release and unfamiliar motion.", description: "Keyaki moves through high-energy electronic work, rhythmic density and structural experimentation—always looking for the human charge inside the mechanism.", visualMode: "kinetic", links: [],
    orbit: { href: "/artists/keyaki", radius: .35, eccentricity: .42, angle: -26, phase: .15, color: "#d1bc88" },
    audio: { src: "/audio/Lichtgarten.ogg" }
  },
  {
    slug: "rei-tsukigaki", name: "Rei Tsukigaki", role: "Artist identity · cinematic direction", statement: "Narrative music for the place where atmosphere becomes memory.", description: "Rei Tsukigaki explores cinematic, orchestral and reflective forms with a patient focus on emotional detail, scale and afterimage.", visualMode: "cinematic", links: [],
    orbit: { href: "/artists/rei-tsukigaki", radius: .46, eccentricity: .68, angle: 38, phase: .58, color: "#9cabba" },
    audio: { src: "/audio/Hatred.ogg" }
  }
];

export const getArtist = (slug: string) => artists.find((artist) => artist.slug === slug);
