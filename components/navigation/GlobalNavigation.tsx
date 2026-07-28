"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { SoundToggle } from "@/components/audio/SoundToggle";

export function GlobalNavigation() {
  const pathname = usePathname(); const [open, setOpen] = useState(false); const firstMobileLink = useRef<HTMLAnchorElement>(null);
  useEffect(() => { if (open) firstMobileLink.current?.focus(); }, [open]);
  const links = site.navigation.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}</Link>);
  return <header className={`site-header ${open ? "menu-open" : ""}`}><div className="nav-inner"><Link className="brand" href="/" aria-label="Orrery Lab home"><span className="brand-mark" aria-hidden="true"/><span>Orrery Lab</span></Link><nav className="nav-links" aria-label="Primary navigation">{links}<SoundToggle /></nav><button className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>Menu</button>{open && <nav className="mobile-panel" id="mobile-menu" aria-label="Mobile navigation"><Link ref={firstMobileLink} href="/works" aria-current={pathname === "/works" ? "page" : undefined} onClick={() => setOpen(false)}>Works</Link>{site.navigation.slice(1).map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}</Link>)}<SoundToggle /></nav>}</div></header>;
}
