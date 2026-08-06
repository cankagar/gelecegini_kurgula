import type { User } from "@/entities/user";
import { formatFullName } from "@/shared/lib";

type DashboardTeacherViewProps = {
  user: User;
};

export function DashboardTeacherView({ user }: DashboardTeacherViewProps) {
  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">
        Merhaba, {formatFullName(user, user.email ?? "")}
      </h1>
      <p className="mt-1.5 text-[0.9rem] text-text-muted">Eğitmen panelin burada.</p>
    </div>
  );
}
