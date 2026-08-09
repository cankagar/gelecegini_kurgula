import type { JSONContent } from "@tiptap/react";

export type ArticleSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  author_name: string | null;
  published_at: string;
};

export type ArticlePage = {
  items: ArticleSummary[];
  total: number;
  skip: number;
  limit: number;
};

export type TiptapMark = {
  type: string;
};

export type TiptapNode = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  text?: string;
  marks?: TiptapMark[];
};

export type ArticleRandom = {
  id: string;
  slug: string;
};

export type ArticleDetail = {
  id: string;
  title: string;
  slug: string;
  content: TiptapNode;
  author_name: string | null;
  published_at: string;
};

// Author'ın kendi yazısını görürken/düzenlerken kullandığı şekil — backend'in
// `ArticleRead` şemasıyla eşleşir. `content` burada `TiptapNode` değil `JSONContent`
// (tiptap'ın kendi tipi) — bu şekil sadece editör tarafında (@tiptap/react zaten
// bağımlılık) tüketiliyor, public render tarafı kendi hafif `TiptapNode` tipini kullanıyor.
export type ArticleOwn = {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  content: JSONContent;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};
