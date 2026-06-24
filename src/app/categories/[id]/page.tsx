import Link from "next/link";
import styles from "../categories.module.css";
import { DnaIcon, BotIcon, OrbitIcon, BrainIcon } from "@/shared/ui/icons";

const categoriesData: Record<string, { title: string, description: string, Icon: typeof DnaIcon, color: string, iconColor: string }> = {
  "junior-stem": {
    title: "Junior STEM",
    description: "Okul öncesi ve ilkokul için eğlenceli bilim etkinlikleri.",
    Icon: DnaIcon,
    color: "rgba(221, 153, 22, 0.12)",
    iconColor: "var(--color-primary)"
  },
  "robotics": {
    title: "Robotik ve Kodlama",
    description: "Algoritma mantığı ve temel robotik sistemleri.",
    Icon: BotIcon,
    color: "rgba(182, 122, 13, 0.18)",
    iconColor: "var(--color-cta-dark)"
  },
  "space": {
    title: "Uzay ve Astronomi",
    description: "Gezegenler, yıldızlar ve evrenin sırları.",
    Icon: OrbitIcon,
    color: "rgba(0, 200, 255, 0.1)",
    iconColor: "var(--color-secondary)"
  },
  "ai": {
    title: "Yapay Zeka",
    description: "Geleceğin teknolojisi yapay zekaya giriş.",
    Icon: BrainIcon,
    color: "rgba(0, 200, 255, 0.18)",
    iconColor: "#33d2ff"
  }
};

export default async function CategoryDetail({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Handle both Promise and synchronous params for different Next.js versions
  const resolvedParams = await Promise.resolve(params);
  const { id } = resolvedParams;
  const category = categoriesData[id];

  if (!category) {
    return (
      <div className={styles.container} style={{ textAlign: 'center' }}>
        <h1 className={styles.title}>Kategori Bulunamadı</h1>
        <p className={styles.subtitle}>Aradığınız sınıf mevcut değil.</p>
        <Link href="/categories" style={{ color: 'var(--color-primary)' }}>&larr; Kategorilere Dön</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link href="/categories" style={{ color: 'var(--color-text-muted)', display: 'inline-block', marginBottom: '2rem' }}>
        &larr; Sınıflara Dön
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className={styles.icon} style={{ backgroundColor: category.color, color: category.iconColor, margin: 0 }}>
          <category.Icon size={32} />
        </div>
        <div>
          <h1 className={styles.title} style={{ textAlign: 'left', marginBottom: '0.25rem' }}>{category.title}</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>{category.description}</p>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card} style={{ alignItems: 'flex-start', textAlign: 'left', cursor: 'default', transform: 'none', boxShadow: 'none' }}>
          <h2 className={styles.cardTitle}>Giriş Dersi 101</h2>
          <p className={styles.cardDesc}>Bu kategorideki temel kavramları öğrenmeye başla.</p>
          <button className={styles.primaryAction}>Derse Başla</button>
        </div>
        <div className={styles.card} style={{ alignItems: 'flex-start', textAlign: 'left', cursor: 'default', transform: 'none', boxShadow: 'none' }}>
          <h2 className={styles.cardTitle}>Görev ve Ödevler</h2>
          <p className={styles.cardDesc}>Öğretmeninin bu kategori için atadığı ödevleri tamamla.</p>
          <button className={styles.secondaryAction}>Görevleri Gör</button>
        </div>
      </div>
    </div>
  );
}
