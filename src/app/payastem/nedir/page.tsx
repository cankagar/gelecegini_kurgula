import Link from "next/link";
import styles from "../[level]/payastem.module.css";
import { GraduationCapIcon, BookIcon, PuzzleIcon, RocketIcon } from "@/components/icons";

export default function PayaStemInfo() {
  return (
    <div className={styles.infoContainer}>
      <h1 className={styles.title}>PayaSTEM Nedir?</h1>
      <p className={styles.description}>
        PayaSTEM, Türkiye'nin STEM topluluğu olarak farklı eğitim seviyelerine yönelik
        kapsamlı bir öğrenme platformudur. Aşağıdaki seviyelerle öğrencilere ve
        öğretmenlere destek olur:
      </p>
      <ul className={styles.list}>
        <li><GraduationCapIcon size={20} /> <span><strong>Junior STEM</strong> – 5‑9 yaş arası temel bilim ve teknoloji temelleri.</span></li>
        <li><BookIcon size={20} /> <span><strong>İlkokul STEM</strong> – 6‑10 yaş, deneysel öğrenme ve proje tabanlı aktiviteler.</span></li>
        <li><PuzzleIcon size={20} /> <span><strong>Ortaokul STEM</strong> – 11‑14 yaş, kodlama, robotik ve veri analizi.</span></li>
        <li><RocketIcon size={20} /> <span><strong>Lise STEM</strong> – 15‑18 yaş, ileri seviye programlama, AI ve mühendislik projeleri.</span></li>
      </ul>
      <p className={styles.description}>
        <strong>Öğretmenler</strong> platforma ödev, duyuru ve kaynakları yükleyebilir.
        <br />
        <strong>Öğrenciler</strong> atanan ödevleri tamamlayıp puan (XP) kazanır, kaynakları
        inceler ve topluluk içinde etkileşimde bulunur.
        <br />
        Bu sayfa, PayaSTEM'in ne olduğu ve nasıl çalıştığı hakkında hızlı bir özet sunar.
      </p>
      <Link href="/payastem/junior-stem" className={styles.primaryBtn}>Junior STEM'a Git</Link>
    </div>
  );
}
