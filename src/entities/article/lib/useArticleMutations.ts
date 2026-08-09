"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createArticle,
  deleteArticle,
  publishArticle,
  unpublishArticle,
  updateArticle,
} from "@/entities/article/api/articleApi";
import type { ArticleOwn } from "@/entities/article/model/types";

export function useCreateArticleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { title: string; content: ArticleOwn["content"] }) =>
      createArticle(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myArticles"] }),
  });
}

export function useArticleMutations(articleId: string) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["myArticle", articleId] });
    queryClient.invalidateQueries({ queryKey: ["myArticles"] });
    queryClient.invalidateQueries({ queryKey: ["articles"] });
  };

  const update = useMutation({
    mutationFn: (input: Partial<{ title: string; content: ArticleOwn["content"] }>) =>
      updateArticle(articleId, input),
    onSuccess: invalidate,
  });

  const publish = useMutation({
    mutationFn: () => publishArticle(articleId),
    onSuccess: invalidate,
  });

  const unpublish = useMutation({
    mutationFn: () => unpublishArticle(articleId),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: () => deleteArticle(articleId),
    onSuccess: invalidate,
  });

  return { update, publish, unpublish, remove };
}
