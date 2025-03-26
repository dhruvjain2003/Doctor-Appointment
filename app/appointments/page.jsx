'use client';
import styles from './appointments.module.css';
// import SearchContainer from '../components/SearchContainer/SearchContainer';
import DoctorAccumalator from "../components/DoctorAccumalator/DoctorAccumulator";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";


export default function AvailableDoctors() {
     const searchParams = useSearchParams();
      const message = searchParams.get("message");
      const toastShown = useRef(false); 
    
      useEffect(() => {
        if (message === "success" && !toastShown.current) {
          const toastId = toast.loading("Appointment request sent!\n Waiting for admin approval... ⏳");
          setTimeout(() => toast.dismiss(toastId), 5000);
      
          toastShown.current = true; 
        }
      }, [message]);      
      
    return (
        <div className={styles.container}>
            <Toaster position="top-right" reverseOrder={false} />
            <div className={styles.search}>
                <h1 className={styles.title}>Find a doctor at your own ease</h1>
                {/* <SearchContainer /> */}
            </div>
            <DoctorAccumalator />
        </div>
    );
}