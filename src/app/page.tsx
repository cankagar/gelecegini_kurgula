'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  RocketIcon,
  PuzzleIcon,
} from '@/shared/ui/icons';
import { useCountUpColor } from '@/widgets/stat-counter/useCountUpColor';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.65, ease, delay },
});

const STATS = [
  { value: 2400, suffix: '', label: 'Öğrenci' },
  { value: 150, suffix: '+', label: 'Öğretmen' },
  { value: 48, suffix: '', label: 'Modül' },
];

function HeroStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, display, color, transition } = useCountUpColor<HTMLSpanElement>(value);

  return (
    <div className="flex items-baseline gap-2.5">
      <span
        ref={ref}
        className="font-heading text-[1.65rem] font-black tracking-[-0.03em]"
        style={{ color, transition }}
      >
        {display}
        {suffix}
      </span>
      <span className="text-xs text-text-muted font-medium">{label}</span>
    </div>
  );
}

type Feature = {
  icon: React.ReactNode;
  tag: string;
  tagClass: string;
  title: string;
  desc: string;
  href: string;
  large: boolean;
  col: string;
};

const FEATURES: Feature[] = [
  {
    icon: <RocketIcon size={18} />,
    tag: 'Topluluk',
    tagClass: 'bg-[#E8F3ED] text-[#4F8A6D]',
    title: 'Serbest Kürsü',
    desc: 'Bilimsel tartışmalar, makaleler ve bilgi paylaşımı. Bilim insanlarının buluştuğu platform.',
    href: '/serbest-kursu',
    large: true,
    col: 'md:col-span-8',
  },
  {
    icon: <PuzzleIcon size={18} />,
    tag: 'Eğlence',
    tagClass: 'bg-[#FBF3E0] text-[#A67A10]',
    title: 'Oyun Merkezi',
    desc: 'Bilgi yarışmaları, mini oyunlar ve liderlik tabloları.',
    href: '/oyun-merkezi',
    large: false,
    col: 'md:col-span-8',
  },
];

function ArrowUpRight() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col bg-bg">

      {/* ─── HERO ─── */}
      <section className="relative min-h-[100dvh] flex items-center border-b border-border overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image
            src="/background.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-[0.07]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 65% 45%, rgba(81,107,140,0.07) 0%, transparent 65%)',
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-[1160px] mx-auto px-6 md:px-10 xl:px-16 py-32">

          {/* Eyebrow */}
          <motion.p
            {...fadeUp(0)}
            className="text-[10px] uppercase tracking-[0.3em] font-semibold text-text-muted mb-8"
          >
            Türkiye&rsquo;nin STEM Platformu
          </motion.p>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.07)}
            className="font-heading text-[clamp(3.4rem,7vw,6.5rem)] font-black leading-[1.02] tracking-[-0.035em] text-text mb-8 max-w-[820px]"
          >
            Bilimle{' '}
            <em
              className="not-italic text-primary"
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                letterSpacing: '-0.01em',
              }}
            >
              Geleceğini
            </em>
            <br />
            Kurgula
          </motion.h1>

          <motion.p
            {...fadeUp(0.13)}
            className="text-[1.05rem] text-text-muted leading-[1.65] max-w-[460px] mb-12"
          >
            Öğrenciler, öğretmenler ve bilim tutkunları için Türkiye&rsquo;nin en kapsamlı STEM eğitim ve topluluk platformu.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.18)} className="flex gap-3 flex-wrap mb-20">
            <Link
              href="/serbest-kursu"
              className="inline-flex items-center gap-2 rounded-[5px] bg-primary hover:bg-primary-hover px-6 py-[11px] text-sm font-semibold text-white transition-colors duration-150 active:scale-[0.98]"
            >
              Hemen Başla
            </Link>
            <Link
              href="/serbest-kursu"
              className="inline-flex items-center gap-2 rounded-[5px] border border-border bg-surface hover:border-primary-border px-6 py-[11px] text-sm font-semibold text-text transition-colors duration-150 active:scale-[0.98]"
            >
              Sınıfları Keşfet
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp(0.24)}
            className="flex flex-wrap gap-x-12 gap-y-4 pt-8 border-t border-border"
          >
            {STATS.map((s) => (
              <HeroStat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </motion.div>

        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-28 bg-bg-alt border-b border-border">
        <div className="max-w-[1160px] mx-auto px-6 md:px-10 xl:px-16">

          {/* Section header */}
          <motion.div
            {...fadeUp(0)}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] font-semibold text-primary mb-3">
                Platform
              </p>
              <h2 className="font-heading text-[clamp(1.7rem,3vw,2.5rem)] font-bold tracking-[-0.025em] text-text">
                Platformda Seni Bekleyenler
              </h2>
            </div>
            <p className="text-text-muted text-sm max-w-[230px] sm:text-right leading-[1.65]">
              Öğrenmenin, üretmenin ve paylaşmanın tek adresi.
            </p>
          </motion.div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

            {FEATURES.map((f, i) => (
              <motion.div key={f.title} {...fadeUp(0.06 + i * 0.07)} className={f.col}>
                <FeatureCard f={f} />
              </motion.div>
            ))}

            {/* Join CTA */}
            <motion.div {...fadeUp(0.34)} className="md:col-span-4">
              <div className="bg-primary rounded-[12px] p-8 h-full flex flex-col justify-between min-h-[220px]">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.28em] font-semibold text-white/50 mb-5">
                    Başla
                  </p>
                  <h3 className="font-heading text-[1.2rem] font-bold text-white mb-2">
                    Ücretsiz Katıl
                  </h3>
                  <p className="text-white/65 text-sm leading-[1.65]">
                    Topluluğa hemen katıl, öğrenmeye başla.
                  </p>
                </div>
                <Link
                  href="/register"
                  className="mt-8 self-start inline-flex items-center gap-2 rounded-[4px] border border-white/25 bg-white/15 hover:bg-white/25 px-4 py-2 text-white text-xs font-semibold transition-colors duration-150"
                >
                  Kayıt Ol
                  <ArrowUpRight />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  );
}

function FeatureCard({ f }: { f: Feature }) {
  return (
    <div
      className={`bg-surface border border-border rounded-[12px] ${
        f.large ? 'p-9 min-h-[280px]' : 'p-7 min-h-[220px]'
      } h-full flex flex-col transition-shadow duration-200 hover:shadow-[0_2px_16px_rgba(0,0,0,0.05)]`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className={`w-9 h-9 rounded-[8px] flex items-center justify-center shrink-0 ${f.tagClass}`}>
          {f.icon}
        </div>
        <span className={`text-[9px] uppercase tracking-[0.14em] font-semibold rounded-full px-2.5 py-1 ${f.tagClass}`}>
          {f.tag}
        </span>
      </div>

      {/* Body */}
      <div className="mt-6 flex-1">
        <h3 className={`font-heading ${f.large ? 'text-[1.2rem]' : 'text-[1.05rem]'} font-bold text-text mb-2`}>
          {f.title}
        </h3>
        <p className="text-text-muted text-sm leading-[1.65]">{f.desc}</p>
      </div>

      {/* Footer — large cards only */}
      {f.large && (
        <div className="mt-8 pt-5 border-t border-border">
          <Link
            href={f.href}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text hover:text-primary transition-colors duration-150"
          >
            Keşfet
            <ArrowUpRight />
          </Link>
        </div>
      )}
    </div>
  );
}
