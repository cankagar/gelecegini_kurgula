import Link from "next/link";
import styles from "./categories.module.css";

export default function Categories() {
  const categories = [
    {
      id: "junior-stem",
      title: "Junior STEM",
      description: "Okul öncesi ve ilkokul için eğlenceli bilim etkinlikleri.",
      icon: "🧬",
      color: "rgba(37, 99, 235, 0.1)"
    },
    {
      id: "robotics",
      title: "Robotik ve Kodlama",
      description: "Algoritma mantığı ve temel robotik sistemleri.",
      icon: "🤖",
      color: "rgba(79, 70, 229, 0.1)"
    },
    {
      id: "space",
      title: "Uzay ve Astronomi",
      description: "Gezegenler, yıldızlar ve evrenin sırları.",
      icon: "🚀",
      color: "rgba(168, 85, 247, 0.1)"
    },
    {
      id: "ai",
      title: "Yapay Zeka",
      description: "Geleceğin teknolojisi yapay zekaya giriş.",
      icon: "🧠",
      color: "rgba(244, 63, 94, 0.1)"
    }
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sınıfları Keşfet</h1>
      <p className={styles.subtitle}>Sana en uygun bilim kategorisini seç ve öğrenmeye başla.</p>

      <div className={styles.grid}>
        {categories.map(cat => (
          <Link href={`/categories/${cat.id}`} key={cat.id} className={styles.card}>
            <div className={styles.icon} style={{ backgroundColor: cat.color }}>{cat.icon}</div>
            <h2 className={styles.cardTitle}>{cat.title}</h2>
            <p className={styles.cardDesc}>{cat.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
