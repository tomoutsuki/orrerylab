"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSound } from "@/components/audio/SoundProvider";

const branches = [
  { label: "Works", href: "/works", cx: 710, cy: 203, r: 9 }, { label: "Artists", href: "/artists", cx: 225, cy: 243, r: 8 },
  { label: "About", href: "/about", cx: 670, cy: 396, r: 7 }, { label: "Contact", href: "/contact", cx: 316, cy: 408, r: 8 }
];
export function OrbitalSystem({ compact = false }: { compact?: boolean }) {
  const [reduced, setReduced] = useState(false); const [hidden, setHidden] = useState(false); const { play } = useSound();
  useEffect(() => { const media = window.matchMedia("(prefers-reduced-motion: reduce)"); const update = () => setReduced(media.matches); const visibility = () => setHidden(document.hidden); update(); visibility(); media.addEventListener("change", update); document.addEventListener("visibilitychange", visibility); return () => { media.removeEventListener("change", update); document.removeEventListener("visibilitychange", visibility); }; }, []);
  return <svg className="orbit-system" viewBox="0 0 920 610" role="img" aria-label="Orrery Lab navigation: Works, Artists, About and Contact orbit a central Orrery Lab body.">
    <g className={reduced ? "" : "orbit-motion"} style={!reduced ? { transformOrigin: "460px 305px", animation: compact ? "none" : "orbit 180s linear infinite", animationPlayState: hidden ? "paused" : "running" } : undefined}>
      <ellipse className="orbit-path" cx="460" cy="305" rx="375" ry="115" transform="rotate(-24 460 305)"/><ellipse className="orbit-path dim" cx="460" cy="305" rx="332" ry="145" transform="rotate(34 460 305)"/><ellipse className="orbit-path" cx="460" cy="305" rx="245" ry="92" transform="rotate(67 460 305)"/><ellipse className="orbit-path dim" cx="460" cy="305" rx="410" ry="78" transform="rotate(9 460 305)"/>
    </g><g><circle className="orbit-center" cx="460" cy="305" r="46"/><circle className="orbit-dot" cx="460" cy="305" r="3"/><text x="460" y="382" textAnchor="middle" className="orbit-label">Orrery Lab</text></g>
    {branches.map((branch) => <Link key={branch.href} href={branch.href} className="orbit-link" onFocus={() => play()} onMouseEnter={() => play()}><circle className="orbit-body" cx={branch.cx} cy={branch.cy} r={branch.r + 9} opacity="0"/><circle className="orbit-body" cx={branch.cx} cy={branch.cy} r={branch.r}/><text x={branch.cx} y={branch.cy - 20} textAnchor="middle" className="orbit-label">{branch.label}</text></Link>)}
  </svg>;
}
