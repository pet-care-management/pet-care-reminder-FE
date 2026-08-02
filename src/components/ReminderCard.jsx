import { Link } from "react-router";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function ReminderCard({ reminder, deleteReminder }) {
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

  const handleCick = () => {
    alert(`Reminder ${reminder.id} is deleted. `)
  }
  return (
    
      <article className="reminder-card">
    <Link className="reminder-card-link" to={`/reminders/${reminder.id}`}>
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
    </Link>
    {/* https://react-icons.github.io/react-icons/search/#q=edit */}
    <span className="delete-icon" onClick={() => { 
        if (window.confirm("Are you sure you want to delete this reminder?")) //window.confirm pops up the alert kind of box
        deleteReminder(reminder.id)}} ><MdDelete /></span>

      <Link className="edit-icon" to={`/reminders/${reminder.id}/edit`}><FaEdit/></Link>
      </article>
    
  );
}

export default ReminderCard;
