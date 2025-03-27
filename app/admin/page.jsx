"use client";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, ClipboardCheck, CheckCircle, Trash2 } from "lucide-react"; 
import styles from "./admin.module.css";

export default function AdminDashboard() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user === null) return;
    
        if (!user || user.role !== "admin") {
            alert("You are not an admin. Redirecting...");
            router.replace("/");
        }
    }, [user, router]);    

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Admin Dashboard</h2>
            <div className={styles.grid}>
                <Link href="/admin/add-doctor" className={styles.card}>
                    <UserPlus size={40} className={styles.icon} />
                    <h3 className={styles.heading2}>Add Doctor</h3>
                    <p className={styles.para}>Manage and add new doctors to the system.</p>
                </Link>
                <Link href="/admin/delete-doctor" className={styles.card}>
                    <Trash2 size={40} className={styles.icon} />
                    <h3 className={styles.heading2}>Delete Doctor</h3>
                    <p className={styles.para}>Remove doctors from the system.</p>
                </Link>
                <Link href="/admin/notifications" className={styles.card}>
                    <ClipboardCheck size={40} className={styles.icon} />
                    <h3 className={styles.heading2}>Confirm/Reject Appointments</h3>
                    <p className={styles.para}>Approve or decline pending appointments.</p>
                </Link>
                <Link href="/admin/approved-appointments" className={styles.card}>
                    <CheckCircle size={40} className={styles.icon} />
                    <h3 className={styles.heading2}>Approved Appointments</h3>
                    <p className={styles.para}>View and manage approved appointments.</p>
                </Link>
            </div>
        </div>
    );
}
