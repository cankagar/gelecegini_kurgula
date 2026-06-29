"use client";

import { useEffect, useRef, useState } from "react";

export type ColorStop = { offset: number; color: string };

// Single source of truth for the homepage's section-flow backdrop — shared
// between the page background (CSS gradient) and anything that needs to
// sample the current color at a given scroll position (e.g. the site dock).
export const SECTION_FLOW_STOPS: ColorStop[] = [
  { offset: 0, color: "#FCFCF9" },
  { offset: 0.16, color: "#EAF5F6" },
  { offset: 0.22, color: "#EAF5F6" },
  { offset: 0.3, color: "#E9F6F0" },
  { offset: 0.38, color: "#E9F6F0" },
  { offset: 0.46, color: "#F0EEFA" },
  { offset: 0.54, color: "#F0EEFA" },
  { offset: 0.6, color: "#E9F1FB" },
  { offset: 0.68, color: "#E9F1FB" },
  { offset: 0.74, color: "#EEEFFB" },
  { offset: 0.84, color: "#EEEFFB" },
  { offset: 0.9, color: "#E8F6F5" },
  { offset: 1, color: "#FCFCF9" },
];

export function buildLinearGradient(stops: ColorStop[]): string {
  const stopStrings = stops.map((s) => `${s.color} ${s.offset * 100}%`);
  return `linear-gradient(to bottom, ${stopStrings.join(", ")})`;
}

function hexToRgb(hex: string): [number, number, number] {
  const v = hex.replace("#", "");
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}

function colorAt(stops: ColorStop[], t: number): string {
  const clamped = Math.min(Math.max(t, 0), 1);
  let lower = stops[0];
  let upper = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (clamped >= stops[i].offset && clamped <= stops[i + 1].offset) {
      lower = stops[i];
      upper = stops[i + 1];
      break;
    }
  }
  const span = upper.offset - lower.offset;
  const localT = span === 0 ? 0 : (clamped - lower.offset) / span;
  const [r1, g1, b1] = hexToRgb(lower.color);
  const [r2, g2, b2] = hexToRgb(upper.color);
  const r = Math.round(r1 + (r2 - r1) * localT);
  const g = Math.round(g1 + (g2 - g1) * localT);
  const b = Math.round(b1 + (b2 - b1) * localT);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Samples SECTION_FLOW_STOPS at the current scroll position of the element
 * with the given id, so UI fixed elsewhere on screen (e.g. the dock) can
 * follow the page's flowing background color. Returns `fallback` when the
 * tracked element isn't present (e.g. on pages without the color flow).
 */
export function useScrollFlowColor(elementId: string, fallback: string): string {
  const [color, setColor] = useState(fallback);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    function update() {
      const el = document.getElementById(elementId);
      if (!el) {
        setColor(fallback);
        return;
      }
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const height = rect.height || 1;
      const viewportPoint = window.scrollY + window.innerHeight * 0.85;
      const t = (viewportPoint - top) / height;
      setColor(colorAt(SECTION_FLOW_STOPS, t));
    }

    function onScroll() {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        update();
      });
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [elementId, fallback]);

  return color;
}
