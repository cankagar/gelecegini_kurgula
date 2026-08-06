import type { User } from "@/entities/user";
import { formatFullName } from "@/shared/lib";

type DashboardAdminViewProps = {
  user: User;
};

export function DashboardAdminView({ user }: DashboardAdminViewProps) {
  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <h1 className="font-heading text-[1.9rem] font-bold tracking-[-0.025em] text-text">
        Merhaba, {formatFullName(user, user.email ?? "")}
      </h1>
      <p className="mt-1.5 text-[0.9rem] text-text-muted">Yönetici panelin burada.</p>
    </div>
  );
}
