"use client";

import { useQuery } from "@tanstack/react-query";
import { listMyArticles } from "@/entities/article/api/articleApi";

export function useMyArticlesQuery() {
  return useQuery({
    queryKey: ["myArticles"],
    queryFn: () => listMyArticles(0, 100),
    staleTime: 30 * 1000,
  });
}
