'use client';

import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RocketIcon, PuzzleIcon, FlaskIcon, CpuIcon, CompassIcon, CalculatorIcon, GraduationCapIcon, UsersIcon, TargetIcon, BookIcon, TrophyIcon } from '@/shared/ui/icons';
import { useCountUpColor } from '@/widgets/stat-counter/useCountUpColor';
import { SECTION_FLOW_STOPS, buildLinearGradient } from '@/shared/lib';

const SPRING = [0.16, 1, 0.3, 1] as const;

// One continuous backdrop spanning every body section — each section gets its own
// soft tint, blending smoothly into the next instead of a hard color switch.
// Starts exactly on --color-bg so it picks up seamlessly where the Hero's
// background (also --color-bg) ends, then eases into the cool tech tones.
// Stops live in shared/lib so the site dock can sample the same colors while scrolling.
const SECTION_FLOW_GRADIENT = buildLinearGradient(SECTION_FLOW_STOPS);

// Card/chip surfaces that used to be a flat cream (bg-surface) now pick up a
// richer shade of whichever section of the flow they sit in, instead of
// standing out as the same beige regardless of position.
const SURFACE_TINTS = {
  ekosistem: '#E2F1EA',
  disiplinler: '#DCEAFB',
  isbirlikleri: '#E5E7F6',
  haberler: '#DFF1EE',
} as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.85, ease: SPRING, delay },
});

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-2.5 mb-4">
      <span className="w-7 h-px bg-primary/50" />
      <span className="text-[13px] uppercase tracking-[0.2em] font-bold text-primary">{children}</span>
      <span className="w-7 h-px bg-primary/50" />
    </div>
  );
}

// Thin ornamental rule between sections — fades at both ends so it reads as a
// soft accent rather than a hard line cutting across the color-flow backdrop.
function SectionDivider() {
  return (
    <div className="flex items-center justify-center" aria-hidden="true">
      <div className="flex items-center gap-3 w-full max-w-[340px]">
        <span
          className="h-px flex-1"
          style={{ background: 'linear-gradient(to right, transparent, rgba(207,162,77,0.6))' }}
        />
        <span className="w-9 h-[2px] rounded-full bg-primary/80 shrink-0" />
        <span
          className="h-px flex-1"
          style={{ background: 'linear-gradient(to left, transparent, rgba(207,162,77,0.6))' }}
        />
      </div>
    </div>
  );
}

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

function ScienceGhost() {
  return (
    <svg viewBox="0 0 800 280" fill="none" className="h-[150%] w-auto" preserveAspectRatio="xMaxYMid meet">
      {/* atom */}
      <g transform="translate(130,150)" stroke="currentColor" strokeWidth="3">
        <ellipse cx="0" cy="0" rx="88" ry="32" transform="rotate(18)" />
        <ellipse cx="0" cy="0" rx="88" ry="32" transform="rotate(-18)" />
        <ellipse cx="0" cy="0" rx="32" ry="88" />
        <circle cx="0" cy="0" r="12" fill="currentColor" stroke="none" />
      </g>
      {/* H2O molecule */}
      <g transform="translate(330,90)" stroke="currentColor" strokeWidth="3">
        <circle cx="0" cy="0" r="20" />
        <circle cx="-40" cy="32" r="13" />
        <circle cx="40" cy="32" r="13" />
        <line x1="0" y1="0" x2="-40" y2="32" />
        <line x1="0" y1="0" x2="40" y2="32" />
      </g>
      <text x="288" y="190" fontSize="38" fontFamily="ui-monospace, monospace" fontWeight="700" fill="currentColor">H₂O</text>
      {/* microscope */}
      <g transform="translate(470,30) scale(2.1)" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 86h26l-3-8H19l-3 8Z" />
        <path d="M29 78V46" />
        <path d="M29 46c0-8 6-14 14-14" />
        <circle cx="43" cy="20" r="6" />
        <path d="M18 56h16" />
      </g>
      {/* DNA */}
      <g transform="translate(660,30)" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M0,0 Q26,20 0,40 Q-26,60 0,80 Q26,100 0,120 Q-26,140 0,160 Q26,180 0,200 Q-26,220 0,240" />
        <path d="M0,0 Q-26,20 0,40 Q26,60 0,80 Q-26,100 0,120 Q26,140 0,160 Q-26,180 0,200 Q26,220 0,240" opacity="0.55" />
      </g>
    </svg>
  );
}

