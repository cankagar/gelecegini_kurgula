import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div>
          <span className={styles.brand}>
            Nex<span className={styles.brandAccent}>STEM</span>
          </span>
          <p className={styles.tagline}>
            Öğrenciler, öğretmenler ve bilim tutkunları için Türkiye'nin STEM eğitim ve topluluk platformu.
          </p>
        </div>

        <div>
          <div className={styles.colTitle}>Platform</div>
          <nav className={styles.links}>
            <Link href="/payastem/nedir">PayaSTEM Nedir?</Link>
            <Link href="/serbest-kursu">Serbest Kürsü</Link>
            <Link href="/oyun-merkezi">Oyun Merkezi</Link>
            <Link href="/store">STEM Mağazası</Link>
          </nav>
        </div>

        <div>
          <div className={styles.colTitle}>Topluluk</div>
          <nav className={styles.links}>
            <Link href="/categories">Sınıfları Keşfet</Link>
            <Link href="/community">Bilim Topluluğu</Link>
            <Link href="/articles">Makaleler</Link>
            <Link href="/icerik-uretici-basvuru">İçerik Üretici Başvurusu</Link>
          </nav>
        </div>

        <div>
          <div className={styles.colTitle}>Hesap</div>
          <nav className={styles.links}>
            <Link href="/login">Giriş Yap</Link>
            <Link href="/register">Kayıt Ol</Link>
            <Link href="/dashboard">Panelim</Link>
          </nav>
        </div>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} NexSTEM — Bilimle Geleceğini Kurgula.
      </div>
    </footer>
  );
}
