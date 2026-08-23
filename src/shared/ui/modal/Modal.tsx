"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Ekran okuyucular için diyaloğun adı — genelde içerideki `ModalTitle` ile aynı metin. */
  ariaLabel?: string;
  /** "default" = ortadan hafif büyüyerek belirir. "scroll" = ortadan yukarı/aşağı açılan bir papirüs gibi dikey açılır. */
  variant?: "default" | "scroll";
  /** "md" = varsayılan genişlik. "lg"/"xl" = daha büyük/uzun içerik için. */
  size?: "md" | "lg" | "xl";
};

const TRANSITION_MS = { default: 250, scroll: 480 } as const;
const SIZE_CLASSES = {
  md: "w-full max-w-md",
  lg: "w-full max-w-2xl",
  xl: "w-[92vw] max-w-6xl",
} as const;

/**
 * Sadece bir sarmalayıcı: portal, backdrop, boyut/animasyon ve kapatma davranışını yönetir.
 * Başlık/açıklama/footer gibi içerik yapısını dayatmaz — `ModalTitle`/`ModalDescription`/`ModalFooter`
 * ile (veya tamamen serbest içerikle) `children` olarak kompoze edilir. Onay/ret diyalogları da
 * dahil her yerde bu şekilde kullanılır.
 */
export function Modal({ open, onClose, children, ariaLabel, variant = "default", size = "md" }: ModalProps) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // İlk boyayı (visible=false hâli) tarayıcının gerçekten çizmesini garantilemek için
      // tek rAF yetmiyor — bazı tarayıcılarda ilk açılışta geçiş atlanıp direkt son hâle geçiyor.
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(raf);
    }

    setVisible(false);
    const timeout = setTimeout(() => setMounted(false), TRANSITION_MS[variant]);
    return () => clearTimeout(timeout);
  }, [open, variant]);

  useEffect(() => {
    if (!mounted) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    function getFocusable() {
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      return nodes ? Array.from(nodes) : [];
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain px-4 py-6 sm:items-center sm:py-10">
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-text/40 backdrop-blur-sm transition-opacity duration-[250ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={
          variant === "scroll"
            ? `relative ${SIZE_CLASSES[size]} max-h-[85vh] origin-top overflow-y-auto overscroll-contain rounded-[1.75rem] bg-bg p-8 shadow-xl outline-none transition-transform duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:origin-center ${
                visible ? "scale-y-100" : "scale-y-0"
              }`
            : `relative ${SIZE_CLASSES[size]} max-h-[85vh] overflow-y-auto overscroll-contain rounded-[1.75rem] bg-bg p-6 shadow-xl outline-none transition-[transform,opacity] duration-[250ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
                visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.98] opacity-0"
              }`
        }
      >
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-surface hover:text-text"
        >
          <X size={16} />
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}
