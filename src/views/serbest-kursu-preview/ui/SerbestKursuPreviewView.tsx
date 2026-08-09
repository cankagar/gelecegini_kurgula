"use client";

import { motion } from "framer-motion";
import {
  ArticleHeading,
  renderTiptapContent,
  useArticlePreview,
  type TiptapNode,
} from "@/entities/article";

export function SerbestKursuPreviewView() {
  const data = useArticlePreview();

  return (
    <div className="min-h-[calc(100dvh-65px)] bg-[#FBFBFA]">
      <header className="border-b border-[#EAEAEA] bg-[#FBFBFA]">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <p className="mb-6 inline-flex items-center rounded-full bg-[#FBF3DB] px-3 py-1 text-[0.75rem] font-medium text-[#956400]">
            Taslak önizleme — bu sayfa yayınlanmadı
          </p>

          {data && (
            <ArticleHeading title={data.title} authorName={data.authorName} dateLabel="Taslak" />
          )}
        </div>
      </header>

      {!data && (
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-sm text-[#787774]">
            Önizleme verisi bulunamadı. Düzenleme sayfasından &quot;Önizleme&quot;ye tekrar bas.
          </p>
        </div>
      )}

      {data && (
        <div className="mx-auto max-w-3xl px-6 py-10">
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderTiptapContent(data.content as TiptapNode)}
          </motion.article>
        </div>
      )}
    </div>
  );
}
