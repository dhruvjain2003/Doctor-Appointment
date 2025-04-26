"use client";
import styles from "./add-doctor.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function AddDoctor() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== "admin") {
      toast.error("You are not an admin. Redirecting...");
      setTimeout(() => {
        router.replace("/");
      }, 1000);
    }
  }, [user, loading, router]);
  

  const [doctorData, setDoctorData] = useState({
    name: "",
    specialty: "",
    experience: "",
    rating: "",
    gender: "",
    profile_image: null,
    degree: "",
    consultation_fee: "",
    contact_number: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  

  const validateForm = () => {
    let newErrors = {};

    if (!doctorData.name.trim() || doctorData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    if (!doctorData.specialty.trim() || doctorData.specialty.length < 3) {
      newErrors.specialty = "Specialty must be at least 3 characters";
    }
    if (
      !doctorData.experience ||
      isNaN(doctorData.experience) ||
      doctorData.experience < 0
    ) {
      newErrors.experience = "Experience must be a valid number (≥ 0)";
    }
    if (
      !doctorData.rating ||
      isNaN(doctorData.rating) ||
      doctorData.rating < 1 ||
      doctorData.rating > 5
    ) {
      newErrors.rating = "Rating must be between 1 and 5";
    }
    if (!doctorData.gender) {
      newErrors.gender = "Please select a gender";
    }
    if (!doctorData.profile_image) {
      newErrors.profile_image = "Please upload an image";
    } else {
      const validFormats = ["image/jpeg", "image/png", "image/jpg"];
      if (!validFormats.includes(doctorData.profile_image.type)) {
        newErrors.profile_image = "Invalid file format. Use JPEG, PNG, or JPG";
      }
      if (doctorData.profile_image.size > 2 * 1024 * 1024) {
        newErrors.profile_image = "File size must be ≤ 2MB";
      }
    }
    if (!doctorData.degree.trim()) {
      newErrors.degree = "Degree is required";
    }
    if (
      !doctorData.consultation_fee ||
      isNaN(doctorData.consultation_fee) ||
      doctorData.consultation_fee < 0
    ) {
      newErrors.consultation_fee =
        "Consultation fee must be a valid number (≥ 0)";
    }
    if (
      doctorData.contact_number &&
      !/^\d{10}$/.test(doctorData.contact_number)
    ) {
      newErrors.contact_number = "Contact number must be 10 digits (optional)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  const handleFileChange = (e) => {
    setDoctorData({ ...doctorData, profile_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("name", doctorData.name);
    formData.append("specialty", doctorData.specialty);
    formData.append("experience", doctorData.experience);
    formData.append("rating", doctorData.rating);
    formData.append("gender", doctorData.gender);
    formData.append("profile_image", doctorData.profile_image);
    formData.append("degree", doctorData.degree);
    formData.append("consultation_fee", doctorData.consultation_fee);
    if (doctorData.contact_number)
      formData.append("contact_number", doctorData.contact_number);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/add-doctor`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setSuccessMessage("Doctor added successfully!");
        setDoctorData({
          name: "",
          specialty: "",
          experience: "",
          rating: "",
          gender: "",
          profile_image: null,
          degree: "",
          consultation_fee: "",
          contact_number: "",
        });
        setErrors({});
      } else {
        setSuccessMessage("Error adding doctor. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setSuccessMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.cardTitle}>Add New Doctor</h1>
          <p className={styles.cardSubtitle}>Complete the form below to add a doctor to the system</p>
        </div>

        {successMessage && (
          <div className={styles.successAlert}>
            <div className={styles.alertContent}>
              <div className={styles.alertIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className={styles.alertMessage}>{successMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
          <div className={styles.formGrid}>
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Personal Information</h3>
              
              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>Doctor's Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter doctor's full name"
                    value={doctorData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                  {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="gender" className={styles.label}>Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={doctorData.gender}
                    onChange={handleChange}
                    required
                    className={styles.select}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <span className={styles.error}>{errors.gender}</span>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact_number" className={styles.label}>Contact Number (Optional)</label>
                  <input
                    id="contact_number"
                    type="text"
                    name="contact_number"
                    placeholder="10-digit phone number"
                    value={doctorData.contact_number}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  {errors.contact_number && <span className={styles.error}>{errors.contact_number}</span>}
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Professional Details</h3>
              
              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label htmlFor="specialty" className={styles.label}>Specialty</label>
                  <input
                    id="specialty"
                    type="text"
                    name="specialty"
                    placeholder="e.g., Cardiology, Pediatrics"
                    value={doctorData.specialty}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                  {errors.specialty && <span className={styles.error}>{errors.specialty}</span>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="degree" className={styles.label}>Degree</label>
                  <input
                    id="degree"
                    type="text"
                    name="degree"
                    placeholder="e.g., MBBS, MD, MS"
                    value={doctorData.degree}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                  {errors.degree && <span className={styles.error}>{errors.degree}</span>}
                </div>

                <div className={styles.fieldsRow}>
                  <div className={styles.field}>
                    <label htmlFor="experience" className={styles.label}>Experience (years)</label>
                    <input
                      id="experience"
                      type="number"
                      name="experience"
                      placeholder="Years of experience"
                      value={doctorData.experience}
                      onChange={handleChange}
                      required
                      className={styles.input}
                    />
                    {errors.experience && <span className={styles.error}>{errors.experience}</span>}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="rating" className={styles.label}>Rating</label>
                    <input
                      id="rating"
                      type="number"
                      name="rating"
                      placeholder="1.0 - 5.0"
                      step="0.1"
                      min="1"
                      max="5"
                      value={doctorData.rating}
                      onChange={handleChange}
                      required
                      className={styles.input}
                    />
                    {errors.rating && <span className={styles.error}>{errors.rating}</span>}
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="consultation_fee" className={styles.label}>Consultation Fee (₹)</label>
                  <input
                    id="consultation_fee"
                    type="number"
                    name="consultation_fee"
                    placeholder="Enter fee amount"
                    value={doctorData.consultation_fee}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                  {errors.consultation_fee && <span className={styles.error}>{errors.consultation_fee}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.fileUploadSection}>
            <h3 className={styles.sectionTitle}>Profile Image</h3>
            <div className={styles.fileUploadWrapper}>
              <label htmlFor="profile_image" className={styles.fileUpload}>
                <span className={styles.uploadIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                  </svg>
                </span>
                <span className={styles.uploadLabel}>
                  {doctorData.profile_image ? doctorData.profile_image.name : "Upload doctor's profile image"}
                </span>
                <input
                  id="profile_image"
                  type="file"
                  name="profile_image"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className={styles.fileInput}
                />
              </label>
              {errors.profile_image && <span className={styles.error}>{errors.profile_image}</span>}
              <p className={styles.fileHint}>Accepted formats: JPEG, PNG, JPG (Max 2MB)</p>
            </div>
          </div>

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? (
              <>
                <span className={styles.buttonLoader}></span>
                <span>Processing...</span>
              </>
            ) : (
              "Add Doctor"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDoctor;