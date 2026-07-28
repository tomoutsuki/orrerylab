import type { ArtistIdentity } from "./types";

export const artists: ArtistIdentity[] = [
  { slug: "keyaki", name: "Keyaki", role: "Artist identity · kinetic direction", statement: "Rhythm as a material for tension, release and unfamiliar motion.", description: "Keyaki moves through high-energy electronic work, rhythmic density and structural experimentation—always looking for the human charge inside the mechanism.", visualMode: "kinetic", links: [] },
  { slug: "rei-tsukigaki", name: "Rei Tsukigaki", role: "Artist identity · cinematic direction", statement: "Narrative music for the place where atmosphere becomes memory.", description: "Rei Tsukigaki explores cinematic, orchestral and reflective forms with a patient focus on emotional detail, scale and afterimage.", visualMode: "cinematic", links: [] }
];

export const getArtist = (slug: string) => artists.find((artist) => artist.slug === slug);
