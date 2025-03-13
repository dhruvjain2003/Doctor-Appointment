"use client";
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; 
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.leftSection}>
          <div className={styles.logo}>
            <Image src="/images/Frame.png" alt="MedCare Logo" width={35} height={35} />
            <span>MedCare</span>
          </div>
          <div className={styles.navLinks}>
            <Link href="/" className={styles.homeLink}>Home</Link>
            <Link href="/appointments">Appointments</Link>
            <Link href="/health-blog">Health Blog</Link>
            <Link href="/reviews">Reviews</Link>
          </div>
        </div>
        <div className={styles.mobileMenuIcon} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>
        <div className={styles.buttons}>
          <button className={styles.login} onClick={() => router.push("/login")}>Login</button>
          <button className={styles.register} onClick={() => router.push("/signup")}>Register</button>
        </div>
      </div>

      {/* Mobile Menu (Appears when menuOpen is true) */}
      <div className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ""}`}>
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/appointments" onClick={() => setMenuOpen(false)}>Appointments</Link>
        <Link href="/health-blog" onClick={() => setMenuOpen(false)}>Health Blog</Link>
        <Link href="/reviews" onClick={() => setMenuOpen(false)}>Reviews</Link>
        <div className={styles.mobileButtons}>
          <button className={styles.login} onClick={() => router.push("/login")}>Login</button>
          <button className={styles.register} onClick={() => router.push("/signup")}>Register</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
