import type { User } from "@/entities/user";

type DashboardAdminViewProps = {
  user: User;
};

export function DashboardAdminView({ user }: DashboardAdminViewProps) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="font-heading text-2xl font-bold text-text tracking-[-0.02em]">
        Merhaba, {user.full_name ?? user.email}
      </h1>
      <p className="mt-1.5 text-[0.9rem] text-text-muted">Yönetici panelin burada.</p>
    </div>
  );
}
