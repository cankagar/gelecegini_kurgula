import styles from "../dashboard/dashboard.module.css";
import Link from "next/link";
import { BookIcon } from "@/components/icons";

export default function Articles() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.welcome}>
          <h1>Bilim Genç Kütüphanesi</h1>
          <p>En güncel makaleler, araştırmalar ve popüler bilim yazıları.</p>
        </div>
      </header>

      <div className={styles.grid}>
        <div className={styles.card + " " + styles.emptyState}>
          <div className={styles.emptyIcon}><BookIcon size={28} /></div>
          <h2>İçerikler Yükleniyor...</h2>
          <p>Makaleler ve blog yazıları kısa süre içinde burada yayınlanacak.</p>
          <Link href="/" className={styles.ctaBtn}>Anasayfaya Dön</Link>
        </div>
      </div>
    </div>
  );
}
