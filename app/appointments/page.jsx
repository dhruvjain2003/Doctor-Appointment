'use client';
import styles from './appointments.module.css';
// import SearchContainer from '../components/SearchContainer/SearchContainer';
import DoctorAccumalator from "../components/DoctorAccumalator/DoctorAccumulator"

export default function AvailableDoctors() {
    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <h1 className={styles.title}>Find a doctor at your own ease</h1>
                {/* <SearchContainer /> */}
            </div>
            <DoctorAccumalator />
        </div>
    );
}