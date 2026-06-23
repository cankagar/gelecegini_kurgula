"use client";

import React, { useState } from "react";
import styles from "./serbest-kursu.module.css";
import Link from "next/link";
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
        author: {
          name: "Mehmet Kaya",
          username: "mehmetkaya",
          profile: { avatarUrl: null },
        },
      },
      {
        id: "c-2",
        content: "Eleştirel düşünme konusunda kaynak önerebilir misiniz?",
        createdAt: "2026-05-14",
        author: {
          name: "Zeynep Demir",
          username: "zeynepdemir",
          profile: { avatarUrl: null },
        },
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
        author: {
          name: "Elif Şahin",
          username: "elifsahin",
          profile: { avatarUrl: null },
        },
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

export default function SerbestKursuPage() {
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);

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

  // Handle Like Toggle (local-only)
  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1,
            }
          : post
      )
    );
  };

  // Toggle Comment Section View
  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Handle Comment Submit (local-only)
  const handleCommentSubmit = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    const commentText = commentInputs[postId] || "";
    setCommentErrors((prev) => ({ ...prev, [postId]: "" }));

    if (!commentText.trim()) {
      setCommentErrors((prev) => ({ ...prev, [postId]: "Yorum boş bırakılamaz." }));
      return;
    }

    // Reset input
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));

    // Append new comment to post locally
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const newComment: Comment = {
            id: `c-${post.comments.length + 1}`,
            content: commentText,
            createdAt: "2026-01-01",
            author: {
              name: "Sen",
              username: "siz",
              profile: { avatarUrl: null },
            },
          };
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );
  };

  // Handle Post Submit (Teacher Form, local-only)
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

  const isTeacher = true;
  const isVerifiedCreator = true;

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
          {posts.length === 0 ? (
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
