"use client";

import type { ReactNode } from "react";
import BorderGlow from "./BorderGlow";

type BorderGlowButtonProps = {
  children: ReactNode;
  /** Outer bezel radius in px — use 999 for pill buttons, ~16 for var(--radius-sm) buttons. */
  radius?: number;
  variant?: "gold" | "cyan";
  className?: string;
};

const VARIANTS = {
  gold: { glowColor: "38 85 58", colors: ["#dd9916", "#b67a0d", "#00c8ff"] },
  cyan: { glowColor: "195 100 55", colors: ["#00c8ff", "#0a3a4a", "#dd9916"] },
};

export function BorderGlowButton({ children, radius = 999, variant = "gold", className = "" }: BorderGlowButtonProps) {
  const { glowColor, colors } = VARIANTS[variant];

  return (
    <BorderGlow
      className={`bgw-frame ${className}`}
      borderRadius={radius}
      glowRadius={0}
      glowIntensity={1.15}
      coneSpread={32}
      edgeSensitivity={18}
      backgroundColor="var(--color-bg)"
      glowColor={glowColor}
      colors={colors}
    >
      {children}
    </BorderGlow>
  );
}
