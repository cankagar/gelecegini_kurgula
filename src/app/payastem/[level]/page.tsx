"use client";

import React, { useState, use } from "react";
import styles from "./payastem.module.css";
import {
  MegaphoneIcon,
  ClipboardListIcon,
  BookIcon,
  BellIcon,
  FileTextIcon,
  VideoIcon,
  LinkIcon,
  WrenchIcon,
  GraduationCapIcon,
} from "@/components/icons";

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

  // Static sample data (no backend / network).
  const levelData: LevelData = {
    classLevel: {
      id: level,
      name: `NexSTEM ${level}. Seviye`,
      description: "Bu seviyedeki haftalık ödevleri, duyuruları ve kaynakları buradan takip edebilirsiniz.",
    },
    announcements: [
      {
        id: "ann-1",
        title: "Yeni Döneme Hoş Geldiniz!",
        content:
          "Sevgili öğrenciler, yeni STEM dönemimize başlıyoruz. Lütfen haftalık ödevlerinizi zamanında tamamlamayı unutmayın. Sorularınız için eğitmenlerinize ulaşabilirsiniz.",
        createdAt: "2026-06-10T09:00:00.000Z",
        author: { name: "Ayşe Yılmaz" },
      },
      {
        id: "ann-2",
        title: "Robotik Atölyesi Ertelendi",
        content:
          "Bu hafta planlanan robotik atölyesi teknik sebeplerden dolayı bir sonraki haftaya ertelenmiştir. Yeni tarih en kısa sürede paylaşılacaktır.",
        createdAt: "2026-06-15T14:30:00.000Z",
        author: { name: "Mehmet Demir" },
      },
      {
        id: "ann-3",
        title: "XP Sıralaması Güncellendi",
        content:
          "Bu ayki XP sıralaması güncellendi. İlk üçe giren öğrencilerimizi tebrik ederiz! Daha fazla puan kazanmak için ödevlerinizi tamamlayın.",
        createdAt: "2026-06-20T11:15:00.000Z",
        author: { name: "Ayşe Yılmaz" },
      },
    ],
    assignments: [
      {
        id: "asg-1",
        title: "Basit Devre Tasarımı",
        description:
          "LED, direnç ve buton kullanarak basit bir devre tasarlayın. Devrenizin fotoğrafını ve kısa bir açıklama yükleyin.",
        creditReward: 20,
        dueDate: "2026-06-30T23:59:00.000Z",
      },
      {
        id: "asg-2",
        title: "Algoritma Akış Şeması",
        description:
          "Günlük rutininizi bir akış şeması olarak çizin. Karar noktalarını ve döngüleri doğru sembollerle gösterin.",
        creditReward: 30,
      },
      {
        id: "asg-3",
        title: "3B Model Tasarımı",
        description:
          "Seçtiğiniz basit bir nesnenin 3 boyutlu modelini tasarlayın ve tasarım dosyasını paylaşın.",
        creditReward: 40,
        dueDate: "2026-07-05T23:59:00.000Z",
      },
    ],
    resources: [
      {
        id: "res-1",
        title: "Devre Elemanları Rehberi",
        description: "Temel devre elemanlarını ve kullanım alanlarını anlatan PDF doküman.",
        type: "PDF",
        url: "#",
      },
      {
        id: "res-2",
        title: "Algoritma Temelleri (Video)",
        description: "Algoritmik düşünmeye giriş niteliğinde bir eğitim videosu.",
        type: "VIDEO",
        url: "#",
      },
      {
        id: "res-3",
        title: "Online 3B Tasarım Aracı",
        description: "Tarayıcı üzerinden 3 boyutlu model tasarlayabileceğiniz ücretsiz araç.",
        type: "LINK",
        url: "#",
      },
    ],
  };

  const [activeTab, setActiveTab] = useState<"announcements" | "assignments" | "resources">("announcements");

  // Form State for Teachers
  const [formType, setFormType] = useState<"announcement" | "assignment" | "resource">("announcement");
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formResourceType, setFormResourceType] = useState("PDF");
  const [formUrl, setFormUrl] = useState("");
  const [formCredit, setFormCredit] = useState("20");
  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Form Submission (local-only, no network).
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus(null);

    if (!formTitle.trim()) {
      setFormStatus({ success: false, message: "Başlık girmek zorunludur." });
      return;
    }

    // Reset form fields and show a local success message.
    setFormTitle("");
    setFormContent("");
    setFormDescription("");
    setFormUrl("");
    setFormStatus({ success: true, message: "İçerik başarıyla kaydedildi!" });
  };

  const isTeacher = true;
  const levelInfo = levelData.classLevel;

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
              <MegaphoneIcon size={18} /> Duyurular ({levelData?.announcements.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("assignments")}
              className={`${styles.tabBtn} ${activeTab === "assignments" ? styles.activeTabBtn : ""}`}
            >
              <ClipboardListIcon size={18} /> Haftalık Ödevler ({levelData?.assignments.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`${styles.tabBtn} ${activeTab === "resources" ? styles.activeTabBtn : ""}`}
            >
              <BookIcon size={18} /> Kaynaklar ({levelData?.resources.length || 0})
            </button>
          </div>

          <section className={styles.contentCard}>
            {activeTab === "announcements" && (
              <div className={styles.itemList}>
                {levelData?.announcements.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyStateIcon}><BellIcon size={28} /></div>
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
                    <div className={styles.emptyStateIcon}><ClipboardListIcon size={28} /></div>
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
                    <div className={styles.emptyStateIcon}><BookIcon size={28} /></div>
                    <p>Henüz bir kaynak veya PDF/video dokümanı yüklenmemiş.</p>
                  </div>
                ) : (
                  levelData?.resources.map((item) => (
                    <div key={item.id} className={styles.resourceCard}>
                      <div className={styles.resourceIcon}>
                        {item.type === "PDF" ? <FileTextIcon size={26} /> : item.type === "VIDEO" ? <VideoIcon size={26} /> : <LinkIcon size={26} />}
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
              <h2><WrenchIcon size={20} /> İçerik Ekle (Öğretmen Paneli)</h2>

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
              <h2><GraduationCapIcon size={20} /> NexSTEM Seviye Bilgisi</h2>
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
