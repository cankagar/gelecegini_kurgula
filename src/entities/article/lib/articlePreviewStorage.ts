import type { JSONContent } from "@tiptap/react";

export const ARTICLE_PREVIEW_STORAGE_KEY = "payastem:article-preview";

export type ArticlePreviewData = {
  title: string;
  content: JSONContent;
  authorName: string;
};

// Author editör → yeni sekmede açılan önizleme sayfası arasında taslağı
// taşımak için — sessionStorage, `window.open` ile açılan aynı-origin
// sekmeye açılış anındaki kopyayı miras bırakır.
export function writeArticlePreview(data: ArticlePreviewData): void {
  sessionStorage.setItem(ARTICLE_PREVIEW_STORAGE_KEY, JSON.stringify(data));
}

export function readArticlePreview(): ArticlePreviewData | null {
  const raw = sessionStorage.getItem(ARTICLE_PREVIEW_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ArticlePreviewData;
  } catch {
    return null;
  }
}
