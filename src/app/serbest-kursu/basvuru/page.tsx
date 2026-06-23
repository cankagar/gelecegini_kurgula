"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./basvuru.module.css";
import { FileTextIcon, GraduationCapIcon, LightbulbIcon, HelpCircleIcon, FolderIcon } from "@/components/icons";

interface Application {
  id: string;
  status: string;
  adminNotes?: string | null;
  // all fields but we will only display status and notes
}

export default function CreatorApplicationPage() {
  const [application] = useState<Application | null>(null);

  // Form state
  const [formData, setFormData] = useState<any>({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    city: "",
    district: "",
    profession: "",
    institution: "",
    educationLevel: "",
    university: "",
    department: "",
    expertise: "",
    workingInstitution: "",
    interests: "",
    bio: "",
    projects: "",
    achievements: "",
    website: "",
    linkedin: "",
    github: "",
    scholar: "",
    orcid: "",
    references: "",
    whyPost: "",
    whichFields: "",
    postTypes: "",
    priorExp: "",
    files: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files, type, checked } = e.target as any;
    if (type === "file") {
      // simulate file upload by storing file names comma separated
      const fileList = Array.from(files).map((f: any) => f.name).join(",");
      setFormData((prev: any) => ({ ...prev, [name]: fileList }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMsg("Başvurunuz gönderildi! Durumu kontrol edin.");
    setSubmitting(false);
  };

  const interestOptions = [
    "Fizik",
    "Matematik",
    "Kimya",
    "Biyoloji",
    "Yapay Zeka",
    "Robotik",
    "Yazılım",
    "Mühendislik",
    "Diğer",
  ];

  // If application exists, show status card
  if (application) {
    return (
      <div className={styles.container}>
        <div className={styles.statusCard}>
          <div className={`${styles.statusBanner} ${
            application.status === "PENDING"
              ? styles.statusPending
              : application.status === "APPROVED"
                ? styles.statusApproved
                : styles.statusRejected
          }`}> 
            {application.status}
          </div>
          <h2 className={styles.statusTitle}>Başvurunuz {application.status.toLowerCase()}.</h2>
          <p className={styles.statusText}>
            {application.status === "PENDING" && "Başvurunuz inceleniyor. Sonuç için e-posta bildiriminizi bekleyin."}
            {application.status === "APPROVED" && "Tebrikler! Artık içerik üreticisi olarak paylaşım yapabilirsiniz."}
            {application.status === "REJECTED" && "Üzgünüz, başvurunuz reddedildi. Aşağıda yönetici notlarını görebilirsiniz."}
          </p>
          {application.status === "REJECTED" && application.adminNotes && (
            <div className={styles.adminNotesBox}>
              <h4>Yönetici Notu</h4>
              <p>{application.adminNotes}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render form
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>İçerik Üreticisi Başvuru Formu</h1>
        <p>Platformumuza içerik üreticisi olarak katılmak için lütfen aşağıdaki formu doldurun.</p>
      </header>
      {submitMsg && (
        <div className={submitMsg.includes("başarı") ? styles.alertSuccess : styles.alertError}>
          {submitMsg}
        </div>
      )}
      <form className={styles.card} onSubmit={handleSubmit}>
        {/* Personal Info */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}><FileTextIcon size={20} /> Kişisel Bilgiler</h3>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Tam İsim<span className={styles.required}>*</span></label>
              <input name="fullName" className={styles.input} required onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Kullanıcı Adı<span className={styles.required}>*</span></label>
              <input name="username" className={styles.input} required onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>E-posta<span className={styles.required}>*</span></label>
              <input type="email" name="email" className={styles.input} required onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Telefon<span className={styles.required}>*</span></label>
              <input name="phone" className={styles.input} required onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Şehir<span className={styles.required}>*</span></label>
              <input name="city" className={styles.input} required onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>İlçe<span className={styles.required}>*</span></label>
              <input name="district" className={styles.input} required onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Meslek<span className={styles.required}>*</span></label>
              <input name="profession" className={styles.input} required onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Kurum / Okul<span className={styles.required}>*</span></label>
              <input name="institution" className={styles.input} required onChange={handleChange} />
            </div>
          </div>
        </section>

        {/* Academic Info */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}><GraduationCapIcon size={20} /> Akademik Bilgiler</h3>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Eğitim Seviyesi<span className={styles.required}>*</span></label>
              <select name="educationLevel" className={styles.select} required onChange={handleChange}>
                <option value="">Seçiniz</option>
                <option>Lise</option>
                <option>Üniversite</option>
                <option>Lisansüstü</option>
                <option>Diğer</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Üniversite (Varsa)</label>
              <input name="university" className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Bölüm (Varsa)</label>
              <input name="department" className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Uzmanlık Alanı (Varsa)</label>
              <input name="expertise" className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.inputGroupFull}>
              <label className={styles.label}>Çalıştığınız Kurum (Varsa)</label>
              <input name="workingInstitution" className={styles.input} onChange={handleChange} />
            </div>
          </div>
        </section>

        {/* Interests */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}><LightbulbIcon size={20} /> İlgi Alanları</h3>
          <div className={styles.interestsGrid}>
            {interestOptions.map((opt) => (
              <label key={opt} className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  name="interests"
                  value={opt}
                  className={styles.checkboxInput}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    setFormData((prev: any) => {
                      const current = prev.interests ? prev.interests.split(",") : [];
                      if (checked) {
                        return { ...prev, interests: [...current, value].join(",") };
                      } else {
                        return { ...prev, interests: current.filter((v: string) => v !== value).join(",") };
                      }
                    });
                  }}
                />
                <span className={styles.checkboxText}>{opt}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Additional Info */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}><FileTextIcon size={20} /> Ek Bilgiler</h3>
          <div className={styles.formGrid}>
            <div className={styles.inputGroupFull}>
              <label className={styles.label}>Kısa Biyografi<span className={styles.required}>*</span></label>
              <textarea name="bio" className={styles.textarea} required onChange={handleChange} />
            </div>
            <div className={styles.inputGroupFull}>
              <label className={styles.label}>Projeler / Çalışmalar (Opsiyonel)</label>
              <textarea name="projects" className={styles.textarea} onChange={handleChange} />
            </div>
            <div className={styles.inputGroupFull}>
              <label className={styles.label}>Başarılar / Sertifikalar (Opsiyonel)</label>
              <textarea name="achievements" className={styles.textarea} onChange={handleChange} />
            </div>
            <div className={styles.inputGroupFull}>
              <label className={styles.label}>Web Sitesi (Opsiyonel)</label>
              <input name="website" className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.inputGroupFull}>
              <label className={styles.label}>LinkedIn (Opsiyonel)</label>
              <input name="linkedin" className={styles.input} onChange={handleChange} />
            </div>
            <div className={styles.inputGroupFull}>
              <label className={styles.label}>GitHub (Opsiyonel)</label>
              <input name="github" className={styles.input} onChange={handleChange} />
            </div>
          </div>
        </section>

        {/* Motivation Questions */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}><HelpCircleIcon size={20} /> Motivasyon Soruları</h3>
          <div className={styles.formGrid}>
            <div className={styles.inputGroupFull}>
              <label className={styles.label}>Neden içerik üreticisi olmak istiyorsunuz?<span className={styles.required}>*</span></label>
              <textarea name="whyPost" className={styles.textarea} required onChange={handleChange} />
            </div>
            <div className={styles.inputGroupFull}>
              <label className={styles.label}>Hangi alanlarda içerik üretmek istersiniz?<span className={styles.required}>*</span></label>
              <textarea name="whichFields" className={styles.textarea} required onChange={handleChange} />
            </div>
            <div className={styles.inputGroupFull}>
              <label className={styles.label}>Önceki yayın deneyimleriniz (varsa)<span className={styles.required}>*</span></label>
              <textarea name="priorExp" className={styles.textarea} required onChange={handleChange} />
            </div>
          </div>
        </section>

        {/* File Upload Simulation */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}><FolderIcon size={20} /> Dosya Yükleme (Simülasyon)</h3>
          <div className={styles.fileUploaderArea} onClick={() => {}}
            >
            <div className={styles.fileUploaderIcon}><FolderIcon size={32} /></div>
            <div className={styles.fileUploaderText}>Dosyaları sürükleyip bırakın veya <span>seçin</span></div>
            <input type="file" name="files" multiple style={{ display: "none" }} onChange={handleChange} />
          </div>
        </section>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.btnPrimary} disabled={submitting}>
            {submitting ? "Gönderiliyor..." : "Başvuruyu Gönder"}
          </button>
        </div>
      </form>
    </div>
  );
}
