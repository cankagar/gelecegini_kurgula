import type { User } from "@/entities/user";

type DashboardStudentViewProps = {
  user: User;
};

export function DashboardStudentView({ user }: DashboardStudentViewProps) {
  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">
        Merhaba, {user.full_name ?? user.email}
      </h1>
      <p className="mt-1.5 text-[0.9rem] text-text-muted">Öğrenci panelin burada.</p>
    </div>
  );
}
