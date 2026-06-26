'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  BookIcon,
  RocketIcon,
  PuzzleIcon,
  ShoppingBagIcon,
} from '@/shared/ui/icons';

const FEATURES = [
  {
    icon: <BookIcon />,
    tag: 'Eğitim',
    title: 'PayaSTEM',
    desc: 'Junior STEM, İlkokul, Ortaokul ve Lise seviyelerine özel öğretmen içerikleri, haftalık görevler ve eğitim kaynakları.',
    href: '/payastem',
    wide: true,
  },
  {
    icon: <RocketIcon />,
    tag: 'Topluluk',
    title: 'Serbest Kürsü',
    desc: 'Bilimsel tartışmalar, makaleler ve bilgi paylaşımı. Bilim insanlarının buluştuğu platform.',
    href: '/serbest-kursu',
    wide: false,
  },
  {
    icon: <PuzzleIcon />,
    tag: 'Eğlence',
    title: 'Oyun Merkezi',
    desc: 'Bilgi yarışmaları, mini oyunlar ve liderlik tabloları.',
    href: '/oyun-merkezi',
    wide: false,
  },
  {
    icon: <ShoppingBagIcon />,
    tag: 'Mağaza',
    title: 'STEM Mağazası',
    desc: 'Robotik kitler, deney setleri ve 3D baskı ürünleri.',
    href: '/store',
    wide: false,
  },
];


