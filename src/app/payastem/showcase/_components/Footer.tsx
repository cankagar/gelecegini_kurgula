import { Reveal } from "./Reveal";
import { PsInstagramIcon, PsLinkedinIcon, PsXIcon, PsYoutubeIcon } from "./icons";

const LINK_GROUPS = [
  {
    title: "Kurum",
    links: ["Hakkımızda", "Takımlar", "Kariyer", "Basın Kiti"],
  },
  {
    title: "Çalışmalar",
    links: ["Projeler", "Yarışmalar", "Başarılar", "Galeri"],
  },
  {
    title: "Topluluk",
    links: ["Bize Katıl", "Sponsorluk", "İletişim", "SSS"],
  },
];

const SOCIALS = [
  { icon: PsInstagramIcon, label: "Instagram" },
  { icon: PsXIcon, label: "X" },
  { icon: PsYoutubeIcon, label: "YouTube" },
  { icon: PsLinkedinIcon, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer id="footer" className="relative border-t border-white/[0.06] bg-ps-bg-soft px-4 pt-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col gap-12 pb-16 lg:flex-row lg:justify-between">
            <div className="max-w-xs">
              <span className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-ps-text">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-ps-gold/40 text-[10px] font-bold text-ps-gold">
                  PS
                </span>
                PayaSTEM
              </span>
              <p className="mt-4 text-[13px] leading-relaxed text-ps-text-soft">
                Robotik, yapay zeka ve havacılık-uzay alanlarında geleceği kurgulayan
                mühendislik topluluğu.
              </p>
              <div className="mt-6 flex gap-3">
                {SOCIALS.map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ps-text-soft transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-ps-cyan/50 hover:text-ps-cyan hover:shadow-[0_0_18px_-4px_rgba(0,200,255,0.6)]"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              {LINK_GROUPS.map((group) => (
                <div key={group.title}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ps-gold">{group.title}</p>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {group.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-[13px] text-ps-text-soft transition-colors duration-300 hover:text-ps-text"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-7 text-[11.5px] text-ps-text-soft sm:flex-row">
          <p>&copy; 2026 PayaSTEM. Tüm hakları saklıdır.</p>
          <p className="uppercase tracking-[0.2em] text-ps-gold/70">Geleceği Kurgular</p>
        </div>
      </div>
    </footer>
  );
}
