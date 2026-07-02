"use client";

import { useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FROM_COLOR = [100, 150, 210]; // steel blue — matches hero bg
const TO_COLOR = [207, 162, 77];    // --color-primary #CFA24D (warm gold)
const DONE_COLOR = "#FFFFFF";       // white — hero sits on dark bg

function lerpColor(progress: number) {
  const r = Math.round(FROM_COLOR[0] + (TO_COLOR[0] - FROM_COLOR[0]) * progress);
  const g = Math.round(FROM_COLOR[1] + (TO_COLOR[1] - FROM_COLOR[1]) * progress);
  const b = Math.round(FROM_COLOR[2] + (TO_COLOR[2] - FROM_COLOR[2]) * progress);
  return `rgb(${r}, ${g}, ${b})`;
}

export function useCountUpColor<T extends HTMLElement = HTMLElement>(value: number) {
  const ref = useRef<T>(null);
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

  return {
    ref,
    display,
    color: done ? DONE_COLOR : color,
    transition: done ? "color 0.8s ease" : "color 0.05s linear",
  };
}
