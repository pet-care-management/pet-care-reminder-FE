import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PetCard from "../components/PetCard";

function ReminderDetail() {
    const { id } = useParams();
    const [reminder, setReminder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchReminder() {
            try {
                const response = await fetch(`http://localhost:3000/reminder/${id}`);

                if (!response.ok) {
                    throw new Error(
                        response.status === 404
                            ? "Reminder not found"
                            : `Server responded with ${response.status}`
                    );
                }

                setReminder(await response.json());
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchReminder();
    }, [id]);

    const formattedDueDate = reminder
        ? new Date(reminder.dueDate).toLocaleString([], {
            dateStyle: "long",
            timeStyle: "short",
        })
        : "";
    
    const isOverdue = reminder && !reminder.isDone && new Date(reminder.dueDate) < new Date();
    
    let statusText = "Pending";
    let statusClass = "status-pending";

    if (reminder?.isDone) {
        statusText = "Completed";
        statusClass = "status-done";
    }
    else if (isOverdue) {
        statusText = "Overdue";
        statusClass = "status-overdue";
    }
    

    return (
        <main className="reminder-detail-page">

            {loading && <p>Loading reminder...</p>}
            {error && <p className="error">Error: {error}</p>}

            {!loading && !error && reminder && (
                <div className="reminder-detail-content">

                    {/* <div className="reminder-pet-info">
                        <PetCard pet={reminder.pet} />      was going to add a petcard above to show pet info alongside but
                                                            then would show the pet name twice
                    </div> */}

                    <article className="reminder-detail-card"> {/* showing the reminder in full detail */}
                        {/* <p className="detail-label">Reminder for</p> */}
                        <h1>Reminder for</h1>
                        {/* <h1>{reminder.pet?.petName ?? "Unknown pet"}</h1> */}
                        <PetCard pet={reminder.pet} />

                        <div className="detail-row">
                            <span>Task</span>
                            <strong>{reminder.task}</strong>
                        </div>
                        <div className="detail-row">
                            <span>Notes</span>
                            <strong>{reminder.notes || "No notes"}</strong>
                        </div>
                        <div className="detail-row">
                            <span>Due date</span>
                            <strong>{formattedDueDate}</strong>
                        </div>
                        <div className="detail-row">
                            <span>Status</span>
                            <strong className={statusClass}>
                                {statusText}
                            </strong>
                        </div>
                    </article>
                </div>
            )}
        </main>
    );
}

export default ReminderDetail;
