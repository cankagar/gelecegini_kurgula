import Link from "next/link";
import styles from "./page.module.css";
import {
  BookIcon,
  RocketIcon,
  PuzzleIcon,
  ShoppingBagIcon,
  GraduationCapIcon,
  UsersIcon,
  ArrowRightIcon,
} from "@/components/icons";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Türkiye'nin STEM Topluluğu</span>
          <h1 className={styles.title}>
            Bilimle <span className={styles.highlight}>Geleceğini</span> Kurgula
          </h1>
          <p className={styles.subtitle}>
            Öğrenciler, öğretmenler ve bilim tutkunları için Türkiye'nin en kapsamlı STEM eğitim ve topluluk platformu.
          </p>
          <div className={styles.heroActions}>
            <Link href="/register" className={styles.primaryBtn}>
              Hemen Başla <ArrowRightIcon size={18} />
            </Link>
            <Link href="/categories" className={styles.secondaryBtn}>Sınıfları Keşfet</Link>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Platformda Seni Bekleyenler</h2>
            <p className={styles.sectionSubtitle}>Öğrenmenin, üretmenin ve paylaşmanın tek adresi.</p>
          </div>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><BookIcon /></div>
              <h3>PayaSTEM</h3>
              <p>Junior STEM, İlkokul STEM, Ortaokul STEM ve Lise STEM seviyelerine özel öğretmen içerikleri, haftalık görevler ve eğitim kaynakları.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><RocketIcon /></div>
              <h3>Serbest Kürsü</h3>
              <p>Bilimsel tartışmalar, makaleler, sorular ve bilgi paylaşımı. Twitter + Reddit + Evrim Ağacı mantığında çalışan bilim topluluğu.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><PuzzleIcon /></div>
              <h3>Oyun Merkezi</h3>
              <p>Bilgi yarışmaları, mini oyunlar, liderlik tabloları ve arkadaşlarla rekabet sistemi.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><ShoppingBagIcon /></div>
              <h3>STEM Mağazası</h3>
              <p>Robotik kitler, deney setleri, 3D baskı ürünleri ve kazanılan kredilerle alışveriş.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.container}>
          <h2 className={styles.statsTitle}>Türkiye'nin STEM Topluluğu</h2>
          <p className={styles.statsSubtitle}>Birlikte öğrenen, üreten ve paylaşan büyüyen bir topluluk.</p>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}><GraduationCapIcon /></div>
              <div className={styles.statNumber}>3500+</div>
              <div className={styles.statLabel}>Öğrenci</div>
              <div className={styles.statDescription}>Topluluğumuza katılan öğrenciler</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}><UsersIcon /></div>
              <div className={styles.statNumber}>120+</div>
              <div className={styles.statLabel}>Öğretmen</div>
              <div className={styles.statDescription}>Bilgilerini paylaşan eğitmenler</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}><BookIcon /></div>
              <div className={styles.statNumber}>800+</div>
              <div className={styles.statLabel}>İçerik</div>
              <div className={styles.statDescription}>Paylaşılan yazılar ve kaynaklar</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}><RocketIcon /></div>
              <div className={styles.statNumber}>250+</div>
              <div className={styles.statLabel}>Proje</div>
              <div className={styles.statDescription}>Tamamlanan STEM projeleri</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
