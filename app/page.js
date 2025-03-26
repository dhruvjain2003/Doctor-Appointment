"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const toastShown = useRef(false); 

  useEffect(() => {
    if (message === "success" && !toastShown.current) {
      toast.success("Login was successful! 🎉");
      toastShown.current = true; 
    }
  }, [message]); 

  return (
    <section className={styles.heroSection}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className={styles.heroContent}>
        <h1>Health in Your Hands.</h1>
        <p>
          Take control of your healthcare with CareMate. Book appointments with
          ease, explore health blogs, and stay on top of your well-being, all in
          one place.
        </p>
        <button className={styles.heroButton}>Get Started</button>
      </div>
      <div className={styles.heroImageContainer}>
        <Image
          src="/images/nurse.png"
          alt="Doctor and Patient"
          width={800}
          height={900}
          className={styles.heroImage}
          priority
        />
      </div>
    </section>
  );
}
