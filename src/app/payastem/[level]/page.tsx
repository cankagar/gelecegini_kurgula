"use client";

import React, { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import styles from "./payastem.module.css";
import Link from "next/link";

interface LevelData {
  classLevel: {
    id: string;
    name: string;
    description: string;
  };
  announcements: Array<{
    id: string;
    title: string;
    content: string;
    createdAt: string;
    author: { name: string };
  }>;
  assignments: Array<{
    id: string;
    title: string;
    description: string;
    creditReward: number;
    dueDate?: string;
  }>;
  resources: Array<{
    id: string;
    title: string;
    description?: string;
    type: string;
    url: string;
  }>;
}

export default function PayaStemLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const resolvedParams = use(params);
  const { level } = resolvedParams;

  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<"announcements" | "assignments" | "resources">("announcements");
  
  const [levelData, setLevelData] = useState<LevelData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isRestricted, setIsRestricted] = useState(false);

  // Form State for Teachers
  const [formType, setFormType] = useState<"announcement" | "assignment" | "resource">("announcement");
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formResourceType, setFormResourceType] = useState("PDF");
  const [formUrl, setFormUrl] = useState("");
  const [formCredit, setFormCredit] = useState("20");
  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Load Content
  const fetchLevelData = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/payastem?level=${level}`);
      const result = await res.json();
      
      if (!res.ok) {
        if (res.status === 403 && result.isRestricted) {
          setIsRestricted(true);
        }
        throw new Error(result.error || "İçerik yüklenemedi");
      }
      
      setLevelData(result.data);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchLevelData();
    }
  }, [level, status]);

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus(null);

    if (!formTitle.trim()) {
      setFormStatus({ success: false, message: "Başlık girmek zorunludur." });
      return;
    }

    const payload: any = {
      type: formType,
      classLevelId: level,
      title: formTitle,
    };

    if (formType === "announcement") {
      payload.content = formContent;
    } else if (formType === "assignment") {
      payload.description = formDescription;
      payload.creditReward = parseInt(formCredit);
    } else if (formType === "resource") {
      payload.resourceType = formResourceType;
      payload.url = formUrl;
      payload.description = formDescription;
    }

    try {
      const res = await fetch("/api/payastem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Kayıt işlemi başarısız");
      }

      setFormStatus({ success: true, message: "İçerik başarıyla yüklendi!" });
      setFormTitle("");
      setFormContent("");
      setFormDescription("");
      setFormUrl("");
      
      // Reload Data
      fetchLevelData();
    } catch (err: any) {
      setFormStatus({ success: false, message: err.message });
    }
  };

  if (status === "loading" || (isLoading && status === "authenticated")) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>⏳</div>
          <p>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>🔒</div>
          <h2>Giriş Yapılması Gerekiyor</h2>
          <p style={{ margin: "1rem 0 2rem" }}>PayaSTEM eğitim içeriklerini görebilmek için üye girişi yapmalısınız.</p>
          <Link href="/login" className={styles.actionBtn}>
            Giriş Yap
          </Link>
        </div>
      </div>
    );
  }

  if (isRestricted) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className={styles.emptyStateIcon}>🚫</div>
          <h2>Erişim Kısıtlandı</h2>
          <p style={{ color: 'var(--color-text-muted)', margin: '1rem 0 2rem', lineHeight: '1.6' }}>
            {errorMsg || "Bu eğitim seviyesindeki içerikleri görüntüleme yetkiniz bulunmamaktadır."}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/" className={styles.actionBtn} style={{ background: 'var(--color-border)', color: 'var(--color-text)' }}>
              Anasayfa
            </Link>
            <Link href="/dashboard" className={styles.actionBtn}>
              Profilime Git
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (errorMsg && !levelData) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>⚠️</div>
          <h2>Bir Hata Oluştu</h2>
          <p style={{ margin: '1rem 0 2rem' }}>{errorMsg}</p>
          <button onClick={fetchLevelData} className={styles.actionBtn}>Tekrar Dene</button>
        </div>
      </div>
    );
  }

  const isTeacher = session?.user && ((session.user as any).role === "TEACHER" || (session.user as any).role === "ADMIN");
  const levelInfo = levelData?.classLevel;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{levelInfo?.name}</h1>
        <p>{levelInfo?.description}</p>
      </header>

      <div className={styles.layout}>
        <main>
          <div className={styles.tabs}>
            <button
              onClick={() => setActiveTab("announcements")}
              className={`${styles.tabBtn} ${activeTab === "announcements" ? styles.activeTabBtn : ""}`}
            >
              📢 Duyurular ({levelData?.announcements.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("assignments")}
              className={`${styles.tabBtn} ${activeTab === "assignments" ? styles.activeTabBtn : ""}`}
            >
              📋 Haftalık Ödevler ({levelData?.assignments.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`${styles.tabBtn} ${activeTab === "resources" ? styles.activeTabBtn : ""}`}
            >
              📚 Kaynaklar ({levelData?.resources.length || 0})
            </button>
          </div>

          <section className={styles.contentCard}>
            {activeTab === "announcements" && (
              <div className={styles.itemList}>
                {levelData?.announcements.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyStateIcon}>🔔</div>
                    <p>Henüz bir duyuru yayınlanmamış.</p>
                  </div>
                ) : (
                  levelData?.announcements.map((item) => (
                    <article key={item.id} className={styles.announcementCard}>
                      <h3>{item.title}</h3>
                      <div className={styles.announcementMeta}>
                        Yayınlayan: {item.author?.name || "Eğitmen"} • {new Date(item.createdAt).toLocaleDateString("tr-TR")}
                      </div>
                      <p>{item.content}</p>
                    </article>
                  ))
                )}
              </div>
            )}

            {activeTab === "assignments" && (
              <div className={styles.itemList}>
                {levelData?.assignments.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyStateIcon}>📝</div>
                    <p>Bu seviye için henüz bir ödev atanmamış.</p>
                  </div>
                ) : (
                  levelData?.assignments.map((item) => (
                    <div key={item.id} className={styles.assignmentCard}>
                      <div className={styles.assignmentInfo}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <span className={styles.assignmentXP}>+{item.creditReward} XP</span>
                      </div>
                      <button className={styles.actionBtn}>Detayı Gör</button>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "resources" && (
              <div className={styles.itemList}>
                {levelData?.resources.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyStateIcon}>📖</div>
                    <p>Henüz bir kaynak veya PDF/video dokümanı yüklenmemiş.</p>
                  </div>
                ) : (
                  levelData?.resources.map((item) => (
                    <div key={item.id} className={styles.resourceCard}>
                      <div className={styles.resourceIcon}>
                        {item.type === "PDF" ? "📄" : item.type === "VIDEO" ? "🎥" : "🔗"}
                      </div>
                      <div className={styles.resourceInfo}>
                        <h3>{item.title}</h3>
                        {item.description && <p>{item.description}</p>}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.resourceLink}
                        >
                          İçeriği Aç &rarr;
                        </a>
                        <br />
                        <span className={styles.badge}>{item.type}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </section>
        </main>

        <aside>
          {isTeacher ? (
            <div className={styles.sidebarCard}>
              <h2>🛠️ İçerik Ekle (Öğretmen Paneli)</h2>
              
              {formStatus && (
                <div className={`${styles.notification} ${formStatus.success ? styles.successNotification : styles.errorNotification}`}>
                  {formStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="contentType">İçerik Tipi</label>
                  <select
                    id="contentType"
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                  >
                    <option value="announcement">Duyuru</option>
                    <option value="assignment">Haftalık Ödev / Görev</option>
                    <option value="resource">Kaynak / Materyal</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="title">Başlık</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Başlık girin..."
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                  />
                </div>

                {formType === "announcement" && (
                  <div className={styles.formGroup}>
                    <label htmlFor="content">Duyuru İçeriği</label>
                    <textarea
                      id="content"
                      rows={4}
                      placeholder="Duyuru metnini yazın..."
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {formType === "assignment" && (
                  <>
                    <div className={styles.formGroup}>
                      <label htmlFor="description">Ödev Açıklaması</label>
                      <textarea
                        id="description"
                        rows={4}
                        placeholder="Ödev detaylarını yazın..."
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="credit">XP Ödülü</label>
                      <input
                        id="credit"
                        type="number"
                        min="10"
                        value={formCredit}
                        onChange={(e) => setFormCredit(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {formType === "resource" && (
                  <>
                    <div className={styles.formGroup}>
                      <label htmlFor="resType">Kaynak Tipi</label>
                      <select
                        id="resType"
                        value={formResourceType}
                        onChange={(e) => setFormResourceType(e.target.value)}
                      >
                        <option value="PDF">PDF Dosyası</option>
                        <option value="VIDEO">Video Bağlantısı</option>
                        <option value="LINK">Web Bağlantısı (URL)</option>
                        <option value="OTHER">Diğer Materyal</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="url">Bağlantı Adresi (URL)</label>
                      <input
                        id="url"
                        type="text"
                        placeholder="https://... veya dosya yolu"
                        value={formUrl}
                        onChange={(e) => setFormUrl(e.target.value)}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="description">Açıklama</label>
                      <textarea
                        id="description"
                        rows={2}
                        placeholder="Kısa açıklama..."
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </>
                )}

                <button type="submit" className={styles.submitBtn}>
                  Yayınla
                </button>
              </form>
            </div>
          ) : (
            <div className={styles.sidebarCard}>
              <h2>🎓 NexSTEM Seviye Bilgisi</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Bulunduğunuz seviyedeki haftalık ödevleri zamanında tamamlayarak XP puanları kazanabilirsiniz. 
                Kazandığınız puanlar seviyenizi yükseltirken, öğretmenlerin paylaştığı kaynaklar ve PDF'ler 
                STEM projelerinizde size yol gösterecektir.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
