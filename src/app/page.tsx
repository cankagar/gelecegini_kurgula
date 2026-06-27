'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { RocketIcon, PuzzleIcon } from '@/shared/ui/icons';
import { useCountUpColor } from '@/widgets/stat-counter/useCountUpColor';

const SPRING = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.85, ease: SPRING, delay },
});

const STATS = [
  { value: 2400, suffix: '',  label: 'Öğrenci',   sub: 'aktif kullanıcı'     },
  { value: 150,  suffix: '+', label: 'Öğretmen',  sub: 'içerik üreticisi'    },
  { value: 48,   suffix: '',  label: 'Modül',     sub: 'eğitim içeriği'      },
];

function ArrowIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

// ── Ticker (hero bottom bar) ──────────────────────────────────────────────────
function StatTicker({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, display, color, transition } = useCountUpColor<HTMLSpanElement>(value);
  return (
    <div className="flex items-baseline gap-2">
      <span
        ref={ref}
        className="font-heading text-[1.55rem] font-black tracking-[-0.04em]"
        style={{ color, transition }}
      >
        {display}{suffix}
      </span>
      <span className="text-xs text-text-muted font-medium">{label}</span>
    </div>
  );
}

// ── Floating stat card (hero right column) ────────────────────────────────────
function StatCard({ value, suffix, label, sub, delay }: {
  value: number; suffix: string; label: string; sub: string; delay: number;
}) {
  const { ref, display, color, transition } = useCountUpColor<HTMLSpanElement>(value);
  return (
    <motion.div {...fadeUp(delay)}>
      {/* Double-bezel */}
      <div className="p-[2px] rounded-[18px] bg-border/70 ring-1 ring-border/40">
        <div
          className="bg-surface rounded-[16px] px-6 py-5 flex items-center gap-5"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.95)' }}
        >
          <span
            ref={ref}
            className="font-heading text-[2.1rem] font-black tracking-[-0.04em] shrink-0 tabular-nums"
            style={{ color, transition }}
          >
            {display}{suffix}
          </span>
          <div className="min-w-0">
            <p className="text-[0.8rem] font-semibold text-text leading-tight">{label}</p>
            <p className="text-[0.7rem] text-text-muted mt-0.5">{sub}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Feature card ──────────────────────────────────────────────────────────────
type Feature = {
  icon: React.ReactNode;
  tag: string;
  tagClass: string;
  title: string;
  desc: string;
  href: string;
  btnLabel: string;
  col: string;
  horizontal?: boolean;
};

const FEATURES: Feature[] = [
  {
    icon: <RocketIcon size={17} />,
    tag: 'Topluluk',
    tagClass: 'bg-[#E8F3ED] text-[#4F8A6D]',
    title: 'Serbest Kürsü',
    desc: 'Bilimsel tartışmalar, makaleler ve bilgi paylaşımı. Bilim insanlarının buluştuğu platform.',
    href: '/serbest-kursu',
    btnLabel: 'Keşfet',
    col: 'md:col-span-8',
  },
  {
    icon: <PuzzleIcon size={17} />,
    tag: 'Eğlence',
    tagClass: 'bg-warning-bg text-warning',
    title: 'Oyun Merkezi',
    desc: 'Bilgi yarışmaları, mini oyunlar ve liderlik tabloları. Bilimle eğlenceyi birleştir.',
    href: '/oyun-merkezi',
    btnLabel: 'Oyna',
    col: 'md:col-span-12',
    horizontal: true,
  },
];

function FeatureCard({ f, delay }: { f: Feature; delay: number }) {
  return (
    <motion.div {...fadeUp(delay)} className={`${f.col} h-full`}>
      {/* Double-bezel outer shell */}
      <div className="group p-[2px] rounded-[22px] bg-border/60 ring-1 ring-border/40 h-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-primary-border/50 hover:shadow-[0_0_0_4px_rgba(215,154,43,0.04)]">
        {/* Inner core */}
        <div
          className={`bg-surface rounded-[20px] h-full relative overflow-hidden flex ${f.horizontal ? 'flex-col sm:flex-row items-start sm:items-center gap-8 p-8' : 'flex-col p-9 min-h-[280px]'}`}
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.92)' }}
        >
          {/* Hover ambient */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{ background: 'radial-gradient(ellipse 65% 55% at 85% 110%, rgba(215,154,43,0.06) 0%, transparent 65%)' }}
          />

          <div className={`relative z-10 ${f.horizontal ? 'flex flex-col sm:flex-row items-start sm:items-center gap-8 w-full' : 'flex flex-col h-full'}`}>

            {/* Top / Left */}
            <div className={f.horizontal ? 'flex items-center gap-4 shrink-0' : 'flex items-start justify-between mb-7'}>
              <div className={`w-10 h-10 rounded-[11px] flex items-center justify-center shrink-0 ${f.tagClass}`}>
                {f.icon}
              </div>
              {!f.horizontal && (
                <span className={`text-[9px] uppercase tracking-[0.16em] font-semibold rounded-full px-3 py-1.5 ${f.tagClass}`}>
                  {f.tag}
                </span>
              )}
            </div>

            {/* Body */}
            <div className={f.horizontal ? 'flex-1' : 'flex-1'}>
              {f.horizontal && (
                <span className={`text-[9px] uppercase tracking-[0.16em] font-semibold rounded-full px-3 py-1.5 ${f.tagClass} mb-3 inline-block`}>
                  {f.tag}
                </span>
              )}
              <h3 className={`font-heading font-bold text-text tracking-[-0.025em] mb-2 ${f.horizontal ? 'text-[1.15rem]' : 'text-[1.35rem]'}`}>
                {f.title}
              </h3>
              <p className="text-sm text-text-muted leading-[1.7]">{f.desc}</p>
            </div>

            {/* CTA */}
            <div className={f.horizontal ? 'shrink-0' : 'mt-8 pt-5 border-t border-border'}>
              <Link
                href={f.href}
                className="group/btn inline-flex items-center gap-2.5 rounded-full bg-text hover:bg-primary px-5 py-2.5 text-white text-xs font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
              >
                {f.btnLabel}
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-px group-hover/btn:scale-105">
                  <ArrowIcon />
                </span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="flex flex-col bg-bg">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[100dvh] flex items-center border-b border-border overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image src="/background.jpg" alt="" fill priority className="object-cover object-center opacity-[0.05]" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 55% 65% at 72% 48%, rgba(215,154,43,0.08) 0%, transparent 65%)' }}
          />
        </div>

        <div className="relative z-10 w-full max-w-[1160px] mx-auto px-6 md:px-10 xl:px-16 py-28">
          <div className="flex flex-col md:flex-row md:items-center md:gap-16 lg:gap-20">

            {/* ─ Left: Copy ─ */}
            <div className="flex-1 md:max-w-[560px]">

              <motion.h1
                {...fadeUp(0.08)}
                className="font-heading text-[clamp(3rem,6.5vw,6rem)] font-black leading-[1.0] tracking-[-0.038em] text-text mb-7"
              >
                Bilimle{' '}
                <em
                  className="not-italic text-primary block"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Geleceğini
                </em>
                Kurgula
              </motion.h1>

              <motion.p
                {...fadeUp(0.15)}
                className="text-[1rem] text-text-muted leading-[1.72] max-w-[400px] mb-10"
              >
                Öğrenciler, öğretmenler ve bilim tutkunları için Türkiye&rsquo;nin en kapsamlı STEM eğitim ve topluluk platformu.
              </motion.p>

              {/* CTAs */}
              <motion.div {...fadeUp(0.21)} className="flex gap-3 flex-wrap mb-14">
                <Link
                  href="/serbest-kursu"
                  className="group inline-flex items-center gap-3 rounded-full bg-primary hover:bg-primary-hover px-6 py-3 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
                >
                  Hemen Başla
                  <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                    <ArrowIcon />
                  </span>
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface hover:border-primary-border hover:bg-primary-tint px-6 py-3 text-sm font-semibold text-text transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
                >
                  Ücretsiz Kayıt Ol
                </Link>
              </motion.div>

              {/* Stats ticker */}
              <motion.div
                {...fadeUp(0.27)}
                className="flex flex-wrap gap-x-10 gap-y-3 pt-7 border-t border-border"
              >
                {STATS.map((s) => (
                  <StatTicker key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
                ))}
              </motion.div>
            </div>

            {/* ─ Right: Floating stat cards ─ */}
            <div className="hidden md:flex flex-col gap-2.5 w-[290px] shrink-0">
              {STATS.map((s, i) => (
                <StatCard key={s.label} {...s} delay={0.22 + i * 0.1} />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════ PLATFORM ═══════════════ */}
      <section className="py-32 bg-bg-alt border-b border-border">
        <div className="max-w-[1160px] mx-auto px-6 md:px-10 xl:px-16">

          {/* Section header */}
          <motion.div
            {...fadeUp(0)}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] font-semibold text-primary mb-3">Platform</p>
              <h2 className="font-heading text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold tracking-[-0.03em] text-text">
                Seni Bekleyenler
              </h2>
            </div>
            <p className="text-text-muted text-sm max-w-[210px] sm:text-right leading-[1.65]">
              Öğrenmenin ve paylaşmanın tek adresi.
            </p>
          </motion.div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

            {/* Serbest Kürsü — col 8 */}
            <FeatureCard f={FEATURES[0]} delay={0.08} />

            {/* Join CTA — col 4, sits next to Serbest Kürsü */}
            <motion.div {...fadeUp(0.16)} className="md:col-span-4 h-full">
              <div className="group p-[2px] rounded-[22px] bg-primary/25 ring-1 ring-primary/20 h-full">
                <div
                  className="bg-primary rounded-[20px] p-9 h-full flex flex-col justify-between min-h-[280px] relative overflow-hidden"
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 55% at 110% 110%, rgba(255,255,255,0.09) 0%, transparent 60%)' }}
                  />
                  <div className="relative z-10">
                    <p className="text-[9px] uppercase tracking-[0.28em] font-semibold text-white/50 mb-5">Başla</p>
                    <h3 className="font-heading text-[1.25rem] font-bold text-white mb-2.5 tracking-[-0.02em]">
                      Ücretsiz Katıl
                    </h3>
                    <p className="text-white/65 text-sm leading-[1.68]">
                      Topluluğa hemen katıl, öğrenmeye başla.
                    </p>
                  </div>
                  <Link
                    href="/register"
                    className="relative z-10 mt-8 self-start group/btn inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/15 hover:bg-white/25 px-5 py-2.5 text-white text-xs font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
                  >
                    Kayıt Ol
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-px group-hover/btn:scale-105">
                      <ArrowIcon />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Oyun Merkezi — col 12, full-width horizontal */}
            <FeatureCard f={FEATURES[1]} delay={0.24} />

          </div>
        </div>
      </section>

    </main>
  );
}