export default function Home() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.07 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="flex flex-col bg-bg">

      {/* ─── HERO ─── */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 py-32 border-b border-border">

        {/* Badge */}
        {/* Heading */}
        <div
          data-reveal
          style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.85s cubic-bezier(0.32,0.72,0,1) 0.07s, transform 0.85s cubic-bezier(0.32,0.72,0,1) 0.07s' }}
          className="mb-6"
        >
          <h1 className="text-[clamp(2.8rem,7vw,5.25rem)] font-black leading-[1.08] tracking-[-0.03em] text-text max-w-[820px] mx-auto">
            Bilimle{' '}
            <span className="text-primary">Geleceğini</span>{' '}
            Kurgula
          </h1>
        </div>

        {/* Subtitle */}
        <div
          data-reveal
          style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.8s cubic-bezier(0.32,0.72,0,1) 0.15s, transform 0.8s cubic-bezier(0.32,0.72,0,1) 0.15s' }}
          className="mb-10"
        >
          <p className="text-lg text-text-muted leading-relaxed max-w-[520px] mx-auto">
            Öğrenciler, öğretmenler ve bilim tutkunları için Türkiye'nin en kapsamlı STEM eğitim ve topluluk platformu.
          </p>
        </div>

        {/* CTAs */}
        <div
          data-reveal
          style={{ opacity: 0, transform: 'translateY(16px)', transition: 'opacity 0.75s cubic-bezier(0.32,0.72,0,1) 0.22s, transform 0.75s cubic-bezier(0.32,0.72,0,1) 0.22s' }}
          className="flex gap-3 flex-wrap justify-center"
        >
          <Link
            href="/categories"
            className="group inline-flex items-center gap-3 rounded-full bg-primary hover:bg-primary-hover pl-6 pr-2 py-2 text-sm font-semibold text-white transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
          >
            Hemen Başla
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-px transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </Link>
          <Link
            href="/categories"
            className="inline-flex items-center rounded-full border border-border bg-surface text-text-muted px-6 py-3 text-sm font-semibold hover:border-primary-border hover:text-primary transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
          >
            Sınıfları Keşfet
          </Link>
        </div>

        {/* Divider hint */}
        <div
          data-reveal
          style={{ opacity: 0, transform: 'translateY(12px)', transition: 'opacity 0.9s cubic-bezier(0.32,0.72,0,1) 0.45s, transform 0.9s cubic-bezier(0.32,0.72,0,1) 0.45s' }}
          className="mt-20 flex items-center gap-4"
        >
          <div className="h-px w-14 bg-border" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Keşfet</span>
          <div className="h-px w-14 bg-border" />
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-28 bg-bg-alt border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">

          {/* Header */}
          <div
            data-reveal
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.75s cubic-bezier(0.32,0.72,0,1), transform 0.75s cubic-bezier(0.32,0.72,0,1)' }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-primary mb-3">Platform</p>
              <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.025em] text-text">
                Platformda Seni Bekleyenler
              </h2>
            </div>
            <p className="text-text-muted text-sm max-w-[260px] text-left sm:text-right leading-relaxed">
              Öğrenmenin, üretmenin ve paylaşmanın tek adresi.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

            {/* Wide card — col 7 */}
            {(() => {
              const f = FEATURES[0];
              return (
                <div
                  key={f.title}
                  data-reveal
                  style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.85s cubic-bezier(0.32,0.72,0,1) 0.05s, transform 0.85s cubic-bezier(0.32,0.72,0,1) 0.05s' }}
                  className="md:col-span-7"
                >
                  <div className="p-1.5 rounded-[1.75rem] bg-bg border border-border h-full">
                    <div className="bg-surface rounded-[calc(1.75rem-6px)] p-8 h-full min-h-[300px] flex flex-col group hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-11 h-11 rounded-xl bg-primary-tint border border-primary-border flex items-center justify-center text-primary shrink-0">
                          {f.icon}
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-text-muted border border-border rounded-full px-2.5 py-1">
                          {f.tag}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-text mb-3">{f.title}</h3>
                      <p className="text-text-muted text-sm leading-relaxed flex-1">{f.desc}</p>
                      <div className="mt-8 pt-5 border-t border-border flex items-center justify-between">
                        <Link href={f.href} className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors duration-200">
                          Keşfet →
                        </Link>
                        <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-text-muted group-hover:border-primary group-hover:text-primary transition-all duration-300">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Narrow card — col 5 */}
            {(() => {
              const f = FEATURES[1];
              return (
                <div
                  key={f.title}
                  data-reveal
                  style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.85s cubic-bezier(0.32,0.72,0,1) 0.1s, transform 0.85s cubic-bezier(0.32,0.72,0,1) 0.1s' }}
                  className="md:col-span-5"
                >
                  <div className="p-1.5 rounded-[1.75rem] bg-bg border border-border h-full">
                    <div className="bg-surface rounded-[calc(1.75rem-6px)] p-8 h-full min-h-[300px] flex flex-col group hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-11 h-11 rounded-xl bg-primary-tint border border-primary-border flex items-center justify-center text-primary shrink-0">
                          {f.icon}
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-text-muted border border-border rounded-full px-2.5 py-1">
                          {f.tag}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-text mb-3">{f.title}</h3>
                      <p className="text-text-muted text-sm leading-relaxed flex-1">{f.desc}</p>
                      <div className="mt-8 pt-5 border-t border-border flex items-center justify-between">
                        <Link href={f.href} className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors duration-200">
                          Keşfet →
                        </Link>
                        <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-text-muted group-hover:border-primary group-hover:text-primary transition-all duration-300">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Bottom 3 cards */}
            {FEATURES.slice(2).map((f, i) => (
              <div
                key={f.title}
                data-reveal
                style={{ opacity: 0, transform: 'translateY(28px)', transition: `opacity 0.85s cubic-bezier(0.32,0.72,0,1) ${0.15 + i * 0.06}s, transform 0.85s cubic-bezier(0.32,0.72,0,1) ${0.15 + i * 0.06}s` }}
                className="md:col-span-4"
              >
                <div className="p-1.5 rounded-[1.75rem] bg-bg border border-border h-full">
                  <div className="bg-surface rounded-[calc(1.75rem-6px)] p-7 h-full flex flex-col group hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-primary-tint border border-primary-border flex items-center justify-center text-primary shrink-0">
                        {f.icon}
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-text-muted border border-border rounded-full px-2.5 py-1">
                        {f.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-text mb-2">{f.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed flex-1">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Gold CTA card */}
            <div
              data-reveal
              style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.85s cubic-bezier(0.32,0.72,0,1) 0.28s, transform 0.85s cubic-bezier(0.32,0.72,0,1) 0.28s' }}
              className="md:col-span-4"
            >
              <div className="p-1.5 rounded-[1.75rem] bg-primary-border h-full">
                <div className="bg-primary rounded-[calc(1.75rem-6px)] p-7 h-full flex flex-col justify-between min-h-[200px]">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/60 mb-3">Başla</p>
                    <h3 className="text-xl font-bold text-white mb-2">Ücretsiz Katıl</h3>
                    <p className="text-white/65 text-sm leading-relaxed">Topluluğa hemen katıl, öğrenmeye başla.</p>
                  </div>
                  <Link
                    href="/register"
                    className="group mt-6 self-start inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 pl-4 pr-1.5 py-1.5 text-white text-xs font-semibold hover:bg-white/25 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  >
                    Kayıt Ol
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


    </main>
  );
}
