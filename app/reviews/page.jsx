"use client";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from 'date-fns';
import styles from "./reviews.module.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const timeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews`);
        const data = await response.json();
        
        if (data.success) {
          setReviews(data.reviews);
        } else {
          setError(data.message || "Failed to fetch reviews");
        }
      } catch (error) {
        setError("Error fetching reviews");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAvatarColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360; 
    return `hsl(${hue}, 70%, 60%)`; 
  };

  const getDoctorInitial = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    return words[0].toLowerCase().includes("dr") && words[1]
      ? words[1].charAt(0).toUpperCase()
      : name.charAt(0).toUpperCase();
  };
  

  if (loading) {
    return <div className={styles.loading}>Loading reviews...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Doctor Reviews</h1>
        <p className={styles.subtitle}>See what patients are saying about our doctors</p>
      </div>
      
      {reviews.length === 0 ? (
        <div className={styles.noReviews}>
          <p>No reviews yet. Be the first to review a doctor!</p>
        </div>
      ) : (
        <div className={styles.reviewsList}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewItem}>
              <div className={styles.reviewHeader}>
                <div className={styles.doctorInfo}>
                  <div className={styles.doctorAvatar} style={{ backgroundColor: getAvatarColor(review.doctor_name) }}>
                      {getDoctorInitial(review.doctor_name)}
                  </div>
                  <div>
                    <h3>{review.doctor_name}</h3>
                    <div className={styles.rating}>
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`${styles.star} ${
                            index < review.rating ? styles.active : ""
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div className={styles.reaction}>
                      {review.rating >= 4 ? "😊" : review.rating === 3 ? "😐" : "😞"}
                    </div>
                  </div>
                </div>
                <div className={styles.reviewMeta}>
                  <span className={styles.reviewer}>by {review.user_name}</span>
                  <span className={styles.date}>{timeAgo(review.created_at)}</span>
                </div>
              </div>
              {review.comment && (
                <p className={styles.comment}>"{review.comment}"</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
