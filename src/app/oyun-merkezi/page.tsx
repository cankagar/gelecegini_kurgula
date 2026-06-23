"use client";

import React from "react";
import styles from "./oyun-merkezi.module.css";
import { GamepadIcon } from "@/components/icons";

export default function OyunMerkeziPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerIcon}><GamepadIcon size={28} /></div>
        <h1>Oyun Merkezi</h1>
        <p>Küçük demo oyunlarımızı burada keşfedebilirsiniz.</p>
      </header>
      <section className={styles.gamesGrid}>
        {/* Placeholder game cards */}
        <div className={styles.gameCard}>
          <h2>Demo Oyun 1</h2>
          <p>Basit bir platformer oyunu.</p>
          <button className={styles.playButton}>Oynat</button>
        </div>
        <div className={styles.gameCard}>
          <h2>Demo Oyun 2</h2>
          <p>Eğitsel bir bulmaca oyunu.</p>
          <button className={styles.playButton}>Oynat</button>
        </div>
        <div className={styles.gameCard}>
          <h2>Demo Oyun 3</h2>
          <p>Hafif bir yarış oyunu.</p>
          <button className={styles.playButton}>Oynat</button>
        </div>
      </section>
    </div>
  );
}
