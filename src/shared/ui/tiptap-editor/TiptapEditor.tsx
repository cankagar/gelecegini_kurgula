"use client";

import type { ReactNode } from "react";
import { EditorContent, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Heading2, Heading3, Italic, List, ListOrdered } from "lucide-react";

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
  "[&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:text-[1.3rem] [&_h2]:font-bold " +
  "[&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-[1.1rem] [&_h3]:font-bold " +
  "[&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6";

export function TiptapEditor({ content, onChange, editable = true }: TiptapEditorProps) {
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
        <div className="flex items-center gap-1 border-b border-border px-3 py-2">
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
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