function TechnologyGhost() {
  return (
    <svg viewBox="0 0 800 280" fill="none" className="h-[150%] w-auto" preserveAspectRatio="xMaxYMid meet">
      {/* circuit */}
      <g transform="translate(60,140)" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <rect x="0" y="-20" width="40" height="40" rx="4" />
        <path d="M20 -20V-40M20 20V40M-20 0H0M40 0H60M60 0H60l20-20M60 0l20 20" />
        <circle cx="20" cy="-40" r="3" fill="currentColor" />
        <circle cx="80" cy="-20" r="3" fill="currentColor" />
        <circle cx="80" cy="20" r="3" fill="currentColor" />
      </g>
      {/* brain */}
      <g transform="translate(270,80)" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M30 10c-22 0-34 16-34 34 0 12 6 18 6 30 0 14 10 22 24 22h8c14 0 24-8 24-22 0-12 6-18 6-30 0-18-12-34-34-34Z" />
        <path d="M30 10v86M14 34c6 4 6 12 0 18M46 34c-6 4-6 12 0 18M14 70c6-4 10 0 10 6M46 70c-6-4-10 0-10 6" />
      </g>
      {/* AI tag */}
      <g transform="translate(470,30)">
        <rect x="0" y="0" width="76" height="50" rx="8" stroke="currentColor" strokeWidth="3" />
        <text x="38" y="34" fontSize="30" fontWeight="700" textAnchor="middle" fontFamily="ui-monospace, monospace" fill="currentColor">AI</text>
      </g>
      {/* code monitor */}
      <g transform="translate(470,110)" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <rect x="0" y="0" width="92" height="62" rx="6" />
        <path d="M30 78h32M46 62v16" />
        <path d="M18 22l-10 10 10 10M40 18l-8 28" />
      </g>
      {/* network */}
      <g transform="translate(660,60)" stroke="currentColor" strokeWidth="3" fill="none">
        <circle cx="0" cy="0" r="6" fill="currentColor" stroke="none" />
        <circle cx="70" cy="40" r="6" fill="currentColor" stroke="none" />
        <circle cx="10" cy="100" r="6" fill="currentColor" stroke="none" />
        <circle cx="80" cy="120" r="6" fill="currentColor" stroke="none" />
        <path d="M0 0 70 40M70 40 10 100M10 100 80 120M0 0 10 100" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function EngineeringGhost() {
  const teeth = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 800 280" fill="none" className="h-[150%] w-auto" preserveAspectRatio="xMaxYMid meet">
      {/* gear */}
      <g transform="translate(110,150)" stroke="currentColor" strokeWidth="3">
        <circle cx="0" cy="0" r="46" />
        <circle cx="0" cy="0" r="18" />
        {teeth.map((angle) => (
          <rect key={angle} x="-7" y="-62" width="14" height="18" transform={`rotate(${angle})`} />
        ))}
      </g>
      {/* blueprint square */}
      <g transform="translate(250,90)" stroke="currentColor" strokeWidth="3">
        <rect x="0" y="0" width="100" height="100" />
        <path d="M0 0 100 100M100 0 0 100" strokeWidth="2" />
        <path d="M0 50H100M50 0V100" strokeWidth="1.6" opacity="0.6" />
      </g>
      {/* bridge */}
      <g transform="translate(420,160)" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M0 40H200" />
        <path d="M30 40V-30M170 40V-30" />
        <path d="M30 -30 100 10 170 -30M30 0 100 10 170 0" strokeWidth="2" />
        <path d="M0 40V60M200 40V60" />
      </g>
      {/* building */}
      <g transform="translate(650,40)" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" fill="none">
        <path d="M0 200V100h30V60h30V20h30v180Z" />
        <path d="M10 120h10M10 150h10M40 80h10M40 110h10M70 40h10M70 70h10" />
      </g>
    </svg>
  );
}

function MathGhost() {
  return (
    <svg viewBox="0 0 800 280" fill="none" className="h-[150%] w-auto" preserveAspectRatio="xMaxYMid meet">
      {/* function graph */}
      <g transform="translate(40,40)" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M0 180V0M0 180H190" />
        <path d="M10 160C50 160 60 30 110 30S170 70 185 70" strokeWidth="3.4" />
      </g>
      <text x="40" y="50" fontSize="26" fontStyle="italic" fontFamily="ui-monospace, monospace" fill="currentColor">f(x)</text>
      {/* circle + protractor */}
      <g transform="translate(330,150)" stroke="currentColor" strokeWidth="3" fill="none">
        <circle cx="0" cy="0" r="58" />
        <path d="M0 0H58M0 0 41 -41" />
        <path d="M22 0a22 22 0 0 0 16 -16" strokeWidth="2.4" />
      </g>
      <text x="470" y="170" fontSize="84" fontFamily="ui-serif, serif" fill="currentColor">π</text>
      <text x="430" y="230" fontSize="26" fontFamily="ui-monospace, monospace" fill="currentColor">ax²+bx+c=0</text>
      {/* cone */}
      <g transform="translate(690,140)" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" fill="none">
        <path d="M0 -70 40 70" />
        <path d="M0 -70 -40 70" />
        <ellipse cx="0" cy="70" rx="40" ry="14" />
      </g>
    </svg>
  );
}

const BIG_STATS = [
  { value: 10000, suffix: '+', label: 'Dokunulan Hayat',              color: '#6A866D' },
  { value: 500,   suffix: '+', label: 'Tamamlanan Proje',             color: '#B87342' },
  { value: 150,   suffix: '+', label: 'Bilim ve Teknoloji Etkinliği', color: '#CFA24D' },
  { value: 35,    suffix: '+', label: 'Stratejik İş Ortağı',         color: '#5B7C99' },
];

const DISCIPLINES = [
  {
    icon: FlaskIcon,
    ghost: ScienceGhost,
    color: '#6A866D',
    tagTr: 'BİLİM',
    title: 'Science',
    desc: 'Fiziksel dünyanın sırlarını çözün. Kuantum mekaniğinden biyoteknolojiye uzanan geniş bir yelpaze.',
    photos: ['/payastem/photos/bilim-1.jpg', '/payastem/photos/bilim-2.jpg', '/payastem/photos/bilim-3.jpg'],
  },
  {
    icon: CpuIcon,
    ghost: TechnologyGhost,
    color: '#B87342',
    tagTr: 'TEKNOLOJİ',
    title: 'Technology',
    desc: 'Yazılım, yapay zeka ve sistem entegrasyonu ile fikirleri gerçeğe dönüştüren dijital araçlar.',
    photos: ['/payastem/photos/teknoloji-1.jpg', '/payastem/photos/teknoloji-2.jpg', '/payastem/photos/teknoloji-3.jpg'],
  },
  {
    icon: CompassIcon,
    ghost: EngineeringGhost,
    color: '#CFA24D',
    tagTr: 'MÜHENDİSLİK',
    title: 'Engineering',
    desc: 'Sistemli tasarım, prototipleme ve optimizasyon. Çözüm odaklı mimari yapılar inşa etme süreci.',
    photos: ['/payastem/photos/muhendislik-1.jpg', '/payastem/photos/muhendislik-2.jpg', '/payastem/photos/muhendislik-3.jpg'],
  },
  {
    icon: CalculatorIcon,
    ghost: MathGhost,
    color: '#5B7C99',
    tagTr: 'MATEMATİK',
    title: 'Mathematics',
    desc: 'Evrenin dili. Algoritmalar, veri analizi ve modellerin temelindeki mantıksal çerçeve.',
    photos: ['/payastem/photos/matematik-1.jpg', '/payastem/photos/matematik-2.jpg', '/payastem/photos/matematik-3.jpg'],
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

function PhotoSlider({ images, color, delay }: { images: string[]; color: string; delay: number }) {
  const [index, setIndex] = useState(0);
  const [errored, setErrored] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 3800);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: SPRING, delay }}
      className="relative z-10 w-[170px] sm:w-[220px] lg:w-[250px] aspect-[16/10] rounded-xl overflow-hidden border border-border shadow-sm shrink-0 mx-auto sm:mx-0 sm:ml-auto"
      style={{ background: SURFACE_TINTS.disiplinler }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -36 }}
          transition={{ duration: 0.6, ease: SPRING }}
          className="absolute inset-0"
        >
          {!errored[index] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={images[index]}
              alt=""
              className="w-full h-full object-cover"
              onError={() => setErrored((e) => ({ ...e, [index]: true }))}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-1.5" style={{ background: `${color}0D` }}>
              <span className="text-[10px] uppercase tracking-[0.14em] font-semibold" style={{ color }}>
                Görsel {index + 1}/{images.length}
              </span>
              <span className="text-[9px] text-text-muted">Fotoğraf eklenecek</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full transition-colors" style={{ background: i === index ? color : `${color}33` }} />
        ))}
      </div>
    </motion.div>
  );
}

