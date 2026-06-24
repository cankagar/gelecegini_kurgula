import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { PsAtomIcon, PsBrainIcon, PsRobotIcon, PsRocketIcon } from "./icons";

const TEAMS = [
  {
    icon: PsRocketIcon,
    name: "Roket Takımı",
    desc: "Sıvı ve katı yakıtlı model roket tasarımı, itki sistemleri ve uçuş telemetrisi üzerine çalışır.",
    tag: "Havacılık & Uzay",
  },
  {
    icon: PsRobotIcon,
    name: "Robotik Takımı",
    desc: "Otonom robot platformları, mekanik tasarım ve gerçek zamanlı kontrol sistemleri geliştirir.",
    tag: "Robotik",
  },
  {
    icon: PsBrainIcon,
    name: "Yapay Zeka Takımı",
    desc: "Bilgisayarlı görü, makine öğrenmesi ve karar destek sistemleri alanında araştırma yapar.",
    tag: "Yapay Zeka",
  },
  {
    icon: PsAtomIcon,
    name: "STEM Takımı",
    desc: "Disiplinler arası proje tasarımı, eğitim içerikleri ve genç mühendis yetiştirme programları yürütür.",
    tag: "STEM Eğitimi",
  },
];

export function Teams() {
  return (
    <section id="teams" className="relative px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-ps-gold/30 bg-ps-gold/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-ps-gold">
            Takımlar
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-xl font-display text-3xl font-semibold leading-tight text-ps-text sm:text-5xl">
            Dört disiplin, bir mühendislik kültürü
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {TEAMS.map(({ icon: Icon, name, desc, tag }) => (
            <RevealItem key={name}>
              <div className="group rounded-[2rem] bg-white/[0.03] p-1.5 ring-1 ring-white/[0.06] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-ps-cyan/30">
                <div className="relative h-full overflow-hidden rounded-[calc(2rem-0.375rem)] bg-ps-card/80 p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-xl transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:shadow-[0_0_50px_-12px_rgba(0,200,255,0.35)]">
                  <div
                    className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                    style={{ background: "radial-gradient(circle, rgba(0,200,255,0.25), transparent 70%)" }}
                  />
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-ps-cyan transition-colors duration-500 group-hover:border-ps-cyan/50">
                      <Icon size={20} />
                    </div>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-ps-text-soft">
                      {tag}
                    </span>
                  </div>
                  <h3 className="relative z-10 mt-7 font-display text-xl font-medium text-ps-text">{name}</h3>
                  <p className="relative z-10 mt-3 text-[13.5px] leading-relaxed text-ps-text-soft">{desc}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
