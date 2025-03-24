"use client";
import { useEffect, useState } from "react";

export default function Notifications() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        async function fetchAppointments() {
            const response = await fetch("/api/admin/pending-appointments");
            const data = await response.json();
            setAppointments(data);
        }
        fetchAppointments();
    }, []);

    const handleDecision = async (id, status) => {
        try {
            await fetch(`/api/admin/appointments/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            setAppointments(appointments.filter(app => app.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Pending Appointments</h2>
            <ul>
                {appointments.map(app => (
                    <li key={app.id}>
                        {app.patient_name} - {app.date} - {app.time}
                        <button onClick={() => handleDecision(app.id, "confirmed")}>Confirm</button>
                        <button onClick={() => handleDecision(app.id, "rejected")}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
