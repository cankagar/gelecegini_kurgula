import Link from "next/link";
import styles from "../categories.module.css";

const categoriesData: Record<string, { title: string, description: string, icon: string, color: string }> = {
  "junior-stem": {
    title: "Junior STEM",
    description: "Okul öncesi ve ilkokul için eğlenceli bilim etkinlikleri.",
    icon: "🧬",
    color: "rgba(37, 99, 235, 0.1)"
  },
  "robotics": {
    title: "Robotik ve Kodlama",
    description: "Algoritma mantığı ve temel robotik sistemleri.",
    icon: "🤖",
    color: "rgba(79, 70, 229, 0.1)"
  },
  "space": {
    title: "Uzay ve Astronomi",
    description: "Gezegenler, yıldızlar ve evrenin sırları.",
    icon: "🚀",
    color: "rgba(168, 85, 247, 0.1)"
  },
  "ai": {
    title: "Yapay Zeka",
    description: "Geleceğin teknolojisi yapay zekaya giriş.",
    icon: "🧠",
    color: "rgba(244, 63, 94, 0.1)"
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
        <Link href="/categories" style={{ color: 'var(--color-accent)' }}>&larr; Kategorilere Dön</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link href="/categories" style={{ color: 'var(--color-text-muted)', display: 'inline-block', marginBottom: '2rem' }}>
        &larr; Sınıflara Dön
      </Link>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className={styles.icon} style={{ backgroundColor: category.color, margin: 0 }}>
          {category.icon}
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
          <button style={{ marginTop: '1rem', padding: '0.5rem 1rem', borderRadius: '6px', background: 'var(--color-primary)', color: 'white', border: 'none', cursor: 'pointer' }}>Derse Başla</button>
        </div>
        <div className={styles.card} style={{ alignItems: 'flex-start', textAlign: 'left', cursor: 'default', transform: 'none', boxShadow: 'none' }}>
          <h2 className={styles.cardTitle}>Görev ve Ödevler</h2>
          <p className={styles.cardDesc}>Öğretmeninin bu kategori için atadığı ödevleri tamamla.</p>
          <button style={{ marginTop: '1rem', padding: '0.5rem 1rem', borderRadius: '6px', background: 'transparent', color: 'var(--color-text)', border: '1px solid var(--color-border)', cursor: 'pointer' }}>Görevleri Gör</button>
        </div>
      </div>
    </div>
  );
}
