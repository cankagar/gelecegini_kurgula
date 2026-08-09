type ArticleHeadingProps = {
  title: string;
  authorName: string | null;
  dateLabel: string;
};

// Public makale sayfası (SerbestKursuDetailView) ve author önizlemesinde
// aynı görünüm — tek yerden değişsin diye çıkarıldı.
export function ArticleHeading({ title, authorName, dateLabel }: ArticleHeadingProps) {
  return (
    <div>
      <h1
        className="not-italic mb-4 text-[2rem] leading-[1.15] tracking-[-0.03em] text-[#111111]"
        style={{ fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif", fontStyle: "normal" }}
      >
        {title || "Başlıksız"}
      </h1>
      <div className="flex items-center gap-1.5 text-[0.85rem] text-[#787774]">
        <span className="font-medium text-[#2F3437]">{authorName ?? "Bilinmeyen yazar"}</span>
        <span>·</span>
        <span>{dateLabel}</span>
      </div>
    </div>
  );
}
