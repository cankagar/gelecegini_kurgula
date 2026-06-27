"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { HeartIcon, MessageCircleIcon } from "@/shared/ui/icons";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    name: string | null;
    username: string;
    profile: { avatarUrl: string | null } | null;
  };
}

interface Post {
  id: string;
  title: string;
  content: string;
  tags: string;
  createdAt: string;
  author: {
    name: string | null;
    username: string;
    profile: { avatarUrl: string | null } | null;
  };
  comments: Comment[];
  likeCount: number;
  isLiked: boolean;
}

const SAMPLE_POSTS: Post[] = [
  {
    id: "p-1",
    title: "Yapay Zeka Çağında Eleştirel Düşünme",
    content:
      "Yapay zekanın günlük hayatımıza hızla entegre olduğu bu dönemde, öğrencilerimize doğru bilgiyi yanlıştan ayırt etme becerisini kazandırmak her zamankinden daha önemli. Bu yazıda, sınıf içinde uygulanabilir basit ama etkili eleştirel düşünme egzersizlerini paylaşıyorum.",
    tags: "Yapay Zeka, Eğitim, Eleştirel Düşünme",
    createdAt: "2026-05-12",
    author: {
      name: "Dr. Ayşe Yılmaz",
      username: "ayseyilmaz",
      profile: { avatarUrl: null },
    },
    comments: [
      {
        id: "c-1",
        content: "Çok faydalı bir yazı olmuş, özellikle kaynak doğrulama egzersizini sınıfımda denemek istiyorum.",
        createdAt: "2026-05-13",
        author: { name: "Mehmet Kaya", username: "mehmetkaya", profile: { avatarUrl: null } },
      },
      {
        id: "c-2",
        content: "Eleştirel düşünme konusunda kaynak önerebilir misiniz?",
        createdAt: "2026-05-14",
        author: { name: "Zeynep Demir", username: "zeynepdemir", profile: { avatarUrl: null } },
      },
    ],
    likeCount: 24,
    isLiked: false,
  },
  {
    id: "p-2",
    title: "Yenilenebilir Enerji ve Geleceğin Mühendisleri",
    content:
      "Güneş ve rüzgar enerjisi teknolojilerindeki son gelişmeler, mühendislik eğitimini de dönüştürüyor. Öğrencilerin teorik bilgiyi sahadaki uygulamalarla birleştirebilmesi için proje tabanlı öğrenme yaklaşımını öneriyorum. İşte denediğim birkaç örnek proje.",
    tags: "Enerji, Mühendislik, Sürdürülebilirlik",
    createdAt: "2026-04-28",
    author: {
      name: "Prof. Can Aydın",
      username: "canaydin",
      profile: { avatarUrl: null },
    },
    comments: [
      {
        id: "c-1",
        content: "Proje tabanlı öğrenme gerçekten fark yaratıyor, teşekkürler hocam.",
        createdAt: "2026-04-29",
        author: { name: "Elif Şahin", username: "elifsahin", profile: { avatarUrl: null } },
      },
    ],
    likeCount: 41,
    isLiked: true,
  },
  {
    id: "p-3",
    title: "Kuantum Bilgisayarlar: Bir Giriş",
    content:
      "Kuantum hesaplama, klasik bilgisayarların çözmekte zorlandığı problemler için yeni kapılar aralıyor. Bu yazıda süperpozisyon ve dolanıklık kavramlarını lise seviyesinde anlaşılır bir dille açıklamaya çalıştım. Tartışmaya katılmaktan çekinmeyin!",
    tags: "Fizik, Kuantum, Teknoloji",
    createdAt: "2026-03-15",
    author: {
      name: "Dr. Selin Korkmaz",
      username: "selinkorkmaz",
      profile: { avatarUrl: null },
    },
    comments: [],
    likeCount: 17,
    isLiked: false,
  },
];

const TAG_COLORS: Record<string, string> = {
  default: "bg-[#F7F6F3] text-[#787774]",
  "Yapay Zeka": "bg-[#E1F3FE] text-[#1F6C9F]",
  Eğitim: "bg-[#EDF3EC] text-[#346538]",
  "Eleştirel Düşünme": "bg-[#FBF3DB] text-[#956400]",
  Enerji: "bg-[#EDF3EC] text-[#346538]",
  Mühendislik: "bg-[#E1F3FE] text-[#1F6C9F]",
  Sürdürülebilirlik: "bg-[#EDF3EC] text-[#346538]",
  Fizik: "bg-[#FDEBEC] text-[#9F2F2D]",
  Kuantum: "bg-[#FDEBEC] text-[#9F2F2D]",
  Teknoloji: "bg-[#E1F3FE] text-[#1F6C9F]",
};

