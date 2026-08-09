"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useMyArticlesQuery } from "@/entities/article";
import type { ArticleOwn } from "@/entities/article";
import { ROUTES } from "@/shared/lib/routes";
import { SearchInput } from "@/shared/ui/search-input";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type ArticleRowProps = {
  article: ArticleOwn;
  index: number;
};

function ArticleRow({ article, index }: ArticleRowProps) {
  const router = useRouter();
  const isPublished = Boolean(article.published_at);

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        onClick={() => router.push(ROUTES.AUTHOR.ARTICLE_EDIT(article.id))}
        className="flex w-full items-center gap-4 rounded-xl bg-bg px-4 py-3.5 text-left transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-bg-alt/50"
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.95rem] font-semibold text-text">
            {article.title || "Başlıksız"}
          </p>
          <p className="mt-1 text-[0.78rem] text-text-muted">
            {isPublished
              ? `Yayınlandı: ${formatDate(article.published_at as string)}`
              : `Güncellendi: ${formatDate(article.updated_at)}`}
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.8rem] font-semibold ${
            isPublished ? "bg-success-bg text-success" : "bg-bg-alt text-text-muted"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${isPublished ? "bg-success" : "bg-text-muted"}`} />
          {isPublished ? "Yayında" : "Taslak"}
        </span>
      </button>
    </motion.li>
  );
}

export function DashboardAuthorArticlesView() {
  const { data: articles, isLoading, isError, refetch } = useMyArticlesQuery();
  const [search, setSearch] = useState("");

  // TODO: liste büyüdükçe client-side filtreleme yetersiz kalacak — backend'de
  // `GET /articles/mine`'a `search` parametresi eklenip buradan API'ye taşınmalı.
  const filteredArticles = articles?.filter((article) =>
    (article.title || "Başlıksız").toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">
            Yazılarım
          </h1>
          <p className="text-[0.9rem] text-text-muted">Yazılarını oluştur, düzenle, yayınla.</p>
        </div>
        <Link
          href={ROUTES.AUTHOR.ARTICLE_NEW}
          className="rounded-full bg-primary px-5 py-2.5 text-[0.85rem] font-semibold text-cta-text transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary-hover active:scale-[0.98]"
        >
          Yeni Yazı
        </Link>
      </div>

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Yazılarında ara..."
        className="mt-6 max-w-sm"
      />

      <div className="mt-4 rounded-2xl bg-surface/50 px-4 py-4">
        {isLoading && (
          <div className="flex flex-col gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[62px] animate-pulse rounded-xl bg-bg-alt" />
            ))}
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center gap-3 py-14 text-center">
            <p className="text-[0.9rem] text-text-muted">Yazılar yüklenemedi.</p>
            <button
              onClick={() => refetch()}
              className="rounded-full border border-border px-3.5 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-text hover:bg-text hover:text-cta-text"
            >
              Tekrar dene
            </button>
          </div>
        )}

        {!isLoading && !isError && articles?.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-14 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-alt text-text-muted">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-[0.95rem] font-medium text-text">Henüz yazın yok</p>
              <p className="mt-1 text-[0.85rem] text-text-muted">
                İlk yazını oluştur, taslak olarak kaydet, hazır olduğunda yayınla.
              </p>
            </div>
            <Link
              href={ROUTES.AUTHOR.ARTICLE_NEW}
              className="mt-1 rounded-full bg-primary px-5 py-2.5 text-[0.85rem] font-semibold text-cta-text transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary-hover active:scale-[0.98]"
            >
              Yeni Yazı
            </Link>
          </div>
        )}

        {!isLoading &&
          !isError &&
          articles &&
          articles.length > 0 &&
          filteredArticles?.length === 0 && (
            <p className="py-14 text-center text-[0.9rem] text-text-muted">
              Aramayla eşleşen yazı yok.
            </p>
          )}

        {!isLoading && !isError && filteredArticles && filteredArticles.length > 0 && (
          <ul className="flex flex-col gap-2">
            {filteredArticles.map((article, index) => (
              <ArticleRow key={article.id} article={article} index={index} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
