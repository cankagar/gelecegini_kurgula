"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyArticle } from "@/entities/article/api/articleApi";

export function useMyArticleQuery(id: string) {
  return useQuery({
    queryKey: ["myArticle", id],
    queryFn: () => getMyArticle(id),
    enabled: id.length > 0,
    staleTime: 30 * 1000,
  });
}
