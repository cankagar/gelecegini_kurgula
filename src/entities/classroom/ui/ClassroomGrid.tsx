import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { IconChip } from "@/shared/ui/icon-chip";
import { formatDate } from "@/shared/lib/date";
import type { Classroom } from "@/entities/classroom/model/types";

type ClassroomGridProps = {
  classrooms: Classroom[];
  getHref: (classroomId: string) => string;
};

export function ClassroomGrid({ classrooms, getHref }: ClassroomGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {classrooms.map((classroom) => (
        <Link
          key={classroom.id}
          href={getHref(classroom.id)}
          className="group flex flex-col gap-8 rounded-2xl bg-surface/50 p-6 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-surface"
        >
          <div className="flex items-center justify-between">
            <IconChip icon={GraduationCap} size={16} />
            {classroom.closed_at && (
              <span className="rounded-full bg-danger-bg px-2 py-0.5 text-[0.75rem] font-medium text-danger">
                Kapalı
              </span>
            )}
          </div>

          <div>
            <h2 className="font-heading text-[1.1rem] font-bold text-text tracking-[-0.02em] transition-colors duration-300 group-hover:text-primary">
              {classroom.name}
            </h2>
            <p className="mt-1 text-[0.8rem] text-text-muted">{formatDate(classroom.created_at)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
