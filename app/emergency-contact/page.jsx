import styles from "./emergency-contact.module.css";

const contacts = [
  {
    emoji: "🚑",
    title: "Ambulance",
    description: "For immediate medical assistance, call",
    phone: "911 (India)",
  },
  {
    emoji: "🏥",
    title: "Hospital Helpline",
    description: "Nearest hospital support:",
    phone: "+91 9268880303",
  },
  {
    emoji: "🆘",
    title: "Mental Health Support",
    description: "24/7 confidential support:",
    phone: "+91 9999666555",
  },
  {
    emoji: "👮",
    title: "Police",
    description: "For law enforcement, call",
    phone: "100 (India)",
  },
  {
    emoji: "🔥",
    title: "Fire Department",
    description: "For fire emergencies, call",
    phone: "101 (India)",
  },
];

export default function EmergencyContact() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Emergency Contacts</h1>
      <p className={styles.description}>
        In case of an emergency, please reach out to the relevant services listed below:
      </p>
      <div className={styles.contactList}>
        {contacts.map((contact, index) => (
          <div key={index} className={styles.contactItem}>
            <span className={styles.emoji}>{contact.emoji}</span>
            <div>
              <h2>{contact.title}</h2>
              <p>
                {contact.description} <strong>{contact.phone}</strong>.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
