import type { User } from "@/entities/user";

type DashboardTeacherViewProps = {
  user: User;
};

export function DashboardTeacherView({ user }: DashboardTeacherViewProps) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="font-heading text-2xl font-bold text-text tracking-[-0.02em]">
        Merhaba, {user.full_name ?? user.email}
      </h1>
      <p className="mt-1.5 text-[0.9rem] text-text-muted">Eğitmen panelin burada.</p>
    </div>
  );
}
