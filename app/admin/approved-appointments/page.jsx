"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./approved-appointments.module.css";

export default function ApprovedAppointments() {
    const { user, token } = useAuth();
    const router = useRouter();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user === null) return;
        if (!user || user.role !== "admin") {
            router.replace("/");
            return;
        }
        fetchApprovedAppointments();
    }, [user, router]);

    const fetchApprovedAppointments = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/appointments/confirmed", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                setAppointments(data.data);
            }
        } catch (error) {
            console.error("Error fetching approved appointments:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsCompleted = async (appointmentId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}/completed`, {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                fetchApprovedAppointments();
            }
        } catch (error) {
            console.error("Error marking appointment as completed:", error);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Approved Appointments</h2>
            <div className={styles.appointmentsList}>
                {appointments.length === 0 ? (
                    <p className={styles.noAppointments}>No approved appointments found.</p>
                ) : (
                    appointments.map((appointment) => (
                        <div key={appointment.id} className={styles.appointmentCard}>
                            <div className={styles.appointmentInfo}>
                                <h3 className={styles.patientName}>Patient: {appointment.patient_name}</h3>
                                <p className={styles.doctorName}>Doctor: {appointment.doctor_name}</p>
                                <p className={styles.date}>Date: {new Date(appointment.appointment_date).toLocaleDateString()}</p>
                                <p className={styles.time}>Time: {appointment.slot_time}</p>
                                <p className={styles.type}>Type: {appointment.appointment_type}</p>
                            </div>
                            <button
                                onClick={() => handleMarkAsCompleted(appointment.id)}
                                className={styles.completeButton}
                            >
                                Mark as Completed
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
} 