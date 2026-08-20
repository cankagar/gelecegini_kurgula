export type ClassroomTab = "assignments" | "members" | "attendance";

type ClassroomTabBarProps = {
  tab: ClassroomTab;
  onTabChange: (tab: ClassroomTab) => void;
  hasAttendance: boolean;
};

const TABS = [
  { id: "assignments" as const, label: "Ödevler" },
  { id: "members" as const, label: "Üyeler" },
  { id: "attendance" as const, label: "Yoklama" },
];

/** X/Twitter'daki üst sekme çubuğu gibi: düz metin sekmeler, aktif olanın altında ince renkli çizgi. */
export function ClassroomTabBar({ tab, onTabChange, hasAttendance }: ClassroomTabBarProps) {
  const tabs = TABS.filter((t) => t.id !== "attendance" || hasAttendance);

  return (
    <div className="flex border-b border-border">
      {tabs.map(({ id, label }) => {
        const active = tab === id;
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex-1 border-b-2 px-2 py-3 text-[0.9rem] transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              active
                ? "border-primary font-bold text-text"
                : "border-transparent font-medium text-text-muted hover:bg-surface/40 hover:text-text"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