function tagColor(tag: string): string {
  return TAG_COLORS[tag] ?? TAG_COLORS["default"];
}

function readingTime(text: string): number {
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

function getInitial(author: Post["author"]): string {
  const name = author?.name || author?.username || "?";
  return name[0].toUpperCase();
}

function avatarBg(initial: string): string {
  const palettes = [
    "bg-[#FBF3DB] text-[#956400]",
    "bg-[#E1F3FE] text-[#1F6C9F]",
    "bg-[#EDF3EC] text-[#346538]",
    "bg-[#FDEBEC] text-[#9F2F2D]",
    "bg-[#F7F6F3] text-[#787774]",
  ];
  return palettes[initial.charCodeAt(0) % palettes.length];
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const collapseVariants: Variants = {
  hidden: { opacity: 0, height: 0, overflow: "hidden" },
  visible: {
    opacity: 1,
    height: "auto",
    overflow: "hidden",
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export default function SerbestKursuPage() {
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [commentErrors, setCommentErrors] = useState<Record<string, string>>({});
  const [activeFilter, setActiveFilter] = useState<string>("Tümü");

  const allTags = [
    "Tümü",
    ...Array.from(
      new Set(posts.flatMap((p) => p.tags.split(",").map((t) => t.trim()).filter(Boolean)))
    ),
  ];

  const filtered =
    activeFilter === "Tümü"
      ? posts
      : posts.filter((p) =>
          p.tags
            .split(",")
            .map((t) => t.trim())
            .includes(activeFilter)
        );

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, isLiked: !p.isLiked, likeCount: p.isLiked ? p.likeCount - 1 : p.likeCount + 1 }
          : p
      )
    );
  };

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentSubmit = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    const text = commentInputs[postId] || "";
    setCommentErrors((prev) => ({ ...prev, [postId]: "" }));
    if (!text.trim()) {
      setCommentErrors((prev) => ({ ...prev, [postId]: "Yorum boş bırakılamaz." }));
      return;
    }
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const newComment: Comment = {
          id: `c-${p.comments.length + 1}`,
          content: text,
          createdAt: "2026-06-27",
          author: { name: "Sen", username: "siz", profile: { avatarUrl: null } },
        };
        return { ...p, comments: [...p.comments, newComment] };
      })
    );
  };

  return (
    <div className="min-h-[calc(100dvh-65px)] bg-[#FBFBFA]">
      {/* Hero header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#FBFBFA] border-b border-[#EAEAEA]"
      >
        <div className="max-w-3xl mx-auto px-6 py-12">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#787774] mb-3">
            Serbest Kürsü
          </p>
          <h1
            className="not-italic text-[2.4rem] leading-[1.1] tracking-[-0.03em] text-[#111111] mb-3"
            style={{ fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif", fontStyle: "normal" }}
          >
            Eğitmenlerden Bilim Yazıları
          </h1>
          <p className="text-[0.9rem] text-[#787774] leading-relaxed">
            Makale okuyun, fikir paylaşın, tartışmalara katılın.
          </p>
        </div>
      </motion.div>

      {/* Filter tab strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.12 }}
        className="bg-[#FBFBFA] border-b border-[#EAEAEA] sticky top-[65px] z-10"
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`cursor-pointer flex-shrink-0 px-4 py-3.5 text-[0.82rem] font-medium border-b-2 transition-all duration-150 whitespace-nowrap ${
                  activeFilter === tag
                    ? "border-[#111111] text-[#111111]"
                    : "border-transparent text-[#787774] hover:text-[#2F3437]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Feed */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <p className="text-sm text-[#787774]">Bu kategoride henüz yazı bulunmuyor.</p>
          </motion.div>
        ) : (
          <div>
            {filtered.map((post, index) => {
              const tagsArray = post.tags
                ? post.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                : [];
              const isExpanded = expandedComments[post.id] || false;
              const initial = getInitial(post.author);
              const avatarCls = avatarBg(initial);
              const mins = readingTime(post.content);

              return (
                <motion.article
                  key={post.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className={`py-9 ${index < filtered.length - 1 ? "border-b border-[#EAEAEA]" : ""}`}
                >
                  {/* Author row */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${avatarCls}`}
                    >
                      {initial}
                    </div>
                    <div className="flex items-center gap-1.5 text-[0.8rem] text-[#787774]">
                      <span className="font-medium text-[#2F3437]">
                        {post.author?.name || post.author?.username}
                      </span>
                      <span>·</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span>·</span>
                      <span>{mins} dk okuma</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-[1.3rem] font-bold leading-[1.22] tracking-[-0.025em] text-[#111111] mb-2.5 hover:text-[#787774] transition-colors duration-200 cursor-pointer"
                    style={{ fontFamily: "'Helvetica Neue', 'SF Pro Display', system-ui, sans-serif" }}
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[0.88rem] text-[#787774] leading-[1.7] line-clamp-2 mb-5">
                    {post.content}
                  </p>

                  {/* Footer: tags + actions */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5 min-w-0">
                      {tagsArray.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className={`px-2.5 py-0.5 rounded-[9999px] text-[0.67rem] font-semibold uppercase tracking-[0.06em] cursor-pointer transition-opacity duration-150 hover:opacity-75 ${tagColor(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        onClick={() => handleLike(post.id)}
                        aria-label={post.isLiked ? "Beğeniyi kaldır" : "Beğen"}
                        className={`cursor-pointer flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[0.8rem] transition-all duration-150 ${
                          post.isLiked
                            ? "text-[#9F2F2D] bg-[#FDEBEC]"
                            : "text-[#787774] hover:bg-[#F7F6F3] hover:text-[#2F3437]"
                        }`}
                      >
                        <motion.span
                          key={post.isLiked ? "liked" : "unliked"}
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                          <HeartIcon size={14} />
                        </motion.span>
                        <motion.span
                          key={post.likeCount}
                          initial={{ opacity: 0, y: -3 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.12 }}
                          className="tabular-nums"
                        >
                          {post.likeCount}
                        </motion.span>
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        onClick={() => toggleComments(post.id)}
                        aria-label="Yorumları göster"
                        className={`cursor-pointer flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[0.8rem] transition-all duration-150 ${
                          isExpanded
                            ? "text-[#1F6C9F] bg-[#E1F3FE]"
                            : "text-[#787774] hover:bg-[#F7F6F3] hover:text-[#2F3437]"
                        }`}
                      >
                        <MessageCircleIcon size={14} />
                        <span className="tabular-nums">{post.comments.length}</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Comments collapse */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="comments"
                        variants={collapseVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mt-7"
                      >
                        <div className="pl-5 border-l-2 border-[#EAEAEA]">
                          {post.comments.length === 0 ? (
                            <p className="text-sm text-[#787774] italic mb-5">
                              Henüz yorum yok. İlk yorumu siz yapın.
                            </p>
                          ) : (
                            <div className="space-y-5 mb-6">
                              {post.comments.map((comment, ci) => (
                                <motion.div
                                  key={comment.id}
                                  initial={{ opacity: 0, x: -6 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: ci * 0.05, duration: 0.25 }}
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-semibold text-[#2F3437]">
                                      {comment.author?.name || comment.author?.username}
                                    </span>
                                    <span className="text-xs text-[#787774]">
                                      {new Date(comment.createdAt).toLocaleDateString("tr-TR")}
                                    </span>
                                  </div>
                                  <p className="text-sm text-[#787774] leading-relaxed">
                                    {comment.content}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          )}

                          <form
                            onSubmit={(e) => handleCommentSubmit(e, post.id)}
                            className="flex gap-2"
                          >
                            <input
                              type="text"
                              placeholder="Fikrinizi yazın..."
                              value={commentInputs[post.id] || ""}
                              onChange={(e) =>
                                setCommentInputs((prev) => ({
                                  ...prev,
                                  [post.id]: e.target.value,
                                }))
                              }
                              className="flex-1 min-h-[40px] px-3 py-2 text-sm border border-[#EAEAEA] rounded-md bg-white text-[#2F3437] placeholder:text-[#787774] outline-none focus:border-[#111111] transition-colors duration-150"
                            />
                            <motion.button
                              whileHover={{ backgroundColor: "#333333" }}
                              whileTap={{ scale: 0.97 }}
                              type="submit"
                              className="cursor-pointer min-h-[40px] px-4 py-2 bg-[#111111] text-white text-sm font-semibold rounded-md whitespace-nowrap transition-colors duration-150"
                            >
                              Gönder
                            </motion.button>
                          </form>

                          <AnimatePresence>
                            {commentErrors[post.id] && (
                              <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-1.5 text-xs text-[#9F2F2D]"
                                role="alert"
                              >
                                {commentErrors[post.id]}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Footer stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="mt-4 pt-7 border-t border-[#EAEAEA] flex items-center gap-5 text-[0.75rem] text-[#787774]"
        >
          <span>{posts.length} makale</span>
          <span>·</span>
          <span>{posts.reduce((s, p) => s + p.likeCount, 0)} beğeni</span>
          <span>·</span>
          <span>{posts.reduce((s, p) => s + p.comments.length, 0)} yorum</span>
        </motion.div>
      </div>
    </div>
  );
}
