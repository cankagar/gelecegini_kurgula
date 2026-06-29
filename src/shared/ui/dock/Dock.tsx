"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type DockSpringOptions = {
  mass?: number;
  stiffness?: number;
  damping?: number;
};

export type DockItemData = {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
};

type DockItemProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: DockSpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
  label: string;
  tintColor?: string;
};

function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  label,
  tintColor,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    const x = rect?.x ?? 0;
    return val - x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
        backgroundColor: tintColor ? `color-mix(in srgb, ${tintColor}, black 7%)` : undefined,
        transition: 'background-color 0.6s ease, border-color 0.2s ease, color 0.2s ease',
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className={`relative inline-flex items-center justify-center rounded-xl ${tintColor ? '' : 'bg-surface'} border border-border text-text-muted cursor-pointer outline-none hover:bg-text hover:border-text hover:text-white ${className}`}
    >
      <div className="flex items-center justify-center">{children}</div>
      <DockLabel isHovered={isHovered}>{label}</DockLabel>
    </motion.div>
  );
}

function DockLabel({
  children,
  isHovered,
}: {
  children: ReactNode;
  isHovered: MotionValue<number>;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.15 }}
          role="tooltip"
          style={{ x: "-50%" }}
          className="absolute top-[-1.75rem] left-1/2 whitespace-pre rounded-lg border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-text shadow-sm pointer-events-none"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockProps = {
  items: DockItemData[];
  className?: string;
  spring?: DockSpringOptions;
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  dockHeight?: number;
  baseItemSize?: number;
  /** When false, the dock fades/slides out of view. Defaults to always visible. */
  visible?: boolean;
  /** Delay (ms) before the dock animates back in once `visible` becomes true. */
  showDelayMs?: number;
  /** When set, tints the panel to this color instead of the default surface color. */
  tintColor?: string;
};

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  dockHeight = 256,
  baseItemSize = 50,
  visible = true,
  showDelayMs = 0,
  tintColor,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{ height, scrollbarWidth: "none" }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 28 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: visible ? showDelayMs / 1000 : 0 }}
      className="fixed inset-x-0 bottom-0 z-50 mx-2 flex max-w-full items-center justify-center pointer-events-none hidden md:flex"
    >
      <motion.div
        onMouseMove={(e) => {
          isHovered.set(1);
          mouseX.set(e.pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        style={{
          height: panelHeight,
          backgroundColor: tintColor,
          transition: 'background-color 0.6s ease',
        }}
        role="toolbar"
        aria-label="Hızlı erişim"
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 flex w-fit items-end gap-2.5 rounded-[1.1rem] border border-border ${tintColor ? '' : 'bg-surface'} px-2 pb-2 shadow-lg ${visible ? "pointer-events-auto" : "pointer-events-none"} ${className}`}
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            label={item.label}
            tintColor={tintColor}
          >
            {item.icon}
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
