import type { ReactNode } from "react";

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
