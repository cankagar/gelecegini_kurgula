import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-text border-t border-text/20 text-text-muted">
      <div className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr] gap-10">

        <div>
          <span className="text-xl font-bold tracking-tight text-white">
            Paya<span className="text-primary">STEM</span>
          </span>
          <p className="mt-3 text-sm text-white/40 max-w-[260px] leading-relaxed">
            Öğrenciler, öğretmenler ve bilim tutkunları için Türkiye'nin STEM eğitim ve topluluk platformu.
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-primary mb-4">Platform</p>
          <nav className="flex flex-col gap-2.5">
            {[
              { href: "/serbest-kursu", label: "Serbest Kürsü" },
              { href: "/oyun-merkezi",  label: "Oyun Merkezi"  },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-white/50 hover:text-primary transition-colors duration-200">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-primary mb-4">Hesap</p>
          <nav className="flex flex-col gap-2.5">
            {[
              { href: "/login",     label: "Giriş Yap" },
              { href: "/register",  label: "Kayıt Ol"  },
              { href: "/dashboard", label: "Panelim"   },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-white/50 hover:text-primary transition-colors duration-200">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/30">
        © {new Date().getFullYear()} PayaSTEM — Bilimle Geleceğini Kurgula.
      </div>
    </footer>
  );
}
