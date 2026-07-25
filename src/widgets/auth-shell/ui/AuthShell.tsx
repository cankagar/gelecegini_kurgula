"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { FlaskIcon, CpuIcon, CompassIcon, CalculatorIcon, CheckCircleIcon } from "@/shared/ui/icons";

const SPRING = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.8, ease: SPRING, delay },
});

const TRUST_POINTS = [
  "2.400+ öğrenci ve öğretmen zaten platformda",
  "Bilim, teknoloji, mühendislik ve matematik içerikleri",
  "Serbest Kürsü topluluğuna anında erişim",
];

const ORBIT_ICONS = [
  { Icon: FlaskIcon, color: "#6A866D", pos: "top-[8%] left-[12%]", size: 34 },
  { Icon: CpuIcon, color: "#B87342", pos: "top-[58%] left-[4%]", size: 30 },
  { Icon: CompassIcon, color: "#CFA24D", pos: "top-[20%] left-[68%]", size: 32 },
  { Icon: CalculatorIcon, color: "#5B7C99", pos: "top-[68%] left-[62%]", size: 28 },
];

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="relative min-h-[calc(100dvh-65px)] overflow-hidden bg-bg">
      {/* Ambient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 18% 22%, rgba(207,162,77,0.08) 0%, transparent 60%), radial-gradient(ellipse 55% 50% at 88% 78%, rgba(91,124,153,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 xl:px-16 py-14 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-center gap-14 lg:gap-8">
          {/* ─ Left: Editorial brand panel ─ */}
          <div className="flex-1 lg:max-w-[480px] relative">
            <div className="hidden lg:block absolute inset-0 pointer-events-none select-none opacity-[0.16]" aria-hidden="true">
              {ORBIT_ICONS.map(({ Icon, color, pos, size }, i) => (
                <span key={i} className={`absolute ${pos}`} style={{ color }}>
                  <Icon size={size} />
                </span>
              ))}
            </div>

            <motion.div {...fadeUp(0.04)} className="relative flex items-center gap-2.5 mb-6">
              <span className="w-7 h-px bg-primary/50" />
              <span className="text-[13px] uppercase tracking-[0.2em] font-bold text-primary">{eyebrow}</span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="relative font-heading text-[clamp(2.2rem,4.6vw,3.4rem)] font-black leading-[1.05] tracking-[-0.035em] text-text mb-5"
            >
              {title}
            </motion.h1>

            <motion.p {...fadeUp(0.16)} className="relative text-[1rem] text-text-muted leading-[1.72] max-w-[400px] mb-9">
              {description}
            </motion.p>

            <motion.ul {...fadeUp(0.22)} className="relative flex flex-col gap-3.5">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[0.88rem] text-text-muted">
                  <span className="mt-0.5 text-success shrink-0">
                    <CheckCircleIcon size={17} />
                  </span>
                  {point}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ─ Right: Double-bezel form card ─ */}
          <motion.div {...fadeUp(0.14)} className="flex-1 w-full lg:max-w-[440px] mx-auto">
            <div className="p-[3px] rounded-[2rem] bg-border ring-1 ring-border/50">
              <div
                className="rounded-[calc(2rem-3px)] bg-bg px-7 py-9 sm:px-9 sm:py-10"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}
              >
                {children}
              </div>
            </div>
            {footer && <div className="mt-6 text-center">{footer}</div>}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function AuthFieldLabel({ children, htmlFor }: { children: ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-[0.78rem] font-semibold text-text mb-2 tracking-[-0.01em]">
      {children}
    </label>
  );
}

export function AuthFormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="mb-5 rounded-2xl border border-danger/20 bg-danger-bg px-4 py-3 text-[0.82rem] font-medium text-danger"
    >
      {message}
    </div>
  );
}

export function AuthFormSuccess({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="status"
      className="mb-5 rounded-2xl border border-success/20 bg-success-bg px-4 py-3 text-[0.82rem] font-medium text-success"
    >
      {message}
    </div>
  );
}

export function AuthSubmitButton({
  children,
  loading,
  disabled,
}: {
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="group w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-primary hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed px-6 py-3.5 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
    >
      {loading ? (
        <span className="animate-spin">
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" opacity="0.3" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </span>
      ) : null}
      {children}
    </button>
  );
}
