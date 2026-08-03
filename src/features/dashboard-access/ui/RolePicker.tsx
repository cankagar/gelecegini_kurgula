"use client";

import { useRouter } from "next/navigation";
import type { DashboardRole } from "@/entities/dashboard";
import { setStoredActiveRole } from "@/entities/dashboard";
import { ROLE_LABELS } from "@/entities/user";

type RolePickerProps = {
  roles: DashboardRole[];
};

// Shown when a user holds more than one dashboard role (e.g. teacher +
// author) and hasn't picked one yet in this browser — we never guess which
// one to open.
export function RolePicker({ roles }: RolePickerProps) {
  const router = useRouter();

  function choose(role: DashboardRole) {
    setStoredActiveRole(role);
    router.push(`/dashboard/${role}`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-heading text-[1.4rem] font-bold text-text tracking-[-0.02em]">
          Hangi rolle devam etmek istersin?
        </h1>
        <p className="mt-1.5 text-[0.9rem] text-text-muted">
          Birden fazla rolün var. Devam etmek istediğin panelini seç.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => choose(role)}
              className="rounded-md border border-border bg-bg px-4 py-3 text-left text-[0.9rem] font-medium text-text transition-colors duration-150 hover:border-primary-border hover:bg-primary-tint"
            >
              {ROLE_LABELS[role]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
