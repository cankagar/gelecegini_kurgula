"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "./serbest-kursu.module.css";
import Link from "next/link";
import {
  StarIcon,
  PenIcon,
  RocketIcon,
  TrophyIcon,
  BookIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertTriangleIcon,
  FileTextIcon,
  HeartIcon,
  MessageCircleIcon,
  MegaphoneIcon,
} from "@/components/icons";

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

export default function SerbestKursuPage() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Expanded comments tracker
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  // Comment inputs tracker
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [commentErrors, setCommentErrors] = useState<Record<string, string>>({});

  // Editor State for Teachers
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");
  const [editorStatus, setEditorStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Fetch Forum Posts
  const fetchPosts = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/posts");
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gönderiler yüklenemedi.");
      setPosts(result.data);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [status]);

  // Handle Like Toggle
  const handleLike = async (postId: string) => {
    if (status !== "authenticated") {
      alert("Gönderileri beğenmek için giriş yapmalısınız.");
      return;
    }

    try {
      const res = await fetch(`/api/posts/${postId}`, { method: "PUT" });
      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      // Update state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, isLiked: result.data.liked, likeCount: result.data.likeCount }
            : post
        )
      );
    } catch (err: any) {
      console.error("Like error:", err.message);
    }
  };

  // Toggle Comment Section View
  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Handle Comment Submit
  const handleCommentSubmit = async (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    const commentText = commentInputs[postId] || "";
    setCommentErrors((prev) => ({ ...prev, [postId]: "" }));

    if (!commentText.trim()) {
      setCommentErrors((prev) => ({ ...prev, [postId]: "Yorum boş bırakılamaz." }));
      return;
    }

    if (status !== "authenticated") {
      alert("Yorum yapabilmek için giriş yapmalısınız.");
      return;
    }

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentText }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      // Reset input
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));

      // Append new comment to post
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...post.comments, result.data],
            };
          }
          return post;
        })
      );
    } catch (err: any) {
      setCommentErrors((prev) => ({ ...prev, [postId]: err.message }));
    }
  };

  // Handle Post Submit (Teacher Form)
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditorStatus(null);

    if (!newTitle.trim() || !newContent.trim()) {
      setEditorStatus({ success: false, message: "Başlık ve içerik girmek zorunludur." });
      return;
    }

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          tags: newTags,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      setEditorStatus({ success: true, message: "Yazınız başarıyla paylaşıldı!" });
      setNewTitle("");
      setNewContent("");
      setNewTags("");

      // Reload posts
      fetchPosts();
    } catch (err: any) {
      setEditorStatus({ success: false, message: err.message });
    }
  };

  const isTeacher = session?.user && ((session.user as any).role === "TEACHER" || (session.user as any).role === "ADMIN");
  const role = (session?.user as any)?.role;
  const isVerifiedCreator = role === "VERIFIED_CONTENT_CREATOR";

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Serbest Kürsü</h1>
        <p>Eğitmenlerimizin paylaştığı makaleleri okuyun, yorum yapın ve bilimsel tartışmalara katılın.</p>
      </header>

      {/* Promotional Card */}
      {!isVerifiedCreator ? (
        <div className={styles.promoCard}>
          <h2 className={styles.promoTitle}><StarIcon size={20} /> Doğrulanmış İçerik Üreticisi</h2>
          <p className={styles.promoText}>Yazar Olmak İster misin?</p>
          <p className={styles.promoText}>Bilimsel makaleler, teknoloji haberleri ve eğitici içerikler paylaşarak topluluğa katkı sağlayabilirsin.</p>
          <ul className={styles.promoList}>
            <li><PenIcon size={18} /> Kendi makalelerini yayınla</li>
            <li><RocketIcon size={18} /> Bilim topluluğuna katkıda bulun</li>
            <li><TrophyIcon size={18} /> Özel rozetler ve ayrıcalıklar kazan</li>
            <li><BookIcon size={18} /> Bilimsel içerik üreticileri arasına katıl</li>
          </ul>
          <Link href="/icerik-uretici-basvuru">
            <button className={styles.promoButton}>Başvuru Yap</button>
          </Link>
        </div>
      ) : (
        <div className={styles.verifiedMessage}>
          <p className={styles.verifiedText}><CheckCircleIcon size={18} /> Doğrulanmış İçerik Üreticisisin</p>
          <p className={styles.verifiedText}>Bilimsel içerikler paylaşmaya başlayabilirsin.</p>
          <Link href="/posts/create">
            <button className={styles.promoButton}>Yeni Makale Oluştur</button>
          </Link>
        </div>
      )}

      <div className={styles.layout}>
        <main>
          {isLoading ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}><ClockIcon size={28} /></div>
              <p>Gönderiler yükleniyor...</p>
            </div>
          ) : errorMsg ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}><AlertTriangleIcon size={28} /></div>
              <h2>Bir Hata Oluştu</h2>
              <p>{errorMsg}</p>
              <button onClick={fetchPosts} className={styles.commentSubmitBtn} style={{ marginTop: '1rem' }}>Tekrar Dene</button>
            </div>
          ) : posts.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}><FileTextIcon size={28} /></div>
              <h2>Henüz Paylaşım Yok</h2>
              <p>Burada henüz hiçbir yazı paylaşılmamış. Eğitmenlerimizin ilk gönderiyi yapmasını bekleyin!</p>
            </div>
          ) : (
            <div className={styles.postList}>
              {posts.map((post) => {
                const tagsArray = post.tags ? post.tags.split(",").map(t => t.trim()).filter(Boolean) : [];
                const isExpanded = expandedComments[post.id] || false;
                const authorInitial = post.author?.name ? post.author.name[0].toUpperCase() : (post.author?.username ? post.author.username[0].toUpperCase() : "?");

                return (
                  <article key={post.id} className={styles.postCard}>
                    <div className={styles.postHeader}>
                      <div className={styles.authorInfo}>
                        <div className={styles.avatar}>{authorInitial}</div>
                        <div className={styles.authorMeta}>
                          <h3>{post.author?.name || post.author?.username}</h3>
                          <p>Eğitmen & Yazar</p>
                        </div>
                      </div>
                      <span className={styles.postDate}>{new Date(post.createdAt).toLocaleDateString("tr-TR")}</span>
                    </div>

                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <p className={styles.postContent}>{post.content}</p>

                    {tagsArray.length > 0 && (
                      <div className={styles.tags}>
                        {tagsArray.map((tag, idx) => (
                          <span key={idx} className={styles.tag}>#{tag}</span>
                        ))}
                      </div>
                    )}

                    <div className={styles.postActions}>
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`${styles.actionBtn} ${post.isLiked ? styles.liked : ""}`}
                      >
                        <HeartIcon size={16} /> {post.isLiked ? "Beğendin" : "Beğen"} ({post.likeCount})
                      </button>
                      <button
                        onClick={() => toggleComments(post.id)}
                        className={styles.actionBtn}
                      >
                        <MessageCircleIcon size={16} /> Tartışma ({post.comments.length})
                      </button>
                    </div>

                    {isExpanded && (
                      <div className={styles.commentsContainer}>
                        <div className={styles.commentList}>
                          {post.comments.length === 0 ? (
                            <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", fontStyle: "italic" }}>
                              Henüz yorum yapılmamış. Tartışmayı başlatan ilk siz olun!
                            </p>
                          ) : (
                            post.comments.map((comment) => {
                              return (
                                <div key={comment.id} className={styles.commentItem}>
                                  <div className={styles.commentHeader}>
                                    <span className={styles.commentAuthor}>{comment.author?.name || comment.author?.username}</span>
                                    <span className={styles.commentDate}>
                                      {new Date(comment.createdAt).toLocaleDateString("tr-TR")}
                                    </span>
                                  </div>
                                  <p className={styles.commentContent}>{comment.content}</p>
                                </div>
                              );
                            })
                          )}
                        </div>

                        {status === "authenticated" ? (
                          <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className={styles.commentForm}>
                            <input
                              type="text"
                              placeholder="Fikrinizi veya yorumunuzu yazın..."
                              className={styles.commentInput}
                              value={commentInputs[post.id] || ""}
                              onChange={(e) =>
                                setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                              }
                            />
                            <button type="submit" className={styles.commentSubmitBtn}>
                              Yorum Yap
                            </button>
                          </form>
                        ) : (
                          <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
                            Yorum yazmak veya tartışmaya katılmak için lütfen{" "}
                            <Link href="/login" style={{ color: "var(--color-primary)", fontWeight: "bold" }}>giriş yapın</Link>.
                          </p>
                        )}
                        {commentErrors[post.id] && (
                          <p style={{ color: "var(--color-danger)", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                            {commentErrors[post.id]}
                          </p>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </main>

        <aside>
          {isTeacher ? (
            <div className={styles.sidebarCard}>
              <h2><PenIcon size={20} /> Yeni Paylaşım Yap</h2>
              
              {editorStatus && (
                <div className={`${styles.notification} ${editorStatus.success ? styles.successNotification : styles.errorNotification}`}>
                  {editorStatus.message}
                </div>
              )}

              <form onSubmit={handlePostSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="postTitle">Başlık</label>
                  <input
                    id="postTitle"
                    type="text"
                    placeholder="Gönderi başlığı..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="postContent">İçerik (Makale/Kesit)</label>
                  <textarea
                    id="postContent"
                    rows={6}
                    placeholder="Makale parçası veya tartışma konusunu yazın..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                  ></textarea>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="postTags">Etiketler (Virgülle Ayırın)</label>
                  <input
                    id="postTags"
                    type="text"
                    placeholder="Yapay Zeka, Fizik, Enerji"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Kürsüde Paylaş
                </button>
              </form>
            </div>
          ) : (
            <div className={styles.sidebarCard}>
              <h2><MegaphoneIcon size={20} /> Serbest Kürsü Hakkında</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Burası, öğretmenlerimizin bilim, teknoloji ve mühendislik alanındaki makalelerden kesitler 
                paylaştığı, güncel teknolojik gelişmeleri tartıştığı açık bir bilim panosudur.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6', marginTop: '1rem' }}>
                Öğrenciler, mühendisler ve tüm platform üyeleri gönderilerin altında fikirlerini beyan edebilir, 
                soru sorabilir ve topluluk tartışmalarına katılarak ortak bir akıl platformu oluşturabilirler.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
