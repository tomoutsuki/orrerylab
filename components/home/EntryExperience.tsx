"use client";
import { useEffect, useState } from "react";
import { useSound } from "@/components/audio/SoundProvider";

export function EntryExperience() { const [visible, setVisible] = useState(false); const { setEnabled, play } = useSound();
  useEffect(() => { if (!sessionStorage.getItem("orrery-entry") && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setVisible(true); }, []);
  const enter = (sound: boolean) => { sessionStorage.setItem("orrery-entry", "dismissed"); if (sound) { setEnabled(true); setTimeout(() => play("enter"), 50); } setVisible(false); };
  if (!visible) return null; return <section className="entry" aria-label="Orrery Lab introduction"><div className="entry-inner"><div className="entry-orbits" aria-hidden="true"><i/><span className="entry-light"/></div><p className="eyebrow">Orrery Lab</p><h1>There is still beauty in this world.</h1><div className="entry-controls"><button className="button" onClick={() => enter(false)}>Enter Orrery</button><button className="button secondary" onClick={() => enter(true)}>Enter with sound</button><button className="button secondary" onClick={() => enter(false)}>Enter in silence</button></div><button className="entry-skip" onClick={() => enter(false)}>Skip introduction</button></div></section>;
}
