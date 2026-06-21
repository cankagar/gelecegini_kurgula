import styles from "../dashboard/dashboard.module.css";
import Link from "next/link";

export default function Store() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.welcome}>
          <h1>STEM Mağazası 🛒</h1>
          <p>Topladığın kredilerle robotik setler ve bilim kitleri al.</p>
        </div>
      </header>

      <div className={styles.grid}>
        <div className={styles.card} style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>Mağaza Çok Yakında Açılıyor!</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            Kredilerini biriktirmeye devam et. Harika ürünler çok yakında mağazada yerini alacak.
          </p>
          <Link href="/dashboard" style={{ padding: '0.8rem 2rem', background: 'var(--color-primary)', color: 'white', borderRadius: '8px', fontWeight: 'bold' }}>
            Gösterge Paneline Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
