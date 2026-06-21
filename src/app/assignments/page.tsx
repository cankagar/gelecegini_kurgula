"use client";

import React, { useState } from "react";
import styles from "./assignments.module.css";
import Link from "next/link";

interface Assignment {
  id: string;
  title: string;
  category: string;
  xp: number;
  completed: boolean;
  dueDate: string;
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      title: "Junior STEM: Basit Makineler ve Kaldıraç Deneyi",
      category: "Junior STEM",
      xp: 150,
      completed: false,
      dueDate: "28.06.2026",
    },
    {
      id: "2",
      title: "Robotik ve Kodlama: Döngüler ve Algoritma Temelleri",
      category: "Robotik",
      xp: 200,
      completed: true,
      dueDate: "Tamamlandı",
    },
    {
      id: "3",
      title: "Uzay ve Astronomi: Güneş Sistemi Boyama ve Tanıma",
      category: "Uzay ve Astronomi",
      xp: 180,
      completed: false,
      dueDate: "02.07.2026",
    },
    {
      id: "4",
      title: "Yapay Zeka: Makine Öğrenimi ile Resim Sınıflandırma",
      category: "Yapay Zeka",
      xp: 250,
      completed: false,
      dueDate: "05.07.2026",
    },
  ]);

  const handleComplete = (id: string) => {
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: true, dueDate: "Tamamlandı" } : item
      )
    );
  };

  const completedCount = assignments.filter((a) => a.completed).length;
  const totalCount = assignments.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className={styles.assignments}>
      <header className={styles.header}>
        <h1>Ödev ve İlerleme</h1>
        <p>Atanan görevleri tamamla, STEM kredileri ve XP kazanarak seviyeni yükselt.</p>
      </header>

      <div className={styles.grid}>
        <section className={styles.mainContent}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>📋 Görevler</h2>
            <div className={styles.assignmentList}>
              {assignments.map((item) => (
                <div key={item.id} className={styles.assignmentItem}>
                  <div className={styles.assignmentInfo}>
                    <h3>{item.title}</h3>
                    <p>Kategori: {item.category} • Son Tarih: {item.dueDate}</p>
                  </div>
                  <div className={styles.assignmentMeta}>
                    <span className={styles.points}>+{item.xp} XP</span>
                    {item.completed ? (
                      <span className={styles.completedBtn}>✓ Tamamlandı</span>
                    ) : (
                      <button
                        onClick={() => handleComplete(item.id)}
                        className={styles.actionBtn}
                      >
                        Tamamla
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className={styles.sidebar}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>📈 Genel İlerleme</h2>
            <div className={styles.progressContainer}>
              <div className={styles.progressSection}>
                <div className={styles.progressLabel}>
                  <span>Görev Tamamlama Oranı</span>
                  <span>%{progressPercent}</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  {completedCount} / {totalCount} görev tamamlandı
                </div>
              </div>

              <div className={styles.progressSection}>
                <div className={styles.progressLabel}>
                  <span>Toplam Kazanılan XP</span>
                  <span>{assignments.filter(a => a.completed).reduce((acc, a) => acc + a.xp, 0)} XP</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>💡 İpucu</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
              Her tamamladığın görevden kazandığın XP puanları, seviyeni yükseltir. Kazandığın kredileri ise 
              <Link href="/store" style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}> STEM Mağazası</Link>'nda 
              dilediğince harcayabilirsin!
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
