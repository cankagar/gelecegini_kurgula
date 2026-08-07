"use client";

import { useEffect, useState, type ReactNode } from "react";
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

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-text/40 backdrop-blur-sm transition-opacity duration-[250ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={
          variant === "scroll"
            ? `relative ${SIZE_CLASSES[size]} origin-center rounded-[1.75rem] bg-bg p-8 shadow-xl transition-transform duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                visible ? "scale-y-100" : "scale-y-0"
              }`
            : `relative ${SIZE_CLASSES[size]} rounded-[1.75rem] bg-bg p-6 shadow-xl transition-all duration-[250ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
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
