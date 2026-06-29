"use client";

import { useRouter } from "next/navigation";
import { Dock, type DockItemData } from "@/shared/ui/dock";
import { HomeIcon, RocketIcon, GamepadIcon } from "@/shared/ui/icons";
import { useScrolledPast, NAV_HIDE_THRESHOLD, NAV_HIDE_DURATION_MS, useScrollFlowColor } from "@/shared/lib";

const SHORTCUTS: { icon: React.ReactNode; label: string; href: string }[] = [
  { icon: <HomeIcon size={19} />, label: "Anasayfa", href: "/" },
  { icon: <RocketIcon size={19} />, label: "Serbest Kürsü", href: "/serbest-kursu" },
  { icon: <GamepadIcon size={19} />, label: "Oyun Merkezi", href: "/oyun-merkezi" },
];

export function SiteDock() {
  const router = useRouter();
  const scrolled = useScrolledPast(NAV_HIDE_THRESHOLD);
  const tintColor = useScrollFlowColor("color-flow", "#F0EFE9");

  const items: DockItemData[] = SHORTCUTS.map((shortcut) => ({
    icon: shortcut.icon,
    label: shortcut.label,
    onClick: () => router.push(shortcut.href),
  }));

  return (
    <Dock
      items={items}
      panelHeight={64}
      baseItemSize={46}
      magnification={64}
      distance={140}
      visible={scrolled}
      showDelayMs={NAV_HIDE_DURATION_MS - 50}
      tintColor={tintColor}
    />
  );
}
