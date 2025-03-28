"use client";
import { useParams, useRouter } from "next/navigation";
import AppointmentScheduler from "@/app/components/AppointmentScheduler/AppointmentScheduler";
import styles from "./doctorAppointments.module.css";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";

const Appointments = () => {
  const params = useParams();
  const router = useRouter();
  const doctorId = params?.doctorId;
  const { user } = useAuth();
  const redirectingRef = useRef(false); 

  useEffect(() => {
    if (user === undefined || redirectingRef.current) return; 

    if (!user) {
      redirectingRef.current = true; 
      toast.error("You are not logged in. Redirecting...", {
        position: "top-right",
        duration: 2000,
      });

      setTimeout(() => {
        router.replace("/login");
      }, 2000);
    }
  }, [user, router]);

  if (!doctorId) {
    return <p style={{ color: "red" }}>Error: Doctor ID not found!</p>;
  }

  return (
    <div>
      <Toaster />
      <div className={styles.appointments}>
        <div className={styles.left}>
          <h1 className={styles.heading}>
            Book Your Next Doctor Visit in Seconds.
          </h1>
          <p className={styles.para}>
            CareMate helps you find the best healthcare provider by specialty,
            location, and more, ensuring you get the care you need.
          </p>
        </div>
        <div className={styles.right}>
          <AppointmentScheduler doctorId={doctorId} />
        </div>
      </div>
    </div>
  );
};

export default Appointments;
