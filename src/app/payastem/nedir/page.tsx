import Link from "next/link";
import styles from "../[level]/payastem.module.css";

export default function PayaStemInfo() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PayaSTEM Nedir?</h1>
      <p className={styles.description}>
        PayaSTEM, Türkiye'nin STEM topluluğu olarak farklı eğitim seviyelerine yönelik
        kapsamlı bir öğrenme platformudur. Aşağıdaki seviyelerle öğrencilere ve
        öğretmenlere destek olur:
      </p>
      <ul className={styles.list}>
        <li>👦 <strong>Junior STEM</strong> – 5‑9 yaş arası temel bilim ve teknoloji temelleri.</li>
        <li>📚 <strong>İlkokul STEM</strong> – 6‑10 yaş, deneysel öğrenme ve proje tabanlı aktiviteler.</li>
        <li>🧩 <strong>Ortaokul STEM</strong> – 11‑14 yaş, kodlama, robotik ve veri analizi.</li>
        <li>🚀 <strong>Lise STEM</strong> – 15‑18 yaş, ileri seviye programlama, AI ve mühendislik projeleri.</li>
      </ul>
      <p className={styles.description}>
        <strong>Öğretmenler</strong> platforma ödev, duyuru ve kaynakları yükleyebilir.
        <br />
        <strong>Öğrenciler</strong> atanan ödevleri tamamlayıp puan (XP) kazanır, kaynakları
        inceler ve topluluk içinde etkileşimde bulunur.
        <br />
        Bu sayfa, PayaSTEM’in ne olduğu ve nasıl çalıştığı hakkında hızlı bir özet sunar.
      </p>
      <Link href="/payastem/junior-stem" className={styles.primaryBtn}>Junior STEM'a Git</Link>
    </div>
  );
}
