type IconProps = {
  className?: string;
  size?: number;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function VerifiedBadgeIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2.5 14.4 4l2.8-.6 1 2.7 2.7 1-.6 2.8 1.5 2.4-1.5 2.4.6 2.8-2.7 1-1 2.7-2.8-.6L12 21.5l-2.4-1.5-2.8.6-1-2.7-2.7-1 .6-2.8L2.2 12l1.5-2.4-.6-2.8 2.7-1 1-2.7 2.8.6L12 2.5Z" />
      <path
        d="M8.5 12.3 10.9 14.7 15.5 9.3"
        stroke="var(--color-bg)"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function HomeIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="m4 11 8-7 8 7" />
      <path d="M6 9.5V20h12V9.5" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

export function LoginIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M11 4H6.5A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20H11" />
      <path d="M14 8.5 18.5 12 14 15.5" />
      <path d="M18 12H9" />
    </svg>
  );
}

export function BookIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z" />
    </svg>
  );
}

export function RocketIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
      <path d="M12 15c1.5-1.5 4-7 3.5-11.5C11 4 5 6.5 3.5 8c-1.5 1.5-3 5-1 5.5l4.5 2L12 15Z" />
      <path d="M9 12.5 14.5 9" />
    </svg>
  );
}

export function PuzzleIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4 9h2.5a1.5 1.5 0 1 0 0-3H4v3Z" />
      <path d="M4 9v6h6v2.5a1.5 1.5 0 1 0 3 0V15h6V9h-2.5a1.5 1.5 0 1 1 0-3H19V4h-6v2.5a1.5 1.5 0 1 1-3 0V4H4v5Z" />
    </svg>
  );
}

export function ShoppingBagIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M6 7h12l1 14H5L6 7Z" />
      <path d="M9 7V5a3 3 0 1 1 6 0v2" />
    </svg>
  );
}

export function UsersIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M15.5 6.5a3 3 0 0 1 0 5.9" />
      <path d="M21 20c0-2.8-2-5.2-4.7-5.8" />
    </svg>
  );
}

export function GraduationCapIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="m2 9 10-4 10 4-10 4-10-4Z" />
      <path d="M6 11v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" />
    </svg>
  );
}

export function TargetIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function WalletIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h12A2.5 2.5 0 0 1 20 7.5V9H3V7.5Z" />
      <path d="M3 9h18v8.5A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5V9Z" />
      <path d="M16 14h2" />
    </svg>
  );
}

export function ClipboardListIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 3h6v3H9z" />
      <path d="M9 11h6M9 15h6" />
    </svg>
  );
}

export function TrendingUpIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="m3 16 5-5 4 4 8-9" />
      <path d="M14 6h6v6" />
    </svg>
  );
}

export function LightbulbIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6V16h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3Z" />
    </svg>
  );
}

export function BellIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M6 9a6 6 0 1 1 12 0c0 3.5 1 5 1.5 6h-15C5 14 6 12.5 6 9Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function LockIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V7a4 4 0 1 1 8 0v3.5" />
    </svg>
  );
}

export function AlertTriangleIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
      <path d="M12 10v4" />
      <path d="M12 17.2v.1" />
    </svg>
  );
}

export function VideoIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10.5 21 7v10l-5-3.5" />
    </svg>
  );
}

export function LinkIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11 6.5 12.6 4.9a3.5 3.5 0 1 1 4.9 4.9L16 11.4" />
      <path d="M13 17.5 11.4 19.1a3.5 3.5 0 1 1-4.9-4.9L8 12.6" />
    </svg>
  );
}

export function FileTextIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4" />
      <path d="M9 13h6M9 16.5h6" />
    </svg>
  );
}

export function CheckCircleIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.3 2.4 2.4 4.6-5.4" />
    </svg>
  );
}

export function WrenchIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M14.7 6.3a4 4 0 1 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2-2 2.3-2.3Z" />
    </svg>
  );
}

export function MegaphoneIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M3 11v3a1 1 0 0 0 1 1h2l2 5h2l-1.5-5H10l9 3V5l-9 3H4a1 1 0 0 0-1 1Z" />
    </svg>
  );
}

export function TrophyIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5H4a3 3 0 0 0 3 5" />
      <path d="M17 5h3a3 3 0 0 1-3 5" />
      <path d="M10 17h4" />
      <path d="M12 14v3" />
      <path d="M8 20h8" />
    </svg>
  );
}

export function DnaIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M7 3c0 5 10 4 10 9s-10 4-10 9" />
      <path d="M17 3c0 5-10 4-10 9s10 4 10 9" />
      <path d="M8.5 7h7M8.5 17h7" />
    </svg>
  );
}

export function BotIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="4" y="9" width="16" height="11" rx="2" />
      <path d="M12 9V5" />
      <circle cx="12" cy="3.5" r="1.2" fill="currentColor" stroke="none" />
      <path d="M8.5 14v1.5M15.5 14v1.5" />
      <path d="M2 13h2M20 13h2" />
    </svg>
  );
}

export function OrbitIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="3" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(35 12 12)" />
    </svg>
  );
}

export function BrainIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M9 4.5a3 3 0 0 0-3 3v.3A3 3 0 0 0 5 13a3 3 0 0 0 1.5 5.4 2.6 2.6 0 0 0 4.8.1c.45.3 1 .5 1.7.5" />
      <path d="M15 4.5a3 3 0 0 1 3 3v.3a3 3 0 0 1 1 5.2 3 3 0 0 1-1.5 5.4 2.6 2.6 0 0 1-4.8.1" />
      <path d="M12 4.5v14" />
    </svg>
  );
}

export function GamepadIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M7 8h2m-1-1v2" />
      <circle cx="16" cy="8.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
      <path d="M6.5 7h11a4 4 0 0 1 4 4.5l-.8 4.2a2.3 2.3 0 0 1-4-1l-.5-1.2a2 2 0 0 0-1.8-1.2h-3.8a2 2 0 0 0-1.8 1.2l-.5 1.2a2.3 2.3 0 0 1-4 1l-.8-4.2A4 4 0 0 1 6.5 7Z" />
    </svg>
  );
}

export function ClockIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function ChevronDownIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function StarIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7L12 3Z" />
    </svg>
  );
}

export function PenIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4 20l1-4.2L15.8 5 19 8.2 8.2 19 4 20Z" />
      <path d="m13.5 6.5 3 3" />
    </svg>
  );
}

export function HeartIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 20S3.5 14.5 3.5 9a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2c0 5.5-8.5 11-8.5 11Z" />
    </svg>
  );
}

export function MessageCircleIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M21 12a8.5 8.5 0 1 1-3.6-7L21 4l-1 3.4A8.4 8.4 0 0 1 21 12Z" />
    </svg>
  );
}

export function HelpCircleIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.3a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .8-1 1.7" />
      <path d="M12 17.3v.1" />
    </svg>
  );
}

export function FolderIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M3.5 6.5a1.5 1.5 0 0 1 1.5-1.5h4l2 2.5h8a1.5 1.5 0 0 1 1.5 1.5v8.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-11Z" />
    </svg>
  );
}

export function ArrowRightIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
