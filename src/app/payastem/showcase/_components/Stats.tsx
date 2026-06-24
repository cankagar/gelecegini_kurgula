import { Counter } from "./Counter";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const STATS = [
  { to: 7, suffix: "+", label: "Yıllık Deneyim" },
  { to: 1200, suffix: "+", label: "Eğitilen Öğrenci" },
  { to: 250, suffix: "+", label: "Tamamlanan Proje" },
  { to: 38, suffix: "+", label: "Yarışma Ödülü" },
];

export function Stats() {
  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] bg-white/[0.03] p-1.5 ring-1 ring-white/[0.06]">
          <div className="rounded-[calc(2rem-0.375rem)] bg-gradient-to-br from-ps-bronze/30 via-ps-card to-ps-card px-6 py-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] sm:px-12">
            <Reveal>
              <p className="text-center text-[11px] uppercase tracking-[0.25em] text-ps-cyan">Rakamlarla PayaSTEM</p>
            </Reveal>
            <RevealGroup className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {STATS.map((s) => (
                <RevealItem key={s.label}>
                  <div className="text-center">
                    <div className="font-display text-4xl font-semibold text-ps-gold sm:text-5xl">
                      <Counter to={s.to} suffix={s.suffix} />
                    </div>
                    <p className="mt-2 text-[12.5px] text-ps-text-soft">{s.label}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
