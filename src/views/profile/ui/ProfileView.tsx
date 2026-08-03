"use client";

import { useRequireAuth } from "@/features/auth";

// Placeholder — content comes later. Just needs to exist and be
// auth-gated so /profile isn't a dead 404 link from the navbar.
export function ProfileView() {
  const user = useRequireAuth();
  if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">Profil</h1>
      <p className="mt-2 text-[0.9rem] text-text-muted">Yakında burada olacak.</p>
    </div>
  );
}
