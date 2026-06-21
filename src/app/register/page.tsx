"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../auth.module.css";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "STUDENT"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/login?registered=true");
      } else {
        const data = await res.json();
        setError(data.message || "Bir hata oluştu.");
      }
    } catch (err) {
      setError("Bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Kayıt Ol</h1>
        <p className={styles.subtitle}>Bilim dünyasına ilk adımını at!</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Kullanıcı Adı</label>
            <input
              type="text"
              className={styles.input}
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>E-posta</label>
            <input
              type="email"
              className={styles.input}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Şifre</label>
            <input
              type="password"
              className={styles.input}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Rol</label>
            <select 
              className={styles.input}
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="STUDENT">Öğrenci</option>
              <option value="TEACHER">Öğretmen</option>
            </select>
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Kaydediliyor..." : "Hesap Oluştur"}
          </button>
        </form>

        <p className={styles.linkText}>
          Zaten hesabın var mı?{" "}
          <Link href="/login" className={styles.link}>
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
