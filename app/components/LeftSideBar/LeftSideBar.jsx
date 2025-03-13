"use client"
import { useState } from "react";
import styles from "./LeftSideBar.module.css";

const LeftSideBar = () => {
    const [filters, setFilters] = useState({
        rating: "Show all",
        experience: "15+ years",
        gender: "Show All",
    });

    const handleChange = (category, value) => {
        setFilters({ ...filters, [category]: value });
    };

    const resetFilters = () => {
        setFilters({
            rating: "Show all",
            experience: "15+ years",
            gender: "Show All",
        });
    };

    return (
        <div className={styles.filterContainer}>
            <div className={styles.filterHeader}>
                <span className={styles.filterSpan}>Filter By:</span>
                <button className={styles.resetButton} onClick={resetFilters}>
                    Reset
                </button>
            </div>
            <div className={styles.filterSection}>
                <h4 className={styles.filterTitle}>Rating</h4>
                {["Show all", "1 star", "2 star", "3 star", "4 star", "5 star"].map(
                    (rating) => (
                        <label key={rating} className={styles.filterLabel}>
                            <input
                                type="radio"
                                name="rating"
                                value={rating}
                                checked={filters.rating === rating}
                                onChange={() => handleChange("rating", rating)}
                                className={styles.filterInput}
                            />
                            {rating}
                        </label>
                    )
                )}
            </div>
            <div className={styles.filterSection}>
                <h4 className={styles.filterTitle}>Experience</h4>
                {[
                    "15+ years",
                    "10-15 years",
                    "5-10 years",
                    "3-5 years",
                    "1-3 years",
                    "0-1 years",
                ].map((experience) => (
                    <label key={experience} className={styles.filterLabel}>
                        <input
                            type="radio"
                            name="experience"
                            value={experience}
                            checked={filters.experience === experience}
                            onChange={() => handleChange("experience", experience)}
                            className={styles.filterInput}
                        />
                        {experience}
                    </label>
                ))}
            </div>
            <div className={styles.filterSection}>
                <h4 className={styles.filterTitle}>Gender</h4>
                {["Show All", "Male", "Female"].map((gender) => (
                    <label key={gender} className={styles.filterLabel}>
                        <input
                            type="radio"
                            name="gender"
                            value={gender}
                            checked={filters.gender === gender}
                            onChange={() => handleChange("gender", gender)}
                            className={styles.filterInput}
                        />
                        {gender}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default LeftSideBar;