import styles from "./Footer.module.css";
import { FaPhone, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>© EmScripts 2024. All Right Reserved.</p>
      <div className={styles.icons}>
        <FaPhone className={styles.icon} />
        <FaWhatsapp className={styles.icon} />
      </div>
    </footer>
  );
}
