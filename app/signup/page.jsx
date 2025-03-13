"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User, AtSign, Lock, Eye, EyeOff } from "lucide-react";
import styles from "./signup.module.css";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.authBox}>
        <h2 className={styles.heading}>Sign Up</h2>
        <p className={styles.text}>
          Already have an account?{" "}
          <Link href="/login" className={styles.authLink}>Login.</Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Full Name</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={20} color="#555" />
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Email</label>
            <div className={styles.inputWrapper}>
              <AtSign className={styles.inputIcon} size={20} color="#555" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Password</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} color="#555" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
              {showPassword ? (
                <EyeOff className={styles.eyeIcon} size={20} color="#555" onClick={() => setShowPassword(false)} />
              ) : (
                <Eye className={styles.eyeIcon} size={20} color="#555" onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>

          <button type="submit" className={styles.authBtn}>Sign Up</button>
          <button
            type="reset"
            className={styles.resetBtn}
            onClick={() => setFormData({ fullName: "", email: "", password: "" })}
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
