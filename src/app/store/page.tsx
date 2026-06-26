import styles from "./store.module.css";
import { ShoppingBagIcon } from "@/shared/ui/icons";

export default function Store() {
  return (
    <div className={styles.store}>
      <header className={styles.header}>
        <h1>STEM Mağazası</h1>
        <p>Topladığın kredilerle robotik setler ve bilim kitleri al.</p>
      </header>

      <div className={styles.grid}>
        <div className={`${styles.card} ${styles.emptyState}`}>
          <div className={styles.emptyIcon}><ShoppingBagIcon size={28} /></div>
          <h2>Mağaza Çok Yakında Açılıyor!</h2>
          <p>Kredilerini biriktirmeye devam et. Harika ürünler çok yakında mağazada yerini alacak.</p>
        </div>
      </div>
    </div>
  );
}
