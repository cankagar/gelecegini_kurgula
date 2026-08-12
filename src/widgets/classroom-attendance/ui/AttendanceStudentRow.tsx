import { motion, useAnimationControls } from "framer-motion";
import type { ClassroomMember } from "@/entities/classroom";
import type { AttendanceStatus } from "@/entities/attendance";
import { formatFullName } from "@/shared/lib";
import { Avatar } from "@/shared/ui/avatar";

type AttendanceStudentRowProps = {
  student: ClassroomMember;
  status: AttendanceStatus | null;
  note: string;
  isFirst?: boolean;
  onStatusChange: (status: AttendanceStatus) => void;
  onNoteChange: (note: string) => void;
};

export function AttendanceStudentRow({
  student,
  status,
  note,
  isFirst = false,
  onStatusChange,
  onNoteChange,
}: AttendanceStudentRowProps) {
  const name = formatFullName(student, "İsimsiz");
  const controls = useAnimationControls();

  function handleStatusChange(next: AttendanceStatus) {
    onStatusChange(next);
    controls.start({ scale: [1, 1.06, 1], transition: { duration: 0.4, ease: "easeOut" } });
  }

  return (
    <motion.li
      layout
      animate={controls}
      transition={{ layout: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } }}
      className={`flex flex-col gap-3 rounded-2xl sm:flex-row sm:items-center sm:justify-between ${
        isFirst ? "px-6 py-5" : "px-5 py-4"
      } ${status === null ? "bg-bg" : "bg-bg/60"}`}
    >
      <div className="flex items-center gap-3">
        <Avatar name={name} size={isFirst ? 48 : 28} />
        <div>
          <p className={`font-medium text-text ${isFirst ? "text-[1.05rem]" : "text-[0.9rem]"}`}>
            {name}
          </p>
          <p className={`text-text-muted ${isFirst ? "text-[0.85rem]" : "text-[0.75rem]"}`}>
            {student.email}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex gap-1 rounded-full bg-surface p-1">
          <button
            type="button"
            onClick={() => handleStatusChange("present")}
            className={`rounded-full px-3 py-1.5 text-[0.8rem] font-medium transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              status === "present" ? "bg-success-bg text-success" : "text-text-muted hover:text-text"
            }`}
          >
            Geldi
          </button>
          <button
            type="button"
            onClick={() => handleStatusChange("absent")}
            className={`rounded-full px-3 py-1.5 text-[0.8rem] font-medium transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              status === "absent" ? "bg-danger-bg text-danger" : "text-text-muted hover:text-text"
            }`}
          >
            Gelmedi
          </button>
        </div>

        <input
          type="text"
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Not (opsiyonel)"
          className="w-full rounded-md border border-border px-3 py-1.5 text-[0.8rem] text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-40"
        />
      </div>
    </motion.li>
  );
}
