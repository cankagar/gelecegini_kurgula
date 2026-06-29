'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RocketIcon, PuzzleIcon, FlaskIcon, CpuIcon, CompassIcon, CalculatorIcon } from '@/shared/ui/icons';
import { useCountUpColor } from '@/widgets/stat-counter/useCountUpColor';

const SPRING = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.85, ease: SPRING, delay },
});

function useCountUp(value: number) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1800, bounce: 0 });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, motionVal, value]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => setDisplay(Math.round(v).toLocaleString('tr-TR')));
    return unsubscribe;
  }, [spring, value]);

  return { ref, display };
}

const BIG_STATS = [
  { value: 10000, suffix: '+', label: 'Öğrenci',      color: '#6A866D' },
  { value: 500,   suffix: '+', label: 'Eğitmen',      color: '#B87342' },
  { value: 50,    suffix: '+', label: 'Aktif Eğitim', color: '#CFA24D' },
  { value: 20,    suffix: '+', label: 'Partner Okul', color: '#5B7C99' },
];

const DISCIPLINES = [
  {
    icon: FlaskIcon,
    color: '#6A866D',
    tagTr: 'BİLİM',
    title: 'Science',
    desc: 'Fiziksel dünyanın sırlarını çözün. Kuantum mekaniğinden biyoteknolojiye uzanan geniş bir yelpaze.',
  },
  {
    icon: CpuIcon,
    color: '#B87342',
    tagTr: 'TEKNOLOJİ',
    title: 'Technology',
    desc: 'Yazılım, yapay zeka ve sistem entegrasyonu ile fikirleri gerçeğe dönüştüren dijital araçlar.',
  },
  {
    icon: CompassIcon,
    color: '#CFA24D',
    tagTr: 'MÜHENDİSLİK',
    title: 'Engineering',
    desc: 'Sistemli tasarım, prototipleme ve optimizasyon. Çözüm odaklı mimari yapılar inşa etme süreci.',
  },
  {
    icon: CalculatorIcon,
    color: '#5B7C99',
    tagTr: 'MATEMATİK',
    title: 'Mathematics',
    desc: 'Evrenin dili. Algoritmalar, veri analizi ve modellerin temelindeki mantıksal çerçeve.',
  },
];

function BigStatCard({ value, suffix, label, color, delay }: {
  value: number; suffix: string; label: string; color: string; delay: number;
}) {
  const { ref, display } = useCountUp(value);
  return (
    <motion.div
      {...fadeUp(delay)}
      className="rounded-2xl border-2 px-4 py-8 text-center overflow-hidden"
      style={{ borderColor: color, background: `${color}0D` }}
    >
      <span
        ref={ref}
        className="block font-heading font-black tracking-[-0.03em] tabular-nums leading-none"
        style={{ color, fontSize: 'clamp(1.35rem, 4.2vw, 2.1rem)' }}
      >
        {display}{suffix}
      </span>
      <span className="block mt-2.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color }}>
        {label}
      </span>
    </motion.div>
  );
}

function DisciplineRow({ d, delay }: {
  d: { icon: React.ComponentType<{ size?: number; className?: string }>; color: string; tagTr: string; title: string; desc: string };
  delay: number;
}) {
  const Icon = d.icon;
  return (
    <motion.div {...fadeUp(delay)} className="relative py-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10">
      <div
        className="absolute top-1/2 -translate-y-1/2 right-0 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${d.color}26, transparent 70%)`, filter: 'blur(10px)' }}
      />
      <div className="relative z-10 flex items-center gap-4 sm:w-[280px] shrink-0">
        <div className="w-12 h-12 rounded-[12px] bg-text flex items-center justify-center shrink-0" style={{ color: d.color }}>
          <Icon size={22} />
        </div>
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-1" style={{ color: d.color }}>
            {d.tagTr}
          </span>
          <h3 className="font-heading text-[1.4rem] font-bold text-text tracking-[-0.02em]">{d.title}</h3>
        </div>
      </div>
      <p className="relative z-10 flex-1 text-sm text-text-muted leading-[1.7] sm:max-w-[560px]">{d.desc}</p>
    </motion.div>
  );
}

