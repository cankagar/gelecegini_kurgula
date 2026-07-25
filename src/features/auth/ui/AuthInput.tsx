"use client";

import { useId, useState, type ReactNode } from "react";
import { EyeIcon, EyeOffIcon } from "@/shared/ui/icons";

type BaseProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: ReactNode;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
};

function InputShell({
  id,
  label,
  icon,
  rightSlot,
  children,
}: {
  id: string;
  label: string;
  icon: ReactNode;
  rightSlot?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.78rem] font-semibold text-text mb-2 tracking-[-0.01em]">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">{icon}</span>
        {children}
        {rightSlot && <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</span>}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-border bg-surface/60 pl-11 pr-4 py-3 text-[0.9rem] text-text placeholder:text-text-muted/70 outline-none transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus:border-primary-border focus:bg-bg focus:ring-4 focus:ring-primary/10";

export function AuthTextInput({ label, value, onChange, icon, placeholder, autoComplete, required, type = "text" }: BaseProps & { type?: string }) {
  const id = useId();
  return (
    <InputShell id={id} label={label} icon={icon}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={inputClass}
      />
    </InputShell>
  );
}

export function AuthPasswordInput({ label, value, onChange, icon, placeholder, autoComplete, required }: BaseProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);

  return (
    <InputShell
      id={id}
      label={label}
      icon={icon}
      rightSlot={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Şifreyi gizle" : "Şifreyi göster"}
          className="text-text-muted hover:text-text transition-colors duration-200 p-1"
        >
          {visible ? <EyeOffIcon size={17} /> : <EyeIcon size={17} />}
        </button>
      }
    >
      <input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        minLength={8}
        className={`${inputClass} pr-11`}
      />
    </InputShell>
  );
}
