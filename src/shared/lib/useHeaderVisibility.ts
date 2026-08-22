"use client";

import { useEffect, useRef, useState } from "react";

// Hides the floating nav on scroll-down, reveals it on scroll-up.
// Always visible while within `threshold` px of the top.
export function useHeaderVisibility(threshold: number) {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    function update() {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (y < threshold) {
        setAtTop(true);
        setHidden(false);
      } else {
        setAtTop(false);
        if (delta > 24) setHidden(true);
        else if (delta < -8) setHidden(false);
      }

      lastY.current = y;
      ticking.current = false;
    }

    function onScroll() {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { hidden, atTop };
}
