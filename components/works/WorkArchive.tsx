"use client";
import Link from "next/link";
import { useState } from "react";
import type { Work } from "@/content/types";

const labels: Record<Work["type"], string> = { "original-release": "Original release", "rhythm-game": "Rhythm game", soundtrack: "Soundtrack", commission: "Commission", collaboration: "Collaboration", experiment: "Experiment" };
export function WorkArchive({ works }: { works: Work[] }) { const [type, setType] = useState<Work["type"] | "all">("all"); const filtered = type === "all" ? works : works.filter((work) => work.type === type); const types = [...new Set(works.map((work) => work.type))];
  return <><div className="archive-controls" aria-label="Filter works"><button className="filter" aria-pressed={type === "all"} onClick={() => setType("all")}>All works</button>{types.map((item) => <button className="filter" key={item} aria-pressed={type === item} onClick={() => setType(item)}>{labels[item]}</button>)}</div><div className="work-grid" aria-live="polite">{filtered.map((work) => <article className="work-card" key={work.slug}><div className={`artwork ${work.artwork.mode}`}><span className="art-title">{work.title}</span></div><div className="work-card-body"><span className="metadata">{work.year} · {labels[work.type]} · {work.artist}</span><h2>{work.title}</h2><p><em>{work.emotionalCentre}</em></p><p>{work.shortDescription}</p><Link href={`/works/${work.slug}`} className="card-link" aria-label={`Explore ${work.title}`}>Explore the work →</Link></div></article>)}</div></>;
}
