import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/widgets/navbar";
import Footer from "@/widgets/footer";

const inter = Inter({
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "NexSTEM | Geleceğini Kurgula",
  description: "Gençler için bilim, teknoloji, mühendislik ve matematik odaklı eğitim ve topluluk platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} ${spaceGrotesk.variable}`}>
        <Navbar />
        <main style={{ minHeight: "calc(100vh - 65px)" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
