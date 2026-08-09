"use client";

import { useQuery } from "@tanstack/react-query";
import { listPublishedArticles } from "@/entities/article/api/articleApi";

export const ARTICLES_PAGE_SIZE = 10;

export function useArticlesQuery(page: number) {
  return useQuery({
    queryKey: ["articles", page],
    queryFn: () =>
      listPublishedArticles((page - 1) * ARTICLES_PAGE_SIZE, ARTICLES_PAGE_SIZE),
    staleTime: 60 * 1000,
  });
}
