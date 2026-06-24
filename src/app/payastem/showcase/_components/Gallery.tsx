import { Reveal } from "./Reveal";
import { PsAtomIcon, PsChipIcon, PsMedalIcon, PsRobotIcon, PsRocketIcon } from "./icons";

const TILES = [
  { icon: PsRocketIcon, caption: "Fırlatma testi, 2025", span: "row-span-2", from: "#1a1004", to: "#2a1808" },
  { icon: PsRobotIcon, caption: "Atlas kol prototipi", span: "", from: "#04161a", to: "#08222a" },
  { icon: PsChipIcon, caption: "Görüntü işleme test bankı", span: "", from: "#120a02", to: "#1d1305" },
  { icon: PsAtomIcon, caption: "Sensör kalibrasyonu", span: "row-span-2", from: "#06181c", to: "#0c2a30" },
  { icon: PsMedalIcon, caption: "TEKNOFEST finali", span: "", from: "#1a1004", to: "#2a1808" },
  { icon: PsRobotIcon, caption: "Saha testi, kış kampı", span: "", from: "#0a0a0a", to: "#171717" },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-ps-cyan/30 bg-ps-cyan/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-ps-cyan">
            Galeri
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-xl font-display text-3xl font-semibold leading-tight text-ps-text sm:text-5xl">
            Laboratuvardan kareler
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {TILES.map(({ icon: Icon, caption, span, from, to }, i) => (
            <Reveal key={caption} delay={i * 0.06} className={span}>
              <div className="group relative h-full min-h-[180px] overflow-hidden rounded-3xl ring-1 ring-white/[0.06]">
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
                />
                <div className="ps-grid-bg absolute inset-0 opacity-20" />
                <Icon size={56} className="absolute right-4 top-4 text-white/10" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-[12px] font-medium text-ps-text-soft transition-colors duration-300 group-hover:text-ps-text">
                    {caption}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
