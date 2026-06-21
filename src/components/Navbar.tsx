"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.logoText}>Nex<span className={styles.logoAccent}>STEM</span></span>
          </Link>
        </div>
        
        <div className={styles.rightSection}>
          <ul className={styles.navLinks}>
            <li className={styles.dropdown} ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className={styles.dropdownBtn}
                aria-expanded={isDropdownOpen}
              >
                PayaSTEM <span className={`${styles.arrow} ${isDropdownOpen ? styles.arrowOpen : ""}`}>▾</span>
              </button>
              {isDropdownOpen && (
                <div className={styles.dropdownContent}>
                  <Link href="/payastem/junior-stem" onClick={() => setIsDropdownOpen(false)} target="_blank" rel="noopener noreferrer">Junior STEM</Link>
                  <Link href="/payastem/ilkokul-stem" onClick={() => setIsDropdownOpen(false)} target="_blank" rel="noopener noreferrer">İlkokul STEM</Link>
                  <Link href="/payastem/ortaokul-stem" onClick={() => setIsDropdownOpen(false)} target="_blank" rel="noopener noreferrer">Ortaokul STEM</Link>
                  <Link href="/payastem/lise-stem" onClick={() => setIsDropdownOpen(false)} target="_blank" rel="noopener noreferrer">Lise STEM</Link>
                  <Link href="/payastem/nedir" onClick={() => setIsDropdownOpen(false)} target="_blank" rel="noopener noreferrer">PayaSTEM Nedir?</Link>
                </div>
              )}
            </li>
            <li>
              <Link href="/serbest-kursu" className={styles.dropdownBtn}>
                Serbest Kürsü
              </Link>
            </li>
            <li>
              <Link href="/oyun-merkezi" className={styles.dropdownBtn}>Oyun Merkezi</Link>
            </li>
            {session?.user && (session.user as any).role === "ADMIN" && (
              <li>
                <Link href="/admin/basvurular" className={styles.dropdownBtn}>
                  Yönetim
                </Link>
              </li>
            )}
          </ul>

          <div className={styles.authContainer}>
            {session ? (
              <Link href="/dashboard" className={styles.profileBtn}>
                Profilim
              </Link>
            ) : (
              <>
                <Link href="/login" className={styles.loginBtn}>Giriş</Link>
                <Link href="/register" className={styles.registerBtn}>Kayıt Ol</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
