import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { PsMedalIcon } from "./icons";

const AWARDS = [
  { year: "2025", title: "TEKNOFEST Roket Kategorisi", place: "1. Türkiye Derecesi" },
  { year: "2024", title: "Uluslararası Robotik Olimpiyatı", place: "2. Dünya Derecesi" },
  { year: "2023", title: "Ulusal Yapay Zeka Hackathonu", place: "1. Türkiye Derecesi" },
  { year: "2022", title: "Avrupa Gençlik Uzay Yarışması", place: "3. Avrupa Derecesi" },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-ps-gold/30 bg-ps-gold/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-ps-gold">
            Başarılar
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-xl font-display text-3xl font-semibold leading-tight text-ps-text sm:text-5xl">
            Uluslararası sahnede kanıtlanmış mühendislik
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-4">
          {AWARDS.map(({ year, title, place }) => (
            <RevealItem key={title}>
              <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-ps-card/60 px-6 py-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ps-gold/30 text-ps-gold">
                    <PsMedalIcon size={19} />
                  </span>
                  <div>
                    <p className="font-display text-base font-medium text-ps-text sm:text-lg">{title}</p>
                    <p className="text-[12.5px] text-ps-text-soft">{year}</p>
                  </div>
                </div>
                <span className="w-max rounded-full border border-ps-cyan/30 bg-ps-cyan/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-ps-cyan">
                  {place}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
