"use client";

import { useQuery } from "@tanstack/react-query";
import { getArticleBySlug } from "@/entities/article/api/articleApi";

export function useArticleQuery(slug: string) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticleBySlug(slug),
    staleTime: 60 * 1000,
  });
}
