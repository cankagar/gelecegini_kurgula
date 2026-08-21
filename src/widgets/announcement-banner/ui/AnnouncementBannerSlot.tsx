"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useActiveAnnouncementsQuery } from "@/entities/announcement";
import { MegaphoneIcon } from "@/shared/ui/icons";

const EASE = [0.32, 0.72, 0, 1] as const;
const SLIDE_INTERVAL_MS = 6000;

export function AnnouncementBannerSlot() {
  const { data: announcements, isLoading } = useActiveAnnouncementsQuery();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const count = announcements?.length ?? 0;

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % count);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [count]);

  function goTo(step: 1 | -1) {
    setDirection(step);
    setIndex((i) => (i + step + count) % count);
  }

  if (isLoading) {
    return <div className="mt-4 mb-2 h-[70px] animate-pulse rounded-2xl bg-bg-alt" />;
  }

  if (!announcements || announcements.length === 0) return null;

  const current = announcements[index % announcements.length];
  const hasMultiple = announcements.length > 1;

  return (
    <div className="group relative mt-4 mb-2 overflow-hidden rounded-2xl bg-primary-tint">
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={current.id}
          custom={direction}
          initial={{ x: 40 * direction, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40 * direction, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="flex gap-3 px-6 py-4"
        >
          <MegaphoneIcon className="mt-0.5 shrink-0 text-primary" size={18} />
          <div>
            <p className="font-heading font-semibold text-text">{current.title}</p>
            <p className="text-sm text-text-muted">{current.body}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {hasMultiple && (
        <>
          <button
            onClick={() => goTo(-1)}
            aria-label="Önceki duyuru"
            className="absolute left-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-bg text-text-muted opacity-0 shadow-sm ring-1 ring-border transition-opacity duration-200 group-hover:opacity-100 hover:text-primary"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={() => goTo(1)}
            aria-label="Sonraki duyuru"
            className="absolute right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-bg text-text-muted opacity-0 shadow-sm ring-1 ring-border transition-opacity duration-200 group-hover:opacity-100 hover:text-primary"
          >
            <ChevronRight size={15} />
          </button>
        </>
      )}

      {hasMultiple && (
        <div className="flex justify-center gap-1.5 pb-3">
          {announcements.map((announcement, i) => (
            <span
              key={announcement.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index % announcements.length ? "w-4 bg-primary" : "w-1.5 bg-primary-border"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
