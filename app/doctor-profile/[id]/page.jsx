"use client";

import { useEffect, useState } from "react";
import { useRouter,useParams } from "next/navigation";
import styles from "./doctorProfile.module.css";
import { Stethoscope, Clock, Star, Mail, Phone } from "lucide-react";

const DoctorProfile = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors/${id}`);
                if (!response.ok) throw new Error("Failed to fetch doctor data");
                const data = await response.json();
                console.log(data);
                setDoctor(data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
    }, [id]);

    if (loading) return (
        <div className={styles.loading}>
            <div className={styles.loader}></div>
        </div>
    );
    if (!doctor) return <p className={styles.error}>Doctor not found</p>;

    const fullStars = Math.floor(doctor.rating || 0);
    const emptyStars = 5 - fullStars;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={() => router.push("/appointments")}>
                    ← Back to Appointments
                </button>
            </div>  
            <div className={styles.card}>
                <img src={doctor.profile_image} alt={doctor.name} className={styles.profileImage} />
                <h2 className={styles.name}>{doctor.name}</h2>
                <p className={styles.specialty}>
                    <Stethoscope className={styles.icon} /> {doctor.specialty}
                </p>
                <p className={styles.experience}>
                    <Clock className={styles.icon} /> {doctor.experience} years of experience
                </p>
                <p className={styles.gender}><b>Gender:</b> {doctor.gender}</p>
                <p className={styles.ratings}>
                    Ratings: 
                    {Array.from({ length: fullStars }).map((_, index) => (
                        <Star key={`full-${index}`} className={styles.star} fill="gold" stroke="gold" />
                    ))}
                    {Array.from({ length: emptyStars }).map((_, index) => (
                        <Star key={`empty-${index}`} className={styles.star} fill="none" />
                    ))}
                </p>
                <div className={styles.contact}>
                    <p><Mail className={styles.icon} /> example@hospital.com</p>
                    <p><Phone className={styles.icon} /> +91 98765 43210</p>
                </div>
                <button className={styles.bookButton} onClick={() => window.location.href = `/appointments/${doctor.id}`}>
                    Book Appointment
                </button>
            </div>
        </div>
    );
};

export default DoctorProfile;
