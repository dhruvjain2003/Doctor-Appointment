"use client";
import styles from "./appointments.module.css";
import DoctorAccumalator from "../components/DoctorAccumalator/DoctorAccumulator";
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";
import Loader from "../components/Loader/Loader";

const AvailableDoctorsContent = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const toastShown = useRef(false);

  useEffect(() => {
    if (message === "success" && !toastShown.current) {
      const toastId = toast.loading("Appointment request sent!\n Waiting for admin approval... ⏳");
      setTimeout(() => toast.dismiss(toastId), 5000);
      toastShown.current = true;
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [message]);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <h1 className={styles.title}>Find a doctor at your own ease</h1>
      </div>
      <DoctorAccumalator />
    </div>
  );
};

export default function AvailableDoctors() {
  return (
    <Suspense fallback={<Loader />}>
      <AvailableDoctorsContent />
    </Suspense>
  );
}