function DisciplineRow({ d, delay }: {
  d: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    ghost: React.ComponentType;
    color: string; tagTr: string; title: string; desc: string; photos: string[];
  };
  delay: number;
}) {
  const Icon = d.icon;
  const Ghost = d.ghost;
  return (
    <motion.div
      {...fadeUp(delay)}
      className="relative rounded-2xl border overflow-hidden"
      style={{ borderColor: `${d.color}26`, background: `linear-gradient(135deg, ${d.color}0A, transparent 55%)` }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: d.color }} />
      <div
        className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none"
        style={{ color: d.color, opacity: 0.1 }}
      >
        <Ghost />
      </div>
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6 p-8 sm:p-10">
        <div className="flex-1 max-w-[440px]">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5" style={{ background: `${d.color}14`, color: d.color }}>
            <Icon size={20} />
          </div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5" style={{ color: d.color }}>
            {d.tagTr}
          </span>
          <h3 className="font-heading text-[1.6rem] font-bold text-text tracking-[-0.02em] mb-2.5">{d.title}</h3>
          <p className="text-sm text-text-muted leading-[1.7]">{d.desc}</p>
        </div>
        <PhotoSlider images={d.photos} color={d.color} delay={delay + 0.1} />
      </div>
    </motion.div>
  );
}