const STATS = [
  { value: 2400, suffix: '',  label: 'Öğrenci',  sub: 'aktif kullanıcı'  },
  { value: 150,  suffix: '+', label: 'Öğretmen', sub: 'içerik üreticisi' },
  { value: 48,   suffix: '',  label: 'Modül',    sub: 'eğitim içeriği'   },
];

const FEATURE_TAGS = [
  { label: 'Serbest Kürsü',     dotClass: 'bg-success'  },
  { label: 'Oyun Merkezi',      dotClass: 'bg-primary'  },
  { label: 'Canlı Tartışmalar', dotClass: 'bg-accent'   },
];

const AVATARS = [
  { initials: 'AK', bg: 'bg-success-bg',   text: 'text-success'  },
  { initials: 'MS', bg: 'bg-primary-tint',  text: 'text-primary'  },
  { initials: 'EY', bg: 'bg-warning-bg',    text: 'text-warning'  },
  { initials: 'ZB', bg: 'bg-danger-bg',     text: 'text-danger'   },
];

function ArrowIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

// ── Floating stat card (hero right column) ────────────────────────────────────
function StatCard({ value, suffix, label, sub, delay }: {
  value: number; suffix: string; label: string; sub: string; delay: number;
}) {
  const { ref, display, color, transition } = useCountUpColor<HTMLSpanElement>(value);
  return (
    <motion.div {...fadeUp(delay)}>
      <div className="p-[2px] rounded-[18px] bg-border ring-1 ring-border/50">
        <div className="bg-bg rounded-[16px] px-6 py-5 flex items-center gap-5"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)' }}>
          <span ref={ref} className="font-heading text-[2.1rem] font-black tracking-[-0.04em] shrink-0 tabular-nums" style={{ color, transition }}>
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
    tagClass: 'bg-success-bg text-success',
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
      <div className="group p-[2px] rounded-[22px] bg-border ring-1 ring-border/50 h-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-primary-border/60">
        <div
          className={`bg-surface rounded-[20px] h-full relative overflow-hidden flex ${f.horizontal ? 'flex-col sm:flex-row items-start sm:items-center gap-8 p-8' : 'flex-col p-9 min-h-[280px]'}`}
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)' }}
        >
          {/* Hover ambient */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{ background: 'radial-gradient(ellipse 65% 55% at 85% 110%, rgba(207,162,77,0.07) 0%, transparent 65%)' }}
          />

          <div className={`relative z-10 ${f.horizontal ? 'flex flex-col sm:flex-row items-start sm:items-center gap-8 w-full' : 'flex flex-col h-full'}`}>

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

            <div className="flex-1">
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

        <div className="absolute inset-0 pointer-events-none select-none">
          <Image src="/background.jpg" alt="" fill priority className="object-cover object-center opacity-[0.04]" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 55% 65% at 72% 48%, rgba(207,162,77,0.09) 0%, transparent 65%)' }}
          />
        </div>

        <div className="relative z-10 w-full max-w-[1160px] mx-auto px-6 md:px-10 xl:px-16 py-28">
          <div className="flex flex-col md:flex-row md:items-center md:gap-16 lg:gap-20">

            {/* ─ Left ─ */}
            <div className="flex-1 md:max-w-[560px]">

              {/* Headline */}
              <motion.h1
                {...fadeUp(0.06)}
                className="font-heading text-[clamp(3rem,6.5vw,6rem)] font-black leading-[1.0] tracking-[-0.038em] text-text mb-6"
              >
                Bilimle{' '}
                <em
                  className="not-italic text-primary block"
                  style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.01em' }}
                >
                  Geleceğini
                </em>
                Kurgula
              </motion.h1>

              {/* Feature tags */}
              <motion.div {...fadeUp(0.12)} className="flex flex-wrap gap-2 mb-7">
                {FEATURE_TAGS.map((t) => (
                  <span
                    key={t.label}
                    className="inline-flex items-center gap-1.5 rounded-full bg-surface border border-border px-3 py-1.5 text-[11px] font-medium text-text-muted"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${t.dotClass}`} />
                    {t.label}
                  </span>
                ))}
              </motion.div>

              {/* Body */}
              <motion.p
                {...fadeUp(0.17)}
                className="text-[1rem] text-text-muted leading-[1.72] max-w-[400px] mb-10"
              >
                Öğrenciler, öğretmenler ve bilim tutkunları için Türkiye&rsquo;nin en kapsamlı STEM eğitim ve topluluk platformu.
              </motion.p>

              {/* CTAs */}
              <motion.div {...fadeUp(0.22)} className="flex gap-3 flex-wrap mb-8">
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

              {/* Social proof */}
              <motion.div {...fadeUp(0.27)} className="flex items-center gap-3 mb-10">
                <div className="flex -space-x-2">
                  {AVATARS.map((a) => (
                    <div
                      key={a.initials}
                      className={`w-8 h-8 rounded-full ${a.bg} ${a.text} flex items-center justify-center text-[10px] font-bold ring-2 ring-bg shrink-0`}
                    >
                      {a.initials}
                    </div>
                  ))}
                </div>
                <p className="text-[12px] text-text-muted leading-tight">
                  <span className="font-semibold text-text">2.400+</span> öğrenci zaten platformda
                </p>
              </motion.div>
            </div>

            {/* ─ Right: Dashboard widget ─ */}
            <div className="hidden md:flex flex-col gap-2.5 w-[290px] shrink-0">
              <motion.div {...fadeUp(0.18)}>
                <div className="p-[2px] rounded-[16px] bg-border ring-1 ring-border/50">
                  <div
                    className="bg-bg rounded-[14px] px-5 py-3.5 flex items-center justify-between"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <span className="text-[11px] font-semibold text-text-muted tracking-wide">Canlı Veriler</span>
                    </div>
                    <span className="text-[10px] text-text-muted/60 font-medium">Bugün</span>
                  </div>
                </div>
              </motion.div>

              {STATS.map((s, i) => (
                <StatCard key={s.label} {...s} delay={0.26 + i * 0.09} />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════ STEM STATS & DİSİPLİNLER ═══════════════ */}
      <section className="py-28 bg-bg border-b border-border">
        <div className="max-w-[1160px] mx-auto px-6 md:px-10 xl:px-16">

          {/* Stat row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-28">
            {BIG_STATS.map((s, i) => (
              <BigStatCard key={s.label} {...s} delay={i * 0.08} />
            ))}
          </div>

          {/* Heading */}
          <motion.div {...fadeUp(0)} className="text-center max-w-[640px] mx-auto mb-16">
            <h2 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-bold tracking-[-0.03em] text-text mb-4">
              STEM Disiplinleri
            </h2>
            <p className="text-text-muted text-[0.95rem] leading-[1.7]">
              Temel yapı taşlarını keşfedin. Her disiplin, yenilikçi çözümler üretmek için birbiriyle entegre çalışır.
            </p>
          </motion.div>

          {/* Disciplines rows */}
          <div className="flex flex-col divide-y divide-border">
            {DISCIPLINES.map((d, i) => (
              <DisciplineRow key={d.title} d={d} delay={0.1 + i * 0.08} />
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════ PLATFORM ═══════════════ */}
      <section className="py-32 bg-bg-alt border-b border-border">
        <div className="max-w-[1160px] mx-auto px-6 md:px-10 xl:px-16">

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

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

            {/* Serbest Kürsü — col-span-8 */}
            <FeatureCard f={FEATURES[0]} delay={0.08} />

            {/* Join CTA — col-span-4 */}
            <motion.div {...fadeUp(0.16)} className="md:col-span-4 h-full">
              <div className="p-[2px] rounded-[22px] bg-primary/30 ring-1 ring-primary/20 h-full">
                <div
                  className="bg-primary rounded-[20px] p-9 h-full flex flex-col justify-between min-h-[280px] relative overflow-hidden"
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 55% at 110% 110%, rgba(255,255,255,0.1) 0%, transparent 60%)' }}
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

            {/* Oyun Merkezi — col-span-12 horizontal */}
            <FeatureCard f={FEATURES[1]} delay={0.24} />

          </div>
        </div>
      </section>

    </main>
  );
}
