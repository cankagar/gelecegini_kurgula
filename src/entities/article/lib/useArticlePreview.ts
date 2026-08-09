"use client";

import { useMemo, useSyncExternalStore } from "react";
import { ARTICLE_PREVIEW_STORAGE_KEY, type ArticlePreviewData } from "./articlePreviewStorage";

function subscribe() {
  // sessionStorage bu sekme içinde başka bir yerden değişmiyor — no-op yeterli.
  return () => {};
}

function getSnapshot(): string | null {
  return sessionStorage.getItem(ARTICLE_PREVIEW_STORAGE_KEY);
}

function getServerSnapshot(): string | null {
  return null;
}

// `useSyncExternalStore`: sessionStorage taslak verisini bir `useEffect`
// içinde `setState`'e gerek kalmadan okur — SSR/hydration ile uyumlu,
// snapshot ham string olduğu için (JSON.parse sonucu değil) her render'da
// yeni referans üretip sonsuz döngüye yol açmıyor.
export function useArticlePreview(): ArticlePreviewData | null {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return useMemo(() => {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as ArticlePreviewData;
    } catch {
      return null;
    }
  }, [raw]);
}
