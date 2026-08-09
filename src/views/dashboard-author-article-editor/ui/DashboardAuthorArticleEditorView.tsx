"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { JSONContent } from "@tiptap/react";
import {
  useArticleMutations,
  useCreateArticleMutation,
  useMyArticleQuery,
  writeArticlePreview,
} from "@/entities/article";
import { useCurrentUser } from "@/entities/user";
import { formatFullName } from "@/shared/lib";
import { ROUTES } from "@/shared/lib/routes";
import { BackLink } from "@/shared/ui/back-link";
import { SpinnerIcon } from "@/shared/ui/icons";
import { Modal, ModalDescription, ModalFooter, ModalTitle } from "@/shared/ui/modal";
import { TiptapEditor } from "@/shared/ui/tiptap-editor";

const EMPTY_CONTENT: JSONContent = { type: "doc", content: [{ type: "paragraph" }] };

type ConfirmAction = "delete" | "unpublish" | null;

type ArticleEditorFormProps = {
  articleId?: string;
  initialTitle: string;
  initialContent: JSONContent;
  publishedAt?: string | null;
};

// Sadece verisi hazır olduktan sonra mount edilir (bkz. dış component) — bu
// sayede fetch edilen veriyi local state'e aktarmak için bir `useEffect`e
// gerek yok, `useState` initializer'ı yeterli.
function ArticleEditorForm({
  articleId,
  initialTitle,
  initialContent,
  publishedAt,
}: ArticleEditorFormProps) {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const isEditMode = Boolean(articleId);

  const createArticle = useCreateArticleMutation();
  const { update, publish, unpublish, remove } = useArticleMutations(articleId ?? "");

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  // Son kaydedilen değerler — "Kaydet" butonunun sadece gerçek bir değişiklik
  // varken aktif olması için title/content'i bunlarla karşılaştırıyoruz.
  const [savedTitle, setSavedTitle] = useState(initialTitle);
  const [savedContent, setSavedContent] = useState(initialContent);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const isDirty = title !== savedTitle || JSON.stringify(content) !== JSON.stringify(savedContent);

  async function handleSave() {
    const trimmed = title.trim();
    if (!trimmed) return;

    try {
      if (isEditMode) {
        await update.mutateAsync({ title: trimmed, content });
      } else {
        const created = await createArticle.mutateAsync({ title: trimmed, content });
        router.replace(ROUTES.AUTHOR.ARTICLE_EDIT(created.id));
      }
      setSavedTitle(trimmed);
      setSavedContent(content);
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
  }

  function handlePreview() {
    writeArticlePreview({
      title: title.trim() || "Başlıksız",
      content,
      authorName: formatFullName(currentUser, currentUser.email ?? "İsimsiz Kullanıcı"),
    });
    window.open(ROUTES.SERBEST_KURSU.PREVIEW, "_blank");
  }

  async function handlePublish() {
    try {
      await publish.mutateAsync();
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
  }

  async function confirmUnpublish() {
    try {
      await unpublish.mutateAsync();
      setConfirmAction(null);
    } catch {
      // hata mesajı mutation state'inden okunuyor, modal açık kalır
    }
  }

  async function confirmDelete() {
    try {
      await remove.mutateAsync();
      router.push(ROUTES.AUTHOR.HOME);
    } catch {
      // hata mesajı mutation state'inden okunuyor, modal açık kalır
    }
  }

  const saving = update.isPending || createArticle.isPending;

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2.5">
          {isEditMode && (
            <span
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.8rem] font-semibold ${
                publishedAt ? "bg-success-bg text-success" : "bg-bg-alt text-text-muted"
              }`}
            >
              {publishedAt && <span className="h-1.5 w-1.5 rounded-full bg-success" />}
              {publishedAt ? "Yayında" : "Taslak"}
            </span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {isEditMode && (
            <>
              <button
                onClick={publishedAt ? () => setConfirmAction("unpublish") : handlePublish}
                disabled={publish.isPending || unpublish.isPending}
                className="rounded-full border border-border px-3.5 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-text hover:bg-text hover:text-cta-text disabled:opacity-50"
              >
                {publishedAt ? "Yayından Kaldır" : "Yayınla"}
              </button>
              <button
                onClick={() => setConfirmAction("delete")}
                disabled={remove.isPending}
                className="rounded-md border border-border px-3 py-1.5 text-[0.8rem] font-medium text-danger transition-colors duration-150 hover:bg-danger-bg disabled:opacity-50"
              >
                Sil
              </button>
            </>
          )}
          <button
            onClick={handlePreview}
            className="rounded-full border border-border px-3.5 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-text hover:bg-text hover:text-cta-text"
          >
            Önizleme
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !title.trim() || !isDirty}
            className="rounded-md bg-primary px-3.5 py-1.5 text-[0.8rem] font-semibold text-cta-text transition-colors duration-150 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-surface/50 px-6 py-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Başlık"
          className="w-full bg-transparent text-[1.5rem] font-bold text-text tracking-[-0.02em] placeholder:text-text-muted focus:outline-none"
        />
      </div>

      {(update.isError || createArticle.isError) && (
        <p className="text-[0.8rem] text-danger">Kaydedilemedi. Lütfen tekrar dene.</p>
      )}

      <TiptapEditor content={content} onChange={setContent} />

      <Modal
        open={confirmAction !== null}
        onClose={() => setConfirmAction(null)}
        ariaLabel={confirmAction === "delete" ? "Yazıyı sil" : "Yayından kaldır"}
      >
        <ModalTitle>{confirmAction === "delete" ? "Yazıyı sil" : "Yayından kaldır"}</ModalTitle>
        <ModalDescription>
          {confirmAction === "delete"
            ? "Bu yazıyı silmek istediğine emin misin? Bu işlem geri alınamaz."
            : "Bu yazıyı yayından kaldırmak istediğine emin misin? Okuyucular artık göremeyecek."}
        </ModalDescription>
        <ModalFooter>
          <button
            onClick={() => setConfirmAction(null)}
            className="rounded-full border border-border px-3.5 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-text hover:bg-text hover:text-cta-text"
          >
            Vazgeç
          </button>
          <button
            onClick={confirmAction === "delete" ? confirmDelete : confirmUnpublish}
            disabled={remove.isPending || unpublish.isPending}
            className="rounded-full bg-danger px-3.5 py-1.5 text-[0.8rem] font-medium text-cta-text transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
          >
            {confirmAction === "delete"
              ? remove.isPending
                ? "Siliniyor..."
                : "Sil"
              : unpublish.isPending
                ? "Kaldırılıyor..."
                : "Yayından Kaldır"}
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

type DashboardAuthorArticleEditorViewProps = {
  articleId?: string;
};

export function DashboardAuthorArticleEditorView({
  articleId,
}: DashboardAuthorArticleEditorViewProps) {
  const isEditMode = Boolean(articleId);
  const { data: article, isLoading, isError } = useMyArticleQuery(articleId ?? "");

  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <BackLink href={ROUTES.AUTHOR.HOME}>Yazılarım</BackLink>

      {isEditMode && isLoading && (
        <div className="mt-8 flex justify-center text-text-muted">
          <SpinnerIcon className="animate-spin" size={20} />
        </div>
      )}

      {isEditMode && isError && (
        <p className="mt-8 text-[0.9rem] text-text-muted">Yazı yüklenemedi.</p>
      )}

      {isEditMode && article && (
        <ArticleEditorForm
          articleId={article.id}
          initialTitle={article.title}
          initialContent={article.content}
          publishedAt={article.published_at}
        />
      )}

      {!isEditMode && <ArticleEditorForm initialTitle="" initialContent={EMPTY_CONTENT} />}
    </div>
  );
}
