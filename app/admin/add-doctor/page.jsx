"use client";
import styles from "./add-doctor.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AddDoctor() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user === null) return;
        if (!user || user.role !== "admin") {
            alert("You are not an admin. Redirecting...");
            setTimeout(() => {
                router.replace("/");
            }, 1000);
        }
    }, [user, router]);

    const [doctorData, setDoctorData] = useState({
        name: "",
        specialty: "",
        experience: "",
        rating: "",
        gender: "",
        profile_image: null,
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false); 
    const [successMessage, setSuccessMessage] = useState(""); 

    const validateForm = () => {
        let newErrors = {};

        if (!doctorData.name.trim() || doctorData.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters";
        }

        if (!doctorData.specialty.trim() || doctorData.specialty.length < 3) {
            newErrors.specialty = "Specialty must be at least 3 characters";
        }

        if (!doctorData.experience || isNaN(doctorData.experience) || doctorData.experience < 0) {
            newErrors.experience = "Experience must be a valid number (≥ 0)";
        }

        if (!doctorData.rating || isNaN(doctorData.rating) || doctorData.rating < 1 || doctorData.rating > 5) {
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

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/add-doctor`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage("Doctor added successfully!");
                setDoctorData({
                    name: "",
                    specialty: "",
                    experience: "",
                    rating: "",
                    gender: "",
                    profile_image: null,
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
        <div>
            {/* {isLoading && <div className={styles.loader}></div>} */}
            {successMessage && <div className={styles.alert}>{successMessage}</div>} 
            <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
                <input
                    type="text"
                    name="name"
                    placeholder="Doctor's Name"
                    value={doctorData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}

                <input
                    type="text"
                    name="specialty"
                    placeholder="Specialty"
                    value={doctorData.specialty}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                {errors.specialty && <span className={styles.error}>{errors.specialty}</span>}

                <input
                    type="number"
                    name="experience"
                    placeholder="Experience (years)"
                    value={doctorData.experience}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                {errors.experience && <span className={styles.error}>{errors.experience}</span>}

                <input
                    type="number"
                    name="rating"
                    placeholder="Rating (1-5)"
                    value={doctorData.rating}
                    onChange={handleChange}
                    step="0.1"
                    min="1"
                    max="5"
                    required
                    className={styles.input}
                />
                {errors.rating && <span className={styles.error}>{errors.rating}</span>}

                <select name="gender" value={doctorData.gender} onChange={handleChange} required className={styles.select}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                {errors.gender && <span className={styles.error}>{errors.gender}</span>}

                <input
                    type="file"
                    name="profile_image"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className={styles.file}
                />
                {errors.profile_image && <span className={styles.error}>{errors.profile_image}</span>}

                {/* <button type="submit" className={styles.button} disabled={isLoading}>
                    {isLoading ? "Adding Doctor..." : "Add Doctor"}
                </button> */}
                <button type="submit" className={styles.button} disabled={isLoading}>
                    {isLoading ? <span className={styles.buttonLoader}></span> : "Add Doctor"}
                </button>
            </form>
        </div>
    );
}