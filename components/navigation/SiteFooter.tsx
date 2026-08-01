"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const isOrreryHome = usePathname() === "/";

  return <footer className={`site-footer${isOrreryHome ? ` ${styles.home}` : ""}`}>
    <span>© {new Date().getFullYear()} Orrery Lab · Music and creative technology</span>
    {!isOrreryHome && <nav className="footer-links" aria-label="Footer navigation"><Link href="/works">Works</Link><Link href="/artists">Artists</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav>}
  </footer>;
}
