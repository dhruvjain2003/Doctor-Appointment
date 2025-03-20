import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <section className={styles.heroSection}>
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
