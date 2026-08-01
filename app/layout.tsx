import type { Metadata } from "next";
import "./globals.css";
import { SoundProvider } from "@/components/audio/SoundProvider";
import { GlobalNavigation } from "@/components/navigation/GlobalNavigation";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { site } from "@/content/site";
export const metadata: Metadata = { title: { default: "Orrery Lab — Music for worlds between genres", template: "%s — Orrery Lab" }, description: site.description };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SoundProvider><a className="skip-link" href="#main-content">Skip to content</a><GlobalNavigation/><main id="main-content">{children}</main><SiteFooter/></SoundProvider></body></html>; }
