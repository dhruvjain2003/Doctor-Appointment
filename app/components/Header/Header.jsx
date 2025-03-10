"use client"
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // Import menu icons
import "@/app/components/Header/Header.css";
import Image from "next/image";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="left-section">
          <div className="logo">
            <Image src="/images/Frame.png" alt="MedCare Logo" width={35} height={35} />
            <span>MedCare</span>
          </div>
          <div className="nav-links">
            <Link href="/" className="Home-link">Home</Link>
            <Link href="/appointments">Appointments</Link>
            <Link href="/health-blog">Health Blog</Link>
            <Link href="/reviews">Reviews</Link>
          </div>
        </div>
        <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>
        <div className="buttons">
          <button className="login">Login</button>
          <button className="register">Register</button>
        </div>
      </div>

      {/* Mobile Menu (Appears when menuOpen is true) */}
      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/appointments" onClick={() => setMenuOpen(false)}>Appointments</Link>
        <Link href="/health-blog" onClick={() => setMenuOpen(false)}>Health Blog</Link>
        <Link href="/reviews" onClick={() => setMenuOpen(false)}>Reviews</Link>
        <div className="mobile-buttons">
          <button className="login">Login</button>
          <button className="register">Register</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
