import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SoundProvider } from "@/components/audio/SoundProvider";
import { GlobalNavigation } from "@/components/navigation/GlobalNavigation";
import { site } from "@/content/site";
export const metadata: Metadata = { title: { default: "Orrery Lab — Music for worlds between genres", template: "%s — Orrery Lab" }, description: site.description };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SoundProvider><a className="skip-link" href="#main-content">Skip to content</a><GlobalNavigation/><main id="main-content">{children}</main><footer className="site-footer"><span>© {new Date().getFullYear()} Orrery Lab · Music and creative technology</span><nav className="footer-links" aria-label="Footer navigation"><Link href="/works">Works</Link><Link href="/artists">Artists</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav></footer></SoundProvider></body></html>; }
