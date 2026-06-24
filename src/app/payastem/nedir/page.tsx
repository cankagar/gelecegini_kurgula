"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./nedir.module.css";
import { ScrollStack, ScrollStackItem } from "@/shared/ui/scroll-stack";
import { BorderGlowCard } from "@/shared/ui/border-glow";
import {
  GraduationCapIcon,
  BookIcon,
  PuzzleIcon,
  RocketIcon,
  ChevronDownIcon,
  CheckCircleIcon,
} from "@/shared/ui/icons";

const EASE = [0.32, 0.72, 0, 1] as const;

const LEVELS = [
  {
    icon: GraduationCapIcon,
    eyebrow: "Seviye 01",
    variant: "gold" as const,
    title: "Junior STEM",
    age: "5–9 yaş",
    description:
      "Okul öncesi ve ilkokulun ilk yıllarına yönelik, oyunla öğrenmeyi merkeze alan temel bilim ve teknoloji etkinlikleri. Meraklı zihinler için ilk adım.",
  },
  {
    icon: BookIcon,
    eyebrow: "Seviye 02",
    variant: "cyan" as const,
    title: "İlkokul STEM",
    age: "6–10 yaş",
    description:
      "Deneysel öğrenme ve proje tabanlı aktivitelerle desteklenen, öğretmen kaynaklarıyla zenginleştirilmiş haftalık görev programı.",
  },
  {
    icon: PuzzleIcon,
    eyebrow: "Seviye 03",
    variant: "gold" as const,
    title: "Ortaokul STEM",
    age: "11–14 yaş",
    description:
      "Kodlama mantığı, temel robotik sistemler ve veri analizine giriş. Öğrenciler ilk gerçek mühendislik problemleriyle tanışır.",
  },
  {
    icon: RocketIcon,
    eyebrow: "Seviye 04",
    variant: "cyan" as const,
    title: "Lise STEM",
    age: "15–18 yaş",
    description:
      "İleri seviye programlama, yapay zekaya giriş ve mühendislik projeleriyle üniversite ve kariyer hayatına hazırlık.",
  },
];

export default function PayaStemInfo() {
  return (
    <div>
      <section className={styles.hero}>
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className={styles.heroBadge}
        >
          Türkiye&apos;nin STEM Topluluğu
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className={styles.heroTitle}
        >
          PayaSTEM Nedir?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          className={styles.heroSubtitle}
        >
          Farklı eğitim seviyelerine yönelik kapsamlı bir öğrenme platformu. Öğretmenler
          ödev ve kaynak paylaşır, öğrenciler tamamladıkları görevlerle puan kazanır.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { duration: 1, delay: 0.6 }, y: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } }}
          className={styles.scrollHint}
        >
          <span className={styles.scrollHintLabel}>Aşağı Kaydır</span>
          <ChevronDownIcon size={18} />
        </motion.div>
      </section>

      <section className={styles.stackSection}>
        <ScrollStack useWindowScroll itemDistance={32} itemStackDistance={18} itemScale={0} baseScale={1} stackPosition="12%">
          {LEVELS.map(({ icon: Icon, eyebrow, variant, title, age, description }) => (
            <ScrollStackItem key={title}>
              <BorderGlowCard radius={28} variant={variant}>
                <div className={styles.cardInner}>
                  <span className={`${styles.cardEyebrow} ${variant === "cyan" ? styles.cyan : ""}`}>{eyebrow}</span>
                  <div className={styles.cardHeader}>
                    <div className={`${styles.cardIcon} ${variant === "cyan" ? styles.cyan : ""}`}>
                      <Icon size={26} />
                    </div>
                    <div>
                      <h2 className={styles.cardTitle}>{title}</h2>
                      <p className={styles.cardAge}>{age}</p>
                    </div>
                  </div>
                  <p className={styles.cardDescription}>{description}</p>
                </div>
              </BorderGlowCard>
            </ScrollStackItem>
          ))}

          <ScrollStackItem>
            <BorderGlowCard radius={28} variant="gold">
              <div className={styles.cardInner}>
                <span className={styles.cardEyebrow}>Nasıl Çalışır</span>
                <h2 className={styles.cardTitle}>Tek platform, iki taraf</h2>
                <div className={styles.summaryList}>
                  <p className={styles.summaryItem}>
                    <CheckCircleIcon size={19} />
                    <span>
                      <strong>Öğretmenler</strong> platforma ödev, duyuru ve eğitim kaynakları yükler.
                    </span>
                  </p>
                  <p className={styles.summaryItem}>
                    <CheckCircleIcon size={19} />
                    <span>
                      <strong>Öğrenciler</strong> atanan ödevleri tamamlayıp puan (XP) kazanır, kaynakları
                      inceler ve topluluk içinde etkileşimde bulunur.
                    </span>
                  </p>
                </div>
                <Link href="/payastem/junior-stem" className={styles.ctaBtn}>
                  Junior STEM&apos;e Git
                </Link>
              </div>
            </BorderGlowCard>
          </ScrollStackItem>
        </ScrollStack>
      </section>
    </div>
  );
}
