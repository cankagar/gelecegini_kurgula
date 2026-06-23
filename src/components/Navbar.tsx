"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "./icons";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
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

  // Close mobile menu on resize back to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 860) setIsMobileOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.logoText}>Nex<span className={styles.logoAccent}>STEM</span></span>
          </Link>
        </div>

        <button
          className={styles.mobileToggle}
          onClick={() => setIsMobileOpen((v) => !v)}
          aria-label={isMobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={isMobileOpen}
        >
          <span className={`${styles.bar} ${isMobileOpen ? styles.barOpen1 : ""}`} />
          <span className={`${styles.bar} ${isMobileOpen ? styles.barOpen2 : ""}`} />
          <span className={`${styles.bar} ${isMobileOpen ? styles.barOpen3 : ""}`} />
        </button>

        <div className={`${styles.rightSection} ${isMobileOpen ? styles.rightSectionOpen : ""}`}>
          <ul className={styles.navLinks}>
            <li className={styles.dropdown} ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={styles.dropdownBtn}
                aria-expanded={isDropdownOpen}
              >
                PayaSTEM <ChevronDownIcon className={`${styles.arrow} ${isDropdownOpen ? styles.arrowOpen : ""}`} size={16} />
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
              <Link href="/serbest-kursu" className={styles.dropdownBtn} onClick={() => setIsMobileOpen(false)}>
                Serbest Kürsü
              </Link>
            </li>
            <li>
              <Link href="/oyun-merkezi" className={styles.dropdownBtn} onClick={() => setIsMobileOpen(false)}>Oyun Merkezi</Link>
            </li>
            <li>
              <Link href="/admin/basvurular" className={styles.dropdownBtn} onClick={() => setIsMobileOpen(false)}>
                Yönetim
              </Link>
            </li>
          </ul>

          <div className={styles.authContainer}>
            <Link href="/dashboard" className={styles.profileBtn} onClick={() => setIsMobileOpen(false)}>
              Profilim
            </Link>
            <Link href="/login" className={styles.loginBtn} onClick={() => setIsMobileOpen(false)}>Giriş</Link>
            <Link href="/register" className={styles.registerBtn} onClick={() => setIsMobileOpen(false)}>Kayıt Ol</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
