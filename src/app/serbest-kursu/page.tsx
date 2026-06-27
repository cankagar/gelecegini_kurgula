"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  StarIcon,
  PenIcon,
  RocketIcon,
  TrophyIcon,
  BookIcon,
  CheckCircleIcon,
  FileTextIcon,
  HeartIcon,
  MessageCircleIcon,
  MegaphoneIcon,
} from "@/shared/ui/icons";

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

function readingTime(text: string): number {
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

function getInitial(author: Post["author"]): string {
  const name = author?.name || author?.username || "?";
  return name[0].toUpperCase();
}

function avatarColor(initial: string): string {
  const colors = [
    "bg-amber-100 text-amber-700",
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
    "bg-violet-100 text-violet-700",
    "bg-rose-100 text-rose-700",
  ];
  return colors[initial.charCodeAt(0) % colors.length];
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: "easeOut" },
  }),
};

const collapseVariants: Variants = {
  hidden: { opacity: 0, height: 0, overflow: "hidden" },
  visible: { opacity: 1, height: "auto", overflow: "hidden", transition: { duration: 0.28, ease: "easeOut" } },
  exit: { opacity: 0, height: 0, overflow: "hidden", transition: { duration: 0.2, ease: "easeIn" } },
};

export default function SerbestKursuPage() {
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [commentErrors, setCommentErrors] = useState<Record<string, string>>({});
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");
  const [editorStatus, setEditorStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const isTeacher = true;
  const isVerifiedCreator = true;

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
          createdAt: "2026-01-01",
          author: { name: "Sen", username: "siz", profile: { avatarUrl: null } },
        };
        return { ...p, comments: [...p.comments, newComment] };
      })
    );
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditorStatus(null);
    if (!newTitle.trim() || !newContent.trim()) {
      setEditorStatus({ success: false, message: "Başlık ve içerik girmek zorunludur." });
      return;
    }
    setEditorStatus({ success: true, message: "Yazınız başarıyla paylaşıldı!" });
    setNewTitle("");
    setNewContent("");
    setNewTags("");
  };

  return (
    <div className="min-h-[calc(100dvh-65px)] bg-white">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="border-b border-[var(--color-border)] bg-white"
      >
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-[var(--color-text)] tracking-tight mb-1">
            Serbest Kürsü
          </h1>
          <p className="text-[var(--color-text-muted)] text-base">
            Eğitmenlerimizin paylaştığı makaleleri okuyun, yorum yapın ve bilimsel tartışmalara katılın.
          </p>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Creator status banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
          className="mb-8"
        >
          {!isVerifiedCreator ? (
            <div className="rounded-xl border border-[var(--color-primary-border)] bg-[var(--color-primary-tint)] p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                  <StarIcon size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[var(--color-text)] mb-0.5">Yazar Olmak İster misin?</p>
                  <p className="text-sm text-[var(--color-text-muted)] mb-3">
                    Bilimsel makaleler ve eğitici içerikler paylaşarak topluluğa katkı sağlayabilirsin.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {[
                      { icon: <PenIcon size={14} />, label: "Kendi makalelerini yayınla" },
                      { icon: <RocketIcon size={14} />, label: "Bilim topluluğuna katkıda bulun" },
                      { icon: <TrophyIcon size={14} />, label: "Özel rozetler kazan" },
                      { icon: <BookIcon size={14} />, label: "İçerik üreticileri arasına katıl" },
                    ].map((item, i) => (
                      <span key={i} className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
                        <span className="text-[var(--color-primary)]">{item.icon}</span>
                        {item.label}
                      </span>
                    ))}
                  </div>
                  <Link href="/icerik-uretici-basvuru">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="cursor-pointer px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-lg"
                    >
                      Başvuru Yap
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-primary-tint)] px-5 py-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircleIcon size={16} className="text-[var(--color-success)]" />
                <span className="font-medium text-[var(--color-text)]">Doğrulanmış İçerik Üreticisisin</span>
                <span className="text-[var(--color-text-muted)] hidden sm:inline">
                  — bilimsel içerikler paylaşmaya başlayabilirsin.
                </span>
              </div>
              <Link href="/posts/create">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="cursor-pointer flex items-center gap-1.5 px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-lg whitespace-nowrap"
                >
                  <PenIcon size={14} />
                  Yeni Makale
                </motion.button>
              </Link>
            </div>
          )}
        </motion.div>

        {/* Main layout */}
        <div className="flex gap-10 items-start">
          {/* Feed */}
          <main className="flex-1 min-w-0">
            {posts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[var(--color-primary-tint)] flex items-center justify-center mb-4 text-[var(--color-primary)]">
                  <FileTextIcon size={24} />
                </div>
                <h2 className="text-lg font-semibold text-[var(--color-text)] mb-1">Henüz Paylaşım Yok</h2>
                <p className="text-sm text-[var(--color-text-muted)] max-w-xs">
                  Eğitmenlerimizin ilk gönderiyi yapmasını bekleyin.
                </p>
              </motion.div>
            ) : (
              <div className="divide-y divide-[var(--color-border)]">
                {posts.map((post, index) => {
                  const tagsArray = post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
                  const isExpanded = expandedComments[post.id] || false;
                  const initial = getInitial(post.author);
                  const avatarCls = avatarColor(initial);
                  const mins = readingTime(post.content);

                  return (
                    <motion.article
                      key={post.id}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      className="py-8 group"
                    >
                      {/* Author row */}
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${avatarCls}`}>
                          {initial}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
                          <span className="font-medium text-[var(--color-text)]">
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
                      <h2 className="text-xl font-bold text-[var(--color-text)] leading-snug mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-200 cursor-pointer">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-[var(--color-text-muted)] leading-relaxed text-sm line-clamp-3 mb-4">
                        {post.content}
                      </p>

                      {/* Tags */}
                      {tagsArray.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tagsArray.map((tag, i) => (
                            <motion.span
                              key={i}
                              whileHover={{ scale: 1.05 }}
                              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer transition-colors duration-150"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleLike(post.id)}
                          aria-label={post.isLiked ? "Beğeniyi kaldır" : "Beğen"}
                          className={`cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            post.isLiked
                              ? "text-rose-500 bg-rose-50 hover:bg-rose-100"
                              : "text-[var(--color-text-muted)] hover:bg-gray-100 hover:text-[var(--color-text)]"
                          }`}
                        >
                          <motion.span
                            key={post.isLiked ? "liked" : "unliked"}
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          >
                            <HeartIcon size={15} />
                          </motion.span>
                          <motion.span
                            key={post.likeCount}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            {post.likeCount}
                          </motion.span>
                        </motion.button>

                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleComments(post.id)}
                          aria-label="Yorumları göster"
                          className="cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-[var(--color-text-muted)] hover:bg-gray-100 hover:text-[var(--color-text)] transition-all duration-150"
                        >
                          <MessageCircleIcon size={15} />
                          <span>{post.comments.length}</span>
                        </motion.button>
                      </div>

                      {/* Comments (animated collapse) */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            key="comments"
                            variants={collapseVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="mt-6 pl-4 border-l-2 border-[var(--color-border)]"
                          >
                            {post.comments.length === 0 ? (
                              <p className="text-sm text-[var(--color-text-muted)] italic mb-4">
                                Henüz yorum yok. Tartışmayı başlatan ilk siz olun.
                              </p>
                            ) : (
                              <div className="space-y-4 mb-5">
                                {post.comments.map((comment, ci) => (
                                  <motion.div
                                    key={comment.id}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: ci * 0.05, duration: 0.25 }}
                                  >
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-sm font-semibold text-[var(--color-text)]">
                                        {comment.author?.name || comment.author?.username}
                                      </span>
                                      <span className="text-xs text-[var(--color-text-muted)]">
                                        {new Date(comment.createdAt).toLocaleDateString("tr-TR")}
                                      </span>
                                    </div>
                                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                                      {comment.content}
                                    </p>
                                  </motion.div>
                                ))}
                              </div>
                            )}

                            <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Fikrinizi yazın..."
                                value={commentInputs[post.id] || ""}
                                onChange={(e) =>
                                  setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                                }
                                className="flex-1 min-h-[44px] px-3 py-2 text-sm border border-[var(--color-border)] rounded-lg bg-white text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-primary)] transition-colors duration-150"
                              />
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.96 }}
                                type="submit"
                                className="cursor-pointer min-h-[44px] px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-lg whitespace-nowrap"
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
                                  className="mt-1.5 text-xs text-[var(--color-danger)]"
                                  role="alert"
                                >
                                  {commentErrors[post.id]}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </main>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="w-72 flex-shrink-0 hidden lg:block"
          >
            <div className="sticky top-[85px] space-y-4">
              {isTeacher ? (
                <div className="rounded-xl border border-[var(--color-border)] bg-white p-5">
                  <h2 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-4 pb-3 border-b border-[var(--color-border)]">
                    <PenIcon size={15} className="text-[var(--color-primary)]" />
                    Yeni Paylaşım
                  </h2>

                  <AnimatePresence>
                    {editorStatus && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22 }}
                        role="alert"
                        className={`mb-3 px-3 py-2.5 rounded-lg text-sm overflow-hidden ${
                          editorStatus.success
                            ? "bg-[var(--color-success-bg)] text-[var(--color-success)]"
                            : "bg-[var(--color-danger-bg)] text-[var(--color-danger)]"
                        }`}
                      >
                        {editorStatus.message}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handlePostSubmit} className="space-y-3">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="postTitle" className="text-xs font-medium text-[var(--color-text)]">
                        Başlık <span className="text-[var(--color-danger)]">*</span>
                      </label>
                      <input
                        id="postTitle"
                        type="text"
                        placeholder="Gönderi başlığı..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="min-h-[44px] px-3 py-2 text-sm border border-[var(--color-border)] rounded-lg bg-white text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-primary)] transition-colors duration-150"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="postContent" className="text-xs font-medium text-[var(--color-text)]">
                        İçerik <span className="text-[var(--color-danger)]">*</span>
                      </label>
                      <textarea
                        id="postContent"
                        rows={5}
                        placeholder="Makale veya tartışma konusu..."
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="px-3 py-2 text-sm border border-[var(--color-border)] rounded-lg bg-white text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-primary)] transition-colors duration-150 resize-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="postTags" className="text-xs font-medium text-[var(--color-text)]">
                        Etiketler
                      </label>
                      <input
                        id="postTags"
                        type="text"
                        placeholder="Yapay Zeka, Fizik..."
                        value={newTags}
                        onChange={(e) => setNewTags(e.target.value)}
                        className="min-h-[44px] px-3 py-2 text-sm border border-[var(--color-border)] rounded-lg bg-white text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-primary)] transition-colors duration-150"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="cursor-pointer w-full min-h-[44px] py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-lg"
                    >
                      Kürsüde Paylaş
                    </motion.button>
                  </form>
                </div>
              ) : (
                <div className="rounded-xl border border-[var(--color-border)] bg-white p-5">
                  <h2 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] mb-3 pb-3 border-b border-[var(--color-border)]">
                    <MegaphoneIcon size={15} className="text-[var(--color-primary)]" />
                    Serbest Kürsü Nedir?
                  </h2>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    Öğretmenlerimizin bilim, teknoloji ve mühendislik alanında makale kesitleri paylaştığı,
                    güncel gelişmeleri tartıştığı açık bir bilim panosudur.
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mt-3">
                    Tüm platform üyeleri gönderilerin altında fikirlerini paylaşabilir ve topluluk
                    tartışmalarına katılabilir.
                  </p>
                </div>
              )}

              {/* Stats card */}
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-primary-tint)] p-5">
                <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-3">
                  Bu Ay
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Makale", value: posts.length },
                    { label: "Toplam Beğeni", value: posts.reduce((s, p) => s + p.likeCount, 0) },
                    { label: "Yorum", value: posts.reduce((s, p) => s + p.comments.length, 0) },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-[var(--color-text-muted)]">{stat.label}</span>
                      <span className="text-sm font-semibold text-[var(--color-text)]">{stat.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
