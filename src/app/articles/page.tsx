import styles from "../dashboard/dashboard.module.css";
import Link from "next/link";

export default function Articles() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.welcome}>
          <h1>Bilim Genç Kütüphanesi 📚</h1>
          <p>En güncel makaleler, araştırmalar ve popüler bilim yazıları.</p>
        </div>
      </header>

      <div className={styles.grid}>
        <div className={styles.card} style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>İçerikler Yükleniyor...</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            Makaleler ve blog yazıları kısa süre içinde burada yayınlanacak.
          </p>
          <Link href="/" style={{ padding: '0.8rem 2rem', background: 'var(--color-primary)', color: 'white', borderRadius: '8px', fontWeight: 'bold' }}>
            Anasayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
