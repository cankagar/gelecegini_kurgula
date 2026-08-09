"use client";

import { motion } from "framer-motion";
import { ArticleHeading, renderTiptapContent, useArticleQuery } from "@/entities/article";
import { ROUTES } from "@/shared/lib/routes";
import { BackLink } from "@/shared/ui/back-link";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function HeadingSkeleton() {
  return (
    <div>
      <div className="mb-4 h-9 w-4/5 animate-pulse rounded-lg bg-[#F0EFEA]" />
      <div className="flex items-center gap-2">
        <div className="h-4 w-28 animate-pulse rounded-full bg-[#F0EFEA]" />
        <div className="h-4 w-24 animate-pulse rounded-full bg-[#F0EFEA]" />
      </div>
    </div>
  );
}

function ContentSkeleton() {
  const widths = ["100%", "95%", "88%", "100%", "70%", "100%", "92%", "60%"];
  return (
    <div className="flex flex-col gap-3">
      {widths.map((width, index) => (
        <div
          key={index}
          className="h-4 animate-pulse rounded-full bg-[#F0EFEA]"
          style={{ width }}
        />
      ))}
    </div>
  );
}

type SerbestKursuDetailViewProps = {
  slug: string;
};

export function SerbestKursuDetailView({ slug }: SerbestKursuDetailViewProps) {
  const { data: article, isLoading, isError } = useArticleQuery(slug);

  return (
    <div className="min-h-[calc(100dvh-65px)] bg-[#FBFBFA]">
      <header className="border-b border-[#EAEAEA] bg-[#FBFBFA]">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <BackLink href={ROUTES.SERBEST_KURSU.HOME} className="mb-8">
            Serbest Kürsü
          </BackLink>

          {isLoading && <HeadingSkeleton />}

          {isError && <p className="text-sm text-[#787774]">Makale bulunamadı.</p>}

          {!isLoading && !isError && article && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ArticleHeading
                title={article.title}
                authorName={article.author_name}
                dateLabel={formatDate(article.published_at)}
              />
            </motion.div>
          )}
        </div>
      </header>

      {isLoading && (
        <div className="mx-auto max-w-3xl px-6 py-10">
          <ContentSkeleton />
        </div>
      )}

      {!isLoading && !isError && article && (
        <div className="mx-auto max-w-3xl px-6 py-10">
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderTiptapContent(article.content)}
          </motion.article>
        </div>
      )}
    </div>
  );
}
