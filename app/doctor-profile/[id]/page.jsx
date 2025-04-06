"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Share2 } from "lucide-react";
import styles from "./doctorProfile.module.css";
import {
  Stethoscope,
  Clock,
  Star,
  Mail,
  Phone,
  GraduationCap,
  DollarSign,
} from "lucide-react";

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch doctor data");
        const data = await response.json();
        setDoctor(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/doctor/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoctor();
    fetchReviews();
  }, [id]);

  if (loading)
    return (
      <div className={styles.loading}>
        <div className={styles.loader}></div>
      </div>
    );

  if (!doctor) return <p className={styles.error}>Doctor not found</p>;

  const fullStars = Math.floor(doctor.rating || 0);
  const emptyStars = 5 - fullStars;
  const handleShare = () => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const url = `${baseUrl}/doctor-profile/${doctor.id}`;
  
    const shareText = `🩺 Check out ${doctor.name} (${doctor.specialty}) on MedCare!\n👉 Book Now: ${url}`;
  
    if (navigator.share) {
      navigator
        .share({
          title: `Dr. ${doctor.name} - MedCare`,
          text: shareText,
          url,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      const whatsappURL = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappURL, "_blank");
    }
  };
  
  

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => router.push("/appointments")}
        >
          ← Back to Appointments
        </button>
      </div>
      <div className={styles.card}>
        <img
          src={doctor.profile_image}
          alt={doctor.name}
          className={styles.profileImage}
        />
        <h2 className={styles.name}>{doctor.name}</h2>
        <p className={styles.specialty}>
          <Stethoscope className={styles.icon} /> {doctor.specialty}
        </p>
        <p className={styles.experience}>
          <Clock className={styles.icon} /> {doctor.experience} years of
          experience
        </p>
        <p className={styles.degree}>
          <GraduationCap className={styles.icon} />{" "}
          {doctor.degree || "Not Available"}
        </p>
        <p className={styles.fee}>
          <DollarSign className={styles.icon} /> Consultation Fee: ₹
          {doctor.consultation_fee || "Not Available"}
        </p>
        <p className={styles.gender}>
          <b>Gender:</b> {doctor.gender}
        </p>
        <p className={styles.ratings}>
          Ratings:
          {Array.from({ length: fullStars }).map((_, index) => (
            <Star
              key={`full-${index}`}
              className={styles.star}
              fill="gold"
              stroke="gold"
            />
          ))}
          {Array.from({ length: emptyStars }).map((_, index) => (
            <Star key={`empty-${index}`} className={styles.star} fill="none" />
          ))}
        </p>
        <div className={styles.ratingBarWrapper}>
          <div
            className={styles.ratingBar}
            style={{ width: `${(doctor.rating / 5) * 100}%` }}
          />
        </div>
        <p className={styles.ratingNumber}>{doctor.rating || "0.0"}/5</p>
        <div className={styles.contact}>
          <p>
            <Mail className={styles.icon} /> admin@hospital.com
          </p>
          <p>
            <Phone className={styles.icon} />{" "}
            {doctor.contact_number || "Not Available"}
          </p>
        </div>
        <div className="actionsRow">
            <button
            className={styles.bookButton}
            onClick={() => (window.location.href = `/appointments/${doctor.id}`)}
            >
            Book Appointment
            </button>
            <button className={styles.shareButton} onClick={handleShare}>
                <Share2 size={14} />
            </button>
        </div>
      </div>
      <div className={styles.reviewsSection}>
        <h3>Patient Reviews</h3>
        {reviews.length === 0 ? (
          <div className={styles.noReviews}>
            <p>No reviews available for this doctor yet.</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <p className={styles.reviewUser}>
                <b>{review.user_name}</b> •{" "}
                {new Date(review.created_at).toLocaleDateString()}
              </p>
              <p className={styles.reviewRating}>
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className={styles.star}
                    fill="gold"
                    stroke="gold"
                    size={16}
                  />
                ))}
              </p>
              <p className={styles.reviewComment}>"{review.comment}"</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
