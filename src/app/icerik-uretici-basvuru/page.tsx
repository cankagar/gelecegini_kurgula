"use client";

import React, { useState } from "react";
import styles from "./icerik-basvuru.module.css";

export default function ContentCreatorApplication() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    city: "",
    district: "",
    profession: "",
    institution: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isStepOneValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.username.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.district.trim() !== "" &&
      formData.profession.trim() !== "" &&
      formData.institution.trim() !== ""
    );
  };

  const handleNext = () => {
    if (isStepOneValid()) {
      setStep(2); // future steps
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>İçerik Üreticisi Başvurusu</h1>
      {step === 1 && (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Ad Soyad</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={styles.input}
              placeholder="Örn. Ahmet Yılmaz"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Kullanıcı adı</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={styles.input}
              placeholder="Kullanıcı adınız"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>E-posta</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="ornek@eposta.com"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Telefon numarası</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
              placeholder="+90 5xx xxx xx xx"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>İl</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={styles.input}
              placeholder="İstanbul"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>İlçe</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className={styles.input}
              placeholder="Kadıköy"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Meslek</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className={styles.input}
              placeholder="Mühendis, Öğretmen, …"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Kurum / Okul adı</label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className={styles.input}
              placeholder="Üniversite adı, Şirket adı, …"
            />
          </div>
          <button
            type="button"
            className={styles.nextButton}
            onClick={handleNext}
            disabled={!isStepOneValid()}
          >
            Sonraki Adım
          </button>
        </form>
      )}
      {/* Future steps will be rendered here */}
    </div>
  );
}
