import DoctorCard from "../DoctorCards/DoctorCards";
import Filter from "../LeftSideBar/LeftSideBar";
import styles from "./DoctorAccumulator.module.css";

const doctors = [
    {
        id: 1,
        name: "Dr. Ayesha Kapoor",
        specialty: "Cardiologist",
        experience: "12 Years",
        image: "https://randomuser.me/api/portraits/women/50.jpg",
        ratings: 4,
    },
    {
        id: 2,
        name: "Dr. Rohan Verma",
        specialty: "Dermatologist",
        experience: "8 Years",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        ratings: 3,
    },
    {
        id: 3,
        name: "Dr. Neha Sharma",
        specialty: "Pediatrician",
        experience: "10 Years",
        image: "https://randomuser.me/api/portraits/women/60.jpg",
        ratings: 4,
    },
    {
        id: 4,
        name: "Dr. Vikram Patel",
        specialty: "Neurologist",
        experience: "15 Years",
        image: "https://randomuser.me/api/portraits/men/55.jpg",
        ratings: 3,
    },
    {
        id: 5,
        name: "Dr. Simran Kaur",
        specialty: "Gynecologist",
        experience: "7 Years",
        image: "https://randomuser.me/api/portraits/women/30.jpg",
        ratings: 2,
    },
    {
        id: 6,
        name: "Dr. Arjun Nair",
        specialty: "Orthopedic Surgeon",
        experience: "9 Years",
        image: "https://randomuser.me/api/portraits/men/35.jpg",
        ratings: 1,
    },
];

const DoctorList = () => {

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>6 doctors available</h1>
            <p className={styles.para}>Book appointments with minimum wait-time & verified doctor details</p>
            <br />
            <div className={styles.subContainer}>
                <div className={styles.left}>
                    <Filter />
                </div>
                <div className={styles.right}>
                    <div className={styles.cardContainer}>
                        {doctors.map((doctor)=>(
                            <DoctorCard key={doctor.id} doctor={doctor} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default DoctorList;