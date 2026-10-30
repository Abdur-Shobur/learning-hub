import type { Metadata } from "next";
import { Anek_Bangla, Hind_Siliguri, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const hind = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const anek = Anek_Bangla({
  variable: "--font-anek",
  subsets: ["bengali", "latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Roadmap Hub — সব কোর্স এক জায়গায়",
    template: "%s — Roadmap Hub",
  },
  description: "বাংলা শেখার রোডম্যাপ। হোমপেজে সব কোর্স, ভিতরে দিনভিত্তিক লার্নিং ম্যাপ।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-scroll-behavior="smooth"
      className={`${hind.variable} ${grotesk.variable} ${mono.variable} ${anek.variable} h-full antialiased`}
    >
      <body className="theme-dark min-h-full bg-bg font-sans text-ink">{children}</body>
    </html>
  );
}
