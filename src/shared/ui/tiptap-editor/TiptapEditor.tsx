"use client";

import { useEffect, useState, type ReactNode } from "react";
import { EditorContent, useEditor, type Editor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  SquareCode,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo,
} from "lucide-react";
import { Modal, ModalFooter, ModalTitle } from "@/shared/ui/modal";

type TiptapEditorProps = {
  content: JSONContent;
  onChange: (content: JSONContent) => void;
  editable?: boolean;
};

type ToolbarButtonProps = {
  active: boolean;
  onClick: () => void;
  label: string;
  children: ReactNode;
};

function ToolbarButton({ active, onClick, label, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-150 ${
        active ? "bg-text text-white" : "text-text-muted hover:bg-surface hover:text-text"
      }`}
    >
      {children}
    </button>
  );
}

const EDITOR_CONTENT_CLASS =
  "min-h-[320px] px-4 py-3 text-[0.95rem] leading-[1.8] text-text focus:outline-none " +
  "[&_h1]:mb-3 [&_h1]:mt-6 [&_h1]:text-[1.6rem] [&_h1]:font-bold " +
  "[&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:text-[1.3rem] [&_h2]:font-bold " +
  "[&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-[1.1rem] [&_h3]:font-bold " +
  "[&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 " +
  "[&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-text-muted " +
  "[&_code]:rounded [&_code]:bg-bg-alt [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.85em] " +
  "[&_pre]:mb-3 [&_pre]:rounded-lg [&_pre]:bg-bg-alt [&_pre]:px-4 [&_pre]:py-3 [&_pre_code]:bg-transparent " +
  "[&_a]:text-primary [&_a]:underline [&_hr]:my-6 [&_hr]:border-border";

type LinkModalProps = {
  editor: Editor;
  open: boolean;
  onClose: () => void;
};

function LinkModal({ editor, open, onClose }: LinkModalProps) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (open) setUrl((editor.getAttributes("link").href as string | undefined) ?? "");
  }, [open, editor]);

  function handleSubmit() {
    const trimmed = url.trim();
    if (!trimmed) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      const href = /^[a-z][a-z0-9+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`;
      editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    onClose();
  }

  function handleRemove() {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} ariaLabel="Bağlantı ekle">
      <ModalTitle>Bağlantı</ModalTitle>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="https://"
        autoFocus
        className="mt-4 w-full rounded-md border border-border bg-transparent px-3 py-2 text-[0.9rem] text-text placeholder:text-text-muted focus:outline-none"
      />
      <ModalFooter>
        {editor.isActive("link") && (
          <button
            onClick={handleRemove}
            className="rounded-full border border-border px-3.5 py-1.5 text-[0.8rem] font-medium text-danger transition-colors duration-150 hover:bg-danger-bg"
          >
            Sil
          </button>
        )}
        <button
          onClick={onClose}
          className="rounded-full border border-border px-3.5 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-text hover:bg-text hover:text-cta-text"
        >
          Vazgeç
        </button>
        <button
          onClick={handleSubmit}
          className="rounded-full bg-primary px-3.5 py-1.5 text-[0.8rem] font-semibold text-cta-text transition-colors duration-150 hover:bg-primary-hover"
        >
          Kaydet
        </button>
      </ModalFooter>
    </Modal>
  );
}

export function TiptapEditor({ content, onChange, editable = true }: TiptapEditorProps) {
  const [linkModalOpen, setLinkModalOpen] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    editorProps: {
      attributes: { class: EDITOR_CONTENT_CLASS },
    },
  });

  if (!editor) return null;

  return (
    <div className="rounded-2xl bg-surface/50">
      {editable && (
        <div className="flex flex-wrap items-center gap-1 border-b border-border px-3 py-2">
          <ToolbarButton
            label="Kalın"
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold size={16} />
          </ToolbarButton>
          <ToolbarButton
            label="İtalik"
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic size={16} />
          </ToolbarButton>
          <ToolbarButton
            label="Altı çizili"
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon size={16} />
          </ToolbarButton>
          <ToolbarButton
            label="Üstü çizili"
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough size={16} />
          </ToolbarButton>
          <ToolbarButton
            label="Başlık 1"
            active={editor.isActive("heading", { level: 1 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <Heading1 size={16} />
          </ToolbarButton>
          <ToolbarButton
            label="Başlık 2"
            active={editor.isActive("heading", { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 size={16} />
          </ToolbarButton>
          <ToolbarButton
            label="Başlık 3"
            active={editor.isActive("heading", { level: 3 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <Heading3 size={16} />
          </ToolbarButton>
          <ToolbarButton
            label="Madde işaretli liste"
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List size={16} />
          </ToolbarButton>
          <ToolbarButton
            label="Numaralı liste"
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={16} />
          </ToolbarButton>
          <ToolbarButton
            label="Alıntı"
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote size={16} />
          </ToolbarButton>
          <ToolbarButton
            label="Satır içi kod"
            active={editor.isActive("code")}
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            <Code size={16} />
          </ToolbarButton>
          <ToolbarButton
            label="Kod bloğu"
            active={editor.isActive("codeBlock")}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <SquareCode size={16} />
          </ToolbarButton>
          <ToolbarButton
            label="Bağlantı"
            active={editor.isActive("link")}
            onClick={() => setLinkModalOpen(true)}
          >
            <LinkIcon size={16} />
          </ToolbarButton>
          <ToolbarButton
            label="Ayırıcı çizgi"
            active={false}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Minus size={16} />
          </ToolbarButton>
          <ToolbarButton label="Geri al" active={false} onClick={() => editor.chain().focus().undo().run()}>
            <Undo size={16} />
          </ToolbarButton>
          <ToolbarButton label="Yinele" active={false} onClick={() => editor.chain().focus().redo().run()}>
            <Redo size={16} />
          </ToolbarButton>
        </div>
      )}
      <EditorContent editor={editor} />
      <LinkModal editor={editor} open={linkModalOpen} onClose={() => setLinkModalOpen(false)} />
    </div>
  );
}
