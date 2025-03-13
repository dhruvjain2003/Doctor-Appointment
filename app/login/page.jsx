"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AtSign, Lock, Eye, EyeOff } from "lucide-react";
import styles from "./login.module.css";

function Login() {
  const [formData, setFormData] = useState({
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
      <div className={styles.loginBox}>
        <h2 className={styles.heading}>Login</h2>
        <p className={styles.text}>
          Are you a new member?
          <Link href="/signup" className={styles.signupLink}> Sign up here.</Link>
        </p>

        <form onSubmit={handleSubmit}>
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

          <button type="submit" className={styles.loginBtn}>Login</button>
          <button
            type="reset"
            className={styles.resetBtn}
            onClick={() => setFormData({ email: "", password: "" })}
          >
            Reset
          </button>
        </form>

        <p className={styles.forgotPassword}>
          <Link href="/">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
