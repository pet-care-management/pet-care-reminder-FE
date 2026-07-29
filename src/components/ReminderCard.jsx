function ReminderCard({ reminder, pet, onDelete, isDeleting }) {
    const dueDate = new Date(reminder.dueDate)
    const isOverdue = !reminder.isDone && dueDate < new Date()
    const status = reminder.isDone ? "Completed" : isOverdue ? "Overdue" : "Upcoming"
    const petInitial = pet?.petName?.charAt(0).toUpperCase() || "P"

    return (
        <article className={`reminder-card ${reminder.isDone ? "is-complete" : ""}`}>
            <div className="pet-avatar pet-avatar-small" aria-hidden="true">
                {petInitial}
            </div>

            <div className="reminder-content">
                <div className="reminder-heading">
                    <div>
                        <p className="eyebrow">{pet?.petName || `Pet #${reminder.petId}`}</p>
                        <h3>{reminder.task}</h3>
                    </div>
                    <span className={`status status-${status.toLowerCase()}`}>{status}</span>
                </div>

                <div className="reminder-meta">
                    <span>
                        <span aria-hidden="true">◷</span>
                        {dueDate.toLocaleString([], {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit"
                        })}
                    </span>
                    {reminder.notes && <span className="reminder-note">{reminder.notes}</span>}
                </div>
            </div>

            <button
                className="icon-button"
                type="button"
                onClick={() => onDelete(reminder.id)}
                disabled={isDeleting}
                aria-label={`Delete ${reminder.task} reminder`}
                title="Delete reminder"
            >
                {isDeleting ? "…" : "×"}
            </button>
        </article>
    )
}

export default ReminderCard;
