import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/widgets/site-chrome/SiteChrome";
import { ClickSpark } from "@/shared/ui/click-spark";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-heading",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "PayaSTEM | Geleceğini Kurgula",
  description: "Gençler için bilim, teknoloji, mühendislik ve matematik odaklı eğitim ve topluluk platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${jakarta.variable} ${outfit.variable} ${newsreader.variable} font-sans`}>
        <ClickSpark />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
