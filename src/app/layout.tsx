import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/widgets/site-chrome/SiteChrome";
import { ClickSpark } from "@/shared/ui/click-spark";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
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
      <body className={`${dmSans.variable} ${bricolage.variable} font-sans`}>
        <ClickSpark />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
