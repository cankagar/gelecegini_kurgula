import type { Metadata } from "next";
import "./payastem.css";
import { Nav } from "./_components/Nav";
import { Hero } from "./_components/Hero";
import { About } from "./_components/About";
import { Teams } from "./_components/Teams";
import { Projects } from "./_components/Projects";
import { Achievements } from "./_components/Achievements";
import { Stats } from "./_components/Stats";
import { Gallery } from "./_components/Gallery";
import { Footer } from "./_components/Footer";

export const metadata: Metadata = {
  title: "PayaSTEM | Geleceği Kurgular",
  description:
    "PayaSTEM; robotik, yapay zeka, havacılık-uzay ve ileri STEM eğitimiyle geleceğin mühendislerini yetiştiren elit bir mühendislik ve Ar-Ge topluluğudur.",
};

export default function PayaStemShowcasePage() {
  return (
    <div className="ps-root relative">
      <div className="ps-noise" />
      <Nav />
      <Hero />
      <About />
      <Teams />
      <Projects />
      <Achievements />
      <Stats />
      <Gallery />
      <Footer />
    </div>
  );
}
