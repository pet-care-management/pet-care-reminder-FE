import { Link } from "react-router";

function ReminderCard({ reminder }) {
  //   Due date formatting
  const dueDate = new Date(reminder.dueDate);
  const currentDate = new Date();
  const isOverdue = reminder.isDone === false && dueDate < currentDate;

  let statusText = "Active";
  let statusClass = "status-active";

  if (reminder.isDone === true) {
    statusText = "Completed";
    statusClass = "status-completed";
  } else if (isOverdue === true) {
    statusText = "Overdue";
    statusClass = "status-overdue";
  }

  const formattedDueDate = dueDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <Link className="reminder-card-link" to={`/reminders/${reminder.id}`}>
      <article className="reminder-card">
        <div className="card-heading">
          <div>
            <p className="card-pet-name">{reminder.pet.petName}</p>
            <h3>{reminder.task}</h3>
          </div>

          <span className={"status " + statusClass}>{statusText}</span>
        </div>

        {/* DueDateDisplaying */}
        <div className="card-details">
          <span>{formattedDueDate}</span>
        </div>
      </article>
    </Link>
  );
}

export default ReminderCard;
