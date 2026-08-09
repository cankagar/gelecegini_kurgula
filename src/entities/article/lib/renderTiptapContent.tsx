import { Fragment, type ReactNode } from "react";
import type { TiptapMark, TiptapNode } from "@/entities/article/model/types";

function applyMarks(text: string, marks: TiptapMark[] | undefined): ReactNode {
  return (marks ?? []).reduce<ReactNode>((node, mark) => {
    if (mark.type === "bold") return <strong>{node}</strong>;
    if (mark.type === "italic") return <em>{node}</em>;
    return node;
  }, text);
}

const HEADING_CLASS =
  "mt-8 mb-3 font-bold text-[#111111] tracking-[-0.02em] leading-[1.3]";

function renderNode(node: TiptapNode, key: number): ReactNode {
  const children = node.content?.map((child, i) => renderNode(child, i));

  switch (node.type) {
    case "text":
      return <Fragment key={key}>{applyMarks(node.text ?? "", node.marks)}</Fragment>;
    case "paragraph":
      return (
        <p key={key} className="mb-5 text-[0.95rem] leading-[1.8] text-[#2F3437]">
          {children}
        </p>
      );
    case "heading": {
      const level = Math.min(Math.max(Number(node.attrs?.level) || 2, 1), 4);
      if (level === 1) return <h1 key={key} className={`text-[1.6rem] ${HEADING_CLASS}`}>{children}</h1>;
      if (level === 2) return <h2 key={key} className={`text-[1.35rem] ${HEADING_CLASS}`}>{children}</h2>;
      if (level === 3) return <h3 key={key} className={`text-[1.15rem] ${HEADING_CLASS}`}>{children}</h3>;
      return <h4 key={key} className={`text-[1rem] ${HEADING_CLASS}`}>{children}</h4>;
    }
    case "bulletList":
      return (
        <ul key={key} className="mb-5 list-disc space-y-1.5 pl-6">
          {children}
        </ul>
      );
    case "orderedList":
      return (
        <ol key={key} className="mb-5 list-decimal space-y-1.5 pl-6">
          {children}
        </ol>
      );
    case "listItem":
      return (
        <li key={key} className="text-[0.95rem] leading-[1.7] text-[#2F3437]">
          {children}
        </li>
      );
    default:
      return <Fragment key={key}>{children}</Fragment>;
  }
}

export function renderTiptapContent(doc: TiptapNode): ReactNode {
  return doc.content?.map((node, i) => renderNode(node, i));
}