const STATS = [
  { value: 2400, suffix: '',  label: 'Aktif Öğrenci',   sub: 'Platformda çevrim içi' },
  { value: 150,  suffix: '+', label: 'İçerik Üreticisi', sub: 'Eğitim geliştiren'      },
  { value: 48,   suffix: '',  label: 'Yayındaki Modül', sub: 'Aktif eğitim içeriği'    },
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
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.08em] text-text leading-tight">{label}</p>
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
    desc: 'Bilimsel makaleler, topluluk tartışmaları ve bilgi paylaşımı.',
    href: '/serbest-kursu',
    btnLabel: 'Keşfet',
    col: 'md:col-span-4',
  },
  {
    icon: <PuzzleIcon size={17} />,
    tag: 'Eğlence',
    tagClass: 'bg-warning-bg text-warning',
    title: 'Oyun Merkezi',
    desc: 'Etkileşimli STEM oyunları, bilgi yarışmaları ve eğitici meydan okumalar.',
    href: '/oyun-merkezi',
    btnLabel: 'Oyna',
    col: 'md:col-span-4',
  },
  {
    icon: <GraduationCapIcon size={17} />,
    tag: 'Kurum',
    tagClass: 'bg-primary-tint text-primary',
    title: 'PayaSTEM',
    desc: 'Eğitim programları, projeler, yarışmalar ve geleceğin teknolojileri.',
    href: '/payastem',
    btnLabel: 'İncele',
    col: 'md:col-span-4',
  },
];

