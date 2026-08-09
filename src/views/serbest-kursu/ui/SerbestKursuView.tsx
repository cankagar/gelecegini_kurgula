"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Shuffle } from "lucide-react";
import { ARTICLES_PAGE_SIZE, useArticlesQuery, useRandomArticleMutation } from "@/entities/article";
import { ROUTES } from "@/shared/lib/routes";
import { SpinnerIcon } from "@/shared/ui/icons";
import { Pagination } from "@/shared/ui/pagination";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getInitial(name: string | null) {
  return (name || "?")[0].toUpperCase();
}

const AVATAR_PALETTES = [
  "bg-[#FBF3DB] text-[#956400]",
  "bg-[#E1F3FE] text-[#1F6C9F]",
  "bg-[#EDF3EC] text-[#346538]",
  "bg-[#FDEBEC] text-[#9F2F2D]",
  "bg-[#F7F6F3] text-[#787774]",
];

function avatarBg(initial: string) {
  return AVATAR_PALETTES[initial.charCodeAt(0) % AVATAR_PALETTES.length];
}

export function SerbestKursuView() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useArticlesQuery(page);
  const router = useRouter();
  const randomArticle = useRandomArticleMutation();

  const totalPages = data ? Math.max(1, Math.ceil(data.total / ARTICLES_PAGE_SIZE)) : 1;

  function handlePageChange(next: number) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleRandomArticle() {
    try {
      const article = await randomArticle.mutateAsync();
      router.push(ROUTES.SERBEST_KURSU.ARTICLE_DETAIL(article.slug));
    } catch {
      // isError state renders the inline message below
    }
  }

  return (
    <div className="min-h-[calc(100dvh-65px)] bg-[#FBFBFA]">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="border-b border-[#EAEAEA] bg-[#FBFBFA]"
      >
        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#787774]">
                Serbest Kürsü
              </p>
              <h1
                className="not-italic mb-3 text-[2.4rem] leading-[1.1] tracking-[-0.03em] text-[#111111]"
                style={{ fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif", fontStyle: "normal" }}
              >
                Eğitmenlerden Bilim Yazıları
              </h1>
              <p className="text-[0.9rem] leading-relaxed text-[#787774]">
                Makale okuyun, fikir paylaşın, tartışmalara katılın.
              </p>
            </div>

            <button
              type="button"
              onClick={handleRandomArticle}
              disabled={randomArticle.isPending}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-4 py-2 text-[0.8rem] font-medium text-[#2F3437] transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#F0EFEA] disabled:opacity-60"
            >
              <Shuffle size={14} className={randomArticle.isPending ? "animate-spin" : ""} />
              Rastgele Makale
            </button>
          </div>

          {randomArticle.isError && (
            <p className="mt-3 text-[0.8rem] text-[#9F2F2D]">
              Rastgele makale getirilemedi. Lütfen tekrar deneyin.
            </p>
          )}
        </div>
      </motion.div>

      <div className="mx-auto max-w-3xl px-6 py-8">
        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <SpinnerIcon className="animate-spin text-[#787774]" size={22} />
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-sm text-[#787774]">Makaleler yüklenemedi. Lütfen tekrar deneyin.</p>
          </div>
        )}

        {!isLoading && !isError && data?.items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-sm text-[#787774]">Henüz yayınlanmış bir makale yok.</p>
          </div>
        )}

        {!isLoading && !isError && data && data.items.length > 0 && (
          <div className="flex flex-col">
            {data.items.map((article, index) => {
              const initial = getInitial(article.author_name);
              return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative ${index > 0 ? "border-t border-[#E4E1D6]" : ""}`}
                >
                  <Link
                    href={ROUTES.SERBEST_KURSU.ARTICLE_DETAIL(article.slug)}
                    className="-mx-4 flex flex-col rounded-2xl px-4 py-9 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/70 sm:-mx-6 sm:px-6"
                  >
                    <div className="mb-4 flex items-center gap-2.5">
                      <div
                        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${avatarBg(initial)}`}
                      >
                        {initial}
                      </div>
                      <div className="flex items-center gap-1.5 text-[0.8rem] text-[#787774]">
                        <span className="font-medium text-[#2F3437]">
                          {article.author_name ?? "Bilinmeyen yazar"}
                        </span>
                        <span>·</span>
                        <span>{formatDate(article.published_at)}</span>
                      </div>
                    </div>

                    <h2
                      className="mb-2 text-[1.35rem] font-bold leading-[1.22] tracking-[-0.025em] text-[#111111] transition-colors duration-200 group-hover:text-[#54514A]"
                      style={{ fontFamily: "'Helvetica Neue', 'SF Pro Display', system-ui, sans-serif" }}
                    >
                      {article.title}
                    </h2>

                    {article.excerpt && (
                      <p className="mb-4 line-clamp-2 text-[0.9rem] leading-[1.7] text-[#787774]">
                        {article.excerpt}
                      </p>
                    )}

                    <span className="inline-flex items-center gap-2 text-[0.8rem] font-medium text-[#787774] transition-colors duration-200 group-hover:text-[#111111]">
                      Devamını oku
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F0EFEA] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:bg-[#111111] group-hover:text-white">
                        <ArrowRight size={12} />
                      </span>
                    </span>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}

        {!isLoading && !isError && data && data.items.length > 0 && (
          <div className="mt-8 pt-7">
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </div>
  );
}
