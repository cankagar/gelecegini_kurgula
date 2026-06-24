import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { PsAtomIcon, PsBrainIcon, PsRocketIcon, PsTargetIcon } from "./icons";

const PILLARS = [
  {
    icon: PsTargetIcon,
    title: "Misyon",
    text: "Genç mühendisleri ileri robotik, yapay zeka ve havacılık-uzay disiplinleriyle donatarak geleceğin teknolojilerini kurgulayan bir nesil yetiştirmek.",
  },
  {
    icon: PsAtomIcon,
    title: "Yaklaşım",
    text: "Laboratuvar disipliniyle çalışan ekipler, gerçek mühendislik problemleri üzerinde araştırma-geliştirme döngüsünü baştan sona deneyimler.",
  },
  {
    icon: PsBrainIcon,
    title: "Vizyon",
    text: "Uluslararası yarışmalarda Türkiye'yi temsil eden, akademik ve endüstriyel ölçekte etki üreten bir mühendislik enstitüsü olmak.",
  },
];

const TIMELINE = [
  { year: "2019", text: "PayaSTEM, küçük bir robotik atölyesi olarak kuruldu." },
  { year: "2021", text: "Yapay Zeka ve Roket ekipleri kuruldu, ilk ulusal finaller." },
  { year: "2023", text: "Havacılık-uzay laboratuvarı açıldı, uluslararası işbirlikleri başladı." },
  { year: "2026", text: "200+ mühendis, 30+ ödül ve büyüyen bir Ar-Ge ekosistemi." },
];

export function About() {
  return (
    <section id="about" className="relative px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-ps-cyan/30 bg-ps-cyan/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-ps-cyan">
            Hakkımızda
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold leading-tight text-ps-text sm:text-5xl">
            Mühendislik enstitüsü disipliniyle çalışan bir gençlik laboratuvarı
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ps-text-soft sm:text-base">
            PayaSTEM, akademik araştırma kültürünü genç mühendislerle buluşturan; robotik,
            yapay zeka ve havacılık-uzay alanlarında uçtan uca proje üreten bağımsız bir topluluktur.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <RevealItem key={title}>
              <div className="rounded-[2rem] bg-white/[0.03] p-1.5 ring-1 ring-white/[0.06]">
                <div className="flex h-full flex-col gap-5 rounded-[calc(2rem-0.375rem)] bg-ps-card/80 p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-xl">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-ps-gold/30 text-ps-gold">
                    <Icon size={19} />
                  </div>
                  <h3 className="font-display text-lg font-medium text-ps-text">{title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-ps-text-soft">{text}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-24 grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="rounded-[2rem] bg-white/[0.03] p-1.5 ring-1 ring-white/[0.06]">
              <div className="flex h-full flex-col justify-between gap-8 rounded-[calc(2rem-0.375rem)] bg-gradient-to-br from-ps-bronze/40 via-ps-card to-ps-card p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                <PsRocketIcon size={28} className="text-ps-gold" />
                <p className="font-display text-xl leading-snug text-ps-text">
                  &ldquo;Geleceği hayal etmiyoruz, kurguluyoruz — her devre, her satır kod, her test uçuşu ile.&rdquo;
                </p>
                <span className="text-[11px] uppercase tracking-[0.2em] text-ps-text-soft">PayaSTEM Manifestosu</span>
              </div>
            </div>
          </Reveal>

          <div className="relative flex flex-col gap-8 pl-6">
            <div className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-ps-gold/60 via-white/10 to-transparent" />
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.08}>
                <div className="relative">
                  <span className="absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full border border-ps-gold bg-ps-bg" />
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-display text-lg font-semibold text-ps-gold">{item.year}</span>
                    <p className="text-sm leading-relaxed text-ps-text-soft">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
