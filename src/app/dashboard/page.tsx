"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./dashboard.module.css";
import Link from "next/link";
import { TargetIcon, ClipboardListIcon, WalletIcon } from "@/components/icons";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className={styles.dashboard}>Yükleniyor...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.welcome}>
          <h1>Merhaba, {session.user?.name || "Kullanıcı"}</h1>
          <p>STEM Eğitim platformuna hoş geldin.</p>
        </div>
        <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.logoutBtn}>
          Çıkış Yap
        </button>
      </header>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}><TargetIcon size={20} /> Seviye ve Puan</h2>
          <div className={styles.statValue}>1</div>
          <div className={styles.statLabel}>Mevcut Seviye (Çaylak Kaşif)</div>
          <div style={{marginTop: '1rem', background: 'var(--color-surface-alt)', height: '8px', borderRadius: '4px'}}>
            <div style={{background: 'var(--color-secondary)', height: '100%', width: '15%', borderRadius: '4px'}}></div>
          </div>
          <div className={styles.statLabel} style={{marginTop: '0.5rem'}}>150 / 1000 XP</div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}><ClipboardListIcon size={20} /> Aktif Ödevler</h2>
          <p style={{color: 'var(--color-text-muted)'}}>Şu an bekleyen ödevin bulunmuyor. Yeni konular keşfetmeye ne dersin?</p>
          <Link href="/categories" style={{display: 'inline-block', marginTop: '1rem', color: 'var(--color-primary)', fontWeight: 'bold'}}>
            Sınıfları Keşfet &rarr;
          </Link>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}><WalletIcon size={20} /> Cüzdan</h2>
          <div className={styles.statValue}>50 <span style={{fontSize: '1rem'}}>Kredi</span></div>
          <div className={styles.statLabel}>Platform Mağazası için kullanılabilir</div>
        </div>
      </div>
    </div>
  );
}
