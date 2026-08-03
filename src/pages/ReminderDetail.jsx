import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import PetCard from "../components/PetCard";

function ReminderDetail() {
  const { id } = useParams();
  const [reminder, setReminder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    async function fetchReminder() {
      try {
        const response = await fetch(`http://localhost:3000/reminders/${id}`);

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Reminder not found"
              : `Server responded with ${response.status}`,
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

  const isOverdue =
    reminder && !reminder.isDone && new Date(reminder.dueDate) < new Date();

  let statusText = "Active";
  let statusClass = "status-pending";

  if (reminder?.isDone) {
    statusText = "Completed";
    statusClass = "status-done";
  } else if (isOverdue) {
    statusText = "Overdue";
    statusClass = "status-overdue";
  }
  async function handleComplete() {
    setCompleting(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/reminders/${id}`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setReminder((currentReminder) => ({
        ...currentReminder,
        isDone: data.isDone,
        updatedAt: data.updatedAt,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setCompleting(false);
    }
  }

  return (
    <main className="page-container">
      <Link className="back-link" to="/">
        ← Back to reminders
      </Link>

      {loading && <p>Loading reminder...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && reminder && (
        <>
          <section className="page-header">
            <div>
              <p className="eyebrow">Reminder details</p>
              <h1>
                Reminder for {reminder.pet?.petName ?? "your pet"}
              </h1>
              <p>
                Care task for {reminder.pet?.petName ?? "your pet"}.
              </p>
            </div>
          </section>

          <section className="content-panel">
            <article className="reminder-detail-card">
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
                <strong className={statusClass}>{statusText}</strong>
              </div>

              {!reminder.isDone && !isOverdue && (
                <button
                  className="button button-primary complete-reminder-button"
                  type="button"
                  onClick={handleComplete}
                  disabled={completing}
                >
                  {completing ? "Completing..." : "Mark Complete"}
                </button>
              )}
            </article>
          </section>
        </>
      )}
    </main>
  );
}

export default ReminderDetail;
