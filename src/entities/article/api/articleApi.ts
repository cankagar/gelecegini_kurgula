import { httpClient, toApiError } from "@/shared/api";
import type {
  ArticleDetail,
  ArticleOwn,
  ArticlePage,
  ArticleRandom,
} from "@/entities/article/model/types";

// Herkese açık — kayıtlı olsun olmasın tüm kullanıcılar yayındaki makaleleri görebilir.
export async function listPublishedArticles(skip: number, limit: number) {
  try {
    const { data } = await httpClient.get<ArticlePage>("/v1/articles", {
      params: { skip, limit },
    });
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function getRandomArticle() {
  try {
    const { data } = await httpClient.get<ArticleRandom>("/v1/articles/random");
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const { data } = await httpClient.get<ArticleDetail>(
      `/v1/articles/${encodeURIComponent(slug)}`
    );
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

// Author-only — kendi yazıları.
export async function listMyArticles(skip: number, limit: number) {
  try {
    const { data } = await httpClient.get<ArticleOwn[]>("/v1/articles/mine", {
      params: { skip, limit },
    });
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function getMyArticle(id: string) {
  try {
    const { data } = await httpClient.get<ArticleOwn>(`/v1/articles/mine/${id}`);
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function createArticle(input: { title: string; content: ArticleOwn["content"] }) {
  try {
    const { data } = await httpClient.post<ArticleOwn>("/v1/articles", input);
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function updateArticle(
  id: string,
  input: Partial<{ title: string; content: ArticleOwn["content"] }>
) {
  try {
    const { data } = await httpClient.patch<ArticleOwn>(`/v1/articles/${id}`, input);
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function publishArticle(id: string) {
  try {
    const { data } = await httpClient.post<ArticleOwn>(`/v1/articles/${id}/publish`);
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function unpublishArticle(id: string) {
  try {
    const { data } = await httpClient.post<ArticleOwn>(`/v1/articles/${id}/unpublish`);
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function deleteArticle(id: string) {
  try {
    await httpClient.delete(`/v1/articles/${id}`);
  } catch (err) {
    throw toApiError(err);
  }
}
