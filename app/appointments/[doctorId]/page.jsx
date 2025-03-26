"use client"
import { useParams, useRouter } from "next/navigation";
import AppointmentScheduler from "@/app/components/AppointmentScheduler/AppointmentScheduler";
import styles from "./doctorAppointments.module.css";
// import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";

const Appointments = () => {
    const params = useParams();
    const router = useRouter();
    // const { isLoggedIn } = useAuth();
    const doctorId = params?.doctorId;

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         alert('Please login to book an appointment');
    //         router.push('/login');
    //         return;
    //     }
    // }, [isLoggedIn, router]);

    if (!doctorId) {
        return <p style={{ color: "red" }}>Error: Doctor ID not found!</p>;
    }

    return (
        <div>
            <div className={styles.appointments}>
                <div className={styles.left}>
                    <h1 className={styles.heading}>
                        Book Your Next Doctor Visit in Seconds.
                    </h1>
                    <p className={styles.para}>CareMate helps you find the best healthcare provider by specialty,
                        location, and more, ensuring you get the care you need.</p>

                </div>
                <div className={styles.right}>
                    <AppointmentScheduler doctorId={doctorId}/>
                </div>
            </div>
        </div>
    );
}

export default Appointments;