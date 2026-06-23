import styles from "../dashboard/dashboard.module.css";
import Link from "next/link";
import { RocketIcon } from "@/shared/ui/icons";

export default function Community() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.welcome}>
          <h1>Bilim Topluluğu</h1>
          <p>Tartışmalara katıl, sorular sor ve diğer bilim insanlarıyla etkileşime geç.</p>
        </div>
      </header>

      <div className={styles.grid}>
        <div className={styles.card + " " + styles.emptyState}>
          <div className={styles.emptyIcon}><RocketIcon size={28} /></div>
          <h2>Topluluk Çok Yakında!</h2>
          <p>Bilim projelerini paylaşabileceğin ve tartışabileceğin forum altyapısı şu an geliştirme aşamasında.</p>
          <Link href="/" className={styles.ctaBtn}>Anasayfaya Dön</Link>
        </div>
      </div>
    </div>
  );
}
