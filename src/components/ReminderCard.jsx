import { Link } from "react-router";

function ReminderCard({ reminder }) {
    return (
        <li className="reminder-item" >
            <Link className="link-button" to={`/reminder/${reminder.id}`} key={reminder.id}>
            <p className="pet-id" >{reminder.pet.petName}</p>
            <p className="reminder-task" >{reminder.task}</p>
            <p className="reminder-notes" >{reminder.notes}</p>
            {/* <p className="reminder-due" >{reminder.dueDate}</p>
            <p className="reminder-status" >{reminder.isDone}</p> */}
            </Link>
        </li>
    )
}
//{reminder.reminder}

export default ReminderCard;