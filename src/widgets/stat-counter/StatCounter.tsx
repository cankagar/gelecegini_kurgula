"use client";

import type { ReactNode } from "react";
import styles from "./StatCounter.module.css";
import { useCountUpColor } from "./useCountUpColor";

type StatCounterProps = {
  icon: ReactNode;
  value: number;
  suffix?: string;
  label: string;
  description: string;
};

export function StatCounter({ icon, value, suffix = "+", label, description }: StatCounterProps) {
  const { ref, display, color, transition } = useCountUpColor<HTMLDivElement>(value);

  return (
    <div ref={ref} className={styles.statCard}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statNumber} style={{ color, transition }}>
        {display}
        {suffix}
      </div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statDescription}>{description}</div>
    </div>
  );
}
