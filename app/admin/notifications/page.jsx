"use client";
import { useEffect, useState } from "react";
import styles from "./notifications.module.css";
import { format } from "date-fns";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Loader from "@/app/components/Loader/Loader";

export default function Notifications() {
    const [appointments, setAppointments] = useState([]);
    const [loadings, setLoadings] = useState(true);
    const [error, setError] = useState(null);
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;
        if (!user || user.role !== "admin") {
            toast.error("Unauthorized access. Redirecting...");
            setTimeout(() => {
                router.replace("/");
            }, 1000);
        }
    }, [user, loading, router]);

    useEffect(() => {
        fetchPendingAppointments();
        const interval = setInterval(fetchPendingAppointments, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchPendingAppointments = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointments/pending`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setAppointments(data.data);
                setError(null);
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setError('Failed to fetch appointments');
        } finally {
            setLoadings(false);
        }
    };

    const handleDecision = async (id, status) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointments/${id}/status`, {
                method: "PATCH",
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ status })
            });

            const data = await response.json();
            if (response.ok) {
                setAppointments(appointments.filter(app => app.id !== id));
                setError(null);
                toast.success(`Appointment ${status === "confirmed" ? "confirmed" : "rejected"} successfully!`);
            } else {
                toast.error(data.message || 'Failed to update appointment status');
                setError(data.message || 'Failed to update appointment status');
            }
        } catch (error) {
            toast.error('Failed to update appointment status');
            console.error('Error updating appointment:', error);
            setError('Failed to update appointment status');
        }
    };

    if (loadings) {
        return <Loader />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Pending Appointments</h1>
                {appointments.length > 0 && 
                    <div className={styles.counter}>{appointments.length} pending</div>
                }
            </div>
            
            {error && <div className={styles.errorBanner}>{error}</div>}
            
            {appointments.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>📅</div>
                    <p>No pending appointments at this time</p>
                    <p className={styles.emptySubtext}>All appointment requests have been processed</p>
                </div>
            ) : (
                <div className={styles.appointmentsList}>
                    {appointments.map(app => (
                        <div key={app.id} className={styles.appointmentCard}>
                            <div className={styles.appointmentHeader}>
                                <div className={styles.patientName}>{app.patient_name}</div>
                                <div className={styles.appointmentBadge}>{app.appointment_type}</div>
                            </div>
                            
                            <div className={styles.appointmentInfo}>
                                <div className={styles.infoRow}>
                                    <div className={styles.infoLabel}>Doctor</div>
                                    <div className={styles.infoValue}>{app.doctor_name}</div>
                                </div>
                                <div className={styles.infoRow}>
                                    <div className={styles.infoLabel}>Date</div>
                                    <div className={styles.infoValue}>{format(new Date(app.appointment_date), 'MMMM d, yyyy')}</div>
                                </div>
                                <div className={styles.infoRow}>
                                    <div className={styles.infoLabel}>Time</div>
                                    <div className={styles.infoValue}>{app.slot_time}</div>
                                </div>
                                
                                {app.problem_description && (
                                    <div className={styles.problemDescription}>
                                        <div className={styles.problemLabel}>Problem Description:</div>
                                        <p>{app.problem_description}</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className={styles.actions}>
                                <button 
                                    className={`${styles.button} ${styles.confirmBtn}`}
                                    onClick={() => handleDecision(app.id, "confirmed")}
                                >
                                    Confirm
                                </button>
                                <button 
                                    className={`${styles.button} ${styles.rejectBtn}`}
                                    onClick={() => handleDecision(app.id, "rejected")}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}