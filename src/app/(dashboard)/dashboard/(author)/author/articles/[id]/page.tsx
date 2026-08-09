"use client";

import { use } from "react";
import { DashboardAuthorArticleEditorView } from "@/views/dashboard-author-article-editor";

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <DashboardAuthorArticleEditorView key={id} articleId={id} />;
}
