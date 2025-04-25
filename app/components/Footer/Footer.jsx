"use client"
import styles from "./Footer.module.css";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Footer() {
  const router = useRouter();
  const handlePhoneClick = () => {
    router.push("/emergency-contact"); 
  };

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>© EmScripts 2024. All Right Reserved.</p>
      <div className={styles.icons}>
        <FaPhone className={styles.icon} onClick={handlePhoneClick} title="Emergency Contact"/>
        <FaWhatsapp className={styles.icon} title="WhatsApp Support" onClick={()=>toast.success("🚧 WhatsApp support is coming soon. Stay tuned!")}/>
      </div>
    </footer>
  );
}
