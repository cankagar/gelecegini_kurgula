import styles from "../dashboard/dashboard.module.css";
import Link from "next/link";
import { ShoppingBagIcon } from "@/components/icons";

export default function Store() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.welcome}>
          <h1>STEM Mağazası</h1>
          <p>Topladığın kredilerle robotik setler ve bilim kitleri al.</p>
        </div>
      </header>

      <div className={styles.grid}>
        <div className={styles.card + " " + styles.emptyState}>
          <div className={styles.emptyIcon}><ShoppingBagIcon size={28} /></div>
          <h2>Mağaza Çok Yakında Açılıyor!</h2>
          <p>Kredilerini biriktirmeye devam et. Harika ürünler çok yakında mağazada yerini alacak.</p>
          <Link href="/dashboard" className={styles.ctaBtn}>Gösterge Paneline Dön</Link>
        </div>
      </div>
    </div>
  );
}