function FeatureCard({ f, delay }: { f: Feature; delay: number }) {
  return (
    <motion.div {...fadeUp(delay)} className={`${f.col} h-full`}>
      <div className="group p-[2px] rounded-[22px] bg-border ring-1 ring-border/50 h-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-primary-border/60">
        <div
          className={`rounded-[20px] h-full relative overflow-hidden flex ${f.horizontal ? 'flex-col sm:flex-row items-start sm:items-center gap-8 p-8' : 'flex-col p-9 min-h-[280px]'}`}
          style={{ background: SURFACE_TINTS.ekosistem, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)' }}
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

// ── Placeholder section (sections not designed yet) ────────────────────────────
function PlaceholderSection({ eyebrow, title, desc, cta, comingSoon, surfaceTint, children }: {
  eyebrow: string; title: string; desc: string;
  cta?: { href: string; label: string }; comingSoon?: boolean; surfaceTint?: string; children?: React.ReactNode;
}) {
  return (
    <section className="py-28">
      <div className="max-w-[1160px] mx-auto px-6 md:px-10 xl:px-16">
        <motion.div {...fadeUp(0)} className="text-center max-w-[640px] mx-auto">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-bold tracking-[-0.03em] text-text mb-4">
            {title}
          </h2>
          <p className="text-text-muted text-[0.95rem] leading-[1.7]">{desc}</p>
          {cta && (
            <Link
              href={cta.href}
              className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-primary hover:bg-primary-hover px-6 py-3 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
            >
              {cta.label}
              <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center">
                <ArrowIcon />
              </span>
            </Link>
          )}
          {comingSoon && (
            <span
              className="mt-7 inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-[11px] font-medium text-text-muted"
              style={{ background: surfaceTint }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              Yakında
            </span>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

// ── Partner logo marquee ────────────────────────────────────────────────────────
const PARTNERS = [
  { icon: GraduationCapIcon, label: 'Üniversite' },
  { icon: UsersIcon, label: 'Kamu Kurumu' },
  { icon: CpuIcon, label: 'Teknoloji Şirketi' },
  { icon: TargetIcon, label: 'STK' },
  { icon: BookIcon, label: 'Eğitim Kurumu' },
  { icon: FlaskIcon, label: 'Ar-Ge Merkezi' },
  { icon: TrophyIcon, label: 'Sanayi Kuruluşu' },
  { icon: CompassIcon, label: 'Kalkınma Ajansı' },
];

function PartnerLogoMarquee({ tint }: { tint?: string }) {
  const items = [...PARTNERS, ...PARTNERS];
  return (
    <div
      className="relative overflow-hidden mt-14"
      style={{
        maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <motion.div
        className="flex items-center gap-4 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        {items.map(({ icon: Icon, label }, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 rounded-full border border-border px-5 py-3 shrink-0"
            style={{ background: tint }}
          >
            <Icon size={16} className="text-text-muted" />
            <span className="text-xs font-medium text-text-muted whitespace-nowrap">{label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="flex flex-col bg-bg">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">

        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
          }}
        >
          <Image src="/background.jpg" alt="" fill priority className="object-cover object-center opacity-[0.04]" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 55% 65% at 72% 48%, rgba(207,162,77,0.09) 0%, transparent 65%)' }}
          />
        </div>

        <div className="relative z-10 w-full max-w-[1160px] mx-auto px-6 md:px-10 xl:px-16 py-14 lg:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:gap-16 lg:gap-20">

            {/* ─ Left ─ */}
            <div className="flex-1 md:max-w-[560px]">

              {/* Headline */}
              <motion.h1
                {...fadeUp(0.06)}
                className="font-heading text-[clamp(2.6rem,6vw,5.5rem)] font-black leading-[1.0] tracking-[-0.038em] text-text mb-5"
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
              <motion.div {...fadeUp(0.12)} className="flex flex-wrap gap-2 mb-5">
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
                className="text-[1rem] text-text-muted leading-[1.72] max-w-[400px] mb-7"
              >
                Öğrenciler, öğretmenler ve bilim tutkunları için Türkiye&rsquo;nin en kapsamlı STEM eğitim ve topluluk platformu.
              </motion.p>

              {/* CTAs */}
              <motion.div {...fadeUp(0.22)} className="flex gap-3 flex-wrap mb-6">
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
              <motion.div {...fadeUp(0.27)} className="flex items-center gap-3">
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
                    className="bg-bg rounded-[14px] px-5 py-3.5 flex items-center"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <span className="text-[11px] font-semibold text-text-muted tracking-wide">Canlı Veriler</span>
                    </div>
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

      {/* ═══════════════ BODY SECTIONS (shared color-flow backdrop) ═══════════════ */}
      <div id="color-flow" style={{ background: SECTION_FLOW_GRADIENT }}>

      {/* ═══════════════ RAKAMLARLA PAYASTEM ═══════════════ */}
      <section className="py-28">
        <div className="max-w-[1160px] mx-auto px-6 md:px-10 xl:px-16">

          {/* Stat heading */}
          <motion.div {...fadeUp(0)} className="text-center max-w-[640px] mx-auto mb-12">
            <SectionEyebrow>Etki Rakamları</SectionEyebrow>
            <h2 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-bold tracking-[-0.03em] text-text mb-4">
              Rakamlarla PayaSTEM
            </h2>
            <p className="text-text-muted text-[0.95rem] leading-[1.7]">
              Bilim, teknoloji ve inovasyon yolculuğumuzun etkisini rakamlarla keşfedin.
            </p>
          </motion.div>

          {/* Stat row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BIG_STATS.map((s, i) => (
              <BigStatCard key={s.label} {...s} delay={i * 0.08} />
            ))}
          </div>

        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════ PAYASTEM EKOSİSTEMİ ═══════════════ */}
      <section className="py-32">
        <div className="max-w-[1160px] mx-auto px-6 md:px-10 xl:px-16">

          <motion.div {...fadeUp(0)} className="text-center max-w-[640px] mx-auto mb-14">
            <SectionEyebrow>Dijital Ekosistem</SectionEyebrow>
            <h2 className="font-heading text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold tracking-[-0.03em] text-text mb-4">
              PayaSTEM Ekosistemi
            </h2>
            <p className="text-text-muted text-[0.95rem] leading-[1.7]">
              Bilim, teknoloji ve öğrenmeyi tek bir platformda buluşturan dijital ekosistemi keşfedin.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <FeatureCard f={FEATURES[0]} delay={0.08} />
            <FeatureCard f={FEATURES[1]} delay={0.16} />
            <FeatureCard f={FEATURES[2]} delay={0.24} />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════ PAYASTEM PREVIEW ═══════════════ */}
      <PlaceholderSection
        eyebrow="Kurumsal Kimlik"
        title="PayaSTEM"
        desc="Bilim, teknoloji ve inovasyon ekosistemi olarak STEM eğitimiyle geleceğin nesillerini geliştiriyoruz."
        cta={{ href: '/payastem', label: 'Daha Fazlasını Keşfet' }}
      />

      <SectionDivider />

      {/* ═══════════════ STEM DİSİPLİNLERİ ═══════════════ */}
      <section className="py-28">
        <div className="max-w-[1160px] mx-auto px-6 md:px-10 xl:px-16">

          {/* Heading */}
          <motion.div {...fadeUp(0)} className="text-center max-w-[640px] mx-auto mb-16">
            <SectionEyebrow>Eğitim Vizyonumuz</SectionEyebrow>
            <h2 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-bold tracking-[-0.03em] text-text mb-4">
              STEM Disiplinleri
            </h2>
            <p className="text-text-muted text-[0.95rem] leading-[1.7]">
              Temel yapı taşlarını keşfedin. Her disiplin, yenilikçi çözümler üretmek için birbiriyle entegre çalışır.
            </p>
          </motion.div>

          {/* Disciplines rows */}
          <div className="flex flex-col gap-5">
            {DISCIPLINES.map((d, i) => (
              <DisciplineRow key={d.title} d={d} delay={0.1 + i * 0.08} />
            ))}
          </div>

        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════ GÜÇLÜ İŞ BİRLİKLERİMİZ ═══════════════ */}
      <PlaceholderSection
        eyebrow="Kurumsal Güven"
        title="Güçlü İş Birliklerimiz"
        desc="Bilim, teknoloji ve inovasyonu daha fazla kişiye ulaştırmak için kamu kurumları, üniversiteler ve özel sektörle birlikte çalışıyoruz."
        surfaceTint={SURFACE_TINTS.isbirlikleri}
      >
        <PartnerLogoMarquee tint={SURFACE_TINTS.isbirlikleri} />
      </PlaceholderSection>

      <SectionDivider />

      {/* ═══════════════ HABERLER ═══════════════ */}
      <PlaceholderSection
        eyebrow="Güncel Gelişmeler"
        title="Haberler"
        desc="Topluluğumuzdan en son haberler, etkinlik duyuruları ve başarı hikayeleri."
        surfaceTint={SURFACE_TINTS.haberler}
        comingSoon
      />

      </div>

    </main>
  );
}
