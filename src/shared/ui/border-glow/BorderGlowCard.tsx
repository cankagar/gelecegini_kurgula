"use client";

import type { ReactNode } from "react";
import BorderGlow from "./BorderGlow";

type BorderGlowCardProps = {
  children: ReactNode;
  radius?: number;
  variant?: "gold" | "cyan";
  className?: string;
};

const VARIANTS = {
  gold: { glowColor: "38 85 58", colors: ["#dd9916", "#b67a0d", "#00c8ff"] },
  cyan: { glowColor: "195 100 55", colors: ["#00c8ff", "#0a3a4a", "#dd9916"] },
};

/** Block-level BorderGlow for full-width cards — frame-only tint, no growth/scale on hover. */
export function BorderGlowCard({ children, radius = 22, variant = "gold", className = "" }: BorderGlowCardProps) {
  const { glowColor, colors } = VARIANTS[variant];

  return (
    <BorderGlow
      className={`bgw-card-frame ${className}`}
      borderRadius={radius}
      glowRadius={0}
      glowIntensity={1.1}
      coneSpread={32}
      edgeSensitivity={18}
      backgroundColor="var(--color-surface)"
      glowColor={glowColor}
      colors={colors}
    >
      {children}
    </BorderGlow>
  );
}
