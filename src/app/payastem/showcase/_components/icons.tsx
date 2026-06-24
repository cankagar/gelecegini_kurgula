type IconProps = {
  className?: string;
  size?: number;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PsArrowIcon({ className, size = 16 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export function PsRocketIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 2.5c2.8 1.3 4.6 4.4 4.6 8.4 0 2.7-1 5.6-2.3 7.4L12 21l-2.3-2.7C8.4 16.5 7.4 13.6 7.4 10.9c0-4 1.8-7.1 4.6-8.4Z" />
      <circle cx="12" cy="9.5" r="1.5" />
      <path d="M7.4 13.5 4 15.5l1.2 4.3 3.4-2.2" />
      <path d="M16.6 13.5 20 15.5l-1.2 4.3-3.4-2.2" />
    </svg>
  );
}

export function PsRobotIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="5" y="9" width="14" height="10" rx="2.2" />
      <path d="M12 9V5.5" />
      <circle cx="12" cy="4" r="1.2" />
      <circle cx="9" cy="13.8" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13.8" r="1" fill="currentColor" stroke="none" />
      <path d="M9 17h6" />
      <path d="M2.5 12.5v3" />
      <path d="M21.5 12.5v3" />
    </svg>
  );
}

export function PsBrainIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M9 4.5a3 3 0 0 0-3 3c-1.4.3-2.4 1.6-2.4 3.1 0 .9.3 1.7.9 2.3-.6.6-.9 1.4-.9 2.3 0 1.7 1.3 3.1 3 3.2.3 1.3 1.5 2.3 2.9 2.3 1 0 1.9-.5 2.5-1.3" />
      <path d="M15 4.5a3 3 0 0 1 3 3c1.4.3 2.4 1.6 2.4 3.1 0 .9-.3 1.7-.9 2.3.6.6.9 1.4.9 2.3 0 1.7-1.3 3.1-3 3.2-.3 1.3-1.5 2.3-2.9 2.3-1 0-1.9-.5-2.5-1.3" />
      <path d="M12 4.5v15.3" />
      <path d="M9 9.5h2.4" />
      <path d="M12.6 13h2.4" />
      <path d="M8.6 16.5h2" />
    </svg>
  );
}

export function PsAtomIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
    </svg>
  );
}

export function PsMedalIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="14.5" r="6" />
      <path d="M9.5 9 7 3" />
      <path d="M14.5 9 17 3" />
      <path d="M12 11.5v6" />
      <path d="m9.5 14.5 2.5-1 2.5 1" />
    </svg>
  );
}

export function PsTargetIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="8.3" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PsChipIcon({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="6.5" y="6.5" width="11" height="11" rx="1.4" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.6" />
      <path d="M9 3v2.2M12 3v2.2M15 3v2.2M9 18.8V21M12 18.8V21M15 18.8V21M3 9h2.2M3 12h2.2M3 15h2.2M18.8 9H21M18.8 12H21M18.8 15H21" />
    </svg>
  );
}

export function PsMenuIcon({ className, size = 18 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4 7h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function PsCloseIcon({ className, size = 18 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M5 5l14 14" />
      <path d="M19 5 5 19" />
    </svg>
  );
}

export function PsInstagramIcon({ className, size = 18 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PsXIcon({ className, size = 18 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4.5 4.5 19.5 19.5" />
      <path d="M19.5 4.5 4.5 19.5" />
    </svg>
  );
}

export function PsYoutubeIcon({ className, size = 18 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.7v4.6l4-2.3-4-2.3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PsLinkedinIcon({ className, size = 18 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M7.6 10.2v6.2" />
      <circle cx="7.6" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 16.4v-3.6c0-1.5 1-2.5 2.3-2.5 1.3 0 2.1 1 2.1 2.5v3.6" />
      <path d="M11.5 10.2v6.2" />
    </svg>
  );
}
