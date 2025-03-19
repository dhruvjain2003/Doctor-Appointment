"use client";

import { useState } from "react";
import styles from "./AppointmentScheduler.module.css";
import { ChevronDown, CircleChevronLeft, CircleChevronRight, Sun, Sunset } from "lucide-react";
import DatesToSelect from "../DatesToSelect/DatesToSelect";

const AppointmentScheduler = () => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedOption, setSelectedOption] = useState("MedicareHeart Institute, Okhla Road");
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const generateDatesForMonth = (currentDate) => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const dates = [];
        for (let day = 1; day <= daysInMonth; day++) {
            const dateObj = new Date(year, month, day);
            dates.push({
                day: dateObj.toLocaleString("default", { weekday: "short" }),
                date: dateObj.toLocaleDateString("default", { day: "2-digit", month: "short" }),
            });
        }
        return dates;
    };

    const changeMonth = (offset) => {
        setDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() + offset);
            return newDate;
        });
    };

    const isCurrentMonth = date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth();

    const timeSlots = [
        { time: "9:00 AM", available: true },
        { time: "9:30 AM", available: true },
        { time: "10:00 AM", available: true },
        { time: "10:30 AM", available: true },
        { time: "11:00 AM", available: true },
        { time: "11:30 AM", available: true },
        { time: "12:00 AM", available: true },
        { time: "12:30 PM", available: true },
    ];

    const dates = generateDatesForMonth(date);

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h2 className={styles.title}>Schedule Appointment</h2>
                <button className={styles.bookButton}>Book Appointment</button>
            </div>

            <div className={styles.tabContainer}>
                <button className={`${styles.tab} ${styles.activeTab}`}>Book Video Consult</button>
                <button className={styles.tab}>Book Hospital Visit</button>
            </div>

            <div className={styles.dropdownWrapper}>
                <select
                    className={styles.dropdown}
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="MedicareHeart Institute, Okhla Road">MedicareHeart Institute, Okhla Road</option>
                    <option value="Apollo Hospital, Delhi">Apollo Hospital, Delhi</option>
                    <option value="Max Healthcare, Gurgaon">Max Healthcare, Gurgaon</option>
                </select>
                <ChevronDown className={styles.icon} size={28} />
            </div>

            <div className={styles.dateHeader}>
                <button
                    className={styles.dateButton}
                    onClick={() => !isCurrentMonth && changeMonth(-1)}
                    disabled={isCurrentMonth}
                    style={{ opacity: isCurrentMonth ? 0.5 : 1 }}
                >
                    <CircleChevronLeft size={28} className={styles.icon} />
                </button>
                <h3 className={styles.heading}>
                    {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
                </h3>
                <button className={styles.dateButton} onClick={() => changeMonth(1)}>
                    <CircleChevronRight size={28} className={styles.icon} />
                </button>
            </div>

            <DatesToSelect dates={dates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

            <div className={styles.slotSection}>
                <h3 className={styles.slotTitle}>
                    <Sun /> Morning <span className={styles.slotCount}>2 Slots</span>
                </h3>
                <hr className={styles.slotHr} />
                <div className={styles.slotGrid}>
                    {timeSlots.map((slot, index) => (
                        <button
                            key={index}
                            className={`${styles.slotButton} ${!slot.available ? styles.disabledSlot : ""} ${
                                selectedSlot === slot.time ? styles.selectedSlot : ""
                            }`}
                            disabled={!slot.available}
                            onClick={() => slot.available && setSelectedSlot(slot.time)}
                        >
                            {slot.time}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.slotSection}>
                <h3 className={styles.slotTitle}>
                    <Sunset /> Afternoon <span className={styles.slotCount}>2 Slots</span>
                </h3>
                <hr className={styles.slotHr} />
                <div className={styles.slotGrid}>
                    {timeSlots.map((slot, index) => (
                        <button
                            key={index}
                            className={`${styles.slotButton} ${!slot.available ? styles.disabledSlot : ""} ${
                                selectedSlot === slot.time ? styles.selectedSlot : ""
                            }`}
                            disabled={!slot.available}
                            onClick={() => slot.available && setSelectedSlot(slot.time)}
                        >
                            {slot.time}
                        </button>
                    ))}
                </div>
            </div>

            <button className={styles.nextButton}>Next</button>
        </div>
    );
};

export default AppointmentScheduler;