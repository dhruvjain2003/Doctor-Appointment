import AppointmentScheduler from "@/app/components/AppointmentScheduler/AppointmentScheduler";
import styles from "./doctorAppointments.module.css";

const Appointments = () => {
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
                    <AppointmentScheduler />
                </div>
            </div>
        </div>
    );
}

export default Appointments;