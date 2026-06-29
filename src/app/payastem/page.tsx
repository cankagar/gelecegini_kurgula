'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ScrollStack, ScrollStackItem } from '@/shared/ui/scroll-stack';
import { BorderGlowCard } from '@/shared/ui/border-glow';
import { RocketIcon, WrenchIcon, DnaIcon, BotIcon, CheckCircleIcon, ChevronDownIcon } from '@/shared/ui/icons';

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.85, ease: EASE, delay },
});

// Görseller eklendiğinde icon + gradient blokları gerçek fotoğraflarla değiştirilebilir.
const WORKS = [
  {
    icon: BotIcon,
    eyebrow: 'Çalışma 01',
    title: 'Robotik Atölyesi',
    description: 'Öğrencilerin sıfırdan robot tasarlayıp programladığı, takım çalışmasıyla yürütülen uygulamalı atölye serisi.',
  },
  {
    icon: DnaIcon,
    eyebrow: 'Çalışma 02',
    title: 'Bilim Şenliği',
    description: 'Yüzlerce öğrencinin katıldığı, deney istasyonları ve canlı gösterimlerle dolu yıllık STEM şenliği.',
  },
  {
    icon: WrenchIcon,
    eyebrow: 'Çalışma 03',
    title: 'Tasarım ve Üretim Kampı',
    description: '3 boyutlu tasarım, prototipleme ve üretim süreçlerinin uçtan uca öğretildiği yoğun kamp programı.',
  },
  {
    icon: RocketIcon,
    eyebrow: 'Çalışma 04',
    title: 'Proje Yarışması',
    description: 'Takımların kendi STEM projelerini geliştirip jüri önünde sunduğu, ödüllü yıl sonu yarışması.',
  },
];

export default function PayaStemNedir() {
  return (
    <main className="flex flex-col bg-bg">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[80dvh] flex flex-col items-center justify-center text-center px-6 border-b border-border overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 30%, rgba(207,162,77,0.10) 0%, transparent 65%)' }}
          />
        </div>

        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-primary-tint border border-primary-border px-3.5 py-1.5 text-[11px] font-semibold text-primary uppercase tracking-[0.14em] mb-6"
        >
          Türkiye&rsquo;nin STEM Topluluğu
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="relative z-10 font-heading text-[clamp(2.6rem,6vw,5rem)] font-black tracking-[-0.038em] text-text mb-5"
        >
          PayaSTEM Nedir?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.22 }}
          className="relative z-10 max-w-[560px] text-[1.05rem] text-text-muted leading-[1.72]"
        >
          Öğrencileri, öğretmenleri ve bilim tutkunlarını bir araya getiren; atölyeler, yarışmalar ve
          projelerle öğrenmeyi somutlaştıran bir STEM topluluğu ve eğitim platformu.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { duration: 1, delay: 0.6 }, y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-text-muted/70"
        >
          <span className="text-[10px] uppercase tracking-[0.18em] font-medium">Aşağı Kaydır</span>
          <ChevronDownIcon size={16} />
        </motion.div>
      </section>

      {/* ═══════════════ ÇALIŞMALAR (scroll stack) ═══════════════ */}
      <section className="bg-bg-alt py-20">
        <div className="max-w-[1160px] mx-auto px-6 md:px-10 xl:px-16 mb-14">
          <motion.div {...fadeUp(0)}>
            <p className="text-[10px] uppercase tracking-[0.28em] font-semibold text-primary mb-3">Çalışmalarımız</p>
            <h2 className="font-heading text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold tracking-[-0.03em] text-text max-w-[640px]">
              Sahada yaptıklarımız
            </h2>
          </motion.div>
        </div>

        <ScrollStack useWindowScroll itemDistance={32} itemStackDistance={18} itemScale={0} baseScale={1} stackPosition="14%">
          {WORKS.map(({ icon: Icon, eyebrow, title, description }) => (
            <ScrollStackItem key={title}>
              <BorderGlowCard radius={26} variant="gold" className="max-w-[1160px] mx-auto">
                <div className="flex flex-col sm:flex-row items-stretch gap-8 p-8 sm:p-10">
                  <div
                    className="sm:w-[260px] shrink-0 rounded-[18px] aspect-[4/3] flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(207,162,77,0.16), rgba(184,115,66,0.10))' }}
                  >
                    <Icon size={40} className="text-primary" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-primary mb-3">{eyebrow}</span>
                    <h3 className="font-heading text-[1.5rem] font-bold text-text tracking-[-0.02em] mb-3">{title}</h3>
                    <p className="text-[0.95rem] text-text-muted leading-[1.7]">{description}</p>
                  </div>
                </div>
              </BorderGlowCard>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>

      {/* ═══════════════ NASIL ÇALIŞIR / CTA ═══════════════ */}
      <section className="py-28 bg-bg border-t border-border">
        <div className="max-w-[1160px] mx-auto px-6 md:px-10 xl:px-16">
          <motion.div {...fadeUp(0)} className="max-w-[640px] mx-auto text-center">
            <p className="text-[10px] uppercase tracking-[0.28em] font-semibold text-primary mb-3">Nasıl Çalışır</p>
            <h2 className="font-heading text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold tracking-[-0.03em] text-text mb-8">
              Tek platform, iki taraf
            </h2>
            <div className="flex flex-col gap-4 text-left mb-10">
              <p className="flex items-start gap-3 text-sm text-text-muted leading-[1.7]">
                <CheckCircleIcon size={19} className="text-primary shrink-0 mt-0.5" />
                <span><strong className="text-text font-semibold">Öğretmenler</strong> platforma ödev, duyuru ve eğitim kaynakları yükler.</span>
              </p>
              <p className="flex items-start gap-3 text-sm text-text-muted leading-[1.7]">
                <CheckCircleIcon size={19} className="text-primary shrink-0 mt-0.5" />
                <span><strong className="text-text font-semibold">Öğrenciler</strong> atanan ödevleri tamamlayıp puan kazanır, kaynakları inceler ve topluluk içinde etkileşimde bulunur.</span>
              </p>
            </div>
            <Link
              href="/register"
              className="inline-flex items-center gap-2.5 rounded-full bg-primary hover:bg-primary-hover px-6 py-3 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
            >
              Topluluğa Katıl
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
