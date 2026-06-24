"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./StatCounter.module.css";

type StatCounterProps = {
  icon: ReactNode;
  value: number;
  suffix?: string;
  label: string;
  description: string;
};

const FROM_COLOR = [224, 49, 49];
const TO_COLOR = [45, 212, 175];

function lerpColor(progress: number) {
  const r = Math.round(FROM_COLOR[0] + (TO_COLOR[0] - FROM_COLOR[0]) * progress);
  const g = Math.round(FROM_COLOR[1] + (TO_COLOR[1] - FROM_COLOR[1]) * progress);
  const b = Math.round(FROM_COLOR[2] + (TO_COLOR[2] - FROM_COLOR[2]) * progress);
  return `rgb(${r}, ${g}, ${b})`;
}

export function StatCounter({ icon, value, suffix = "+", label, description }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1800, bounce: 0 });
  const [display, setDisplay] = useState("0");
  const [color, setColor] = useState(lerpColor(0));
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, motionVal, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => {
      const progress = Math.min(Math.max(v / value, 0), 1);
      setDisplay(Math.round(v).toLocaleString("tr-TR"));
      setColor(lerpColor(progress));
      if (progress >= 1) setDone(true);
    });
    return unsubscribe;
  }, [spring, value]);

  return (
    <div ref={ref} className={styles.statCard}>
      <div className={styles.statIcon}>{icon}</div>
      <div
        className={styles.statNumber}
        style={{
          color: done ? "var(--color-text)" : color,
          transition: done ? "color 0.8s ease" : "color 0.05s linear",
        }}
      >
        {display}
        {suffix}
      </div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statDescription}>{description}</div>
    </div>
  );
}
