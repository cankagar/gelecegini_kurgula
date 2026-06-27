'use client';

import { motion } from 'framer-motion';

const ease = [0.32, 0.72, 0, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.75, ease, delay },
});

type Game = {
  id: string;
  tag: string;
  tagClass: string;
  title: string;
  desc: string;
  difficulty: string;
  players: string;
  col: string;
  large?: boolean;
};

const GAMES: Game[] = [
  {
    id: 'platformer',
    tag: 'Platform',
    tagClass: 'bg-warning-bg text-warning',
    title: 'Demo Oyun 1',
    desc: 'Basit bir platformer oyunu. Engelleri aş, hedefe ulaş — her seviye bir sonrakinden daha zorlu.',
    difficulty: 'Kolay',
    players: '1 Oyuncu',
    col: 'md:col-span-7',
    large: true,
  },
  {
    id: 'puzzle',
    tag: 'Bulmaca',
    tagClass: 'bg-primary-tint text-primary',
    title: 'Demo Oyun 2',
    desc: 'Eğitsel bir bulmaca oyunu. Bilim sorularını çöz, ipuçlarını topla.',
    difficulty: 'Orta',
    players: '1 Oyuncu',
    col: 'md:col-span-5',
    large: false,
  },
  {
    id: 'race',
    tag: 'Yarış',
    tagClass: 'bg-success-bg text-success',
    title: 'Demo Oyun 3',
    desc: 'Hafif bir yarış oyunu. Hızını kanıtla, liderlik tablosuna çık.',
    difficulty: 'Kolay',
    players: '1–2 Oyuncu',
    col: 'md:col-span-12',
    large: false,
  },
];

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

function GameCard({ game, index }: { game: Game; index: number }) {
  return (
    <motion.div {...fadeUp(0.08 + index * 0.08)} className={`${game.col} h-full`}>
      {/* Double-bezel outer shell */}
      <div className="p-[2px] rounded-[20px] bg-border ring-1 ring-border/60 h-full">
        {/* Inner core */}
        <div
          className={`bg-surface rounded-[18px] h-full flex flex-col relative overflow-hidden ${game.large ? 'p-8 min-h-[300px]' : 'p-7 min-h-[240px]'}`}
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)' }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 85% 110%, rgba(215,154,43,0.05) 0%, transparent 65%)',
            }}
          />

          <div className="relative z-10 flex flex-col h-full">
            {/* Top row */}
            <div className="flex items-start justify-between mb-6">
              <span className={`text-[9px] uppercase tracking-[0.18em] font-semibold rounded-full px-3 py-1.5 ${game.tagClass}`}>
                {game.tag}
              </span>
              <div className="flex gap-1.5">
                <span className="text-[9px] uppercase tracking-[0.1em] font-medium text-text-muted bg-bg rounded-full px-2.5 py-1.5">
                  {game.difficulty}
                </span>
                <span className="text-[9px] uppercase tracking-[0.1em] font-medium text-text-muted bg-bg rounded-full px-2.5 py-1.5">
                  {game.players}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1">
              <h3
                className={`font-heading font-bold text-text tracking-[-0.025em] mb-2.5 ${game.large ? 'text-[1.45rem]' : 'text-[1.15rem]'}`}
              >
                {game.title}
              </h3>
              <p className="text-sm text-text-muted leading-[1.65]">{game.desc}</p>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-5 border-t border-border">
              <button className="group inline-flex items-center gap-3 rounded-full bg-text px-5 py-2.5 text-white text-xs font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary active:scale-[0.97]">
                Oynat
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <PlayIcon />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function OyunMerkeziPage() {
  return (
    <main className="flex flex-col bg-bg min-h-[100dvh]">

      {/* ─── HERO ─── */}
      <section className="relative py-28 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 65% 40%, rgba(215,154,43,0.07) 0%, transparent 68%)',
          }}
        />

        <div className="relative z-10 max-w-[1160px] mx-auto px-6 md:px-10 xl:px-16">
          <motion.div {...fadeUp(0)} className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-warning-bg px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-warning">
              Oyun Merkezi
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.07)}
            className="font-heading text-[clamp(2.8rem,6vw,5.5rem)] font-black leading-[1.02] tracking-[-0.035em] text-text mb-6 max-w-[680px]"
          >
            Bilimle{' '}
            <em
              className="not-italic text-primary"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400 }}
            >
              Oyna,
            </em>{' '}
            Öğren.
          </motion.h1>

          <motion.p
            {...fadeUp(0.13)}
            className="text-[1.05rem] text-text-muted leading-[1.65] max-w-[420px]"
          >
            Küçük ama özenle hazırlanmış demo oyunlarımızla bilimi eğlenceye dönüştür.
          </motion.p>
        </div>
      </section>

      {/* ─── GAMES ─── */}
      <section className="py-24">
        <div className="max-w-[1160px] mx-auto px-6 md:px-10 xl:px-16">

          <motion.p
            {...fadeUp(0)}
            className="text-[10px] uppercase tracking-[0.28em] font-semibold text-primary mb-10"
          >
            Mevcut Oyunlar
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {GAMES.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMING SOON ─── */}
      <section className="py-24 border-t border-border">
        <div className="max-w-[1160px] mx-auto px-6 md:px-10 xl:px-16">
          <motion.div {...fadeUp(0)}>
            {/* Double-bezel */}
            <div className="p-[2px] rounded-[24px] bg-border ring-1 ring-border/60">
              <div
                className="bg-surface rounded-[22px] px-10 py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)' }}
              >
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary-tint px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-primary mb-5">
                    Yakında
                  </span>
                  <h2 className="font-heading text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[-0.025em] text-text mb-3">
                    Daha Fazlası Geliyor
                  </h2>
                  <p className="text-text-muted text-sm leading-[1.65] max-w-[380px]">
                    Çok oyunculu bilgi yarışmaları, liderlik tabloları ve STEM odaklı yeni oyunlar hazırlanıyor.
                  </p>
                </div>
                <div className="shrink-0">
                  <button className="group inline-flex items-center gap-3 rounded-full bg-primary hover:bg-primary-hover px-6 py-3 text-white text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]">
                    Beni Haberdar Et
                    <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                      <ArrowIcon />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
