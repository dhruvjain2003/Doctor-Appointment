"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AtSign, Lock, Eye, EyeOff } from "lucide-react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext"; 
// import { toast } from "react-hot-toast";
// import { Toaster } from "react-hot-toast";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token); 
        // toast.success("Login successful! 🎉", { duration: 3000 });
        alert("Login successful");
        if (data.user.role === "admin") {
          router.push("/admin"); 
        } else {
          router.push(`/?message=success`);
        }
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Try again later.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className={styles.container}>
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
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

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="reset"
            className={styles.resetBtn}
            onClick={() => setFormData({ email: "", password: "" })}
            disabled={loading}
          >
            Reset
          </button>
        </form>

        <p className={styles.forgotPassword}>
          <Link href="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
