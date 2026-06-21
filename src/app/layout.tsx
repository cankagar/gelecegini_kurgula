import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
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
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main style={{ minHeight: "calc(100vh - 65px)" }}>
            {children}
          </main>
          {/* Footer will go here */}
        </Providers>
      </body>
    </html>
  );
}
