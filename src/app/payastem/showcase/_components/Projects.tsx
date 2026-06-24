import { Reveal } from "./Reveal";
import { PsArrowIcon, PsAtomIcon, PsChipIcon, PsRocketIcon } from "./icons";

const PROJECTS = [
  {
    icon: PsRocketIcon,
    title: "Aurora-1 Sondaj Roketi",
    desc: "12.000 ft irtifaya ulaşan, tam telemetrili ve kurtarma sistemli sıvı yakıtlı sondaj roketi.",
    meta: "Havacılık & Uzay",
    gradient: "from-[#1a1004] via-[#2a1808] to-ps-card",
  },
  {
    icon: PsChipIcon,
    title: "Atlas Otonom Kol",
    desc: "Bilgisayarlı görü destekli, milimetrik hassasiyetle nesne sınıflandırması yapan endüstriyel robot kolu.",
    meta: "Robotik",
    gradient: "from-[#04161a] via-[#08222a] to-ps-card",
  },
  {
    icon: PsAtomIcon,
    title: "Nova Karar Motoru",
    desc: "Gerçek zamanlı sensör verisinden anomali tespiti yapan, üretimde çalışan bir makine öğrenmesi sistemi.",
    meta: "Yapay Zeka",
    gradient: "from-[#120a02] via-[#1d1305] to-ps-card",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-ps-gold/30 bg-ps-gold/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-ps-gold">
            Projeler
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-xl font-display text-3xl font-semibold leading-tight text-ps-text sm:text-5xl">
            Laboratuvardan sahaya çıkan mühendislik
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-6">
          {PROJECTS.map(({ icon: Icon, title, desc, meta, gradient }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <a
                href="#"
                className="group block rounded-[2rem] bg-white/[0.03] p-1.5 ring-1 ring-white/[0.06] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-ps-gold/30"
              >
                <div
                  className={`relative grid overflow-hidden rounded-[calc(2rem-0.375rem)] bg-gradient-to-br ${gradient} shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] sm:grid-cols-[1.1fr_1fr]`}
                >
                  <div className="flex flex-col justify-between gap-8 p-8 sm:p-12">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ps-gold/30 text-ps-gold">
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-ps-cyan">{meta}</span>
                      <h3 className="mt-3 font-display text-2xl font-medium text-ps-text sm:text-3xl">{title}</h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-ps-text-soft">{desc}</p>
                    </div>
                    <span className="inline-flex w-max items-center gap-3 text-[13px] font-medium text-ps-text">
                      Detayları Gör
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                        <PsArrowIcon size={12} />
                      </span>
                    </span>
                  </div>

                  <div className="relative hidden min-h-[260px] overflow-hidden sm:block">
                    <div className="ps-grid-bg absolute inset-0 opacity-30" />
                    <div
                      className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                      style={{
                        background:
                          "radial-gradient(circle at 70% 40%, rgba(221,153,22,0.18), transparent 55%), radial-gradient(circle at 30% 80%, rgba(0,200,255,0.14), transparent 50%)",
                      }}
                    />
                    <Icon size={140} className="absolute -right-6 bottom-[-30px] text-white/[0.04]" />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
